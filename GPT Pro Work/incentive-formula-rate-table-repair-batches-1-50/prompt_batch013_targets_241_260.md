You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 13
Targets in this prompt: 241-260 of 984
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
  "batchNumber": 13,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3745"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4710",
    "opportunityName": "United Power - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4710/united-power-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.unitedpower.com/commercial-rebates",
    "applicationUrl": null,
    "administrator": "United Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting",
          "led fixture"
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
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "variable speed drive"
        ]
      },
      {
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "walk in cooler"
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
          "United Power"
        ],
        "notes": "Applies to United Power members with eligible equipment connected to or used on the United Power distribution system."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "electric_cooperative_member",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "electric_forklift_material_handling",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "high_efficiency_electric_motors",
        "high_efficiency_refrigeration_equipment"
      ],
      "hardRequirements": [
        "Products or services must be purchased by a United Power member and connected to or used on the United Power distribution system.",
        "Equipment must be new; used, refurbished, or warranty-replacement equipment is not eligible.",
        "Rebate requests must be submitted within the current program deadline after purchase, invoice, delivery, or installation.",
        "Some measures require Key Accounts Advisor verification, preauthorization, and documentation."
      ],
      "blockers": [
        "Low-flow fixture retrofits are not supported by the checked United Power commercial rebate page.",
        "Public EV charger incentives are a separate United Power program and should not be merged into the C&I efficiency rebate.",
        "Walk-in cooler/freezer matching should be narrowed to verified refrigeration measures, not assumed if only generic refrigeration is listed."
      ],
      "programType": "Rebate Program",
      "administrator": "United Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.unitedpower.com/commercial-rebates",
      "sourceUrlsChecked": [
        "https://www.unitedpower.com/commercial-rebates",
        "https://www.unitedpower.com/rebates"
      ],
      "evidenceText": "United]( Power's 2026 commercial rebate page supports commercial LED lighting, occupancy sensors, electric motors, variable-speed drives, electric forklifts and pallet jacks, and refrigeration-related measures.",
      "reasoningNotes": "Keep C&I lighting, controls, motors, VSD, forklift, and refrigeration. Remove water low-flow fixtures and separate public EV charging from this opportunity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_54447511a5d5a2aa_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.25
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.25
        },
        "confidence": "medium",
        "formula": "25% of variable speed drive equipment cost",
        "evidenceText": "United Power says VSD incentive is the lower of 25% of VSD equipment costs or program information.",
        "sourceUrlsChecked": [
          "https://www.unitedpower.com/commercial-rebates"
        ],
        "reasoningNotes": "Matched variable speed drive term. Confidence is medium because program information may set additional measure-specific limits.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b7b8ce279ebee604_v1",
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
          "maxAmountCents": 250000
        },
        "confidence": "high",
        "formula": "50% of electric forklift cost, capped at $2,500",
        "evidenceText": "United Power commercial rebates list electric forklift at 50% of cost, maximum $2,500.",
        "sourceUrlsChecked": [
          "https://www.unitedpower.com/commercial-rebates"
        ],
        "reasoningNotes": "Matched electric forklift term. Use only for new units replacing fossil-fuel engine-driven devices.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1772",
    "opportunityName": "Groton Utilities - Residential Energy Efficiency Rebate Program",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1772/groton-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://grotonutilities.com/energy-conservation/rebate-center/",
    "applicationUrl": "https://grotonutilities.com/238/Rebates---Groton-Utilities-Residential",
    "administrator": "Groton Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "heat pump",
          "mini split"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CT"
        ],
        "counties": [],
        "cities": [
          "Groton",
          "Bozrah"
        ],
        "utilityTerritories": [
          "Groton Utilities electric service territory",
          "Bozrah Light and Power electric service territory"
        ],
        "notes": "Residential rebates are available to eligible Groton Utilities and Bozrah Light and Power electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "municipal_utility_customer",
        "homeowner",
        "multifamily_owner"
      ],
      "eligibleSectors": [
        "residential",
        "small_multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_or_repair",
        "low_flow_water_fixtures",
        "led_lighting_retrofit",
        "insulation_upgrade",
        "attic_insulation",
        "heat_pump_water_heater",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner_replacement",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a residential electric customer of Groton Utilities or Bozrah Light and Power.",
        "Account must meet current good-standing or zero-balance requirements where specified.",
        "Attic insulation requires a Home Energy Savings inspection before installation and a licensed contractor.",
        "Heat pump water heaters must be ENERGY STAR qualifying with the required UEF and installed by a licensed contractor.",
        "HVAC rebates require qualifying equipment documentation, AHRI certificate, contractor invoice, and timely application.",
        "Smart thermostats must be eligible Wi-Fi devices and are capped per account."
      ],
      "blockers": [
        "Removable window room air conditioners are excluded from the HVAC rebate page.",
        "Commercial and industrial rebates are separate and should not be merged.",
        "Heat pump water heater installation labor is not rebated under the current HPWH terms.",
        "Solar, EV, and other information-center offerings are separate from this residential rebate repair."
      ],
      "programType": "Rebate Program",
      "administrator": "Groton Utilities",
      "applicationUrl": "https://grotonutilities.com/238/Rebates---Groton-Utilities-Residential",
      "websiteUrl": "https://grotonutilities.com/energy-conservation/rebate-center/",
      "sourceUrlsChecked": [
        "https://grotonutilities.com/energy-conservation/rebate-center/",
        "https://grotonutilities.com/238/Rebates---Groton-Utilities-Residential",
        "https://grotonutilities.com/237/Home-Energy-Savings-Program",
        "https://grotonutilities.com/240/Attic-Insulation-Rebate",
        "https://www.grotonutilities.com/242/Residential-HVAC-AC-Rebates",
        "https://grotonutilities.com/243/Residential-Heat-Pump-Water-Heater-Rebat",
        "https://grotonutilities.com/244/Residential-Smart-Thermostat-Rebate"
      ],
      "evidenceText": "Groton]( residential rebate pages list Home Energy Savings, attic insulation, heat pump water heaters, HVAC mini-splits and central air, and smart thermostats for Groton Utilities and Bozrah Light and Power customers.",
      "reasoningNotes": "The original heat pump, HPWH, air sealing, and insulation matches are valid, but HVAC must exclude removable window room air conditioners."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6db4984d81a50874_v1",
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
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $4,000 per mini-split condenser, not to exceed $3,000 per ton",
        "evidenceText": "Groton 2026 HVAC mini-split page says special pricing may rebate condenser cost up to $4,000 and $3,000/ton.",
        "sourceUrlsChecked": [
          "https://www.grotonutilities.com/242/Residential-HVAC-AC-Rebates",
          "https://grotonutilities.com/238/Rebates---Groton-Utilities-Residential"
        ],
        "reasoningNotes": "Matched heat pump and mini-split terms. Confidence is medium because invoice and tonnage determine final amount.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_df99325427dc3109_v1",
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
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "Up to $200 per smart thermostat, not exceeding thermostat cost",
        "evidenceText": "Groton residential smart thermostat page says rebate is valid for a maximum of $200 per thermostat or total cost, whichever is lower.",
        "sourceUrlsChecked": [
          "https://grotonutilities.com/244/Residential-Smart-Thermostat-Rebate",
          "https://grotonutilities.com/238/Rebates---Groton-Utilities-Residential"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3693",
    "opportunityName": "Florida Public Utilities - Commercial Energy Efficiency Rebate Programs",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3693/florida-public-utilities-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://fpuc.com/commercial-electric/commercial-electric-rebates/",
    "applicationUrl": "https://rebate.fpuc.com/",
    "administrator": "Florida Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "air conditioning",
          "chiller"
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
          "FL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Florida Public Utilities electric service territory"
        ],
        "notes": "Commercial electric rebates apply to eligible FPUC electric business customers in the electric service area."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "business_owner",
        "industrial_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "central_air_conditioner_replacement",
        "commercial_chiller_replacement",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "cool_roof_reflective_roofing"
      ],
      "hardRequirements": [
        "Applicant must be an FPUC commercial electric customer and business or company owner in the electric service area.",
        "HVAC rebates require qualifying ducted heat pump or central air equipment meeting current efficiency requirements.",
        "Chiller, lighting, and reflective roof projects require proposals and program review or inspections.",
        "Lighting projects must meet or exceed applicable efficiency standards.",
        "Reflective roof projects must use qualifying cool roof materials over conditioned space.",
        "Applications must be submitted within the current program deadline after installation or approval."
      ],
      "blockers": [
        "Do not match window film or window replacement; current official commercial electric rebate page supports reflective roofing, not windows.",
        "Do not match residential rebates or gas measures under this commercial electric record.",
        "Do not generalize HVAC beyond eligible heat pump, central air conditioner, and chiller measures.",
        "Availability is limited to FPUC electric territory and eligible commercial accounts."
      ],
      "programType": "Rebate Program",
      "administrator": "Florida Public Utilities",
      "applicationUrl": "https://rebate.fpuc.com/",
      "websiteUrl": "https://fpuc.com/commercial-electric/commercial-electric-rebates/",
      "sourceUrlsChecked": [
        "https://fpuc.com/commercial-electric/commercial-electric-rebates/",
        "https://fpuc.com/commercial-electric/",
        "https://rebate.fpuc.com/",
        "https://fpuc.com/wp-content/uploads/FPU25-065-E_WebUpdates-Commercial-Chiller-Rebate-Cert-FM_MM_ADAi.pdf",
        "https://fpuc.com/wp-content/uploads/FPU25-065-E_WebUpdates-Commercial-Lighting-Rebate-Cert-FM_MM_ADAi.pdf"
      ],
      "evidenceText": "FPUC]( commercial electric rebate pages list heating and cooling upgrades, chiller upgrades, exterior and interior lighting, and reflective roof rebates for eligible commercial electric customers.",
      "reasoningNotes": "Current official sources do not verify window film or window replacement; replace that false-positive category with reflective cool roofing."
    },
    "existingSimpleRules": [
      {
        "id": "oir_98758c37ed8907a8_v1",
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
        "formula": "Up to $100 per high-efficiency heat pump or air-conditioning system",
        "evidenceText": "FPUC commercial electric rebates say HVAC upgrades can receive up to a $100 rebate.",
        "sourceUrlsChecked": [
          "https://fpuc.com/commercial-electric/commercial-electric-rebates/",
          "http://www.fpuc.com/electric/commercial/commercial-rebates/"
        ],
        "reasoningNotes": "Matched heat pump and air-conditioning terms. Confidence is medium because the source uses up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2280",
    "opportunityName": "Walton EMC - Residential Energy Efficiency Rebate Programs",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2280/walton-emc-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.waltonemc.com/residential/rebates/",
    "applicationUrl": null,
    "administrator": "Walton Electric Membership Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "waste heat recovery",
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
          "GA"
        ],
        "counties": [
          "Athens-Clarke",
          "Barrow",
          "DeKalb",
          "Greene",
          "Gwinnett",
          "Morgan",
          "Newton",
          "Oconee",
          "Rockdale",
          "Walton"
        ],
        "cities": [],
        "utilityTerritories": [
          "Walton EMC service territory"
        ],
        "notes": "County list represents service-area counties or partial counties; applicant must receive Walton EMC electric service."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "electric_storage_water_heater",
        "residential_water_heating_waste_heat_recovery"
      ],
      "hardRequirements": [
        "Customer must receive electric service from Walton EMC.",
        "Existing-home heat pump rebate requires replacing a fossil-fuel system with an all-electric heat pump.",
        "Dual-fuel heat pumps are not eligible.",
        "Water heater incentives require qualifying electric water heater capacity or heat pump water heater equipment.",
        "Equipment must meet Walton EMC's listed efficiency requirements."
      ],
      "blockers": [
        "Dual-fuel heat pumps are explicitly ineligible.",
        "Waste heat recovery is a residential water-heating measure, not industrial process or compressed-air waste heat recovery.",
        "Do not match general high-efficiency HVAC unless the measure is a qualifying all-electric heat pump conversion.",
        "Commercial, industrial and agricultural measures are outside this residential rebate program."
      ],
      "programType": "Rebate Program",
      "administrator": "Walton Electric Membership Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.waltonemc.com/residential/rebates/",
      "sourceUrlsChecked": [
        "https://www.waltonemc.com/residential/rebates/"
      ],
      "evidenceText": "Walton EMC residential rebates cover electric heat pump fossil-fuel conversions, heat pump water heaters, electric water heaters and residential waste heat recovery.",
      "reasoningNotes": "The heat-recovery match should remain water-heating specific and must not map to industrial waste heat recovery."
    },
    "existingSimpleRules": [
      {
        "id": "oir_04c27badce932d94_v1",
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
        "formula": "$200 per eligible heat pump water heater or waste heat recovery system",
        "evidenceText": "Walton EMC rebate table lists heat pump water heaters and waste heat recovery systems at $200.",
        "sourceUrlsChecked": [
          "https://www.waltonemc.com/rebates/"
        ],
        "reasoningNotes": "Matched heat pump water heater and waste heat recovery terms. Returned as a separate candidate.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_99012b71ab475370_v1",
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
        "formula": "$200 per eligible heat pump replacing fossil-fuel heat",
        "evidenceText": "Walton EMC rebate table lists electric heat pump replacing fossil fuel heating at $200.",
        "sourceUrlsChecked": [
          "https://www.waltonemc.com/rebates/"
        ],
        "reasoningNotes": "Matched heat pump terms. Use one unit as one qualifying replacement heat pump.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4968",
    "opportunityName": "Avista Utilities (Electric) - Residential Energy Efficiency Rebate Programs",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4968/avista-utilities-electric-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.myavista.com/energy-savings/rebates-idaho",
    "applicationUrl": "https://www.myavista.com/energy-savings/rebates-idaho/single-family-energy-rebates-idaho",
    "administrator": "Avista Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "exterior_door_replacement",
        "displayName": "Exterior door replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "exterior door"
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
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Avista Utilities Idaho electric or natural gas service territory"
        ],
        "notes": "Residential rebates differ by fuel, dwelling type and Avista service at the installation address."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "multifamily_customer",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential",
        "multifamily_low_rise"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_gas_water_heater",
        "window_replacement",
        "exterior_door_replacement",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "residential_refrigerator_freezer_appliance",
        "residential_laundry_appliance",
        "energy_star_manufactured_home"
      ],
      "hardRequirements": [
        "Home must be served by Avista Idaho electric or natural gas service as required by the measure.",
        "Single-family includes manufactured homes; multifamily eligibility is generally four units or fewer, while five or more uses business rebates.",
        "Some measures require existing homes, licensed contractors, participating distributors, energy-use thresholds or income qualification.",
        "Applications and documentation must be submitted within the stated Avista deadline."
      ],
      "blockers": [
        "Do not match commercial refrigeration; refrigerator/freezer rebates are residential ENERGY STAR appliance rebates.",
        "Do not match smart_thermostat_zoning_retrofit from this record unless a current Avista Idaho source is verified; the current Idaho page did not list it.",
        "EV, solar and renewable gas pages are separate Avista offerings."
      ],
      "programType": "Rebate Program",
      "administrator": "Avista Utilities",
      "applicationUrl": "https://www.myavista.com/energy-savings/rebates-idaho/single-family-energy-rebates-idaho",
      "websiteUrl": "https://www.myavista.com/energy-savings/rebates-idaho",
      "sourceUrlsChecked": [
        "https://www.myavista.com/energy-savings/rebates-idaho",
        "https://www.myavista.com/energy-savings/rebates-idaho/single-family-energy-rebates-idaho",
        "https://www.myavista.com/energy-savings/rebates-washington/hvac-and-water-heating-discounts",
        "https://www.myavista.com/energy-savings/rebates-idaho/single-family-energy-rebates-idaho/energy-star-rated-front-load-washer-and-energy-star-rated-electric-dryer"
      ],
      "evidenceText": "Avista’s Idaho page lists windows, exterior doors, appliances, manufactured homes, insulation, HVAC/water heating and income-qualified weatherization measures.",
      "reasoningNotes": "HVAC and water-heating incentives are midstream/pass-through and apply to home and small commercial equipment; residential matching should still require Avista Idaho service and measure-specific fuel rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_228fe1836ce9f23e_v1",
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
        "formula": "Up to $100 per ENERGY STAR certified appliance, including refrigerators and freezers",
        "evidenceText": "Avista Idaho single-family rebates list ENERGY STAR certified appliances at up to $100.",
        "sourceUrlsChecked": [
          "https://www.myavista.com/energy-savings/rebates-idaho",
          "https://www.myavista.com/energy-savings/rebates-idaho/single-family-energy-rebates-idaho"
        ],
        "reasoningNotes": "Matched refrigerator/freezer terms. Confidence is medium because the page groups eligible appliances under an up-to amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5036",
    "opportunityName": "Dominion Energy - ThermWise Home Builder Rebate Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5036/dominion-energy-thermwise-home-builder-rebate-program",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
    "applicationUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
    "administrator": "Enbridge Gas Utah-Wyoming-Idaho ThermWise",
    "programType": "Builder Rebate New Construction",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy recovery ventilation"
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
          "Enbridge Gas Idaho natural gas service territory"
        ],
        "notes": "ThermWise also serves Utah and Wyoming, but this repaired DSIRE record is limited to Idaho."
      },
      "eligibleApplicantTypes": [
        "home_builder",
        "developer",
        "residential_builder",
        "multifamily_builder",
        "home_energy_rater"
      ],
      "eligibleSectors": [
        "residential_new_construction",
        "multifamily_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "new_construction_high_efficiency_furnace",
        "new_construction_high_efficiency_boiler",
        "new_construction_energy_recovery_ventilation",
        "new_construction_insulation",
        "new_construction_smart_thermostat",
        "new_construction_energy_star_home"
      ],
      "hardRequirements": [
        "Builder rebates are for residential construction receiving Enbridge Gas service in the ThermWise territory.",
        "Requests must be submitted within the program deadline after gas service turn-on and include required builder documentation such as W-9 and invoices.",
        "Whole-home builder rebates may require Home Energy Rater involvement or ENERGY STAR-qualified home criteria.",
        "Single-family and multifamily forms and eligibility differ."
      ],
      "blockers": [
        "Do not match existing-home retrofit projects to this Home Builder Rebate record.",
        "Do not merge separate ThermWise appliance or weatherization rebate pages with the builder rebate unless matching a builder or new-construction project.",
        "Do not match electric heat pumps; this is a natural gas ThermWise builder program."
      ],
      "programType": "Builder Rebate New Construction",
      "administrator": "Enbridge Gas Utah-Wyoming-Idaho ThermWise",
      "applicationUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
      "sourceUrlsChecked": [
        "https://www.thermwise.com/builder-rebates/",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/weatherization-rebates"
      ],
      "evidenceText": "ThermWise builder rebates are for builders of residential construction installing efficient equipment or building ENERGY STAR-qualified homes in Enbridge Gas territory.",
      "reasoningNotes": "Categories were rewritten as new-construction builder measures. Existing-home furnace, boiler, ERV and insulation rebates belong to other ThermWise pages."
    },
    "existingSimpleRules": [
      {
        "id": "oir_64a5b4dedd8cb87c_v1",
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
        "formula": "$300 per residential energy recovery ventilation system",
        "evidenceText": "ThermWise appliance rebate tables list Energy Recovery Ventilation at $300.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
          "https://www.thermwise.com/builder-rebates/"
        ],
        "reasoningNotes": "Matched energy recovery ventilation term.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_83fc2264cad10b7b_v1",
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
        "formula": "$100 per residential gas boiler reset control",
        "evidenceText": "ThermWise appliance rebate tables list Residential Gas Boiler Reset Control at $100.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
          "https://www.thermwise.com/builder-rebates/"
        ],
        "reasoningNotes": "Matched boiler reset control term.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c0e87a6c2a0af2df_v1",
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
        "formula": "$75 per Tier 2 smart thermostat",
        "evidenceText": "ThermWise residential/builder rebate tables list Smart Thermostat Tier 2 at $75.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates",
          "https://www.thermwise.com/builder-rebates/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Tier 2 has qualifying occupancy-sensor technology.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3812",
    "opportunityName": "Ameren Illinois - Instant Incentives Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3812/ameren-illinois-instant-incentives-program",
    "websiteUrl": "https://amerenillinoissavings.com/business/incentives-services/instant-incentives/",
    "applicationUrl": "https://amerenillinoissavings.com/business/incentives-services/instant-incentives/",
    "administrator": "Ameren Illinois Energy Efficiency Program",
    "programType": "Instant Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Ameren Illinois electric and gas service territory"
        ],
        "notes": "Business customer eligibility is limited to Ameren Illinois service territory and qualifying distributors or contractors."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "ducted_air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "packaged_terminal_heat_pump",
        "notched_v_belt_replacement"
      ],
      "hardRequirements": [
        "Customer must be an Ameren Illinois business customer.",
        "Incentive is normally delivered as an upfront discount through a qualifying distributor or contractor.",
        "Equipment must meet the program’s qualifying product and installation requirements."
      ],
      "blockers": [
        "Do not match low_flow_fixture_retrofit; water-saving fixtures are not listed on the current Instant Incentives page.",
        "Do not generalize ductless mini-split or packaged terminal heat pump incentives into unrelated residential HVAC programs.",
        "Lighting fixture language supports LED lighting, not plumbing fixtures."
      ],
      "programType": "Instant Incentive Program",
      "administrator": "Ameren Illinois Energy Efficiency Program",
      "applicationUrl": "https://amerenillinoissavings.com/business/incentives-services/instant-incentives/",
      "websiteUrl": "https://amerenillinoissavings.com/business/incentives-services/instant-incentives/",
      "sourceUrlsChecked": [
        "https://amerenillinoissavings.com/business/incentives-services/instant-incentives/"
      ],
      "evidenceText": "Ameren Illinois lists instant incentives for LED lighting, smart thermostats, notched V-belts, heat pump water heaters and several heat pump HVAC product types.",
      "reasoningNotes": "Retrofit categories are product-specific because the program is an instant-discount channel through distributors and contractors."
    },
    "existingSimpleRules": [
      {
        "id": "oir_69a81f80169dbf65_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 63000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$630 instant incentive per ductless mini-split heat pump",
        "evidenceText": "Ameren Illinois instant incentives page lists a $630 discount for a ductless mini-split heat pump.",
        "sourceUrlsChecked": [
          "https://amerenillinoissavings.com/residential/products-discounts-and-rebates/hvac-and-water-heating-discounts/",
          "https://amerenillinoissavings.com/business/incentives-services/instant-incentives/"
        ],
        "reasoningNotes": "Matched mini-split and heat pump terms. Use one unit as one qualifying mini-split system.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9aac02cfeb75c6c2_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 90000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$900 instant incentive per ducted air-source heat pump",
        "evidenceText": "Ameren Illinois instant incentives page lists a $900 discount for a ducted air-source heat pump.",
        "sourceUrlsChecked": [
          "https://amerenillinoissavings.com/residential/products-discounts-and-rebates/hvac-and-water-heating-discounts/",
          "https://amerenillinoissavings.com/business/incentives-services/instant-incentives/"
        ],
        "reasoningNotes": "Matched heat pump term. Returned separately from ductless and HPWH candidates.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9e2d323920874f82_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 115000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,150 instant incentive per heat pump water heater",
        "evidenceText": "Ameren Illinois instant incentives page lists a $1,150 discount for a heat pump water heater.",
        "sourceUrlsChecked": [
          "https://amerenillinoissavings.com/residential/products-discounts-and-rebates/hvac-and-water-heating-discounts/",
          "https://amerenillinoissavings.com/business/incentives-services/instant-incentives/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one ENERGY STAR certified HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4234",
    "opportunityName": "Corn Belt Energy Coop - Residential Energy Efficiency Rebate Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4234/corn-belt-energy-coop-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://cornbeltenergy.com/programs-services/rebate-programs/",
    "applicationUrl": "https://wvpa.my.site.com/eo3wvpa__portalavailableprograms",
    "administrator": "Power Moves - Wabash Valley Power Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Corn Belt Energy electric service territory"
        ],
        "notes": "Corn Belt Energy residential rebates are delivered through Power Moves for eligible member accounts."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "cold_climate_heat_pump",
        "dual_fuel_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Corn Belt Energy residential member or customer.",
        "Power Moves application portal and current program rules apply.",
        "Equipment must meet listed efficiency, AHRI, invoice, and installation requirements.",
        "Existing-home and new-construction heat pump tracks have different eligibility rules.",
        "Applications must be submitted within current program dates and before funding deadlines."
      ],
      "blockers": [
        "Do not match efficient pump replacement; the supported term is heat pump, not process pump or water pump replacement.",
        "Do not match generic HVAC unless the installed equipment is an eligible heat pump type.",
        "EV circuits and other Corn Belt offerings are separate programs or tracks and should not be merged here.",
        "Residential program only."
      ],
      "programType": "Rebate Program",
      "administrator": "Power Moves - Wabash Valley Power Association",
      "applicationUrl": "https://wvpa.my.site.com/eo3wvpa__portalavailableprograms",
      "websiteUrl": "https://cornbeltenergy.com/programs-services/rebate-programs/",
      "sourceUrlsChecked": [
        "https://cornbeltenergy.com/programs-services/rebate-programs/",
        "https://www.powermoves.com/rebates/residential/",
        "https://wvpa.my.site.com/eo3wvpa__portalavailableprograms"
      ],
      "evidenceText": "Corn]( Belt links residential rebate customers to Power Moves, where available 2026 residential programs include ground-source, air-source, cold-climate and dual-fuel heat pumps, heat pump water heaters, and Wi-Fi thermostats.",
      "reasoningNotes": "The original efficient pump replacement match is a false positive caused by heat pump terminology."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8da4fcb263fba359_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 20000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$200 per 240V 50A EV circuit installation",
        "evidenceText": "Corn Belt Energy says it offers a $200 rebate for 240-volt 50-amp EV circuit installation.",
        "sourceUrlsChecked": [
          "https://cornbeltenergy.com/programs-services/rebate-programs/"
        ],
        "reasoningNotes": "Matched EV charging/circuit installation; although target terms are HVAC, this is the clearest current source-backed item in the target source.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22552",
    "opportunityName": "MidAmerican Energy Residential Energy Efficiency Rebates",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22552/midamerican-energy-residential-energy-efficiency-rebates",
    "websiteUrl": "https://www.midamericanenergy.com/home-discounts-and-rebates",
    "applicationUrl": "https://midamerican.ri-esuite.com/about/programs/residential",
    "administrator": "MidAmerican Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
        "notes": "Duplicate or overlapping MidAmerican Illinois residential rebate record; current program page is the home discounts and rebates page."
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
        "Equipment must be new, meet current efficiency requirements, and be installed during the applicable program year.",
        "Application must be submitted within the required deadline and incentives are subject to funding."
      ],
      "blockers": [
        "Do not match commercial refrigeration equipment; residential appliance rebates are product-specific household refrigerator and freezer rebates.",
        "Do not match commercial kitchen, motors, VFDs, or industrial measures.",
        "Do not match standard electric or gas water heaters where the current record supports heat pump water heaters.",
        "Treat this as overlapping with SOURCE_DSIRE:dsire_program_id:3507 unless RetroFi keeps separate DSIRE records by source."
      ],
      "programType": "Rebate Program",
      "administrator": "MidAmerican Energy",
      "applicationUrl": "https://midamerican.ri-esuite.com/about/programs/residential",
      "websiteUrl": "https://www.midamericanenergy.com/home-discounts-and-rebates",
      "sourceUrlsChecked": [
        "https://www.midamericanenergy.com/il-residential-rebates",
        "https://www.midamericanenergy.com/home-discounts-and-rebates",
        "https://www.midamericanenergy.com/il_qualifications-and-conditions",
        "https://www.midamericanenergy.com/media/pdf/mec-hvac-reference-res.pdf",
        "https://midamerican.ri-esuite.com/about/programs/residential"
      ],
      "evidenceText": "The current MidAmerican home rebates page and residential application cover Illinois residential HVAC, heat pump water heaters, smart thermostats, air purifiers, clothes washers and dryers, refrigerators, and freezers.",
      "reasoningNotes": "This appears to duplicate the MidAmerican Illinois residential rebate record. Preserve residential heat pump and geothermal categories, but narrow refrigeration to household appliance rebates."
    },
    "existingSimpleRules": [
      {
        "id": "oir_797407ecbac0db37_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 71300,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $713 per cold-climate air-source heat pump",
        "evidenceText": "MidAmerican residential rebates list cold-climate air-source heat pump incentives ranging up to $713.",
        "sourceUrlsChecked": [
          "https://www.midamericanenergy.com/home-rebates",
          "https://www.midamericanenergy.com/ee-rebates"
        ],
        "reasoningNotes": "Matched heat pump term. Modeled as the top published tier; final value depends on equipment and state eligibility.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a01e613870e821b0_v1",
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
        "confidence": "medium",
        "formula": "$225 per heat pump water heater",
        "evidenceText": "MidAmerican residential rebates list heat pump water heater incentive at $225.",
        "sourceUrlsChecked": [
          "https://www.midamericanenergy.com/home-rebates",
          "https://www.midamericanenergy.com/ee-rebates"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned as separate candidate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e82d35acd21b0afb_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 120000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $1,200 per geothermal heat pump",
        "evidenceText": "MidAmerican residential rebates list geothermal heat pump incentives up to $1,200.",
        "sourceUrlsChecked": [
          "https://www.midamericanenergy.com/home-rebates",
          "https://www.midamericanenergy.com/ee-rebates"
        ],
        "reasoningNotes": "Matched geothermal term. Returned separately from air-source heat pump.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5137",
    "opportunityName": "Wabash Valley Power Association (23 Member Cooperatives) - Residential Energy Efficiency Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5137/wabash-valley-power-association-23-member-cooperatives-residential-energy-efficiency-program",
    "websiteUrl": "https://www.powermoves.com/rebates/residential/",
    "applicationUrl": "https://wvpa.my.site.com/eo3wvpa__portalavailableprograms",
    "administrator": "Wabash Valley Power Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "IL",
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Participating Wabash Valley Power Alliance and Power Moves member cooperative territories"
        ],
        "notes": "Eligibility is determined by the customer's participating local cooperative or ZIP code; some former member cooperatives no longer participate."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "cold_climate_air_source_heat_pump",
        "dual_fuel_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Customer must be served by a participating local cooperative.",
        "Applications must be submitted through the Power Moves portal within the program availability window.",
        "Heat pump applications require qualifying AHRI documentation and load calculation or sizing documentation.",
        "Heat pump water heaters must meet the listed UEF requirement.",
        "Wi-Fi thermostat incentive is for qualifying replacement of a non-Wi-Fi thermostat."
      ],
      "blockers": [
        "Do not match central air conditioner or furnace-only replacements; HVAC support is heat-pump based.",
        "Not all former member cooperatives participate, so territory must be checked before matching.",
        "New-construction and existing-home heat pump tracks are separate application paths.",
        "Demand response or appliance marketplace offers are separate from these residential rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "Wabash Valley Power Association",
      "applicationUrl": "https://wvpa.my.site.com/eo3wvpa__portalavailableprograms",
      "websiteUrl": "https://www.powermoves.com/rebates/residential/",
      "sourceUrlsChecked": [
        "https://www.powermoves.com/rebates/residential/",
        "https://wvpa.my.site.com/eo3wvpa__portalavailableprograms",
        "https://www.powermoves.com/about/",
        "https://www.wvpa.com/who-we-are/member-co-ops/"
      ],
      "evidenceText": "Power Moves lists residential rebates for air-source, cold-climate, dual-fuel and geothermal heat pumps, heat pump water heaters and Wi-Fi thermostats.",
      "reasoningNotes": "The DSIRE title says 23 member cooperatives, but current eligibility should be verified through the Power Moves portal and participating cooperative list."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9f325767205514b2_v1",
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
        "formula": "$75 per Wi-Fi thermostat replacing non-Wi-Fi thermostat",
        "evidenceText": "PowerMoves says installing a new Wi-Fi thermostat earns a $75 rebate.",
        "sourceUrlsChecked": [
          "https://www.powermoves.com/rebates/residential/wifi-thermostats/",
          "https://www.powermoves.com/rebates/residential/"
        ],
        "reasoningNotes": "Matched thermostat term. Use one unit as one qualifying Wi-Fi thermostat.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a76c2ec5189ff53d_v1",
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
        "confidence": "high",
        "formula": "$800 per eligible heat pump water heater",
        "evidenceText": "PowerMoves 2026 residential rebate flyer lists heat pump water heater at $800.",
        "sourceUrlsChecked": [
          "https://www.powermoves.com/rebates/residential/",
          "https://www.mjmec.coop/sites/default/files/documents/2026%20Power%20Moves%20Residential%20Rebates%20Flyer.pdf"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3147",
    "opportunityName": "Citizens Gas - Residential Efficiency Rebates",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3147/citizens-gas-residential-efficiency-rebates",
    "websiteUrl": "https://info.citizensenergygroup.com/conservation/energy/rebates",
    "applicationUrl": "https://info.citizensenergygroup.com/conservation/energy/rebates",
    "administrator": "Citizens Energy Group",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
        "retrofitTypeId": "high_efficiency_gas_water_heater",
        "displayName": "High-efficiency gas water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "gas water heater"
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
        "counties": [
          "Marion County",
          "Hamilton County"
        ],
        "cities": [
          "Indianapolis",
          "Westfield"
        ],
        "utilityTerritories": [
          "Citizens Energy Group natural gas service territory",
          "Citizens Gas of Westfield service territory"
        ],
        "notes": "Measures vary materially between Indianapolis conversion rebates and Westfield efficiency rebates."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "natural_gas_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "furnace_tune_up",
        "smart_thermostat_zoning_retrofit",
        "wifi_thermostat",
        "high_efficiency_gas_water_heater",
        "natural_gas_furnace_conversion",
        "natural_gas_water_heater_conversion"
      ],
      "hardRequirements": [
        "Customer must be a Citizens natural gas customer in the applicable service area.",
        "Westfield equipment rebates require qualifying high-efficiency natural gas appliances or thermostats.",
        "Indianapolis conversion rebates require conversion from electric, oil or propane equipment to natural gas.",
        "Invoices, contractor information and account details are required."
      ],
      "blockers": [
        "Do not match duct_sealing_and_insulation; current Citizens pages did not list duct sealing rebates.",
        "Do not match insulation_upgrade; no current Citizens residential insulation rebate was verified.",
        "Do not match heat pump systems; several Westfield furnace tune-up rules exclude systems supplementing gas heat with air-source, dual-fuel or geothermal heat pumps."
      ],
      "programType": "Rebate Program",
      "administrator": "Citizens Energy Group",
      "applicationUrl": "https://info.citizensenergygroup.com/conservation/energy/rebates",
      "websiteUrl": "https://info.citizensenergygroup.com/conservation/energy/rebates",
      "sourceUrlsChecked": [
        "https://info.citizensenergygroup.com/conservation/energy/rebates",
        "https://info.citizensenergygroup.com/conservation/energy/rebates/westfield",
        "https://info.citizensenergygroup.com/conservation/energy/rebates/indianapolis"
      ],
      "evidenceText": "Citizens’ current pages distinguish Westfield gas efficiency rebates for furnaces, water heaters and thermostats from Indianapolis natural-gas conversion rebates.",
      "reasoningNotes": "Gas appliance and thermostat measures were retained; duct sealing and insulation were removed as unsupported."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4b0cddcccf8ca3e6_v1",
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
        "formula": "$250 per residential 97%+ natural gas furnace",
        "evidenceText": "Citizens rebate page lists residential 97% or greater furnace rebate at $250.",
        "sourceUrlsChecked": [
          "https://info.citizensenergygroup.com/conservation/energy/rebates"
        ],
        "reasoningNotes": "Matched furnace term. Medium because Citizens routes rebates by service area.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_817e6f438a09d48f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 3000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$30 per residential programmable thermostat",
        "evidenceText": "Citizens rebate page lists residential programmable thermostat rebate at $30.",
        "sourceUrlsChecked": [
          "https://info.citizensenergygroup.com/conservation/energy/rebates"
        ],
        "reasoningNotes": "Matched thermostat term. Returned separately from furnace candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5733",
    "opportunityName": "Noble REMC - Residential Energy Efficiency Rebate Incentives",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5733/noble-remc-residential-energy-efficiency-rebate-incentives",
    "websiteUrl": "https://www.nobleremc.com/rebates",
    "applicationUrl": null,
    "administrator": "Noble REMC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Noble REMC electric service territory"
        ],
        "notes": "Noble REMC also points business customers to separate prescriptive and custom PowerMoves business rebates."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "cold_climate_air_source_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must follow the current Noble REMC residential rebate application requirements.",
        "Purchase receipts are required for all rebate applications.",
        "AHRI certificates are required for geothermal, air-source heat pump and heat pump water heater rebates.",
        "Heat loss and heat gain calculations are required for geothermal and air-source heat pumps.",
        "Installations are subject to verification or inspection."
      ],
      "blockers": [
        "Broad high-efficiency HVAC replacement should be blocked unless the system is a qualifying heat pump or geothermal heat pump.",
        "Commercial and industrial rebates are separate and should not be inferred from the residential rebate sheet.",
        "Rebates may end or change; the current sheet states the residential rebate program ends December 31, 2026."
      ],
      "programType": "Rebate Program",
      "administrator": "Noble REMC",
      "applicationUrl": null,
      "websiteUrl": "https://www.nobleremc.com/rebates",
      "sourceUrlsChecked": [
        "https://www.nobleremc.com/rebates",
        "https://www.nobleremc.com/sites/default/files/2026-01/2026-noble-remc-residential-rebates.pdf",
        "https://www.powermoves.com/rebates/residential/"
      ],
      "evidenceText": "Noble's 2026 residential sheet lists geothermal, air-source, dual-fuel and cold-climate heat pumps, heat pump water heaters and Wi-Fi thermostats, with receipts and AHRI documentation required.",
      "reasoningNotes": "Kept thermostat and heat-pump categories; narrowed generic HVAC to qualifying heat-pump/geothermal equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1ab1ee908aad010d_v1",
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
        "confidence": "high",
        "formula": "$800 per qualifying heat pump water heater",
        "evidenceText": "Noble REMC rebate page lists Heat Pump Water Heater at $800.",
        "sourceUrlsChecked": [
          "https://nobleremc.com/rebates"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one eligible water heater.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3965",
    "opportunityName": "Parke County REMC - Energy Efficient Equipment Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3965/parke-county-remc-energy-efficient-equipment-rebate-program",
    "websiteUrl": "https://www.pcremc.com/rebates",
    "applicationUrl": null,
    "administrator": "Parke County REMC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Parke County REMC electric service territory"
        ],
        "notes": "Parke County REMC also links C&I and agricultural incentives through PowerMoves; this repair covers the residential equipment rebates."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "cold_climate_air_source_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Parke County REMC member and submit the rebate application within the stated installation window.",
        "PowerMoves heating and cooling rebates require AHRI certificates and heat loss/heat gain calculations.",
        "Air-source and dual-fuel heat pumps must meet current SEER2 and HSPF2 thresholds.",
        "Heat pump water heaters must meet the minimum UEF requirement.",
        "Wi-Fi thermostat rebates apply to qualifying replacement of a non-Wi-Fi thermostat."
      ],
      "blockers": [
        "Broad high-efficiency HVAC replacement should be blocked unless the equipment is a qualifying heat pump or geothermal heat pump.",
        "Commercial, industrial and agricultural incentives are separate program paths and should not be inferred for residential applicants.",
        "Non-heat-pump HVAC equipment is not supported by the checked residential rebate page."
      ],
      "programType": "Rebate Program",
      "administrator": "Parke County REMC",
      "applicationUrl": null,
      "websiteUrl": "https://www.pcremc.com/rebates",
      "sourceUrlsChecked": [
        "https://www.pcremc.com/rebates",
        "https://www.powermoves.com/rebates/residential/"
      ],
      "evidenceText": "Parke REMC lists rebates for air-source, dual-fuel, cold-climate and geothermal heat pumps, heat pump water heaters and Wi-Fi thermostats, with AHRI/load-calculation requirements.",
      "reasoningNotes": "Kept the heat-pump, geothermal, water-heater and thermostat matches; narrowed generic HVAC to qualifying heat-pump equipment only."
    },
    "existingSimpleRules": [
      {
        "id": "oir_625a6620388f6cd1_v1",
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
        "confidence": "high",
        "formula": "$800 per qualifying geothermal heat pump",
        "evidenceText": "Parke County REMC rebate page lists geothermal heat pump bill credit at $800.",
        "sourceUrlsChecked": [
          "https://www.pcremc.com/rebates"
        ],
        "reasoningNotes": "Matched geothermal term. Returned separately from HPWH.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_72f925e6cf657e93_v1",
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
        "formula": "$200 per heat pump water heater bill credit",
        "evidenceText": "Parke County REMC rebate page lists a $200 bill credit for qualifying heat pump water heaters.",
        "sourceUrlsChecked": [
          "https://www.pcremc.com/rebates"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2140",
    "opportunityName": "Blue Grass Energy - Residential Energy Efficiency Rebate Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2140/blue-grass-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.togetherwesaveky.com/programs",
    "applicationUrl": "https://togetherwesaveky.com/cooperatives/blue-grass-energy/",
    "administrator": "Blue Grass Energy Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "KY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Blue Grass Energy Cooperative electric service territory"
        ],
        "notes": "Applies to Blue Grass Energy residential members; many rebates require electrically heated homes."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_cooperative_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "cold_climate_air_source_heat_pump",
        "heat_pump_water_heater",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation"
      ],
      "hardRequirements": [
        "Applicant must be a Blue Grass Energy residential member.",
        "Heat pump rebates are for replacing electric resistance, electric furnace or baseboard heat with qualifying ENERGY STAR equipment, with higher rebates for cold-climate units.",
        "Duct sealing and air sealing require approved testing, leakage reduction and program documentation.",
        "Rebate amounts and measures are subject to cooperative program terms and funding."
      ],
      "blockers": [
        "Do not match standalone insulation_upgrade unless a current Blue Grass source specifically supports insulation rebates.",
        "Do not match generic air conditioner replacement; the verified HVAC support is heat pump retrofit or cold-climate heat pump.",
        "Do not match commercial or industrial measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Blue Grass Energy Cooperative",
      "applicationUrl": "https://togetherwesaveky.com/cooperatives/blue-grass-energy/",
      "websiteUrl": "https://www.togetherwesaveky.com/programs",
      "sourceUrlsChecked": [
        "https://www.togetherwesaveky.com/programs",
        "https://togetherwesaveky.com/cooperatives/blue-grass-energy/",
        "https://www.bgenergy.com/duct-sealing-rebate",
        "https://www.bgenergy.com/air-sealing-rebate"
      ],
      "evidenceText": "Current cooperative materials identify heat pump, cold-climate heat pump, heat pump water heater, duct sealing and air-sealing rebates for Blue Grass Energy residential members.",
      "reasoningNotes": "Confidence is medium because some official details were visible through program snippets and cooperative pages, but not every rebate form was fully read."
    },
    "existingSimpleRules": [
      {
        "id": "oir_72695f73b46844f0_v1",
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
        "formula": "$750 per ENERGY STAR heat pump replacing resistance heat",
        "evidenceText": "Blue Grass Energy replacing-resistance-heat page lists ENERGY STAR heat pump rebate at $750.",
        "sourceUrlsChecked": [
          "https://www.bgenergy.com/replacing-resistance-heat"
        ],
        "reasoningNotes": "Matched heat pump term. Selected ENERGY STAR heat pump tier.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d5fad2d48865dc43_v1",
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
        "formula": "$250 per ducted or ductless mini-split indoor head unit",
        "evidenceText": "Blue Grass Energy lists ducted or ductless mini-splits at $250 per indoor head unit.",
        "sourceUrlsChecked": [
          "https://www.bgenergy.com/replacing-resistance-heat"
        ],
        "reasoningNotes": "Matched ductless and mini-split terms. Use unit_count as eligible indoor head count.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22696",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – WeCare for Apartment Building Owners",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22696/louisville-gas-and-electric-and-kentucky-utilities-wecare-for-apartment-building-owners",
    "websiteUrl": "https://lge-ku.com/wecare",
    "applicationUrl": null,
    "administrator": "Louisville Gas and Electric and Kentucky Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "Louisville Gas and Electric",
          "Kentucky Utilities"
        ],
        "notes": "Limited to eligible multifamily buildings in LG&E or KU service territory."
      },
      "eligibleApplicantTypes": [
        "apartment_building_owner",
        "multifamily_property_manager"
      ],
      "eligibleSectors": [
        "multifamily",
        "affordable_housing"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "led_lighting_retrofit",
        "smart_thermostat",
        "low_flow_water_fixtures",
        "whole_building_energy_efficiency"
      ],
      "hardRequirements": [
        "Building must have four or more units.",
        "Property must have an eligible common-area LG&E or KU account.",
        "At least 50 percent of tenants must receive income-based assistance or have income at or below 200 percent of federal poverty guidelines.",
        "Tenant notification and program participation requirements apply.",
        "Buildings are generally eligible no more than once every three years."
      ],
      "blockers": [
        "Doors and windows are excluded and should not be matched.",
        "Do not match single-family homes or general commercial properties.",
        "Audit is part of the WeCare process and should not be treated as a separate stand-alone rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Louisville Gas and Electric and Kentucky Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://lge-ku.com/wecare",
      "sourceUrlsChecked": [
        "https://lge-ku.com/wecare",
        "https://lge-ku.com/energy-efficiency-programs"
      ],
      "evidenceText": "LG&E and KU describe WeCare for Apartment Buildings as supporting eligible multifamily properties with an audit report, education, installation of measures in common areas and occupied units, and incentives toward whole-building improvements.",
      "reasoningNotes": "Original weatherization, duct, insulation, audit, and lighting matches are supported, but windows and doors should be blocked because the official page excludes them."
    },
    "existingSimpleRules": [
      {
        "id": "oir_60c791a70de9eb8d_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "medium",
        "formula": "Up to 50% of incremental cost for eligible whole-building projects",
        "evidenceText": "LG&E/KU WeCare materials say apartment owners may receive incentives up to 50% of incremental cost for whole-building projects.",
        "sourceUrlsChecked": [
          "https://lge-ku.com/wecare"
        ],
        "reasoningNotes": "Matched weatherization/insulation and duct sealing terms. Use only for eligible apartment-owner projects, not tenant no-cost services.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5831",
    "opportunityName": "Cleco- Power Wise™ Residential Program",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5831/cleco-power-wise-residential-program",
    "websiteUrl": "https://www.cleco.com/powerwise/residential-rebates",
    "applicationUrl": "https://www.cleco.com/powerwise/residential-rebates",
    "administrator": "Cleco Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "hvac replacement",
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
          "LA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cleco Power residential electric service territory"
        ],
        "notes": "Applies to eligible Cleco residential customers; some equipment is handled through approved contractors or the Cleco marketplace."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_permission",
        "income_qualified_residential_customer"
      ],
      "eligibleSectors": [
        "residential",
        "income_qualified_residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "smart_thermostat_zoning_retrofit",
        "room_air_conditioner",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "low_flow_fixture_retrofit",
        "efficient_pool_pump",
        "electric_tankless_water_heater"
      ],
      "hardRequirements": [
        "Customer must be a current Cleco residential customer.",
        "Equipment rebates generally require qualifying ENERGY STAR, AHRI or program-listed equipment and submission within the stated deadline, often 60 days.",
        "HVAC rebates may require Cleco-approved contractors and qualifying high-efficiency systems.",
        "Weatherization measures apply to existing residential dwellings, often at least two years old.",
        "Low-flow measures require electric water heating."
      ],
      "blockers": [
        "Do not match commercial HVAC or commercial kitchen measures.",
        "Do not match gas appliance rebates to this electric residential program unless a current Cleco source specifically supports them.",
        "Low-flow fixtures are direct-install water measures tied to electric water heating, not a broad plumbing retrofit."
      ],
      "programType": "Rebate Program",
      "administrator": "Cleco Power",
      "applicationUrl": "https://www.cleco.com/powerwise/residential-rebates",
      "websiteUrl": "https://www.cleco.com/powerwise/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.cleco.com/powerwise/residential-rebates",
        "https://www.cleco.com/docs/default-source/energy-efficiency/contractor/cleco-residential-solutions-program-manual.pdf?sfvrsn=ecea9a9f_43",
        "https://www.cleco.com/media/press-releases/2024/05/14/cleco-residential-customers-can-receive-up-to--3-500-in-rebates-for-upgrading-to-an-energy-efficient-cooling-and-heating-system",
        "https://clecomarketplace.com/geothermal-heat-pump-rebate/"
      ],
      "evidenceText": "Cleco lists residential rebates for geothermal heat pumps, AC and heat pumps, smart thermostats, heat pump water heaters, room ACs and weatherization/direct-install measures.",
      "reasoningNotes": "All target HVAC and water-heating matches are supported; envelope and low-flow categories were added because the current program manual supports them."
    },
    "existingSimpleRules": [
      {
        "id": "oir_87e479fda657f014_v1",
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
        "formula": "$400 per qualified heat pump water heater",
        "evidenceText": "Cleco Power Wise heat pump water heater form states the program will pay $400 for each installed qualified HPWH.",
        "sourceUrlsChecked": [
          "https://www.cleco.com/powerwise/residential-rebates",
          "https://www.cleco.com/docs/default-source/energy-efficiency/residential/power-wise-water-heater-replacement-rebate-form.pdf"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_8a09c6fb3b3fab5c_v1",
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
        "cap": {
          "maxAmountCents": 350000
        },
        "confidence": "medium",
        "formula": "Up to $600 per ton for qualifying heat pump HVAC, capped at $3,500 per unit",
        "evidenceText": "Cleco Power Wise HVAC rebate page says heat pumps receive $350-$600 per ton up to 5.4 tons, with a $3,500 cap.",
        "sourceUrlsChecked": [
          "https://www.cleco.com/powerwise/residential-rebates",
          "https://clecomarketplace.com/air-conditioning-heat-pump-rebate/"
        ],
        "reasoningNotes": "Matched heat pump HVAC term. Use unit_count as qualifying tons; final tier depends on efficiency.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22772",
    "opportunityName": "Leading by Example Solar-Decarbonization Grant Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22772/leading-by-example-solar-decarbonization-grant-program",
    "websiteUrl": "https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program",
    "applicationUrl": null,
    "administrator": "Massachusetts Department of Energy Resources",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
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
          "battery storage",
          "energy storage"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Applies to Massachusetts state facilities and eligible Leading by Example state portfolio sites."
      },
      "eligibleApplicantTypes": [
        "state_agency",
        "public_higher_education_institution",
        "quasi_public_state_entity"
      ],
      "eligibleSectors": [
        "state_government",
        "public_higher_education",
        "quasi_public"
      ],
      "eligibleRetrofitCategories": [
        "rooftop_solar_pv",
        "battery_storage_system",
        "level_2_ev_charger_installation",
        "level_1_ev_charger_installation",
        "building_decarbonization_project"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Massachusetts state entity under the Leading by Example program.",
        "Project must serve an eligible state facility or state portfolio site.",
        "Solar, storage, EV charging, or decarbonization work must follow DOER grant instructions and funding availability.",
        "Program is identified as rolling through June 30, 2027 in available official materials."
      ],
      "blockers": [
        "Private residential, commercial, and municipal projects are not eligible unless they are part of an eligible state entity portfolio.",
        "Submetering or energy monitoring is not a supported standalone retrofit category for this grant.",
        "EV charging is within this LBE grant only for eligible state facilities; other EVSE incentives are separate programs."
      ],
      "programType": "Grant Program",
      "administrator": "Massachusetts Department of Energy Resources",
      "applicationUrl": null,
      "websiteUrl": "https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program",
      "sourceUrlsChecked": [
        "https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program",
        "https://malegislature.gov/Bills/194/SD2912.pdf"
      ],
      "evidenceText": "Official]( state materials describe LBE Solar-Decarbonization grants for state facilities supporting solar PV, battery storage, EV charging, and decarbonization projects.",
      "reasoningNotes": "The main Mass.gov page was only partially accessible in search results, so confidence is medium. Supported categories are limited to state-facility solar, storage, EV charging, and decarbonization."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e0a9425dbc09b9d6_v1",
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
        "evidenceText": "Incentives for Additional Project Categories Additional Project Categories Incentive Amount Battery Storage $500 per kWh Additional EVSE (beyond number of ports required under canopy requirements) $5,000 per port Decarbonization Equal to solar funding amount Adders Adders Incentive Amount Environmental Justice (EJ) Adder 10% adder to total solar, storage, EVSE, and decarbonization funding requested Eligible costs by project category include but are not limited to the",
        "sourceUrlsChecked": [
          "https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "public_nonprofit_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4561",
    "opportunityName": "Taunton Municipal Lighting Plant - Home and Outdoor Appliance Rebate",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4561/taunton-municipal-lighting-plant-home-and-outdoor-appliance-rebate",
    "websiteUrl": "https://www.tmlp.com/179/Home-and-Outdoor-Appliance-Rebate",
    "applicationUrl": null,
    "administrator": "Taunton Municipal Lighting Plant",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Taunton Municipal Lighting Plant service territory"
        ],
        "notes": "Limited to eligible TMLP residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "programmable_thermostat",
        "room_air_conditioner",
        "heat_pump_clothes_dryer",
        "electric_clothes_dryer",
        "induction_cooking_equipment",
        "dehumidifier",
        "electric_outdoor_power_equipment"
      ],
      "hardRequirements": [
        "Customer must have an active TMLP residential electric account for at least six months with a zero balance.",
        "Appliance must be listed as eligible and installed at the TMLP account location.",
        "ENERGY STAR labeling is required where the chart requires it.",
        "Purchase must be in the current eligible purchase window and submitted within six months.",
        "Rebate is limited to one per equipment lifetime and may not exceed 50 percent of equipment purchase price."
      ],
      "blockers": [
        "Room air conditioner support is product-specific and is not a whole-home HVAC replacement or heat pump HVAC retrofit.",
        "Heat pump water heater support is water heating only, not space-conditioning heat pump support.",
        "LED lighting is not listed for this appliance rebate.",
        "Thermostat support is limited to programmable or Wi-Fi thermostat products."
      ],
      "programType": "Rebate Program",
      "administrator": "Taunton Municipal Lighting Plant",
      "applicationUrl": null,
      "websiteUrl": "https://www.tmlp.com/179/Home-and-Outdoor-Appliance-Rebate",
      "sourceUrlsChecked": [
        "https://www.tmlp.com/179/Home-and-Outdoor-Appliance-Rebate",
        "https://www.tmlp.com/DocumentCenter/View/2365/PDF-2026-Appliance-Rebate-Chart?bidId="
      ],
      "evidenceText": "TMLP's appliance chart lists heat pump water heaters, thermostats, room air conditioners, dryers, induction stoves, dehumidifiers and electric outdoor equipment.",
      "reasoningNotes": "The original HVAC and LED matches were overbroad; supported measures are residential appliance and thermostat products."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5fd20404b10e3c25_v1",
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
        "formula": "$100 per smart Wi-Fi enabled thermostat",
        "evidenceText": "TMLP/DSIRE 2026 appliance chart lists Smart Wi-Fi Enabled thermostat at $100.",
        "sourceUrlsChecked": [
          "https://www.tmlp.com/179/Home-and-Outdoor-Appliance-Rebate",
          "https://programs.dsireusa.org/system/program/detail/4561"
        ],
        "reasoningNotes": "Matched thermostat term. Use one unit as one eligible thermostat.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b65a015487ebb435_v1",
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
        "formula": "$300 per ENERGY STAR heat pump water heater replacing electric",
        "evidenceText": "TMLP 2026 appliance chart lists Heat Pump Water Heater (Electric) at $300.",
        "sourceUrlsChecked": [
          "https://www.tmlp.com/179/Home-and-Outdoor-Appliance-Rebate",
          "https://www.tmlp.com/DocumentCenter/View/2365/PDF-2026-Appliance-Rebate-Chart?bidId="
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3733",
    "opportunityName": "Delmarva Power - Commercial and Industrial Energy Savings Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3733/delmarva-power-commercial-and-industrial-energy-savings-program",
    "websiteUrl": "https://homeenergysavings.delmarva.com/md/business/overview",
    "applicationUrl": "https://homeenergysavings.delmarva.com/md/business/applymlb",
    "administrator": "Delmarva Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "commissioning"
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
          "Delmarva Power Maryland commercial and industrial electric service territory"
        ],
        "notes": "Program applies to Delmarva Power Maryland business electric customers, with some tracks separated by demand threshold."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "nonprofit_customer",
        "government_customer",
        "institutional_customer",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "nonprofit",
        "government",
        "institutional",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "refrigeration_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "high_efficiency_commercial_dishwasher",
        "ice_machine",
        "vending_machine_controls",
        "smart_power_strip",
        "hotel_room_hvac_controls",
        "variable_frequency_drive",
        "retro_commissioning_study",
        "building_tune_up",
        "monitoring_based_commissioning",
        "window_film_shading_retrofit",
        "commercial_clothes_washer",
        "dehumidifier",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Customer must have an eligible Delmarva Power Maryland commercial electric account.",
        "Small-business and large-business tracks depend on account demand threshold.",
        "Measures must meet program specifications and documentation requirements.",
        "Building tune-up requires eligible commercial mechanical systems and program approval.",
        "Incentives are subject to funding, caps, and pre- or post-inspection rules."
      ],
      "blockers": [
        "Combined heat and power is not currently accepting new applications under the Delmarva CHP page and should be unavailable for new matching.",
        "Do not match residential rebates or home performance measures.",
        "Demand response, residential appliances, and separate EmPOWER Maryland offerings should not be merged.",
        "Eligibility differs between instant discount, large business, tune-up, and custom tracks."
      ],
      "programType": "Rebate Program",
      "administrator": "Delmarva Power",
      "applicationUrl": "https://homeenergysavings.delmarva.com/md/business/applymlb",
      "websiteUrl": "https://homeenergysavings.delmarva.com/md/business/overview",
      "sourceUrlsChecked": [
        "https://homeenergysavings.delmarva.com/md/business/overview",
        "https://homeenergysavings.delmarva.com/md/business/applymlb",
        "https://homeenergysavings.delmarva.com/md/business/building-tuneup",
        "https://homeenergysavings.delmarva.com/md/business/bid",
        "https://homeenergysavings.delmarva.com/md/business/mlb-incentives",
        "https://homeenergysavings.delmarva.com/md/business/chp"
      ],
      "evidenceText": "Delmarva]( Maryland business pages list lighting, HVAC, refrigeration, food service, controls, VFDs, window film, tune-up, monitoring-based commissioning, and custom measures. The CHP page says new applications are no longer accepted.",
      "reasoningNotes": "Keep the business efficiency categories but block CHP for new matching because the current Delmarva CHP page is closed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0f5b777132d1591d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.7
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "70% of eligible project cost",
        "evidenceText": "Our programs cover 40–70% of your total project cost",
        "sourceUrlsChecked": [
          "https://homeenergysavings.delmarva.com/md/business/overview"
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
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3744",
    "opportunityName": "Delmarva Power - Residential Energy Efficiency Rebate Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3744/delmarva-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://homeenergysavings.delmarva.com/",
    "applicationUrl": "https://homeenergysavings.delmarva.com/md/residential/appliance-rebate-program",
    "administrator": "Delmarva Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
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
          "Delmarva Power Maryland residential electric service territory"
        ],
        "notes": "Residential rebates and home performance incentives apply to eligible Delmarva Power Maryland electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_or_repair",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "window_replacement",
        "door_replacement",
        "residential_dehumidifier",
        "residential_refrigerator",
        "residential_clothes_washer"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Delmarva Power Maryland residential customer.",
        "Appliance rebates require qualifying ENERGY STAR or program-listed products.",
        "Home Performance rebates require assessment, contractor recommendations, and eligible project installation.",
        "Rebates are subject to program funding, caps, and current measure requirements.",
        "Some measures require qualified contractors or specific application paths."
      ],
      "blockers": [
        "Do not match commercial refrigeration or commercial food-service equipment.",
        "Residential refrigerator and clothes washer incentives are appliance rebates, not commercial refrigeration or laundry retrofits.",
        "Energy Wise Rewards and demand response thermostat incentives are separate from equipment rebates.",
        "Do not merge Delmarva business program measures into this residential record."
      ],
      "programType": "Rebate Program",
      "administrator": "Delmarva Power",
      "applicationUrl": "https://homeenergysavings.delmarva.com/md/residential/appliance-rebate-program",
      "websiteUrl": "https://homeenergysavings.delmarva.com/",
      "sourceUrlsChecked": [
        "https://homeenergysavings.delmarva.com/",
        "https://homeenergysavings.delmarva.com/md/residential/appliance-rebate-program",
        "https://homeenergysavings.delmarva.com/md/residential/appliance-rebate-program/electric-heat-pump-water-heater",
        "https://homeenergysavings.delmarva.com/md/residential/home-performance-with-energy-star-program/rebates"
      ],
      "evidenceText": "Delmarva]( residential pages list heat pump water heaters, smart thermostats, dehumidifiers, refrigerators, clothes washers, and Home Performance rebates for air sealing, insulation, ducts, HVAC, windows, and doors.",
      "reasoningNotes": "The original refrigeration category should be narrowed to residential appliances; the program also supports residential weatherization and home-performance measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b2d419bb739c7e67_v1",
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
        "formula": "$1,600 per ENERGY STAR certified hybrid heat pump water heater",
        "evidenceText": "Delmarva residential rebate page lists a $1,600 rebate for an ENERGY STAR certified hybrid water heater.",
        "sourceUrlsChecked": [
          "https://homeenergysavings.delmarva.com/md/residential/appliance-rebates",
          "https://homeenergysavings.delmarva.com/md/residential/rebates"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying hybrid water heater.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c1328dabcc07cc62_v1",
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
        "formula": "$100 per ENERGY STAR certified smart thermostat",
        "evidenceText": "Delmarva residential rebate page lists a $100 rebate for an ENERGY STAR certified smart thermostat.",
        "sourceUrlsChecked": [
          "https://homeenergysavings.delmarva.com/md/residential/appliance-rebates",
          "https://homeenergysavings.delmarva.com/md/residential/rebates"
        ],
        "reasoningNotes": "Matched smart thermostat term. Returned separately from HPWH.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
