You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 49 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "whirlpool-clyde-operations",
  "description": "Ohio appliance manufacturing plant served by municipal Clyde Light & Power rather than surrounding IOUs.",
  "sourceForm": {
    "sampleUserId": "whirlpool-clyde-operations",
    "description": "Ohio appliance manufacturing plant served by municipal Clyde Light & Power rather than surrounding IOUs.",
    "companyName": "Whirlpool Corporation - Clyde Operations",
    "website": "https://www.whirlpoolcorp.com/",
    "organizationType": "Industrial Facility",
    "organizationSize": "1,000+ employees",
    "siteAddress": "119 Birdseye Street, Clyde, OH 43410, USA",
    "electricUtilityProvider": "Clyde Light & Power",
    "gasUtilityProvider": "Columbia Gas of Ohio",
    "ownershipStatus": "Own",
    "buildingType": "Industrial / Manufacturing",
    "squareFootage": "Unknown",
    "primaryActivityText": "Washing-machine and appliance manufacturing, assembly, testing, warehousing, and plant operations",
    "naicsCodes": [
      "335220"
    ],
    "publicSourceNotes": "Public records identify Whirlpool at 119 Birdseye Street in Clyde and describe a major appliance manufacturing operation.",
    "notes": "Tests a large industrial customer served by a municipal electric utility rather than the more common surrounding IOU.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "119 Birdseye Street, Clyde, OH 43410, USA",
        "stateCode": "OH",
        "zip5": "43410"
      },
      "geo": {
        "stateCode": "OH",
        "zip5": "43410",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Clyde Light & Power",
          "distributionUtilityId": "UTIL_CLYDE_LIGHT_POWER",
          "territoryCandidates": [
            "UTIL_CLYDE_LIGHT_POWER"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "industrial_manufacturing"
      ],
      "squareFootage": {
        "value": null,
        "raw": "Unknown",
        "parsingStatus": "needs_validation"
      }
    }
  },
  "siteEnergyProfile": {
    "availableFieldIds": [
      "account_number_masked",
      "annual_electric_cost",
      "annual_gas_cost",
      "annual_kwh",
      "annual_sewer_cost",
      "annual_therms",
      "annual_water_cost",
      "annual_water_use",
      "average_cost_per_kwh",
      "average_cost_per_therm",
      "billing_period_end",
      "billing_period_start",
      "bin_size",
      "contamination_fees",
      "customer_class",
      "delivery_charges",
      "demand_charge_rate",
      "demand_charges",
      "fixed_customer_charge",
      "fixed_gas_charge",
      "gas_delivery_charges",
      "gas_procurement_charges",
      "gas_rate_schedule",
      "gas_utility_provider",
      "generation_charges",
      "irrigation_meter_present",
      "landfill_service_cost",
      "meter_size",
      "monthly_kwh",
      "monthly_peak_kw",
      "monthly_therms",
      "monthly_water_use",
      "organics_service_cost",
      "overage_fees",
      "peak_kw",
      "pickup_frequency",
      "rate_schedule",
      "recycling_service_cost",
      "service_address",
      "sewer_cost",
      "stormwater_fee",
      "taxes_and_fees",
      "time_of_use_periods",
      "total_electric_cost",
      "total_gas_cost",
      "total_waste_cost",
      "total_water_cost",
      "utility_provider",
      "waste_hauler",
      "water_provider",
      "water_unit"
    ],
    "latestUtilityProvider": "Private industrial waste and recycling haulers",
    "annualKwh": 167400000,
    "annualElectricCost": 12772800,
    "averageCostPerKwh": 0.0763,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 12772800
      },
      {
        "utilityCategory": "gas",
        "annualCost": 7586200
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 792540
      },
      {
        "utilityCategory": "waste",
        "annualCost": 2032000
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "annual_property_tax_cents",
      "oh_sitused_gross_receipts_cents",
      "state_program_match_status"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "OH",
      "sourceFileId": "taxfile_whirlpool_clyde_2026_property_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "annual_property_tax_cents",
      "value": 259000000,
      "sourceFileId": "taxfile_whirlpool_clyde_2026_property_bill",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "oh_sitused_gross_receipts_cents",
      "value": 426000000000,
      "sourceFileId": "taxfile_whirlpool_clyde_2026_tax_workpaper",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 9000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 3,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 1576000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 7280000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 160425,
        "assumptions": [
          "LED preview assumes 12 fixture replacements with fixed operating hours and fixture costs.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "small_wind_turbine",
      "displayName": "Small wind turbine",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 8000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 680000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 12000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "engineering_feasibility_study",
      "displayName": "Engineering feasibility study",
      "parentCategory": "audits_studies_planning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported"
      }
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 798000,
        "assumptions": [
          "HVAC preview uses an admin-modeled annual kWh reduction until equipment-specific efficiency inputs are collected.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "high_efficiency_refrigeration_equipment",
      "displayName": "High-efficiency refrigeration equipment",
      "parentCategory": "refrigeration",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 345000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "parentCategory": "certifications_compliance",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported"
      }
    },
    {
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 10000000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (industrial_manufacturing) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "User site or facility type (industrial_manufacturing) does not match broad_commercial eligibility.",
      "count": 362
    },
    {
      "value": "Project site state OH does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state OH does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Opportunity appears residential-only and the user profile is nonresidential.",
      "count": 93
    },
    {
      "value": "Project site state OH does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state OH does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state OH does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state OH does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Opportunity site or facility specificity (multifamily_residential) does not match the user's site type (industrial_manufacturing).",
      "count": 65
    },
    {
      "value": "Project site state OH does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Project site state OH does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state OH does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state OH does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state OH does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state OH does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state OH does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state OH does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (industrial_manufacturing).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (industrial_manufacturing).",
      "count": 38
    }
  ]
}
```

## Inputs To Add Where Realistic

Think about these categories, but only add values that make sense for this specific customer:

- project stage, procurement stage, preapproval/application status
- eligible project cost by retrofit
- unit quantities: charger ports, fixtures, HVAC units, system kW, battery kWh, audit/study cost
- selected equipment/measure types and conservative sizing
- applicant facts: nonprofit, public entity, school, state entity, agricultural producer, tribal entity, fleet owner, utility customer, etc.
- ownership/control facts and tenant/landlord constraints
- grant-specific inputs for matched grant opportunities
- explicit nonqualification facts where realistic
- missing quote/bill/application facts that should keep estimates suppressed

## Required Output

Return JSON only. Values are synthetic unless already present in the test case. Amounts must be cents. Use null when the value should remain unknown.

```json
{
  "schemaVersion": "retrofi_test_case_grant_profile_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "sampleUserId": "whirlpool-clyde-operations",
  "profileConfidence": "high | medium | low",
  "profileNotes": "",
  "organizationFactsToAddOrUpdate": [
    {
      "inputKey": "",
      "value": null,
      "valueType": "number | boolean | text | date | enum | money_cents | array",
      "sourceStrategy": "existing_test_case | synthetic_realistic_default | public_context | should_ask_user | quote_required | application_status_required",
      "confidence": "high | medium | low",
      "userOverrideAllowed": true,
      "reasoning": ""
    }
  ],
  "retrofitProjectInputs": [
    {
      "retrofitTypeId": "",
      "projectScopeSummary": "",
      "inputFacts": [
        {
          "inputKey": "",
          "value": null,
          "valueType": "number | boolean | text | date | enum | money_cents | array",
          "sourceStrategy": "synthetic_realistic_default | derived_from_building_size | derived_from_utility_profile | should_ask_user | quote_required",
          "confidence": "high | medium | low",
          "userOverrideAllowed": true,
          "reasoning": ""
        }
      ],
      "shouldQualifyForTypicalGrants": true,
      "qualificationCaveats": []
    }
  ],
  "grantOpportunitySpecificInputs": [
    {
      "opportunityId": "",
      "expectedHandling": "calculate_if_formula_ready | needs_quote | needs_project_scope | needs_application_status | likely_ineligible | suppress_no_probability_evidence | not_relevant_to_this_profile",
      "inputFacts": [],
      "reasoning": ""
    }
  ],
  "missingInputsThatShouldRemainMissing": [
    {
      "inputKey": "",
      "reason": "quote not available | application not submitted | source requires agency approval | unrealistic for this customer | needs user decision"
    }
  ],
  "doNotForceQualificationReasons": []
}
```
