# Tax Geography Model

RetroFi uses address-resolved geography as the join key for locality-aware tax estimates.

## Current Flow

1. Intake stores `site.geography` from Census Geocoder, with Geocodio as fallback.
2. `normalizeUserProfile` exposes state, county, place, tract, block, ZIP, and coordinates on `site.geo`.
3. Savings previews pass that geography into the v2 incentive runtime.
4. `apps/api/server/savings/tax.mjs` normalizes geography and matches rules from `data/tax_geography_rules.json`.
5. Matched rules can add source-backed v2 inputs, such as preferential tax rates, while address geography can add jurisdiction facts such as `municipality`, `site_county_fips`, and `place_geoid`.
6. Rules can also declare `serverDerivableInputs` for workflow routing facts, such as `state_fips`, `place_name`, or an assessor-jurisdiction coordinate candidate. These are still not proof of tax eligibility unless the rule says so.

## Data File

`data/tax_geography_rules.json` is the current seed artifact for opportunity-specific tax rules and source-backed geography constants. `data/tax_local_workflow_rules.json` is the companion local-tax workflow artifact for city/county business-tax and property-tax adapter routing. Both are intentionally conservative and should later become database tables.

Rule shape:

```json
{
  "id": "tax_geo_example_v1",
  "version": 1,
  "active": true,
  "taxType": "property_tax",
  "ruleKind": "local_assessor_workflow",
  "geography": {
    "country": "US",
    "state": "RI",
    "stateFips": "44",
    "countyFips": "44007",
    "placeGeoid": "4459000"
  },
  "opportunityIds": ["SOURCE_DSIRE:dsire_program_id:22798"],
  "effectiveStartDate": "2026-01-01",
  "effectiveEndDate": null,
  "sourceConfidence": "medium",
  "derivedInputs": [
    {
      "inputKey": "preferential_rate_decimal",
      "value": 0.00275,
      "source": "reviewed_tax_geography_rule",
      "userOverrideAllowed": false,
      "confidence": "high"
    }
  ],
  "requiredUserInputs": [
    {
      "inputKey": "local_assessor_confirmation",
      "label": "Local assessor confirmed renewable tax treatment",
      "sourceStrategy": "assessor_confirmation",
      "uiPlacement": "admin_only"
    }
  ],
  "requiresUserOrProfessionalInputs": ["local_assessor_confirmation"],
  "serverDerivableInputs": [
    {
      "inputKey": "place_name",
      "sourceGeographyField": "placeName"
    }
  ],
  "calculationImpact": {
    "canCalculateWithGeographyOnly": false,
    "recommendedEstimateStatus": "needs_assessor_review"
  },
  "humanReviewRequired": true,
  "sourceUrls": [],
  "evidenceText": "",
  "refreshNotes": ""
}
```

Geography can use singular fields (`state`, `countyFips`, `placeGeoid`) or researched array fields (`states`, `countyFips`, `placeGeoids`). The runtime normalizes both forms before matching.

`derivedInputs` should only contain source-backed facts that the server can safely provide without user-specific tax records. Keep compatibility aliases when an existing v2 package already expects a legacy key.

## Inclusion Policy

Do not include a tax estimate in user-facing totals unless:

- the geography rule is source-backed and effective for the calculation date;
- the site geography resolves to the required jurisdiction;
- required user, bill, quote, tax-return, accountant, or assessor inputs are present;
- the v2 package does not require human review; and
- the result is not based on placeholder synthetic test-case values.

Local workflow records add one more default: `includeInUserFacingTotalDefault` is `false` unless a workflow is explicitly promoted after source, user-input, bill, accountant, or assessor confirmation. A local business-tax formula can return an internal calculation once the class and tax-base inputs are present, but it should still stay out of customer-facing savings totals until the input source is confirmable.

## Scheduled Refresh TODO

Tax data needs a recurring refresh job similar to opportunity collection. The future job should:

- refresh state tax authority sources;
- refresh local-option sales/use tax tables where available;
- refresh county/city assessor and treasurer datasets for property-tax rules;
- check effective dates, sunset dates, and filing forms;
- diff changes before applying them;
- mark stale or conflicting rules as not user-facing; and
- queue ambiguous records for GPT Pro or human review.
