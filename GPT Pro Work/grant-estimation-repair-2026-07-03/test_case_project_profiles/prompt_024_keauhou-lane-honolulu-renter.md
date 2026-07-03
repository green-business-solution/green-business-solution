You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 24 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "keauhou-lane-honolulu-renter",
  "description": "Anonymized workforce-housing household in a mixed-use Honolulu multifamily building.",
  "sourceForm": {
    "sampleUserId": "keauhou-lane-honolulu-renter",
    "description": "Anonymized workforce-housing household in a mixed-use Honolulu multifamily building.",
    "companyName": "Anonymized workforce-housing household at Keauhou Lane",
    "website": "https://www.edlenandco.com/projects-middle-income/keauhou-lane",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "502 Keawe Street, Honolulu, HI 96813, USA",
    "electricUtilityProvider": "Hawaiian Electric",
    "gasUtilityProvider": "Hawaii Gas",
    "ownershipStatus": "Lease",
    "buildingType": "Mixed-use",
    "squareFootage": "179,800",
    "primaryActivityText": "Residential occupancy in workforce housing with shared mixed-use building loads",
    "naicsCodes": [
      "531110"
    ],
    "publicSourceNotes": "Keauhou Lane is a publicly described mixed-use workforce-housing development in Honolulu with reserved housing units and commercial space.",
    "notes": "Tests island utility costs, mixed-use building classification, workforce-housing eligibility, and landlord-controlled solar or hot-water systems.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "502 Keawe Street, Honolulu, HI 96813, USA",
        "stateCode": "HI",
        "zip5": "96813"
      },
      "geo": {
        "stateCode": "HI",
        "zip5": "96813",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Hawaiian Electric",
          "distributionUtilityId": "UTIL_HAWAIIAN_ELECTRIC",
          "territoryCandidates": [
            "UTIL_HAWAIIAN_ELECTRIC"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "mixed_use"
      ],
      "squareFootage": {
        "value": 179800,
        "raw": "179,800",
        "parsingStatus": "parsed"
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
      "customer_class",
      "gas_rate_schedule",
      "gas_utility_provider",
      "irrigation_meter_present",
      "meter_size",
      "monthly_kwh",
      "monthly_therms",
      "monthly_water_use",
      "rate_schedule",
      "service_address",
      "sewer_cost",
      "stormwater_fee",
      "total_electric_cost",
      "total_gas_cost",
      "total_water_cost",
      "utility_provider",
      "water_provider",
      "water_unit"
    ],
    "latestUtilityProvider": "Board of Water Supply, City and County of Honolulu",
    "annualKwh": 5200,
    "annualElectricCost": 2240,
    "averageCostPerKwh": 0.4308,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 2240
      },
      {
        "utilityCategory": "gas",
        "annualCost": 390
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 470
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "state_code",
      "ownership_status",
      "site_square_footage",
      "mixed_use_load_split_review_required",
      "direct_property_tax_bill_to_applicant",
      "eligible_current_batch_tax_geography"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "HI",
      "sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "ownership_status",
      "value": "Lease",
      "sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "building_type",
      "value": "Mixed-use",
      "sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "site_square_footage",
      "value": 179800,
      "sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "mixed_use_residential_commercial_load_split_needs_review",
      "value": true,
      "sourceFileId": "taxfile_batch2_014_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 680000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
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
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 2,
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
      "opportunityCount": 2,
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
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 10000000,
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
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "opportunityCount": 1,
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
      "retrofitTypeId": "microgrid_system",
      "displayName": "Microgrid system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 10920000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "thermal_energy_storage",
      "displayName": "Thermal energy storage",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 5510000,
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
      "value": "User site or facility type (mixed_use) does not match broad_residential eligibility.",
      "count": 553
    },
    {
      "value": "Project site state HI does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state HI does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial.",
      "count": 80
    },
    {
      "value": "Project site state HI does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state HI does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state HI does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state HI does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Project site state HI does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial, other, industrial.",
      "count": 55
    },
    {
      "value": "Project site state HI does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state HI does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state HI does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state HI does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state HI does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state HI does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state HI does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial, industrial.",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (mixed_use).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (mixed_use).",
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
  "sampleUserId": "keauhou-lane-honolulu-renter",
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
