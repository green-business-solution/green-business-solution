You are helping RetroFi create realistic synthetic project-profile data for grant estimation tests.

Prompt 19 of 50.

This is NOT source research for grant formulas. This is project/test-case enrichment. Use the supplied test-case facts, public/common-sense building assumptions, and realistic project planning assumptions. You may use the organization's public website only for basic context, but do not invent that a project qualifies for a grant just to make the estimate positive.

## Goal

Add realistic synthetic project-profile inputs for this test case so Codex can calculate or suppress grant estimates. The profile should look like a real customer record: some projects should qualify, some should not, some should need quote data, and some should have uncertainty.

Do not make every grant barely qualify. If the organization/building/project would not normally pursue a grant, mark that honestly.

## Current Test Case Context

```json
{
  "sampleUserId": "hoa-mai-gardens-seattle-household",
  "description": "Anonymized household in Seattle public housing with municipal electric service.",
  "sourceForm": {
    "sampleUserId": "hoa-mai-gardens-seattle-household",
    "description": "Anonymized household in Seattle public housing with municipal electric service.",
    "companyName": "Anonymized household at Hoa Mai Gardens",
    "website": "https://www.seattlehousing.org/",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "221 10th Avenue S, Seattle, WA 98104, USA",
    "electricUtilityProvider": "Seattle City Light",
    "gasUtilityProvider": "Puget Sound Energy",
    "ownershipStatus": "Lease",
    "buildingType": "Multifamily / Apartment Building",
    "squareFootage": "150,730",
    "primaryActivityText": "Residential occupancy in income-qualified public housing with tenant and housing-authority control split",
    "naicsCodes": [
      "531110",
      "925110"
    ],
    "publicSourceNotes": "Seattle Housing Authority lists Hoa Mai Gardens at 221 10th Ave S. Public project records report roughly 150,730 square feet.",
    "notes": "Tests public-housing applicant logic, tenant versus housing authority control, municipal electric utility territory, and low-income multifamily qualification.",
    "project": {
      "stage": "exploring"
    }
  },
  "normalizedProfile": {
    "site": {
      "addressStructured": {
        "raw": "221 10th Avenue S, Seattle, WA 98104, USA",
        "stateCode": "WA",
        "zip5": "98104"
      },
      "geo": {
        "stateCode": "WA",
        "zip5": "98104",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Seattle City Light",
          "distributionUtilityId": "UTIL_SEATTLE_CITY_LIGHT",
          "territoryCandidates": [
            "UTIL_SEATTLE_CITY_LIGHT"
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
        "value": 150730,
        "raw": "150,730",
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
    "latestUtilityProvider": "Seattle Public Utilities",
    "annualKwh": 4200,
    "annualElectricCost": 640,
    "averageCostPerKwh": 0.1524,
    "utilitySummaries": [
      {
        "utilityCategory": "electric",
        "annualCost": 640
      },
      {
        "utilityCategory": "gas",
        "annualCost": 370
      },
      {
        "utilityCategory": "water_sewer",
        "annualCost": 520
      }
    ]
  },
  "siteTaxProfile": {
    "availableFieldIds": [
      "state_code",
      "ownership_status",
      "site_square_footage",
      "direct_property_tax_bill_to_applicant",
      "business_excise_tax_return_present",
      "solar_manufacturing_activity_indicated"
    ]
  },
  "existingTaxFacts": [
    {
      "inputKey": "state_code",
      "value": "WA",
      "sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "hidden_derived",
      "userOverrideAllowed": false,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "ownership_status",
      "value": "Lease",
      "sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "low"
    },
    {
      "inputKey": "qualifying_solar_b_and_o_classification",
      "value": "not_applicable_residential_renter",
      "sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "organization_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "has_washington_business_excise_tax_return",
      "value": false,
      "sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "high"
    },
    {
      "inputKey": "taxpayer_has_direct_property_tax_bill",
      "value": false,
      "sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
      "sourceStrategy": "synthetic_tax_document",
      "uiPlacement": "property_tax_profile",
      "userOverrideAllowed": true,
      "defaultIsSynthetic": true,
      "confidenceImpactUntilConfirmed": "medium"
    }
  ],
  "existingTaxOpportunitySpecificInputs": [
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
      "inputKey": "qualifying_solar_b_and_o_classification",
      "value": "not_applicable_residential_renter",
      "sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Synthetic lease/intake document identifies a residential tenant, not a Washington solar manufacturer, processor for hire, or manufacturer wholesaler."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
      "inputKey": "qualifying_tax_base_after_deductions_and_matc_cents",
      "value": null,
      "sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "No Washington B&O tax base appears in the household tenant fixture."
    },
    {
      "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
      "inputKey": "annual_tax_performance_report_filed",
      "value": null,
      "sourceFileId": "taxfile_batch2_012_tenant_intake_2026",
      "estimateStatusIfUsed": "suppressed",
      "includeInUserFacingTotalBeforeConfirmation": false,
      "notes": "Annual Tax Performance Report status is not relevant unless the applicant is a qualifying solar manufacturer claiming the WA preference."
    }
  ],
  "retrofitSummaries": [
    {
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "opportunityCount": 3,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 316000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:5622"
      ]
    },
    {
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 1172000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
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
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 194600,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      },
      "grantOpportunityIds": [
        "SOURCE_DSIRE:dsire_program_id:5622"
      ]
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
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
      "retrofitTypeId": "community_solar_subscription",
      "displayName": "Community solar subscription",
      "parentCategory": "solar_renewable_electricity",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 50000,
        "assumptions": [
          "Community solar preview models the subscribed annual bill credit value, not an owned onsite asset.",
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "heat_pump_water_heater",
      "displayName": "Heat pump water heater",
      "parentCategory": "water_heating",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 350000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
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
      "retrofitTypeId": "waste_heat_recovery",
      "displayName": "Waste heat recovery",
      "parentCategory": "compressed_air_industrial",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 636000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "No source-backed OpportunityIncentiveRule or v2 calculation package matched this retrofit preview, so opportunity savings are shown as $0.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    },
    {
      "retrofitTypeId": "window_replacement",
      "displayName": "Window replacement",
      "parentCategory": "building_envelope",
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "upfrontCostCents": 444000,
        "assumptions": [
          "Admin test-case fixture uses fixed project inputs until real project inputs are collected.",
          "Opportunity savings use source-backed incentive rules and reviewed v2 calculation packages when a matched rule is complete enough to include.",
          "This is not a customer quote or final savings estimate."
        ]
      }
    }
  ],
  "grantRelatedMatches": [
    {
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5622",
          "opportunityName": "Seattle HomeWise: Weatherization",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5622/seattle-homewise-weatherization",
          "websiteUrl": "https://www.seattle.gov/housing/homeowners/weatherization",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "Seattle Office of Housing",
          "state": "WA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "grantOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5622",
          "opportunityName": "Seattle HomeWise: Weatherization",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5622/seattle-homewise-weatherization",
          "websiteUrl": "https://www.seattle.gov/housing/homeowners/weatherization",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant Program",
          "administrator": "Seattle Office of Housing",
          "state": "WA",
          "rankScore": 100,
          "opportunityDataConfidence": 0.79,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state WA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: residential.",
            "User site is compatible with broad residential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ]
        }
      ]
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
      "value": "Project site state WA does not match opportunity geography CA.",
      "count": 176
    },
    {
      "value": "Project site state WA does not match opportunity geography MN.",
      "count": 112
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial.",
      "count": 80
    },
    {
      "value": "Project site state WA does not match opportunity geography CO.",
      "count": 74
    },
    {
      "value": "Project site state WA does not match opportunity geography MA.",
      "count": 70
    },
    {
      "value": "Project site state WA does not match opportunity geography OR.",
      "count": 70
    },
    {
      "value": "Project site state WA does not match opportunity geography TX.",
      "count": 67
    },
    {
      "value": "Applicant type residential does not match eligible sectors commercial, other, industrial.",
      "count": 55
    },
    {
      "value": "Project site state WA does not match opportunity geography FL.",
      "count": 55
    },
    {
      "value": "Project site state WA does not match opportunity geography MD.",
      "count": 53
    },
    {
      "value": "Project site state WA does not match opportunity geography IL.",
      "count": 47
    },
    {
      "value": "Project site state WA does not match opportunity geography IN.",
      "count": 46
    },
    {
      "value": "Project site state WA does not match opportunity geography PA.",
      "count": 46
    },
    {
      "value": "Project site state WA does not match opportunity geography NY.",
      "count": 43
    },
    {
      "value": "Project site state WA does not match opportunity geography NC.",
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
  "sampleUserId": "hoa-mai-gardens-seattle-household",
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
