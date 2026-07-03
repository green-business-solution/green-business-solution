You are helping repair RetroFi's tax data. Research only official sources.

Gap ID: `everett_wa_complete_local_bo_rates`

Current known state:

- RetroFi knows Everett, Washington imposes a local B&O/gross-receipts tax governed by EMC 3.24.
- RetroFi currently only has a conservative placeholder that can calculate if a user/accountant supplies `everett_local_bo_rate_decimal`.
- We need official class/rate rows so the server can derive rates by class where source-backed.

Task:

1. Find official Everett municipal code, city tax guide, FileLocal configuration, tax forms, or city finance pages for local B&O/gross-receipts tax.
2. Extract every current class/rate row needed for ordinary business, manufacturing, retailing, wholesaling, services, extracting, printing/publishing, gambling/admissions/utility if they exist.
3. Record tax base, apportionment/deductions/credits, filing frequency, effective date, exemptions/thresholds, and whether FileLocal is required.
4. Mark rows that are source-backed and runtime-ready separately from rows needing accountant review.

Return JSON only:

```json
{
  "schemaVersion": "retrofi_tax_gap_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "gapId": "everett_wa_complete_local_bo_rates",
  "status": "resolved | partially_resolved | source_inaccessible",
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
  "findingSummary": "",
  "rateRows": [
    {
      "classKey": "",
      "displayName": "",
      "rateDecimal": null,
      "taxBase": "",
      "effectiveStartDate": null,
      "sourceEvidenceId": "",
      "runtimeReady": false,
      "requiredInputs": []
    }
  ],
  "runtimePatch": {
    "targetDataFile": "data/tax_local_workflow_rules.json",
    "workflowId": "local_tax_wa_everett_bo_v1",
    "fieldsToUpdate": {},
    "calculationModelsToAddOrUpdate": []
  },
  "remainingGaps": [],
  "doNotUseAsUserFacingTotalUntil": []
}
```

