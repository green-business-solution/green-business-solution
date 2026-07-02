You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 44
Targets in this prompt: 861-880 of 984
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
  "batchNumber": 44,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2591"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2817",
    "opportunityName": "Gulf Power - Residential Energy Efficiency Programs",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2817/gulf-power-residential-energy-efficiency-programs",
    "websiteUrl": "https://www.fpl.com/save/lower-my-bill.html?=icidHT6",
    "applicationUrl": null,
    "administrator": "Florida Power & Light",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "air conditioning"
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
          "FL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Florida Power & Light Northwest FL service territory"
        ],
        "notes": "Former Gulf Power residential efficiency offers are now presented under FPL Northwest FL service."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner_replacement",
        "ceiling_insulation_upgrade"
      ],
      "hardRequirements": [
        "Customer must be in the applicable FPL Northwest FL residential service area.",
        "Qualifying air-conditioning systems must meet the current SEER2 threshold and be installed by an FPL-approved participating independent contractor.",
        "Ceiling insulation rebate requires existing insulation below the program R-value threshold and installation by an approved participating independent contractor."
      ],
      "blockers": [
        "Commercial and industrial customers are not eligible for this residential program.",
        "Do not match generic weatherization beyond ceiling insulation.",
        "Demand response, solar, EV, and other FPL offers are separate programs and should not be included in this opportunity."
      ],
      "programType": "Rebate Program",
      "administrator": "Florida Power & Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.fpl.com/save/lower-my-bill.html?=icidHT6",
      "sourceUrlsChecked": [
        "https://www.fpl.com/save/lower-my-bill.html?=icidHT6",
        "https://www.fpl.com/save/programs/ac-rebate.html",
        "https://www.fpl.com/save/resources/ceiling-insulation.html",
        "https://www.fpl.com/save/programs.html"
      ],
      "evidenceText": "FPL]( Northwest FL lists residential instant rebates for a qualifying new A/C system and ceiling insulation, with approved contractor and equipment or R-value requirements.",
      "reasoningNotes": "The air-conditioning and insulation matches are supported, but should be narrowed to central A/C replacement and ceiling insulation rather than broad HVAC or whole-home weatherization."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "FPL page provides general savings guidance but no clear insulation or air-conditioning rebate formula.",
        "sourceUrlsChecked": [
          "https://www.fpl.com/save/lower-my-bill.html?=icidHT6"
        ],
        "reasoningNotes": "No source-backed calculable one-time rule could be selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "envelope_insulation_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3479",
    "opportunityName": "Cedar Falls Utilities - Residential New Construction Program",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3479/cedar-falls-utilities-residential-new-construction-program",
    "websiteUrl": "https://www.cfu.net/save-energy/residential-business/residential-rebates",
    "applicationUrl": "https://www.cfu.net/filesimages/save-energy/Residential-Rebates/2026/2026%20Application%20-%20Insulation%20and%20Air%20Sealing.pdf",
    "administrator": "Cedar Falls Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "IA"
        ],
        "counties": [],
        "cities": [
          "Cedar Falls"
        ],
        "utilityTerritories": [
          "Cedar Falls Utilities"
        ],
        "notes": "Current official materials describe CFU insulation and air sealing rebates, not a current residential new construction rebate."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "commercial_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_insulation"
      ],
      "hardRequirements": [
        "CFU must provide the energy used for heating.",
        "Property must have been built in 2013 or earlier.",
        "CFU preapproval is required before work begins.",
        "Insulation must be installed by an Iowa licensed insulation contractor.",
        "Air sealing rebate requires blower door testing before and after work.",
        "Rebate is limited to eligible conditioned spaces and program cost caps."
      ],
      "blockers": [
        "New construction and properties built after 2013 are not eligible under the current official application.",
        "Batt insulation is not eligible.",
        "Garages, seasonal rooms, and other unconditioned spaces are not eligible.",
        "Do not match HVAC, windows, or unrelated envelope work."
      ],
      "programType": "Rebate",
      "administrator": "Cedar Falls Utilities",
      "applicationUrl": "https://www.cfu.net/filesimages/save-energy/Residential-Rebates/2026/2026%20Application%20-%20Insulation%20and%20Air%20Sealing.pdf",
      "websiteUrl": "https://www.cfu.net/save-energy/residential-business/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.cfu.net/save-energy/residential-business/residential-rebates",
        "https://www.cfu.net/save-energy/residential-rebates/#construction",
        "https://www.cfu.net/filesimages/save-energy/Residential-Rebates/2026/2026%20Application%20-%20Insulation%20and%20Air%20Sealing.pdf"
      ],
      "evidenceText": "The current CFU application supports insulation and air sealing rebates for older CFU-heated properties with preapproval and contractor requirements.",
      "reasoningNotes": "The matched insulation and air sealing categories are supported by current sources, but the opportunity name appears outdated and should not imply new construction eligibility."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CFU new-construction incentives vary by qualification level and construction package.",
        "sourceUrlsChecked": [
          "https://www.cfu.net/save-energy/residential-business/residential-rebates",
          "https://www.cfu.net/filesimages/save-energy/Residential-Rebates/2024/2024%20Future%20Ready%20Homes.pdf"
        ],
        "reasoningNotes": "The available source shows multiple whole-home levels; a single insulation or air-sealing rule was not safely selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "envelope_insulation_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5317",
    "opportunityName": "ComEd - Business Instant Lighting Discounts Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5317/comed-business-instant-lighting-discounts-program",
    "websiteUrl": "https://www.comed.com/WaysToSave/ForYourBusiness/Pages/LightingDiscounts.aspx",
    "applicationUrl": null,
    "administrator": "ComEd",
    "programType": "Instant Discount",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "ComEd electric service territory"
        ],
        "notes": "Limited to eligible ComEd business, commercial, industrial, and public-sector customers in Illinois."
      },
      "eligibleApplicantTypes": [
        "comed_commercial_customer",
        "comed_industrial_customer",
        "comed_public_sector_customer",
        "participating_distributor",
        "energy_efficiency_service_provider"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public_sector",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit"
      ],
      "hardRequirements": [
        "Lighting discounts are delivered through ComEd business instant discount channels and participating distributors.",
        "Products must be eligible lighting products or equipment under the ComEd business energy efficiency program.",
        "Trade allies and distributors must satisfy ComEd Energy Efficiency Service Provider or distributor requirements where applicable."
      ],
      "blockers": [
        "The word fixture refers to lighting fixtures, not plumbing fixtures.",
        "No low-flow fixture, water conservation, or plumbing retrofit is supported by this lighting discount opportunity.",
        "Residential lighting discounts should not be inferred for this business program."
      ],
      "programType": "Instant Discount",
      "administrator": "ComEd",
      "applicationUrl": null,
      "websiteUrl": "https://www.comed.com/WaysToSave/ForYourBusiness/Pages/LightingDiscounts.aspx",
      "sourceUrlsChecked": [
        "https://www.comed.com/WaysToSave/ForYourBusiness/Pages/LightingDiscounts.aspx",
        "https://www.comed.com/cdn/assets/v3/assets/blt3ebb3fed6084be2a/blt0dd576334f989cef/69399b2a685dab31f7bc8caa/2026_ComEd_Application_EESPParticipation_FINAL_2.pdf?branch=prod_alias",
        "https://secure.comed.com/MyAccount/MyBillUsage/Pages/RatesPricing.aspx"
      ],
      "evidenceText": "ComEd current business efficiency materials reference C&I instant discounts and lighting services for participating service providers and distributors.",
      "reasoningNotes": "The original public lighting discount URL was not text-readable, so confidence is medium. Official ComEd current business efficiency materials still support a lighting-only business instant discount match."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "ComEd instant lighting discounts are delivered through market/retail channels and product-specific discounts.",
        "sourceUrlsChecked": [
          "https://www.comed.com/business/smart-ideas/instant-discounts",
          "https://programs.dsireusa.org/system/program/detail/5317"
        ],
        "reasoningNotes": "No direct customer project formula was found; midstream instant discounts should not be treated as a generic upfront project rebate.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "water_sewer_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3879",
    "opportunityName": "Illinois Municipal Electric Agency - Electric Efficiency Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3879/illinois-municipal-electric-agency-electric-efficiency-program",
    "websiteUrl": "https://www.imea.org/Electric%20Efficiency%20Program.html",
    "applicationUrl": "https://www.imea.org/EE%20Incentives.asp",
    "administrator": "Illinois Municipal Electric Agency",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Illinois Municipal Electric Agency member municipal electric systems"
        ],
        "notes": "Limited to eligible customers served by IMEA or an IMEA member municipal electric system in Illinois."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "industrial_customer",
        "public_sector_customer",
        "municipal_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_refrigeration_equipment",
        "compressed_air_efficiency",
        "motor_vfd_for_hvac_pumps_and_motors",
        "custom_electric_efficiency_project"
      ],
      "hardRequirements": [
        "Project must be in Illinois and served by IMEA or an IMEA member municipal electric system.",
        "Commercial, industrial, and public-sector projects require preapproval before work starts.",
        "Project must produce electricity savings through efficiency improvements.",
        "Equipment must remain in place for the required life or program period.",
        "Funding is subject to availability."
      ],
      "blockers": [
        "Do not match repairs or maintenance without qualifying efficiency improvement.",
        "Do not match fuel switching, new generation, or demand-response-only projects.",
        "Do not infer broad residential appliance eligibility from separate municipal residential offerings.",
        "Do not match customers outside IMEA member municipal service territories."
      ],
      "programType": "Rebate",
      "administrator": "Illinois Municipal Electric Agency",
      "applicationUrl": "https://www.imea.org/EE%20Incentives.asp",
      "websiteUrl": "https://www.imea.org/Electric%20Efficiency%20Program.html",
      "sourceUrlsChecked": [
        "https://www.imea.org/Electric%20Efficiency%20Program.html",
        "https://www.imea.org/EE%20Incentives.asp"
      ],
      "evidenceText": "IMEA lists incentives for businesses and public-sector facilities including LED lighting, refrigeration, compressed air, VSDs for HVAC pumps and motors, and custom projects.",
      "reasoningNotes": "Both refrigeration and LED lighting are valid matches for the commercial, industrial, and public-sector program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "IMEA states incentive cannot exceed 75% of project cost and measure applications set specific levels.",
        "sourceUrlsChecked": [
          "https://www.imea.org/Electric%20Efficiency%20Program.html",
          "https://www.imea.org/EE%20Incentives.asp"
        ],
        "reasoningNotes": "A cap alone is not a calculable formula for the refrigeration target; current application table is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5402",
    "opportunityName": "North Shore Gas - Home Energy Jumpstart Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5402/north-shore-gas-home-energy-jumpstart-program",
    "websiteUrl": "https://www.northshoregasdelivery.com/savings/rebates-direct",
    "applicationUrl": "https://www.northshoregasdelivery.com/savings/rebates-direct",
    "administrator": "North Shore Gas",
    "programType": "Direct Install And Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "North Shore Gas residential service territory"
        ],
        "notes": "Delivered with ComEd coordination where electric measures are involved."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters_with_landlord_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_retrofit",
        "programmable_thermostat_retrofit",
        "water_heater_pipe_insulation",
        "low_flow_showerhead_faucet_aerator",
        "weatherstripping_door_sweep",
        "advanced_power_strip"
      ],
      "hardRequirements": [
        "Applicant must be an eligible North Shore Gas residential customer",
        "Home type must meet the program’s residential eligibility rules",
        "Renters need landlord permission where required",
        "Measures are installed or provided through the utility home energy savings process"
      ],
      "blockers": [
        "insulation_upgrade is a false positive for this Jumpstart/direct-install record; broader insulation rebates are separate",
        "Large multifamily and commercial accounts are not covered by this residential program",
        "General HVAC replacement and appliance rebates should not be inferred",
        "Thermostat matching should not imply zoning retrofit work"
      ],
      "programType": "Direct Install And Rebate",
      "administrator": "North Shore Gas",
      "applicationUrl": "https://www.northshoregasdelivery.com/savings/rebates-direct",
      "websiteUrl": "https://www.northshoregasdelivery.com/savings/rebates-direct",
      "sourceUrlsChecked": [
        "https://www.northshoregasdelivery.com/savings/rebates-direct",
        "https://www.northshoregasdelivery.com/savings/rebates",
        "https://www.northshoregasdelivery.com/savings/rebates-residential"
      ],
      "evidenceText": "North Shore Gas describes a residential home energy savings visit with direct-install or discounted products such as programmable or smart thermostats, pipe insulation, aerators, showerheads, door sweeps, and power strips.",
      "reasoningNotes": "Narrow the thermostat category and block broad insulation because insulation is handled through other rebate pathways, not this direct-install opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Home Energy Jumpstart provides assessment/direct-install services, not a clear customer upfront rebate formula.",
        "sourceUrlsChecked": [
          "https://www.northshoregasdelivery.com/savings/home-energy-jumpstart"
        ],
        "reasoningNotes": "Direct-install service programs should not be forced into one-time savings rules.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4454",
    "opportunityName": "Retro-Commissioning (RCx) Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4454/retro-commissioning-rcx-program",
    "websiteUrl": "https://smartenergy.illinois.edu/rcx/",
    "applicationUrl": "https://forms.illinois.edu/sec/6156089",
    "administrator": "EnergySense Resilience Center at the University of Illinois System",
    "programType": "Technical Assistance Assessment",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "air conditioning"
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
          "retro commissioning",
          "retro-commissioning",
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Ameren Illinois"
        ],
        "notes": "EnergySense identifies a path for Ameren Illinois nonresidential facilities and a separate inquiry path for other facilities; eligibility is confirmed through application."
      },
      "eligibleApplicantTypes": [
        "nonresidential_facility_owners",
        "building_operators",
        "businesses",
        "public_facilities",
        "institutional_facilities"
      ],
      "eligibleSectors": [
        "commercial",
        "public",
        "institutional",
        "nonprofit",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "retro_commissioning_study",
        "hvac_system_optimization",
        "building_operations_tune_up",
        "energy_assessment"
      ],
      "hardRequirements": [
        "Facility must be nonresidential and satisfy EnergySense or utility territory eligibility review.",
        "Applicant must submit the EnergySense application or inquiry.",
        "Facility staff, contractors, and operators must support assessment, testing, documentation, and operational review.",
        "Capital improvements or equipment replacements identified by RCx must be implemented separately and are not automatically funded by this opportunity."
      ],
      "blockers": [
        "Do not match high-efficiency HVAC replacement as a direct eligible retrofit for this program.",
        "Do not match residential HVAC replacement or residential commissioning.",
        "Major equipment replacement may be recommended by the study but is not the source-backed incentive category here."
      ],
      "programType": "Technical Assistance Assessment",
      "administrator": "EnergySense Resilience Center at the University of Illinois System",
      "applicationUrl": "https://forms.illinois.edu/sec/6156089",
      "websiteUrl": "https://smartenergy.illinois.edu/rcx/",
      "sourceUrlsChecked": [
        "https://smartenergy.illinois.edu/rcx/",
        "https://forms.illinois.edu/sec/6156089"
      ],
      "evidenceText": "EnergySense describes RCx as a nonresidential facility assessment and operational improvement process focused mainly on HVAC optimization and reports, not a direct HVAC replacement incentive.",
      "reasoningNotes": "The retro-commissioning study match is supported. HVAC replacement should be removed because the program supports assessment and optimization, not direct replacement rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "RCx program is a retro-commissioning/technical assistance program with project-specific awards.",
        "sourceUrlsChecked": [
          "https://smartenergy.illinois.edu/rcx/"
        ],
        "reasoningNotes": "Commissioning services and variable awards should not be forced into a fixed upfront rebate rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5238",
    "opportunityName": "Columbia Gas of Kentucky - Low Income Furnace Replacement Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5238/columbia-gas-of-kentucky-low-income-furnace-replacement-program",
    "websiteUrl": "https://www.columbiagasky.com/energy-efficiency/for-your-home",
    "applicationUrl": null,
    "administrator": "Columbia Gas of Kentucky",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "Columbia Gas of Kentucky"
        ],
        "notes": "Limited to income-eligible Columbia Gas of Kentucky residential natural gas customers."
      },
      "eligibleApplicantTypes": [
        "income_eligible_residential_customer"
      ],
      "eligibleSectors": [
        "residential",
        "low_income"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit"
      ],
      "hardRequirements": [
        "Customer must qualify as income eligible through the program process.",
        "Existing furnace must be old, non-working, or inefficient and replaced with a qualifying high-efficiency model.",
        "Customer should contact the listed Community Action Council channel to determine eligibility."
      ],
      "blockers": [
        "Do not match heat pumps, air conditioners, or generic HVAC replacement outside the furnace replacement program.",
        "Nonresidential customers and customers outside Columbia Gas of Kentucky territory are not supported.",
        "This program is no-cost furnace replacement for qualifying low-income customers, not a broad rebate menu."
      ],
      "programType": "Rebate Program",
      "administrator": "Columbia Gas of Kentucky",
      "applicationUrl": null,
      "websiteUrl": "https://www.columbiagasky.com/energy-efficiency/for-your-home",
      "sourceUrlsChecked": [
        "https://www.columbiagasky.com/energy-efficiency/for-your-home"
      ],
      "evidenceText": "Columbia Gas of Kentucky's residential efficiency page states eligible customers may have an old, non-working, or inefficient furnace replaced with a high-efficiency model at no cost.",
      "reasoningNotes": "Keep high-efficiency furnace replacement only. The broader high-efficiency HVAC category is a false-positive unless narrowed to qualifying furnace replacement."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Columbia Gas describes replacing eligible low-income customers' old or inefficient furnaces at no cost.",
        "sourceUrlsChecked": [
          "https://www.columbiagasky.com/energy-efficiency/for-your-home"
        ],
        "reasoningNotes": "A no-cost service without a published dollar formula should not become a fixed rebate.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22708",
    "opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Optimized EV Charging",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22708/louisville-gas-and-electric-and-kentucky-utilities-optimized-ev-charging",
    "websiteUrl": "https://www.chargingrewards.com/lge-ku-ev/",
    "applicationUrl": "https://www.chargingrewards.com/lge-ku-ev/",
    "administrator": "Louisville Gas and Electric and Kentucky Utilities",
    "programType": "Managed Charging Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "notes": "Available only to qualifying LG&E and KU residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "electric_vehicle_owner_or_lessee"
      ],
      "eligibleSectors": [
        "residential",
        "transportation"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "Customer must be an eligible LG&E or KU participant.",
        "Participant must have a qualifying EV or compatible Level 2 smart charger.",
        "Participant must enroll in optimized charging and allow managed charging events under program terms."
      ],
      "blockers": [
        "This is an EV managed-charging demand response enrollment program, not an EV charger installation rebate.",
        "Do not match automated building demand-response controls.",
        "Do not match make-ready electrical work, charger purchase, or installation unless a separate incentive is verified."
      ],
      "programType": "Managed Charging Program",
      "administrator": "Louisville Gas and Electric and Kentucky Utilities",
      "applicationUrl": "https://www.chargingrewards.com/lge-ku-ev/",
      "websiteUrl": "https://www.chargingrewards.com/lge-ku-ev/",
      "sourceUrlsChecked": [
        "https://www.chargingrewards.com/lge-ku-ev/",
        "https://lge-ku.com/residential/ev",
        "https://programs.dsireusa.org/system/program/detail/22708"
      ],
      "evidenceText": "The program offers enrollment and monthly participation rewards for allowing optimized EV charging of a qualifying vehicle or smart charger. It does not fund charger installation.",
      "reasoningNotes": "Clear both deterministic retrofit matches because no physical retrofit category is directly funded by this opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Optimized EV Charging is an EV charging rewards/control program.",
        "sourceUrlsChecked": [
          "https://www.chargingrewards.com/lge-ku-ev/"
        ],
        "reasoningNotes": "Demand-response term makes this unsuitable for an upfront rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5823",
    "opportunityName": "AEP (SWEPCO) - Louisiana Commercial Solutions Standard Offer Program",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5823/aep-swepco-louisiana-commercial-solutions-standard-offer-program",
    "websiteUrl": "https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/",
    "applicationUrl": "https://swepcola.p3.enertrek.com/Users/Account/Register",
    "administrator": "SWEPCO",
    "programType": "Commercial Standard Offer Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "SWEPCO Louisiana"
        ],
        "notes": "Limited to eligible nonresidential facilities with SWEPCO Louisiana electric distribution service."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "project_sponsors",
        "market_actors",
        "escos",
        "contractors"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "hvac_vrf_or_heat_pump",
        "hvac_air_conditioning_upgrade",
        "smart_thermostat",
        "heat_pump_water_heater",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls",
        "commercial_kitchen_equipment",
        "low_flow_pre_rinse_spray_valve",
        "compressed_air_system",
        "variable_frequency_drive",
        "demand_controlled_ventilation",
        "ecm_motor",
        "level_2_ev_charger_installation",
        "high_frequency_battery_charger",
        "hvac_tune_up",
        "custom_electric_efficiency"
      ],
      "hardRequirements": [
        "Facility must have nonresidential SWEPCO Louisiana electric distribution service.",
        "Measures must reduce electric energy consumption and summer daytime peak demand.",
        "Project Sponsor or Market Actor must register and obtain pre-approval before project installation.",
        "Required agreements, W-9, equipment surveys, certifications, specifications, invoices, and photos must be submitted.",
        "Program operates within 2026 program dates, budget, and sponsor incentive limits."
      ],
      "blockers": [
        "Self-generation, cogeneration, no-capital behavior changes, negative environmental or health impacts, fuel-switching to electric, and projects already receiving another SWEPCO incentive are excluded.",
        "Residential measures are separate SWEPCO programs and should not match this commercial standard offer.",
        "Pre-rinse spray valves are product-specific commercial kitchen measures and should not be generalized to broad plumbing retrofits."
      ],
      "programType": "Commercial Standard Offer Rebate",
      "administrator": "SWEPCO",
      "applicationUrl": "https://swepcola.p3.enertrek.com/Users/Account/Register",
      "websiteUrl": "https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/",
      "sourceUrlsChecked": [
        "https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/",
        "https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Large-Commercial-Overview-1.pdf",
        "https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Small-Commercial-Solutions-Overview-1.pdf",
        "https://swepcola.p3.enertrek.com/Users/Account/Register"
      ],
      "evidenceText": "SWEPCO's 2026 CSOL materials list nonresidential lighting, HVAC, refrigeration, kitchen, EV charging, compressed air, VFD, and custom electric efficiency measures.",
      "reasoningNotes": "The supplied HVAC and LED matches are supported, and current official materials also support refrigeration and other specific nonresidential electric measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SWEPCO Louisiana business savings source did not expose a clear HVAC per-unit rebate formula.",
        "sourceUrlsChecked": [
          "https://www.swepco.com/savings/business/louisiana"
        ],
        "reasoningNotes": "Standard offer/custom incentives need project-specific savings and contractor details.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22325",
    "opportunityName": "Eversource - Commercial Electric Vehicle Charging Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22325/eversource-commercial-electric-vehicle-charging-program",
    "websiteUrl": "https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates",
    "applicationUrl": "https://eversourcemaevprogram.powerclerk.com/",
    "administrator": "Eversource",
    "programType": "Commercial EV Charging Rebate And Make Ready",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
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
        "utilityTerritories": [
          "Eversource"
        ],
        "notes": "Applies to eligible Massachusetts business EV charging projects in Eversource electric service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customers",
        "business_customers",
        "multifamily_property_owners",
        "fleet_operators",
        "public_charging_site_hosts"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "public_sector",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "ev_make_ready_electrical_upgrade"
      ],
      "hardRequirements": [
        "Applicant must complete required Eversource application and preapproval process before installation.",
        "Applicant must apply for applicable MassEVIP and other eligible third-party state or federal funding.",
        "Charging equipment must be from Eversource-qualified lists or otherwise meet program requirements.",
        "Final project approval, interconnection, and documentation are required before payment."
      ],
      "blockers": [
        "Residential single-family charger rebates are a separate Eversource or Mass Save pathway.",
        "General electrical upgrades unrelated to EV charging should not match.",
        "Energy efficiency, solar, and battery storage are separate program areas."
      ],
      "programType": "Commercial EV Charging Rebate And Make Ready",
      "administrator": "Eversource",
      "applicationUrl": "https://eversourcemaevprogram.powerclerk.com/",
      "websiteUrl": "https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates",
      "sourceUrlsChecked": [
        "https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates",
        "https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates/massachusetts-ev-charging-rebates-process",
        "https://eversourcemaevprogram.powerclerk.com/"
      ],
      "evidenceText": "Eversource Massachusetts business EV program supports charging station rebates and make-ready infrastructure through a PowerClerk application and preapproval process.",
      "reasoningNotes": "The EVSE and make-ready matches are valid; the record should remain nonresidential and EV-specific."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Eversource commercial EV charging rebates are make-ready/project-specific and vary by state, site and charger type.",
        "sourceUrlsChecked": [
          "https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates",
          "https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates/massachusetts-ev-charging-rebates-process"
        ],
        "reasoningNotes": "No reusable upfront formula was verified for arbitrary MA commercial EVSE projects.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22548",
    "opportunityName": "Eversource Residential EV Charging Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22548/eversource-residential-ev-charging-program",
    "websiteUrl": "https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ema",
    "applicationUrl": "https://eversource.dsmcentral.com/",
    "administrator": "Eversource",
    "programType": "Residential EV Charger Rebate And Make Ready",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "Eversource"
        ],
        "notes": "Massachusetts residential Eversource territory, including eligible single-family and small multifamily situations under current rules."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners",
        "discount_rate_customers",
        "environmental_justice_customers",
        "small_multifamily_customers"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_make_ready_wiring_panel_upgrade",
        "managed_ev_charging_enrollment"
      ],
      "hardRequirements": [
        "Customer must be an eligible Eversource Massachusetts residential customer.",
        "Eligible charger must be a qualifying Wi-Fi compatible Level 2 smart charger where charger equipment is rebated.",
        "Wiring and panel work must support a 240V Level 2 charging installation.",
        "Customers receiving charger or wiring rebates must enroll in managed charging under current rules.",
        "Applications and supporting documents must be submitted through the program portal."
      ],
      "blockers": [
        "Commercial, fleet, workplace, and 5+ unit multifamily charging are separate business programs.",
        "General panel upgrades unrelated to EV charging should not match.",
        "Level 1 charging and non-qualified chargers are not supported."
      ],
      "programType": "Residential EV Charger Rebate And Make Ready",
      "administrator": "Eversource",
      "applicationUrl": "https://eversource.dsmcentral.com/",
      "websiteUrl": "https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ema",
      "sourceUrlsChecked": [
        "https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ema",
        "https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/wma",
        "https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/ev-charging-equipment",
        "https://eversource.dsmcentral.com/"
      ],
      "evidenceText": "Eversource Massachusetts residential EV charging rebates support qualifying Level 2 smart chargers, wiring or panel upgrades, and managed charging enrollment.",
      "reasoningNotes": "The Level 2 charger match is valid; add make-ready wiring and managed charging limits while excluding commercial charging."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Eversource residential EV charging incentives vary by state and customer program pathway.",
        "sourceUrlsChecked": [
          "https://www.eversource.com/content/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations",
          "https://www.eversource.com/content/residential/save-money-energy/clean-energy-options/electric-vehicles/ev-charger-demand-response"
        ],
        "reasoningNotes": "A clear state-specific upfront Level 2 charger formula was not verified for this DSIRE target.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5189",
    "opportunityName": "Hudson Light & Power - Photovoltaic Incentive Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5189/hudson-light-and-power-photovoltaic-incentive-program",
    "websiteUrl": "https://www.hudsonlight.com/rebates",
    "applicationUrl": null,
    "administrator": "Hudson Light & Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "photovoltaic",
          "pv system"
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
          "shading"
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
        "cities": [
          "Hudson"
        ],
        "utilityTerritories": [
          "Hudson Light & Power electric service territory"
        ],
        "notes": "Municipal utility rebate information is presented for Hudson Light & Power residential and commercial customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "commercial_electric_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "solar_photovoltaic_system",
        "rooftop_solar_pv"
      ],
      "hardRequirements": [
        "Applicant must be a Hudson Light & Power customer.",
        "Solar rebate terms and current funding should be verified with Hudson Light & Power because the current rebate page lists the offer but does not expose detailed terms in readable text."
      ],
      "blockers": [
        "Window film, exterior shading, and building-envelope shading retrofits are not supported by official Hudson Light & Power sources checked.",
        "Do not treat PV shading or solar-site terminology as a building shading retrofit.",
        "Do not include heat pumps or other conservation programs in this photovoltaic incentive record."
      ],
      "programType": "Rebate Program",
      "administrator": "Hudson Light & Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.hudsonlight.com/rebates",
      "sourceUrlsChecked": [
        "https://www.hudsonlight.com/rebates",
        "https://www.hudsonlight.com/residential",
        "https://www.hudsonlight.com/commercial"
      ],
      "evidenceText": "Hudson]( Light & Power’s rebates page lists a Solar Rebate among residential and commercial offerings; checked sources do not support window film or shading retrofits.",
      "reasoningNotes": "The rooftop solar PV match is supported. The window-film or shading match should be removed because the source context is photovoltaic, not building-envelope shading."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Hudson Light solar materials did not expose a current per-watt incentive formula.",
        "sourceUrlsChecked": [
          "https://www.hudsonlight.com/energy-efficiency/solar"
        ],
        "reasoningNotes": "DSIRE-like amounts were not used as final proof without a current official table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22742",
    "opportunityName": "National Grid - Charge Smart MA",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22742/national-grid-charge-smart-ma",
    "websiteUrl": "https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program",
    "applicationUrl": null,
    "administrator": "National Grid",
    "programType": "Performance-Based Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "National Grid Massachusetts electric service territory"
        ],
        "notes": "Residential National Grid Massachusetts electric customers with compatible EV charging located in Massachusetts."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "ev_owner",
        "ev_lessee"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_managed_charging",
        "off_peak_ev_charging"
      ],
      "hardRequirements": [
        "Customer must have a National Grid Massachusetts residential electric account and live in the Massachusetts service area.",
        "Customer must enroll through the Charge Smart MA app with a compatible EV or compatible home charger.",
        "Charging must occur in Massachusetts and during designated off-peak periods to earn per-kWh rebates.",
        "Enrollment and annual incentives depend on current program terms and compatible hardware status.",
        "Customer must maintain online account access and connected vehicle or charger data sharing."
      ],
      "blockers": [
        "This is not a charger installation rebate.",
        "National Grid’s EV Charging Upgrade Program is separate and covers wiring or smart charger upgrades.",
        "Do not match generic Level 2 EV charger installation, commercial fleets, or non-National Grid territories to Charge Smart MA."
      ],
      "programType": "Performance-Based Incentive",
      "administrator": "National Grid",
      "applicationUrl": null,
      "websiteUrl": "https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program",
      "sourceUrlsChecked": [
        "https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program",
        "https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/EV-Charging-Upgrade-Program",
        "https://www.nationalgridus.com/media/pdfs/ma/cm8897-ev-charging-rebate.pdf"
      ],
      "evidenceText": "Charge]( Smart MA pays customers with a compatible EV or charger for off-peak charging through the app; charger upgrades are a separate program.",
      "reasoningNotes": "The Level 2 installation category is a false-positive for this performance incentive. Keep managed/off-peak EV charging only."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "Charge Smart MA is an off-peak charging rewards program with enrollment and annual incentives.",
        "sourceUrlsChecked": [
          "https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program"
        ],
        "reasoningNotes": "Managed charging rewards are recurring/performance bill credits and should not be modeled as upfront one-time savings.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22328",
    "opportunityName": "NextZero EV Charger Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22328/nextzero-ev-charger-program",
    "websiteUrl": "https://nextzero.org/",
    "applicationUrl": "https://rebates.nextzero.org/",
    "administrator": "Massachusetts Municipal Wholesale Electric Company / NextZero",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
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
          "Ashburnham",
          "Belmont",
          "Boylston",
          "Chicopee",
          "Concord",
          "Groton",
          "Hingham",
          "Holyoke",
          "Hull",
          "Ipswich",
          "Mansfield",
          "Marblehead",
          "Paxton",
          "Peabody",
          "Princeton",
          "Reading",
          "Russell",
          "Shrewsbury",
          "South Hadley",
          "Sterling",
          "Templeton",
          "Wakefield",
          "West Boylston"
        ],
        "utilityTerritories": [
          "participating NextZero/MMWEC municipal light plant service territories"
        ],
        "notes": "Town participation and rebate details vary by municipal light plant."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "municipal_light_plant_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Customer must be served by a participating municipal light plant",
        "Eligible smart Level 2 charger required",
        "Enrollment in NextZero scheduled charging or equivalent managed charging required",
        "Charger must remain connected and controllable as required by the local program"
      ],
      "blockers": [
        "Not statewide Massachusetts; investor-owned utility customers are not eligible through this opportunity",
        "Generic EV charger category is too broad; source supports eligible smart Level 2 chargers",
        "Installation labor is generally not the rebated item unless local terms state otherwise",
        "Nonparticipating municipal utilities and DC fast chargers are not supported"
      ],
      "programType": "Rebate",
      "administrator": "Massachusetts Municipal Wholesale Electric Company / NextZero",
      "applicationUrl": "https://rebates.nextzero.org/",
      "websiteUrl": "https://nextzero.org/",
      "sourceUrlsChecked": [
        "https://nextzero.org/",
        "https://nextzero.org/west-boylston/ev-charger-program/",
        "https://rebates.nextzero.org/"
      ],
      "evidenceText": "NextZero municipal light plant pages describe rebates for eligible smart Level 2 chargers, paired with scheduled charging requirements that curtail charging during specified weekday evening hours.",
      "reasoningNotes": "Preserve Level 2 EV charging only and constrain geography to participating municipal light plant customers."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "NextZero EV charger incentive amounts vary by participating municipal light department.",
        "sourceUrlsChecked": [
          "https://nextzero.org/",
          "https://nextzero.org/west-boylston/ev-charger-program/",
          "https://nextzero.org/hingham/ev-charger-program/"
        ],
        "reasoningNotes": "The umbrella program page does not provide a single reusable formula; town-level pages show different EV charger amounts.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22736",
    "opportunityName": "NextZero Residential Battery Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22736/nextzero-residential-battery-rebate-program",
    "websiteUrl": "https://nextzero.org/templeton/battery-program/",
    "applicationUrl": "https://rebates.nextzero.org/",
    "administrator": "Massachusetts Municipal Wholesale Electric Company NextZero",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "battery storage"
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Chicopee Electric Light",
          "Ipswich Electric Light Department",
          "Marblehead Municipal Light Department",
          "Shrewsbury Electric and Cable Operations",
          "Sterling Municipal Light Department",
          "Templeton Municipal Light & Water Plant",
          "Wakefield Municipal Gas and Light Department",
          "West Boylston Municipal Light Plant"
        ],
        "notes": "Battery rebate utility eligibility is narrower than the general NextZero town list; applicants should select a participating municipal utility in the battery application."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Applicant must have residential electric service from a participating municipal utility.",
        "Battery must be a residential behind-the-meter lithium-ion system.",
        "Eligible products are Duracell, Emporia, or Tesla Powerwall, subject to current program approval.",
        "Battery storage capacity must be 7.5 to 20 kWh for the listed NextZero battery rebate.",
        "Applicant must enroll the battery in Connected Homes and share battery capacity for peak events.",
        "Application requires utility account information, recent electric bill, contractor invoice, battery size, inverter size, and battery brand."
      ],
      "blockers": [
        "Do not match HVAC, heat pumps, EV chargers, audits, appliances, or weatherization to this battery-specific record.",
        "Not all towns in the broader NextZero rebate portal are confirmed battery-rebate utility territories.",
        "Commercial and industrial NextZero programs are separate from this residential battery rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Massachusetts Municipal Wholesale Electric Company NextZero",
      "applicationUrl": "https://rebates.nextzero.org/",
      "websiteUrl": "https://nextzero.org/templeton/battery-program/",
      "sourceUrlsChecked": [
        "https://nextzero.org/templeton/battery-program/",
        "https://nextzero.org/shrewsbury/battery-program/battery-program-application/",
        "https://rebates.nextzero.org/",
        "https://www.tesla.com/support/energy/virtual-power-plant/MMWEC"
      ],
      "evidenceText": "NextZero]( offers $100/kWh residential battery rebates for Duracell, Emporia or Tesla Powerwall systems from 7.5 to 20 kWh with Connected Homes enrollment.",
      "reasoningNotes": "Battery storage is supported. The original HVAC category is a false positive for this opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "NextZero battery rebate details vary by municipal light plant.",
        "sourceUrlsChecked": [
          "https://nextzero.org/",
          "https://programs.dsireusa.org/system/program/detail/22736/nextzero-residential-battery-rebate-program"
        ],
        "reasoningNotes": "A town-specific official source is needed.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22323",
    "opportunityName": "Baltimore Gas and Electric - EVsmart Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22323/baltimore-gas-and-electric-evsmart-program",
    "websiteUrl": "https://bge.chooseev.com/",
    "applicationUrl": "https://bge.chooseev.com/promos/",
    "administrator": "Baltimore Gas and Electric",
    "programType": "Rate And Bill Credit Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
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
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Baltimore Gas and Electric"
        ],
        "notes": "Limited to BGE electric customers in Maryland."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_vehicle_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_managed_charging",
        "ev_time_of_use_rate"
      ],
      "hardRequirements": [
        "Applicant must be a BGE residential electric customer.",
        "Customer must enroll in the applicable EVsmart savings, time-of-use, or smart-charge-management program.",
        "Smart charging credits require a compatible EV or eligible Level 2 charger connected through the program platform.",
        "Bill credits, charging behavior, and program participation requirements apply."
      ],
      "blockers": [
        "Current official BGE EVsmart sources do not verify an active Level 2 EV charger installation rebate.",
        "Do not match physical EV charger installation to the current BGE EVsmart bill-credit or rate program.",
        "Maryland Energy Administration EVSE rebates are separate state programs and should not be merged into this BGE opportunity.",
        "Commercial EV charging infrastructure is not supported by the verified current residential BGE EVsmart source."
      ],
      "programType": "Rate And Bill Credit Program",
      "administrator": "Baltimore Gas and Electric",
      "applicationUrl": "https://bge.chooseev.com/promos/",
      "websiteUrl": "https://bge.chooseev.com/",
      "sourceUrlsChecked": [
        "https://bge.chooseev.com/",
        "https://bge.chooseev.com/ev/about/",
        "https://bge.chooseev.com/promos/",
        "https://www.bge.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicles.aspx",
        "https://programs.dsireusa.org/system/program/detail/22323/baltimore-gas-and-electric-evsmart-program"
      ],
      "evidenceText": "Current BGE EVsmart materials describe EV time-of-use and smart charge management savings with bill credits, not a verified active EVSE installation rebate.",
      "reasoningNotes": "Repair away from physical EV charger installation. Keep BGE EVsmart as an active EV charging management and rate program unless a current official installation rebate source becomes readable."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "BGE EVsmart source did not expose a current Level 2 EVSE rebate formula in accessible text.",
        "sourceUrlsChecked": [
          "https://www.bge.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicles.aspx"
        ],
        "reasoningNotes": "No source-backed upfront EVSE rule could be safely created.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "electric_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
    "opportunityName": "Public Charger Grants",
    "state": "ME",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22783/public-charger-grants",
    "websiteUrl": "https://www.efficiencymaine.com/opportunities/",
    "applicationUrl": "https://www.efficiencymaine.com/rfp-em-008-2026/",
    "administrator": "Efficiency Maine",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "ME"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Sites must be physically located in Maine; the current RFP prioritizes listed municipalities."
      },
      "eligibleApplicantTypes": [
        "multifamily_property_owners",
        "business_property_owners",
        "public_entities",
        "bidders_with_host_site_agreement"
      ],
      "eligibleSectors": [
        "multifamily",
        "commercial",
        "public"
      ],
      "eligibleRetrofitCategories": [
        "public_level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Current funding opportunity is for public Level 2 EV chargers, not DC fast chargers.",
        "Site must be in Maine and meet RFP location requirements.",
        "Eligible properties include multifamily properties with five or more units, business properties, and public properties.",
        "Applicant must be the site owner or have a host-site agreement allowing public charging for at least five years.",
        "Projects must install new networked Level 2 equipment with at least four ports per site and meet RFP technical requirements."
      ],
      "blockers": [
        "Do not match dc_fast_charger_installation for the current opportunity; DC fast-charger phases shown by Efficiency Maine are awarded or completed.",
        "Private home chargers, Airbnbs or vacation properties, non-public multi-unit charging, PreK-12 schools, vehicle dealerships, replacements, and EVSE sellers or installers are ineligible under the current RFP.",
        "Fleet-only or non-public charging should not match this public charger grant."
      ],
      "programType": "Grant Program",
      "administrator": "Efficiency Maine",
      "applicationUrl": "https://www.efficiencymaine.com/rfp-em-008-2026/",
      "websiteUrl": "https://www.efficiencymaine.com/opportunities/",
      "sourceUrlsChecked": [
        "https://www.efficiencymaine.com/opportunities/",
        "https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/",
        "https://www.efficiencymaine.com/rfp-em-008-2026/",
        "https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf"
      ],
      "evidenceText": "Current Efficiency Maine opportunities list Public Level 2 EV Chargers, while DC fast-charger phases are awarded. The RFP funds public Level 2 sites in Maine.",
      "reasoningNotes": "The general EV charger category is valid only when narrowed to current public Level 2 charging. DCFC is a stale or separate award phase and should be blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Efficiency Maine public charger grants are solicitation-based and depend on charger site and funding round.",
        "sourceUrlsChecked": [
          "https://www.efficiencymaine.com/opportunities/",
          "https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/"
        ],
        "reasoningNotes": "No reusable DC fast charger grant formula was verified for arbitrary projects.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22362",
    "opportunityName": "East Central Energy - Electric Vehicle Charging Station Rebate",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22362/east-central-energy-electric-vehicle-charging-station-rebate",
    "websiteUrl": "https://www.eastcentralenergy.com/electric-vehicle-charger-rebate",
    "applicationUrl": null,
    "administrator": "East Central Energy",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
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
          "MN",
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "East Central Energy service territory"
        ],
        "notes": "East Central Energy serves members in Minnesota and Wisconsin; this target should be limited to eligible ECE residential members."
      },
      "eligibleApplicantTypes": [
        "east_central_energy_residential_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "metered_level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Member must install a Level 2 EV charger.",
        "Member must participate in a qualifying off-peak or time-of-use charging program.",
        "Program requires member verification of rebate details with East Central Energy before purchase or installation.",
        "Metering requirements apply under the off-peak charging program."
      ],
      "blockers": [
        "Public charging, fleet charging, and commercial charging stations are not supported by the residential rebate page.",
        "A charger installation that is not enrolled in the required off-peak program should not match.",
        "This is not an EV purchase incentive."
      ],
      "programType": "Rebate",
      "administrator": "East Central Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.eastcentralenergy.com/electric-vehicle-charger-rebate",
      "sourceUrlsChecked": [
        "https://www.eastcentralenergy.com/electric-vehicle-charger-rebate",
        "https://www.eastcentralenergy.com/residential-rebates"
      ],
      "evidenceText": "East Central Energy's current page describes a rebate for installing a Level 2 EV charger and requires off-peak program participation.",
      "reasoningNotes": "Confidence is medium because the current HTML is concise; the official page still supports a residential metered Level 2 EV charging category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "East Central Energy EV charger rebate amount was not verified from a current official source in accessible text.",
        "sourceUrlsChecked": [
          "https://eastcentralenergy.com/rebates-residential",
          "https://eastcentralenergy.com/electric-vehicles"
        ],
        "reasoningNotes": "No source-backed Level 2 charger amount was safely selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1528",
    "opportunityName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Grant Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1528/otter-tail-power-company-commercial-and-industrial-energy-efficiency-grant-program",
    "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/",
    "applicationUrl": null,
    "administrator": "Otter Tail Power Company",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "MN",
          "ND",
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Otter Tail Power Company electric service territory"
        ],
        "notes": "Official custom-grants page exposes Minnesota, North Dakota and South Dakota options; target DSIRE record is Minnesota, but matching should remain within Otter Tail Power business electric territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "custom_energy_efficiency",
        "compressed_air_efficiency",
        "chiller_replacement",
        "large_adjustable_speed_drive",
        "process_efficiency_improvement",
        "commercial_lighting_retrofit",
        "large_motor_efficiency",
        "commercial_refrigeration_efficiency",
        "commercial_electric_cooking_equipment",
        "building_envelope_improvements",
        "waste_heat_recovery"
      ],
      "hardRequirements": [
        "Applicant must be an Otter Tail Power business customer with an eligible energy-saving project.",
        "Customer must submit a custom energy-savings proposal and work with an Energy Management Representative.",
        "Preapproval is required before proceeding with the custom grant plan.",
        "Measures must be completed within the approved timeline, generally within six months of approval.",
        "Measurement and verification of actual savings may be required.",
        "Grant amounts are calculated from kWh saved, demand reduced, and project costs and may not exceed program cost caps."
      ],
      "blockers": [
        "Some proposals may be redirected to existing rebate programs rather than custom grants.",
        "Do not match broad HVAC replacement unless the project is a preapproved chiller, heat-recovery, or other custom efficiency measure.",
        "Do not match residential rebates or non-Otter Tail service territory projects."
      ],
      "programType": "Grant Program",
      "administrator": "Otter Tail Power Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/",
      "sourceUrlsChecked": [
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/",
        "https://www.otpco.com/rebates-and-efficiency-programs/business/programs/",
        "https://www.otpco.com/media/pv4pgqyt/2025-program-and-services-guide_final.pdf",
        "https://www.otpco.com/rebates-and-efficiency-programs/topics/heating-and-cooling/heat-recovery-air-exchangers/"
      ],
      "evidenceText": "Otter]( Tail custom grants cover business energy-saving proposals including compressed air, chillers, drives, process, lighting, motors, refrigeration, electric cooking, envelope and heat recovery.",
      "reasoningNotes": "Waste heat recovery is supportable only as a custom/preapproved measure. Generic HVAC replacement should be narrowed to custom or specific equipment."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Otter Tail Power describes custom efficiency grants based on customer proposals but does not publish a reusable heat-recovery grant formula.",
        "sourceUrlsChecked": [
          "https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/",
          "https://programs.dsireusa.org/system/program/detail/1528/otter-tail-power-company-commercial-industrial-energy-efficiency-grant-program"
        ],
        "reasoningNotes": "Custom proposal programs require project review and cannot be safely encoded from a cap or example list alone.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1948",
    "opportunityName": "Shakopee Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1948/shakopee-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://shakopeeutilities.com/2026-commercial-rebates/",
    "applicationUrl": "https://shakopeeutilities.com/2026-commercial-rebates/",
    "administrator": "Shakopee Public Utilities",
    "programType": "Commercial And Industrial Electric Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 2,
    "targetKind": "reviewed_no_rule_reclassification",
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Shakopee"
        ],
        "utilityTerritories": [
          "Shakopee Public Utilities"
        ],
        "notes": "Limited to Shakopee Public Utilities commercial and industrial electric customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "vendors_on_behalf_of_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_custom_electric_efficiency",
        "led_lighting_retrofit",
        "commercial_electric_hvac_efficiency"
      ],
      "hardRequirements": [
        "Project must produce annualized kWh savings.",
        "All commercial and industrial rebates are submitted online.",
        "Rebate is capped at 40 percent of project cost.",
        "Project completion must meet the stated calendar-year or 12-month completion rules.",
        "Funding is limited and subject to utility approval."
      ],
      "blockers": [
        "Do not match residential measures.",
        "Do not match projects without measurable electric kWh savings.",
        "Do not treat the program as a fixed prescriptive rebate for every HVAC or lighting product without SPU approval."
      ],
      "programType": "Commercial And Industrial Electric Efficiency Rebate",
      "administrator": "Shakopee Public Utilities",
      "applicationUrl": "https://shakopeeutilities.com/2026-commercial-rebates/",
      "websiteUrl": "https://shakopeeutilities.com/2026-commercial-rebates/",
      "sourceUrlsChecked": [
        "https://shakopeeutilities.com/2026-commercial-rebates/"
      ],
      "evidenceText": "SPU]( states commercial and industrial rebates are online, based on annualized kWh savings, capped at 40 percent of project cost, and subject to limited funding.",
      "reasoningNotes": "Current official content supports C&I electric efficiency generally. LED and HVAC should remain only as electric kWh-saving C&I measures, not residential or fuel-switching measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "The checked official 2024 commercial rebate URL returned 404.",
        "sourceUrlsChecked": [
          "https://shakopeeutilities.com/business/2024-commercial-rebates/"
        ],
        "reasoningNotes": "No current official measure table was accessible.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
