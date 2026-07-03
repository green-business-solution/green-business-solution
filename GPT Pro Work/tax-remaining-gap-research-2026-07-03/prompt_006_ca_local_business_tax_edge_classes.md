You are helping repair RetroFi's tax data. Research only official sources.

Gap ID: `ca_local_business_tax_edge_classes`

Current known state:

RetroFi has runtime-ready formulas for common rows in:

- Burbank, CA business license tax
- Pasadena, CA business license tax
- Anaheim, CA business license tax
- Vernon, CA business license / special assessment workflow
- San Diego, CA business tax certificate

The current runtime intentionally excludes uncommon classes, add-ons, late penalties, BID assessments, cannabis/regulatory categories, special parcel tax line items, and class-specific rows that were not fully normalized.

Task:

1. For each city above, use official municipal code, city finance/business-license pages, tax schedules, and official fee schedules.
2. Extract additional current classes/add-ons that are likely relevant to RetroFi test cases or commercial users:
   - manufacturing
   - warehouse/storage
   - professional/office
   - contractor
   - retail/wholesale
   - service
   - hotel/lodging
   - commercial landlord/rental
   - special assessments or business improvement district add-ons
   - SB-1186/state accessibility and local employee fees
3. Provide source-backed formulas as machine-readable rows where possible.
4. Mark rows that need user tax bill, account renewal statement, or city classification review.
5. Do not include penalties/late fees in default estimates unless filing-late status is an explicit user input.

Return JSON only:

```json
{
  "schemaVersion": "retrofi_tax_gap_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "gapId": "ca_local_business_tax_edge_classes",
  "status": "resolved | partially_resolved",
  "confidence": "high | medium | low",
  "cityRows": [
    {
      "city": "",
      "state": "CA",
      "officialSources": [
        {
          "title": "",
          "url": "",
          "owner": "",
          "evidenceText": ""
        }
      ],
      "calculationRows": [
        {
          "classKey": "",
          "displayName": "",
          "formulaKind": "",
          "formulaParameters": {},
          "requiredInputs": [],
          "effectiveStartDate": null,
          "runtimeReady": false,
          "doNotIncludeByDefaultReasons": []
        }
      ],
      "workflowId": ""
    }
  ],
  "runtimePatch": {
    "targetDataFile": "data/tax_local_workflow_rules.json",
    "workflowUpdates": []
  },
  "remainingGaps": []
}
```

