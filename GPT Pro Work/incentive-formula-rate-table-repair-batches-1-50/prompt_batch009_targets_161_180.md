You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 9
Targets in this prompt: 161-180 of 984
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
  "batchNumber": 9,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3592"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1653",
    "opportunityName": "Intermountain Gas Company (IGC) - Energy Efficiency Rebate Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1653/intermountain-gas-company-igc-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/",
    "applicationUrl": "https://customer.intgas.com/login/",
    "administrator": "Intermountain Gas Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "duct leakage"
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
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Intermountain Gas Company"
        ],
        "notes": "Available to Intermountain Gas residential rate-schedule customers and eligible builders in Idaho."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "new_construction_builder"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "combination_boiler_space_water_heat",
        "tankless_natural_gas_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be on an Intermountain Gas Idaho residential rate schedule or be an eligible builder.",
        "Applicable space-heating rebates require the home to be heated exclusively with Intermountain Gas natural gas.",
        "Applicable water-heating rebates require water heating with natural gas.",
        "Equipment must be new, code-approved, and installed under the program’s contractor or self-install rules.",
        "Applications must be submitted within the stated installation window."
      ],
      "blockers": [
        "Insulation, duct leakage, duct sealing, air sealing and weatherization were not verified in current official residential rebate offerings.",
        "Electric heat pumps are not eligible; homes with electric heat pumps must meet the program’s cooling-only restriction where applicable.",
        "Broad high-efficiency HVAC should be narrowed to natural-gas furnace and boiler measures.",
        "Do not match electric water heaters or renewable systems to this gas utility rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Intermountain Gas Company",
      "applicationUrl": "https://customer.intgas.com/login/",
      "websiteUrl": "https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/",
      "sourceUrlsChecked": [
        "https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/",
        "https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/appliance-rebates/",
        "https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/residential-rebate-terms-and-conditions/",
        "https://customer.intgas.com/login/",
        "https://programs.dsireusa.org/system/program/detail/1653/intermountain-gas-company-igc-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Intermountain’s]( current residential rebate table lists 95 percent AFUE furnaces, tankless water heaters, 95 percent AFUE boilers and combination boilers; terms limit eligibility to Idaho IGC residential gas customers and builders.",
      "reasoningNotes": "The furnace and boiler matches are correct. Envelope and duct measures appear to be stale or unsupported in current official sources and should be removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8ed955dc7f5e175d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 27500,
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
        "formula": "$275 per residential natural gas furnace at 95%+ AFUE",
        "evidenceText": "Intermountain Gas appliance rebates list 95% AFUE natural gas furnace at $275.",
        "sourceUrlsChecked": [
          "https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/appliance-rebates/"
        ],
        "reasoningNotes": "Matched furnace term. Rebate cannot exceed equipment and installation cost.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f05d4080790fc79e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 80000,
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
        "formula": "$800 per residential natural gas boiler at 95%+ AFUE",
        "evidenceText": "Intermountain Gas appliance rebates list 95% AFUE natural gas boiler at $800.",
        "sourceUrlsChecked": [
          "https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/appliance-rebates/"
        ],
        "reasoningNotes": "Matched boiler term. Rebate cannot exceed equipment and installation cost.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5235",
    "opportunityName": "North Shore Gas - Residential Rebate Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5235/north-shore-gas-residential-rebate-program",
    "websiteUrl": "https://www.northshoregasdelivery.com/savings/rebates-residential",
    "applicationUrl": null,
    "administrator": "North Shore Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "air sealing",
          "weatherization"
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "North Shore Gas"
        ],
        "notes": "Applies to North Shore Gas residential natural gas customers in Chicago's northern suburbs."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customers",
        "homeowners",
        "landlords"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "gas_water_heater_replacement",
        "smart_thermostat_zoning_retrofit",
        "programmable_thermostat",
        "gas_heat_pump",
        "pipe_insulation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible North Shore Gas residential customer, generally Service Classification 1 for home rebates.",
        "Qualifying equipment must be new, fully installed, and old equipment removed where applicable.",
        "Weatherization measures must use approved program contractors and meet current program caps.",
        "Rebates may not exceed project cost and are subject to program funding and documentation requirements."
      ],
      "blockers": [
        "Do not match electric heat pumps, central air conditioners, or non-gas HVAC under this gas rebate record.",
        "Do not match commercial measures to the residential rebate page.",
        "High-efficiency HVAC should be represented as qualifying gas furnace, boiler, gas heat pump or water-heating equipment only."
      ],
      "programType": "Rebate Program",
      "administrator": "North Shore Gas",
      "applicationUrl": null,
      "websiteUrl": "https://www.northshoregasdelivery.com/savings/rebates-residential",
      "sourceUrlsChecked": [
        "https://www.northshoregasdelivery.com/savings/rebates-residential",
        "https://www.northshoregasdelivery.com/savings/rebates-residential-faq",
        "https://www.northshoregasdelivery.com/savings/rebates"
      ],
      "evidenceText": "North]( Shore Gas residential pages list rebates for furnaces, boilers, water heaters, smart or programmable thermostats, insulation, air sealing, duct sealing, pipe insulation and gas heat pumps.",
      "reasoningNotes": "The target categories are supported, but this is a natural-gas residential program, so HVAC matching must remain gas-specific."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f5b17661e6ac92bc_v1",
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
        "confidence": "high",
        "formula": "$25 per smart thermostat",
        "evidenceText": "North Shore Gas residential rebate portal lists Smart Thermostat at $25.",
        "sourceUrlsChecked": [
          "https://www.northshoregasdelivery.com/savings/rebates-residential",
          "https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=305"
        ],
        "reasoningNotes": "Matched smart thermostat and controls terms. Use one unit as one eligible smart thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3063",
    "opportunityName": "CenterPoint Energy - Residential Energy Efficiency Rebates",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3063/centerpoint-energy-residential-energy-efficiency-rebates",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/home-improvement-rebates-and-discounts.aspx?au=res&sa=in",
    "applicationUrl": "https://centerpointenergyindiana-residential-rebate.clearesult.com/",
    "administrator": "CenterPoint Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "CenterPoint Energy Indiana residential electric service territory",
          "CenterPoint Energy Indiana residential natural gas service territory"
        ],
        "notes": "Measure eligibility depends on whether the customer receives eligible electric service, natural gas service, or both."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_required_account_or_property_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "central_air_conditioner_replacement",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "heat_pump_water_heater",
        "heat_pump_pool_heater",
        "duct_sealing_and_insulation",
        "aeroseal_duct_sealing",
        "insulation_upgrade",
        "window_replacement",
        "smart_thermostat_zoning_retrofit",
        "efficient_clothes_washer",
        "efficient_clothes_dryer",
        "efficient_dishwasher",
        "residential_freezer_replacement",
        "dehumidifier_rebate",
        "air_purifier_rebate",
        "solar_attic_fan"
      ],
      "hardRequirements": [
        "Must be an eligible CenterPoint Energy Indiana residential customer.",
        "Some rebates require qualifying electric service and some require qualifying natural gas service.",
        "Equipment and appliances must meet current program efficiency requirements.",
        "Weatherization and HVAC measures must follow program installation and documentation rules."
      ],
      "blockers": [
        "Do not infer commercial appliance, commercial kitchen or commercial refrigeration eligibility from residential appliance rebates.",
        "Do not match broad window replacement unless the project is a qualifying high-performance window measure.",
        "Do not match thermostat rebates for excluded dual-fuel or new-construction cases where program rules exclude them."
      ],
      "programType": "Rebate Program",
      "administrator": "CenterPoint Energy",
      "applicationUrl": "https://centerpointenergyindiana-residential-rebate.clearesult.com/",
      "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/home-improvement-rebates-and-discounts.aspx?au=res&sa=in",
      "sourceUrlsChecked": [
        "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/home-improvement-rebates-and-discounts.aspx?au=res&sa=in",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/appliances",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/weatherization"
      ],
      "evidenceText": "CenterPoint Indiana residential pages list electric and gas rebates for heat pumps, furnaces, boilers, HPWH, Aeroseal, attic insulation, duct sealing, high-performance windows, smart thermostats and specific ENERGY STAR appliances.",
      "reasoningNotes": "Preserved furnace, heat pump, thermostat, insulation and laundry matches, while narrowing appliances to residential product categories and adding supported windows and duct measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0a54bbcdacfefb71_v1",
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
        "formula": "Up to $50 per qualifying smart thermostat",
        "evidenceText": "CenterPoint Indiana residential efficiency materials include smart thermostat rebates among 2026 rebates.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates?sa=in",
          "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/home-improvement-rebates-and-discounts.aspx?au=res&sa=in"
        ],
        "reasoningNotes": "Matched smart thermostat term. Confidence is medium because exact amount is shown in program materials rather than the landing page.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3065",
    "opportunityName": "CenterPoint Energy (Gas) - Commercial Energy Efficiency Rebates",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3065/centerpoint-energy-gas-commercial-energy-efficiency-rebates",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/natural-gas-service-rebates?sa=in",
    "applicationUrl": null,
    "administrator": "CenterPoint Energy",
    "programType": "Commercial Natural Gas Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "boiler_controls_burner_retrofit",
        "displayName": "Boiler controls / burner retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler reset"
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "low flow",
          "showerhead"
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
      },
      {
        "retrofitTypeId": "steam_trap_replacement",
        "displayName": "Steam trap replacement",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steam trap"
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
          "CenterPoint Energy Indiana natural gas service territory"
        ],
        "notes": "Limited to eligible Indiana CenterPoint Energy business natural-gas customers on specified commercial rate schedules."
      },
      "eligibleApplicantTypes": [
        "commercial_gas_customer",
        "industrial_gas_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "boiler_controls_burner_retrofit",
        "high_efficiency_boiler_retrofit",
        "steam_boiler",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_unit_heater",
        "infrared_heater",
        "advanced_rooftop_controls",
        "programmable_thermostat",
        "commercial_fryer",
        "commercial_convection_oven",
        "commercial_conveyor_oven",
        "commercial_rack_oven",
        "commercial_kitchen_hood_demand_control_ventilation",
        "commercial_griddle",
        "pre_rinse_spray_valve",
        "commercial_combination_oven",
        "commercial_steam_cooker",
        "commercial_dishwasher",
        "steam_trap_replacement",
        "pipe_insulation",
        "high_efficiency_gas_water_heater",
        "water_heating_controls_recirculation",
        "low_flow_showerhead",
        "gas_clothes_dryer_modulating_valve"
      ],
      "hardRequirements": [
        "Customer must be a current CenterPoint Energy Indiana natural-gas business customer on eligible rate schedules.",
        "Opt-out customers are ineligible.",
        "Equipment must be installed within current program deadlines and applications must be submitted on time."
      ],
      "blockers": [
        "Do not match building-envelope insulation; supported insulation is pipe or steam-system insulation.",
        "Do not match broad low-flow plumbing fixtures; supported measures are showerheads and pre-rinse sprayers.",
        "Do not match electric HVAC, heat pumps, or residential appliance measures."
      ],
      "programType": "Commercial Natural Gas Rebate Program",
      "administrator": "CenterPoint Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/natural-gas-service-rebates?sa=in",
      "sourceUrlsChecked": [
        "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/natural-gas-service-rebates?sa=in"
      ],
      "evidenceText": "CenterPoint's Indiana gas business page lists heating and cooling, commercial kitchen, steam trap and pipe insulation, water heating, low-flow showerhead, and recirculation-control measures.",
      "reasoningNotes": "Insulation is pipe insulation, low-flow is showerheads or pre-rinse sprayers, and all measures are natural-gas business measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_790489ef4da10f64_v1",
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
        "confidence": "high",
        "formula": "$75 per commercial programmable thermostat",
        "evidenceText": "CenterPoint Indiana commercial electric service rebates list programmable thermostat at $75 per unit.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/electric-service-rebates?sa=in"
        ],
        "reasoningNotes": "Matched programmable thermostat/control terms. Use one unit as one qualifying thermostat.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f5d77371fe6d74ae_v1",
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
        "formula": "$150 per industrial boiler reset control",
        "evidenceText": "CenterPoint process equipment table lists industrial boiler reset controls at $150 per control system.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates/process-equipment?sa=mn"
        ],
        "reasoningNotes": "Returned separately because boiler reset control is also a matched term.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3752",
    "opportunityName": "Entergy New Orleans - Residential Energy Efficiency Program",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3752/entergy-new-orleans-residential-energy-efficiency-program",
    "websiteUrl": "https://www.energysmartnola.info/residents/",
    "applicationUrl": null,
    "administrator": "Entergy New Orleans and Energy Smart",
    "programType": "Residential Energy Efficiency Rebate And Assessment Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
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
          "refrigerator",
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
          "LA"
        ],
        "counties": [
          "Orleans Parish"
        ],
        "cities": [
          "New Orleans"
        ],
        "utilityTerritories": [
          "Entergy New Orleans electric service territory"
        ],
        "notes": "Available to existing residential Entergy New Orleans electric customers in New Orleans or Orleans Parish; purchaser may live elsewhere if the product is installed at the eligible residence."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_landlord_authorization",
        "multifamily_resident",
        "income_qualified_residential_customer"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "income_qualified_residential"
      ],
      "eligibleRetrofitCategories": [
        "home_energy_assessment",
        "led_lighting_retrofit",
        "smart_power_strip",
        "low_flow_showerhead",
        "faucet_aerator",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "hvac_tune_up",
        "central_air_conditioner",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "heat_pump_clothes_dryer",
        "electric_clothes_dryer",
        "residential_clothes_washer",
        "residential_refrigerator",
        "residential_freezer",
        "residential_refrigerator_freezer_recycling",
        "window_air_conditioner",
        "in_ground_pool_pump",
        "air_purifier",
        "dehumidifier",
        "water_cooler"
      ],
      "hardRequirements": [
        "Customer must be an existing residential Entergy New Orleans electric customer or install the product at such a residence.",
        "Appliance rebates require ENERGY STAR certified listed products and submission within 45 days of purchase.",
        "A/C and heat-pump replacement must be completed through or certified by an Energy Smart participating trade ally.",
        "Gas-heated homes are not currently eligible for insulation and air sealing; aerators and showerheads are only for homes with electric water heating."
      ],
      "blockers": [
        "Do not match window replacement; current support is for window air conditioners, not replacement windows.",
        "Do not match commercial refrigeration or commercial laundry.",
        "Demand response, battery pilot, and bring-your-own-charger offers are separate Energy Smart programs."
      ],
      "programType": "Residential Energy Efficiency Rebate And Assessment Program",
      "administrator": "Entergy New Orleans and Energy Smart",
      "applicationUrl": null,
      "websiteUrl": "https://www.energysmartnola.info/residents/",
      "sourceUrlsChecked": [
        "https://www.energysmartnola.info/residents/",
        "https://energysmartnola.info/home-performance-with-energy-star/",
        "https://energysmartnola.info/income-qualified-weatherization-assessment-form/",
        "https://energysmartnola.info/a-c-solutions/",
        "https://energysmartnola.info/residential-appliances/",
        "https://energysmartnola.info/eno_home_appliance_rebate_form_2026_fillable/"
      ],
      "evidenceText": "Energy Smart NOLA lists residential assessments, A/C tune-ups, duct sealing, central A/C and heat pump rebates, appliance rebates including HPWH and window A/C, refrigerator/freezer recycling, and gas-heated-home limits.",
      "reasoningNotes": "Window and refrigeration terms caused false positives. Keep residential HVAC, HPWH, appliance, assessment, duct, air-sealing, insulation, and product-specific water fixture measures with electric-service restrictions."
    },
    "existingSimpleRules": [
      {
        "id": "oir_695539e27a322679_v1",
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
        "formula": "$1,000 per ENERGY STAR heat pump water heater",
        "evidenceText": "Energy Smart New Orleans 2026 appliance form lists heat pump water heater rebate at $1,000.",
        "sourceUrlsChecked": [
          "https://energysmartnola.info/residential-appliances/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying water heater.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_98ec832f39d5fc49_v1",
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
        "formula": "$15 per qualifying freezer",
        "evidenceText": "Energy Smart New Orleans 2026 appliance form lists freezer rebate at $15.",
        "sourceUrlsChecked": [
          "https://energysmartnola.info/residential-appliances/"
        ],
        "reasoningNotes": "Matched freezer/refrigeration term. Use one unit as one eligible freezer.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ac1eae9faffd49af_v1",
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
        "formula": "$100 per smart thermostat",
        "evidenceText": "Energy Smart New Orleans 2026 appliance form lists smart thermostat rebate at $100.",
        "sourceUrlsChecked": [
          "https://energysmartnola.info/residential-appliances/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Returned separately from appliance rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1807",
    "opportunityName": "Concord Municipal Light Plant - Residential Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1807/concord-municipal-light-plant-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://concordma.gov/1752/Your-Home",
    "applicationUrl": null,
    "administrator": "Concord Municipal Light Plant",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "air sealing",
          "weatherization"
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
          "solar pv"
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
        "counties": [
          "Middlesex County"
        ],
        "cities": [
          "Concord"
        ],
        "utilityTerritories": [
          "Concord Municipal Light Plant electric service territory"
        ],
        "notes": "Available to eligible CMLP customers in Concord, Massachusetts; some natural gas efficiency incentives are handled separately through Mass Save."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_required_property_approval",
        "commercial_customer_for_hpwh_only_where_allowed"
      ],
      "eligibleSectors": [
        "residential",
        "limited_commercial_for_heat_pump_water_heater"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "air_to_water_heat_pump",
        "heat_pump_water_heater",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "rooftop_solar_pv",
        "level_2_ev_charger_installation",
        "home_energy_assessment"
      ],
      "hardRequirements": [
        "Must be an eligible Concord Municipal Light Plant customer.",
        "Weatherization rebates apply to qualifying insulation, air sealing and related work.",
        "Heat pump water heater work requires qualifying equipment and licensed installation, permit and inspection requirements.",
        "Level 2 EV charging incentive applies to qualifying 240V circuit, outlet or charging station costs.",
        "Solar and EV programs have separate program rules and applications."
      ],
      "blockers": [
        "Do not match generic EV charger installation separately from the Level 2 charging incentive.",
        "Do not match DriveEV vehicle purchase incentives as a building retrofit.",
        "Do not treat Mass Save natural gas equipment rebates as part of the CMLP residential electric rebate record.",
        "Do not match broad high_efficiency_hvac_replacement except for supported heat pump categories."
      ],
      "programType": "Rebate Program",
      "administrator": "Concord Municipal Light Plant",
      "applicationUrl": null,
      "websiteUrl": "https://concordma.gov/1752/Your-Home",
      "sourceUrlsChecked": [
        "https://concordma.gov/1752/Your-Home",
        "https://concordma.gov/1870/Rebates-for-your-Home",
        "https://concordma.gov/3021/Heat-Pumps-for-Heating-and-Cooling",
        "https://www.concordma.gov/2024/Heat-Pump-Water-Heaters",
        "https://concordma.gov/2330/Home-Weatherization-Rebates",
        "https://concordma.gov/2029/Solar-Panels"
      ],
      "evidenceText": "CMLP home rebate pages list heat pumps, heat pump water heaters, weatherization, rooftop solar and Level 2 EV charging. DriveEV vehicle purchase incentives and Mass Save gas upgrades are separate.",
      "reasoningNotes": "Retained EV and solar because they appear on the CMLP home rebate resources, but marked vehicle rebates and Mass Save gas incentives as separate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ef51661f89477b6c_v1",
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
        "formula": "Up to $250 per residential Level 2 EV charging system installation",
        "evidenceText": "Concord rebates page says its EV Level 2 Program covers up to $250 on a Level 2 charging system.",
        "sourceUrlsChecked": [
          "https://concordma.gov/1870/Rebates-for-your-Home",
          "https://concordma.gov/1752/Your-Home"
        ],
        "reasoningNotes": "Matched Level 2 EV charging term. Use one unit as one qualifying residential Level 2 installation.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4807",
    "opportunityName": "Wellesley Municipal Light Plant - Residential Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4807/wellesley-municipal-light-plant-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.wellesleyma.gov/799/Electrification-and-Efficiency-Rebates",
    "applicationUrl": null,
    "administrator": "Wellesley Municipal Light Plant",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "MA"
        ],
        "counties": [],
        "cities": [
          "Wellesley"
        ],
        "utilityTerritories": [
          "Wellesley Municipal Light Plant electric service territory"
        ],
        "notes": "Eligible account must be an active WMLP residential electric account in good standing."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "heat_pump_clothes_dryer",
        "residential_induction_cooking",
        "level_2_ev_charger_installation",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must have an active WMLP residential electric account in good standing.",
        "Equipment must be new, permanently installed, and submitted within the required time period.",
        "Level 2 EV charger rebate requires Bring Your Own Charger enrollment.",
        "National Grid gas customers are not eligible for WMLP rebates for specified gas-displacing measures.",
        "New construction is ineligible for listed rebates."
      ],
      "blockers": [
        "Induction cooking is residential cooktop or stove equipment, not commercial kitchen equipment.",
        "EV charging support is specifically for Level 2 charging and requires program enrollment.",
        "Weatherization is limited by WMLP rules and may be blocked for National Grid gas customers.",
        "Do not match this residential program to commercial or industrial measures."
      ],
      "programType": "Rebate",
      "administrator": "Wellesley Municipal Light Plant",
      "applicationUrl": null,
      "websiteUrl": "https://www.wellesleyma.gov/799/Electrification-and-Efficiency-Rebates",
      "sourceUrlsChecked": [
        "https://www.wellesleyma.gov/799/Electrification-and-Efficiency-Rebates"
      ],
      "evidenceText": "WMLP]( lists residential rebates for heat pumps, HPWHs, heat pump dryers, weatherization, induction cooktops or stoves, Level 2 EV chargers, and smart thermostats.",
      "reasoningNotes": "Correct the induction match to residential induction cooking, not commercial kitchen equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_51cffece3f3316f9_v1",
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
        "cap": null,
        "confidence": "high",
        "formula": "$125 per permanent Level 2 EV charger",
        "evidenceText": "Wellesley rebate page lists EV charger Level 2 at $125 with BYOC enrollment required.",
        "sourceUrlsChecked": [
          "https://www.wellesleyma.gov/799/Electrification-and-Efficiency-Rebates",
          "https://wellesleyma.gov/1711/Wellesley-Drives-Electric"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Recurring BYOC monthly credits are excluded.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3286",
    "opportunityName": "Baltimore Gas & Electric Company - Residential Energy Efficiency Rebate Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3286/baltimore-gas-and-electric-company-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.bgesmartenergy.com/residential/rebates-and-discounts",
    "applicationUrl": "https://bgesmartenergy.com/residential/help-me-save/home-performance/rebates",
    "administrator": "Baltimore Gas and Electric Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigerator",
          "freezer"
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
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Baltimore Gas and Electric Company electric and gas service territory"
        ],
        "notes": "Available to eligible BGE residential customers in Maryland service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_required_account_or_property_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "window_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Must be an eligible BGE residential customer.",
        "Home Performance rebates require a participating contractor and eligible installed measures.",
        "Heating and cooling rebates require qualifying equipment and program rules.",
        "Smart thermostat rebates require eligible connected thermostat products.",
        "Appliance recycling rewards require old working eligible appliances picked up for recycling."
      ],
      "blockers": [
        "Do not match high_efficiency_refrigeration_equipment; refrigerator and freezer incentives are appliance recycling rewards, not rebates for new efficient refrigeration equipment.",
        "Do not infer commercial refrigeration or commercial kitchen eligibility from residential appliance terms.",
        "Do not match renewable energy, EV charging or demand response measures unless using a separate BGE program."
      ],
      "programType": "Rebate Program",
      "administrator": "Baltimore Gas and Electric Company",
      "applicationUrl": "https://bgesmartenergy.com/residential/help-me-save/home-performance/rebates",
      "websiteUrl": "https://www.bgesmartenergy.com/residential/rebates-and-discounts",
      "sourceUrlsChecked": [
        "https://www.bgesmartenergy.com/residential/rebates-and-discounts",
        "https://bgesmartenergy.com/residential/help-me-save/home-performance/rebates",
        "https://bgesmartenergy.com/residential/help-me-save/heating-cooling",
        "https://bgesmartenergy.com/residential/help-me-save/appliance-recycling"
      ],
      "evidenceText": "BGE residential pages list Home Performance, heating/cooling, smart thermostat, heat pump water heater and appliance recycling incentives. Fridge/freezer rewards are for recycling old working appliances, not new efficient refrigeration equipment.",
      "reasoningNotes": "Input targets from uploaded queue prompt . Preserved supported residential HVAC, water heating, envelope and thermostat categories. Removed refrigeration equipment match because the source supports recycling only."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1a57be8ac45b3ef2_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 160000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "Up to $1,600 per ENERGY STAR certified heat pump water heater",
        "evidenceText": "BGE Smart Energy lists heat pump water heater rebates up to $1,600.",
        "sourceUrlsChecked": [
          "https://bgesmartenergy.com/residential/rebates-and-discounts/heat-pump-water-heater",
          "https://bgesmartenergy.com/residential/rebates-and-discounts"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Source uses up to, but provides a clear maximum for eligible models.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d116085a425cfda5_v1",
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
        "formula": "$100 per ENERGY STAR certified smart thermostat with professional installation",
        "evidenceText": "BGE Home Performance rebates list $100 per ENERGY STAR certified smart thermostat.",
        "sourceUrlsChecked": [
          "https://bgesmartenergy.com/residential/help-me-save/home-performance/rebates",
          "https://bgesmartenergy.com/residential/rebates-and-discounts"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one eligible thermostat, up to source quantity limits.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3931",
    "opportunityName": "FirstEnergy (Potomac Edison) - Residential Energy Efficiency Rebate Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3931/firstenergy-potomac-edison-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_home.html",
    "applicationUrl": null,
    "administrator": "FirstEnergy / Potomac Edison",
    "programType": "Rebate And Instant Discount",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dishwasher"
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "high efficiency hvac",
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
          "refrigerator",
          "freezer"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Potomac Edison service territory in Maryland"
        ],
        "notes": "Available to Maryland residential Potomac Edison customers through FirstEnergy/EmPOWER Maryland program channels."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "homeowner",
        "renter_with_owner_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_central_air_conditioner",
        "heat_pump_water_heater",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "window_replacement",
        "led_lighting_retrofit",
        "residential_appliance_rebate",
        "appliance_recycling"
      ],
      "hardRequirements": [
        "Must be a Potomac Edison Maryland residential customer.",
        "HVAC discounts require qualifying equipment and participating contractor installation.",
        "Home Performance measures require program audit or approved scope.",
        "Heat pump water heater discounts are limited to eligible residential customers and equipment."
      ],
      "blockers": [
        "High-efficiency commercial dishwasher is not supported by this residential program.",
        "Commercial refrigeration equipment is not supported; refrigerator and freezer references are residential appliances or recycling.",
        "Furnace replacement is not a current supported Potomac Edison Maryland residential rebate category found in official sources.",
        "Demand response and financing are separate FirstEnergy program offerings."
      ],
      "programType": "Rebate And Instant Discount",
      "administrator": "FirstEnergy / Potomac Edison",
      "applicationUrl": null,
      "websiteUrl": "https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_home.html",
      "sourceUrlsChecked": [
        "https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_home.html",
        "https://energysavemd-home.com/",
        "https://energysavemd-home.com/heat-pump-water-heater-discounts/",
        "https://www.firstenergycorp.com/content/dam/customer/billinserts/2026-03%20MD%20EE%20Products%20HVAC.pdf"
      ],
      "evidenceText": "Official]( Maryland program pages list residential HVAC discounts, heat pump water heater discounts, Home Performance rebates, energy-efficient products, and appliance recycling for Potomac Edison customers.",
      "reasoningNotes": "The supplied commercial kitchen and refrigeration matches are false positives from residential appliance terms. Categories are narrowed to residential HVAC, water heating, envelope, lighting, and appliances."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a269378dfb4fb6de_v1",
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
        "confidence": "medium",
        "formula": "Up to $2,500 per heat pump water heater switch-to-electric discount",
        "evidenceText": "Potomac Edison heat pump water heater page says switch-to-electric customers can get up to a $2,500 discount.",
        "sourceUrlsChecked": [
          "https://energysavemd-home.com/heat-pump-water-heater-discounts/",
          "https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_home.html"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Confidence is medium because project path and fuel-switch eligibility control the amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1932",
    "opportunityName": "Anoka Municipal Utility - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1932/anoka-municipal-utility-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.anokamunicipalutility.com/384/Residential-Rebates",
    "applicationUrl": null,
    "administrator": "Anoka Municipal Utility",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dishwasher"
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
          "refrigerator",
          "freezer"
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
        "cities": [
          "Anoka"
        ],
        "utilityTerritories": [
          "Anoka Municipal Utility electric service territory"
        ],
        "notes": "Limited to Anoka Municipal Utility residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_account_or_owner_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_central_air_conditioner",
        "level_2_ev_charger_installation",
        "residential_led_bulbs",
        "residential_clothes_washer",
        "residential_dishwasher",
        "residential_refrigerator_freezer"
      ],
      "hardRequirements": [
        "AMU must be the customer's utility provider.",
        "EV charger rebate applies only to a new Level 2 home charger for a residential AMU customer.",
        "Appliance and A/C rebates must meet AMU product and application requirements."
      ],
      "blockers": [
        "Do not match commercial dishwasher or commercial refrigeration.",
        "Do not match Level 1 or Level 3 EV chargers.",
        "Commercial lighting is a separate AMU form and should not be merged with this residential rebate record."
      ],
      "programType": "Rebate Program",
      "administrator": "Anoka Municipal Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.anokamunicipalutility.com/384/Residential-Rebates",
      "sourceUrlsChecked": [
        "https://www.anokamunicipalutility.com/384/Residential-Rebates",
        "https://www.anokamn.gov/787/Residential-EV-Charger-Rebate",
        "https://anokamunicipalutility.com/614/Residential-Clothes-Washer-Rebate",
        "https://www.anokaminnesota.com/FormCenter/Anoka-Municipal-Utility-AMU-Rebate-Forms-13"
      ],
      "evidenceText": "AMU's residential rebate page lists air conditioners, EV chargers, LED bulbs, clothes washers, dishwashers, and refrigerator/freezers; the EV page specifies new Level 2 residential chargers only.",
      "reasoningNotes": "The commercial appliance matches were false positives caused by residential product names."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1d2f751a3bcf473e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 21500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$215 per eligible unit",
        "evidenceText": "Rebate Type & Terms Rebate Amount Online Application Form Printable/Mail-In Application Air Conditioner (A/C) Rebate Calculated using Energy Efficiency (SEER2 rating & tonnage ) Online A/C Rebate Application Form Printable A/C Rebate Application (PDF) EV Charger Rebate $215",
        "sourceUrlsChecked": [
          "https://www.anokamunicipalutility.com/384/Residential-Rebates"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5527",
    "opportunityName": "Minnkota Power Cooperative (12 Utilities) - Value of Electricity Campaign Off-Peak Rebates",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5527/minnkota-power-cooperative-12-utilities-value-of-electricity-campaign-off-peak-rebates",
    "websiteUrl": "https://www.minnkota.com/our-programs/rebates-energy-incentives",
    "applicationUrl": null,
    "administrator": "Minnkota Power Cooperative and participating member utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "mini split"
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
          "MN",
          "ND"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Beltrami Electric Cooperative",
          "Cass County Electric Cooperative",
          "Cavalier Rural Electric Cooperative",
          "Clearwater-Polk Electric Cooperative",
          "Nodak Electric Cooperative",
          "North Star Electric Cooperative",
          "PKM Electric Cooperative",
          "Red Lake Electric Cooperative",
          "Red River Valley Co-op Power",
          "Roseau Electric Cooperative",
          "Wild Rice Electric Cooperative",
          "City of Alvarado",
          "Bagley Public Utilities",
          "Baudette Municipal Utilities",
          "Fosston Municipal Utilities",
          "Grafton Municipal Utilities",
          "Halstad Municipal Utilities",
          "Hawley Public Utilities",
          "Park River Municipal Utilities",
          "Roseau Municipal Utilities",
          "City of Stephen Utilities",
          "Thief River Falls Municipal Utilities",
          "City of Warren Water & Light",
          "Warroad Municipal Utilities"
        ],
        "notes": "Minnkota member cooperatives and participating municipal utilities set their own program rules and restrictions."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "business_customers",
        "farm_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "level_3_ev_charger_installation",
        "air_source_heat_pump",
        "mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "electric_boiler",
        "electric_resistance_heating",
        "thermal_storage_heating",
        "electric_water_heater"
      ],
      "hardRequirements": [
        "Customer must be served by a participating Minnkota member cooperative or municipal utility.",
        "Most electric heating and water-heating equipment must be enrolled in the off-peak or demand response program where specified.",
        "EV chargers must be Level 2 or Level 3, hardwired at 240 volts or higher, and enrolled in demand response where required.",
        "Each local utility may impose additional requirements, caps, and documentation rules."
      ],
      "blockers": [
        "Do not treat this as a gas furnace or high-efficiency fossil boiler rebate.",
        "Generic HVAC replacement is too broad; supported HVAC measures are electric heat pumps or specific off-peak electric heating equipment.",
        "EV incentive is for qualifying charging equipment, not vehicle purchase."
      ],
      "programType": "Rebate Program",
      "administrator": "Minnkota Power Cooperative and participating member utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.minnkota.com/our-programs/rebates-energy-incentives",
      "sourceUrlsChecked": [
        "https://www.minnkota.com/our-programs/rebates-energy-incentives",
        "https://www.valueofelectricity.com/capture-the-value/electric-technology-rebates"
      ],
      "evidenceText": "Minnkota]( lists rebates for qualifying off-peak electric heating and water heating, air-source and mini-split heat pumps, ground-source heat pumps, and Level 2 or Level 3 EV charging equipment.",
      "reasoningNotes": "The boiler and furnace terms refer to electric boilers or electric forced-air/off-peak equipment, not high-efficiency gas boiler or gas furnace retrofits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ae02a09a5e192dd5_v1",
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
        "formula": "$150 per eligible unit",
        "evidenceText": "Qualifying equipment will receive a rebate of $150 per ton installed",
        "sourceUrlsChecked": [
          "https://www.minnkota.com/our-programs/rebates-energy-incentives"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2474",
    "opportunityName": "Yellowstone Valley Electric Cooperative - Residential/Commercial Efficiency Rebate Program",
    "state": "MT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2474/yellowstone-valley-electric-cooperative-residential-commercial-efficiency-rebate-program",
    "websiteUrl": "https://www.yvec.com/member-services/rebates/",
    "applicationUrl": null,
    "administrator": "Yellowstone Valley Electric Cooperative",
    "programType": "Residential And Commercial Member Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dishwasher"
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
          "MT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Yellowstone Valley Electric Cooperative service territory"
        ],
        "notes": "Official pages were partly access-restricted, but official indexed pages identify current YVEC member rebates."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_member",
        "residential_customer",
        "commercial_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "add_on_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "energy_star_lighting_rebate",
        "residential_energy_star_dishwasher",
        "residential_clothes_washer",
        "residential_refrigerator",
        "electric_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a YVEC member with qualifying service.",
        "Rebate submissions generally must be made no later than 90 days after purchase.",
        "Equipment must meet the specific YVEC rebate page or form requirements.",
        "Smart thermostat rebate requires qualifying ENERGY STAR equipment connected to YVEC service.",
        "Rebates are subject to current YVEC program limits and funding."
      ],
      "blockers": [
        "Residential ENERGY STAR dishwasher and refrigerator rebates should not be generalized into commercial kitchen or commercial refrigeration retrofits.",
        "Do not match broad commercial kitchen equipment from residential appliance terms.",
        "Lighting should be treated as the specific YVEC Energy Star lighting rebate, not an inferred custom lighting program.",
        "Projects outside YVEC service territory are ineligible."
      ],
      "programType": "Residential And Commercial Member Rebate Program",
      "administrator": "Yellowstone Valley Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.yvec.com/member-services/rebates/",
      "sourceUrlsChecked": [
        "https://www.yvec.com/member-services/rebates/",
        "https://www.yvec.com/member-services/rebates/energy-star-rebate/",
        "https://www.yvec.com/member-services/rebates/add-on-heat-pump-rebate/",
        "https://www.yvec.com/smart-thermostat-rebate/",
        "https://www.yvec.com/member-services/rebates/water-heater-rebate/"
      ],
      "evidenceText": "YVEC rebate pages identify geothermal or add-on heat pumps, smart thermostats, Energy Star lighting, Energy Star appliances, and electric water heaters for members.",
      "reasoningNotes": "The current official site was not fully readable, but official indexed pages support the main categories. The commercial dishwasher and commercial refrigeration matches are false positives from residential appliance terms."
    },
    "existingSimpleRules": [
      {
        "id": "oir_969954e63b7ffc66_v1",
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
        "formula": "$100 per qualifying ENERGY STAR refrigerator, dishwasher, or washing machine",
        "evidenceText": "YVEC ENERGY STAR rebate table lists dishwashers, washing machines, and refrigerators at $100.",
        "sourceUrlsChecked": [
          "https://www.yvec.com/energy-star-rebates"
        ],
        "reasoningNotes": "Matched refrigerator and clothes washer terms. Use one unit as one qualifying appliance.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22748",
    "opportunityName": "North Carolina - Home Electrification and Appliance Rebate (HEAR) Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22748/north-carolina-home-electrification-and-appliance-rebate-hear-program",
    "websiteUrl": "https://energysavernc.org/",
    "applicationUrl": null,
    "administrator": "North Carolina Department of Environmental Quality",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Energy Saver NC HEAR is available in all 100 North Carolina counties through registered contractors."
      },
      "eligibleApplicantTypes": [
        "low_income_households",
        "moderate_income_households",
        "homeowners",
        "renters",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "mechanical_ventilation",
        "electrical_panel_upgrade",
        "electrical_wiring",
        "residential_electric_range_cooktop",
        "heat_pump_clothes_dryer"
      ],
      "hardRequirements": [
        "Household income must be at or below 150 percent of area median income.",
        "Projects must be completed through a registered contractor after eligibility approval.",
        "Tier 1 households may receive up to full eligible cost limits; Tier 2 households receive partial cost coverage.",
        "Renters need landlord approval where applicable.",
        "No self-install or retroactive HEAR rebates; supporting electric upgrades must support eligible electrification equipment."
      ],
      "blockers": [
        "Do not match commercial kitchen induction or industrial process electrification.",
        "Generic high-efficiency HVAC is too broad; HEAR supports qualifying electric heat pumps.",
        "The same measure cannot receive both federal HOMES and HEAR rebates; funding is subject to program availability."
      ],
      "programType": "Rebate Program",
      "administrator": "North Carolina Department of Environmental Quality",
      "applicationUrl": null,
      "websiteUrl": "https://energysavernc.org/",
      "sourceUrlsChecked": [
        "https://www.energysavernc.org/about-the-program/home-electrification-and-appliance-rebates-hear/",
        "https://www.energysavernc.org/frequently-asked-questions/",
        "https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina/energy-efficiency-rebates",
        "https://www.deq.nc.gov/news/press-releases/2026/02/10/governor-stein-deq-announce-cost-saving-energy-program-now-available-all-100-counties"
      ],
      "evidenceText": "Energy]( Saver NC HEAR provides income-limited instant discounts for heat pumps, heat pump water heaters, electric cooking, heat pump dryers, insulation, air sealing, ventilation, panels and wiring.",
      "reasoningNotes": "The original induction and process-electrification matches must be narrowed to residential electric cooking and supporting household electrification measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0f411e33b012a871_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 800000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $8,000 per eligible heat pump for space heating and cooling",
        "evidenceText": "NC DEQ HEAR table lists heat pump for space heating and cooling at up to $8,000.",
        "sourceUrlsChecked": [
          "https://www.deq.nc.gov/energy-climate/state-energy-office/incentives/home-energy-rebates",
          "https://www.deq.nc.gov/home-energy-rebates"
        ],
        "reasoningNotes": "Matched heat pump/electrification terms. HEAR amount depends on household income and eligibility.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_303d28d7091ef7ba_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 175000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $1,750 per eligible heat pump water heater",
        "evidenceText": "NC DEQ HEAR table lists heat pump water heaters at up to $1,750.",
        "sourceUrlsChecked": [
          "https://www.deq.nc.gov/energy-climate/state-energy-office/incentives/home-energy-rebates",
          "https://www.deq.nc.gov/home-energy-rebates"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned separately from heat pump HVAC.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_8e846ffd918b82a3_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 160000
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $1,600 for eligible insulation, air sealing, and ventilation",
        "evidenceText": "NC DEQ HEAR table lists insulation, air sealing, and ventilation at up to $1,600.",
        "sourceUrlsChecked": [
          "https://www.deq.nc.gov/energy-climate/state-energy-office/incentives/home-energy-rebates",
          "https://www.deq.nc.gov/home-energy-rebates"
        ],
        "reasoningNotes": "Matched insulation and air sealing terms. Modeled as a project-level cap.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b34e57d29b268b07_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 84000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $840 per eligible electric stove, cooktop, range, or oven",
        "evidenceText": "NC DEQ HEAR table lists electric stove, cooktop, range, or oven at up to $840.",
        "sourceUrlsChecked": [
          "https://www.deq.nc.gov/energy-climate/state-energy-office/incentives/home-energy-rebates",
          "https://www.deq.nc.gov/home-energy-rebates"
        ],
        "reasoningNotes": "Matched induction/oven electrification term. Returned separately from HVAC and envelope measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3625",
    "opportunityName": "Southern Power District - Residential Energy Efficiency Rebate Programs",
    "state": "NE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3625/southern-power-district-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://southernpd.energywisenebraska.com/residential/",
    "applicationUrl": null,
    "administrator": "Southern Power District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "NE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southern Power District",
          "EnergyWise Nebraska participating utility"
        ],
        "notes": "Residential EnergyWise rebates for Southern Power District customers."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential",
        "individually_metered_multifamily"
      ],
      "eligibleRetrofitCategories": [
        "attic_insulation_upgrade",
        "cooling_system_tune_up",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "heat_pump_water_heater",
        "induction_cooking_equipment",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Southern Power District residential electric customer.",
        "Attic insulation rebate requires primary electric heat and applies only to attic insulation.",
        "Heat pump equipment must meet AHRI and program requirements.",
        "Smart thermostat rebate requires home Wi-Fi and central air conditioning or a heat pump.",
        "New construction and additions are excluded from several measures."
      ],
      "blockers": [
        "Induction cooking is residential cooktop or range equipment, not commercial kitchen equipment.",
        "Non-attic insulation, including walls, floors, crawlspaces and foundations, is not eligible under the attic insulation rebate.",
        "Window air conditioners, PTACs and PTHPs are excluded from the tune-up rebate.",
        "Commercial and industrial customers do not qualify for the residential smart thermostat rebate.",
        "Dollar and Energy Savings Loans are separate financing."
      ],
      "programType": "Rebate Program",
      "administrator": "Southern Power District",
      "applicationUrl": null,
      "websiteUrl": "https://southernpd.energywisenebraska.com/residential/",
      "sourceUrlsChecked": [
        "https://southernpd.energywisenebraska.com/residential/",
        "https://southernpd.com/smart-thermostats/"
      ],
      "evidenceText": "The Southern Power District EnergyWise page lists residential attic insulation, cooling tune-up, high-efficiency heat pumps including ductless and geothermal, heat pump water heaters, induction cooktops or ranges and smart thermostats. It limits insulation to attic only and excludes commercial smart thermostat customers.",
      "reasoningNotes": "Narrow insulation to attic insulation. Keep residential heat pump, geothermal, HPWH, smart thermostat and residential induction categories, but block commercial-kitchen interpretation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5516f9eb7210561a_v1",
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
        "confidence": "high",
        "formula": "$75 per qualifying smart thermostat",
        "evidenceText": "Southern Power District smart thermostat page lists a $75 EnergyWise incentive.",
        "sourceUrlsChecked": [
          "https://southernpd.com/smart-thermostats/",
          "https://nppd.energywisenebraska.com/residential/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2163",
    "opportunityName": "New Hampshire Electric Co-op - Residential Energy Efficiency Rebate Programs",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2163/new-hampshire-electric-co-op-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.nhec.com/energy-savings/",
    "applicationUrl": null,
    "administrator": "New Hampshire Electric Co-op",
    "programType": "Rebate And Weatherization Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 7,
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
          "New Hampshire Electric Cooperative"
        ],
        "notes": "Available to eligible NHEC members; some offerings are administered through NHSaves pathways."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "income_eligible_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "residential_energy_star_appliance_rebate",
        "ventilation_improvements"
      ],
      "hardRequirements": [
        "Applicant must be an eligible NHEC residential member or income-qualified customer for income-based services.",
        "Weatherization generally starts with an energy audit or home energy assessment.",
        "Heat pumps, heat pump water heaters, appliances, and weatherization measures must meet current program specifications.",
        "Income-eligible weatherization and equipment replacement are subject to qualification and program approval."
      ],
      "blockers": [
        "Residential appliance references should not match commercial refrigeration equipment.",
        "EV incentives are a separate NHEC program and should not be merged into the residential energy efficiency rebate record.",
        "No current NHEC page support was found for broad LED lighting rebates in this record."
      ],
      "programType": "Rebate And Weatherization Incentive Program",
      "administrator": "New Hampshire Electric Co-op",
      "applicationUrl": null,
      "websiteUrl": "https://www.nhec.com/energy-savings/",
      "sourceUrlsChecked": [
        "https://www.nhec.com/energy-savings/",
        "https://www.nhsaves.com/learn/incentives-and-rebates/"
      ],
      "evidenceText": "NHEC]( residential energy-savings pages identify appliances, heat pumps, heat pump water heaters, energy audits, weatherization, air sealing, insulation and income-eligible weatherization support.",
      "reasoningNotes": "Keep residential heat pump, water heating and weatherization categories; remove commercial refrigeration and unrelated lighting assumptions."
    },
    "existingSimpleRules": [
      {
        "id": "oir_853ce9b5d9f3f9c2_v1",
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
        "formula": "$250 per ton for standard air-source heat pump",
        "evidenceText": "NHEC heat pump page lists air-source heat pump standard incentive at $250 per ton.",
        "sourceUrlsChecked": [
          "https://www.nhec.com/heat-pumps-and-heat-pump-water-heaters/"
        ],
        "reasoningNotes": "Matched heat pump term. Use unit_count as eligible tons.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_aea9e0377681a27b_v1",
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
        "formula": "$750 per qualifying heat pump water heater",
        "evidenceText": "NHSaves/NHEC materials identify $750 rebates for heat pump water heaters.",
        "sourceUrlsChecked": [
          "https://www.nhec.com/heat-pumps-and-heat-pump-water-heaters/",
          "https://nhsaves.com/rebates-services-appliances/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Medium confidence because HPWH amount is described through NHSaves materials.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3842",
    "opportunityName": "El Paso Electric Company - Residential Efficiency Program",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3842/el-paso-electric-company-residential-efficiency-program",
    "websiteUrl": "https://www.epesaver.com/residential-comprehensive/",
    "applicationUrl": null,
    "administrator": "El Paso Electric",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "El Paso Electric New Mexico residential service territory"
        ],
        "notes": "Available to eligible El Paso Electric New Mexico residential customers; some measures have small-commercial variants outside this residential record."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_account_or_owner_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "cool_roof_reflective_roof",
        "solar_screens",
        "energy_star_window_replacement",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "energy_star_pool_pump",
        "solar_attic_fan",
        "window_air_conditioner",
        "evaporative_cooler",
        "induction_cooktop_range"
      ],
      "hardRequirements": [
        "Customer must be an EPE New Mexico residential customer unless a measure page specifically states otherwise.",
        "Smart thermostat rebates require refrigerated air conditioning; homes with only evaporative cooling are ineligible.",
        "Products must meet EPE ENERGY STAR, AHRI, installation, and application rules."
      ],
      "blockers": [
        "Do not match commercial induction cooking equipment.",
        "Do not generalize pool pump rebates into motor or VFD retrofits beyond the listed ENERGY STAR pool pump measure.",
        "Window matches are residential ENERGY STAR replacement windows, while window A/C is a separate appliance measure."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "El Paso Electric",
      "applicationUrl": null,
      "websiteUrl": "https://www.epesaver.com/residential-comprehensive/",
      "sourceUrlsChecked": [
        "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs",
        "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive",
        "https://www.epesaver.com/residential-comprehensive/",
        "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive/energy-star-smart-thermostats"
      ],
      "evidenceText": "EPE New Mexico residential materials list refrigerated cooling, heat pumps, cool roofs, solar screens, ENERGY STAR windows, air sealing, duct sealing, insulation, smart thermostats, heat pump water heaters, pool pumps, solar attic fans, window A/C, evaporative cooling, and induction cooking.",
      "reasoningNotes": "Induction should be kept only as residential induction cooktops or ranges. Other categories are supported by current EPE residential sources."
    },
    "existingSimpleRules": [
      {
        "id": "oir_344ca27fc5497cf3_v1",
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
        "formula": "$50 per ENERGY STAR smart thermostat",
        "evidenceText": "EPE New Mexico program page lists ENERGY STAR smart thermostat rebate of $50.",
        "sourceUrlsChecked": [
          "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive/energy-star-smart-thermostats"
        ],
        "reasoningNotes": "Matched smart thermostat term. Applies to eligible New Mexico residential service-area thermostats.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4619",
    "opportunityName": "New Mexico Gas Company - Residential Efficiency Programs",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4619/new-mexico-gas-company-residential-efficiency-programs",
    "websiteUrl": "https://www.nmgco.com/en/residential_rebate_programs",
    "applicationUrl": "https://nmgcgetrebates.com/residential-offers",
    "administrator": "New Mexico Gas Company / CLEAResult",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "New Mexico Gas Company"
        ],
        "notes": "Residential rebates are limited to NMGC residential natural gas customers; some measures require gas space heat."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "smart_thermostat_zoning_retrofit",
        "gas_water_heater_replacement",
        "low_flow_showerhead_aerator"
      ],
      "hardRequirements": [
        "Applicant must have an active residential New Mexico Gas Company account.",
        "Insulation, air sealing, and duct sealing require gas space heating and current program specifications.",
        "Air and duct sealing require pre- and post-work blower or duct testing where specified.",
        "Equipment must be qualifying new gas equipment and may require participating contractor installation, receipts, model data, and application deadlines."
      ],
      "blockers": [
        "Do not match electric heat pumps or broad electric HVAC replacement.",
        "Do not match commercial kitchen, commercial refrigeration, motors, or industrial measures.",
        "Water-saving kit measures are showerheads, aerators, weather stripping and door sweeps; do not generalize beyond listed kit items."
      ],
      "programType": "Rebate Program",
      "administrator": "New Mexico Gas Company / CLEAResult",
      "applicationUrl": "https://nmgcgetrebates.com/residential-offers",
      "websiteUrl": "https://www.nmgco.com/en/residential_rebate_programs",
      "sourceUrlsChecked": [
        "https://www.nmgco.com/en/residential_rebate_programs",
        "https://nmgcgetrebates.com/residential-offers",
        "https://nmgcgetrebates.com/insulation-rebates"
      ],
      "evidenceText": "NMGC]( residential pages list active rebates for smart thermostats, air sealing, duct sealing, gas furnace and boiler upgrades, insulation, gas water heating, and free energy or water savings kits.",
      "reasoningNotes": "The target categories are mostly valid but should be gas-specific; high-efficiency HVAC is too broad without gas furnace or boiler context."
    },
    "existingSimpleRules": [
      {
        "id": "oir_86594db650295ac0_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 42500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $425 per high-efficiency gas furnace or boiler",
        "evidenceText": "New Mexico Gas residential rebate page says high-efficiency gas furnace or boiler rebates range from $325 to $425.",
        "sourceUrlsChecked": [
          "https://www.nmgco.com/en/residential_rebate_programs"
        ],
        "reasoningNotes": "Matched furnace/boiler terms. Modeled as the top tier with medium confidence because exact amount depends on equipment.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c33bcc0b47b11a42_v1",
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
        "formula": "$50 per ENERGY STAR smart thermostat",
        "evidenceText": "New Mexico Gas residential rebate page says customers get a $50 rebate when upgrading to a smart thermostat.",
        "sourceUrlsChecked": [
          "https://www.nmgco.com/en/residential_rebate_programs",
          "https://nmgcgetrebates.com/smart-thermostat-rebates"
        ],
        "reasoningNotes": "Matched smart thermostat/control terms. Use one unit as one eligible thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4691",
    "opportunityName": "ConEd (Gas) - Commercial and Industrial Energy Efficiency Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4691/coned-gas-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades",
    "applicationUrl": null,
    "administrator": "Con Edison",
    "programType": "Commercial And Industrial Energy Efficiency Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "building_automation_system",
        "displayName": "Building automation system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "building automation",
          "building automation system"
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
          "refrigeration"
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
        "counties": [],
        "cities": [
          "New York"
        ],
        "utilityTerritories": [
          "Con Edison commercial and industrial gas and electric service territory"
        ],
        "notes": "Gas-saving measures require eligible commercial gas accounts; electric measures require eligible C&I electric service and program pathway."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "multifamily_building_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "building_automation_system",
        "building_management_controls",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "linear_pipe_insulation",
        "chiller_replacement",
        "chiller_plant_optimization",
        "building_envelope_upgrade",
        "window_replacement",
        "wall_roof_insulation",
        "demand_control_ventilation",
        "heat_pump_hvac_retrofit"
      ],
      "hardRequirements": [
        "Applicant must have an eligible Con Edison commercial or industrial account for the relevant gas or electric measure.",
        "Gas accounts excluded by service classification or negotiated terms are not eligible for gas-saving incentives.",
        "Building envelope projects require required documentation and Con Edison approval."
      ],
      "blockers": [
        "Do not match residential measures under this commercial and industrial record.",
        "Do not treat generic furnace replacement as verified unless a current Con Edison measure sheet specifically supports it.",
        "Lighting controls were not supported by the current gas-focused page checked; match lighting only through a separate current electric source if verified."
      ],
      "programType": "Commercial And Industrial Energy Efficiency Incentive Program",
      "administrator": "Con Edison",
      "applicationUrl": null,
      "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades",
      "sourceUrlsChecked": [
        "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades",
        "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades/program-tools-technical-guidelines"
      ],
      "evidenceText": "Con Edison's C&I page lists prescriptive HVAC, refrigeration, linear pipe insulation, and custom measures such as chiller replacement, BMS upgrades, chiller optimization, envelope upgrades, and demand control ventilation.",
      "reasoningNotes": "Current official pages support C&I controls, HVAC, refrigeration, pipe insulation, chiller, and envelope categories. Remove unsupported residential and lighting-control assumptions for this gas-labeled record."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e6156444bf99d8bf_v1",
        "incentiveType": "fixed_per_unit_rebate",
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
          "maxAmountCents": 200000
        },
        "confidence": "medium",
        "formula": "100% of eligible project cost, capped at $2,000",
        "evidenceText": "e - Chiller Replacements - Building Management System Upgrades and Controls - Chiller Plant Optimization - Building Envelope - Demand Controlled Ventilation Back to top * Rates can be found in the Program Manual See all incentives Buildings in Southeast Queens can access an additional $2,000 per kW to cover up to 100% of the installation cost of eligible equipment upgrades",
        "sourceUrlsChecked": [
          "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3485",
    "opportunityName": "National Fuel (Gas) - Residential Energy Efficiency Rebates",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3485/national-fuel-gas-residential-energy-efficiency-rebates",
    "websiteUrl": "https://www.nationalfuel.com/utility/about-the-rebate-program/get-your-rebates-ny-home/",
    "applicationUrl": null,
    "administrator": "National Fuel Gas Distribution Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "retrofitTypeId": "boiler_controls_burner_retrofit",
        "displayName": "Boiler controls / burner retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler reset"
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
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "National Fuel Gas - Western New York service territory"
        ],
        "notes": "Current residential WeatherWise savings page is for National Fuel residential customers in Western New York."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customers",
        "homeowners",
        "landlords"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "duct_sealing_and_insulation",
        "pipe_insulation",
        "energy_recovery_ventilation_retrofit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "weatherization_package"
      ],
      "hardRequirements": [
        "Applicant must be an eligible National Fuel residential natural gas customer in Western New York.",
        "Measures must meet current WeatherWise rebate requirements and documentation rules.",
        "Air leakage sealing requires a blower door test where specified.",
        "Rebates may be capped by measure limits and project-cost percentage caps."
      ],
      "blockers": [
        "Current residential page does not support battery storage.",
        "Current residential page does not list furnace, boiler, or heat pump equipment rebates for this WNY WeatherWise offer.",
        "Do not generalize pipe insulation or ERV measures into broad HVAC replacement."
      ],
      "programType": "Rebate Program",
      "administrator": "National Fuel Gas Distribution Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.nationalfuel.com/utility/about-the-rebate-program/get-your-rebates-ny-home/",
      "sourceUrlsChecked": [
        "https://www.nationalfuel.com/utility/about-the-rebate-program/",
        "https://www.nationalfuel.com/utility/about-the-rebate-program/get-your-rebates-ny-home/"
      ],
      "evidenceText": "The]( current WeatherWise page lists WNY residential rebates for smart thermostats, duct and pipe insulation, energy or heat recovery ventilation, air leakage sealing, and insulation/weatherization packages.",
      "reasoningNotes": "Older boiler, furnace and heat pump matches appear stale for the current WNY home rebate page; keep weatherization and controls only."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a921b42626a3463c_v1",
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
        "formula": "$200 per connected or ENERGY STAR rated smart thermostat",
        "evidenceText": "National Fuel residential rebate application lists connected or ENERGY STAR smart thermostat at $200.",
        "sourceUrlsChecked": [
          "https://www.nationalfuel.com/utility/energy-efficiency-rebate-program/",
          "https://www.nationalfuel.com/utility/energy-efficiency-rebate-program/get-your-rebates-ny-residential/"
        ],
        "reasoningNotes": "Matched thermostat term. Use one unit as one eligible thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2004",
    "opportunityName": "PSEG Long Island - Commercial Energy Efficiency Rebate Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2004/pseg-long-island-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/rebates",
    "applicationUrl": "https://www.pseglinyportal.com/",
    "administrator": "PSEG Long Island / Long Island Power Authority",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "air sealing",
          "weatherization"
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
          "vfd"
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
          "Nassau",
          "Suffolk",
          "Queens"
        ],
        "cities": [],
        "utilityTerritories": [
          "PSEG Long Island"
        ],
        "notes": "Commercial Efficiency Program service area includes Nassau and Suffolk counties and the Rockaways portion of Queens County."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customers",
        "industrial_electric_customers",
        "institutional_customers",
        "education_customers",
        "municipal_customers",
        "multifamily_building_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "education",
        "municipal",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "pipe_insulation",
        "air_curtain",
        "high_efficiency_refrigeration_equipment",
        "compressed_air_efficiency",
        "variable_frequency_drive_retrofit",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "energy_recovery_ventilation_retrofit",
        "heat_recovery_ventilation",
        "kitchen_demand_control_ventilation",
        "chiller_replacement",
        "chiller_plant_optimization",
        "building_management_system_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be a non-residential PSEG Long Island electric customer in the service area.",
        "Commercial weatherization applies to small businesses of 10,000 square feet or less.",
        "Projects generally require pre-approval and a pre-installation survey unless waived.",
        "Energy conservation measures must be new, qualifying, documented, and installed by licensed contractors where required.",
        "Custom measures must save facility electric energy and be approved by PSEG Long Island."
      ],
      "blockers": [
        "Do not match residential weatherization to this commercial program.",
        "LED lighting is not listed in the current 2026 PSEG Long Island commercial rebate menu and should only be matched if PSEG confirms it as an approved strategic custom measure.",
        "EV make-ready and fleet electrification incentives are separate PSEG Long Island programs."
      ],
      "programType": "Rebate Program",
      "administrator": "PSEG Long Island / Long Island Power Authority",
      "applicationUrl": "https://www.pseglinyportal.com/",
      "websiteUrl": "https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/rebates",
      "sourceUrlsChecked": [
        "https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/rebates",
        "https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/commercialefficiencyrebateprogram",
        "https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/-/media/A820FFEE8E784363B5AB7459B1E3EC77.ashx",
        "https://www.psegliny.com/Newsroom/2025/030626-BizGrants"
      ],
      "evidenceText": "PSEG]( Long Island's 2026 commercial program lists weatherization, compressed air, custom heat pumps, refrigeration, ventilation, heat pump water heating, chiller and BMS custom measures.",
      "reasoningNotes": "Air sealing, duct sealing, insulation, refrigeration and VFD-related compressed-air measures are valid. Lighting should be blocked unless approved under current custom strategic rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_33177eed744c7652_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 9500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$95 per eligible unit",
        "evidenceText": "= 200HP Measure Incentive Variable Speed Drives $95/HP Variable Displacement $60/HP Storage Tanks &lt",
        "sourceUrlsChecked": [
          "https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  }
]
