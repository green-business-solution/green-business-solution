You are helping repair RetroFi's tax data. Research only official sources.

Gap ID: `property_tax_adapter_production_terms`

Current known state:

RetroFi has property-tax adapter routing records for:

- Los Angeles County, CA
- San Diego County, CA
- Orange County, CA
- King County, WA
- Wayne County / Detroit, MI
- Washtenaw County / Ann Arbor, MI
- Grant County, WA
- Snohomish County, WA

The current data says these are `calculable_with_tax_bill` because public parcel geometry or parcel search is often available, but line-item tax bills, direct assessments, levy lines, or commercial bulk/API terms are not production-cleared.

Task:

1. For each jurisdiction above, research official assessor, treasurer/tax collector, GIS/open-data, API, bulk download, and terms-of-use pages.
2. Classify each data source:
   - `bulk_import_allowed`
   - `public_api_allowed`
   - `lookup_only`
   - `manual_user_bill_required`
   - `vendor_or_license_required`
   - `unclear_terms`
3. Identify which source, if any, can provide production-safe:
   - parcel geometry
   - parcel/account ID by address
   - assessed value
   - taxable value
   - exemption fields
   - levy/tax-code area
   - current tax bill line items
   - direct assessments/special assessments
   - payment/delinquency facts
4. Keep final dollar calculations gated unless current tax bill line items are production-safe or user-uploaded.

Return JSON only:

```json
{
  "schemaVersion": "retrofi_tax_gap_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "gapId": "property_tax_adapter_production_terms",
  "status": "resolved | partially_resolved",
  "confidence": "high | medium | low",
  "jurisdictionRows": [
    {
      "jurisdictionId": "",
      "state": "",
      "county": "",
      "city": null,
      "sources": [
        {
          "title": "",
          "url": "",
          "owner": "",
          "dataFieldsSupported": [],
          "termsClassification": "bulk_import_allowed | public_api_allowed | lookup_only | manual_user_bill_required | vendor_or_license_required | unclear_terms",
          "evidenceText": ""
        }
      ],
      "productionSafeFields": [],
      "requiresUserUploadedBillFields": [],
      "runtimePatch": {
        "targetDataFile": "data/tax_local_workflow_rules.json",
        "workflowId": "",
        "fieldsToUpdate": {}
      },
      "remainingGaps": []
    }
  ]
}
```

