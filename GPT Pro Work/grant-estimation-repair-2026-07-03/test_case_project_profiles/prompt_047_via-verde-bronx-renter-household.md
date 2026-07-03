You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 47 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "via-verde-bronx-renter-household",
  "description": "Anonymized renter household in Bronx mixed-income multifamily housing with ConEd electric and gas service.",
  "sourceForm": {
    "sampleUserId": "via-verde-bronx-renter-household",
    "description": "Anonymized renter household in Bronx mixed-income multifamily housing with ConEd electric and gas service.",
    "companyName": "Anonymized renter household at Via Verde",
    "website": "https://www.phippsny.org/locations/via-verde/",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "700 Brook Avenue, Bronx, NY 10455, USA",
    "electricUtilityProvider": "Consolidated Edison Company of New York",
    "gasUtilityProvider": "Consolidated Edison Company of New York",
    "ownershipStatus": "Lease",
    "buildingType": "Multifamily / Apartment Building",
    "squareFootage": "Unknown",
    "primaryActivityText": "Residential occupancy in affordable or mixed-income multifamily housing with tenant and common-area utility ambiguity",
    "naicsCodes": [
      "531110",
      "814110"
    ],
    "publicSourceNotes": "Via Verde is a publicly identified mixed-income multifamily property at 700 Brook Avenue with 222 units and sustainability features. Household is anonymized.",
    "notes": "Tests residential tenant versus building-owner eligibility, low-income multifamily logic, and competitive supplier confusion in ConEd territory.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "700 Brook Avenue, Bronx, NY 10455, USA",
        "stateCode": "NY",
        "zip5": "10455"
      },
      "geo": {
        "stateCode": "NY",
        "zip5": "10455",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Consolidated Edison Company of New York",
          "distributionUtilityId": "UTIL_CONED",
          "territoryCandidates": [
            "UTIL_CONED"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "multifamily_residential"
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
    "latestUtilityProvider": "New York City Department of Environmental Protection",
    "annualKwh": 3600,
    "annualElectricCost": 1080,
    "averageCostPerKwh": 0.3,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 1080
      },
      {
        "utilityCategory": "gas",
        "annualCost": 345
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 360
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "state_code",
      "ownership_status",
      "direct_property_tax_bill_to_applicant",
      "tenant_unit_utility_responsibility",
      "building_type",
      "eligible_current_batch_tax_geography"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "NY",
      "sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "ownership_status",
      "value": "Lease",
      "sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "taxpayer_has_direct_property_tax_bill",
      "value": false,
      "sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "tenant_controls_common_area_or_roof_systems",
      "value": false,
      "sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    },
    {
      "inputKey": "building_owner_or_landlord_tax_docs_required_for_property_incentives",
      "value": true,
      "sourceFileId": "taxfile_batch2_011_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    }
  ],
  "retrofitSummaries": [
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
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "opportunityCount": 1,
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
      "retrofitTypeId": "duct_sealing_and_insulation",
      "displayName": "Duct sealing and duct insulation",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 147200,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 316000,
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
      "retrofitTypeId": "low_flow_fixture_retrofit",
      "displayName": "Low-flow fixture retrofit",
      "parentCategory": "water_efficiency",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 116400,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "smart_thermostat_zoning_retrofit",
      "displayName": "Smart thermostat / zoning retrofit",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 100600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    }
  ],
  "blockers": [
    {
      "value": "User site or facility type (multifamily_residential) does not match broad_commercial eligibility.",
      "count": 362
    },
    {
      "value": "User site or facility type (multifamily_residential) does not match broad_nonresidential eligibility.",
      "count": 208
    },
    {
      "value": "Project site state NY does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state NY does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial.",
      "count": 80
    },
    {
      "value": "Project site state NY does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state NY does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state NY does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state NY does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Project site state NY does not match opportunity geography WA.",
      "count": 61
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial, other, industrial.",
      "count": 55
    },
    {
      "value": "Project site state NY does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state NY does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state NY does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state NY does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state NY does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state NY does not match opportunity geography NC.",
      "count": 40
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial, industrial.",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (agricultural_facility) does not match the user's site type (multifamily_residential).",
      "count": 38
    },
    {
      "value": "Opportunity site or facility specificity (education_campus) does not match the user's site type (multifamily_residential).",
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
  "sampleUserId": "via-verde-bronx-renter-household",
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
