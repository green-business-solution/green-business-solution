You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 49
Targets in this prompt: 961-980 of 984
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
  "batchNumber": 49,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2813"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:421",
    "opportunityName": "Ashland Electric Utility - Photovoltaic Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/421/ashland-electric-utility-photovoltaic-rebate-program",
    "websiteUrl": "https://ashlandoregon.gov/589/Solar",
    "applicationUrl": "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81",
    "administrator": "Ashland Electric Utilities Department",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "photovoltaic"
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
        "counties": [
          "Jackson County"
        ],
        "cities": [
          "Ashland"
        ],
        "utilityTerritories": [
          "Ashland Municipal Electric Utility"
        ],
        "notes": "Available within the City of Ashland electric utility service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "business_customers",
        "property_owners",
        "tenants_with_owner_consent"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system"
      ],
      "hardRequirements": [
        "Solar electric system must be interconnected to Ashland electric service and net-metered.",
        "System must include at least 2,500 watts of panels with required solar access.",
        "Required city permits, inspections, application, purchase agreement, roof plan, and invoice documentation must be submitted.",
        "Owner of the system must own or be a tenant of the facility where the system is installed."
      ],
      "blockers": [
        "Systems installed outside Ashland electric service territory do not qualify.",
        "Solar thermal, battery storage, and non-PV measures are not supported by this PV rebate.",
        "Systems removed or inactive before the required operating period may trigger repayment."
      ],
      "programType": "Rebate Program",
      "administrator": "Ashland Electric Utilities Department",
      "applicationUrl": "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81",
      "websiteUrl": "https://ashlandoregon.gov/589/Solar",
      "sourceUrlsChecked": [
        "https://ashlandoregon.gov/589/Solar",
        "https://ashlandoregon.gov/DocumentCenter/View/1749/RE-Application-Compliance-form-1",
        "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81",
        "https://ashlandoregon.gov/DocumentCenter/View/1746/Electric_Power_Purchase_Agreement_2019"
      ],
      "evidenceText": "Ashland's solar page and application materials support a city electric utility incentive for new grid-connected solar electric systems.",
      "reasoningNotes": "The photovoltaic match is source-backed; the category is broadened from rooftop-only to solar PV because official materials allow solar electric systems generally."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Ashland solar page confirms PV incentives but does not show a current per-watt amount in accessible text.",
        "sourceUrlsChecked": [
          "https://ashlandoregon.gov/589/Solar"
        ],
        "reasoningNotes": "Third-party sources mention amounts, but no official current formula was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22563",
    "opportunityName": "Making Solar Equitable Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22563/making-solar-equitable-program",
    "websiteUrl": "https://www.energytrust.org/incentives/making-solar-equitable/#tab-two",
    "applicationUrl": null,
    "administrator": "Energy Trust of Oregon",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
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
          "Portland General Electric",
          "Pacific Power"
        ],
        "notes": "Energy Trust offers apply in participating Oregon electric utility territory; some equity offers are limited to qualifying affordable housing, nonprofit, tribal, or community-serving business customers."
      },
      "eligibleApplicantTypes": [
        "affordable_housing_provider",
        "nonprofit",
        "tribal_government",
        "community_serving_business",
        "commercial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily_affordable_housing",
        "nonprofit",
        "tribal"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "solar_photovoltaic_system",
        "solar_feasibility_study",
        "battery_storage_feasibility_study"
      ],
      "hardRequirements": [
        "Project must be served by a participating Oregon electric utility, generally Portland General Electric or Pacific Power.",
        "Customer and site must meet Energy Trust eligibility and equity-program participation requirements.",
        "Battery storage incentives must be tied to eligible solar-plus-storage or qualifying battery-storage offers, not general backup generator work."
      ],
      "blockers": [
        "Do not match to general HVAC, weatherization, lighting, appliance, or non-solar energy efficiency measures.",
        "Do not match battery storage unless the current Energy Trust offer specifically supports battery storage or battery storage development assistance.",
        "Do not match outside Energy Trust participating utility service territory."
      ],
      "programType": "Rebate Program",
      "administrator": "Energy Trust of Oregon",
      "applicationUrl": null,
      "websiteUrl": "https://www.energytrust.org/incentives/making-solar-equitable/#tab-two",
      "sourceUrlsChecked": [
        "https://www.energytrust.org/incentives/making-solar-equitable/#tab-two",
        "https://insider.energytrust.org/programs/solar-for-businesses/",
        "https://insider.energytrust.org/programs/battery-storage-for-businesses/",
        "https://insider.energytrust.org/programs/solar-battery-development-assistance/"
      ],
      "evidenceText": "Energy]( Trust official pages describe solar, battery storage, and solar/battery development assistance offers for participating Oregon utility customers, with equity-focused offers for qualifying affordable housing, nonprofit, tribal, and community-serving sites.",
      "reasoningNotes": "The deterministic battery-storage match is source-backed only within Energy Trust solar/battery equity and development-assistance offers. The record should not be generalized into broad energy efficiency or resilience categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Making Solar Equitable supports income-qualified solar or solar-plus-storage through project-specific pathways.",
        "sourceUrlsChecked": [
          "https://www.energytrust.org/incentives/making-solar-equitable/"
        ],
        "reasoningNotes": "No single supported upfront battery or solar rule was verified for arbitrary projects.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2438",
    "opportunityName": "New Buildings Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2438/new-buildings-program",
    "websiteUrl": "https://insider.energytrust.org/programs/new-buildings/forms-and-resources/",
    "applicationUrl": "https://insider.energytrust.org/programs/new-buildings/forms-and-resources/",
    "administrator": "Energy Trust of Oregon",
    "programType": "Rebate And Technical Assistance Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Portland General Electric",
          "Pacific Power",
          "NW Natural",
          "Cascade Natural Gas",
          "Avista"
        ],
        "notes": "Energy Trust incentives are limited to eligible Oregon customers and projects in participating utility service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_new_construction_customer",
        "multifamily_developer",
        "building_owner",
        "developer",
        "design_team"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "institutional",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "new_construction_energy_efficiency",
        "major_renovation_energy_efficiency",
        "whole_building_energy_modeling",
        "path_to_net_zero",
        "future_ready_building_design",
        "technical_assistance"
      ],
      "hardRequirements": [
        "Project must be a new commercial or multifamily building, major renovation, or qualifying design-stage project.",
        "Project must be in eligible Energy Trust service territory.",
        "Enrollment and project coordination must occur early enough for design assistance or whole-building incentive review.",
        "Payment requires Energy Trust forms, project documentation, and incentive approval."
      ],
      "blockers": [
        "Do not match ordinary existing-building retrofit projects unless they are major renovations under the New Buildings program.",
        "Do not match standalone battery storage; storage incentives are handled through separate Energy Trust solar or storage offers or design integration rules.",
        "Do not match residential appliance or home weatherization programs.",
        "Do not treat technical assistance as a direct equipment rebate."
      ],
      "programType": "Rebate And Technical Assistance Program",
      "administrator": "Energy Trust of Oregon",
      "applicationUrl": "https://insider.energytrust.org/programs/new-buildings/forms-and-resources/",
      "websiteUrl": "https://insider.energytrust.org/programs/new-buildings/forms-and-resources/",
      "sourceUrlsChecked": [
        "https://insider.energytrust.org/programs/new-buildings/forms-and-resources/",
        "https://blog.energytrust.org/energy-trust-releases-request-for-proposals-for-new-buildings-program-management/",
        "https://insider.energytrust.org/wp-content/uploads/Battery_Storage_Incentive_Eligibility_Requirements.pdf"
      ],
      "evidenceText": "Energy]( Trust's New Buildings program is for new commercial and multifamily construction and major renovations, offering design assistance, whole-building incentives and Path to Net Zero support.",
      "reasoningNotes": "The prior battery match should be blocked because battery storage is not a general New Buildings retrofit category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Energy Trust new buildings incentives are project- and design-path specific.",
        "sourceUrlsChecked": [
          "https://www.energytrust.org/commercial/new-buildings/",
          "http://energytrust.org/newbuildings"
        ],
        "reasoningNotes": "The battery/storage target is not supported by a clear current one-time storage rebate formula.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3142",
    "opportunityName": "New Homes Incentive Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3142/new-homes-incentive-program",
    "websiteUrl": "https://insider.energytrust.org/programs/eps-new-homes/eps-for-allies/",
    "applicationUrl": null,
    "administrator": "Energy Trust of Oregon",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "Portland General Electric",
          "Pacific Power",
          "NW Natural",
          "Cascade Natural Gas",
          "Avista"
        ],
        "notes": "Energy Trust EPS New Homes applies to eligible newly built homes in Oregon served by participating electric or gas utilities."
      },
      "eligibleApplicantTypes": [
        "home_builder",
        "developer",
        "trade_ally",
        "home_energy_verifier"
      ],
      "eligibleSectors": [
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "new_home_energy_performance",
        "energy_modeling_compliance",
        "early_design_assistance",
        "solar_ready_new_construction",
        "solar_storage_ready_new_construction",
        "solar_photovoltaic_system",
        "battery_storage_system",
        "ev_ready_new_construction"
      ],
      "hardRequirements": [
        "Home must be new construction in eligible Oregon participating utility territory.",
        "Home must meet EPS New Homes requirements, including performance at least 5 percent better than a typical newly built Oregon home or applicable higher incentive thresholds.",
        "Projects must use Energy Trust-approved trade ally, verifier, modeling, and program participation processes."
      ],
      "blockers": [
        "Do not match as an existing-home insulation retrofit; insulation is only relevant as part of whole-home new construction performance.",
        "Do not match stand-alone HVAC, windows, or weatherization replacements in existing buildings.",
        "Do not match outside Energy Trust participating utility territory."
      ],
      "programType": "Rebate Program",
      "administrator": "Energy Trust of Oregon",
      "applicationUrl": null,
      "websiteUrl": "https://insider.energytrust.org/programs/eps-new-homes/eps-for-allies/",
      "sourceUrlsChecked": [
        "https://insider.energytrust.org/programs/eps-new-homes/",
        "https://insider.energytrust.org/programs/eps-new-homes/overview/",
        "https://insider.energytrust.org/programs/eps-new-homes/eps-for-allies/",
        "https://insider.energytrust.org/epstm-new-homes-incentives-are-increasing/?the-program=eps-new-homes"
      ],
      "evidenceText": "Energy]( Trust EPS New Homes materials describe incentives for eligible newly built Oregon homes that exceed typical new-home efficiency, with options including early design assistance, solar, storage, and EV-ready elements.",
      "reasoningNotes": "The original insulation retrofit match is a false positive. This is a new construction performance incentive, not an existing-building insulation program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Energy Trust new homes incentives are project/design-path specific and no solar PV per-kW formula was verified.",
        "sourceUrlsChecked": [
          "https://www.energytrust.org/residential/new-homes/",
          "https://www.energytrust.org/incentives/"
        ],
        "reasoningNotes": "Target maps to solar offset but source is new-home efficiency support rather than a clear solar rebate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2187",
    "opportunityName": "Tillamook County PUD - Dairy Lighting Retrofit Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2187/tillamook-county-pud-dairy-lighting-retrofit-rebate-program",
    "websiteUrl": "https://www.tpud.org/ways-to-save/commercial-dairy-programs/",
    "applicationUrl": null,
    "administrator": "Tillamook People's Utility District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "counties": [
          "Tillamook County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Tillamook People's Utility District"
        ],
        "notes": "Limited to Tillamook PUD agricultural, commercial, and industrial members with eligible existing lighting systems."
      },
      "eligibleApplicantTypes": [
        "agricultural_customer",
        "commercial_customer",
        "industrial_customer",
        "utility_member"
      ],
      "eligibleSectors": [
        "agricultural",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "dairy_lighting_retrofit",
        "led_lighting_retrofit",
        "lighting_controls"
      ],
      "hardRequirements": [
        "Customer must be a Tillamook PUD member in the eligible customer classes.",
        "Lighting retrofit must be for an eligible existing barn or facility.",
        "Customer must contact the Energy Services Office before implementation.",
        "Measures must meet Tillamook PUD specifications.",
        "New construction is not eligible under the DSIRE-derived program summary."
      ],
      "blockers": [
        "Energy audit alone is not the funded retrofit; the audit is used to calculate lighting savings and rebate amount.",
        "Do not match to general audits_studies_planning without a lighting retrofit.",
        "Official TPUD page returned 403 in browser access, so details should be reconfirmed before payment."
      ],
      "programType": "Rebate Program",
      "administrator": "Tillamook People's Utility District",
      "applicationUrl": null,
      "websiteUrl": "https://www.tpud.org/ways-to-save/commercial-dairy-programs/",
      "sourceUrlsChecked": [
        "https://www.tpud.org/ways-to-save/commercial-dairy-programs/",
        "https://www.tpud.org/ways-to-save/",
        "https://rebates.energy/or/163/commercial/or74f-tillamook-county-pud-dairy-lighting-retrofit-rebate-program-u2628-commercial/"
      ],
      "evidenceText": "Official]( search results show Tillamook PUD offers commercial, industrial, and agricultural customers cash rebates to upgrade existing lighting systems; third-party DSIRE-derived text describes dairy lighting retrofit requirements.",
      "reasoningNotes": "Repair the deterministic match from energy_audit to lighting retrofit. Confidence is medium because the official program page was blocked by 403, though official snippets and DSIRE-derived text support lighting."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Tillamook PUD commercial/dairy page did not expose a direct dairy lighting rebate amount in checked text.",
        "sourceUrlsChecked": [
          "http://www.tpud.org/energy-efficiency/commercial-dairy-programs/"
        ],
        "reasoningNotes": "Target matched audit; audit-only or assessment references should not be forced into an upfront rule.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22376",
    "opportunityName": "Duquesne Light Company - PEV Bill Credit Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22376/duquesne-light-company-pev-bill-credit-program",
    "websiteUrl": "https://duquesnelight.com/energy-money-savings/electric-vehicles",
    "applicationUrl": "https://frontdoor.portal.poweredbyefi.org/initiative/duqpev",
    "administrator": "Duquesne Light Company",
    "programType": "EV Registration Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duquesne Light Company"
        ],
        "notes": "DLC service territory in western Pennsylvania."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "fleet_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "fleet"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "Applicant must be a Duquesne Light customer.",
        "Customer must own, lease, or purchase a qualified plug-in electric vehicle.",
        "Program provides one incentive per qualifying electric vehicle.",
        "Applicant must submit the required application and vehicle documentation.",
        "Current public pages describe a $50 EV Bonus Cash incentive; purchase-date restrictions may apply under the EV guide or portal terms."
      ],
      "blockers": [
        "This bill credit does not fund EV charger installation.",
        "Community Charging and fleet charging assistance are separate Duquesne Light programs and should not be merged into this opportunity.",
        "No building retrofit is supported by this opportunity.",
        "Non-DLC customers are ineligible."
      ],
      "programType": "EV Registration Incentive",
      "administrator": "Duquesne Light Company",
      "applicationUrl": "https://frontdoor.portal.poweredbyefi.org/initiative/duqpev",
      "websiteUrl": "https://duquesnelight.com/energy-money-savings/electric-vehicles",
      "sourceUrlsChecked": [
        "https://duquesnelight.com/energy-money-savings/electric-vehicles",
        "https://duquesnelight.com/energy-money-savings/electric-vehicles/ev-charging",
        "https://frontdoor.portal.poweredbyefi.org/initiative/duqpev",
        "https://duquesnelight.com/energy-money-savings/electric-vehicles/communitycharging",
        "https://duquesnelight.com/energy-money-savings/electric-vehicles/charge-smart-and-save/ev-time-of-use-distribution-rate",
        "https://dlc.chooseev.com/promos/"
      ],
      "evidenceText": "DLC]( describes the program as $50 EV Bonus Cash for customers who let the utility know they own or lease an EV; charger-installation help appears under separate Community Charging and fleet programs.",
      "reasoningNotes": "Remove the EV charger retrofit category. This opportunity is an EV registration or bill-credit style incentive, not a physical retrofit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "Duquesne PEV program is a bill-credit/off-peak charging program rather than an upfront charger rebate.",
        "sourceUrlsChecked": [
          "https://www.duquesnelight.com/energy-money-savings/electric-vehicles",
          "https://programs.dsireusa.org/system/program/detail/22376"
        ],
        "reasoningNotes": "Recurring EV bill credits should not be forced into a one-time rule.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4594",
    "opportunityName": "AEP (Central and SWEPCO) - Coolsaver A/C Tune Up or Replacement",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4594/aep-central-and-swepco-coolsaver-a-c-tune-up-or-replacement",
    "websiteUrl": "https://aeptexasefficiency.com/#/commercial/coolsaver",
    "applicationUrl": null,
    "administrator": "AEP Texas and CLEAResult",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "AEP Texas"
        ],
        "notes": "Applies within AEP Texas territory; DSIRE labels Central and SWEPCO should not override the current AEP Texas program manual."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "single_family_homeowner",
        "commercial_customer",
        "hvac_contractor"
      ],
      "eligibleSectors": [
        "residential",
        "single_family",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "hvac_tune_up",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_replacement",
        "airflow_correction",
        "refrigerant_charge_correction",
        "coil_cleaning"
      ],
      "hardRequirements": [
        "Tune-ups apply to residential and commercial AEP Texas customers with eligible air conditioning or heat pump systems up to and including 25 tons.",
        "Residential replacement applies to qualifying single-family systems up to 5 tons.",
        "New replacement equipment must meet published SEER and ENERGY STAR or AHRI matching requirements.",
        "Systems installed within the past year and systems tuned up within the past five years are excluded from tune-up incentives.",
        "Incentives are typically contractor-delivered or invoice-discounted under the program manual."
      ],
      "blockers": [
        "Do not match generic HVAC replacement for non-qualifying equipment.",
        "Do not match weatherization, water heating, motors, or industrial process equipment.",
        "Commercial eligibility is for tune-up measures; replacement incentives are limited by the manual to single-family residential systems."
      ],
      "programType": "Rebate Program",
      "administrator": "AEP Texas and CLEAResult",
      "applicationUrl": null,
      "websiteUrl": "https://aeptexasefficiency.com/#/commercial/coolsaver",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4594/aep-central-and-swepco-coolsaver-a-c-tune-up-or-replacement",
        "https://aeptexasefficiency.com/#/commercial/coolsaver",
        "https://aeptexasefficiency.com/downloads/2025/AEP-TX_CoolSaver_Program%20Manual_2025.pdf?2004="
      ],
      "evidenceText": "The 2025 AEP Texas CoolSaver manual covers AC and heat-pump tune-ups, airflow and refrigerant corrections, and single-family residential replacement incentives for qualifying systems.",
      "reasoningNotes": "The HVAC match is valid but must distinguish tune-up measures from residential replacement and not broaden to all HVAC equipment."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Coolsaver pages describe A/C tune-up or replacement services, but no current customer-facing per-unit rebate formula was verified.",
        "sourceUrlsChecked": [
          "https://www.aeptexasefficiency.com/",
          "https://programs.dsireusa.org/system/program/detail/4594"
        ],
        "reasoningNotes": "No safe one-time rule found; the program is contractor/service-delivery oriented and target lacks measure details.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3972",
    "opportunityName": "Austin Energy - Commercial Solar PV Incentive Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3972/austin-energy-commercial-solar-pv-incentive-program",
    "websiteUrl": "https://austinenergy.com/green-power/solar-solutions/for-business",
    "applicationUrl": null,
    "administrator": "Austin Energy",
    "programType": "Performance Based Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy"
        ],
        "notes": "Available to qualifying commercial Austin Energy electric accounts."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "nonprofits"
      ],
      "eligibleSectors": [
        "commercial",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system"
      ],
      "hardRequirements": [
        "Applicant must have an Austin Energy commercial electric account.",
        "Project must use an Austin Energy participating solar contractor.",
        "Application must be approved before installation or financial commitment.",
        "Third-party power purchase agreements are not allowed.",
        "PBI eligibility and rate level depend on system AC size and program rules."
      ],
      "blockers": [
        "This PBI is not a one-time commercial cash rebate; Austin Energy's commercial CBI is a separate option.",
        "Residential and multifamily solar projects should use their separate Austin Energy programs.",
        "Projects installed before approval are not eligible."
      ],
      "programType": "Performance Based Incentive",
      "administrator": "Austin Energy",
      "applicationUrl": null,
      "websiteUrl": "https://austinenergy.com/green-power/solar-solutions/for-business",
      "sourceUrlsChecked": [
        "https://austinenergy.com/green-power/solar-solutions/for-business",
        "https://austinenergy.com/-/media/Project/Websites/AustinEnergy/Green-Power/Solar/Commercial-PBI-Guidelines.pdf",
        "https://austinenergy.com/about/news/news-releases/2026/Austin-Energy-increases-solar-incentives-for-residential-and-commercial-customers"
      ],
      "evidenceText": "Austin Energy's business solar page supports a commercial solar PBI option with bill credits for on-site solar generation.",
      "reasoningNotes": "The solar PV match is source-backed, but this record should remain distinct from Austin Energy's commercial capacity-based rebate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Current Austin Energy commercial solar materials emphasize Value of Solar/production bill credits rather than an upfront commercial PV rebate.",
        "sourceUrlsChecked": [
          "https://austinenergy.com/green-power/solar-solutions/for-business",
          "https://austinenergy.com/rates/commercial-rates/value-of-solar-rate"
        ],
        "reasoningNotes": "Recurring Value of Solar credits are excluded from one-time savings rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22090",
    "opportunityName": "Austin Energy - Commercial Solar PV Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22090/austin-energy-commercial-solar-pv-rebate-program",
    "websiteUrl": "https://austinenergy.com/green-power/solar-solutions/for-business",
    "applicationUrl": null,
    "administrator": "Austin Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "solar pv",
          "photovoltaic"
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
        "notes": "Available to qualifying commercial Austin Energy electric accounts."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "nonprofits"
      ],
      "eligibleSectors": [
        "commercial",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "solar_pv_system"
      ],
      "hardRequirements": [
        "Applicant must have an Austin Energy commercial electric account.",
        "Project must use an Austin Energy participating solar contractor.",
        "Application and letter of intent must be completed before installation.",
        "Third-party power purchase agreements are not allowed.",
        "System size, customer type, and incentive caps determine CBI amount."
      ],
      "blockers": [
        "This CBI is the upfront commercial incentive, not the performance-based incentive record.",
        "Residential and multifamily solar projects are separate Austin Energy programs.",
        "Projects installed before approval or using nonparticipating contractors are not eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Austin Energy",
      "applicationUrl": null,
      "websiteUrl": "https://austinenergy.com/green-power/solar-solutions/for-business",
      "sourceUrlsChecked": [
        "https://austinenergy.com/green-power/solar-solutions/for-business",
        "https://austinenergy.com/-/media/Project/Websites/AustinEnergy/Green-Power/Solar/Commercial-CBI-Guidelines.pdf",
        "https://austinenergy.com/about/news/news-releases/2026/Austin-Energy-increases-solar-incentives-for-residential-and-commercial-customers"
      ],
      "evidenceText": "Austin Energy's business solar page supports an upfront commercial capacity-based incentive for eligible on-site solar installations.",
      "reasoningNotes": "The solar PV match is source-backed; matching must distinguish this CBI from the separate PBI."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Current Austin Energy commercial solar materials emphasize Value of Solar and production-based bill credits.",
        "sourceUrlsChecked": [
          "https://austinenergy.com/green-power/solar-solutions/for-business",
          "https://austinenergy.com/rates/commercial-rates/value-of-solar-rate",
          "https://programs.dsireusa.org/system/program/detail/22090"
        ],
        "reasoningNotes": "Production credits and value-of-solar bill credits are recurring mechanisms, not upfront one-time rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5744",
    "opportunityName": "CenterPoint Energy Advanced Residential Lighting Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5744/centerpoint-energy-advanced-residential-lighting-program",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/LED-Lighting.aspx?au=res&sa=ho",
    "applicationUrl": "https://centerpointenergytx.clearesult.com/",
    "administrator": "CenterPoint Energy Houston Electric",
    "programType": "Point-Of-Sale Discount Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "CenterPoint Energy Houston Electric"
        ],
        "notes": "Limited to CenterPoint Energy Houston Electric residential electric service area and participating retail or online partners."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "consumer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_led_lamps",
        "residential_led_lighting_discount",
        "energy_star_room_air_conditioner",
        "energy_star_room_air_purifier",
        "pipe_insulation_product",
        "advanced_power_strip"
      ],
      "hardRequirements": [
        "Product must be purchased through a participating partner or eligible online channel.",
        "LED bulbs must be ENERGY STAR certified to receive the lighting discount.",
        "Discount is applied at purchase rather than issued as a conventional post-installation rebate.",
        "Other products are point-of-sale product discounts and should not be generalized to broad equipment retrofits."
      ],
      "blockers": [
        "Do not match commercial LED lighting retrofits.",
        "Do not match whole-building lighting replacement projects.",
        "Room air conditioner discounts are not central HVAC replacement.",
        "Pipe insulation product discounts are not broad plumbing or water-heating retrofits.",
        "Advanced power strips are plug-load products, not building electrical retrofits."
      ],
      "programType": "Point-Of-Sale Discount Program",
      "administrator": "CenterPoint Energy Houston Electric",
      "applicationUrl": "https://centerpointenergytx.clearesult.com/",
      "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/LED-Lighting.aspx?au=res&sa=ho",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/5744/centerpoint-energy-advanced-residential-lighting-program",
        "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/LED-Lighting.aspx?sa=ho&au=res",
        "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/advanced-lighting-program.aspx?au=res&sa=ho",
        "https://centerpointenergytx.clearesult.com/"
      ],
      "evidenceText": "CenterPoint says residential customers can receive instant discounts on ENERGY STAR LED bulbs through participating partners, with additional point-of-sale discounts for selected room AC, air purifier, pipe insulation, and power strip products.",
      "reasoningNotes": "The LED lighting match is valid only as a residential product discount for ENERGY STAR lamps, not a commercial or whole-building lighting retrofit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Advanced residential lighting programs are typically upstream or midstream product discounts, not a customer project rebate formula.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates"
        ],
        "reasoningNotes": "No direct upfront savings-engine rule was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4593",
    "opportunityName": "El Paso Electric Company - SCORE Program for Counties, Municipalities, and Schools",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4593/el-paso-electric-company-score-program-for-counties-municipalities-and-schools",
    "websiteUrl": "https://www.epelectric.com/tx/business/program-manuals-and-guidelines",
    "applicationUrl": null,
    "administrator": "CLEAResult Consulting Company for El Paso Electric",
    "programType": "Rebate And Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "building_benchmarking_compliance",
        "displayName": "Building benchmarking compliance",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "benchmarking"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [
          "El Paso County",
          "Culberson County",
          "Hudspeth County"
        ],
        "cities": [],
        "utilityTerritories": [
          "El Paso Electric Texas service territory"
        ],
        "notes": "Eligibility is limited to qualifying EPE Texas service customers that pay the applicable energy efficiency cost recovery factor."
      },
      "eligibleApplicantTypes": [
        "public_k12_school",
        "higher_education_institution",
        "local_government_customer",
        "municipality",
        "county_government"
      ],
      "eligibleSectors": [
        "education",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "lighting_upgrade",
        "unitary_air_conditioner",
        "unitary_heat_pump",
        "chiller_replacement",
        "cool_roof",
        "window_film",
        "commercial_refrigeration",
        "commercial_kitchen_equipment",
        "variable_frequency_drive",
        "lighting_controls",
        "hvac_controls",
        "energy_performance_benchmarking",
        "energy_master_planning",
        "technical_assistance"
      ],
      "hardRequirements": [
        "Customer facility must be in El Paso Electric's Texas service territory.",
        "Applicant must be a qualifying public school, higher education, county, municipality, or other local government customer.",
        "Customer must pay the Texas energy efficiency cost recovery factor.",
        "Retrofit projects must produce measurable electric demand or energy savings and satisfy program documentation and inspection requirements.",
        "Incentives are subject to available program funding and project completion deadlines."
      ],
      "blockers": [
        "Building benchmarking compliance is a false-positive match; benchmarking is a support service, not a compliance rebate.",
        "Residential projects are not eligible.",
        "Benchmarking and master planning do not by themselves establish an eligible physical retrofit.",
        "The currently linked Texas SCORE manual is older, so current year measure details should be confirmed before payment estimates."
      ],
      "programType": "Rebate And Technical Assistance",
      "administrator": "CLEAResult Consulting Company for El Paso Electric",
      "applicationUrl": null,
      "websiteUrl": "https://www.epelectric.com/tx/business/program-manuals-and-guidelines",
      "sourceUrlsChecked": [
        "https://www.epelectric.com/tx/business/program-manuals-and-guidelines",
        "https://www.epelectric.com/company/regulatory/energy-efficiency-filings",
        "https://www.epelectric.com/el-paso-electric/uploads/2020-epe-score-program-manual-final.pdf",
        "https://www.epelectric.com/el-paso-electric/uploads/energy-efficiency/59166_9_1614919_filed-040126.pdf",
        "https://programs.dsireusa.org/system/program/detail/4593/el-paso-electric-company-score-program-for-counties-municipalities-and-schools"
      ],
      "evidenceText": "EPE Texas SCORE materials support public sector and school efficiency projects with technical assistance, benchmarking, master planning, and incentives for verified efficiency measures.",
      "reasoningNotes": "The deterministic benchmarking match was too broad. Keep benchmarking only as support, and match the opportunity to verified public-sector energy efficiency measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "EPE SCORE is a public-sector efficiency program with benchmarking/support and project-specific measures, not a direct published one-time formula.",
        "sourceUrlsChecked": [
          "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency-programs"
        ],
        "reasoningNotes": "Benchmarking/support alone should not be converted to an upfront rule.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5352",
    "opportunityName": "TXU - Commercial Energy Efficiency Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5352/txu-commercial-energy-efficiency-program",
    "websiteUrl": "https://www.txu.com/business-electricity/medium-large-business/txu-greenback-rebates",
    "applicationUrl": null,
    "administrator": "TXU Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "TXU Energy retail service area"
        ],
        "notes": "Applies to eligible TXU Energy business customers; retail electric availability depends on service area and contract."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "hvac_efficiency_upgrade",
        "building_automation_controls",
        "variable_frequency_drive",
        "efficient_motor_upgrade",
        "production_equipment_efficiency_upgrade",
        "solar_pv_behind_the_meter",
        "wind_generation_behind_the_meter",
        "ev_charging_station",
        "energy_audit"
      ],
      "hardRequirements": [
        "Customer must sign up or renew with a minimum 12-month TXU Energy contract.",
        "Customer must install qualifying energy-efficient upgrades.",
        "Customer must submit required documentation to receive rebate payment.",
        "Terms, conditions, and eligibility requirements apply."
      ],
      "blockers": [
        "This is for TXU business customers, not residential accounts.",
        "Measures must be approved under TXU GreenBack terms and documentation rules.",
        "Do not treat Reduction Rewards or ERCOT Emergency Response Service as the same equipment rebate program."
      ],
      "programType": "Rebate Program",
      "administrator": "TXU Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.txu.com/business-electricity/medium-large-business/txu-greenback-rebates",
      "sourceUrlsChecked": [
        "https://www.txu.com/business-electricity/rewards",
        "https://www.txu.com/business-electricity/medium-large-business/txu-greenback-rebates",
        "https://www.txu.com/business-electricity/medium-large-business/energy-solutions"
      ],
      "evidenceText": "TXU]( GreenBack materials state rebates can fund energy-efficiency projects and list LED lighting, HVAC, controls, solar, wind, EV charging, motors, VFDs, equipment upgrades, and audits.",
      "reasoningNotes": "The led_lighting_retrofit match is source-backed. Additional source-backed business measures are included, with contract and documentation constraints."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "TXU commercial page describes business energy solutions but no direct calculable LED rebate formula was found.",
        "sourceUrlsChecked": [
          "https://www.txu.com/en/business/medium-large-business/business-rewards.aspx"
        ],
        "reasoningNotes": "No safe one-time rule should be created without a measure table or project incentive rate.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
    "opportunityName": "Low Income Home Energy Assistance Program (LIHEAP)",
    "state": "US",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5712/low-income-home-energy-assistance-program-liheap",
    "websiteUrl": "https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap",
    "applicationUrl": null,
    "administrator": "U.S. Department of Health and Human Services, Administration for Children and Families, Office of Community Services",
    "programType": "Federal Assistance / Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "weatherization"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Federal block grant administered by states, territories, tribes, and local agencies; benefits and application windows vary by grantee."
      },
      "eligibleApplicantTypes": [
        "low_income_household"
      ],
      "eligibleSectors": [
        "residential",
        "low_income"
      ],
      "eligibleRetrofitCategories": [
        "utility_bill_assistance",
        "energy_crisis_assistance",
        "home_weatherization",
        "minor_energy_related_home_repairs"
      ],
      "hardRequirements": [
        "Household must meet the applicable state, territory, tribal, or local LIHEAP eligibility rules.",
        "Assistance is administered by local LIHEAP grantees, not directly as a universal federal retrofit rebate.",
        "Weatherization and minor energy-related repairs depend on local grantee program options and funding.",
        "Funding is limited and may be seasonal."
      ],
      "blockers": [
        "Not a commercial or institutional retrofit program.",
        "Weatherization is optional and locally administered; do not assume every LIHEAP application funds physical retrofit work.",
        "LIHEAP should not be matched as a building retrofit rebate where the local grantee only provides bill or crisis assistance."
      ],
      "programType": "Federal Assistance / Grant Program",
      "administrator": "U.S. Department of Health and Human Services, Administration for Children and Families, Office of Community Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap",
      "sourceUrlsChecked": [
        "https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap",
        "https://www.acf.hhs.gov/ocs/fact-sheet/liheap-fact-sheet",
        "https://www.acf.hhs.gov/ocs/programs/liheap/about"
      ],
      "evidenceText": "ACF describes LIHEAP as federally funded assistance for home energy bills, energy crises, weatherization, and minor energy-related home repairs for low-income households.",
      "reasoningNotes": "The weatherization match is conditionally valid but must be flagged as locally administered and not universal across all LIHEAP grantees."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "LIHEAP is a federal low-income home energy bill assistance program, not a direct retrofit rebate formula.",
        "sourceUrlsChecked": [
          "https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap"
        ],
        "reasoningNotes": "Bill assistance and weatherization referrals are outside supported one-time equipment rebate shapes.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:918",
    "opportunityName": "Office of Indian Energy Policy and Programs - Funding Opportunities",
    "state": "US",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/918/office-of-indian-energy-policy-and-programs-funding-opportunities",
    "websiteUrl": "https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities",
    "applicationUrl": "https://ie-exchange.energy.gov/",
    "administrator": "U.S. Department of Energy Office of Indian Energy Policy and Programs",
    "programType": "Tribal Energy Grant And Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "weatherization"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Nationwide for eligible Tribal and Alaska Native applicants, with projects generally located in Indian Country or serving Tribal communities."
      },
      "eligibleApplicantTypes": [
        "federally_recognized_indian_tribe",
        "tribal_entity",
        "alaska_native_regional_corporation",
        "alaska_native_village_corporation",
        "tribal_organization"
      ],
      "eligibleSectors": [
        "tribal_government",
        "community_energy",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "tribal_energy_project_planning",
        "tribal_energy_infrastructure_deployment",
        "energy_efficiency_assessment"
      ],
      "hardRequirements": [
        "Eligibility depends on the currently open DOE Indian Energy funding opportunity or technical assistance pathway.",
        "Competitive awards must satisfy federal FOA requirements, topic areas, deadlines, and Tribal eligibility rules.",
        "Technical assistance requests must be from eligible Tribal or Alaska Native entities."
      ],
      "blockers": [
        "No current official source supports a deterministic match to air_sealing_weatherization as a direct retrofit rebate.",
        "Weatherization may appear only as a possible project component under a broader Tribal energy award or assessment."
      ],
      "programType": "Tribal Energy Grant And Technical Assistance",
      "administrator": "U.S. Department of Energy Office of Indian Energy Policy and Programs",
      "applicationUrl": "https://ie-exchange.energy.gov/",
      "websiteUrl": "https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities",
      "sourceUrlsChecked": [
        "https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities",
        "https://ie-exchange.energy.gov/",
        "https://www.energy.gov/indianenergy/office-indian-energy-policy-and-programs",
        "https://programs.dsireusa.org/system/program/detail/918/office-of-indian-energy-policy-and-programs-funding-opportunities"
      ],
      "evidenceText": "DOE lists current Indian Energy funding and technical assistance for Tribal energy infrastructure, energy planning, project development, and assessments. Current sources do not describe a standalone weatherization rebate.",
      "reasoningNotes": "This opportunity is broad and FOA-dependent. It should not deterministically match a specific building-envelope retrofit without a current FOA measure list."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Office of Indian Energy funding opportunities are competitive solicitations with awards by FOA and project application.",
        "sourceUrlsChecked": [
          "https://www.energy.gov/indianenergy/funding",
          "https://www.energy.gov/indianenergy/office-indian-energy-policy-and-programs"
        ],
        "reasoningNotes": "No generic one-time weatherization grant formula applies across all opportunities.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5725",
    "opportunityName": "Weatherization Assistance Program (WAP)",
    "state": "US",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5725/weatherization-assistance-program-wap",
    "websiteUrl": "https://www.energy.gov/cmei/scep/wap/weatherization-assistance-program",
    "applicationUrl": "https://www.energy.gov/cmei/scep/wap/how-apply-weatherization-assistance",
    "administrator": "U.S. Department of Energy Weatherization Assistance Program",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "weatherization"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Federal WAP is administered by states, territories, tribes, and local weatherization providers."
      },
      "eligibleApplicantTypes": [
        "low_income_household",
        "homeowner",
        "renter"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_repair",
        "energy_audit",
        "weatherization_health_safety_repairs"
      ],
      "hardRequirements": [
        "Household must meet income eligibility requirements used by the administering state or territory.",
        "Applicants generally apply through the state, territory, tribal, or local weatherization provider.",
        "Renters may need landlord permission.",
        "Homes receive an energy audit and cost-effective weatherization work determined by program rules."
      ],
      "blockers": [
        "Do not match commercial or industrial retrofits.",
        "Do not infer renewable energy, EV charging, or appliance rebates unless a state WAP plan specifically supports them.",
        "Measures must be determined through the WAP audit and program rules."
      ],
      "programType": "Grant Program",
      "administrator": "U.S. Department of Energy Weatherization Assistance Program",
      "applicationUrl": "https://www.energy.gov/cmei/scep/wap/how-apply-weatherization-assistance",
      "websiteUrl": "https://www.energy.gov/cmei/scep/wap/weatherization-assistance-program",
      "sourceUrlsChecked": [
        "https://www.energy.gov/cmei/scep/wap/weatherization-assistance-program",
        "https://www.energy.gov/cmei/scep/wap/how-apply-weatherization-assistance"
      ],
      "evidenceText": "DOE states WAP serves eligible low-income households through local providers and uses energy audits to identify cost-effective home weatherization measures.",
      "reasoningNotes": "The weatherization match is source-backed. Categories are limited to residential weatherization, insulation, duct sealing, audit, and related health and safety measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "WAP provides income-qualified weatherization services through agencies rather than a published customer rebate formula.",
        "sourceUrlsChecked": [
          "https://www.energy.gov/scep/wap/weatherization-assistance-program"
        ],
        "reasoningNotes": "No-cost service programs should not be converted into one-time project savings rules.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22621",
    "opportunityName": "U.S. Virgin Islands - VI Battery Energy Storage (VIBES) Rebate Program",
    "state": "VI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22621/u-s-virgin-islands-vi-battery-energy-storage-vibes-rebate-program",
    "websiteUrl": "https://energy.vi.gov/vibes/",
    "applicationUrl": "https://app.smartsheet.com/b/form/01966f3340f77792ac8a5c5eded67e36",
    "administrator": "Virgin Islands Energy Office",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "energy storage"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "VI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Virgin Islands Water and Power Authority"
        ],
        "notes": "Available in the U.S. Virgin Islands for qualifying full-time territory residents with an active WAPA account."
      },
      "eligibleApplicantTypes": [
        "homeowner",
        "business_owner",
        "nonprofit_owner",
        "electric_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Applicant must be a full-time U.S. Virgin Islands resident.",
        "Applicant must own the home, business, or nonprofit facility where the system is installed.",
        "Applicant must provide an active WAPA utility bill.",
        "Battery system must be a new approved grid-interactive battery energy storage system with 3 kWh to 21 kWh capacity.",
        "System must provide automatic whole-home or partial backup through an automatic transfer switch or smart critical load panel.",
        "A DPNR permit is required."
      ],
      "blockers": [
        "Do not match solar photovoltaic installation unless a separate solar incentive applies.",
        "Do not match generators or non-battery backup equipment.",
        "Portable batteries and non-grid-interactive storage are unsupported."
      ],
      "programType": "Rebate Program",
      "administrator": "Virgin Islands Energy Office",
      "applicationUrl": "https://app.smartsheet.com/b/form/01966f3340f77792ac8a5c5eded67e36",
      "websiteUrl": "https://energy.vi.gov/vibes/",
      "sourceUrlsChecked": [
        "https://energy.vi.gov/vibes/",
        "https://app.smartsheet.com/b/form/01966f3340f77792ac8a5c5eded67e36"
      ],
      "evidenceText": "The VIEO VIBES page offers rebates for qualifying automatic battery backup systems up to 21 kWh for eligible homes, businesses, and nonprofits in the territory.",
      "reasoningNotes": "The deterministic battery-storage match is source-backed. Eligibility is limited to approved grid-interactive battery energy storage systems and should not be broadened to solar or generators."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "VIBES battery storage materials use a storage-capacity formula, such as dollars per installed battery kWh.",
        "sourceUrlsChecked": [
          "https://energy.vi.gov/vibes/",
          "https://programs.dsireusa.org/system/program/detail/22621"
        ],
        "reasoningNotes": "The supported rule schema has no battery-storage-kWh source, so this cannot be safely encoded without a new rule shape.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22564",
    "opportunityName": "Green Mountain Power Bring Your Own Device Program",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22564/green-mountain-power-bring-your-own-device-program",
    "websiteUrl": "https://greenmountainpower.com/rebates-programs/home-energy-storage/bring-your-own-device/",
    "applicationUrl": "https://gmp.virtualpeaker.io/",
    "administrator": "Green Mountain Power",
    "programType": "Rebate Demand Response",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "energy storage"
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
        "notes": "Limited to Green Mountain Power customer premises in Vermont."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_system",
        "behind_the_meter_battery_demand_response"
      ],
      "hardRequirements": [
        "Customer must have a compatible home battery system and enroll it for GMP peak-event discharge.",
        "Customer must maintain internet connectivity and allow GMP dispatch under the BYOD agreement.",
        "Battery must be used for home backup power and program purposes at the enrolled premises."
      ],
      "blockers": [
        "Not a stand-alone solar PV incentive.",
        "Do not match to generic batteries outside GMP territory or to systems that cannot be controlled for GMP peak events."
      ],
      "programType": "Rebate Demand Response",
      "administrator": "Green Mountain Power",
      "applicationUrl": "https://gmp.virtualpeaker.io/",
      "websiteUrl": "https://greenmountainpower.com/rebates-programs/home-energy-storage/bring-your-own-device/",
      "sourceUrlsChecked": [
        "https://greenmountainpower.com/rebates-programs/home-energy-storage/bring-your-own-device/",
        "https://greenmountainpower.com/rebates-programs/home-energy-storage/bring-your-own-device/battery-systems/",
        "https://gmp.virtualpeaker.io/"
      ],
      "evidenceText": "GMP BYOD offers battery rebates for customers who share stored energy during peak events; eligible home battery systems and incentive rates are listed.",
      "reasoningNotes": "The battery-storage match is source-backed. Added demand-response limitation because the rebate is tied to GMP control of enrolled behind-the-meter batteries."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "GMP BYOD pays for sharing stored energy during peak events using battery storage.",
        "sourceUrlsChecked": [
          "https://greenmountainpower.com/rebates-programs/home-energy-storage/bring-your-own-device/"
        ],
        "reasoningNotes": "Battery dispatch demand-response payments are not upfront equipment rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22346",
    "opportunityName": "Vermont Electric Coop - Electric Forklift Bill Credit",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22346/vermont-electric-coop-electric-forklift-bill-credit",
    "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
    "applicationUrl": "https://eternityweb.formstack.com/forms/vermont_electric_forklift",
    "administrator": "Vermont Electric Cooperative",
    "programType": "Bill Credit",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "Vermont Electric Cooperative"
        ],
        "notes": "Available to Vermont Electric Cooperative members in the cooperative service territory."
      },
      "eligibleApplicantTypes": [
        "member_customer",
        "business_customer",
        "farm_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "agricultural",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "electric_forklift_material_handling"
      ],
      "hardRequirements": [
        "Applicant must be a Vermont Electric Cooperative member.",
        "Forklift may be new or used.",
        "Forklift must be used for a new application or directly replace a fossil-fuel-powered forklift.",
        "Incentive is provided as a bill credit."
      ],
      "blockers": [
        "Do not match passenger EV purchase incentives.",
        "Do not match EV charging infrastructure unless separately supported.",
        "Do not broaden to all material-handling equipment beyond electric forklifts."
      ],
      "programType": "Bill Credit",
      "administrator": "Vermont Electric Cooperative",
      "applicationUrl": "https://eternityweb.formstack.com/forms/vermont_electric_forklift",
      "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
      "sourceUrlsChecked": [
        "https://vermontelectric.coop/energy-transformation-programs",
        "https://eternityweb.formstack.com/forms/vermont_electric_forklift"
      ],
      "evidenceText": "Vermont Electric Cooperative offers a bill credit for purchase of electric forklifts used in new applications or replacing fossil-fuel forklifts.",
      "reasoningNotes": "The electric forklift match is source-backed and should remain product-specific. It should not trigger broad EV, EV charger, or unrelated equipment categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Vermont Electric Coop electric forklift program is identified as a bill credit, not a direct upfront rebate.",
        "sourceUrlsChecked": [
          "https://vermontelectric.coop/energy-transformation-programs",
          "https://programs.dsireusa.org/system/program/detail/22346"
        ],
        "reasoningNotes": "Bill credits are recurring/account credits and should not be modeled as one-time savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22584",
    "opportunityName": "Vermont Electric Coop - Induction Cooktop Bill Credit",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22584/vermont-electric-coop-induction-cooktop-bill-credit",
    "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
    "applicationUrl": "https://smarthub.tfaforms.net/1600",
    "administrator": "Vermont Electric Cooperative",
    "programType": "Bill Credit",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "Vermont Electric Cooperative"
        ],
        "notes": "Available to Vermont Electric Cooperative members in the cooperative service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "member_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_induction_cooking"
      ],
      "hardRequirements": [
        "Applicant must be a Vermont Electric Cooperative member.",
        "Induction cooktop must be installed, not portable.",
        "Purchase must be on or after the program eligibility date stated by VEC.",
        "Proof of purchase is required."
      ],
      "blockers": [
        "Portable induction cooktops are not eligible.",
        "Do not match commercial kitchen equipment.",
        "Do not match general appliance rebates beyond installed residential induction cooktops."
      ],
      "programType": "Bill Credit",
      "administrator": "Vermont Electric Cooperative",
      "applicationUrl": "https://smarthub.tfaforms.net/1600",
      "websiteUrl": "https://vermontelectric.coop/energy-transformation-programs",
      "sourceUrlsChecked": [
        "https://vermontelectric.coop/energy-transformation-programs",
        "https://smarthub.tfaforms.net/1600"
      ],
      "evidenceText": "VEC offers an induction cooktop incentive for installed induction cooktops and states portable induction cooktops are not eligible.",
      "reasoningNotes": "The match should be narrowed from commercial induction cooking equipment to residential installed induction cooking. This is a product-specific residential electrification bill credit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Program is identified as an induction cooktop bill credit, not a direct upfront rebate formula.",
        "sourceUrlsChecked": [
          "https://vermontelectric.coop/energy-transformation-programs"
        ],
        "reasoningNotes": "Bill-credit programs should not be forced into a one-time savings rule unless a source clearly states an upfront amount.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4471",
    "opportunityName": "Benton PUD -  ENERGY STAR Certified Manufactured Homes Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4471/benton-pud-energy-star-certified-manufactured-homes-rebate-program",
    "websiteUrl": "https://www.bentonpud.org/rebates-savings/rebates/new-construction-rebates",
    "applicationUrl": null,
    "administrator": "Benton PUD",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "notes": "Limited to electrically heated homes in Benton PUD service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "manufactured_home_owner",
        "homebuyer"
      ],
      "eligibleSectors": [
        "residential",
        "manufactured_housing"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_certified_manufactured_home",
        "pre_1976_manufactured_home_replacement"
      ],
      "hardRequirements": [
        "Manufactured home must be electrically heated.",
        "Home must be located in Benton PUD service territory.",
        "Application must be submitted within the current deadline after purchase or installation.",
        "ENERGY STAR or NEEM certification documentation may be required.",
        "Rebates are valid only while funding is available."
      ],
      "blockers": [
        "Do not match standalone high-efficiency HVAC replacement.",
        "Do not match generic insulation, windows, ducts, or ventilation as separate retrofit categories under this record.",
        "Do not match site-built new construction under this manufactured-home opportunity."
      ],
      "programType": "Rebate Program",
      "administrator": "Benton PUD",
      "applicationUrl": null,
      "websiteUrl": "https://www.bentonpud.org/rebates-savings/rebates/new-construction-rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4471/benton-pud-energy-star-certified-manufactured-homes-rebate-program",
        "https://www.bentonpud.org/Energy-Programs/Rebates/Construction",
        "https://www.bentonpud.org/rebates-savings/rebates/new-construction-rebates"
      ],
      "evidenceText": "Benton PUD lists rebates for ENERGY STAR certified manufactured homes and pre-1976 manufactured home replacement, with electric-heating and service-territory requirements.",
      "reasoningNotes": "The HVAC match is a false positive. Although efficient manufactured homes include better ducts, insulation, and windows, the rebate is for the certified manufactured home or replacement unit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Benton PUD lists ENERGY STAR manufactured home rebates of $1,200-$1,400, but amount depends on home/details.",
        "sourceUrlsChecked": [
          "https://www.bentonpud.org/rebates-savings/rebates/new-construction-rebates"
        ],
        "reasoningNotes": "The target lacks matched measure terms and the official range needs measure-specific selection.",
        "originalGapReason": "formula_not_found_in_source_text",
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
