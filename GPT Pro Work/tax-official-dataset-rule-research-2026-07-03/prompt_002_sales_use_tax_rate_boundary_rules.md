You are helping RetroFi build a source-backed tax dataset and rule database.

Task name: Sales and use tax rate/boundary rule research
Research date: 2026-07-03

Rules:
- Use official government, utility, tax agency, assessor, treasurer, statutory, regulatory, or filed-tariff sources wherever possible.
- Prefer machine-readable official sources over third-party summaries.
- Do not invent rates, jurisdictions, formulas, or effective dates.
- If official data is not complete, mark the gap and state the safest user-facing behavior.
- Separate geography-derived facts from taxpayer/project-specific facts.
- Separate source confidence from estimate confidence.
- Return JSON only. No markdown outside the JSON object.
- Use source URLs and concise evidence text for every material claim.


Task:
Research the official sources and normalized rule model for sales/use tax rate lookup. Prioritize official state revenue departments, Streamlined Sales Tax rate/boundary files, and official address lookup APIs where available.

For each U.S. state and DC, determine:
- whether the state has sales/use tax;
- whether local rates apply;
- whether official rate/boundary files or APIs exist;
- whether lookup requires address, ZIP+4, county/city, coordinates, or special district;
- whether product category exemptions may matter for retrofit equipment/labor;
- whether installation labor is taxable by default or requires category-specific review.

Return JSON only using this schema:
```json
{
  "schemaVersion": "retrofi_sales_use_tax_rule_research.v1",
  "researchedAt": "2026-07-03",
  "source": "gpt_pro",
  "stateRules": [
    {
      "state": "CA",
      "stateFips": "06",
      "hasStateSalesTax": true,
      "localRatesApply": true,
      "officialRateSources": [],
      "officialBoundarySources": [],
      "lookupTools": [],
      "machineReadableImportPlan": "",
      "addressResolutionNeeded": true,
      "joinKeys": [],
      "equipmentTaxabilityDefault": "taxable | exempt | category_specific | unknown",
      "installationLaborTaxabilityDefault": "taxable | exempt | category_specific | unknown",
      "retrofitSpecificNotes": [],
      "effectiveDateRules": "",
      "refreshFrequency": "",
      "sourceConfidence": "high | medium | low",
      "humanReviewRequired": false,
      "humanReviewReasons": []
    }
  ],
  "normalizedRuleSchemaRecommendations": {},
  "importPriorityOrder": [],
  "validationRules": []
}
```
