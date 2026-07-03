# Tax Source Validation Report

Generated: 2026-07-03
Updated: 2026-07-03 Shell 4 import-readiness repair

## Scope

This shell converts existing tax research artifacts into an import-readiness registry. It does not claim that all tax law has been collected. It is not a complete nationwide local-tax law database.

## Before / After Repair Counts

- Total registry records: 399
- Before repair: 54 records had empty sourceUrls; 48 records had empty evidenceText; 49 non-gap records had empty sourceUrls; 48 non-gap records had empty evidenceText.
- After repair: 6 records have empty sourceUrls; 0 records have empty evidenceText; 0 non-gap records have empty sourceUrls; 0 non-gap records have empty evidenceText; 0 gap records lack both sourceUrls and searchedOfficialSources.
- Empty sourceUrls now occur only on explicit gap records that include searchedOfficialSources.

## Registry Counts

- By taxDomain: {"assessor_boundary":1,"local_business_tax":10,"parcel_boundary":5,"program_specific_tax_incentive":2,"property_tax":112,"sales_use_tax":159,"special_assessment":1,"special_district_boundary":1,"state_business_tax":108}
- By state: {"AK":4,"AL":6,"AR":7,"AZ":7,"CA":17,"CO":8,"CT":5,"DC":5,"DE":5,"FL":8,"GA":9,"HI":6,"IA":8,"ID":6,"IL":7,"IN":8,"KS":9,"KY":7,"LA":7,"MA":6,"MD":5,"ME":5,"MI":12,"MN":9,"MO":6,"MS":6,"MT":6,"MULTI_OR_UNKNOWN":8,"NC":9,"ND":8,"NE":8,"NH":5,"NJ":8,"NM":7,"NV":8,"NY":10,"OH":10,"OK":8,"OR":6,"PA":7,"RI":9,"SC":7,"SD":8,"TN":8,"TX":9,"UT":8,"VA":6,"VT":8,"WA":15,"WI":9,"WV":8,"WY":8}
- By accessMethod: {"api":11,"download":120,"html_table":115,"lookup_tool":19,"pdf":7,"unknown":127}
- By importReadiness: {"gap":6,"lookup_only":19,"manual_review":122,"needs_adapter":122,"ready_for_import":130}
- By calculationSupported: {"accountant_input_required":118,"address_plus_project_inputs":159,"assessor_confirmation_required":105,"not_supported":7,"tax_document_required":10}

## Import-Readiness Fixes Applied

- SST child records now carry the official Streamlined Sales Tax rate/boundary source page and update page. Their evidenceText says the state file name came from the SST directory artifact and that direct file URL discovery remains an importer validation step when the direct URL was not preserved.
- Non-gap records now have at least one official source URL and non-empty evidenceText.
- Gap records now include searchedOfficialSources or sourceUrls for official owners checked and keep importReadiness = gap.
- gap_mi_rerz_detroit_wayne_project_documents is corrected to MI / Wayne County / Detroit.
- gap_property_tax_bulk_api_terms is represented as a multi-state CA/WA/MI priority-county gap, not WA-only.
- bulk_26_assessor_boundary was downgraded from manual_review to gap because the research artifact did not prove a single official nationwide county assessor/treasurer source URL.

## Automation Boundary

Taxes that can be partly automated from address/geography: sales/use tax rate lookup where an official download/API/lookup source exists, with transaction date and project taxability inputs still required. Boundary and parcel datasets can automate routing, but they do not calculate tax amounts.

Taxes requiring tax bill, parcel/APN, accountant return data, or assessor confirmation:

- Property tax and special assessments require parcel/APN/AIN, tax year, official bill or assessor/treasurer record, taxable/assessed values, exemptions/abatements, and special/direct assessment lines.
- State and local business taxes require entity type, classification, gross receipts or taxable income, apportionment/allocation, deductions, credits, thresholds, and filed-return/accountant facts.
- Program-specific property-tax incentives require local adoption or approval evidence, parcel inclusion, eligible tax-line treatment, and assessor confirmation where applicable.

## Is Existing Research Enough To Finish Tax Calculations?

No. The research is enough to start an import/adaptor queue and to gate calculations conservatively. It is not enough to finish nationwide local tax calculations. Sales/use rate automation is the strongest path, but final sales/use estimates still need project taxability and transaction facts. Property-tax and business-tax calculations remain gated on parcel/bill/accountant/assessor evidence.

## Validation Command Output

```text
$ node - <<'NODE'
const fs=require('fs');
const files=[
  'canonical_tax_source_registry.schema.json',
  'canonical_tax_source_registry_seed.json',
  'tax_rule_import_backlog.json'
];
for (const f of files) JSON.parse(fs.readFileSync(f,'utf8'));
const seed=JSON.parse(fs.readFileSync('canonical_tax_source_registry_seed.json','utf8'));
const missingNonGapUrls=seed.sources.filter(r=>r.importReadiness!=='gap'&&(!r.sourceUrls||r.sourceUrls.length===0));
const missingEvidence=seed.sources.filter(r=>!String(r.evidenceText||'').trim());
const gapMissingSearch=seed.sources.filter(r=>r.importReadiness==='gap'&&(!r.sourceUrls||r.sourceUrls.length===0)&&(!r.searchedOfficialSources||r.searchedOfficialSources.length===0));
const missingRequired=[];
const required=['sourceId','taxDomain','jurisdiction','officialOwner','sourceName','sourceUrls','accessMethod','machineReadable','importReadiness','effectiveDateHandling','updateFrequency','joinKeys','runtimeUse','requiredUserOrAccountantInputs','requiredParcelOrBillInputs','calculationSupported','sourceConfidence','evidenceText','limitations','refreshNotes'];
for (const r of seed.sources) for (const k of required) if (!(k in r)) missingRequired.push(`${r.sourceId}:${k}`);
const badNullState=seed.sources.filter(r=>r.jurisdiction.state==null&&!/multi|national|member states|priority counties in ca, wa, and mi|streamlined sales tax|census|county assessor|united states/i.test([r.sourceId,r.sourceName,r.officialOwner,r.runtimeUse,r.refreshNotes,r.jurisdiction.countyName,r.jurisdiction.specialDistrict].join(' ')));
const rerz=seed.sources.find(r=>r.sourceId==='gap_mi_rerz_detroit_wayne_project_documents');
const terms=seed.sources.find(r=>r.sourceId==='gap_property_tax_bulk_api_terms');
console.log({parsedFiles:files.length,totalSources:seed.sources.length,missingRequired:missingRequired.length,missingNonGapUrls:missingNonGapUrls.length,missingEvidence:missingEvidence.length,gapMissingSearch:gapMissingSearch.length,badNullState:badNullState.length,badMi:rerz.jurisdiction.state==='MI'&&rerz.jurisdiction.countyName==='Wayne County'&&rerz.jurisdiction.placeName==='Detroit'?0:1,badMulti:terms.jurisdiction.state===null&&/CA, WA, and MI/i.test(terms.jurisdiction.countyName||'')?0:1});
NODE
{ parsedFiles: 3, totalSources: 399, missingRequired: 0, missingNonGapUrls: 0, missingEvidence: 0, gapMissingSearch: 0, badNullState: 0, badMi: 0, badMulti: 0 }
```

## Official URL Spot Checks From Prior Pass

The previous Shell 4 pass spot-checked 14 high-impact official URLs. Thirteen returned HTTP 200/206. Colorado DOR GIS returned HTTP 403 during automated GET and remains a manual/API validation blocker before production import.

## Explicit Non-Calculable Areas

- Rhode Island municipal renewable property/tangible tax treatment is a high-priority gap.
- Michigan RERZ/Detroit-Wayne project-specific property tax treatment is not calculable from geography alone.
- Everett and Quincy city B&O applicability/rates were not proven from official city sources.
- Burbank, Pasadena, Vernon, and Anaheim business-license taxes need current city schedules and business facts before calculation.
- County property portals generally support lookup workflows, not complete bulk imports, until API/licensing/terms are confirmed.

## Import Readiness Interpretation

- ready_for_import: machine-readable official download/API source, still requiring adapter validation.
- needs_adapter: official HTML/PDF/statute/form source needs scraping, normalization, or manual formula adapter.
- lookup_only: official portal or lookup source can support workflow/caching but not bulk import by itself.
- manual_review: source exists but machine readability, access, or effective-date semantics are unclear.
- gap: official source evidence is missing or insufficient for runtime calculation.
