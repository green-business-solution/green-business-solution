You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 47
Targets in this prompt: 921-940 of 984
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
  "batchNumber": 47,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2735"
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-survey",
    "opportunityName": "Energy Survey",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/save-money",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/save-money",
    "applicationUrl": null,
    "administrator": "Silicon Valley Power",
    "programType": "Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "counties": [
          "Santa Clara"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power electric service territory"
        ],
        "notes": "For Silicon Valley Power business customers in the City of Santa Clara."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "small_business_customer"
      ],
      "eligibleSectors": [
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "business_energy_survey",
        "energy_audit",
        "technical_assistance"
      ],
      "hardRequirements": [
        "Customer must be a Silicon Valley Power business customer.",
        "Survey provides recommendations and potential rebate information.",
        "Any subsequent rebate requires separate program pre-approval and eligibility."
      ],
      "blockers": [
        "Remove low_flow_fixture_retrofit; the survey does not fund water fixture retrofits.",
        "The word fixture should not be generalized into plumbing or water-conservation measures.",
        "Equipment rebates are separate from the survey."
      ],
      "programType": "Technical Assistance",
      "administrator": "Silicon Valley Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/save-money",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/save-money",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/84829/638965616141770000",
        "https://www.siliconvalleypower.com/businesses/rebates"
      ],
      "evidenceText": "SVP describes the Energy Survey as a free business service that recommends efficiency improvements, potential rebates, and payback; it is not a water-fixture retrofit program.",
      "reasoningNotes": "The supplied low-flow fixture match is a false positive. The correct category is audit or technical assistance."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "SVP Energy Survey is an audit or technical assistance offering, not a direct customer equipment rebate formula.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/save-money"
        ],
        "reasoningNotes": "Audit-only services should not be modeled as one-time project incentives.",
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
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308",
    "opportunityName": "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
    "state": "CA",
    "sourceName": "California Energy Commission",
    "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite",
    "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite",
    "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
    "administrator": "California Energy Commission",
    "programType": "Grant",
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
          "battery storage"
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
        "notes": "California projects under the CEC H2ONSITE solicitation."
      },
      "eligibleApplicantTypes": [],
      "eligibleSectors": [
        "clean_hydrogen",
        "industrial_decarbonization",
        "hard_to_electrify_sectors",
        "energy_demonstration"
      ],
      "eligibleRetrofitCategories": [
        "clean_hydrogen_production_system",
        "hydrogen_storage_system",
        "onsite_hydrogen_end_use"
      ],
      "hardRequirements": [
        "Application must be submitted through ECAMS.",
        "Solicitation deadline is August 19, 2026 at 11:59 p.m.",
        "Project must demonstrate distributed-scale clean hydrogen production up to five metric tons per day.",
        "Hydrogen production must be co-located with storage and end use.",
        "Project must align with the CEC solicitation manual and addenda."
      ],
      "blockers": [
        "Remove battery_storage_system; the source describes hydrogen storage, not standalone battery storage.",
        "Do not match to building battery backup or general energy storage rebates.",
        "This is a clean hydrogen demonstration solicitation, not a conventional building retrofit program."
      ],
      "programType": "Grant",
      "administrator": "California Energy Commission",
      "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
      "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite",
      "sourceUrlsChecked": [
        "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidenceText": "CEC describes H2ONSITE as distributed clean hydrogen production co-located with hydrogen storage and onsite end use; it does not describe battery storage.",
      "reasoningNotes": "The battery-storage match is a false positive caused by the generic word storage."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CEC H2ONSITE is a competitive solicitation with awards determined by application and project category.",
        "sourceUrlsChecked": [
          "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite",
          "https://ecams.energy.ca.gov/s/login/"
        ],
        "reasoningNotes": "No generic one-time formula applies to arbitrary battery or hydrogen projects without the solicitation budget category and award limit.",
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
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
    "opportunityName": "GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
    "state": "CA",
    "sourceName": "California Energy Commission",
    "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
    "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
    "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
    "administrator": "California Energy Commission",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
        "notes": "California eligible school-bus sites and deployments serving local educational agencies."
      },
      "eligibleApplicantTypes": [
        "local_educational_agency",
        "third_party_school_transportation_provider"
      ],
      "eligibleSectors": [
        "education",
        "school_transportation",
        "clean_transportation"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "electric_school_bus_charging_infrastructure"
      ],
      "hardRequirements": [
        "Application must be submitted through ECAMS.",
        "Solicitation deadline is August 31, 2026 at 11:59 p.m.",
        "Project must install EV charging infrastructure for electric school buses.",
        "Applicant must qualify under one of the solicitation funding lanes.",
        "Lane-specific eligibility for LEAs, prior HVIP school-bus awards, EnergIIZE status, or third-party school transportation service applies."
      ],
      "blockers": [
        "Do not match to public light-duty corridor charging.",
        "Do not match to residential EV chargers or general workplace charging.",
        "Eligibility is lane-specific and tied to electric school-bus infrastructure."
      ],
      "programType": "Grant",
      "administrator": "California Energy Commission",
      "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
      "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
      "sourceUrlsChecked": [
        "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidenceText": "CEC states GFO-25-605 provides up to $22 million for EV charging infrastructure serving electric school buses through LEA and school transportation funding lanes.",
      "reasoningNotes": "The EV charging match is valid only for electric school-bus charging infrastructure."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CEC RECESS is a competitive solicitation with funding by eligible school-bus charging project and application details.",
        "sourceUrlsChecked": [
          "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess"
        ],
        "reasoningNotes": "No generic reusable one-time formula was found for arbitrary charging projects.",
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
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
    "opportunityName": "GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME)",
    "state": "CA",
    "sourceName": "California Energy Commission",
    "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home",
    "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home",
    "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
    "administrator": "California Energy Commission",
    "programType": "Grant Program",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Statewide California"
        ],
        "notes": "Statewide California competitive solicitation under the California Energy Commission Clean Transportation Program; applicant and project geography are governed by the solicitation manual and ECAMS submission requirements."
      },
      "eligibleApplicantTypes": [
        "California organizations eligible under the solicitation manual",
        "public agencies where eligible",
        "tribal governments where eligible",
        "nonprofit organizations where eligible",
        "community-based organizations where eligible",
        "business entities where eligible",
        "project teams able to submit through ECAMS"
      ],
      "eligibleSectors": [
        "transportation",
        "public_sector",
        "nonprofit",
        "commercial",
        "community_based_organization",
        "residential_ev_market_support"
      ],
      "eligibleRetrofitCategories": [
        "competitive_ev_grant",
        "ev_home_charging_facilitation",
        "ev_incentive_navigation_platform_or_hub",
        "ev_outreach_messaging",
        "ev_education",
        "ev_charging_equipment_limited",
        "ev_home_equipment_support_limited"
      ],
      "hardRequirements": [
        "Applications must be submitted through the CEC ECAMS portal.",
        "Solicitation GFO-25-608 was released May 11, 2026 and is listed as Active with an application deadline of August 18, 2026 at 11:59 p.m.",
        "Applicant must follow the official solicitation manual, attachments, deadlines, workshop materials and any addenda.",
        "Award amounts and eligible costs are project-specific and must be determined through the competitive application and CEC award process.",
        "Full applicant eligibility and equipment eligibility should be verified in the solicitation manual before matching a project."
      ],
      "blockers": [
        "This is a competitive grant solicitation, not a deterministic customer rebate for arbitrary EV charger installations.",
        "The ECAMS application portal is login-based; the full application workflow is not publicly readable without an account.",
        "The solicitation manual file was identified on the official CEC page, but not all detailed eligibility tables were parsed from accessible text.",
        "Do not map this opportunity to building energy retrofits, HVAC, lighting, storage or general commercial efficiency measures.",
        "Direct residential charger rebates, vehicle rebates and utility make-ready programs should not be merged into this CEC solicitation."
      ],
      "programType": "Grant Program",
      "administrator": "California Energy Commission",
      "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
      "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home",
      "sourceUrlsChecked": [
        "https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidenceText": "The official CEC solicitation page identifies GFO-25-608 as Electric Vehicle Hub, Outreach, Messaging, and Equipment, a Clean Transportation Program Grant Funding Opportunity with Active status, release date May 11, 2026, and submission deadline August 18, 2026. The page directs applicants to submit through ECAMS and provides solicitation files and workshop materials.",
      "reasoningNotes": "The opportunity is active but should be treated as a competitive EV program support grant, not a simple per-charger rebate. Confidence is medium because detailed eligible-cost and applicant tables were not fully accessible from parsed public text."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CEC EV HOME is a competitive solicitation for MUD and multifamily charging access and resilience projects.",
        "sourceUrlsChecked": [
          "https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-home-charging-access-and-resilience-multi"
        ],
        "reasoningNotes": "No generic one-time charger amount was verified; awards depend on solicitation budget categories and project application.",
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
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
    "opportunityName": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
    "state": "CA",
    "sourceName": "California Energy Commission",
    "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
    "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
    "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
    "administrator": "California Energy Commission",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "notes": "California Energy Commission solicitation; project must qualify under the solicitation and eligible federal geothermal funding opportunity."
      },
      "eligibleApplicantTypes": [
        "eligible_federal_geothermal_award_recipient"
      ],
      "eligibleSectors": [
        "energy",
        "geothermal_development",
        "research_and_development"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "Applicant must apply for and receive an award under an eligible federal geothermal funding opportunity.",
        "CEC funds are cost-share only and must meet GFO-25-902 solicitation requirements."
      ],
      "blockers": [
        "Do not match to ground_source_geothermal_heat_pump; the source supports geothermal energy funding cost-share, not building HVAC heat-pump installations.",
        "Not a residential or commercial building retrofit rebate."
      ],
      "programType": "Grant",
      "administrator": "California Energy Commission",
      "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
      "websiteUrl": "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
      "sourceUrlsChecked": [
        "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidenceText": "CEC lists GFO-25-902 as active grant funding that provides cost-share funding to applicants receiving eligible federal geothermal awards.",
      "reasoningNotes": "Input target list from uploaded file . Removed the ground-source heat-pump match because the official solicitation is for federal geothermal award cost share, not building HVAC retrofits."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CEC solicitation is a competitive cost-share opportunity with awards based on federal project details.",
        "sourceUrlsChecked": [
          "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-funding-opportunities-geothermal-grants"
        ],
        "reasoningNotes": "No generic one-time rule should be created without the solicitation cost-share category and approved award limits.",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging",
    "opportunityName": "GRID-Lodging",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
    "websiteUrl": "https://mendotagroup.com/sdge-grid-lodging/",
    "applicationUrl": "https://mendotagroup.com/sdge-grid-lodging/",
    "administrator": "San Diego Gas & Electric",
    "programType": "Performance Based Energy Efficiency Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "San Diego Gas & Electric"
        ],
        "notes": "SDG&E service territory; lodging businesses with eligible NAICS codes."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "lodging_business",
        "aggregator",
        "self_aggregator"
      ],
      "eligibleSectors": [
        "commercial",
        "hospitality",
        "lodging"
      ],
      "eligibleRetrofitCategories": [
        "meter_based_energy_efficiency_project",
        "custom_energy_efficiency_upgrade"
      ],
      "hardRequirements": [
        "Customer must have an active SDG&E electric or gas account and pay the Public Purpose Program surcharge.",
        "Facility must be in eligible lodging NAICS categories and provide at least twelve consecutive months of energy data.",
        "Projects may not double-count incentives with other energy-efficiency programs and must satisfy NMEC and program screening requirements."
      ],
      "blockers": [
        "Remove automated_demand_response_controls match; GRID-Lodging is a meter-based energy-efficiency incentive, not a demand response controls rebate.",
        "Not for non-lodging facilities or customers outside SDG&E territory."
      ],
      "programType": "Performance Based Energy Efficiency Incentive",
      "administrator": "San Diego Gas & Electric",
      "applicationUrl": "https://mendotagroup.com/sdge-grid-lodging/",
      "websiteUrl": "https://mendotagroup.com/sdge-grid-lodging/",
      "sourceUrlsChecked": [
        "https://www.sdge.com/business/save-energy-and-money",
        "https://mendotagroup.com/sdge-grid-lodging/"
      ],
      "evidenceText": "SDG&E lists GRID-Lodging for hotels and motels; the program rewards SDG&E lodging customers for qualifying projects that save energy.",
      "reasoningNotes": "Corrected false-positive demand-response match. The official SDG&E listing and implementer page support custom/metered energy efficiency only."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "GRID-Lodging rewards customers for distributed energy resource projects that save or shift energy.",
        "sourceUrlsChecked": [
          "https://mendotagroup.com/sdge-grid-lodging"
        ],
        "reasoningNotes": "Grid-responsive compensation is not an upfront direct rebate formula.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3086",
    "opportunityName": "IID Energy - Commercial Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3086/iid-energy-commercial-rebate-program",
    "websiteUrl": "https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program",
    "applicationUrl": "https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program",
    "administrator": "Imperial Irrigation District",
    "programType": "Custom Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "Imperial Irrigation District"
        ],
        "notes": "IID service area; commercial customers with eligible custom energy-efficiency projects."
      },
      "eligibleApplicantTypes": [
        "commercial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "custom_energy_efficiency_upgrade",
        "high_efficiency_refrigeration_equipment",
        "commercial_lighting_retrofit",
        "commercial_hvac_upgrade",
        "commercial_food_service_equipment",
        "agricultural_process_efficiency",
        "energy_controls_upgrade"
      ],
      "hardRequirements": [
        "Customer must be in IID service territory and apply for preliminary energy analysis before implementation.",
        "Installed equipment must exceed Title 24 or current industry-standard baselines as applicable.",
        "Incentives are based on annual kWh savings and subject to available program funding."
      ],
      "blockers": [
        "Not a residential appliance rebate.",
        "Do not match to refrigeration unless the project is a qualifying commercial custom efficiency measure in IID territory."
      ],
      "programType": "Custom Rebate",
      "administrator": "Imperial Irrigation District",
      "applicationUrl": "https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program",
      "websiteUrl": "https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program",
      "sourceUrlsChecked": [
        "https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program"
      ],
      "evidenceText": "IID’s Custom Energy Solutions Program pays commercial incentives for lighting, refrigeration, HVAC, food service, agricultural, process, and control equipment savings.",
      "reasoningNotes": "The refrigeration match is supported, but only as part of IID’s commercial custom energy-efficiency incentive."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "IID commercial custom program materials did not expose a prescriptive refrigeration or VFD formula.",
        "sourceUrlsChecked": [
          "https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program"
        ],
        "reasoningNotes": "Custom programs need preapproval and project-specific savings, so no safe one-time rule was created.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5685",
    "opportunityName": "LADWP - Feed-in Tariff (FiT) Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5685/ladwp-feed-in-tariff-fit-program",
    "websiteUrl": "https://www.ladwp.com/fit",
    "applicationUrl": "https://www.ladwp.com/sites/default/files/2024-10/FiT%20Application%20Package.pdf",
    "administrator": "Los Angeles Department of Water and Power",
    "programType": "Feed In Tariff",
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
          "CA"
        ],
        "counties": [],
        "cities": [
          "Los Angeles"
        ],
        "utilityTerritories": [
          "Los Angeles Department of Water and Power"
        ],
        "notes": "Projects must be within LADWP service territory; Owens Valley pricing applies only where allowed by program rules."
      },
      "eligibleApplicantTypes": [
        "property_owner",
        "renewable_energy_developer",
        "project_company"
      ],
      "eligibleSectors": [
        "commercial",
        "public",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "front_of_meter_solar_pv",
        "solar_carport_canopy",
        "eligible_renewable_generation_feed_in_tariff"
      ],
      "hardRequirements": [
        "Applicant must submit a complete hard-copy FiT application package with required fees, deposits, and forms.",
        "Project must be in LADWP service territory and applicant must demonstrate site control and qualified project-development experience.",
        "Output is sold directly to LADWP under a Standard Offer Power Purchase Agreement for up to 20 years."
      ],
      "blockers": [
        "Do not match as a behind-the-meter rooftop solar rebate, net-metering program, or customer bill-saving incentive.",
        "FiT+ solar-plus-storage is a related but separate pilot program with separate application and eligibility rules."
      ],
      "programType": "Feed In Tariff",
      "administrator": "Los Angeles Department of Water and Power",
      "applicationUrl": "https://www.ladwp.com/sites/default/files/2024-10/FiT%20Application%20Package.pdf",
      "websiteUrl": "https://www.ladwp.com/fit",
      "sourceUrlsChecked": [
        "https://www.ladwp.com/fit",
        "https://www.ladwp.com/sites/default/files/2024-10/FiT%20Application%20Package.pdf",
        "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/feed-tariff-plus-fit-pilot-program"
      ],
      "evidenceText": "LADWP FiT buys output from local eligible renewable energy projects, with available capacity updated June 2026 and hard-copy applications required.",
      "reasoningNotes": "Solar PV is supported only as a feed-in-tariff renewable generation project. Replaced generic rooftop_solar_pv with front-of-meter and tariff-specific categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "LADWP FiT is a feed-in tariff/power purchase mechanism for renewable generation.",
        "sourceUrlsChecked": [
          "https://www.ladwp.com/fit"
        ],
        "reasoningNotes": "Feed-in tariffs are recurring energy revenue mechanisms.",
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
    "opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:d049d8b8e95077d7:recharge-rebate",
    "opportunityName": "ReCharge Rebate",
    "state": "CA",
    "sourceName": "Southern California Edison Business Programs",
    "sourceUrl": "https://www.sce.com/business/smart-energy-solar/evs-for-business",
    "websiteUrl": "https://www.sce.com/business/smart-energy-solar/evs-for-business",
    "applicationUrl": "https://commercialevrebates.sce.com/consumer/recharge",
    "administrator": "Southern California Edison",
    "programType": "Commercial Vehicle Electric Retrofit Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "Southern California Edison service territory"
        ],
        "notes": "Available through SCE's commercial vehicle retrofit rebate pathway."
      },
      "eligibleApplicantTypes": [
        "commercial_vehicle_owner",
        "fleet_owner",
        "participating_retailer"
      ],
      "eligibleSectors": [
        "commercial_transportation",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "commercial_vehicle_electric_retrofit"
      ],
      "hardRequirements": [
        "Vehicle must be an eligible existing Class 4, Class 5, or Class 6 internal-combustion commercial vehicle.",
        "Retrofit must convert the vehicle to battery-electric operation.",
        "Customer must use approved retrofitters, conversion kits, or participating retailers as required by the program.",
        "Rebate amount depends on battery capacity and vehicle-to-grid capability."
      ],
      "blockers": [
        "This is not an EV charger installation incentive.",
        "Charging infrastructure belongs to separate SCE EV infrastructure programs such as Charge Ready.",
        "Do not match passenger vehicles or non-Class 4 through 6 vehicles unless program documents are updated."
      ],
      "programType": "Commercial Vehicle Electric Retrofit Rebate",
      "administrator": "Southern California Edison",
      "applicationUrl": "https://commercialevrebates.sce.com/consumer/recharge",
      "websiteUrl": "https://www.sce.com/business/smart-energy-solar/evs-for-business",
      "sourceUrlsChecked": [
        "https://www.sce.com/business/smart-energy-solar/evs-for-business",
        "https://commercialevrebates.sce.com/consumer/recharge",
        "https://commercialevrebates.sce.com/consumer/pdf/SCE_ReCharge_QUICK_Claim_Submission_Checklist.pdf",
        "https://commercialevrebates.sce.com/consumer/pdf/SCE_ReCharge_JobAid.pdf"
      ],
      "evidenceText": "SCE describes ReCharge as a rebate for converting existing Class 4 through 6 commercial vehicles from internal combustion to battery-electric operation. It is not an EV charger rebate.",
      "reasoningNotes": "The original EV charger installation match is a false positive. The correct retrofit category is commercial vehicle electric conversion."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SCE ReCharge commercial vehicle rebate materials cap rebates by vehicle battery kWh, which is not supported by the available rule shapes.",
        "sourceUrlsChecked": [
          "https://commercialevrebates.sce.com/consumer/recharge",
          "https://www.sce.com/business/smart-energy-solar/evs-for-business"
        ],
        "reasoningNotes": "The program is a one-time vehicle rebate, but it requires a battery-kWh basis or vehicle-class table not supported here.",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com",
    "opportunityName": "Statewide Midstream Water Heating",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
    "websiteUrl": "https://www.statewide-waterheating.com/",
    "applicationUrl": "https://www.statewide-waterheating.com/",
    "administrator": "Southern California Gas Company with participating California investor-owned utilities",
    "programType": "Midstream Rebate",
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "SoCalGas",
          "Pacific Gas and Electric",
          "Southern California Edison",
          "San Diego Gas & Electric"
        ],
        "notes": "California statewide midstream program for eligible commercial customers in participating investor-owned utility territories."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "multifamily_property_owner",
        "distributor",
        "contractor"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_gas_water_heater",
        "commercial_tankless_water_heater",
        "commercial_domestic_hot_water_boiler",
        "heat_pump_water_heater",
        "split_system_heat_pump_water_heater",
        "dhw_pump_demand_control",
        "solar_water_heating_system"
      ],
      "hardRequirements": [
        "Equipment must be qualifying commercial or multifamily water-heating equipment under the Statewide Midstream Water Heating program.",
        "Customer must be in an eligible participating California utility territory.",
        "Incentives are midstream and depend on eligible equipment, installation, and program funding rules."
      ],
      "blockers": [
        "high_efficiency_hvac_replacement is a false positive; space heating equipment is excluded.",
        "Do not match general HVAC, air conditioning, or non-water-heating measures.",
        "Solar thermal eligibility is limited to water-heating collectors, not general solar PV."
      ],
      "programType": "Midstream Rebate",
      "administrator": "Southern California Gas Company with participating California investor-owned utilities",
      "applicationUrl": "https://www.statewide-waterheating.com/",
      "websiteUrl": "https://www.statewide-waterheating.com/",
      "sourceUrlsChecked": [
        "https://www.statewide-waterheating.com/",
        "https://www.statewide-waterheating.com/eligibility/",
        "https://www.statewide-waterheating.com/benefits/"
      ],
      "evidenceText": "The]( program provides instant rebates for high-efficiency commercial and multifamily water-heating equipment, including gas, heat pump, controls, and solar thermal water-heating measures.",
      "reasoningNotes": "The original HVAC match was incorrect. This opportunity should match water-heating equipment only."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Statewide midstream water heating incentives are paid through market partners, not a direct customer upfront rule.",
        "sourceUrlsChecked": [
          "https://statewide-waterheating.com/",
          "https://www.sdge.com/business/save-energy-and-money"
        ],
        "reasoningNotes": "Midstream distributor/retailer incentives should not be modeled as direct project savings without customer-facing formula.",
        "originalGapReason": "formula_not_found_in_source_text",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:teas_sdge_com",
    "opportunityName": "Transportation Electrification Advisory Services (TEAS)",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
    "websiteUrl": "https://teas.sdge.com/",
    "applicationUrl": "https://teas.sdge.com/",
    "administrator": "San Diego Gas & Electric",
    "programType": "Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 1,
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
          "San Diego County",
          "Orange County"
        ],
        "cities": [],
        "utilityTerritories": [
          "San Diego Gas & Electric"
        ],
        "notes": "Limited to SDG&E business customers and fleet operators in SDG&E service territory."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "fleet_operator",
        "commercial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "fleet",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "fleet_electrification_planning",
        "ev_charging_advisory_services",
        "ev_charging_site_planning"
      ],
      "hardRequirements": [
        "Customer must engage through SDG&E's TEAS portal or business EV program.",
        "Service provides an advisor to develop personalized electrification strategies for the customer's fleet.",
        "Actual equipment installation, funding, and interconnection are governed by separate programs or utility processes."
      ],
      "blockers": [
        "TEAS is advisory technical assistance, not a direct EV charger installation rebate.",
        "Do not match as physical ev_charger_installation unless the match engine distinguishes advisory services from funded installation.",
        "Residential EV charger incentives are separate."
      ],
      "programType": "Technical Assistance",
      "administrator": "San Diego Gas & Electric",
      "applicationUrl": "https://teas.sdge.com/",
      "websiteUrl": "https://teas.sdge.com/",
      "sourceUrlsChecked": [
        "https://www.sdge.com/business/electric-vehicles/lovelectric",
        "https://teas.sdge.com/"
      ],
      "evidenceText": "SDG&E]( describes TEAS as advisor collaboration to develop personalized electrification strategies for a customer's fleet.",
      "reasoningNotes": "EV charging is related, but the deterministic physical installation match should be narrowed to advisory and site-planning services."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "TEAS is an advisory service for transportation electrification planning rather than a direct upfront rebate.",
        "sourceUrlsChecked": [
          "https://teas.sdge.com/"
        ],
        "reasoningNotes": "Advisory services should not be modeled as one-time project incentives.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22753",
    "opportunityName": "City and County of Denver - Solar Rebate",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22753/city-and-county-of-denver-solar-rebate",
    "websiteUrl": "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Buildings-and-Homes/Group-Buying-Programs",
    "applicationUrl": "https://switchtogether.com/en/solar/denver/home",
    "administrator": "City and County of Denver",
    "programType": "Solar Group Buy Discount Or Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "rooftop solar"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CO"
        ],
        "counties": [
          "Denver"
        ],
        "cities": [
          "Denver"
        ],
        "utilityTerritories": [],
        "notes": "City and County of Denver; current official materials point residents to Switch Together group-buying and partner funding."
      },
      "eligibleApplicantTypes": [
        "homeowners",
        "residential_property_owners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "rooftop_solar_pv"
      ],
      "hardRequirements": [
        "Applicant must be a Denver homeowner or residential property owner participating through the current Denver solar group-buying pathway.",
        "Project must complete program intake, site review, and final quote steps.",
        "Any rebate or partner funding must be confirmed through the current Switch Together or city-directed process."
      ],
      "blockers": [
        "Do not match commercial projects unless a current official source confirms commercial eligibility.",
        "Do not match solar thermal or unrelated renewable energy systems.",
        "Heat pump and EV charging opportunities are separate group-buying or partner offerings and should not be merged into this solar rebate record."
      ],
      "programType": "Solar Group Buy Discount Or Rebate",
      "administrator": "City and County of Denver",
      "applicationUrl": "https://switchtogether.com/en/solar/denver/home",
      "websiteUrl": "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Buildings-and-Homes/Group-Buying-Programs",
      "sourceUrlsChecked": [
        "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Buildings-and-Homes/Group-Buying-Programs",
        "https://switchtogether.com/en/solar/denver/home",
        "https://switchtogether.com/en/solar/denver/info/denver-solar-rebate-program"
      ],
      "evidenceText": "Denver's official group-buying page directs homeowners to Switch Together for solar and describes discounted purchasing and partner funding pathways.",
      "reasoningNotes": "The rooftop solar match is plausible and currently supported at medium confidence. The detailed rebate page is dynamic, so eligibility should remain conservative."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "DSIRE lists a solar rebate, but an official 2026 Denver source with a clear reusable rooftop-solar formula was not verified.",
        "sourceUrlsChecked": [
          "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency",
          "https://programs.dsireusa.org/system/program/detail/22753"
        ],
        "reasoningNotes": "Do not use DSIRE alone as final proof; Denver current pages point to group-buying/community-solar resources rather than a clear rebate table.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
    "opportunityName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5558/city-of-aspen-and-pitkin-county-renewable-energy-mitigation-program-grants",
    "websiteUrl": "https://www.aspencore.org/grants-and-funding-programs",
    "applicationUrl": null,
    "administrator": "Community Office for Resource Efficiency (CORE)",
    "programType": "Grant/Rebate Program",
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
          "CO"
        ],
        "counties": [
          "Pitkin County",
          "Garfield County",
          "Eagle County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Aspen Electric (EV charging only)"
        ],
        "notes": "Residential eligibility is in Pitkin County, Garfield County, and the Roaring Fork Valley portion of Eagle County; commercial and multifamily eligibility is in Pitkin, Eagle, and Garfield counties. EV charging incentives are limited to Aspen Electric customers."
      },
      "eligibleApplicantTypes": [
        "homeowner",
        "commercial_property_owner",
        "multifamily_property_owner",
        "tenant_with_owner_permission",
        "business",
        "nonprofit",
        "government"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "nonprofit",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_space_heating",
        "heat_pump_water_heating",
        "heat_recovery_ventilation",
        "building_envelope_air_sealing_insulation",
        "building_controls",
        "commercial_induction_cooking",
        "heat_pump_clothes_dryer",
        "commercial_kitchen_energy_efficiency",
        "ev_charging_aspen_electric_only",
        "custom_energy_efficiency",
        "design_assistance_commissioning"
      ],
      "hardRequirements": [
        "Funding is first-come, first-served and subject to available annual program funds.",
        "Application and preapproval requirements apply before qualifying work where specified by CORE.",
        "Commercial and multifamily grants are for larger implementation projects and require greenhouse-gas impact analysis with CORE before application.",
        "EV charging rebates are limited to Aspen Electric customers.",
        "Residential, commercial, and multifamily projects must meet the applicable CORE program criteria for the property type and location."
      ],
      "blockers": [
        "Do not match generic HVAC replacement unless it is a qualifying high-efficiency electrification, heat pump, heat recovery, or fuel-switching measure.",
        "Residential projects should not match commercial kitchen equipment categories.",
        "EV charging outside Aspen Electric is outside the EV charging incentive category.",
        "Projects outside the listed CORE service geography are ineligible.",
        "Design work is generally handled through rebates rather than implementation grants."
      ],
      "programType": "Grant/Rebate Program",
      "administrator": "Community Office for Resource Efficiency (CORE)",
      "applicationUrl": null,
      "websiteUrl": "https://www.aspencore.org/grants-and-funding-programs",
      "sourceUrlsChecked": [
        "https://www.aspencore.org/funding-criteria",
        "https://www.aspencore.org/commercial-multifamily-funding",
        "https://www.aspencore.org/residential-rebates-updated",
        "https://www.aspencore.org/grants-and-funding-programs"
      ],
      "evidenceText": "CORE]( funds energy efficiency and building electrification projects across Pitkin, Eagle, and Garfield counties; grants can reach $200,000 and commercial or multifamily grant applications are accepted rolling as funds allow.",
      "reasoningNotes": "The supplied high-efficiency HVAC match is supported only when narrowed to CORE-qualified electrification, heat pump, heat recovery, or fuel-switching work; the opportunity covers several other efficiency and electrification measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "REMP grants support energy projects with project-specific awards and review.",
        "sourceUrlsChecked": [
          "https://www.aspen.gov/1179/Renewable-Energy-Mitigation-Program-REMP",
          "https://www.cleanenergyeconomy.net/reimp-grant"
        ],
        "reasoningNotes": "No reusable one-time formula was verified for arbitrary grant-funded projects.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3580",
    "opportunityName": "Delta-Montrose Electric Association - Residential Weatherization Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3580/delta-montrose-electric-association-residential-weatherization-rebate-program",
    "websiteUrl": "https://www.dmea.com/efficiency",
    "applicationUrl": null,
    "administrator": "Delta-Montrose Electric Association",
    "programType": "Weatherization Service",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "energy audit",
          "audit"
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
          "Delta-Montrose Electric Association"
        ],
        "notes": "Available to qualifying DMEA residential members; free weatherization is income-limited through partner agencies."
      },
      "eligibleApplicantTypes": [
        "residential_electric_member",
        "low_income_residential_member"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "weatherization",
        "insulation",
        "duct_sealing",
        "lighting_upgrade",
        "appliance_replacement",
        "furnace_replacement"
      ],
      "hardRequirements": [
        "Applicant must be a DMEA residential member for utility services.",
        "Free weatherization is offered through the Colorado Energy Office and Housing Resources of Western Colorado partnership.",
        "Income eligibility applies to free weatherization services.",
        "Energy audit or walk-through assessment may be required to identify eligible improvements."
      ],
      "blockers": [
        "Commercial customers are not supported by this residential weatherization opportunity.",
        "This is not a general cash rebate for any home improvement.",
        "Measures are limited to program-approved weatherization and efficiency improvements.",
        "Applicants outside DMEA service territory are not eligible."
      ],
      "programType": "Weatherization Service",
      "administrator": "Delta-Montrose Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.dmea.com/efficiency",
      "sourceUrlsChecked": [
        "https://www.dmea.com/efficiency",
        "https://dmea.com/free-home-weatherization",
        "https://programs.dsireusa.org/system/program/detail/3580/delta-montrose-electric-association-residential-weatherization-rebate-program"
      ],
      "evidenceText": "DMEA describes free walk-through audits and free weatherization for eligible low-income members, including insulation, duct sealing, appliance, lighting, and furnace improvements.",
      "reasoningNotes": "The energy_audit match is source-backed, but the opportunity should also capture the actual residential weatherization measures and income/service-territory limits."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "DMEA source is a free home weatherization pathway, not a published one-time rebate formula.",
        "sourceUrlsChecked": [
          "https://dmea.com/free-home-weatherization"
        ],
        "reasoningNotes": "Audit/weatherization services without a clear dollar formula should not be forced into a one-time rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22160",
    "opportunityName": "Electric Vehicle Fast-Charging Plazas Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program",
    "websiteUrl": "https://energyoffice.colorado.gov/ev-fast-charging-plazas",
    "applicationUrl": "https://socgov27.my.site.com/CEOEVGrants/s/",
    "administrator": "Colorado Energy Office",
    "programType": "Grant",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric vehicle charging"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Colorado statewide EV fast-charging plaza grant program with location priorities including corridors, high-density housing, commercial areas, transit hubs, and underserved communities."
      },
      "eligibleApplicantTypes": [
        "business",
        "government_entity",
        "public_institution",
        "tribal_government",
        "nonprofit_organization"
      ],
      "eligibleSectors": [
        "commercial",
        "government",
        "tribal",
        "nonprofit",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "dc_fast_charger_installation",
        "public_ev_charging_plaza",
        "battery_storage_for_ev_charging"
      ],
      "hardRequirements": [
        "Project must be a public DC fast-charging plaza in Colorado.",
        "Grant funding is for eligible project costs and may require applicant cost share.",
        "Awardees must maintain continuous public use for the required term.",
        "Current rounds may require multiple charging ports and high-power DC fast charging capability.",
        "Battery storage is eligible only when tied to the EV fast-charging plaza project."
      ],
      "blockers": [
        "Private residential EV chargers are not eligible.",
        "Level 2-only charging projects are not supported by the fast-charging plaza program.",
        "Battery storage unrelated to EV charging is not supported.",
        "The official Colorado Energy Office program page was difficult to access directly, so current round details should be confirmed through the state portal."
      ],
      "programType": "Grant",
      "administrator": "Colorado Energy Office",
      "applicationUrl": "https://socgov27.my.site.com/CEOEVGrants/s/",
      "websiteUrl": "https://energyoffice.colorado.gov/ev-fast-charging-plazas",
      "sourceUrlsChecked": [
        "https://energyoffice.colorado.gov/ev-fast-charging-plazas",
        "https://socgov27.my.site.com/CEOEVGrants/s/",
        "https://www.codot.gov/programs/innovativemobility/electrification/nevi-plan",
        "https://afdc.energy.gov/laws/12432",
        "https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program"
      ],
      "evidenceText": "Colorado sources describe grants for public DC fast-charging plazas, with priority locations and cost-share funding; related state portals handle applications.",
      "reasoningNotes": "The EV charger installation match is correct only when narrowed to public DC fast-charging plazas, not general EV charger installation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Colorado EV fast-charging plaza official source was inaccessible in source fetch.",
        "sourceUrlsChecked": [
          "https://energyoffice.colorado.gov/ev-fast-charging-plazas"
        ],
        "reasoningNotes": "No official calculable grant formula could be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22763",
    "opportunityName": "High Country Conservation - Solarize Summit",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22763/high-country-conservation-solarize-summit",
    "websiteUrl": "https://highcountryconservation.org/solarize-summit/",
    "applicationUrl": null,
    "administrator": "High Country Conservation Center",
    "programType": "Group Purchase Discount Rebate",
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
          "CO"
        ],
        "counties": [
          "Summit County"
        ],
        "cities": [
          "Breckenridge",
          "Frisco",
          "Silverthorne"
        ],
        "utilityTerritories": [],
        "notes": "Solarize Summit serves local residents and businesses; some local rebates are limited to listed municipalities and unincorporated Summit County."
      },
      "eligibleApplicantTypes": [
        "resident",
        "homeowner",
        "business"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "rooftop_solar_pv",
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Participant must use the Solarize Summit program process and installer for Solarize discounts.",
        "For the 2026 campaign, contract deadlines and local rebate funding limits apply.",
        "Local government discounts are limited by residence or business location and are first-come, first-served."
      ],
      "blockers": [
        "Not a statewide Colorado solar rebate.",
        "Battery storage is eligible only as part of the Solarize Summit offering; do not generalize to unrelated storage incentives."
      ],
      "programType": "Group Purchase Discount Rebate",
      "administrator": "High Country Conservation Center",
      "applicationUrl": null,
      "websiteUrl": "https://highcountryconservation.org/solarize-summit/",
      "sourceUrlsChecked": [
        "https://highcountryconservation.org/solarize-summit/"
      ],
      "evidenceText": "Solarize Summit’s 2026 page offers limited-time discounts on solar panel installation and battery storage for local residents and certain businesses.",
      "reasoningNotes": "The rooftop solar match is supported. Added battery storage because the current official page includes battery storage; geography and campaign-deadline limits are material."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Solarize Summit is a group-purchase/education campaign rather than a direct published upfront rebate formula.",
        "sourceUrlsChecked": [
          "https://highcountryconservation.org/solarize-summit/"
        ],
        "reasoningNotes": "No one-time incentive rule should be created for bulk-purchase pricing.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22083",
    "opportunityName": "San Isabel Electric Association - Commercial Lighting Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22083/san-isabel-electric-association-commercial-lighting-rebate-program",
    "websiteUrl": "https://siea.com/empower-commercial-lighting-efficiency/",
    "applicationUrl": null,
    "administrator": "San Isabel Electric Association",
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "San Isabel Electric Association"
        ],
        "notes": "Commercial lighting rebates are limited to San Isabel Electric members; a recent official note says current commercial lighting rebates are only for pole-mounted LED fixtures and are expected to expire December 31, 2026."
      },
      "eligibleApplicantTypes": [
        "commercial_member",
        "business_member"
      ],
      "eligibleSectors": [
        "commercial",
        "business"
      ],
      "eligibleRetrofitCategories": [
        "pole_mounted_led_lighting_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a San Isabel Electric member.",
        "Applicant must purchase qualifying lighting equipment.",
        "Applicant must contact Empower to begin or verify the Business and Commercial Lighting Efficiency Program application.",
        "Application must be completed within 120 days of the qualifying invoice or receipt date.",
        "Current commercial lighting rebates are limited to pole-mounted LED fixtures according to the recent official program note."
      ],
      "blockers": [
        "Do not match broad indoor commercial lighting unless San Isabel confirms current qualifying equipment.",
        "Do not match residential lighting or residential appliance rebates.",
        "Do not match solar, batteries, combined heat and power, insulation, or mechanical upgrades to this commercial lighting rebate record; those are broader Empower services or separate projects.",
        "Do not match non-SIEA members."
      ],
      "programType": "Rebate Program",
      "administrator": "San Isabel Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://siea.com/empower-commercial-lighting-efficiency/",
      "sourceUrlsChecked": [
        "https://siea.com/empower-commercial-lighting-efficiency/",
        "https://siea.com/empower/",
        "https://siea.com/uncategorized/aguilar-streetlight-project/"
      ],
      "evidenceText": "San]( Isabel says business lighting rebates require SIEA membership and qualifying equipment; a recent official note says current commercial lighting rebates are only for pole-mounted LED fixtures through 2026.",
      "reasoningNotes": "The LED lighting match remains valid only after narrowing to the currently stated pole-mounted LED fixture rebate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Target has no matched terms and official lighting page did not expose a water/sewer or relevant one-time formula.",
        "sourceUrlsChecked": [
          "https://siea.com/empower-commercial-lighting-efficiency/"
        ],
        "reasoningNotes": "No rule was created because the mapping does not align with source scope.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5295",
    "opportunityName": "Xcel Energy - Solar Rewards Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5295/xcel-energy-solar-rewards-program",
    "websiteUrl": "https://co.my.xcelenergy.com/s/renewable/solar-rewards",
    "applicationUrl": "https://co.my.xcelenergy.com/s/renewable/solar-application-process",
    "administrator": "Xcel Energy",
    "programType": "Performance-Based Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 1,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy Colorado electric service territory",
          "Public Service Company of Colorado"
        ],
        "notes": "Limited to eligible Xcel Energy Colorado electric customers and projects processed through Xcel's solar application process."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "solar_photovoltaic_system"
      ],
      "hardRequirements": [
        "Project must be an eligible solar photovoltaic installation in Xcel Energy Colorado territory.",
        "Project must follow Xcel Energy interconnection and Solar Rewards application requirements.",
        "Application is typically managed by the solar installer.",
        "Incentive availability, program capacity, and terms must follow the current Xcel renewable energy plan and tariff rules."
      ],
      "blockers": [
        "The matched term window is a false positive and does not support window replacement.",
        "Do not match building-envelope windows, glazing, or window film.",
        "Battery storage is separate unless enrolled through a current Xcel battery program.",
        "Do not match solar loans or financing unless separately verified."
      ],
      "programType": "Performance-Based Incentive",
      "administrator": "Xcel Energy",
      "applicationUrl": "https://co.my.xcelenergy.com/s/renewable/solar-application-process",
      "websiteUrl": "https://co.my.xcelenergy.com/s/renewable/solar-rewards",
      "sourceUrlsChecked": [
        "https://co.my.xcelenergy.com/s/renewable/solar-rewards",
        "https://co.my.xcelenergy.com/s/renewable/solar-application-process",
        "https://www.xcelenergy.com/company/rates_and_regulations/filings/renewable_energy_plans_and_reports"
      ],
      "evidenceText": "Xcel Colorado describes Solar Rewards as incentives for installing solar through Xcel's solar application and interconnection process.",
      "reasoningNotes": "The original window-replacement match is a false positive. This opportunity should match solar photovoltaic installation only, with battery treated as a separate related program unless explicitly included."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Solar Rewards is a renewable energy credit/production-payment style program, not a direct upfront solar rebate formula.",
        "sourceUrlsChecked": [
          "https://co.my.xcelenergy.com/s/renewable/solar-rewards"
        ],
        "reasoningNotes": "Recurring production/REC incentives should not be forced into upfront savings rules.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22787",
    "opportunityName": "Low- to Moderate-Income Solar Pilot Program",
    "state": "DE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22787/low-to-moderate-income-solar-pilot-program",
    "websiteUrl": "https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/",
    "applicationUrl": null,
    "administrator": "Delaware Department of Natural Resources and Environmental Control",
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
        "states": [
          "DE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Delaware program regardless of electric utility service territory."
      },
      "eligibleApplicantTypes": [
        "low_income_household",
        "moderate_income_household",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential",
        "low_income",
        "moderate_income"
      ],
      "eligibleRetrofitCategories": [
        "residential_solar_pv",
        "rooftop_solar_pv"
      ],
      "hardRequirements": [
        "Low-income households must apply through the Weatherization Assistance Program and meet WAP income eligibility.",
        "Low-income qualified homes may receive cost-free solar up to 4.0 kW.",
        "Moderate-income households apply through approved solar contractors and must meet state area median income limits.",
        "Moderate-income qualified households receive 70% program payment and 30% homeowner payment for systems up to 6.0 kW.",
        "Income is verified through tax returns and required household forms."
      ],
      "blockers": [
        "Weatherization itself is a separate prerequisite pathway, not the solar pilot’s funded retrofit category.",
        "Not available to commercial, industrial, or nonresidential applicants.",
        "Do not match as general air sealing or weatherization; this opportunity is for residential solar installation."
      ],
      "programType": "Grant Program",
      "administrator": "Delaware Department of Natural Resources and Environmental Control",
      "applicationUrl": null,
      "websiteUrl": "https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/",
      "sourceUrlsChecked": [
        "https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/",
        "https://dnrec.delaware.gov/climate-coastal-energy/sustainable-communities/weatherization/"
      ],
      "evidenceText": "DNREC states the LMI Solar Pilot provides cost-free or reduced-cost solar installations for low- and moderate-income Delaware households, with low-income applications through Weatherization.",
      "reasoningNotes": "The supplied weatherization match is a false positive for the funded opportunity. Weatherization is a separate pathway or prerequisite for low-income eligibility."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Delaware LMI Solar covers 100% for low-income 4 kW systems or 70% for moderate-income systems up to 6 kW.",
        "sourceUrlsChecked": [
          "https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/"
        ],
        "reasoningNotes": "Supported rule schema cannot encode the program's system-size cap safely without a kW cap or project pathway flag.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22062",
    "opportunityName": "Beaches Energy Services - Commercial Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22062/beaches-energy-services-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.beachesenergy.com/energy-savings/energy-rebates",
    "applicationUrl": "https://www.beachesenergy.com/sites/default/files/documents/2025-08/commercial-lighting-rebate-2024.pdf",
    "administrator": "Beaches Energy Services",
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
          "FL"
        ],
        "counties": [
          "Duval County"
        ],
        "cities": [
          "Jacksonville Beach"
        ],
        "utilityTerritories": [
          "Beaches Energy Services"
        ],
        "notes": "Available to qualifying commercial electric customers in Beaches Energy Services service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customers"
      ],
      "eligibleSectors": [
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "energy_efficient_lighting"
      ],
      "hardRequirements": [
        "Applicant must be a commercial electric customer of Beaches Energy Services.",
        "Lighting retrofit or upgrade must be in an existing commercial building within the utility service territory.",
        "Customer must contact the conservation specialist before installation.",
        "Retrofit worksheet and lighting analysis must be completed and reviewed before installation.",
        "Work must be completed by a licensed Florida contractor with required permits.",
        "Application must be submitted within 90 days of purchase or installation."
      ],
      "blockers": [
        "New construction commercial properties are not eligible.",
        "Non-lighting measures should not match this commercial lighting rebate.",
        "Residential lighting products are not covered by this commercial lighting rebate.",
        "Rebate will not exceed purchase price and may be altered or canceled without notice."
      ],
      "programType": "Rebate Program",
      "administrator": "Beaches Energy Services",
      "applicationUrl": "https://www.beachesenergy.com/sites/default/files/documents/2025-08/commercial-lighting-rebate-2024.pdf",
      "websiteUrl": "https://www.beachesenergy.com/energy-savings/energy-rebates",
      "sourceUrlsChecked": [
        "https://www.beachesenergy.com/energy-savings/energy-rebates",
        "https://beachesenergy.com/about-us/resources/forms",
        "https://www.beachesenergy.com/sites/default/files/documents/2025-08/commercial-lighting-rebate-2024.pdf",
        "https://beachesenergy.com/sites/default/files/documents/2025-09/rebates-brochure.pdf"
      ],
      "evidenceText": "Beaches Energy lists a commercial lighting rebate and the form supports energy-efficient lighting upgrades for existing commercial properties.",
      "reasoningNotes": "The LED lighting match is source-backed, but should be limited to existing commercial lighting upgrades in Beaches Energy territory."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Beaches Energy source did not verify a current commercial LED lighting rebate formula.",
        "sourceUrlsChecked": [
          "https://www.beachesenergy.com/rebates"
        ],
        "reasoningNotes": "No source-backed one-time lighting rule could be selected.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "electric_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
