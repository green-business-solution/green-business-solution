You are helping RetroFi build a source-backed tax dataset and rule database.

Task name: National official tax dataset source catalog
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
Build a national official-source catalog for tax datasets RetroFi should use to minimize user-entered tax inputs.

Cover these tax data families:
- state sales and use tax rate/boundary datasets, APIs, downloadable files, and local-option addenda;
- state and local property tax datasets, including assessor, treasurer, parcel, millage, exemption, abatement, and taxing district sources;
- state income/franchise/gross receipts/B&O/CAT/excise tax rate and form sources relevant to business incentives;
- local business tax sources such as city B&O, gross receipts, local income, and occupational taxes where applicable;
- program-specific tax incentive statutes, manuals, application guides, and annual reporting sources.

For each source, identify whether it is machine-readable, official but manual/PDF, official lookup-only, or not currently usable.

Return JSON only using this schema:
```json
{
  "schemaVersion": "retrofi_official_tax_dataset_source_catalog.v1",
  "researchedAt": "2026-07-03",
  "source": "gpt_pro",
  "datasetFamilies": [
    {
      "taxDataFamily": "sales_use_tax | property_tax | state_business_tax | local_business_tax | tax_incentive_rules | parcel_boundary | assessor_boundary | special_district_boundary",
      "jurisdictionLevel": "federal | state | county | city | municipality | special_district | mixed",
      "jurisdictionsCovered": [],
      "officialSourceName": "",
      "officialOwner": "",
      "sourceUrls": [],
      "machineReadable": true,
      "accessMethod": "download | API | lookup_tool | PDF | HTML_table | GIS_service | unknown",
      "fileFormats": [],
      "updateFrequency": "",
      "effectiveDateHandling": "",
      "addressOrGeographyJoinKeys": [],
      "licensingOrUseNotes": "",
      "priority": "high | medium | low",
      "implementationNotes": "",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "recommendedFirstImports": [],
  "datasetsNeedingGPTProGapResearch": [],
  "humanReviewWarnings": []
}
```
