You are helping repair RetroFi's tax data. Research only official sources.

Gap ID: `quincy_wa_non_utility_local_bo`

Current known state:

- RetroFi has source-backed Quincy, Washington public utility tax rates under QMC 3.28:
  - telephone, light/power, gas: 6%
  - domestic sewerage, refuse, water: 4%
  - industrial sewer and reuse water distribution: 1%
- RetroFi has source-backed Quincy business licensing under QMC 5.06.
- RetroFi does NOT yet know whether Quincy imposes a separate general non-utility local B&O tax, gross-receipts tax, occupation tax, or business-license tax based on receipts for ordinary non-utility businesses.

Task:

1. Search official City of Quincy, WA municipal code, city finance/business-license pages, FileLocal pages, MRSC pages that cite official city code, and any official tax return/instruction forms.
2. Determine whether Quincy has any general non-utility local B&O/gross-receipts/occupation tax.
3. If yes, extract source-backed classes, rates, tax base, deductions/exemptions, filing frequency, effective date, and required user inputs.
4. If no, provide source-backed evidence strong enough to mark the non-utility general B&O/gross-receipts tax as not applicable.
5. Do not infer from silence unless you searched official code chapters and city tax/license pages and can explain the negative evidence.

Return JSON only:

```json
{
  "schemaVersion": "retrofi_tax_gap_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "gapId": "quincy_wa_non_utility_local_bo",
  "status": "resolved_tax_exists | resolved_no_tax_found | partially_resolved | source_inaccessible",
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
  "runtimePatch": {
    "targetDataFile": "data/tax_local_workflow_rules.json",
    "workflowId": "local_tax_wa_quincy_public_utility_v1",
    "fieldsToUpdate": {},
    "calculationModelsToAddOrUpdate": []
  },
  "requiredInputs": [],
  "remainingGaps": [],
  "doNotUseAsUserFacingTotalUntil": []
}
```

