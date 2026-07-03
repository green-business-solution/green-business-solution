You are helping repair RetroFi's tax data. Research only official sources.

Gap ID: `ri_municipal_renewable_property_tax_ordinances`

Current known state:

- RetroFi has source-backed Rhode Island state law and regulation for renewable property/tangible tax formulas:
  - tangible renewable component: $5 per AC kW where applicable
  - real property component: $3.50 per AC kW where applicable
- RetroFi also has the Rhode Island Office of Energy Resources 2025 statewide municipal solar ordinance inventory.
- RetroFi does NOT yet have direct municipal ordinance verification for each municipality. The OER inventory is useful routing evidence, but not enough to import deterministic municipality-level rows without direct ordinance links.

Task:

1. Use the official OER 2025 inventory as a checklist.
2. For every Rhode Island city/town where the inventory says an adopted renewable/solar tax ordinance exists, find the direct official municipal code, ordinance, resolution, or town/city page.
3. Extract whether it adopts, waives, exempts, modifies, or confirms the state renewable tax treatment.
4. Capture applicability limits: commercial vs residential, REG/net-metering/virtual net-metering, revenue-generating vs non-revenue, date cutoffs, tangible vs real property, battery/storage if mentioned.
5. If a direct municipal source cannot be found for a municipality, mark it explicitly as `direct_source_missing`.
6. Do not calculate user-facing savings; this is a routing and source-verification repair.

Return JSON only:

```json
{
  "schemaVersion": "retrofi_tax_gap_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "gapId": "ri_municipal_renewable_property_tax_ordinances",
  "status": "resolved | partially_resolved",
  "confidence": "high | medium | low",
  "stateSources": [
    {
      "title": "",
      "url": "",
      "owner": "",
      "evidenceText": ""
    }
  ],
  "municipalityRows": [
    {
      "municipality": "",
      "treatment": "adopted_tax_ordinance | waiver_or_exemption | no_direct_source_found | no_tax_ordinance_found | unclear",
      "directOfficialSource": {
        "title": "",
        "url": "",
        "owner": "",
        "evidenceText": ""
      },
      "applicability": {
        "commercial": null,
        "residential": null,
        "reg": null,
        "netMetered": null,
        "virtualNetMetered": null,
        "batteryStorage": null,
        "tangibleProperty": null,
        "realProperty": null
      },
      "runtimeReady": false,
      "requiredAssessorInputs": []
    }
  ],
  "runtimePatch": {
    "targetDataFile": "data/tax_local_workflow_rules.json",
    "workflowId": "local_tax_ri_renewable_property_tax_dsire_22798_v1",
    "fieldsToUpdate": {},
    "municipalRowsToAddOrUpdate": []
  },
  "remainingGaps": []
}
```

