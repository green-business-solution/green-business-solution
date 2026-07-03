You are helping repair RetroFi's tax data. Research only official sources.

Gap ID: `mi_detroit_wayne_rerz_project_specific`

Current known state:

- RetroFi has Michigan Renewable Energy Renaissance Zone / Renaissance Zone workflow logic.
- The runtime can calculate only if the user supplies approved designation/project documents, parcel/zone confirmation, taxpayer compliance, phaseout multiplier, and eligible otherwise-due tax lines.
- Shell research did not find official project-specific evidence tying a Detroit/Wayne sample property, such as Factory ZERO or another property, to an approved Renewable Energy Renaissance Zone calculation package with eligible tax lines.

Task:

1. Search official Michigan, Detroit, Wayne County, MEDC, EGLE, city council, tax assessor, treasurer, and local development authority sources.
2. Determine whether there are official records for a Detroit/Wayne renewable energy renaissance zone project that identify:
   - approved company/project
   - parcel(s) or legal description
   - zone term/final year/phaseout
   - eligible tax lines or exemption scope
   - revocation/amendment status if any
3. If no suitable official project-specific record exists, state that clearly and keep the workflow gated to user/accountant-supplied documents.
4. Do not infer eligible tax amounts from news articles, press releases, project cost, or general program descriptions.

Return JSON only:

```json
{
  "schemaVersion": "retrofi_tax_gap_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "gapId": "mi_detroit_wayne_rerz_project_specific",
  "status": "resolved_project_specific | no_project_specific_source_found | partially_resolved | source_inaccessible",
  "confidence": "high | medium | low",
  "officialSources": [
    {
      "title": "",
      "url": "",
      "owner": "",
      "accessed": "YYYY-MM-DD",
      "evidenceText": ""
    }
  ],
  "projectRows": [
    {
      "projectName": "",
      "company": "",
      "municipality": "",
      "county": "",
      "parcelOrLegalDescription": "",
      "approvedZoneEvidence": "",
      "zoneTerm": "",
      "phaseoutEvidence": "",
      "eligibleTaxLineEvidence": "",
      "runtimeReady": false,
      "requiredUserOrAccountantInputs": []
    }
  ],
  "runtimePatch": {
    "targetDataFile": "data/tax_local_workflow_rules.json",
    "workflowId": "local_tax_mi_rerz_detroit_wayne_dsire_3216_v1",
    "fieldsToUpdate": {},
    "projectRowsToAddOrUpdate": []
  },
  "remainingGaps": []
}
```

