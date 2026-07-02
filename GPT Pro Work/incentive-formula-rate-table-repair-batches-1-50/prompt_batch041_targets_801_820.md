You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 41
Targets in this prompt: 801-820 of 984
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
  "batchNumber": 41,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4816"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2279",
    "opportunityName": "Sawnee EMC - Commercial Energy Efficiency Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2279/sawnee-emc-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://sawnee.coop/rebates-and-incentives",
    "applicationUrl": "https://file.sawnee.coop/web-docs/commercial/lighting-equipment-rebate-application-2024.pdf",
    "administrator": "Sawnee Electric Membership Corporation",
    "programType": "Rebate Program And CIAC Charge Reduction",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "dc fast",
          "fast charger"
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Sawnee Electric Membership Corporation service territory"
        ],
        "notes": "Applies to Sawnee EMC members billed under qualifying commercial rate schedules."
      },
      "eligibleApplicantTypes": [
        "sawnee_emc_members_billed_under_commercial_rate_schedule",
        "commercial_members"
      ],
      "eligibleSectors": [
        "commercial",
        "small_commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_lighting_retrofit",
        "production_equipment_efficiency_upgrade",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Sawnee EMC member billed under a commercial rate schedule.",
        "Lighting must be upgraded to qualifying certified high-efficiency lighting systems.",
        "Production equipment must replace working equipment and result in documented kWh savings.",
        "Projects require Sawnee pre-installation verification, proposed changes approval, final inspection and receipts.",
        "Lighting and equipment grant is limited by cost cap and available calendar-year funds.",
        "Level 3 or DC fast charger incentive is a CIAC charge reduction only."
      ],
      "blockers": [
        "Do not generalize the Level 3 or DC fast charger incentive to all EV charger installations.",
        "Residential Level 2 EV charger rebates are separate from this commercial record.",
        "The DC fast charger incentive is not an equipment rebate.",
        "Projects outside Sawnee EMC territory or without Sawnee approval and verification are ineligible."
      ],
      "programType": "Rebate Program And CIAC Charge Reduction",
      "administrator": "Sawnee Electric Membership Corporation",
      "applicationUrl": "https://file.sawnee.coop/web-docs/commercial/lighting-equipment-rebate-application-2024.pdf",
      "websiteUrl": "https://sawnee.coop/rebates-and-incentives",
      "sourceUrlsChecked": [
        "https://sawnee.coop/rebates-and-incentives",
        "https://file.sawnee.coop/web-docs/commercial/lighting-equipment-rebate-application-2024.pdf",
        "https://file.sawnee.coop/web-docs/library/SEMC-Service-Rules-And-Regulations-January-2025.pdf"
      ],
      "evidenceText": "Sawnee's commercial section offers a lighting or equipment upgrade grant for certified high-efficiency lighting or working equipment replacements that cut kWh, plus a Level 3 or DC fast charger incentive structured as a CIAC charge reduction.",
      "reasoningNotes": "Preserved LED and DC fast charger matches but narrowed the EV category to DC fast chargers only. Added production equipment efficiency as a non-specific commercial equipment upgrade category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Sawnee DC fast charger item is a 20% CIAC reduction capped at $2,000, not a standard project-cost rebate basis.",
        "sourceUrlsChecked": [
          "https://www.sawnee.coop/rebates-and-incentives"
        ],
        "reasoningNotes": "Deferred because the savings engine does not yet have a CIAC-specific basis input.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22079",
    "opportunityName": "Kootenai Electric Cooperative - Commercial Energy Efficiency Rebate Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22079/kootenai-electric-cooperative-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.directefficiency.com/kec-commercial-rebates/",
    "applicationUrl": null,
    "administrator": "Kootenai Electric Cooperative / Direct Efficiency",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Kootenai Electric Cooperative"
        ],
        "notes": "Limited to Kootenai Electric Cooperative nonresidential customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "nonresidential_cooperative_member"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "lodging",
        "residential_care"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "ductless_heat_pump",
        "packaged_terminal_heat_pump",
        "advanced_rooftop_unit_controls",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a Kootenai Electric Cooperative nonresidential customer.",
        "Applications generally must be submitted within the stated post-installation deadline.",
        "Lighting incentives require the applicable lighting calculator and supporting documentation.",
        "Ductless heat pump and packaged terminal heat pump projects must meet equipment and baseline-heating requirements.",
        "Advanced rooftop unit controls apply only to qualifying retrofit rooftop units."
      ],
      "blockers": [
        "Residential customers are not eligible under the checked commercial pages.",
        "Do not match generic HVAC; current HVAC support is limited to listed ductless heat pump, packaged terminal heat pump, advanced rooftop controls, or custom-approved measures.",
        "Packaged terminal heat pumps are limited to eligible lodging or residential-care applications.",
        "Advanced rooftop unit controls exclude split systems and variable-speed equipment where the program excludes them.",
        "The main Kootenai site was access-limited, so unsupported categories should not be inferred."
      ],
      "programType": "Rebate Program",
      "administrator": "Kootenai Electric Cooperative / Direct Efficiency",
      "applicationUrl": null,
      "websiteUrl": "https://www.directefficiency.com/kec-commercial-rebates/",
      "sourceUrlsChecked": [
        "https://www.kec.com/energy-solutions/",
        "https://www.directefficiency.com/kec-commercial-rebates/",
        "https://directefficiency.com/kec-commercial-ductless-heat-pump-rebate/",
        "https://directefficiency.com/kec-commercial-lighting-rebate/",
        "https://directefficiency.com/kec-commercial-advanced-rooftop-unit-control-rebate/",
        "https://directefficiency.com/kec-commercial-packaged-terminal-heat-pump-rebate/",
        "https://directefficiency.com/kec-commercial-custom-projects-rebates/"
      ],
      "evidenceText": "KEC-branded Direct Efficiency commercial pages list nonresidential rebates for lighting, ductless heat pumps, packaged terminal heat pumps, advanced rooftop unit controls, and custom efficiency projects.",
      "reasoningNotes": "The ductless heat pump and lighting matches are supported. Generic high-efficiency HVAC was narrowed to the specific heat pump and rooftop-control measures verified on KEC-branded program pages."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Kootenai/Direct Efficiency commercial heat-pump measures are measure- and building-type-specific.",
        "sourceUrlsChecked": [
          "https://www.directefficiency.com/kec-commercial-rebates/",
          "https://www.kec.com/energy-solutions/"
        ],
        "reasoningNotes": "Exact current commercial ductless or packaged heat-pump rebate value should be extracted from the current application before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5403",
    "opportunityName": "Peoples Gas - Single Family Direct Install",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5403/peoples-gas-single-family-direct-install",
    "websiteUrl": "https://www.peoplesgasdelivery.com/savings/rebates-direct",
    "applicationUrl": "https://eesavings.com/",
    "administrator": "Peoples Gas",
    "programType": "Direct Install",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
        "cities": [
          "Chicago"
        ],
        "utilityTerritories": [
          "Peoples Gas"
        ],
        "notes": "Applies to eligible Peoples Gas residential customers in Chicago."
      },
      "eligibleApplicantTypes": [
        "homeowners",
        "renters_with_landlord_permission",
        "residential_customers"
      ],
      "eligibleSectors": [
        "residential",
        "single_family",
        "two_flat",
        "individually_metered_condo",
        "individually_metered_townhome"
      ],
      "eligibleRetrofitCategories": [
        "programmable_thermostat",
        "smart_thermostat",
        "advanced_power_strip",
        "door_sweep_air_sealing",
        "domestic_hot_water_pipe_insulation",
        "low_flow_showerhead_aerator"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Peoples Gas residential customer.",
        "Dwelling must be a qualifying single-family home, two-flat, individually metered condo or individually metered townhome.",
        "Renters in buildings with fewer than three units need landlord permission.",
        "Customer must schedule a Home Energy Savings assessment.",
        "Direct-installed product availability varies by home and assessment."
      ],
      "blockers": [
        "Broad attic or wall insulation is handled by the weatherization rebate program, not this direct-install offer.",
        "Duct sealing is not part of this direct-install match.",
        "Multifamily buildings with three or more units use renter, income-eligible or multifamily offerings.",
        "Commercial projects are not eligible."
      ],
      "programType": "Direct Install",
      "administrator": "Peoples Gas",
      "applicationUrl": "https://eesavings.com/",
      "websiteUrl": "https://www.peoplesgasdelivery.com/savings/rebates-direct",
      "sourceUrlsChecked": [
        "https://www.peoplesgasdelivery.com/savings/rebates-direct",
        "https://www.peoplesgasdelivery.com/savings/rebates-residential",
        "https://www.peoplesgasdelivery.com/savings/rebates-residential-faq",
        "https://eesavings.com/"
      ],
      "evidenceText": "Peoples Gas Home Energy Savings offers free assessment and free or discounted products such as thermostats, advanced power strips, door sweeps, pipe insulation, showerheads and aerators for eligible single-family, two-flat and individually metered homes.",
      "reasoningNotes": "Low-flow showerheads and thermostats are supported. Insulation should be narrowed to pipe insulation and door-sweep air sealing for the direct-install offer; broad insulation is a separate residential rebate category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Peoples Gas single-family direct install offers free or discounted products and services rather than a published per-measure cash rebate formula.",
        "sourceUrlsChecked": [
          "https://www.peoplesgasdelivery.com/savings/rebates-direct"
        ],
        "reasoningNotes": "Direct install/no-cost service should not be forced into a one-time savings rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22549",
    "opportunityName": "AES Indiana - EV Managed Charging Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22549/aes-indiana-ev-managed-charging-program",
    "websiteUrl": "https://aesindiana-ev.clearesult.com/aesin/evse-rebates/",
    "applicationUrl": "https://aesindianabusiness.clearesult.com/",
    "administrator": "AES Indiana",
    "programType": "EV Charging Rebate And Managed Charging Rewards",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "AES Indiana"
        ],
        "notes": "Available in AES Indiana electric service territory; residential managed charging and business EVSE rebates are separate current offerings."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "fleet_operator",
        "business_owner",
        "public_entity",
        "nonprofit"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "fleet",
        "public",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_installation",
        "dc_fast_charger_installation",
        "ev_managed_charging_enrollment"
      ],
      "hardRequirements": [
        "Residential managed charging requires an active AES Indiana residential account, eligible smart device or Level 2 charger, stable Wi-Fi and applicable rate requirements.",
        "Business EVSE rebates require chargers used for commercially owned or operated electric vehicles.",
        "Business projects must apply before construction starts.",
        "Qualified network provider, port type, power level and disadvantaged community rules affect commercial rebate amounts.",
        "Managed charging participants must comply with off-peak charging or event participation requirements."
      ],
      "blockers": [
        "Residential managed charging rewards are not DC fast charger installation rebates.",
        "Business EVSE rebates exclude chargers primarily serving employee commuter, customer or personal-use vehicles unless the current program terms expressly allow the use case.",
        "Projects outside AES Indiana service territory are ineligible.",
        "Construction started before application is a blocker for business EVSE rebates."
      ],
      "programType": "EV Charging Rebate And Managed Charging Rewards",
      "administrator": "AES Indiana",
      "applicationUrl": "https://aesindianabusiness.clearesult.com/",
      "websiteUrl": "https://aesindiana-ev.clearesult.com/aesin/evse-rebates/",
      "sourceUrlsChecked": [
        "https://www.aesindiana.com/home-ev-charging-rewards",
        "https://aesindiana-ev.clearesult.com/aesin/evse-rebates/",
        "https://aesindianabusiness.clearesult.com/"
      ],
      "evidenceText": "AES Indiana currently lists residential EV charging rewards for eligible Level 2 managed charging and separate business EVSE rebates for Level 2 and DC fast chargers serving commercially owned or operated EVs.",
      "reasoningNotes": "The DSIRE name and target URL blend separate AES offerings. Categories are valid only with program-boundary enforcement between residential managed charging and business EVSE rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found AES Indiana business EV charger port rebates, but this target is mapped to fleet fuel replacement/managed charging rather than charger site load.",
        "sourceUrlsChecked": [
          "https://www.aesindiana.com/business-ev",
          "https://www.aesindiana.com/ev-business-rebates"
        ],
        "reasoningNotes": "The proposed $6,000 and $37,000 per-port rules could be misapplied to vehicle-count fleet savings; keep for manual review.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2672",
    "opportunityName": "Carroll County REMC - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2672/carroll-county-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cwremc.coop/programs/rebates/heat-pump-rebates/",
    "applicationUrl": null,
    "administrator": "Carroll White REMC",
    "programType": "Residential Heat Pump Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Carroll White REMC"
        ],
        "notes": "The DSIRE legacy title uses Carroll County REMC; current official materials are under Carroll White REMC and apply to member residences."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump"
      ],
      "hardRequirements": [
        "Applicant must be a Carroll White REMC residential member.",
        "Heat pump must be installed at the member residence and pass utility or program inspection when required.",
        "Proof of installation and equipment documentation are required for applicable rebates.",
        "Rebate level depends on heat pump type, replacement type, and current program specifications."
      ],
      "blockers": [
        "Do not match gas furnaces or generic non-heat-pump HVAC replacements.",
        "Contractor incentive payments are separate from the member residential heat pump rebate.",
        "Loop-leasing or financing programs are separate and should not be treated as this rebate.",
        "Heat pump water heater rebates should only be matched if a separate current CWREMC water-heater rebate is selected."
      ],
      "programType": "Residential Heat Pump Rebate",
      "administrator": "Carroll White REMC",
      "applicationUrl": null,
      "websiteUrl": "https://www.cwremc.coop/programs/rebates/heat-pump-rebates/",
      "sourceUrlsChecked": [
        "https://www.cwremc.coop/programs/rebates/heat-pump-rebates/",
        "https://www.cwremc.coop/programs/rebates/contractor/",
        "https://www.cwremc.coop/programs/rebates/"
      ],
      "evidenceText": "Current]( official snippets identify Carroll White REMC rebates for air-source and ground-source heat pumps, including geothermal replacement and contractor-installed heat pump incentives after inspection and proof of installation.",
      "reasoningNotes": "Official pages were access-restricted in-browser, but current official search results support residential air-source and ground-source heat pump rebates. Broad high-efficiency HVAC should be narrowed to heat pump equipment."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Official heat pump page describes a $150 contractor payment for installed heat pumps rather than a direct customer rebate.",
        "sourceUrlsChecked": [
          "https://www.cwremc.coop/programs/rebates/heat-pump-rebates/"
        ],
        "reasoningNotes": "Contractor payments should not be modeled as direct upfront customer project incentives.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2694",
    "opportunityName": "Carroll White REMC - Residential Heat Pump Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2694/carroll-white-remc-residential-heat-pump-rebate-program",
    "websiteUrl": "https://www.cwremc.coop/programs/rebates/heat-pump-rebates/",
    "applicationUrl": null,
    "administrator": "Carroll White REMC",
    "programType": "Residential Heat Pump Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Carroll White REMC"
        ],
        "notes": "Eligibility is limited to residences served by Carroll White REMC."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump"
      ],
      "hardRequirements": [
        "Applicant must be a Carroll White REMC residential member.",
        "Heat pump must be installed at the member residence.",
        "Measure must meet current program efficiency, installation, and inspection rules.",
        "Required proof of installation and supporting documentation must be submitted."
      ],
      "blockers": [
        "Do not match gas furnaces or generic non-heat-pump HVAC replacements.",
        "Looped In geothermal loop leasing is a separate offering, not this rebate.",
        "Partnership for Efficiency financing is separate and should not be treated as a rebate.",
        "Do not infer commercial or industrial heat pump measures from this residential program."
      ],
      "programType": "Residential Heat Pump Rebate",
      "administrator": "Carroll White REMC",
      "applicationUrl": null,
      "websiteUrl": "https://www.cwremc.coop/programs/rebates/heat-pump-rebates/",
      "sourceUrlsChecked": [
        "https://www.cwremc.coop/programs/rebates/heat-pump-rebates/",
        "https://www.cwremc.coop/programs/energy-efficiency/looped-in/",
        "https://www.cwremc.coop/programs/energy-efficiency/partnership-for-efficiency/"
      ],
      "evidenceText": "Current]( official Carroll White REMC materials describe residential heat pump rebates and separate geothermal loop leasing and financing offerings. The rebate match is for qualifying air-source, ductless, or geothermal heat pumps.",
      "reasoningNotes": "The supplied retrofit categories are substantially correct after narrowing broad HVAC to qualifying heat pumps and separating loan or loop-leasing programs."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Carroll White REMC heat pump page describes a $150 contractor payment for installed heat pumps.",
        "sourceUrlsChecked": [
          "https://www.cwremc.coop/programs/rebates/heat-pump-rebates/"
        ],
        "reasoningNotes": "A contractor payment is not a direct customer upfront rebate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5726",
    "opportunityName": "NIPSCO (Gas & Electric) Small Business Direct Install Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5726/nipsco-gas-and-electric-small-business-direct-install-program",
    "websiteUrl": "https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program",
    "applicationUrl": null,
    "administrator": "NIPSCO",
    "programType": "Direct Install / Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NIPSCO electric and natural gas service territory"
        ],
        "notes": "For eligible NIPSCO small business customers in existing buildings."
      },
      "eligibleApplicantTypes": [
        "small_business_customer",
        "approved_trade_ally"
      ],
      "eligibleSectors": [
        "small_commercial",
        "small_industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_refrigeration_equipment",
        "high_efficiency_hvac_replacement",
        "steam_trap_replacement",
        "pre_rinse_spray_valve"
      ],
      "hardRequirements": [
        "Site must be an existing building served by NIPSCO on eligible small business electric or gas rates.",
        "Electric customers must meet the program's rate and demand limits.",
        "Project must be completed through a Small Business Direct Install participating trade ally.",
        "Measures must be one-for-one retrofit or replacement where required.",
        "Applications and project completion must meet the current program deadlines."
      ],
      "blockers": [
        "Do not match residential projects.",
        "Do not match large commercial customers above the stated demand threshold.",
        "Do not generalize pre-rinse spray valves into broad plumbing or low-flow fixture retrofits.",
        "New construction and non-NIPSCO accounts are not eligible."
      ],
      "programType": "Direct Install / Rebate Program",
      "administrator": "NIPSCO",
      "applicationUrl": null,
      "websiteUrl": "https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program",
      "sourceUrlsChecked": [
        "https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program"
      ],
      "evidenceText": "NIPSCO's current small business direct install page lists existing-building upgrades including lighting, refrigeration, HVAC, steam traps, and spray valves, with rate and demand eligibility rules.",
      "reasoningNotes": "Lighting, refrigeration, and HVAC matches are supported for small business direct install. Spray valves are product-specific and should not become a broad plumbing category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "NIPSCO SBDI publishes a 2026 measures list, but exact refrigeration values need table extraction and approved trade ally scope.",
        "sourceUrlsChecked": [
          "https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program",
          "https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/small-business-direct-install-program.pdf"
        ],
        "reasoningNotes": "Do not create a grant rule from the overall project cap; select a specific SBDI measure in a later pass.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2668",
    "opportunityName": "Utilities District of Western Indiana REMC - Residential Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2668/utilities-district-of-western-indiana-remc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.udwiremc.com/my-services/member-programs/rebates/",
    "applicationUrl": "https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Res.HVAC-Rebate-App.pdf",
    "administrator": "Utilities District of Western Indiana REMC",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "heat pump",
          "mini split"
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
          "Utilities District of Western Indiana REMC"
        ],
        "notes": "Limited to single-family homes served by UDWI REMC."
      },
      "eligibleApplicantTypes": [
        "residential_member_consumers",
        "single_family_home_occupants"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "wifi_enabled_electric_storage_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a current residential UDWI member-consumer in a single-family home served by UDWI.",
        "Home must be occupied year-round.",
        "HVAC equipment must be new and qualifying; whole-home requirement applies except eligible single-zone mini-splits.",
        "AHRI documentation, invoice, and application are required.",
        "Application must be submitted within 90 days and in the same calendar year, with rebates subject to caps and available funds."
      ],
      "blockers": [
        "Do not match generic high_efficiency_hvac_replacement; only listed heat pump equipment is supported.",
        "Furnaces, boilers, LED lighting, and nonresidential measures are not part of this residential heat-pump rebate.",
        "Nonmembers, seasonal homes, projects over rebate caps, or missing AHRI/invoice documentation should not match."
      ],
      "programType": "Rebate",
      "administrator": "Utilities District of Western Indiana REMC",
      "applicationUrl": "https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Res.HVAC-Rebate-App.pdf",
      "websiteUrl": "https://www.udwiremc.com/my-services/member-programs/rebates/",
      "sourceUrlsChecked": [
        "https://www.udwiremc.com/my-services/member-programs/rebates/",
        "https://www.udwiremc.com/my-services/member-programs/rebates/hvac-incentive-program/",
        "https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Res.HVAC-Rebate-App.pdf",
        "https://www.udwiremc.com/wp-content/uploads/2026/01/2026_Residential_HVAC_Terms_Conditions.pdf"
      ],
      "evidenceText": "UDWI's 2026 residential rebate pages and HVAC application list air-source, dual-fuel, mini-split, and geothermal heat pumps plus qualifying water heaters.",
      "reasoningNotes": "Heat pump and geothermal matches are supported. The broad HVAC replacement category was narrowed and unrelated LED lighting excluded."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official UDWIREMC rebate page checked but no current amount verified.",
        "sourceUrlsChecked": [
          "https://www.udwiremc.com/my-services/member-programs/rebates/"
        ],
        "reasoningNotes": "No source-backed formula found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1553",
    "opportunityName": "Duke Energy - Non-Residential Energy Efficiency Rebate Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1553/duke-energy-non-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
    "applicationUrl": null,
    "administrator": "Duke Energy Kentucky",
    "programType": "Non-Residential Utility Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "Duke Energy Kentucky non-residential electric service territory"
        ],
        "notes": "Limited to Duke Energy Kentucky non-residential electric customers; exact account and rate eligibility must be verified on current Duke materials."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "school",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "non_residential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "variable_frequency_drive_retrofit",
        "efficient_air_compressor",
        "commercial_foodservice_equipment",
        "high_efficiency_refrigeration_equipment"
      ],
      "hardRequirements": [
        "Applicant must be a Duke Energy Kentucky non-residential customer.",
        "Equipment must be qualifying high-efficiency equipment under the current Smart Saver business program.",
        "Lighting, HVAC, commercial equipment, and custom projects must follow the relevant current Duke application, worksheet, and preapproval requirements.",
        "Custom and compressed-air measures may require documentation of electric energy savings."
      ],
      "blockers": [
        "Do not match residential Smart Saver measures to this non-residential Kentucky opportunity.",
        "Do not rely on Duke programs from other states for Kentucky eligibility or amounts.",
        "Compressed-air and custom measures should not be treated as prescriptive rebates unless the current Duke worksheet or application confirms that path.",
        "Fuel-only savings and non-electric customers are not supported without current Duke confirmation."
      ],
      "programType": "Non-Residential Utility Energy Efficiency Rebate Program",
      "administrator": "Duke Energy Kentucky",
      "applicationUrl": null,
      "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/business/products/smartsaver",
        "https://www.duke-energy.com/business/products/smartsaver/lighting",
        "https://www.duke-energy.com/business/products/smartsaver/commercial-equipment",
        "https://www.duke-energy.com/business/products/smartsaver/hvac-incentives",
        "https://www.duke-energy.com/business/products/smartsaver/custom-incentives",
        "https://www.duke-energy.com/partner-with-us/trade-allies/commercial/collateral-toolkit",
        "https://psc.ky.gov/pscecf/2020-00266/e.rolfes-adkins%40duke-energy.com/08172020115633/Application_to_Amend_DSM_Programs.pdf",
        "https://psc.ky.gov/pscecf/2024-00264/e.rolfes-adkins%40duke-energy.com/08152024051934/DEK_APP_081524.pdf"
      ],
      "evidenceText": "Official]( Duke snippets confirm Smart Saver cash incentives for business facilities, lighting, commercial equipment, HVAC and custom projects; Kentucky PSC filings describe non-residential incentives for lighting, HVAC, drives, process, food-service, IT and compressed-air measures.",
      "reasoningNotes": "Current Duke pages were partly dynamic, but official Duke snippets and Kentucky regulatory filings supported core non-residential categories, including the related lighting, refrigeration, and compressed-air matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Duke Energy nonresidential rebate pages did not expose a current refrigeration or compressed-air formula.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/business/products/smart-saver",
          "https://programs.dsireusa.org/system/program/detail/1553"
        ],
        "reasoningNotes": "No official calculable rule was found for the target refrigeration/compressor measures.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22745",
    "opportunityName": "NextZero Connected Homes Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22745/nextzero-connected-homes-program",
    "websiteUrl": "https://nextzeroconnectedhomes.virtualpeaker.io/overview/",
    "applicationUrl": "https://nextzeroconnectedhomes.virtualpeaker.io/overview/",
    "administrator": "Massachusetts Municipal Wholesale Electric Company",
    "programType": "Performance Based Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "participating MMWEC municipal light plant territories"
        ],
        "notes": "Only customers of participating municipal utilities shown on NextZero or local utility enrollment pages are eligible."
      },
      "eligibleApplicantTypes": [
        "residential_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "battery_storage_demand_response_enrollment",
        "ev_charger_demand_response_enrollment",
        "electric_vehicle_demand_response_enrollment",
        "heat_pump_water_heater_demand_response_enrollment",
        "smart_thermostat_demand_response_enrollment",
        "mini_split_controller_demand_response_enrollment"
      ],
      "hardRequirements": [
        "Customer must be served by a participating municipal utility.",
        "Customer must have a qualifying internet-connected or Wi-Fi device.",
        "Customer must enroll the device through the Connected Homes platform.",
        "Customer must allow utility or Virtual Peaker adjustments during peak demand events.",
        "Bill credits depend on participation and device category.",
        "Customer may enroll an EV charger or EV, but not both for duplicate participation."
      ],
      "blockers": [
        "This program generally pays for demand response enrollment, not universal purchase or installation of batteries or EV chargers.",
        "Local EV charger and battery purchase rebates are separate municipal programs.",
        "Non-Wi-Fi or incompatible devices are not eligible.",
        "Opting out of events can reduce or forfeit the monthly credit."
      ],
      "programType": "Performance Based Incentive",
      "administrator": "Massachusetts Municipal Wholesale Electric Company",
      "applicationUrl": "https://nextzeroconnectedhomes.virtualpeaker.io/overview/",
      "websiteUrl": "https://nextzeroconnectedhomes.virtualpeaker.io/overview/",
      "sourceUrlsChecked": [
        "https://nextzeroconnectedhomes.virtualpeaker.io/overview/",
        "https://nextzero.org/rmld/connected-homes/",
        "https://www.hged.com/residential/ee-home/electric-vehicles/connected-homes-ev-charger-program-terms-and-conditions.aspx",
        "https://nextzero.org/concord/connected-homes/"
      ],
      "evidenceText": "NextZero describes Connected Homes as monthly incentives for enrolling qualifying Wi-Fi devices and allowing brief peak-demand adjustments. Eligible devices include batteries, EV chargers or EVs, water heaters, thermostats and mini-split controllers.",
      "reasoningNotes": "Battery and EV charging matches should be limited to connected-device enrollment rather than physical installation incentives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Connected Homes is a connected-device/performance program for batteries, EV charging, and other devices.",
        "sourceUrlsChecked": [
          "https://nextzero.org/connected-homes/"
        ],
        "reasoningNotes": "Demand-response and managed-device incentives are recurring/performance-based rather than upfront equipment rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22320",
    "opportunityName": "PEPCO - EVsmart",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22320/pepco-evsmart",
    "websiteUrl": "https://www.pepco.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx",
    "applicationUrl": "https://homeenergysavings.pepco.com/sites/default/files/public/19238_Pepco_Residential_EVSE_Rebate_Application_v04.pdf",
    "administrator": "Pepco",
    "programType": "Rebate And Make Ready Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MD"
        ],
        "counties": [
          "Montgomery County",
          "Prince George's County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Pepco Maryland electric service territory"
        ],
        "notes": "Maryland Pepco territory; details vary by residential, workplace, multifamily, fleet and public charging components."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "small_businesses",
        "nonprofits",
        "commercial_customers",
        "multifamily_property_owners",
        "fleet_operators",
        "local_governments"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "nonprofit",
        "multifamily",
        "fleet",
        "workplace",
        "public_parking"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_make_ready_electrical_upgrade",
        "fleet_charging_infrastructure",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Pepco Maryland customer.",
        "Residential equipment must be an eligible smart or networked Level 2 charger.",
        "Residential applicants must provide EV registration, receipts, installation invoice, installed photo and recent Pepco bill.",
        "Workplace small business or nonprofit applicants must meet demand and Maryland business requirements where applicable.",
        "Network plan, charging data access, price disclosure, photos, receipts and inspection documentation may be required.",
        "Make-ready, fleet and public charging components may require preapproval or site review."
      ],
      "blockers": [
        "Level 1 residential charger installation is not rebate-supported by the reviewed documents.",
        "Utility-owned public charging and DC fast charging components are separate from residential and workplace rebate forms.",
        "District of Columbia EVsmart offerings are separate from Maryland EVsmart.",
        "Older workplace rebate documents referenced extension uncertainty, so current funding should be verified before installation.",
        "Non-networked chargers are unsupported."
      ],
      "programType": "Rebate And Make Ready Incentive",
      "administrator": "Pepco",
      "applicationUrl": "https://homeenergysavings.pepco.com/sites/default/files/public/19238_Pepco_Residential_EVSE_Rebate_Application_v04.pdf",
      "websiteUrl": "https://www.pepco.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx",
      "sourceUrlsChecked": [
        "https://www.pepco.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx",
        "https://homeenergysavings.pepco.com/sites/default/files/public/19238_Pepco_Residential_EVSE_Rebate_Application_v04.pdf",
        "https://azure-na-assets.contentstack.com/v3/assets/bltbb7c204688a1a6a8/blt714c481432f88306/Pepco_MD_WorkplaceChargerApplicationSimple.pdf",
        "https://secure.pepco.com/SmartEnergy/SmartMeterSmartGrid/Pages/RegisterYourElectronicVehicle.aspx",
        "https://thesource.pepcoholdings.com/pepcos-evsmart-program-celebrates-national-drive-electric-week/",
        "https://marylandev.org/utility-assistance/"
      ],
      "evidenceText": "Pepco PDFs support smart Level 2 residential and workplace charger rebates for Maryland customers, and Pepco/state EV pages describe EVsmart rebates, tools and public Level 2/DC fast charging. Current main program pages are partly dynamic.",
      "reasoningNotes": "Level 2 and make-ready matches are supported, but program details are split across dynamic pages and PDFs. Confidence is medium because some current official pages were not fully readable and one workplace document referenced an extension."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official Pepco EVsmart pages did not expose current EVSE rebate formula text.",
        "sourceUrlsChecked": [
          "https://www.pepco.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicleProgramMD.aspx"
        ],
        "reasoningNotes": "No source-backed upfront EVSE rule could be verified from accessible official text.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22321",
    "opportunityName": "Potomac Edison - EV Driven Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22321/potomac-edison-ev-driven-program",
    "websiteUrl": "https://www.evdrivenpe.com/",
    "applicationUrl": "https://greatergrid.com/enroll/programs/evs/potomac-ev",
    "administrator": "Potomac Edison",
    "programType": "Time Of Use Rate Credit",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Potomac Edison Maryland electric service territory"
        ],
        "notes": "Current active component is the Potomac Edison Maryland EV-Only TOU offer for eligible residential and multifamily EV charging accounts."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_time_of_use_enrollment",
        "electric_vehicle_time_of_use_enrollment",
        "multifamily_ev_charger_service_rate_enrollment"
      ],
      "hardRequirements": [
        "Applicant must be a current Potomac Edison Maryland customer.",
        "Customer must have an eligible Wi-Fi EV charger or eligible EV.",
        "Customer must allow remote access to charger or EV charging usage data.",
        "Account must be on an eligible residential or multifamily EV service schedule.",
        "Customer may not use an alternative electric supplier, net metering or community solar for the eligible account.",
        "Customer must have a Potomac Edison online account and comply with off-peak charging terms."
      ],
      "blockers": [
        "Residential Level 2 charger purchase and installation rebate has reached maximum capacity and is not accepting applications.",
        "Multifamily Level 2 and DC fast charging rebate enrollment is currently closed or limited.",
        "Utility-owned public charging stations are not applicant-owned retrofit grants.",
        "Do not match broad DC fast charger installation unless a multifamily rebate round reopens.",
        "Level 1 charger installation is unsupported."
      ],
      "programType": "Time Of Use Rate Credit",
      "administrator": "Potomac Edison",
      "applicationUrl": "https://greatergrid.com/enroll/programs/evs/potomac-ev",
      "websiteUrl": "https://www.evdrivenpe.com/",
      "sourceUrlsChecked": [
        "https://www.evdrivenpe.com/",
        "https://greatergrid.com/enroll/programs/evs/potomac-ev",
        "https://greatergrid.com/enroll/programs/evs/potomac-ev/faq",
        "https://www.firstenergycorp.com/help/electric-vehicles/maryland-ev/maryland-ev.html",
        "https://www.firstenergycorp.com/help/electric-vehicles/maryland-ev/maryland-ev/ev-faqs.html",
        "https://www.chargingrewards.com/evdriven-multifamily/"
      ],
      "evidenceText": "Current Potomac Edison pages show an active EV-Only TOU offer for qualifying Wi-Fi EVs or Level 2 smart chargers. The FAQ says the residential charger rebate is at maximum capacity; multifamily charging rebate enrollment is closed or limited.",
      "reasoningNotes": "The opportunity remains active only as a TOU or managed charging enrollment opportunity. Physical charger rebate categories should be blocked until a rebate round reopens."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "unavailable",
        "confidence": "medium",
        "evidenceText": "Potomac Edison FAQ says the residential EV Driven Level 2 rebate reached maximum capacity and is no longer accepting applications.",
        "sourceUrlsChecked": [
          "https://www.firstenergycorp.com/help/electric-vehicles/maryland-ev/maryland-ev/ev-faqs.html",
          "https://potomaced.chooseev.com/promos/"
        ],
        "reasoningNotes": "Do not merge a current upfront rebate rule for a closed/residential-capacity-full offer.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
    "opportunityName": "Renewable Energy Renaissance Zones",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3216/renewable-energy-renaissance-zones",
    "websiteUrl": "https://www.michiganbusiness.org/4aef8b/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf",
    "applicationUrl": null,
    "administrator": "Michigan Economic Development Corporation",
    "programType": "Industry Recruitment/Support",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
      },
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "biomass"
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
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Only designated company operations inside approved Renewable Energy Renaissance Zone boundaries qualify."
      },
      "eligibleApplicantTypes": [
        "designated_renewable_energy_companies",
        "counties",
        "distressed_communities",
        "local_governments"
      ],
      "eligibleSectors": [
        "industrial",
        "commercial",
        "economic_development",
        "local_government"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "Business operations must be located within a designated Renewable Energy Renaissance Zone.",
        "The zone must contain a qualifying renewable energy facility or qualifying renewable-energy R&D or manufacturing operation.",
        "Applications require local government involvement and state approval.",
        "Company must be current on applicable state and local taxes.",
        "Tax benefits are limited by approved term and phaseout rules."
      ],
      "blockers": [
        "This is not a rebate for customer battery, biomass or solar thermal installations.",
        "Advanced battery references are for R&D or manufacturing operations, not customer battery storage retrofits.",
        "Biomass references are for qualifying renewable energy facilities or production operations, not general building biomass retrofits.",
        "Benefits do not apply outside approved zone boundaries.",
        "The program is not a Michigan sales or use tax exemption."
      ],
      "programType": "Industry Recruitment/Support",
      "administrator": "Michigan Economic Development Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.michiganbusiness.org/4aef8b/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf",
      "sourceUrlsChecked": [
        "https://www.michiganbusiness.org/4aef8b/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf"
      ],
      "evidenceText": "MEDC describes Renewable Energy Renaissance Zones as tax benefits for designated renewable-energy company operations inside approved zone boundaries, including renewable energy facilities and R&D or manufacturing operations rather than customer retrofit installations.",
      "reasoningNotes": "Cleared retrofit categories because official materials support economic development and zone-based industry recruitment, not physical retrofit measures for end-use buildings."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Renaissance Zones are tax-abatement/geographic development mechanisms, not direct upfront solar or biomass rebates.",
        "sourceUrlsChecked": [
          "https://www.michiganbusiness.org/4a8179/globalassets/documents/reports/fact-sheets/renewable-energy-renaissance-zones.pdf"
        ],
        "reasoningNotes": "No supported one-time rebate, grant, or tax-reduction amount can be calculated from the target project alone.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3409",
    "opportunityName": "Anoka Municipal Utility - Commercial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3409/anoka-municipal-utility-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.anokamn.gov/381/Commercial-Rebates",
    "applicationUrl": null,
    "administrator": "Anoka Municipal Utility",
    "programType": "Commercial Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "hvac_controls_retrofit",
        "displayName": "HVAC controls retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "economizer"
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
      "confidence": "medium",
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
          "Anoka Municipal Utility"
        ],
        "notes": "Available to Anoka Municipal Utility commercial electric customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_owner",
        "commercial_property_owner",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "hvac_economizer_retrofit",
        "high_efficiency_hvac_replacement",
        "variable_frequency_drive_retrofit",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must receive electric service from Anoka Municipal Utility.",
        "Commercial rebate projects must meet AMU measure-specific requirements and documentation rules.",
        "Lighting rebates require eligible new or retrofit lighting equipment and calculated energy savings.",
        "Cooling, motors, drives and custom projects may require AMU review or preapproval.",
        "Rebates are subject to program-year funding and submission timing limits."
      ],
      "blockers": [
        "Economizer support is for qualifying rooftop unit economizers, not all HVAC controls.",
        "Lighting controls should match only where AMU form or custom review documents eligible control savings.",
        "Do not match residential projects.",
        "Do not infer non-lighting or non-cooling measures without AMU custom approval."
      ],
      "programType": "Commercial Energy Efficiency Rebate",
      "administrator": "Anoka Municipal Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.anokamn.gov/381/Commercial-Rebates",
      "sourceUrlsChecked": [
        "https://www.anokamn.gov/381/Commercial-Rebates",
        "https://www.anokamn.gov/819/Commercial-Retrofit-Lighting-Rebate",
        "https://www.anokamn.gov/818/Commercial-New-Lighting-Rebate",
        "https://www.anokamn.gov/820/Commercial-Cooling-Rebate"
      ],
      "evidenceText": "Anoka's current commercial rebate pages cover commercial lighting, retrofit lighting, cooling rebates including rooftop unit economizers, and commercial rebates for motors, drives, cooling and custom energy savings by request.",
      "reasoningNotes": "LED lighting and rooftop economizer are supported. Lighting controls are retained only with a narrow custom or documented lighting-control eligibility constraint."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Anoka commercial page did not expose current motor/VFD or lighting-control rebate values in accessible text.",
        "sourceUrlsChecked": [
          "https://www.anokamunicipalutility.com/381/Commercial-Rebates"
        ],
        "reasoningNotes": "No source-backed per-unit value was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3415",
    "opportunityName": "Elk River Municipal Utilities - Commercial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3415/elk-river-municipal-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ermumn.com/programs-rebates/commercial-rebates",
    "applicationUrl": null,
    "administrator": "Elk River Municipal Utilities / Frontier Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Sherburne"
        ],
        "cities": [
          "Elk River"
        ],
        "utilityTerritories": [
          "Elk River Municipal Utilities electric service territory"
        ],
        "notes": "Program is presented for ERMU commercial customers, with Frontier Energy identified as the delivery partner for commercial rebates and audits."
      },
      "eligibleApplicantTypes": [
        "Elk River Municipal Utilities commercial customers",
        "industrial customers",
        "agricultural customers",
        "business electric customers",
        "institutional customers",
        "participating contractors where applicable"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "food service",
        "refrigeration and grocery",
        "data center and IT",
        "industrial process"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "data_center_it_efficiency",
        "industrial_process_efficiency",
        "energy_audit"
      ],
      "hardRequirements": [
        "Customer must be served by Elk River Municipal Utilities.",
        "Commercial rebate eligibility is routed through ERMU and Frontier Energy processes.",
        "Measure eligibility depends on current category-specific requirements for HVAC and controls, refrigeration, foodservice, data center or IT equipment, industrial processes, specialized lighting, or other listed commercial categories.",
        "Energy audits are a service pathway and do not by themselves represent installation of a physical retrofit.",
        "Detailed measure amounts and technical requirements should be confirmed with current ERMU or Frontier Energy forms before quoting or calculating incentives."
      ],
      "blockers": [
        "Specific subcategories such as VFDs, refrigeration controls, anti-sweat heater controls, or exact foodservice equipment should not be matched unless the current Frontier Energy measure form supports them.",
        "Water conservation and low-flow fixture categories were not supported by the current commercial page reviewed.",
        "Energy audit should not be treated as a physical retrofit.",
        "The public page provides high-level rebate categories; detailed form access is needed for full submeasure verification.",
        "Do not infer residential ERMU rebates from this commercial record."
      ],
      "programType": "Rebate Program",
      "administrator": "Elk River Municipal Utilities / Frontier Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.ermumn.com/programs-rebates/commercial-rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3415/elk-river-municipal-utilities-commercial-energy-efficiency-rebate-program",
        "https://www.ermumn.com/programs-rebates/commercial-rebates"
      ],
      "evidenceText": "The current ERMU commercial rebates page lists commercial rebate categories for HVAC and controls, data centers and IT equipment, industrial processes, refrigeration, food service equipment, specialized lighting, and energy audits through Frontier Energy.",
      "reasoningNotes": "The public official source supports the major C&I categories but not all detailed submeasures, so confidence is medium and measure-specific false positives are blocked pending current forms."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Elk River/Bright Energy Solutions commercial rebates include refrigeration categories, but exact current values vary by form.",
        "sourceUrlsChecked": [
          "https://www.elkrivermn.gov/1568/Rebates",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "No single refrigeration value was safely selected from official current source text.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2250",
    "opportunityName": "Wright-Hennepin Cooperative Electric Association - Non-Residential Energy Efficient Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2250/wright-hennepin-cooperative-electric-association-non-residential-energy-efficient-rebate-program",
    "websiteUrl": "https://www.whe.org/commercial-programs-rebates",
    "applicationUrl": null,
    "administrator": "Wright-Hennepin Cooperative Electric Association",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "Wright-Hennepin Cooperative Electric Association"
        ],
        "notes": "Limited to commercial, industrial, and agricultural members served by Wright-Hennepin."
      },
      "eligibleApplicantTypes": [
        "commercial_members",
        "industrial_members",
        "agricultural_members"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "high_efficiency_rooftop_unit",
        "high_efficiency_split_system_hvac",
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "packaged_terminal_air_conditioner",
        "variable_air_volume_system",
        "chiller_upgrade",
        "variable_frequency_drive",
        "motor_control_system",
        "high_efficiency_ventilation",
        "fractional_horsepower_motor",
        "compressed_air_system",
        "commercial_kitchen_equipment",
        "commercial_ev_charging",
        "facility_recommissioning",
        "dairy_production_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a Wright-Hennepin commercial, industrial, or agricultural electric member.",
        "Project must involve qualifying electric efficiency improvements and reduce energy use.",
        "Pre-approval by a WH commercial account representative is strongly recommended and may be required for incentive assurance.",
        "Measure-specific applications, worksheets, invoices, and equipment documentation apply.",
        "Funding and incentive levels vary and are limited."
      ],
      "blockers": [
        "Residential appliance, refrigerator recycling, and home weatherization programs are separate and should not match this nonresidential opportunity.",
        "Commercial refrigeration is not expressly listed on the current WH commercial rebate page; do not match high_efficiency_refrigeration_equipment without project-specific custom approval.",
        "Projects without WH approval, outside WH service territory, or not reducing electric energy consumption should not match."
      ],
      "programType": "Rebate",
      "administrator": "Wright-Hennepin Cooperative Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.whe.org/commercial-programs-rebates",
      "sourceUrlsChecked": [
        "https://www.whe.org/commercial-programs-rebates",
        "https://www.whe.org/sites/default/files/2026-retrofit-lighting-rebate-info-and-application.pdf",
        "https://www.whe.org/sites/default/files/2026-02/2026-rtu-and-split-systems-rebate-application.pdf"
      ],
      "evidenceText": "WH's commercial page lists lighting, HVAC, motor-control, EV charging, ventilation, kitchen equipment, compressed air, recommissioning, and dairy efficiency incentives.",
      "reasoningNotes": "LED and nonresidential HVAC are supported. The refrigeration match was blocked because current official WH materials did not expressly list commercial refrigeration."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Target has no matched terms and the official commercial page did not expose a specific eligible measure amount.",
        "sourceUrlsChecked": [
          "https://www.whe.org/energy-savings-rebates/commercial-programs-and-rebates/commercial-rebates.html"
        ],
        "reasoningNotes": "Manual measure selection is required.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2933",
    "opportunityName": "Evergy - Energy Savings Kit",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2933/evergy-energy-savings-kit",
    "websiteUrl": "https://www.evergy.com/ways-to-save/programs-link/energy-savings-kit",
    "applicationUrl": "https://homeassess.evergy.com/",
    "administrator": "Evergy",
    "programType": "Direct Install Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Evergy Missouri Metro",
          "Evergy Missouri West",
          "Spire"
        ],
        "notes": "Program is offered to qualifying Missouri residential customers served by Evergy, with Spire referenced as a participating utility partner."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "direct_install_led_lighting_kit",
        "faucet_aerator_retrofit",
        "efficient_flow_showerhead",
        "water_heater_pipe_insulation",
        "smart_power_strip",
        "window_insulation_film_weatherstripping",
        "door_draft_stopper",
        "switch_plate_gasket"
      ],
      "hardRequirements": [
        "Customer must be a Missouri residential customer served by Evergy under an eligible residential rate.",
        "Evergy account must be active and current.",
        "Customer must schedule and complete the in-home energy savings kit appointment.",
        "Installation professional must be allowed to assess and install eligible kit items.",
        "Renters must obtain landlord consent before installation.",
        "One kit is allowed per residence or account.",
        "Program funds are limited and available first-come, first-served."
      ],
      "blockers": [
        "This is a no-cost kit and direct-install visit, not a rebate for full insulation upgrades.",
        "Window insulation film and weatherstripping should not be matched as window replacement.",
        "Faucet aerators and showerheads should not be generalized to broad plumbing retrofits.",
        "The program does not fund HVAC replacement, appliance replacement, whole-home weatherization, or commercial projects.",
        "Unsafe premises, lack of property rights, or lack of landlord consent may prevent installation."
      ],
      "programType": "Direct Install Program",
      "administrator": "Evergy",
      "applicationUrl": "https://homeassess.evergy.com/",
      "websiteUrl": "https://www.evergy.com/ways-to-save/programs-link/energy-savings-kit",
      "sourceUrlsChecked": [
        "https://www.evergy.com/ways-to-save/programs/energy-savings-kit",
        "https://www.evergy.com/ways-to-save/programs-link/energy-savings-kit",
        "https://www.evergy.com/-/media/documents/ways-to-save/programs/energy-savings-kit-terms-and-conditions-mo.pdf",
        "https://homeassess.evergy.com/"
      ],
      "evidenceText": "Evergy’s current kit page lists free direct-installed items such as LED nightlights, aerators, efficient-flow showerheads, pipe insulation, smart power strips, window insulation, weatherstripping, draft stoppers, and switch-plate gaskets for Missouri residential customers.",
      "reasoningNotes": "Removed broad insulation and window replacement. Preserved lighting only as a direct-install kit item and narrowed water measures to faucet aerators and efficient-flow showerheads."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Energy savings kits provide free or direct-installed items; no customer upfront rebate formula was identified.",
        "sourceUrlsChecked": [
          "https://www.evergy.com/ways-to-save/programs/link-to-savings"
        ],
        "reasoningNotes": "Kit/free-service programs should not be modeled as one-time project incentives.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2961",
    "opportunityName": "Singing River Electric Power Association - Comfort Advantage Home Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2961/singing-river-electric-power-association-comfort-advantage-home-program",
    "websiteUrl": "https://singingriver.com/my-home/comfort-advantage/",
    "applicationUrl": null,
    "administrator": "Singing River Electric Power Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "MS",
          "AL"
        ],
        "counties": [
          "Jackson County",
          "George County",
          "Greene County",
          "Harrison County",
          "Perry County",
          "Stone County",
          "Wayne County",
          "Mobile County",
          "Washington County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Singing River Electric Power Association service territory"
        ],
        "notes": "Comfort Advantage materials focus on Singing River Electric members and south Mississippi climate; co-op service territory extends into listed Mississippi and Alabama counties."
      },
      "eligibleApplicantTypes": [
        "singing_river_electric_members",
        "homeowners",
        "residential_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "geothermal_water_source_heat_pump",
        "energy_efficient_new_home_construction"
      ],
      "hardRequirements": [
        "Applicant must be a Singing River Electric member.",
        "Existing-home rebate applies to conversion from gas or electric furnace to a new qualifying heat pump.",
        "Air-source heat pump must meet the stated minimum efficiency requirement.",
        "Geothermal or water-source system must meet program requirements.",
        "All heat pumps must be ARI or AHRI certified.",
        "New homes must meet Comfort Advantage Basic or Plus standards for new-construction incentives."
      ],
      "blockers": [
        "Generic high-efficiency HVAC replacement is unsupported unless the installed equipment is a qualifying heat pump or geothermal system.",
        "Non-heat-pump HVAC replacements are not supported.",
        "Commercial and industrial retrofits are not supported by the Comfort Advantage Home record.",
        "Projects outside Singing River Electric service territory are ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Singing River Electric Power Association",
      "applicationUrl": null,
      "websiteUrl": "https://singingriver.com/my-home/comfort-advantage/",
      "sourceUrlsChecked": [
        "https://singingriver.com/my-home/comfort-advantage/",
        "https://singingriver.com/ways-to-save/",
        "https://singingriver.com/my-coop/history/",
        "https://singingriver.com/my-home/heat-pumps/"
      ],
      "evidenceText": "Singing River's Comfort Advantage page lists rebates for new Comfort Advantage homes and existing-home conversions to heat pumps, including higher incentives for geothermal water-source systems and certification requirements for heat pumps.",
      "reasoningNotes": "Preserved heat pump and geothermal heat pump matches but narrowed high-efficiency HVAC to qualifying heat pump conversions. Included new-home construction because the official page includes Comfort Advantage new-home incentives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Comfort Advantage materials describe eligible efficient new homes, but no safe heat-pump/geothermal formula was verified.",
        "sourceUrlsChecked": [
          "https://singingriver.com/comfort-advantage/",
          "https://programs.dsireusa.org/system/program/detail/2961"
        ],
        "reasoningNotes": "No current official measure-specific amount was found for this target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2124",
    "opportunityName": "Carteret-Craven Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2124/carteret-craven-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ccemc.com/energy-efficiency/rebates/",
    "applicationUrl": "https://www.ccemc.com/energy-efficiency/rebates/hpwh-rebate-application/",
    "administrator": "Carteret-Craven Electric Cooperative",
    "programType": "Residential Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "Carteret-Craven Electric Cooperative"
        ],
        "notes": "Limited to homes receiving electric service from Carteret-Craven Electric Cooperative."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must receive electric service from Carteret-Craven Electric Cooperative at the home.",
        "Rebate is for a qualifying heat pump water heater, not a conventional electric resistance water heater.",
        "Customer must replace an older water heater with a qualifying ENERGY STAR or current-program model.",
        "Application and required supporting documentation must be submitted."
      ],
      "blockers": [
        "Whole-home heat pump HVAC is not supported by the current rebate evidence.",
        "Generic high-efficiency HVAC replacement is not supported.",
        "Federal tax credits or separate energy-efficient loan programs should not be merged into this rebate.",
        "Conventional electric resistance water heaters are excluded."
      ],
      "programType": "Residential Rebate",
      "administrator": "Carteret-Craven Electric Cooperative",
      "applicationUrl": "https://www.ccemc.com/energy-efficiency/rebates/hpwh-rebate-application/",
      "websiteUrl": "https://www.ccemc.com/energy-efficiency/rebates/",
      "sourceUrlsChecked": [
        "https://www.ccemc.com/energy-efficiency/rebates/",
        "https://www.ccemc.com/energy-efficiency/rebates/hpwh-rebate-application/",
        "https://www.ccemc.com/energy-efficiency/energy-efficient-loan-program/"
      ],
      "evidenceText": "Current]( CCEC rebate pages and application snippets identify a residential heat pump water heater rebate for members replacing an older water heater with a qualifying model.",
      "reasoningNotes": "Only the heat pump water heater match is verified. The original HVAC heat pump and high-efficiency HVAC matches appear to be false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "CCEMC rebates page did not expose exact current heat pump or HPWH amounts in accessible source text.",
        "sourceUrlsChecked": [
          "https://www.ccemc.com/rebates"
        ],
        "reasoningNotes": "No source-backed HVAC rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22094",
    "opportunityName": "EnergyUnited (Electric) - Residential Energy Efficiency Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22094/energyunited-electric-residential-energy-efficiency-program",
    "websiteUrl": "https://www.energyunited.com/wp-content/uploads/2024/04/HVAC-Guidelines-Internet-April-2024.pdf",
    "applicationUrl": "https://www.energyunited.com/heat-pump-rebate-form/",
    "administrator": "EnergyUnited Electric Membership Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "NC"
        ],
        "counties": [
          "Alexander County",
          "Cabarrus County",
          "Caldwell County",
          "Catawba County",
          "Davidson County",
          "Davie County",
          "Forsyth County",
          "Gaston County",
          "Guilford County",
          "Iredell County",
          "Lincoln County",
          "Mecklenburg County",
          "Montgomery County",
          "Randolph County",
          "Rockingham County",
          "Rowan County",
          "Stokes County",
          "Wilkes County",
          "Yadkin County"
        ],
        "cities": [],
        "utilityTerritories": [
          "EnergyUnited"
        ],
        "notes": "Eligible home must be an active EnergyUnited residential account in EnergyUnited's North Carolina electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "member_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential",
        "single_family"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "air_source_heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump"
      ],
      "hardRequirements": [
        "Home must be served by an active EnergyUnited account.",
        "Eligible property must be a single-family, permanent, primary residence.",
        "Heat pump must meet the applicable SEER, SEER2, HSPF, HSPF2, or geothermal EER thresholds.",
        "System must be an AHRI-matched complete system.",
        "Minimum cooling capacity is 18,000 BTU.",
        "Required permits and inspections must be completed.",
        "Contractor must submit the electronic rebate form with invoice, AHRI certificate, and inspection documentation.",
        "Application must be submitted within the program deadline after installation.",
        "Rebate is limited to two units per dwelling."
      ],
      "blockers": [
        "The older DSIRE website URL for general energy efficiency rebates returned 404 and should not be used for broad matching.",
        "Generic high-efficiency HVAC categories should be narrowed to qualifying heat pump systems.",
        "Furnaces, boilers, central air-only systems, appliances, weatherization, and commercial measures are unsupported under the checked heat pump guidelines.",
        "Homes outside EnergyUnited service territory or without an active account are ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "EnergyUnited Electric Membership Corporation",
      "applicationUrl": "https://www.energyunited.com/heat-pump-rebate-form/",
      "websiteUrl": "https://www.energyunited.com/wp-content/uploads/2024/04/HVAC-Guidelines-Internet-April-2024.pdf",
      "sourceUrlsChecked": [
        "https://www.energyunited.com/energy-services/rebates/energy-efficiency-rebates/",
        "https://www.energyunited.com/wp-content/uploads/2024/04/HVAC-Guidelines-Internet-April-2024.pdf",
        "https://www.energyunited.com/heat-pump-rebate-form/",
        "https://www.energyunited.com/member-guide/"
      ],
      "evidenceText": "The current EnergyUnited heat pump guidelines cover qualifying air-source and geothermal heat pumps for active EnergyUnited single-family residential accounts. Applicants need an AHRI-matched complete system, permits/inspection, contractor electronic submission, and a primary permanent home.",
      "reasoningNotes": "Retained heat pump and geothermal heat pump matches. Removed generic HVAC matching and noted that the prior broad rebate page is no longer accessible."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official EnergyUnited efficiency page did not expose current heat pump or geothermal rebate amounts.",
        "sourceUrlsChecked": [
          "https://www.energyunited.com/energy-efficiency/"
        ],
        "reasoningNotes": "DSIRE-like values were not used as final proof without an official current table.",
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
