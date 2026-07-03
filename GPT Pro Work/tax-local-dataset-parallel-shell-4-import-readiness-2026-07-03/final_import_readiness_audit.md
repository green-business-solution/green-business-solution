# Shell 4 Final Import-Readiness Audit

Generated: 2026-07-03

## Result

Shell 4 is complete for now. No Shell 4 registry, schema, backlog, or validation-report repairs were needed in this audit pass.

This is an import-readiness package generated from existing research artifacts. It is not a complete nationwide local-tax law database, and it should not be used to claim all local tax calculations are automated or complete.

## Validation Commands Run

From repository root:

```sh
jq empty \
  'GPT Pro Work/tax-local-dataset-parallel-shell-4-import-readiness-2026-07-03/canonical_tax_source_registry.schema.json' \
  'GPT Pro Work/tax-local-dataset-parallel-shell-4-import-readiness-2026-07-03/canonical_tax_source_registry_seed.json' \
  'GPT Pro Work/tax-local-dataset-parallel-shell-4-import-readiness-2026-07-03/tax_rule_import_backlog.json'
```

Result: all three JSON files parsed.

```sh
node - <<'NODE'
const fs = require('fs');
const path = 'GPT Pro Work/tax-local-dataset-parallel-shell-4-import-readiness-2026-07-03';
const files = [
  'canonical_tax_source_registry.schema.json',
  'canonical_tax_source_registry_seed.json',
  'tax_rule_import_backlog.json'
];
const parsed = Object.fromEntries(files.map(f => [f, JSON.parse(fs.readFileSync(`${path}/${f}`, 'utf8'))]));
const schema = parsed['canonical_tax_source_registry.schema.json'];
const seed = parsed['canonical_tax_source_registry_seed.json'];
const backlog = parsed['tax_rule_import_backlog.json'];
const report = fs.readFileSync(`${path}/tax_source_validation_report.md`, 'utf8');
const records = seed.sources;
const required = schema.$defs.sourceRecord.required;
const counts = {
  missingRequired: [],
  nonGapMissingUrls: [],
  nonGapMissingEvidence: [],
  gapMissingOfficialSearchOrUrl: [],
  badMiRerzScope: [],
  badMultiStateTermsScope: [],
  badNullStateScope: [],
  emptyEvidenceAll: []
};
for (const r of records) {
  for (const key of required) if (!(key in r)) counts.missingRequired.push(`${r.sourceId}:${key}`);
  const urls = Array.isArray(r.sourceUrls) ? r.sourceUrls : [];
  const searched = Array.isArray(r.searchedOfficialSources) ? r.searchedOfficialSources : [];
  if (r.importReadiness !== 'gap' && urls.length === 0) counts.nonGapMissingUrls.push(r.sourceId);
  if (r.importReadiness !== 'gap' && !String(r.evidenceText || '').trim()) counts.nonGapMissingEvidence.push(r.sourceId);
  if (!String(r.evidenceText || '').trim()) counts.emptyEvidenceAll.push(r.sourceId);
  if (r.importReadiness === 'gap' && urls.length === 0 && searched.length === 0) counts.gapMissingOfficialSearchOrUrl.push(r.sourceId);
  if (r.jurisdiction.state == null) {
    const scopeText = [r.sourceId, r.sourceName, r.officialOwner, r.runtimeUse, r.refreshNotes, r.jurisdiction.countyName, r.jurisdiction.specialDistrict].filter(Boolean).join(' ');
    if (!/multi|national|member states|priority counties in ca, wa, and mi|streamlined sales tax|census|county assessor|united states/i.test(scopeText)) counts.badNullStateScope.push(r.sourceId);
  }
}
const miRerz = records.filter(r => /rerz/i.test(r.sourceId) || /RERZ/i.test([r.sourceName, r.runtimeUse, r.evidenceText].join(' ')));
for (const r of miRerz) {
  if (!(r.jurisdiction.state === 'MI' && /Wayne County/i.test(r.jurisdiction.countyName || '') && /Detroit/i.test(r.jurisdiction.placeName || ''))) counts.badMiRerzScope.push(r.sourceId);
}
const terms = records.find(r => r.sourceId === 'gap_property_tax_bulk_api_terms');
if (!terms || !(terms.importReadiness === 'gap' && terms.jurisdiction.state === null && /CA, WA, and MI/i.test(terms.jurisdiction.countyName || '') && /multi-state/i.test(terms.jurisdiction.specialDistrict || ''))) {
  counts.badMultiStateTermsScope.push(terms ? terms.sourceId : 'missing');
}
const schemaChecks = {
  hasSourceRecordRequired: Array.isArray(required) && required.includes('sourceUrls') && required.includes('evidenceText') && required.includes('jurisdiction') && required.includes('importReadiness'),
  evidenceTextMinLength: schema.$defs.sourceRecord.properties.evidenceText.minLength === 1,
  sourceUrlItemMinLength: schema.$defs.sourceRecord.properties.sourceUrls.items.minLength === 1,
  hasGapConditional: JSON.stringify(schema.$defs.sourceRecord.allOf || []).includes('searchedOfficialSources') && JSON.stringify(schema.$defs.sourceRecord.allOf || []).includes('minItems'),
  stateAllowsNullForMultiScope: Array.isArray(schema.$defs.sourceRecord.properties.jurisdiction.properties.state.type) && schema.$defs.sourceRecord.properties.jurisdiction.properties.state.type.includes('null')
};
const by = key => Object.fromEntries([...records.reduce((m, r) => m.set(r[key], (m.get(r[key]) || 0) + 1), new Map())].sort());
const byNestedState = Object.fromEntries([...records.reduce((m, r) => {
  const k = r.jurisdiction.state || 'MULTI_OR_UNKNOWN';
  return m.set(k, (m.get(k) || 0) + 1);
}, new Map())].sort());
const reportParity = {
  total: report.includes(`Total registry records: ${records.length}`),
  after: report.includes(`After repair: ${records.filter(r => r.sourceUrls.length === 0).length} records have empty sourceUrls; ${counts.emptyEvidenceAll.length} records have empty evidenceText; ${counts.nonGapMissingUrls.length} non-gap records have empty sourceUrls; ${counts.nonGapMissingEvidence.length} non-gap records have empty evidenceText; ${counts.gapMissingOfficialSearchOrUrl.length} gap records lack both sourceUrls and searchedOfficialSources.`),
  taxDomain: report.includes(`By taxDomain: ${JSON.stringify(by('taxDomain'))}`),
  state: report.includes(`By state: ${JSON.stringify(byNestedState)}`),
  accessMethod: report.includes(`By accessMethod: ${JSON.stringify(by('accessMethod'))}`),
  importReadiness: report.includes(`By importReadiness: ${JSON.stringify(by('importReadiness'))}`),
  calculationSupported: report.includes(`By calculationSupported: ${JSON.stringify(by('calculationSupported'))}`)
};
const failures = Object.entries(counts).flatMap(([k, v]) => v.length ? [`${k}: ${v.join(', ')}`] : []);
for (const [k, v] of Object.entries(schemaChecks)) if (!v) failures.push(`schemaChecks.${k}`);
for (const [k, v] of Object.entries(reportParity)) if (!v) failures.push(`reportParity.${k}`);
console.log(JSON.stringify({
  parsedFiles: files.length,
  totalSources: records.length,
  totalBacklogItems: Array.isArray(backlog) ? backlog.length : (backlog.items || []).length,
  emptySourceUrls: records.filter(r => Array.isArray(r.sourceUrls) && r.sourceUrls.length === 0).length,
  emptyEvidenceText: counts.emptyEvidenceAll.length,
  nonGapMissingUrls: counts.nonGapMissingUrls.length,
  nonGapMissingEvidence: counts.nonGapMissingEvidence.length,
  gapMissingOfficialSearchOrUrl: counts.gapMissingOfficialSearchOrUrl.length,
  badMiRerzScope: counts.badMiRerzScope.length,
  badMultiStateTermsScope: counts.badMultiStateTermsScope.length,
  badNullStateScope: counts.badNullStateScope.length,
  schemaChecks,
  reportParity,
  failures
}, null, 2));
if (failures.length) process.exit(1);
NODE
```

Result:

```json
{
  "parsedFiles": 3,
  "totalSources": 399,
  "totalBacklogItems": 20,
  "emptySourceUrls": 6,
  "emptyEvidenceText": 0,
  "nonGapMissingUrls": 0,
  "nonGapMissingEvidence": 0,
  "gapMissingOfficialSearchOrUrl": 0,
  "badMiRerzScope": 0,
  "badMultiStateTermsScope": 0,
  "badNullStateScope": 0,
  "failures": []
}
```

## Current Counts

- Total registry sources: 399
- Import backlog items: 20
- Non-gap records missing sourceUrls: 0
- Non-gap records missing evidenceText: 0
- Gap records lacking both sourceUrls and searchedOfficialSources: 0
- Empty sourceUrls: 6, all explicit gap records with searchedOfficialSources
- Empty evidenceText: 0
- MI/RERZ bad scopes: 0
- Multi-state property API terms bad scopes: 0
- Report count mismatches found: 0

## Remaining Blockers

- Colorado DOR GIS returned HTTP 403 during earlier automated spot checks; official API access/setup and terms still need manual validation.
- Rhode Island municipal renewable property/tangible tax treatment remains a gap until official municipal adoption/waiver/assessment evidence is collected.
- Michigan RERZ/Detroit-Wayne project-specific property tax treatment remains non-calculable until official project/local-unit/parcel/tax-line documents are collected.
- Everett and Quincy city B&O applicability/rates remain unproven from official city sources.
- Burbank, Pasadena, Vernon, and Anaheim business-license taxes still need current city schedules and business facts before calculation.
- County property-tax portals remain lookup/workflow sources unless API, licensing, field inventory, and bulk-use terms are confirmed.
