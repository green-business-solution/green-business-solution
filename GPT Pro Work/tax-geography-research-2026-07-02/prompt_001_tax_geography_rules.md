You are helping RetroFi build a locality-aware tax geography database for clean-energy and efficiency incentives.

Current date: 2026-07-02.

Return only valid JSON. Do not use markdown. Do not wrap the JSON in fences. Do not include commentary outside the JSON.

Goal:
Research the tax geography rules below and produce source-backed records that can improve RetroFi's `data/tax_geography_rules.json`.

Important principles:
- Use official primary sources whenever possible: state tax/revenue departments, municipal assessor or treasurer pages, statutes, regulations, official forms/instructions, and official program manuals.
- Do not invent local rates, eligibility, adoption status, or assessor treatment.
- If a value depends on the user's actual tax return, property tax bill, approved agreement, assessor confirmation, or local adoption, mark it as user/professional input required.
- If there is no current official source, set sourceConfidence to "low" and do not provide calculable derived inputs.
- Separate what the server can derive from geography from what the user/accountant/assessor must provide.
- Treat ZIP code as fallback only; prefer state FIPS/code, county FIPS, place GEOID/municipality, tract/block, and coordinates.

Input tax geography seed rules to repair:
[
  {
    "seedRuleId": "tax_geo_mi_rerz_tax_exemption_workflow_v1",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
    "programName": "Renewable Energy Renaissance Zones",
    "state": "MI",
    "currentNeed": "Determine whether a geography database can identify eligible Renaissance Zone boundaries or whether approval documents/user confirmation are always required. Identify excluded taxes, eligible taxes, phaseout schedule rules, local income tax treatment, and official sources."
  },
  {
    "seedRuleId": "tax_geo_ri_renewable_property_tax_local_assessor_workflow_v1",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
    "programName": "Renewable Energy Tax Valuation",
    "state": "RI",
    "currentNeed": "Determine how Rhode Island renewable-energy property-tax valuation works by municipality, whether local adoption or assessor confirmation is required, what ordinary property-tax/millage/rate inputs are needed, and what geography keys should be stored."
  },
  {
    "seedRuleId": "tax_geo_wa_solar_manufacturing_bo_preferential_rate_2026_v1",
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
    "programName": "Tax Abatement for Solar Manufacturers",
    "state": "WA",
    "currentNeed": "Verify the Washington solar manufacturing B&O preferential rate, expiration/sunset, qualifying activities, ordinary comparison-rate logic, deductions/MATC treatment, reporting requirements, and whether locality matters beyond state."
  }
]

Output schema:
{
  "schemaVersion": "retrofi_tax_geography_research_repairs.v1",
  "researchedAt": "YYYY-MM-DD",
  "source": "gpt_pro",
  "summary": {
    "rulesReviewed": 3,
    "rulesWithCalculableDerivedInputs": 0,
    "rulesRequiringUserOrProfessionalInput": 0,
    "rulesRequiringMoreResearch": 0
  },
  "rules": [
    {
      "seedRuleId": "string",
      "opportunityId": "string",
      "programName": "string",
      "recommendedAction": "replace_seed_rule|keep_seed_rule_with_updates|split_into_multiple_rules|archive_rule|needs_human_review",
      "sourceConfidence": "high|medium|low",
      "taxType": "property_tax|sales_use_tax|income_tax|business_and_occupation_tax|property_income_tax_exemption|other",
      "ruleKind": "state_tax_rate_preference|local_assessor_workflow|approved_zone_tax_exemption_workflow|local_option_tax_rule|tax_exemption|other",
      "geography": {
        "country": "US",
        "states": ["MI"],
        "stateFips": [],
        "countyFips": [],
        "placeGeoids": [],
        "municipalities": [],
        "specialDistricts": [],
        "tracts": [],
        "notes": "Explain exactly what geography can and cannot determine."
      },
      "effectiveStartDate": "YYYY-MM-DD|null",
      "effectiveEndDate": "YYYY-MM-DD|null",
      "derivedInputs": [
        {
          "inputKey": "string",
          "value": "string|number|boolean",
          "valueType": "string|number|boolean|date",
          "source": "official_source|reviewed_tax_geography_rule",
          "userOverrideAllowed": true,
          "confidence": "high|medium|low",
          "evidenceText": "Short quote or paraphrase supporting this exact value."
        }
      ],
      "requiredUserInputs": [
        {
          "inputKey": "string",
          "label": "string",
          "reason": "Why RetroFi cannot derive this safely from geography.",
          "sourceStrategy": "user_input|tax_return_or_accountant|property_tax_bill|assessor_confirmation|approved_program_document|official_dataset_refresh|admin_review",
          "uiPlacement": "tax_profile|property_tax_profile|organization_profile|admin_only"
        }
      ],
      "serverDerivableInputs": [
        {
          "inputKey": "string",
          "sourceGeographyField": "stateCode|stateFips|countyFips|countyName|placeGeoid|placeName|censusTractGeoid|censusBlockGeoid|coordinates|zip5",
          "notes": "How the server should derive it."
        }
      ],
      "localityMatters": true,
      "localityExplanation": "Explain whether county/city/municipality/assessor jurisdiction changes the calculation.",
      "calculationImpact": {
        "canCalculateWithoutUserTaxData": false,
        "canCalculateWithGeographyOnly": false,
        "canCalculateWithOfficialLocalDataset": false,
        "canCalculateWithUserTaxBill": false,
        "recommendedEstimateStatus": "deterministic_estimate|needs_project_scope|needs_tax_profile|needs_assessor_review|needs_accountant_review|not_calculable|human_review_required|suppressed"
      },
      "sourceUrls": [],
      "evidenceText": "Concise evidence summary.",
      "reasoningNotes": "Concise implementation notes for Codex."
    }
  ],
  "databaseRecommendations": {
    "officialDatasetsToDownloadOrReference": [
      {
        "name": "string",
        "jurisdiction": "string",
        "datasetType": "tax_rate_table|assessor_parcels|municipal_boundaries|special_district_boundaries|forms_instructions|statute_rules|other",
        "url": "string",
        "refreshFrequency": "monthly|quarterly|annual|on_change|unknown",
        "useInRetroFi": "string"
      }
    ],
    "cronRefreshPlan": [
      "Concrete recurring refresh step"
    ],
    "openQuestionsForHuman": [
      "Question"
    ]
  }
}

Quality checks before finalizing:
- Every rule must include at least one official source URL unless sourceConfidence is "low" and recommendedAction is "needs_human_review".
- Do not include broad generic tax advice.
- Do not mark anything calculable unless the formula inputs are source-backed and the required user/project inputs are explicit.
- If locality matters but no official local dataset is identified, say so clearly.
