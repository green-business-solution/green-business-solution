You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 18
Targets in this prompt: 341-360 of 984
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
  "batchNumber": 18,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5215"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22596",
    "opportunityName": "Entergy New Orleans - eTech Program",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22596/entergy-new-orleans-etech-program",
    "websiteUrl": "https://entergyetech.com/electric-vehicles",
    "applicationUrl": "https://entergyetech.com/apply-online",
    "administrator": "Entergy New Orleans",
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
          "LA"
        ],
        "counties": [],
        "cities": [
          "New Orleans"
        ],
        "utilityTerritories": [
          "Entergy New Orleans"
        ],
        "notes": "Available to qualifying Entergy New Orleans customers in the Entergy New Orleans electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "commercial_customers",
        "multifamily_property_owners",
        "developers",
        "fleet_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "transportation",
        "fleet",
        "new_construction_support"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_charger_pre_wiring"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying Entergy New Orleans customer.",
        "Residential bonus requires enrollment in the Energy Smart bring-your-own-charger pathway.",
        "Commercial Level 2 incentives are limited to eligible public, fleet, or multifamily use cases and program port requirements.",
        "Commercial DC fast charging incentives depend on charger power and eligible use case.",
        "Project incentive caps apply.",
        "Application requires recent invoice or proof of purchase and EV charging installation documentation.",
        "Developer pre-wiring incentives apply to new electrical circuits supporting future EV charging."
      ],
      "blockers": [
        "Hydrogen fueling and stationary fuel cell systems are not part of this eTech EV charging incentive.",
        "This record is limited to Entergy New Orleans territory and should not be matched to Entergy Mississippi or other Entergy operating companies.",
        "Level 2 charger installation labor is ineligible for single-family and multifamily developer pre-wiring incentives.",
        "Replacement of older equivalent electric equipment does not qualify.",
        "DC fast charger private-network projects have limited incentive treatment.",
        "Other eTech electrification measures are separate categories and should not be generalized into EV charging."
      ],
      "programType": "Rebate Program",
      "administrator": "Entergy New Orleans",
      "applicationUrl": "https://entergyetech.com/apply-online",
      "websiteUrl": "https://entergyetech.com/electric-vehicles",
      "sourceUrlsChecked": [
        "https://entergyetech.com/electric-vehicles",
        "https://entergyetech.com/",
        "https://entergyetech.com/apply-online"
      ],
      "evidenceText": "The eTech EV page has separate Entergy New Orleans residential, commercial, and developer EV charging incentives, including Level 2, DC fast charging, and pre-wiring. It imposes location, port, kW, project-cap, invoice, and documentation limits.",
      "reasoningNotes": "Kept Level 2 and DC fast charging and added EV pre-wiring because the official page lists developer incentives. Did not generalize into hydrogen or stationary fuel cell categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_280bc1bb472e1a36_v1",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5828",
    "opportunityName": "Mass Save - Small Business Direct Install Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5828/mass-save-small-business-direct-install-program",
    "websiteUrl": "https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments",
    "applicationUrl": "https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments",
    "administrator": "Mass Save Sponsors",
    "programType": "Direct Install / Rebate Program",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Berkshire Gas",
          "Cape Light Compact",
          "Eversource",
          "Liberty",
          "National Grid",
          "Unitil"
        ],
        "notes": "Available through participating Mass Save Sponsors for qualifying small business accounts in Massachusetts."
      },
      "eligibleApplicantTypes": [
        "small_business_customer",
        "commercial_customer",
        "nonprofit",
        "landlord",
        "renter"
      ],
      "eligibleSectors": [
        "small_business",
        "commercial",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "high_efficiency_refrigeration_equipment",
        "motor_drive_controls",
        "compressed_air_efficiency",
        "pipe_insulation",
        "low_flow_showerhead",
        "low_flow_aerator",
        "high_efficiency_water_heating",
        "heating_controls_retrofit",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Business must be served by a participating Mass Save Sponsor.",
        "Small business eligibility generally depends on annual electric or gas usage thresholds.",
        "A no-cost assessment and sponsor Energy Savings Proposal are typically required before installation.",
        "Measures and incentive levels depend on sponsor approval and the assessment results.",
        "Renter and landlord participation may require property-owner authorization."
      ],
      "blockers": [
        "Do not match single-family residential home weatherization under this business program.",
        "Customers above the small-business usage thresholds may need a different Mass Save pathway.",
        "Exact measures are not guaranteed until the assessment and proposal are completed.",
        "Do not infer measures outside Mass Save Sponsor-approved business offerings."
      ],
      "programType": "Direct Install / Rebate Program",
      "administrator": "Mass Save Sponsors",
      "applicationUrl": "https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments",
      "websiteUrl": "https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments",
      "sourceUrlsChecked": [
        "https://www.masssave.com/business/programs-and-services/building-energy-assessments/small-business-assessments",
        "https://www.masssave.com/business/rebates-offers-services/energy-assessments-technical-assistance/small-business-assessments",
        "https://www.masssave.com/business/solutions-by-sector/landlord-renters",
        "https://www.capelightcompact.org/program/business-energy-assessments/"
      ],
      "evidenceText": "Mass Save’s small business assessment pages describe no-cost assessments and Sponsor-supported upgrades such as air sealing, weatherization, lighting, HVAC, refrigeration, water heating, controls, and custom measures.",
      "reasoningNotes": "The original insulation, HVAC, and LED matches are supported for qualifying small businesses, but they depend on assessment findings and Sponsor approval rather than an unrestricted rebate catalog."
    },
    "existingSimpleRules": [
      {
        "id": "oir_715cf9650bebc2e9_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.7
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to 70% of eligible small-business upgrade costs",
        "evidenceText": "Mass Save small business assessment page says recommended upgrades are paid for up to 70% by the Sponsor.",
        "sourceUrlsChecked": [
          "https://www.masssave.com/business/programs-and-services/building-energy-assessments/small-business-assessments"
        ],
        "reasoningNotes": "Matched insulation and HVAC upgrade terms. Use only for qualifying direct-install small-business projects.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
    "opportunityName": "MassEVIP Workplace and Fleet Charging Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22186/massevip-workplace-and-fleet-charging-program",
    "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
    "applicationUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
    "administrator": "Massachusetts Department of Environmental Protection",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "ev charging",
          "electric vehicle charging",
          "evse"
        ]
      },
      {
        "retrofitTypeId": "fleet_charging_infrastructure",
        "displayName": "Fleet charging infrastructure",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fleet charging"
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Massachusetts program for eligible workplace and fleet charging sites."
      },
      "eligibleApplicantTypes": [
        "employers",
        "fleet_operators",
        "businesses",
        "nonprofits",
        "local_governments",
        "state_agencies",
        "educational_institutions"
      ],
      "eligibleSectors": [
        "commercial",
        "government",
        "nonprofit",
        "institutional",
        "fleet",
        "workplace"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_2_ev_charger_installation",
        "fleet_charging_infrastructure"
      ],
      "hardRequirements": [
        "Site must be an eligible Massachusetts workplace or fleet location.",
        "Applicant must be an eligible employer or fleet operator.",
        "Project must acquire and install qualifying Level 1 or Level 2 charging equipment.",
        "MassDEP application, approvals and required documentation are required.",
        "Reimbursement is subject to program cost-share limits and caps.",
        "Applicant must comply with workplace or fleet charging terms."
      ],
      "blockers": [
        "Public charging, DC fast charging and multifamily or private residential charging are handled by other MassEVIP programs.",
        "Non-workplace and non-fleet sites are not eligible for this specific program.",
        "Equipment installed outside program approval rules may be ineligible.",
        "Do not generalize this to all Massachusetts EV charging programs."
      ],
      "programType": "Grant",
      "administrator": "Massachusetts Department of Environmental Protection",
      "applicationUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
      "websiteUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
      "sourceUrlsChecked": [
        "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
        "https://www.mass.gov/doc/massevip-workplace-charging-requirements/download",
        "https://www.mass.gov/doc/massevip-frequently-asked-questions/download",
        "https://www.mass.gov/doc/matrix-of-massevip-grant-programs/download"
      ],
      "evidenceText": "MassEVIP materials describe Workplace and Fleet Charging as incentives for employers and fleet operators to acquire and install Level 1 and Level 2 charging; other MassEVIP programs cover public-access, MUD and fast charging.",
      "reasoningNotes": "The official page and MassDEP documents support workplace and fleet Level 1 and Level 2 charging. The main page was partly difficult to read, so confidence is medium rather than high."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5a87879ccf2b0959_v1",
        "incentiveType": "percent_of_basis_rebate",
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
        "formula": "60% of Level 1 or Level 2 EVSE hardware and installation costs, capped at $50,000 per address",
        "evidenceText": "MassEVIP Workplace & Fleet Charging provides up to 60% of costs, to $50,000 per street address.",
        "sourceUrlsChecked": [
          "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "https://www.mass.gov/how-to/apply-for-massevip-fleets-incentives"
        ],
        "reasoningNotes": "Matched workplace/fleet charging. Use eligible hardware and installation cost basis.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4595",
    "opportunityName": "Reading Municipal Light Department - Business Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4595/reading-municipal-light-department-business-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.rmld.com/207/Commercial-Rebates",
    "applicationUrl": "https://www.rmld.com/FormCenter/Rebates-16/Small-Commercial-Heat-Pump-Rebate-Progra-90",
    "administrator": "Reading Municipal Light Department",
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
          "MA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Reading Municipal Light Department service territory"
        ],
        "notes": "Applies to qualifying non-residential customer facilities served by RMLD."
      },
      "eligibleApplicantTypes": [
        "rmld_non_residential_customers",
        "commercial_customers",
        "industrial_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_heat_pump_hvac_retrofit",
        "air_source_heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "air_to_water_heat_pump",
        "high_efficiency_chiller_replacement",
        "efficient_motor_replacement",
        "variable_frequency_drive_retrofit",
        "compressed_air_efficiency_retrofit",
        "refrigeration_evaporator_fan_motor_or_controls",
        "refrigerated_air_dryer"
      ],
      "hardRequirements": [
        "Applicant must be an RMLD non-residential electric customer.",
        "Custom rebates require written preapproval before installation.",
        "Custom measures must be retrofits of existing equipment and must document estimated energy savings or demand reduction.",
        "Small commercial heat pump path is limited to buildings up to 5000 square feet and systems up to 10 tons.",
        "Heat pump equipment must meet listed qualified-product, AHRI, Manual J, permit, inspection and documentation requirements.",
        "Gas customers receiving Mass Save heat pump rebates are not eligible for the RMLD heat pump rebate."
      ],
      "blockers": [
        "Lighting fixtures, luminaires and lamps are excluded from the commercial custom rebate.",
        "Municipal LED holiday lighting is a separate limited program and should not create a general LED lighting match.",
        "Commercial EV charger, solar, energy assessment, demand response and new construction offerings are separate RMLD programs.",
        "Projects outside RMLD service territory are ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Reading Municipal Light Department",
      "applicationUrl": "https://www.rmld.com/FormCenter/Rebates-16/Small-Commercial-Heat-Pump-Rebate-Progra-90",
      "websiteUrl": "https://www.rmld.com/207/Commercial-Rebates",
      "sourceUrlsChecked": [
        "https://www.rmld.com/207/Commercial-Rebates",
        "https://www.rmld.com/313/Commercial-Heat-Pump-Rebate",
        "https://www.rmld.com/195/Commercial-Custom-Rebate",
        "https://www.rmld.com/FormCenter/Rebates-16/Small-Commercial-Heat-Pump-Rebate-Progra-90",
        "https://www.rmld.com/DocumentCenter/View/327/Appendix-G-RMLD-Energy-Efficiency-Conservation-and-Electrification-Programs-PDF"
      ],
      "evidenceText": "RMLD lists commercial heat pump and commercial custom rebates. Custom eligible examples include heat pump systems, chillers, motors, VFDs, compressed-air equipment and refrigeration fan controls, while lighting fixtures, luminaires and lamps are excluded from the custom rebate.",
      "reasoningNotes": "Preserved heat pump and high-efficiency nonresidential equipment matches, narrowed geothermal to qualifying heat pumps, and removed LED lighting except as a separate municipal holiday-lighting offering."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b0599a0fcce766f3_v1",
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
          "maxAmountCents": 600000
        },
        "confidence": "high",
        "formula": "$1,000 per ton for new commercial heat pump systems, capped at $6,000",
        "evidenceText": "RMLD commercial heat pump page lists $1,000 per ton for new systems up to $6,000.",
        "sourceUrlsChecked": [
          "https://www.rmld.com/207/Commercial-Rebates",
          "https://www.rmld.com/313/Commercial-Heat-Pump-Rebate"
        ],
        "reasoningNotes": "Matched heat pump term. Use unit_count as qualifying heat-pump tons.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22807",
    "opportunityName": "Taunton Municipal Lighting Plant - EV and Level 2 EV Charging Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22807/taunton-municipal-lighting-plant-ev-and-level-2-ev-charging-program",
    "websiteUrl": "https://www.tmlp.com/178/EV-Program",
    "applicationUrl": null,
    "administrator": "Taunton Municipal Lighting Plant",
    "programType": "Rebate And Bill Credit",
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
          "ev charging",
          "evse"
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
          "Taunton"
        ],
        "utilityTerritories": [
          "Taunton Municipal Lighting Plant"
        ],
        "notes": "Limited to eligible residential electric customers of TMLP."
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
        "Applicant must have an active residential TMLP electric account in good standing for the required account history period.",
        "Level 2 charger must be new and installed at the customer's residence.",
        "Installation must be performed by a licensed electrician or qualified professional where required.",
        "Rebate is limited to one Level 2 charger per household and is subject to application timing and funds availability."
      ],
      "blockers": [
        "LED lighting is not part of the EV and Level 2 EV Charging Program.",
        "Vehicle purchase rebates and off-peak charging credits are separate non-building measures within the EV program and should not be treated as charger installation.",
        "Level 1 chargers, DC fast chargers, used chargers, nonresidential accounts, and non-TMLP customers should not match."
      ],
      "programType": "Rebate And Bill Credit",
      "administrator": "Taunton Municipal Lighting Plant",
      "applicationUrl": null,
      "websiteUrl": "https://www.tmlp.com/178/EV-Program",
      "sourceUrlsChecked": [
        "https://www.tmlp.com/178/EV-Program",
        "https://tmlp-ev.ene.org/ev-charging-guide/"
      ],
      "evidenceText": "TMLP's EV program lists a Level 2 charger purchase and installation rebate, separate EV purchase rebates, and monthly off-peak charging credits.",
      "reasoningNotes": "Only the Level 2 charger installation category is a physical retrofit here. The LED match is a false positive."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e08ecce9fc4280fd_v1",
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
        "formula": "$300 per qualifying Level 2 EV charger",
        "evidenceText": "TMLP EV Program lists a Level 2 EV charger rebate of $300.",
        "sourceUrlsChecked": [
          "https://www.tmlp.com/178/EV-Program"
        ],
        "reasoningNotes": "Matched Level 2 EVSE terms. The separate off-peak monthly credit is excluded.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22740",
    "opportunityName": "Unitil (Electric) - EV Ready2Charge Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22740/unitil-electric-ev-ready2charge-rebate-program",
    "websiteUrl": "https://unitil.com/electric-vehicles/ev-Ready2Charge-program",
    "applicationUrl": "https://unitil.com/rebates/ev-ready2charge-residential-rebate-program-ma",
    "administrator": "Unitil Energy Systems",
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
        "cities": [],
        "utilityTerritories": [
          "Unitil Energy Systems",
          "Fitchburg Gas and Electric Light Company"
        ],
        "notes": "Massachusetts electric customers of Unitil, including Fitchburg Gas and Electric Light Company dba Unitil."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "income_qualified_customer",
        "commercial_customer",
        "public_charging_site_host",
        "business_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "public",
        "low_income"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charging_infrastructure",
        "dc_fast_charger_make_ready_infrastructure",
        "ev_managed_charging"
      ],
      "hardRequirements": [
        "Applicant must be a Unitil Massachusetts electric customer.",
        "Residential customers must receive approval before purchase or installation where program rules require it.",
        "Residential incentives apply to qualifying Level 2 home charging and may include eligible electric upgrades.",
        "Commercial projects must install required minimum charging equipment and meet public-access, networking, and activation rules.",
        "Commercial Ready2Charge incentives support make-ready infrastructure and related electric upgrades rather than EVSE purchase."
      ],
      "blockers": [
        "Commercial EVSE purchase itself is not eligible where the program only covers make-ready infrastructure.",
        "Level 1 chargers are not supported by the verified rebate categories.",
        "Non-Massachusetts Unitil customers should not match this opportunity.",
        "Commercial chargers lacking required public access, networking, or activation timing should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Unitil Energy Systems",
      "applicationUrl": "https://unitil.com/rebates/ev-ready2charge-residential-rebate-program-ma",
      "websiteUrl": "https://unitil.com/electric-vehicles/ev-Ready2Charge-program",
      "sourceUrlsChecked": [
        "https://unitil.com/electric-vehicles/ev-Ready2Charge-program",
        "https://unitil.com/rebates/ev-ready2charge-residential-rebate-program-ma",
        "https://unitil.com/rebates/ev-ready2charge-commercial-rebate-program-ma",
        "https://unitil.com/sites/default/files/2023-10/Ready2Charge-TCs-Residential.pdf",
        "https://unitil.com/sites/default/files/2023-11/Unitil-Ready2Charge-FAQs-MA-Commercial.pdf",
        "https://unitil.com/sites/default/files/2023-11/Application-Ready2Charge-Commercial-Customers.pdf",
        "https://programs.dsireusa.org/system/program/detail/22740/unitil-electric-ev-ready2charge-rebate-program"
      ],
      "evidenceText": "Unitil supports residential Level 2 charging rebates and commercial make-ready incentives for Level 2 or DCFC projects, with commercial public-access and equipment requirements.",
      "reasoningNotes": "Keep Level 2 charger matching for residential. Treat commercial DCFC as make-ready infrastructure support, not a direct DC fast charger equipment rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4d022333a46bf01e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 170000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 170000
        },
        "confidence": "medium",
        "formula": "Up to $1,700 for income-eligible residential Level 2 EV charger installation and related upgrades",
        "evidenceText": "Unitil Ready2Charge says income-eligible residential customers can receive up to $1,700 including related upgrades and charger cost.",
        "sourceUrlsChecked": [
          "https://unitil.com/electric-vehicles/ev-Ready2Charge-program",
          "https://unitil.com/rebates/ev-ready2charge-residential-rebate-program-ma"
        ],
        "reasoningNotes": "Returned separately because R2/income-eligible customers have a higher cap.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a544768da5db414d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 70000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 70000
        },
        "confidence": "medium",
        "formula": "Up to $700 for residential Level 2 EV charger installation and related upgrades",
        "evidenceText": "Unitil Ready2Charge says residential customers can receive up to $700 for installation including related electric upgrades.",
        "sourceUrlsChecked": [
          "https://unitil.com/electric-vehicles/ev-Ready2Charge-program",
          "https://unitil.com/rebates/ev-ready2charge-residential-rebate-program-ma"
        ],
        "reasoningNotes": "Matched residential Level 2 EV charging. Confidence is medium because project approval is required before purchase/installation.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4504",
    "opportunityName": "Delmarva Power - Home Performance with ENERGY STAR Incentive Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4504/delmarva-power-home-performance-with-energy-star-incentive-program",
    "websiteUrl": "https://homeenergysavings.delmarva.com/md/residential/home-performance-with-energy-star-program",
    "applicationUrl": null,
    "administrator": "Delmarva Power Maryland Home Energy Savings",
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
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Delmarva Power Maryland"
        ],
        "notes": "Limited to Delmarva Power Maryland residential electric customers in eligible one-to-four-unit homes."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners",
        "tenants_with_landlord_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "energy_star_windows_doors",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Customer must have an active Delmarva Power Maryland residential account.",
        "Home must be a primary residence and generally a single-family, townhome, rowhome, or one-to-four-unit dwelling.",
        "Participating Contractor must perform the Home Energy Assessment and eligible upgrades.",
        "Rebate eligibility is tied to qualifying modeled electric savings and program rules.",
        "Tenant applicants must obtain landlord permission."
      ],
      "blockers": [
        "Delaware Delmarva customers are outside this Maryland program.",
        "Commercial properties and multifamily buildings above the eligible residential dwelling limit are not supported.",
        "Do-it-yourself work outside the participating contractor process does not qualify for program incentives."
      ],
      "programType": "Rebate",
      "administrator": "Delmarva Power Maryland Home Energy Savings",
      "applicationUrl": null,
      "websiteUrl": "https://homeenergysavings.delmarva.com/md/residential/home-performance-with-energy-star-program",
      "sourceUrlsChecked": [
        "https://homeenergysavings.delmarva.com/md/residential/home-performance-with-energy-star-program",
        "https://homeenergysavings.delmarva.com/md/residential/home-performance-with-energy-star-program/rebates",
        "https://homeenergysavings.delmarva.com/md/residential/home-performance-with-energy-star-program/home-energy-assessment"
      ],
      "evidenceText": "Delmarva's Maryland Home Performance pages list a Home Energy Assessment and rebates for air sealing, insulation, HVAC, windows and doors, heat pump water heaters, duct sealing, and smart thermostats.",
      "reasoningNotes": "The original air sealing, insulation, and audit matches are valid. Additional supported home-performance measures should be included but kept residential and Maryland-specific."
    },
    "existingSimpleRules": [
      {
        "id": "oir_25deeb8b67968b4d_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.75
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 1000000
        },
        "confidence": "medium",
        "formula": "Up to 75% of air sealing and insulation job cost, capped at $10,000",
        "evidenceText": "Delmarva HPwES page lists air sealing and insulation rebates up to $10,000 or 75% of total project cost.",
        "sourceUrlsChecked": [
          "https://homeenergysavings.delmarva.com/md/residential/home-performance-with-energy-star-program/rebates"
        ],
        "reasoningNotes": "Matched insulation and air sealing terms. Medium because modeled savings may affect exact rebate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5696",
    "opportunityName": "SMECO- Small Business/Non-Profit Solutions",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5696/smeco-small-business-non-profit-solutions",
    "websiteUrl": "https://www.smeco.coop/energy-efficiency/commercial-programs/small-business/",
    "applicationUrl": null,
    "administrator": "Southern Maryland Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
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
          "Southern Maryland Electric Cooperative service territory"
        ],
        "notes": "Applies to SMECO small-business and nonprofit commercial customers in the cooperative service territory."
      },
      "eligibleApplicantTypes": [
        "small_business_customers",
        "nonprofit_customers",
        "smeco_commercial_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "nonprofit",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "commercial_refrigeration_efficiency_retrofit",
        "refrigeration_controls_retrofit",
        "vending_machine_controls",
        "vending_machine_refrigerated_controls"
      ],
      "hardRequirements": [
        "Applicant must be an eligible SMECO commercial small-business or nonprofit customer.",
        "Program begins with a no-cost energy analysis.",
        "Incentives are for retrofitting existing equipment and may cover up to the stated share of project cost.",
        "Measures must meet program specifications and availability limits.",
        "Preapproval is required before removing existing equipment or purchasing or installing proposed equipment when specified."
      ],
      "blockers": [
        "Residential customers are not eligible under this small-business and nonprofit record.",
        "High-efficiency refrigeration should be narrowed to refrigeration optimization, equipment or controls supported by SMECO program materials.",
        "Vending-machine controls are product-specific and should not generalize to all building controls.",
        "Commercial kitchen or HVAC measures should not be inferred from this record unless separately supported by SMECO program documentation.",
        "Projects outside SMECO service territory are ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Southern Maryland Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.smeco.coop/energy-efficiency/commercial-programs/small-business/",
      "sourceUrlsChecked": [
        "https://www.smeco.coop/energy-efficiency/commercial-programs/small-business/",
        "https://www.smeco.coop/energy-efficiency/commercial-programs/small-business/national-resource-management-small-business-refrigeration-intake-form/",
        "https://www.smeco.coop/energy-efficiency/commercial-programs/instant-savings/",
        "https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/",
        "https://www.smeco.coop/faqs_category/small-business-hvac-services/",
        "https://8832690.fs1.hubspotusercontent-na1.net/hubfs/8832690/Utility%20Rebates/SMECOrebates_02.08.24.pdf"
      ],
      "evidenceText": "SMECO describes Small Business Solutions as starting with a no-cost energy analysis and incentives up to 80 percent of retrofit costs. Official pages reference small-business refrigeration intake and refrigeration-equipment optimization.",
      "reasoningNotes": "Retained lighting, refrigeration and vending-machine control matches with medium confidence because some detailed measure documentation was less accessible than the main official program pages."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b000ee3d980cabee_v1",
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
          "maxPercentOfBasis": 0.8
        },
        "confidence": "medium",
        "formula": "Up to 80% of eligible small-business refrigeration retrofit costs",
        "evidenceText": "SMECO small business materials say rebates cover up to 80% of refrigeration retrofit costs.",
        "sourceUrlsChecked": [
          "https://www.smeco.coop/energy-efficiency/commercial-programs/small-business/",
          "https://www.smeco.coop/energy-efficiency/commercial-programs/business-solutions/"
        ],
        "reasoningNotes": "Matched refrigeration and vending-control terms. Use only for qualifying small-business or nonprofit refrigeration retrofit measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22704",
    "opportunityName": "Maine - Home Electrification and Appliance Rebate (HEAR) Program",
    "state": "ME",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22704/maine-home-electrification-and-appliance-rebate-hear-program",
    "websiteUrl": "https://www.efficiencymaine.com/IRA-Home-Energy-Rebates/",
    "applicationUrl": null,
    "administrator": "Efficiency Maine Trust",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "ME"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Maine program administered by Efficiency Maine, with initiative-specific limits for affordable multifamily properties and designated mobile-home locations."
      },
      "eligibleApplicantTypes": [
        "income_qualified_homeowner",
        "affordable_multifamily_owner",
        "affordable_housing_developer",
        "public_housing_authority",
        "lihtc_owner"
      ],
      "eligibleSectors": [
        "residential",
        "affordable_multifamily",
        "manufactured_housing"
      ],
      "eligibleRetrofitCategories": [
        "ducted_heat_pump",
        "mini_split_heat_pump",
        "variable_refrigerant_flow_heat_pump",
        "heat_pump_rooftop_unit",
        "single_package_heat_pump"
      ],
      "hardRequirements": [
        "Program is administered by Efficiency Maine under the federal Home Electrification and Appliance Rebates allocation.",
        "Current initiative focus is electrification of space heating with heat pump systems.",
        "Affordable multifamily projects must meet income-restricted property and unit-count requirements.",
        "Mobile-home initiative participants must meet income, residence, installer, preapproval, and location requirements.",
        "Projects must follow the applicable Efficiency Maine initiative rules and inspections."
      ],
      "blockers": [
        "Do not match industrial or process electrification equipment.",
        "Do not treat this as a general commercial rebate.",
        "Do not generalize to all HEAR appliance categories unless Efficiency Maine has opened that specific offer.",
        "Standard Efficiency Maine heat pump and insulation rebates are separate from the checked HEAR initiative pages.",
        "Mobile-home eligibility excludes several nonqualifying heating and housing situations."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Maine Trust",
      "applicationUrl": null,
      "websiteUrl": "https://www.efficiencymaine.com/IRA-Home-Energy-Rebates/",
      "sourceUrlsChecked": [
        "https://www.efficiencymaine.com/IRA-Home-Energy-Rebates/",
        "https://www.maine.gov/energy/initiatives/infrastructure/home-energy-rebates",
        "https://www.efficiencymaine.com/initiative-for-electrification-in-new-affordable-multifamily-housing/",
        "https://www.efficiencymaine.com/at-home/mobile-home-initiative/"
      ],
      "evidenceText": "Efficiency Maine and the state describe Maine HEAR as active, with current initiatives prioritizing heat pump space-heating electrification in new affordable multifamily housing and eligible mobile homes.",
      "reasoningNotes": "Heat pump HVAC categories are supported. The original process electrification match is a false positive because the official HEAR pages describe residential heat pump space-heating initiatives, not industrial process equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1532d349202bffe8_v1",
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
        "formula": "Up to $8,000 per heat pump for eligible HEAR projects",
        "evidenceText": "Efficiency Maine/DSIRE HEAR materials list up to $8,000 per unit for whole-house HVAC heat pump equipment.",
        "sourceUrlsChecked": [
          "https://www.efficiencymaine.com/ira-home-energy-rebates/"
        ],
        "reasoningNotes": "Matched heat pump/electrification target. Medium because HEAR amounts depend on income and housing/program pathway.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22329",
    "opportunityName": "Consumers Energy - PowerMIDrive Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22329/consumers-energy-powermidrive-program",
    "websiteUrl": "https://www.consumersenergy.com/residential/programs-and-services/electric-vehicles/powermidrive",
    "applicationUrl": null,
    "administrator": "Consumers Energy",
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
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Consumers Energy"
        ],
        "notes": "Applies within Consumers Energy electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "commercial_electric_customers",
        "multifamily_property_owners_operators",
        "hospitality_site_owners",
        "workplace_site_owners",
        "fleet_operators",
        "municipal_or_public_site_hosts"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily",
        "government",
        "fleet",
        "workplace"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Consumers Energy electric customer or eligible site host in Consumers Energy territory.",
        "Residential rebate requires purchase, lease, or preorder of an EV or plug-in hybrid and installation of qualified Level 2 charging at the primary residence.",
        "Commercial Level 2 projects must meet site, port, installation, data, signage, parking, and timing requirements.",
        "DC fast charging rebates are for eligible commercial DCFC projects.",
        "Projects must follow Consumers Energy PowerMIDrive terms and conditions."
      ],
      "blockers": [
        "Level 1 chargers and portable connectors are not supported by the checked rebate pages.",
        "Commercial and residential incentive tracks have different eligibility rules and caps.",
        "Sites outside Consumers Energy electric territory do not qualify."
      ],
      "programType": "Rebate",
      "administrator": "Consumers Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.consumersenergy.com/residential/programs-and-services/electric-vehicles/powermidrive",
      "sourceUrlsChecked": [
        "https://www.consumersenergy.com/residential/programs-and-services/electric-vehicles/powermidrive",
        "https://www.consumersenergy.com/residential/savings-and-clean-energy/electric-vehicles/home-charger-rebates",
        "https://www.consumersenergy.com/residential/programs-and-services/electric-vehicles/level-2-charging-station-rebates",
        "https://www.consumersenergy.com/residential/programs-and-services/electric-vehicles/dc-fast-charger-rebates",
        "https://www.consumersenergy.com/-/media/CE/Documents/residential/programs-and-services/electric-vehicles/powermidrive-commercial-terms-and-conditions.pdf"
      ],
      "evidenceText": "Consumers Energy lists residential Level 2 home charger rebates and commercial public Level 2 and DC fast charging incentives under PowerMIDrive, each with separate eligibility requirements.",
      "reasoningNotes": "Original EV charging matches are correct when narrowed to Level 2 and DC fast charging. Generic EV charger installation should not include unsupported Level 1 or portable equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_cf535e95647fd773_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 7000000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$70,000 per eligible unit",
        "evidenceText": "Apply for Public Level 2 Rebate Public DC Fast Charger Rebate Commercial customers can get up to $70,000 for installing a public DC Fast charger",
        "sourceUrlsChecked": [
          "https://www.consumersenergy.com/residential/programs-and-services/electric-vehicles/powermidrive"
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
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3366",
    "opportunityName": "CenterPoint Energy (Gas) - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3366/centerpoint-energy-gas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates?sa=mn",
    "applicationUrl": null,
    "administrator": "CenterPoint Energy",
    "programType": "Residential Energy Efficiency Rebate",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "CenterPoint Energy"
        ],
        "notes": "Minnesota CenterPoint Energy residential natural gas service territory."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Minnesota CenterPoint Energy residential customer.",
        "Air sealing and insulation rebates require qualifying work by a Rebate Eligible Installer.",
        "Air sealing and insulation projects require required testing and documentation, including blower-door testing where specified.",
        "Attic insulation alone is not eligible unless paired with qualifying air sealing under current rules.",
        "Thermostats must meet CenterPoint's current thermostat rebate requirements."
      ],
      "blockers": [
        "Do not match electric-only HVAC or commercial measures to this CenterPoint gas residential program.",
        "Attic insulation-only work is not eligible under current air sealing and insulation rules.",
        "Windows, loans, laundry, water heaters and other CenterPoint offerings are separate listings and should not be inferred from this target."
      ],
      "programType": "Residential Energy Efficiency Rebate",
      "administrator": "CenterPoint Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates?sa=mn",
      "sourceUrlsChecked": [
        "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates?sa=mn",
        "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates/air-sealing-insulation-rebates?sa=mn"
      ],
      "evidenceText": "CenterPoint Minnesota's residential efficiency pages list air sealing and insulation rebates, thermostat rebates and other residential offerings; the air sealing and insulation page requires qualifying installer work and excludes attic insulation alone.",
      "reasoningNotes": "The supplied categories are supported when restricted to Minnesota CenterPoint residential gas customers and measure-specific requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d99f2db574a7fd84_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 300000
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 300000
        },
        "confidence": "medium",
        "formula": "Up to $3,000 for qualifying air sealing and insulation",
        "evidenceText": "CenterPoint Minnesota air sealing and insulation page says rebates are available up to $3,000.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates/air-sealing-insulation-rebates?sa=mn",
          "https://www.centerpointenergy.com/en-us/Documents/2026-Air-Sealing-and-Insulation-Rebate-Application.pdf"
        ],
        "reasoningNotes": "Matched insulation and air sealing terms. Modeled as project-level maximum; exact amount depends on installer and measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2932",
    "opportunityName": "Evergy - Residential Rebate Programs",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2932/evergy-residential-rebate-programs",
    "websiteUrl": "https://www.evergy.com/ways-to-save/discounts",
    "applicationUrl": null,
    "administrator": "Evergy",
    "programType": "Rebate",
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Evergy Missouri"
        ],
        "notes": "This repair reflects the residential Missouri rebate context in the DSIRE target; Evergy availability depends on customer location."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners",
        "residential_developers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Evergy residential customer or qualifying residential developer in Missouri.",
        "EV charging rebate supports Level 2 home charging or qualifying 240-volt charging upgrades.",
        "Smart thermostat incentives require eligible smart thermostat equipment and program enrollment or marketplace eligibility.",
        "Rebate availability and details depend on the customer's Evergy location."
      ],
      "blockers": [
        "Evergy commercial EV charging rebates are separate and should not be merged into this residential program.",
        "Public DC fast charging, fleet charging, and employee or tenant commercial projects are not part of this residential record.",
        "Manual thermostats or non-connected thermostat replacements are not supported as smart thermostat retrofits."
      ],
      "programType": "Rebate",
      "administrator": "Evergy",
      "applicationUrl": null,
      "websiteUrl": "https://www.evergy.com/ways-to-save/discounts",
      "sourceUrlsChecked": [
        "https://www.evergy.com/ways-to-save/discounts",
        "https://www.evergy.com/ways-to-save/discounts-link/ev-charging",
        "https://www.evergy.com/ways-to-save/discounts/thermostats",
        "https://www.evergy.com/ways-to-save/discounts-link/thermostats/thermostat-program-details",
        "https://www.evergy.com/ways-to-save/incentives-link/ev-charging-rebates",
        "https://www.evergy.com/ways-to-save/incentives-link/ev-charging-rebates/residential-developer/developer-ev-rebate-application"
      ],
      "evidenceText": "Evergy residential discount pages list smart thermostats and Level 2 home EV charging. Separate Evergy pages cover commercial EV charging rebates for businesses.",
      "reasoningNotes": "Keep residential Level 2 charging and smart thermostat categories. Block commercial EV and fleet categories as a separate Evergy program boundary."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9e8e23b1c8b9c3a4_v1",
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
          "maxAmountCents": 50000
        },
        "confidence": "high",
        "formula": "Up to $500 toward a 240-volt outlet or hardwired Level 2 charger",
        "evidenceText": "Evergy residential EV charging rebate page says customers can get up to $500 toward 240-volt Level 2 charging.",
        "sourceUrlsChecked": [
          "https://www.evergy.com/ways-to-save/discounts-link/ev-charging",
          "https://www.evergy.com/-/media/documents/ways-to-save/discounts/residentialevchargingrebatetermsandconditionsks.pdf"
        ],
        "reasoningNotes": "Matched EV charging and Level 2 terms. Use one unit as one qualifying EV outlet or hardwired charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3939",
    "opportunityName": "Independence Power and Light - Commercial Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3939/independence-power-and-light-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.independencemo.gov/customers/commercial-programs",
    "applicationUrl": "https://www.independencemo.gov/sites/default/files/2023-08/Commercial%20Rebate%20Prescriptive%20Application.pdf",
    "administrator": "Independence Power and Light",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
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
          "MO"
        ],
        "counties": [],
        "cities": [
          "Independence"
        ],
        "utilityTerritories": [
          "Independence Power and Light"
        ],
        "notes": "Available to qualifying nonresidential Independence Power and Light customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "nonresidential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_air_conditioning",
        "lighting_controls_retrofit",
        "fluorescent_lighting_retrofit",
        "hid_lighting_retrofit",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be an existing or new Independence Power and Light customer not eligible for residential rates.",
        "Customer must be current on utility payments and not shut off for non-payment.",
        "Prescriptive projects generally require application review and pre-inspection before work begins.",
        "Custom projects must meet payback and cost-effectiveness requirements.",
        "Program-year incentive caps and project-cost caps apply."
      ],
      "blockers": [
        "Residential customers are not eligible.",
        "LED lighting is not listed as a current prescriptive category on the checked application and should only match if custom-approved.",
        "Do not match generic HVAC; current prescriptive HVAC scope is air conditioning.",
        "Work started before approval may be ineligible except where the program expressly allows recent air-conditioning replacement."
      ],
      "programType": "Rebate Program",
      "administrator": "Independence Power and Light",
      "applicationUrl": "https://www.independencemo.gov/sites/default/files/2023-08/Commercial%20Rebate%20Prescriptive%20Application.pdf",
      "websiteUrl": "https://www.independencemo.gov/customers/commercial-programs",
      "sourceUrlsChecked": [
        "https://www.independencemo.gov/government/city-departments/power-and-light/commercial-programs",
        "https://www.independencemo.gov/customers/commercial-programs",
        "https://www.independencemo.gov/sites/default/files/2023-08/Commercial%20Rebate%20Prescriptive%20Application.pdf"
      ],
      "evidenceText": "Independence’s commercial page and prescriptive application cover air-conditioning measures, lighting technologies, occupancy-sensor controls, and custom efficiency projects for nonresidential IPL customers.",
      "reasoningNotes": "Lighting controls and air-conditioning are supported. The original LED match is not preserved because the checked current prescriptive form lists fluorescent, HID, and controls rather than LED as a named prescriptive measure."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3777be7b6a5f4a71_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.3
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 2000000
        },
        "confidence": "high",
        "formula": "30% of eligible project cost, capped at $20,000",
        "evidenceText": "Custom Rebates Rebates are available for projects that do not fit into prescriptive rebate categories can be submitted through the Custom Rebate Application Rebate Amount Business and industrial customers are eligible for a maximum of $20,000, or 30% of the total project cost (whichever is less), per program year",
        "sourceUrlsChecked": [
          "https://www.independencemo.gov/government/city-departments/power-and-light/commercial-programs"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:21868",
    "opportunityName": "Atmos Energy (Gas) Industrial and Commercial Rebate Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/21868/atmos-energy-gas-industrial-and-commercial-rebate-program",
    "websiteUrl": "https://www.atmosenergy.com/ways-to-save/mississippi-smartchoice-appliance-rebates/",
    "applicationUrl": null,
    "administrator": "Atmos Energy and CLEAResult",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "burner",
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
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Atmos Energy Mississippi gas service territory"
        ],
        "notes": "Available to qualifying Atmos Energy business and industrial natural-gas customers in Mississippi."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business",
        "nonprofit",
        "government_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public_sector",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "commercial_natural_gas_furnace",
        "commercial_natural_gas_water_heater",
        "commercial_smart_thermostat",
        "boiler_tune_up",
        "boiler_burner_replacement",
        "boiler_reset_controls",
        "boiler_vent_damper",
        "boiler_cut_out_controls",
        "natural_gas_backup_generator",
        "commercial_natural_gas_cooking_equipment",
        "custom_commercial_industrial_gas_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be an Atmos Energy business or industrial natural-gas customer in Mississippi.",
        "Equipment must be qualifying natural-gas equipment or an approved custom gas-efficiency project.",
        "Boiler component rebates require eligible boiler controls, burner, damper, cut-out, or tune-up measures according to current forms.",
        "Custom large business and industrial projects require preapproval and may include technical assistance under Atmos program rules.",
        "Required receipts, contractor information, and rebate forms must be submitted within program deadlines."
      ],
      "blockers": [
        "Do not match residential appliances to this commercial and industrial record.",
        "Do not match electric HVAC, heat pumps, or broad high_efficiency_hvac_replacement.",
        "Do not match boiler categories unless the project is specifically a qualifying gas boiler tune-up or listed boiler component measure.",
        "Do not match projects outside Atmos Energy's Mississippi gas territory."
      ],
      "programType": "Rebate Program",
      "administrator": "Atmos Energy and CLEAResult",
      "applicationUrl": null,
      "websiteUrl": "https://www.atmosenergy.com/ways-to-save/mississippi-smartchoice-appliance-rebates/",
      "sourceUrlsChecked": [
        "https://www.atmosenergy.com/ways-to-save/mississippi-smartchoice-appliance-rebates/",
        "https://atmosenergy.clearesult.com/",
        "https://www.atmosenergy.com/document/ms-com-ind-boiler-tune-rebate-2022/",
        "https://www.atmosenergy.com/document/ms-com-ind-boiler-component-rebate-2022/",
        "https://www.atmosenergy.com/document/ms-com-ind-heating-rebate-2022/"
      ],
      "evidenceText": "Atmos]( Mississippi SmartChoice business and industrial materials list commercial natural-gas equipment, boiler tune-up and component rebates, backup generators, commercial foodservice equipment, and custom gas-efficiency projects.",
      "reasoningNotes": "The boiler controls and burner matches are supported. Generic HVAC replacement is too broad because the program is for specified natural-gas equipment and custom gas-efficiency measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0faade28e8dd3bd0_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.25
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 350000
        },
        "confidence": "high",
        "formula": "25% of eligible project cost, capped at $3,500",
        "evidenceText": "Eligible Equipment Rebate Amount Boiler Tune-Up $100/system Boiler Burner Replacement $1,000/MM BTU/hr* Boiler Reset Controls $150/unit** Boiler Vent Damper $250/unit** Boiler Cut Out Controls $150/unit** Natural Gas Backup Generator $200/$150 per kW Click here for additional generator rebate information * up to $3,500 ** not to exceed 25% of equipment cost Rebate Forms Download the appropriate rebate form below",
        "sourceUrlsChecked": [
          "https://www.atmosenergy.com/ways-to-save/mississippi-smartchoice-appliance-rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:21867",
    "opportunityName": "Atmos Energy (Gas) Residential Appliance Rebate Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/21867/atmos-energy-gas-residential-appliance-rebate-program",
    "websiteUrl": "https://www.atmosenergy.com/ways-to-save/mississippi-smartchoice-appliance-rebates/",
    "applicationUrl": "https://atmosenergy.clearesult.com/",
    "administrator": "Atmos Energy and CLEAResult",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Atmos Energy Mississippi gas service territory"
        ],
        "notes": "Available to qualifying Atmos Energy residential natural-gas customers in Mississippi."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_natural_gas_furnace",
        "residential_natural_gas_tankless_water_heater",
        "residential_natural_gas_condensing_storage_water_heater",
        "residential_natural_gas_storage_water_heater",
        "residential_natural_gas_clothes_dryer",
        "programmable_thermostat",
        "smart_thermostat",
        "residential_natural_gas_backup_generator"
      ],
      "hardRequirements": [
        "Applicant must be an Atmos Energy residential natural-gas customer in Mississippi.",
        "Equipment must be a qualifying natural-gas appliance or thermostat listed by Atmos Mississippi SmartChoice.",
        "Rebate form or online submission must include required receipts, model information, and contractor or installer documentation where required.",
        "Equipment must meet program efficiency and installation requirements and be submitted within program deadlines."
      ],
      "blockers": [
        "Energy audit is not an eligible physical retrofit under the current residential appliance rebate and should not match this record.",
        "Do not match broad high_efficiency_hvac_replacement; only qualifying residential natural-gas furnace or listed gas appliance measures should match.",
        "Do not match electric heat pumps, electric water heaters, commercial kitchen equipment, or commercial boiler measures.",
        "Projects outside Atmos Energy's Mississippi gas service territory are ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Atmos Energy and CLEAResult",
      "applicationUrl": "https://atmosenergy.clearesult.com/",
      "websiteUrl": "https://www.atmosenergy.com/ways-to-save/mississippi-smartchoice-appliance-rebates/",
      "sourceUrlsChecked": [
        "https://www.atmosenergy.com/ways-to-save/mississippi-smartchoice-appliance-rebates/",
        "https://atmosenergy.clearesult.com/",
        "https://www.atmosenergy.com/document/ms-thermostat-rebate-application-2022/"
      ],
      "evidenceText": "Atmos]( Mississippi SmartChoice residential materials list rebates for gas furnaces, gas water heaters, gas clothes dryers, programmable or smart thermostats, and backup generators.",
      "reasoningNotes": "The thermostat match is valid. Energy audit is a false positive, and broad HVAC should be narrowed to qualifying residential natural-gas furnace measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_198ff73b173815b6_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.25
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 350000
        },
        "confidence": "high",
        "formula": "25% of eligible project cost, capped at $3,500",
        "evidenceText": "Eligible Equipment Rebate Amount Boiler Tune-Up $100/system Boiler Burner Replacement $1,000/MM BTU/hr* Boiler Reset Controls $150/unit** Boiler Vent Damper $250/unit** Boiler Cut Out Controls $150/unit** Natural Gas Backup Generator $200/$150 per kW Click here for additional generator rebate information * up to $3,500 ** not to exceed 25% of equipment cost Rebate Forms Download the appropriate rebate form below",
        "sourceUrlsChecked": [
          "https://www.atmosenergy.com/ways-to-save/mississippi-smartchoice-appliance-rebates#atmos-accordion-item-1"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2222",
    "opportunityName": "Coast Electric Power Association - Comfort Advantage Home Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2222/coast-electric-power-association-comfort-advantage-home-program",
    "websiteUrl": "https://coastelectric.coop/comfort-advantage/",
    "applicationUrl": null,
    "administrator": "Coast Electric Power Association",
    "programType": "Residential Heat Pump Rebate",
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
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Coast Electric Power Association"
        ],
        "notes": "Available to qualifying Coast Electric residential members and qualifying new or existing homes or apartments under Comfort Advantage rules."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "multifamily_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "heat_pump_hvac_retrofit",
        "energy_efficient_new_home_heat_pump_standard"
      ],
      "hardRequirements": [
        "New homes and apartments must meet Comfort Advantage energy-efficient construction guidelines.",
        "Existing-home incentives apply to qualifying conversions from gas or electric furnaces or older low-efficiency heat pumps to new heat pump systems.",
        "Qualifying systems must meet minimum efficiency and ARI certification requirements.",
        "Geothermal or water-source heat pump adders apply only where the current program form allows."
      ],
      "blockers": [
        "Do not match non-heat-pump high-efficiency HVAC equipment.",
        "Geothermal match is limited to geothermal or water-source heat pump equipment, not unrelated ground-loop work.",
        "Business Comfort Advantage forms or other commercial programs should be kept separate."
      ],
      "programType": "Residential Heat Pump Rebate",
      "administrator": "Coast Electric Power Association",
      "applicationUrl": null,
      "websiteUrl": "https://coastelectric.coop/comfort-advantage/",
      "sourceUrlsChecked": [
        "https://coastelectric.coop/comfort-advantage/",
        "https://coastelectric.coop/wp-content/uploads/2023/05/CA-incentive-flyer-Revised-with-Apartments-5-16-23.pdf.pdf"
      ],
      "evidenceText": "Coast]( Electric Comfort Advantage materials identify energy-efficient home and apartment incentives centered on heat pump systems, including air-source, geothermal, and water-source heat pumps under program rules.",
      "reasoningNotes": "The supplied heat pump and geothermal categories are supported. Generic high-efficiency HVAC should remain limited to qualifying heat pump systems."
    },
    "existingSimpleRules": [
      {
        "id": "oir_87e1ec74d061a880_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 50000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$500 per Comfort Advantage Plus qualifying home",
        "evidenceText": "Coast Electric Comfort Advantage materials list $500 for Comfort Advantage Plus homes.",
        "sourceUrlsChecked": [
          "https://coastepa.com/rebates/",
          "https://coastepa.com/wp-content/uploads/Comfort-Advantage-Program.pdf"
        ],
        "reasoningNotes": "Matched heat pump and efficiency home terms. Modeled as whole-home certification amount, not a per-equipment rule.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b92cdd46a97121f9_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 100000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$1,000 for a Comfort Advantage Plus home with geothermal heat pump",
        "evidenceText": "Coast Electric Comfort Advantage materials list a geothermal-home incentive of $1,000.",
        "sourceUrlsChecked": [
          "https://coastepa.com/rebates/",
          "https://coastepa.com/wp-content/uploads/Comfort-Advantage-Program.pdf"
        ],
        "reasoningNotes": "Matched geothermal term. Returned separately because geothermal qualifying homes receive a higher amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22338",
    "opportunityName": "Entergy Mississippi - eTech Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22338/entergy-mississippi-etech-program",
    "websiteUrl": "https://entergyetech.com/electric-vehicles",
    "applicationUrl": "https://entergyetech.com/apply-online",
    "administrator": "Entergy Mississippi",
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
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Entergy Mississippi"
        ],
        "notes": "Available to qualifying Entergy Mississippi customers in Entergy's Mississippi electric service territory; the eTech site is shared across Entergy operating companies."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "commercial_customers",
        "dealers",
        "fleet_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "transportation",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying Entergy customer with an Entergy account number.",
        "Level 2 charger must be ENERGY STAR certified.",
        "Application may be submitted by customer or dealer.",
        "Dated equipment invoice or proof of purchase must be within the program lookback period.",
        "EV charging projects require an installation invoice or a photo showing installed chargers.",
        "Residential customers are limited to two chargers for separate EVs or locations.",
        "DC fast charger incentive amount depends on charger power level."
      ],
      "blockers": [
        "Hydrogen fueling and stationary fuel cell systems are not part of this eTech EV charging incentive.",
        "Replacement of older equivalent electric equipment does not qualify.",
        "Chargers outside Entergy Mississippi service or without a qualifying Entergy account are ineligible.",
        "Other eTech electrification measures are separate electric equipment categories and should not be generalized into EV charging.",
        "Entergy New Orleans-specific EV charging caps and bonus rules should not be applied to Mississippi customers."
      ],
      "programType": "Rebate Program",
      "administrator": "Entergy Mississippi",
      "applicationUrl": "https://entergyetech.com/apply-online",
      "websiteUrl": "https://entergyetech.com/electric-vehicles",
      "sourceUrlsChecked": [
        "https://entergyetech.com/electric-vehicles",
        "https://entergyetech.com/",
        "https://entergyetech.com/apply-online"
      ],
      "evidenceText": "The eTech EV page offers all Entergy customers incentives for ENERGY STAR Level 2 chargers and DC fast chargers. The application requires an Entergy account, recent invoice or proof of purchase, and EV charger installation documentation.",
      "reasoningNotes": "Kept Level 2 and DC fast charging. Removed fuel-cell implications because the page supports EV chargers, not fuel cell systems or hydrogen fueling."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a9aa961c28a75909_v1",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3916",
    "opportunityName": "Montana-Dakota Utilities - Commercial Energy Efficiency Incentive Program",
    "state": "MT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3916/montana-dakota-utilities-commercial-energy-efficiency-incentive-program",
    "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/",
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
          "MT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Montana-Dakota Utilities Co."
        ],
        "notes": "This repair is limited to Montana commercial gas and electric customers of Montana-Dakota Utilities."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "nonresidential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "fluorescent_lighting_retrofit",
        "custom_natural_gas_efficiency_project",
        "custom_electric_efficiency_project"
      ],
      "hardRequirements": [
        "Customer must be an eligible Montana commercial customer of Montana-Dakota Utilities.",
        "Furnace rebate applies to replacement of an existing natural gas furnace with qualifying high-efficiency equipment.",
        "Fuel conversion and new construction are not eligible for the Montana furnace rebate.",
        "Lighting incentives require an active Montana MDU electric account and current lighting application requirements.",
        "Custom gas and electric projects require preapproval and savings or economics review.",
        "Funding is limited and program terms may change."
      ],
      "blockers": [
        "Do not match North Dakota or Wyoming commercial customers; MDU states no commercial incentives there on the checked page.",
        "South Dakota commercial gas incentives are separate from this Montana target record.",
        "Do not match generic HVAC replacement beyond the verified high-efficiency natural gas furnace rebate or custom-approved projects.",
        "Montana large electric customers are not eligible for the lighting program due to funding rules.",
        "Work lacking required preapproval or documentation may be ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Montana-Dakota Utilities Co.",
      "applicationUrl": null,
      "websiteUrl": "https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/",
      "sourceUrlsChecked": [
        "https://www.montana-dakota.com/energy-efficiency/savings-for-your-business/",
        "https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022-01_MDU-MT_CommHeating.pdf",
        "https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022-01_MDU-MT_CommercialCustom.pdf",
        "https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022_MDU_MT_CommlLighting.pdf",
        "https://www.montana-dakota.com/wp-content/uploads/PDFs/Conservation/commercial/2022/2022_MT_CommercialElectricPartnership.pdf"
      ],
      "evidenceText": "Montana-Dakota’s business page lists Montana commercial natural gas furnace and custom gas incentives, plus Montana commercial electric lighting and partnership incentives with preapproval and funding limits.",
      "reasoningNotes": "The furnace and lighting matches are supported. Generic high-efficiency HVAC should be narrowed to the listed natural gas furnace rebate or custom-approved business efficiency projects."
    },
    "existingSimpleRules": [
      {
        "id": "oir_392db832e862a141_v1",
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
          "http://www.montana-dakota.com/conservation/savings-for-your-business",
          "https://www.montana-dakota.com/conservation/commercial-rebates/"
        ],
        "reasoningNotes": "Matched furnace term. Confidence is medium because detailed current application table should be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22199",
    "opportunityName": "It Pay$ to Plug in Program",
    "state": "NJ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22199/it-pay-to-plug-in-program",
    "websiteUrl": "https://dep.nj.gov/drivegreen/it-pays-to-plug-in/",
    "applicationUrl": "https://njdepsage.intelligrants.com/",
    "administrator": "New Jersey Department of Environmental Protection",
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
          "NJ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide New Jersey program for eligible workplace, public, multifamily, corridor and community charging locations."
      },
      "eligibleApplicantTypes": [
        "businesses",
        "government_agencies",
        "local_governments",
        "state_agencies",
        "nonprofits",
        "educational_institutions",
        "multifamily_property_owners",
        "fleet_operators"
      ],
      "eligibleSectors": [
        "commercial",
        "government",
        "nonprofit",
        "education",
        "multifamily",
        "workplace",
        "public_parking",
        "fleet"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must apply through NJDEP SAGE.",
        "Grant agreement must be executed before purchase or installation.",
        "Location must be an eligible workplace, public, multifamily dwelling, corridor or community charging site.",
        "Applicant must obtain and submit required quotes and documentation.",
        "Level 1 and Level 2 equipment must meet ENERGY STAR requirements where applicable.",
        "Project must meet installation and operational deadlines and program funding caps."
      ],
      "blockers": [
        "Private single-family dwellings are excluded.",
        "Completed projects are not eligible.",
        "DC fast charging funding may be solicited or waitlisted separately from Level 1 and Level 2 funding.",
        "Utility make-ready and utility eMobility programs are separate from this NJDEP grant."
      ],
      "programType": "Grant",
      "administrator": "New Jersey Department of Environmental Protection",
      "applicationUrl": "https://njdepsage.intelligrants.com/",
      "websiteUrl": "https://dep.nj.gov/drivegreen/it-pays-to-plug-in/",
      "sourceUrlsChecked": [
        "https://dep.nj.gov/drivegreen/it-pays-to-plug-in/",
        "https://dep.nj.gov/grantandloanprograms/it-pays-to-plug-in-njs-electric-vehicle-charging-grant-program/",
        "https://njdepsage.intelligrants.com/"
      ],
      "evidenceText": "NJDEP says the program funds EV charging stations for workplaces, public places, MUDs and DC fast charging; private single-family dwellings are excluded and grant execution must precede purchase or installation.",
      "reasoningNotes": "All EV charger categories are supported, but eligibility is site-specific and not a residential single-family rebate."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4baf6d79f7264541_v1",
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
        "formula": "Up to $750 per Level 1 charging port",
        "evidenceText": "NJDEP It Pay$ to Plug In page lists reimbursement up to $750 per Level 1 charging port.",
        "sourceUrlsChecked": [
          "https://dep.nj.gov/drivegreen/it-pays-to-plug-in/"
        ],
        "reasoningNotes": "Returned separately for eligible Level 1 EVSE projects.",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_9f47126dbd650064_v1",
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
        "cap": null,
        "confidence": "high",
        "formula": "Up to $4,000 per Level 2 charging port",
        "evidenceText": "NJDEP It Pay$ to Plug In page lists reimbursement up to $4,000 per Level 2 charging port.",
        "sourceUrlsChecked": [
          "https://dep.nj.gov/drivegreen/it-pays-to-plug-in/"
        ],
        "reasoningNotes": "Matched EVSE and Level 2 terms. Use one unit as one eligible charging port.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22406",
    "opportunityName": "PNM EV Charger Rebate Program",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22406/pnm-ev-charger-rebate-program",
    "websiteUrl": "https://ev.pnm.com/",
    "applicationUrl": "https://apply4rebates.pnm.com/Apply/pnm/",
    "administrator": "PNM",
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
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "PNM electric service territory"
        ],
        "notes": "PNM Transportation Electrification Program Marketplace serves eligible PNM residential, commercial, multifamily and income-qualified sites in New Mexico."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "income_qualified_customers",
        "commercial_customers",
        "businesses",
        "multifamily_property_owners",
        "fleet_operators",
        "mass_transit_agencies"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential",
        "commercial",
        "multifamily",
        "workplace",
        "fleet",
        "public_parking",
        "mass_transit"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_make_ready_electrical_upgrade",
        "fleet_charging_infrastructure"
      ],
      "hardRequirements": [
        "Applicant must be an eligible PNM customer at an eligible site.",
        "Equipment must be on the qualified product list or meet program requirements.",
        "Applicant must use the program authorized contractor, Easy Install path or online application as required.",
        "Residential charger rebates support Level 2 equipment.",
        "Commercial DC fast charging rebates are for eligible fleet or public use.",
        "Multifamily projects with five or more units use the multifamily Level 2 pathway.",
        "Income-qualified incentives require income qualification documentation.",
        "Separate EV rates may require dedicated or separate metering."
      ],
      "blockers": [
        "Level 1 residential chargers are not supported by the current rebate materials.",
        "DC fast charging is not for single-family or multifamily residential use.",
        "E-bike rebates are separate and currently exhausted.",
        "EV purchase rebates are separate from charger rebates.",
        "Chargers must be qualified and within posted program limits."
      ],
      "programType": "Rebate",
      "administrator": "PNM",
      "applicationUrl": "https://apply4rebates.pnm.com/Apply/pnm/",
      "websiteUrl": "https://ev.pnm.com/",
      "sourceUrlsChecked": [
        "https://ev.pnm.com/",
        "https://ev.pnm.com/residential-ev-charger-rebates/",
        "https://ev.pnm.com/commercial/",
        "https://ev.pnm.com/multifamily/",
        "https://ev.pnm.com/income-qualified/",
        "https://apply4rebates.pnm.com/Apply/pnm/"
      ],
      "evidenceText": "PNM’s current marketplace and application list residential Level 2 charger and installation rebates, commercial Level 2 and DC Fast rebates, and multifamily Level 2 rebates, with higher income-qualified incentives.",
      "reasoningNotes": "The original EV charger, Level 2 and DC fast categories are supported. Add make-ready and fleet infrastructure where supported by installation assistance and commercial fleet charging pathways."
    },
    "existingSimpleRules": [
      {
        "id": "oir_45b29577384de92f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "Up to $50,000 per public DC fast charger",
        "evidenceText": "PNM commercial handbook caps public DCFC rebates at 100% of project costs, up to $50,000 per DCFC.",
        "sourceUrlsChecked": [
          "https://apply4rebates.pnm.com/Apply/pnm/",
          "https://ev.pnm.com/wp-content/uploads/PNM_TEP_Commercial_Policies_Procedures_Handbook_06012024.pdf"
        ],
        "reasoningNotes": "Matched DC fast charger term. Use one unit as one eligible DCFC.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_868bb1989129fef7_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 500000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "Up to $5,000 per commercial, workplace, fleet, public, or multifamily Level 2 port",
        "evidenceText": "PNM commercial handbook states Level 2 public/workplace/fleet rebates are capped at $5,000 per port.",
        "sourceUrlsChecked": [
          "https://apply4rebates.pnm.com/Apply/pnm/",
          "https://ev.pnm.com/wp-content/uploads/PNM_TEP_Commercial_Policies_Procedures_Handbook_06012024.pdf"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Use one unit as one charging port; capped at total project cost.",
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
