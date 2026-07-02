You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 23
Targets in this prompt: 441-460 of 984
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
  "batchNumber": 23,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22282"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4199",
    "opportunityName": "Piedmont Natural Gas - Residential Equipment Efficiency Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4199/piedmont-natural-gas-residential-equipment-efficiency-program",
    "websiteUrl": "https://www.piedmontng.com/home/save-energy-and-money/residential-energy-efficiency-resources",
    "applicationUrl": "https://gasadvantage.piedmontng.com/docs/SC_application_rebate.pdf",
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Piedmont Natural Gas service territory"
        ],
        "notes": "South Carolina residential customers in Piedmont Natural Gas service territory."
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
        "Customer must receive natural gas service from Piedmont Natural Gas in South Carolina.",
        "Equipment must be qualifying new high-efficiency natural gas equipment meeting the listed efficiency tier.",
        "South Carolina rebates are generally tied to replacement of existing natural gas equipment.",
        "Application must be submitted with required invoice and installation documentation within the program deadline, generally 90 days after installation."
      ],
      "blockers": [
        "Do not match broad high_efficiency_hvac_replacement; only specified natural gas equipment is supported.",
        "Electric heat pumps, central air conditioners, insulation, windows, and weatherization are not supported by this opportunity.",
        "New gas conversion or non-gas HVAC measures should not match unless the current South Carolina application expressly includes them.",
        "Official Piedmont pages and PDFs returned HTTP 403 in direct browser checks, so final measure details should be confirmed by current rebate documents."
      ],
      "programType": "Rebate Program",
      "administrator": "Piedmont Natural Gas",
      "applicationUrl": "https://gasadvantage.piedmontng.com/docs/SC_application_rebate.pdf",
      "websiteUrl": "https://www.piedmontng.com/home/save-energy-and-money/residential-energy-efficiency-resources",
      "sourceUrlsChecked": [
        "https://www.piedmontng.com/home/save-energy-and-money/residential-energy-efficiency-resources",
        "https://gasadvantage-hpp.piedmontng.com/EnergyEfficiency/?utm_source=",
        "https://gasadvantage.piedmontng.com/docs/SC_application_rebate.pdf"
      ],
      "evidenceText": "Piedmont sources indicate South Carolina residential rebates for qualifying energy-efficient natural gas equipment, including furnace AFUE tiers and tankless water heaters.",
      "reasoningNotes": "The furnace retrofit match is supported when narrowed to qualifying natural gas furnaces. The broad HVAC replacement category is unsupported because the program is equipment-specific."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d93ac0683118ac93_v1",
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
        "formula": "$225 per residential natural gas furnace at 95%+ AFUE",
        "evidenceText": "Piedmont rebate portal lists AFUE 95% or higher furnaces at $225.",
        "sourceUrlsChecked": [
          "https://www.piedmontng.com/home/save-energy-and-money/residential-energy-efficiency-resources",
          "https://gasadvantage-hpp.piedmontng.com/EnergyEfficiency/"
        ],
        "reasoningNotes": "Matched high-efficiency furnace term. Use one unit as one qualifying furnace.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3607",
    "opportunityName": "York Electric Cooperative - Dual Fuel Heat Pump Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3607/york-electric-cooperative-dual-fuel-heat-pump-rebate-program",
    "websiteUrl": "https://www.yorkelectric.net/energy-savings/heat-pump-rebate/",
    "applicationUrl": null,
    "administrator": "York Electric Cooperative, Inc.",
    "programType": "Rebate Program",
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "York Electric Cooperative"
        ],
        "notes": "Limited to York Electric Cooperative members in its South Carolina service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "dual_fuel_heat_pump",
        "heat_pump_hvac_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a York Electric Cooperative member.",
        "Installed equipment must be a qualifying dual-fuel heat pump system.",
        "Rebate application or form requirements must be met.",
        "Additional systems receive lower incentive amounts than the first qualifying system."
      ],
      "blockers": [
        "Do not match generic high-efficiency HVAC replacement unless the project is a qualifying dual-fuel heat pump.",
        "Do not match air conditioners, furnaces, weatherization, or water heating as standalone measures.",
        "Do not match customers outside York Electric Cooperative territory."
      ],
      "programType": "Rebate Program",
      "administrator": "York Electric Cooperative, Inc.",
      "applicationUrl": null,
      "websiteUrl": "https://www.yorkelectric.net/energy-savings/heat-pump-rebate/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3607/york-electric-cooperative-dual-fuel-heat-pump-rebate-program",
        "https://www.yorkelectric.net/energy-savings/heat-pump-rebate/"
      ],
      "evidenceText": "York Electric describes a dual-fuel heat pump as an electric heat pump paired with a gas furnace and lists rebates for qualifying first and additional systems.",
      "reasoningNotes": "The heat-pump retrofit match is valid. The broad high-efficiency HVAC category should be narrowed to qualifying dual-fuel heat pump systems."
    },
    "existingSimpleRules": [
      {
        "id": "oir_579b43fcfb0d77ca_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 70000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$700 for the first eligible dual-fuel heat pump",
        "evidenceText": "York Electric rebate materials list a $700 rebate for the first dual-fuel heat pump.",
        "sourceUrlsChecked": [
          "https://www.yorkelectric.net/save-energy-money/rebates/dual-fuel-heat-pump-rebate/"
        ],
        "reasoningNotes": "Matched heat pump term. Additional units have a lower published amount.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_6681af3bc4351355_v1",
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
        "formula": "$200 for each additional eligible dual-fuel heat pump",
        "evidenceText": "York Electric rebate materials list $200 rebates for additional dual-fuel heat pumps.",
        "sourceUrlsChecked": [
          "https://www.yorkelectric.net/save-energy-money/rebates/dual-fuel-heat-pump-rebate/"
        ],
        "reasoningNotes": "Returned separately because first and additional heat pumps have different amounts.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3912",
    "opportunityName": "Montana-Dakota Utilities (Gas) - Commercial Natural Gas Efficiency Rebate Program",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3912/montana-dakota-utilities-gas-commercial-natural-gas-efficiency-rebate-program",
    "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/",
    "applicationUrl": null,
    "administrator": "Montana-Dakota Utilities Co.",
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
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Montana-Dakota Utilities natural gas"
        ],
        "notes": "South Dakota commercial natural gas customers only for this record."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "custom_natural_gas_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a South Dakota commercial natural gas customer of Montana-Dakota Utilities.",
        "Prescriptive furnace rebate requires a natural gas furnace with AFUE of 95% or greater.",
        "South Dakota commercial furnace eligibility is limited to natural gas furnaces rated under 125,000 Btuh.",
        "Dealer sales invoice or receipt and program application are required.",
        "Custom commercial natural gas projects must use MDU gas as the primary heating source and receive preapproval.",
        "Funding is limited, applications are first-come first-served, and incentives may be unpaid if funds are depleted."
      ],
      "blockers": [
        "No North Dakota or Wyoming commercial incentives are available under this program.",
        "Do not match residential measures or Montana electric lighting measures to this South Dakota gas record.",
        "Do not match broad HVAC replacement unless it is a qualifying 95%+ natural gas furnace or a preapproved gas-saving custom project."
      ],
      "programType": "Rebate Program",
      "administrator": "Montana-Dakota Utilities Co.",
      "applicationUrl": null,
      "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/",
      "sourceUrlsChecked": [
        "https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/",
        "https://www.montana-dakota.com/wp-content/uploads/PDFs/Rebate-Offerings/2021/south_dakota/2021-01_MDU_SD_CommHeating_Final.pdf"
      ],
      "evidenceText": "MDU’s]( South Dakota commercial gas section lists AFUE 95%+ furnace rebates under 125,000 Btuh and a preapproved gas custom project program.",
      "reasoningNotes": "Furnace is valid, but the broad high-efficiency HVAC category should be narrowed to commercial natural-gas furnace and custom gas efficiency."
    },
    "existingSimpleRules": [
      {
        "id": "oir_95a2b93e9a0a7ddf_v1",
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
        "formula": "$300 per qualifying commercial natural gas furnace replacement",
        "evidenceText": "Montana-Dakota commercial rebate materials list qualifying furnace replacement incentives at $300.",
        "sourceUrlsChecked": [
          "https://www.montana-dakota.com/conservation/commercial-rebates/",
          "https://www.montana-dakota.com/wp-content/uploads/pdfs/Conservation/2025_Comm_EEP_Incentive_Application.pdf"
        ],
        "reasoningNotes": "Matched furnace term. Confidence is medium because the detailed table source was a recent application/PDF table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22393",
    "opportunityName": "Austin Energy - EV Charging Station Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22393/austin-energy-ev-charging-station-rebate-program",
    "websiteUrl": "https://austinenergy.com/green-power/plug-in-austin/home-charging",
    "applicationUrl": "https://austinenergy.com/green-power/plug-in-austin/home-charging",
    "administrator": "Austin Energy",
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy"
        ],
        "notes": "Limited to Austin Energy residential electric customers for the home-charging page tied to this opportunity."
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
        "level_2_ev_charger_installation",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an Austin Energy electric customer.",
        "Applicant must have purchased or leased a plug-in electric vehicle.",
        "Rebate applies to qualifying Level 2 240-volt home charging stations.",
        "Licensed electrician, permit, inspection, and new safety-certified equipment requirements apply.",
        "Application is submitted after installation with required documentation."
      ],
      "blockers": [
        "Business, nonprofit, multifamily, Level 1, and DCFC charger rebates are on a separate Austin Energy business charging program path.",
        "Level 1 and DC fast charging should not match this residential home-charging opportunity.",
        "Projects outside Austin Energy service territory should not match.",
        "Used or uncertified charging equipment should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Austin Energy",
      "applicationUrl": "https://austinenergy.com/green-power/plug-in-austin/home-charging",
      "websiteUrl": "https://austinenergy.com/green-power/plug-in-austin/home-charging",
      "sourceUrlsChecked": [
        "https://austinenergy.com/green-power/plug-in-austin/home-charging",
        "https://austinenergy.com/green-power/plug-in-austin/workplace-charging",
        "https://programs.dsireusa.org/system/program/detail/22393/austin-energy-ev-charging-station-rebate-program"
      ],
      "evidenceText": "Austin Energy's home charging page lists a residential rebate for Level 2 home charging stations, with customer, vehicle, permit, inspection, and equipment requirements.",
      "reasoningNotes": "For this home-charging opportunity, keep only residential Level 2 EV charger categories. Business DCFC and Level 1 incentives are separate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7f7815b013d78f22_v1",
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
        "confidence": "medium",
        "formula": "$120 per eligible unit",
        "evidenceText": "ial Rates Approved Rates Schedules Power Outages Report Outages Plan Ahead Current Conditions About Who We Are Building a Better Austin Electrical Safety Community Outreach Careers Corporate Reports News Home EV Charger Rebate Charging, Incentives and Resources EVerything Charging Electric Vehicles and Emerging Technology (EVET) Home EV Charger Rebate Power Partner℠ EV FAQs Business EV Charger Rebate E-Ride Rebate Electric Ride (E-Ride) Rebate Home EV Charger Rebate Get up to $1,20",
        "sourceUrlsChecked": [
          "https://austinenergy.com/ae/green-power/plug-in-austin/home-charging"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22058",
    "opportunityName": "City of San Marcos - Commercial Lighting Retrofit Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22058/city-of-san-marcos-commercial-lighting-retrofit-program",
    "websiteUrl": "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
    "applicationUrl": "https://sanmarcostx.gov/DocumentCenter/View/15577",
    "administrator": "San Marcos Electric Utility",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting",
          "lighting retrofit"
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
          "lighting controls",
          "lighting control"
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
        "counties": [
          "Hays"
        ],
        "cities": [
          "San Marcos"
        ],
        "utilityTerritories": [
          "San Marcos Electric Utility",
          "SMTX Utilities"
        ],
        "notes": "Available to existing eligible SMTX Utility customers in good standing."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "multifamily_customers",
        "institutional_customers",
        "industrial_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "institutional",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "exit_sign_led_retrofit",
        "fluorescent_lighting_replacement"
      ],
      "hardRequirements": [
        "Applicant must be an existing SMTX Utility customer in good standing.",
        "Program is open to eligible existing multifamily, commercial, institutional, and industrial customers.",
        "Preapproval is required before purchasing or installing equipment.",
        "Qualifying products must improve lighting efficiency and document energy savings.",
        "Rebate is capped by installed cost and program limits."
      ],
      "blockers": [
        "New buildings constructed within the last 10 years are not eligible.",
        "Residential single-family lighting is not eligible under this commercial program.",
        "Non-lighting measures should not be matched.",
        "Work completed before preapproval should not be matched."
      ],
      "programType": "Rebate",
      "administrator": "San Marcos Electric Utility",
      "applicationUrl": "https://sanmarcostx.gov/DocumentCenter/View/15577",
      "websiteUrl": "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
      "sourceUrlsChecked": [
        "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
        "https://sanmarcostx.gov/DocumentCenter/View/15577"
      ],
      "evidenceText": "San Marcos supports existing customer lighting retrofits including LED replacements, fluorescent upgrades, exit signs, and lighting controls with preapproval.",
      "reasoningNotes": "Both original lighting matches are correct, with additional product-specific lighting categories supported by current official materials."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7c447b4ecb01e150_v1",
        "incentiveType": "rate_per_kw_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 25000,
          "kwSource": "demand_reduction_kw"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 1250000,
          "maxPercentOfBasis": 0.5
        },
        "confidence": "medium",
        "formula": "$250 per kW reduced for commercial lighting retrofit, capped at $12,500 and 50% of installed cost",
        "evidenceText": "DSIRE/current San Marcos summary lists $250 per kW reduced and $12,500 or 50% installed-cost cap.",
        "sourceUrlsChecked": [
          "https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs",
          "https://programs.dsireusa.org/system/program/detail/22058"
        ],
        "reasoningNotes": "Matched lighting retrofit/control terms. Confidence is medium because the official page links the application but did not expose the full table in text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22397",
    "opportunityName": "SWEPCO - EV Residential Charging Station Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22397/swepco-ev-residential-charging-station-rebate-program",
    "websiteUrl": "https://www.swepco.com/clean-energy/electric-cars/charging-station.aspx",
    "applicationUrl": "https://www.swepco.com/clean-energy/electric-cars/charging-station.aspx",
    "administrator": "SWEPCO",
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
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "SWEPCO Texas residential electric service territory"
        ],
        "notes": "SWEPCO's program rules page also references Louisiana, but this DSIRE target is the Texas residential charging-station record."
      },
      "eligibleApplicantTypes": [
        "SWEPCO residential electric customers",
        "single-family homeowners",
        "residential renters with authority to install qualifying equipment"
      ],
      "eligibleSectors": [
        "residential",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "ev_charging_level_2_residential",
        "energy_star_ev_charging_station"
      ],
      "hardRequirements": [
        "Applicant must be a SWEPCO residential customer in the applicable service territory.",
        "Charging station must be an ENERGY STAR-certified Level 2 home EV charging station.",
        "Program is limited to qualifying residential installations at single-family homes under SWEPCO rules.",
        "SWEPCO rules limit the rebate count per service address.",
        "Funding is limited and rebates are available while funds last."
      ],
      "blockers": [
        "This is not a vehicle purchase rebate.",
        "Do not match this record to DC fast charging, commercial charging, fleet charging or public charging stations.",
        "No HVAC, appliance, lighting, envelope or water-efficiency retrofit categories are supported by this record.",
        "Level 1 chargers and non-ENERGY STAR chargers were not retained."
      ],
      "programType": "Rebate Program",
      "administrator": "SWEPCO",
      "applicationUrl": "https://www.swepco.com/clean-energy/electric-cars/charging-station.aspx",
      "websiteUrl": "https://www.swepco.com/clean-energy/electric-cars/charging-station.aspx",
      "sourceUrlsChecked": [
        "https://www.swepco.com/clean-energy/electric-cars/charging-station.aspx",
        "https://www.swepco.com/clean-energy/electric-cars/charging-station-rules.aspx",
        "https://www.swepco.com/clean-energy/electric-cars/",
        "https://programs.dsireusa.org/system/program/detail/22397/swepco-ev-residential-charging-station-rebate-program"
      ],
      "evidenceText": "SWEPCO's current Level 2 Home EV Charging Station Rebate Program page says residential customers who own or rent a single-family home may qualify for a rebate for installing an ENERGY STAR-certified Level 2 EV charging station. SWEPCO's program rules identify the rebate as a home Level 2 charging-station rebate with limits per service address and limited funding.",
      "reasoningNotes": "The opportunity is active and should remain narrowly mapped to residential Level 2 EVSE installed for SWEPCO residential customers in Texas."
    },
    "existingSimpleRules": [
      {
        "id": "oir_816d17388612cbd2_v1",
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
        "formula": "$250 per ENERGY STAR certified Level 2 EV charging station",
        "evidenceText": "SWEPCO says eligible customers can qualify for a $250 ENERGY STAR Level 2 EV charging station rebate.",
        "sourceUrlsChecked": [
          "https://www.swepco.com/savings/home/money/rebates/",
          "https://www.swepco.com/clean-energy/electric-cars/charging-station-rules"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Use one unit as one eligible charging station.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22398",
    "opportunityName": "United Cooperative Services - EV Charging Station Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22398/united-cooperative-services-ev-charging-station-rebate-program",
    "websiteUrl": "https://ucs.net/rebate-programs",
    "applicationUrl": "https://ucs.net/sites/default/files/2025%20REBATE%20APPLICATION_2.pdf",
    "administrator": "United Cooperative Services",
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
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "United Cooperative Services"
        ],
        "notes": "Limited to United Cooperative Services member locations served by United."
      },
      "eligibleApplicantTypes": [
        "electric_cooperative_member",
        "residential_customer",
        "property_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a United Cooperative Services member.",
        "Charger must be a new Level 2, 240-volt EV charger installed at a location served by United.",
        "Member must sign up for Beat the Peak text alerts.",
        "Charger must be programmable for delayed charging to avoid 4 p.m. to 8 p.m. peak hours from May through October.",
        "Required rebate documentation must be submitted within the program deadline."
      ],
      "blockers": [
        "Level 1 chargers, DC fast chargers, and non-Level-2 equipment are not supported.",
        "Installations outside United's service territory should not match.",
        "Non-residential or public charging uses are not supported by the checked source."
      ],
      "programType": "Rebate Program",
      "administrator": "United Cooperative Services",
      "applicationUrl": "https://ucs.net/sites/default/files/2025%20REBATE%20APPLICATION_2.pdf",
      "websiteUrl": "https://ucs.net/rebate-programs",
      "sourceUrlsChecked": [
        "https://ucs.net/rebate-programs",
        "https://ucs.net/sites/default/files/2025%20REBATE%20APPLICATION_2.pdf",
        "https://programs.dsireusa.org/system/program/detail/22398/united-cooperative-services-ev-charging-station-rebate-program"
      ],
      "evidenceText": "United's]( rebate page lists a Level 2 EV charger rebate for members, with service-territory, Beat the Peak, and delayed-charging requirements.",
      "reasoningNotes": "Use the narrower Level 2 EV charger category rather than a broad EV charging category."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1ede8f8b4b392f0f_v1",
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
        "evidenceText": "Back Electric Vehicle Chargers More info Electric Vehicle (EV) Charger Rebate 50 percent up to $250 on a Level 2 (240 volt) EV charger Equipment must be new The recipient must be a member of United, and the EV charger must be installed at a location served by United Member must sign up for Beat the Peak notifications via text messages Charging equipment",
        "sourceUrlsChecked": [
          "https://ucs.net/rebate-programs"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22588",
    "opportunityName": "Commercial Energy Efficiency Rebate Programs",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22588/commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=biz",
    "applicationUrl": null,
    "administrator": "Efficiency Vermont",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "VT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Efficiency Vermont service territory"
        ],
        "notes": "Available for qualifying business and rental properties served by Efficiency Vermont; some municipal or utility-administered territories may differ."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_property_owner",
        "rental_property_owner",
        "nonprofit_customer",
        "agricultural_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "multifamily",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "high_efficiency_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "building_envelope_air_sealing_insulation",
        "business_energy_assessment",
        "custom_energy_efficiency_project",
        "variable_frequency_drive_motor_controls"
      ],
      "hardRequirements": [
        "Site must be in Efficiency Vermont service territory and meet the specific business or rental-property offer terms.",
        "Equipment must satisfy current product-specific rebate requirements and required documentation.",
        "Offers are subject to current program funding, caps, and measure-specific rules."
      ],
      "blockers": [
        "Do not generalize product-specific kitchen or refrigeration offers into all plumbing or appliance projects.",
        "Transportation and EV partner offers are separate from ordinary building efficiency rebates.",
        "Projects in territories served by another efficiency administrator may need a different program."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Vermont",
      "applicationUrl": null,
      "websiteUrl": "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=biz",
      "sourceUrlsChecked": [
        "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=biz",
        "https://www.efficiencyvermont.com/rebates"
      ],
      "evidenceText": "Official]( rebate list shows business-eligible lighting, refrigeration, commercial kitchen, HVAC, heat pump, controls, building performance, assessment, and custom project offers.",
      "reasoningNotes": "Input batch citation: The original refrigeration and LED lighting matches are supported; categories were narrowed to measures shown on the current business rebate list."
    },
    "existingSimpleRules": [
      {
        "id": "oir_bad6b6e3c093b59b_v1",
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
        "formula": "Up to $100 per efficient evaporator fan motor",
        "evidenceText": "Efficiency Vermont 2026 business materials list efficient evaporator fan motor incentives up to $100.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates/list/business-refrigeration",
          "https://www.efficiencyvermont.com/Media/Default/docs/rebates/qpls/efficiency-vermont-business-offerings.pdf"
        ],
        "reasoningNotes": "Returned separately because efficient fan motors have a distinct published value.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ec9a6130d2b6ee27_v1",
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
        "confidence": "high",
        "formula": "$30 per evaporator fan motor control",
        "evidenceText": "Efficiency Vermont 2026 business materials list evaporator fan motor controls at $30 per fan.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates/list/business-refrigeration",
          "https://www.efficiencyvermont.com/Media/Default/docs/rebates/qpls/efficiency-vermont-business-offerings.pdf"
        ],
        "reasoningNotes": "Matched refrigeration controls. Use one unit as one eligible controlled fan.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22404",
    "opportunityName": "Green Mountain Power EV Charging Station Program",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22404/green-mountain-power-ev-charging-station-program",
    "websiteUrl": "https://greenmountainpower.com/rebates-programs/electric-vehicles/in-home-ev-charger/",
    "applicationUrl": "https://greenmountainpower.com/electric-vehicle-charger/",
    "administrator": "Green Mountain Power",
    "programType": "Residential Level 2 EV Charger Rebate And Managed Charging",
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
          "VT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Green Mountain Power"
        ],
        "notes": "Residential in-home charger offer for eligible Green Mountain Power customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners",
        "renters_with_landlord_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "managed_ev_charging_enrollment"
      ],
      "hardRequirements": [
        "Customer must be a GMP residential customer with an eligible all-electric vehicle registered at the GMP account address.",
        "Customer must own the home or have landlord approval.",
        "Customer must have a smart meter, reliable internet, and Wi-Fi connection for the charger.",
        "Customer must enroll the charger in GMP's discount EV charging rate or Home Charging program.",
        "Installation incentives and free charger offer are subject to current program limits."
      ],
      "blockers": [
        "Business, workplace, public, multifamily, and DC fast charging incentives are separate GMP business EV programs.",
        "Plug-in hybrid vehicle purchase rebates are separate from the in-home Level 2 charger eligibility described here.",
        "General electrical upgrades unrelated to the Level 2 charger should not match."
      ],
      "programType": "Residential Level 2 EV Charger Rebate And Managed Charging",
      "administrator": "Green Mountain Power",
      "applicationUrl": "https://greenmountainpower.com/electric-vehicle-charger/",
      "websiteUrl": "https://greenmountainpower.com/rebates-programs/electric-vehicles/in-home-ev-charger/",
      "sourceUrlsChecked": [
        "https://greenmountainpower.com/rebates-programs/electric-vehicles/in-home-ev-charger/",
        "https://greenmountainpower.com/rebates-programs/electric-vehicles/ev-rebate/",
        "https://greenmountainpower.com/rebates-programs/electric-vehicles/ev-charging-rates/",
        "https://greenmountainpower.com/electric-vehicle-charger/",
        "https://greenmountainpower.com/rebates-programs/business-innovation/electric-vehicles/"
      ],
      "evidenceText": "GMP's in-home EV charger page offers eligible residential customers a Level 2 charger and installation incentives tied to managed EV charging rates.",
      "reasoningNotes": "The Level 2 EV charger match is valid, narrowed to residential in-home managed charging; business EV charging is a separate program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_934bf1dc960900b6_v1",
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
        "confidence": "high",
        "formula": "$1,200 per public, workplace, or multifamily Level 2 charging port",
        "evidenceText": "GMP business EV page lists Level 2 charger installation incentive at $1,200 per port.",
        "sourceUrlsChecked": [
          "https://greenmountainpower.com/rebates-programs/business-innovation/electric-vehicles/"
        ],
        "reasoningNotes": "Matched public/workplace/multifamily Level 2 charging. Use one unit as one charging port.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c7ef81525b91337a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1000000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$10,000 per public Level 3 charging station",
        "evidenceText": "GMP business EV page lists Level 3 public charging station incentive at $10,000.",
        "sourceUrlsChecked": [
          "https://greenmountainpower.com/rebates-programs/business-innovation/electric-vehicles/"
        ],
        "reasoningNotes": "Returned separately because Level 3 stations have a distinct published amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22340",
    "opportunityName": "Stowe Electric - Electric Vehicle Purchase Rebate",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22340/stowe-electric-electric-vehicle-purchase-rebate",
    "websiteUrl": "https://www.stoweelectric.com/rebates/electric-vehicles",
    "applicationUrl": "https://36d9b8a8-f32e-4615-98f8-47b75c55b204.usrfiles.com/ugd/36d9b8_b3b92c2b8ed843cd9ab5b6a4148f7f97.pdf",
    "administrator": "Stowe Electric Department",
    "programType": "Electric Vehicle Purchase Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "electric_vehicle_purchase",
        "displayName": "Electric vehicle purchase",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric vehicle purchase"
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
          "Lamoille"
        ],
        "cities": [
          "Stowe"
        ],
        "utilityTerritories": [
          "Stowe Electric Department"
        ],
        "notes": "Vehicle must be registered in Lamoille County and customer must be served by Stowe Electric."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "electric_utility_customers"
      ],
      "eligibleSectors": [
        "residential",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "electric_vehicle_purchase_or_lease"
      ],
      "hardRequirements": [
        "Applicant must be a Stowe Electric customer.",
        "Vehicle must be new or used all-electric or plug-in hybrid and may be purchased or leased.",
        "Vehicle must be registered in Lamoille County.",
        "Rebate request must be submitted within 30 days of purchase or lease.",
        "Rebate is subject to available funds and program rules."
      ],
      "blockers": [
        "Do not match ev_charger_installation; this opportunity is for EV purchase or lease incentives, not charger installation.",
        "State of Vermont, MileageSmart, and Replace Your Ride incentives are separate programs.",
        "Connected Homes status affects enhanced vehicle incentives but does not turn this into a charger installation rebate."
      ],
      "programType": "Electric Vehicle Purchase Rebate",
      "administrator": "Stowe Electric Department",
      "applicationUrl": "https://36d9b8a8-f32e-4615-98f8-47b75c55b204.usrfiles.com/ugd/36d9b8_b3b92c2b8ed843cd9ab5b6a4148f7f97.pdf",
      "websiteUrl": "https://www.stoweelectric.com/rebates/electric-vehicles",
      "sourceUrlsChecked": [
        "https://www.stoweelectric.com/rebates/electric-vehicles",
        "https://36d9b8a8-f32e-4615-98f8-47b75c55b204.usrfiles.com/ugd/36d9b8_b3b92c2b8ed843cd9ab5b6a4148f7f97.pdf",
        "https://36d9b8a8-f32e-4615-98f8-47b75c55b204.usrfiles.com/ugd/36d9b8_1393e0e253e54bb099ff4cffe5dce524.pdf"
      ],
      "evidenceText": "Stowe]( Electric provides 2026 EV rebate forms for new or used all-electric and plug-in hybrid vehicles, with Lamoille County registration and timely submission requirements.",
      "reasoningNotes": "The electric-vehicle purchase match is correct. The EV charger installation match is a false positive for this opportunity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e8d3c01c94f733a4_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 70000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$700 per new all-electric vehicle eligible for Connected Homes",
        "evidenceText": "Stowe Electric 2026 EV rebate form lists New All-Electric Vehicle at $700 when eligible for Connected Homes.",
        "sourceUrlsChecked": [
          "https://www.stoweelectric.com/rebates/electric-vehicles"
        ],
        "reasoningNotes": "Matched EV purchase target. Medium because non-Connected Homes eligibility has lower amounts.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4640",
    "opportunityName": "Avista Utilities - Residential Energy Efficiency Rebate Programs",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4640/avista-utilities-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.myavista.com/energy-savings/rebates-washington",
    "applicationUrl": "https://www.myavista.com/energy-savings/rebates-washington/single-family-energy-rebates-washington/windows",
    "administrator": "Avista Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Avista Utilities"
        ],
        "notes": "Limited to Avista Washington residential electric or natural gas customers, depending on measure and primary heating fuel."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "multifamily_property_owner",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "low_income"
      ],
      "eligibleRetrofitCategories": [
        "window_replacement",
        "storm_window_installation",
        "sliding_glass_door_replacement",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "exterior_door_replacement",
        "hvac_efficiency_upgrade",
        "water_heating_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Avista Washington residential customer.",
        "Window and sliding-glass-door rebates require replacement of existing units in an existing primary residence.",
        "Primary heating fuel and service type requirements apply by measure.",
        "Applications and required documentation must be submitted within program deadlines.",
        "Insulation and weatherization measures may require approved program contractors or income qualification."
      ],
      "blockers": [
        "Commercial and five-or-more-unit multifamily projects should use business program pathways and not this single-family or small multifamily residential opportunity.",
        "New construction, seasonal homes, and recreational homes should not match window rebates.",
        "A generic window match should not be confused with window air conditioners.",
        "Do not infer unrelated commercial refrigeration, motors, or industrial measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Avista Utilities",
      "applicationUrl": "https://www.myavista.com/energy-savings/rebates-washington/single-family-energy-rebates-washington/windows",
      "websiteUrl": "https://www.myavista.com/energy-savings/rebates-washington",
      "sourceUrlsChecked": [
        "https://www.myavista.com/energy-savings/rebates-washington",
        "https://www.myavista.com/energy-savings/rebates-washington/single-family-energy-rebates-washington",
        "https://www.myavista.com/energy-savings/rebates-washington/single-family-energy-rebates-washington/windows",
        "https://www.myavista.com/energy-savings/rebates-washington/residential-multifamily-energy-rebates-washington",
        "https://programs.dsireusa.org/system/program/detail/4640/avista-utilities-residential-energy-efficiency-rebate-programs"
      ],
      "evidenceText": "Avista Washington residential pages list window, storm window, sliding glass door, insulation, weatherization, HVAC, and water-heating rebates or assistance for eligible customers.",
      "reasoningNotes": "Both insulation and window replacement are supported. Narrow window-related categories to actual windows, storm windows, and sliding glass doors."
    },
    "existingSimpleRules": [
      {
        "id": "oir_26152157b8bf17a9_v1",
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
        "formula": "Up to $600 per qualifying replacement window or sliding glass door",
        "evidenceText": "Avista Washington residential rebates list windows and sliding glass doors at up to $600.",
        "sourceUrlsChecked": [
          "https://www.myavista.com/energy-savings/rebates-washington"
        ],
        "reasoningNotes": "Matched window term. Medium because amount varies by product type and eligibility.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2205",
    "opportunityName": "Benton PUD - Commercial, Industrial, and Agricultural Energy Efficiency Rebate Programs",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2205/benton-pud-commercial-industrial-and-agricultural-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.bentonpud.org/rebates-savings/rebates/business-rebates",
    "applicationUrl": "https://www.bentonpud.org/getattachment/565fae31-f1e4-4409-a6e3-565d377f0f1d/CEEP-Application.pdf",
    "administrator": "Benton PUD",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Benton PUD"
        ],
        "notes": "Available only for qualifying nonresidential electric service customers in Benton PUD territory."
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
        "nonresidential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "commercial_lighting_controls",
        "commercial_refrigeration_efficiency",
        "compressed_air_system_efficiency",
        "variable_frequency_drive",
        "commercial_heat_pump_hvac_retrofit",
        "ductless_heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "rooftop_unit_controls",
        "variable_refrigerant_flow_hvac",
        "commercial_weatherization",
        "insulation_upgrade",
        "window_replacement",
        "agricultural_pump_vfd",
        "industrial_process_efficiency"
      ],
      "hardRequirements": [
        "Applicant must receive qualifying nonresidential electric service from Benton PUD.",
        "Projects must be pre-authorized before purchase or installation.",
        "Commercial, industrial, agricultural, and qualifying new-construction lighting projects must follow the CEEP application process."
      ],
      "blockers": [
        "Residential appliances and home weatherization are not supported by this commercial, industrial, agricultural rebate program.",
        "Projects started before written authorization may be ineligible.",
        "Refrigeration eligibility should stay commercial or custom-measure specific, not residential refrigerator replacement."
      ],
      "programType": "Rebate Program",
      "administrator": "Benton PUD",
      "applicationUrl": "https://www.bentonpud.org/getattachment/565fae31-f1e4-4409-a6e3-565d377f0f1d/CEEP-Application.pdf",
      "websiteUrl": "https://www.bentonpud.org/rebates-savings/rebates/business-rebates",
      "sourceUrlsChecked": [
        "https://www.bentonpud.org/rebates-savings/rebates/business-rebates",
        "https://www.bentonpud.org/getattachment/565fae31-f1e4-4409-a6e3-565d377f0f1d/CEEP-Application.pdf"
      ],
      "evidenceText": "Benton PUD business rebate sources list lighting, heating, weatherization, agricultural, industrial, custom, compressed-air, VFD, refrigeration, and commercial project incentives with preauthorization requirements.",
      "reasoningNotes": "Current official sources support both lighting and commercial refrigeration matches, plus multiple nonresidential efficiency categories. Keep the opportunity nonresidential and preauthorization-gated."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4cbf523521cb4be7_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 150000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$1,500 per eligible unit",
        "evidenceText": "Variable Refrigerant Flow Systems Up to $1,500 per ton Requirements and Specifications This measure applies to retrofits only",
        "sourceUrlsChecked": [
          "https://www.bentonpud.org/Energy-Programs/Rebates/Commercial"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2212",
    "opportunityName": "Port Angeles Public Works & Utilities - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2212/port-angeles-public-works-and-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp",
    "applicationUrl": null,
    "administrator": "City of Port Angeles Public Works and Utilities",
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
          "heat pump",
          "ductless"
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
          "WA"
        ],
        "counties": [],
        "cities": [
          "Port Angeles"
        ],
        "utilityTerritories": [
          "City of Port Angeles electric utility service territory"
        ],
        "notes": "Residential rebates require City electric service and other Weatherwise eligibility rules."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners",
        "renters"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "ductless_heat_pump_hvac_retrofit",
        "variable_speed_heat_pump_retrofit",
        "heat_pump_water_heater",
        "window_replacement"
      ],
      "hardRequirements": [
        "Home must currently be served electricity by the City of Port Angeles",
        "Home must have electric heating equipment capable of heating the building",
        "Advance written approval and a Notice to Proceed are required before work",
        "City-authorized contractor process applies to core weatherization and heat pump measures",
        "New construction is not eligible for insulation rebates"
      ],
      "blockers": [
        "Work performed before written City approval is not eligible",
        "Homes outside City electric service are not eligible",
        "Commercial and industrial rebates are handled on a separate conservation page",
        "Non-electric heating conversions may require removal of non-electric heating equipment",
        "Water conservation and stormwater rebates on the same page should not be merged into energy retrofit matching"
      ],
      "programType": "Rebate",
      "administrator": "City of Port Angeles Public Works and Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp",
      "sourceUrlsChecked": [
        "https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp",
        "https://www.cityofpa.us/1329/Free-Weatherization-Program",
        "https://www.cityofpa.us/DocumentCenter/View/13745/Insulation-Rebate-Application-2023-V1",
        "https://www.cityofpa.us/DocumentCenter/View/13741/Heat-Pump-Rebate-Application-2023-V1"
      ],
      "evidenceText": "Port Angeles residential conservation pages list insulation, windows, heat pumps, and heat pump water heaters, with City electric service, electric heating, and written approval before work.",
      "reasoningNotes": "Heat pump and insulation matches are source-backed. Additional window and heat pump water heater categories are included because they are on the same residential conservation program page."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0deaa45c0f5345e4_v1",
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
        "formula": "$800 per standard ductless heat pump installation",
        "evidenceText": "Port Angeles residential conservation page says the standard rebate for qualifying DHP installation is $800.",
        "sourceUrlsChecked": [
          "https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp",
          "http://wa-portangeles.civicplus.com/790/Residential-Conservation-Rebates"
        ],
        "reasoningNotes": "Matched ductless heat pump term. Use one unit as one qualifying installation.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_1fcb1700a40f06c1_v1",
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
        "formula": "Up to $1,000 per variable-speed heat pump depending on current heating system",
        "evidenceText": "Port Angeles residential conservation page says variable-speed heat pump rebates are $200 or $1,000.",
        "sourceUrlsChecked": [
          "https://www.cityofpa.us/790/Residential-Conservation-and-Rebates-Opp",
          "http://wa-portangeles.civicplus.com/790/Residential-Conservation-Rebates"
        ],
        "reasoningNotes": "Returned as a candidate for the higher variable-speed heat pump tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22357",
    "opportunityName": "Barron Electric Cooperative - Electric Vehicle Charging Station Rebate",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22357/barron-electric-cooperative-electric-vehicle-charging-station-rebate",
    "websiteUrl": "https://www.barronelectric.com/2026-energy-rebates",
    "applicationUrl": "https://www.barronelectric.com/sites/default/files/2026%20EV%20-%20fillable.pdf",
    "administrator": "Barron Electric Cooperative",
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Barron Electric Cooperative"
        ],
        "notes": "Available to members on Barron Electric Cooperative lines; business eligibility requires contacting the cooperative."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "business_members"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "smart_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Barron Electric Cooperative member.",
        "Equipment must be installed on cooperative lines and may be inspected.",
        "Member must participate in the cooperative load management program that can interrupt charging during peak hours.",
        "Proof of electric vehicle purchase, vehicle registration, and charger receipt is required.",
        "Alternative charger rebate excludes installation cost and cannot exceed charger cost."
      ],
      "blockers": [
        "Tesla NEMA plug or adapter does not qualify.",
        "General electrical work unrelated to eligible EV charging equipment is not eligible.",
        "Alternative charger installation labor is not rebated.",
        "Business members are not automatically eligible and must confirm eligibility with Barron Electric."
      ],
      "programType": "Rebate",
      "administrator": "Barron Electric Cooperative",
      "applicationUrl": "https://www.barronelectric.com/sites/default/files/2026%20EV%20-%20fillable.pdf",
      "websiteUrl": "https://www.barronelectric.com/2026-energy-rebates",
      "sourceUrlsChecked": [
        "https://www.barronelectric.com/2026-energy-rebates",
        "https://www.barronelectric.com/electric-vehicles",
        "https://www.barronelectric.com/load-management",
        "https://www.barronelectric.com/sites/default/files/2026%20EV%20-%20fillable.pdf"
      ],
      "evidenceText": "The 2026 rebate form offers a free smart EV charger or a rebate for a compatible alternative charger, with cooperative load management participation required.",
      "reasoningNotes": "The EV charger matches are correct, but should be narrowed to smart or load-managed Level 2 EV charging equipment and not generalized to other electrical retrofits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_266f0cdc9203a882_v1",
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
        "formula": "Up to $500 for a compatible Level 2 EV charger",
        "evidenceText": "Barron Electric 2026 EV form lists up to $500 rebate for a compatible alternative charger.",
        "sourceUrlsChecked": [
          "https://www.barronelectric.com/rebates",
          "https://www.barronelectric.com/sites/default/files/2026%20EV%20Charger%20Rebate.pdf"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Confidence is medium because program also offers cooperative-supplied charger pathways.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22366",
    "opportunityName": "Riverland Energy Cooperative - Electric Vehicle Charging Station Rebate",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22366/riverland-energy-cooperative-electric-vehicle-charging-station-rebate",
    "websiteUrl": "https://www.riverlandenergy.com/rebates",
    "applicationUrl": "https://www.riverlandenergy.com/form/ev-chargers-rebate-form",
    "administrator": "Riverland Energy Cooperative",
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
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Riverland Energy Cooperative"
        ],
        "notes": "Limited to Riverland Energy Cooperative members with equipment installed on cooperative lines."
      },
      "eligibleApplicantTypes": [
        "cooperative_members",
        "residential_members"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "controlled_ev_charging_equipment",
        "ev_charging_secondary_meter_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Riverland Energy Cooperative member.",
        "EV charger must be installed on cooperative lines.",
        "Charging station must be on load control or time-of-use service as defined by the cooperative.",
        "Rebate submission must include invoice or receipt and proof of installation.",
        "Submission must be made within the required post-installation period and is subject to available funds."
      ],
      "blockers": [
        "Current accessible official form does not verify a Level 2-only category.",
        "Do not match DC fast charging, commercial fleet infrastructure, or non-member charging projects.",
        "Rebate cannot exceed charger cost and does not cover unrelated electrical upgrades except the specified secondary meter installation cost."
      ],
      "programType": "Rebate Program",
      "administrator": "Riverland Energy Cooperative",
      "applicationUrl": "https://www.riverlandenergy.com/form/ev-chargers-rebate-form",
      "websiteUrl": "https://www.riverlandenergy.com/rebates",
      "sourceUrlsChecked": [
        "https://www.riverlandenergy.com/rebates",
        "https://www.riverlandenergy.com/form/ev-chargers-rebate-form"
      ],
      "evidenceText": "Riverland's 2026 rebate form covers EV charging stations on load control or TOU and a secondary-meter installation-cost rebate for cooperative members, with documentation and 3-month submission rules.",
      "reasoningNotes": "Retain EV charger installation, but remove the unsupported Level 2-specific category because the current accessible cooperative form does not state Level 2."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8e81f1fc9e81b84c_v1",
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
        "formula": "$500 per EV charging station on load control or time-of-use",
        "evidenceText": "Riverland 2026 EV charger incentive form lists Electric Vehicle Charging Station at $500.",
        "sourceUrlsChecked": [
          "https://www.riverlandenergy.com/sites/default/files/2026-01/2026-incentive-form-ev-chargers_2.pdf",
          "https://www.riverlandenergy.com/electric-vehicles"
        ],
        "reasoningNotes": "Matched Level 2 charging station terms. Confidence is medium because a web page also references a lower charger rebate amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22483",
    "opportunityName": "Alabama Power - Smart Thermostat Reimbursement",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22483/alabama-power-smart-thermostat-reimbursement",
    "websiteUrl": "https://www.alabamapower.com/residential/save-money-and-energy/rebates-and-incentives.html",
    "applicationUrl": "https://apcsmartthermostat.customerapplication.com/",
    "administrator": "Alabama Power Co",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "AL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Alabama Power"
        ],
        "notes": "Available to qualifying residential Alabama Power electric-service accounts."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an active residential Alabama Power customer.",
        "Thermostat must be new, installed at the Alabama Power service address, and on the qualifying-products list.",
        "Application must be submitted within one year of thermostat purchase.",
        "Proof of purchase must show purchase date, brand, model, amount paid, and payment method.",
        "Homeowner approval is required when the customer is not the owner."
      ],
      "blockers": [
        "Multifamily apartments do not qualify.",
        "Accounts that already received a free thermostat or prior smart thermostat rebate are not eligible.",
        "Taxes, shipping, installation, used equipment, and nonqualifying models are not reimbursed."
      ],
      "programType": "Rebate Program",
      "administrator": "Alabama Power Co",
      "applicationUrl": "https://apcsmartthermostat.customerapplication.com/",
      "websiteUrl": "https://www.alabamapower.com/residential/save-money-and-energy/rebates-and-incentives.html",
      "sourceUrlsChecked": [
        "https://www.alabamapower.com/residential/save-money-and-energy/rebates-and-incentives.html",
        "https://alabamapowermail.com/smartthermostatrebate",
        "https://www.alabamapower.com/content/dam/alabama-power/pdfs-docs/residential/rebates/smart-thermostat-rebate-qualifying-products-list.pdf"
      ],
      "evidenceText": "Alabama Power's rebate page and reimbursement form support an eligible smart thermostat reimbursement for active residential customers using qualifying models.",
      "reasoningNotes": "The smart thermostat match is source-backed and should remain limited to residential Alabama Power customers and qualifying thermostat products."
    },
    "existingSimpleRules": [
      {
        "id": "oir_61ad9e9bbdd6c1da_v1",
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
        "evidenceText": "Electric Vehicle Chargers Smart Thermostat Water Heater Heat Pump Electric Vehicle Charger Rebate Save $500 When You Install a Level 2 Home Charger With the help of our Home Charger Rebate, you're in charge",
        "sourceUrlsChecked": [
          "https://www.alabamapower.com/residential/save-money-and-energy/energy-saving-products/rebates-and-incentives.html"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22633",
    "opportunityName": "Arkansas - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22633/arkansas-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/",
    "applicationUrl": null,
    "administrator": "Arkansas Department of Transportation",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "utilityTerritories": [],
        "notes": "Initial Arkansas NEVI funding is targeted to designated EV Alternative Fuel Corridors and eligible public or commercial-motor-vehicle charging locations."
      },
      "eligibleApplicantTypes": [
        "businesses",
        "registered_utilities",
        "nonprofits",
        "tribal_organizations"
      ],
      "eligibleSectors": [
        "commercial",
        "government",
        "nonprofit",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Project must be directly associated with charging electric vehicles.",
        "Charging infrastructure must be open to the public or to authorized commercial motor vehicle operators from more than one company.",
        "Applicant must meet Arkansas NEVI proposer eligibility requirements.",
        "Projects are reimbursed with federal funds up to the allowed share and require non-federal match.",
        "Projects must meet federal NEVI and ARDOT technical and location requirements."
      ],
      "blockers": [
        "Private residential chargers are not eligible.",
        "Single-company fleet-only charging that is not available to more than one commercial operator is not eligible.",
        "Funding depends on competitive solicitation timing and approved locations."
      ],
      "programType": "Grant Program",
      "administrator": "Arkansas Department of Transportation",
      "applicationUrl": null,
      "websiteUrl": "https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/",
      "sourceUrlsChecked": [
        "https://www.adeq.state.ar.us/energy/opportunities/nevi/",
        "https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/",
        "https://media.ark.org/ardot/ARDOT_EVID_Program_Requirements.pdf",
        "https://media.ark.org/ardot/Submittal-Packet-FY26-EVID-Plan.pdf"
      ],
      "evidenceText": "ARDOT NEVI materials support grants for eligible public EV charging infrastructure, not private home charging.",
      "reasoningNotes": "The EV charging match is correct only for NEVI-compliant public or qualifying commercial charging infrastructure."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b5e633b1b47733ea_v1",
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
          "https://www.adeq.state.ar.us/energy/opportunities/nevi/"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
    "opportunityName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
    "websiteUrl": "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program",
    "applicationUrl": null,
    "administrator": "California Energy Commission and California Department of Transportation",
    "programType": "Competitive EV Infrastructure Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "notes": "California NEVI funding is corridor-focused and supports publicly accessible fast charging along designated routes and eligible sites."
      },
      "eligibleApplicantTypes": [
        "public_entities",
        "private_entities",
        "site_hosts",
        "charging_station_developers"
      ],
      "eligibleSectors": [
        "transportation",
        "commercial",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "public_dc_fast_charging_station"
      ],
      "hardRequirements": [
        "Projects must meet California NEVI solicitation and federal NEVI requirements.",
        "Funding is for publicly accessible high-powered DC fast charging infrastructure.",
        "Applications for the current solicitation must be submitted through the required CEC system by the stated deadline.",
        "Charging sites must satisfy corridor, equipment, uptime, access, and other solicitation requirements."
      ],
      "blockers": [
        "Does not support residential, private-only, or ordinary workplace charging unless it satisfies NEVI public access and site requirements.",
        "Does not fund vehicle purchase.",
        "Applicants must follow the active CEC grant solicitation rather than treating the program as an open rebate."
      ],
      "programType": "Competitive EV Infrastructure Grant",
      "administrator": "California Energy Commission and California Department of Transportation",
      "applicationUrl": null,
      "websiteUrl": "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program",
      "sourceUrlsChecked": [
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
        "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program",
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula"
      ],
      "evidenceText": "California's NEVI solicitation supports publicly accessible high-powered DC fast charging infrastructure under a competitive grant program.",
      "reasoningNotes": "The EV charger installation match is valid, but matching should be limited to public DC fast-charging infrastructure that meets NEVI solicitation requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7db9935fc4322459_v1",
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
          "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant",
    "opportunityName": "Emerging Technologies Grant",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000",
    "administrator": "Silicon Valley Power",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "notes": "Available to qualifying nonresidential Silicon Valley Power electric customers in Santa Clara."
      },
      "eligibleApplicantTypes": [
        "nonresidential_electric_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "custom_energy_efficiency_measure",
        "emerging_energy_efficiency_technology"
      ],
      "hardRequirements": [
        "Applicant must be a nonresidential SVP customer.",
        "Project must be pre-approved before implementation or installation.",
        "Project must demonstrate measurable electricity savings and remain in place for the required term.",
        "Grant is based on energy saved and is capped by project-cost and customer limits.",
        "Measures eligible under other SVP programs are not eligible for this grant."
      ],
      "blockers": [
        "Low-flow fixture retrofit is a false-positive match.",
        "Water conservation fixtures are not supported by the cited energy grant.",
        "Self-generation, cogeneration, fuel switching, power factor correction, and behavior-only projects are excluded.",
        "Standard SVP rebate measures should use the separate applicable rebate program."
      ],
      "programType": "Grant",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000"
      ],
      "evidenceText": "SVP describes the grant for creative energy technologies and new efficiency applications, with funding tied to energy saved and required pre-approval.",
      "reasoningNotes": "The matched word fixture was misleading. This is an electric emerging-efficiency grant, not a water fixture or low-flow plumbing program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_90e7eed9af42cb4e_v1",
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
          "https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000"
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
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
    "opportunityName": "GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging",
    "state": "CA",
    "sourceName": "California Energy Commission",
    "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
    "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
    "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
    "administrator": "California Energy Commission",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "notes": "California NEVI major corridors and eligible community charging locations under Solicitation 6."
      },
      "eligibleApplicantTypes": [],
      "eligibleSectors": [
        "transportation",
        "public_ev_charging",
        "light_duty_ev_charging"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "dc_fast_charging_station",
        "public_ev_charging_infrastructure"
      ],
      "hardRequirements": [
        "Application must be submitted through ECAMS.",
        "Solicitation deadline is October 16, 2026 at 11:59 p.m.",
        "Project must deploy publicly accessible high-powered DC fast charging.",
        "Project must support light-duty EV travel along major corridors.",
        "NEVI station, connector, power, corridor, and federal program requirements apply."
      ],
      "blockers": [
        "Do not match to residential EV chargers.",
        "Do not match to workplace-only or fleet-only Level 2 charging unless allowed by the solicitation.",
        "This is a corridor and community DC fast charging solicitation, not a generic EV charger rebate."
      ],
      "programType": "Grant",
      "administrator": "California Energy Commission",
      "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
      "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
      "sourceUrlsChecked": [
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidenceText": "CEC says GFO-25-603 offers up to $79 million for publicly accessible high-powered DC fast charging stations supporting light-duty EV travel along major corridors.",
      "reasoningNotes": "The EV charging match is source-backed and should be narrowed to NEVI public DC fast charging infrastructure; applicant-type details should be validated against the solicitation manual."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c3f8fb1e89c2c7ca_v1",
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
        "evidenceText": "USDOT NEVI funding guidance lists the federal share of eligible project costs at 80%; CEC NEVI awards remain solicitation- and site-specific.",
        "sourceUrlsChecked": [
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs",
          "https://www.energy.ca.gov/solicitations/2026-03/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula"
        ],
        "reasoningNotes": "Modeled as possible grant money, not deterministic one-time savings, because award selection and approved eligible cost are project-specific.",
        "mapping": null
      }
    ],
    "reviewedNoRule": []
  }
]
