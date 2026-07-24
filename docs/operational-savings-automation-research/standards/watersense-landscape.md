# STD-WATERSENSE-LANDSCAPE - WaterSense landscape water budget

## 1. RetroFi role

This Standard is used by 1 category and 1 category-local process instance.
The categories are ITC-34.
The process keys are watersense_landscape.
The formula terms supplied are baseline_design_allowance_gallons, proposed_design_allowance_gallons.
The current claimed output set contains 2 distinct output descriptions.
The present automation limitation is: Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-WATERSENSE-LANDSCAPE-DESIGN | EPA WaterSense Water Budget Tool Version 2.0 | Version 2.0 | VERIFIED | Water Budget Tool Version 2.0 and downloadable climate data |
| E-WATERSENSE-LANDSCAPE-ACTUAL-UNSUPPORTED | WaterSense Water Budget Tool | Version 2.0 | UNSUPPORTED | Tool scope statement |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is WaterSense Water Budget Tool Version 2.0.
The pinned version is Water Budget Tool Version 2.0.
The release date or release state is Page updated 2026-03-10; climate workbook path dated 2020-10.
The expected update cadence is Irregular tool and climate-data updates.
The license finding is EPA-published WaterSense content is public domain with requested attribution.
The legal-review requirement is Confirm any source datasets embedded in the climate workbook.

- https://www.epa.gov/watersense/water-budget-tool
- https://www.epa.gov/sites/production/files/2020-10/ws-data-information-et-rainfall.xlsx

## 3. What can actually be acquired

- Public web calculator
- Public full climate-data XLSX
- Water Budget data finder

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public web calculator | https://www.epa.gov/watersense/water-budget-tool | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Water Budget Tool Version 2.0; Irregular tool and climate-data updates; Monitor URL and checksum drift | Human-mediated acquisition only; automate validation and import after export | Not separately probed; retained as a documented alternative |
| Public full climate-data XLSX | https://www.epa.gov/sites/production/files/2020-10/ws-data-information-et-rainfall.xlsx | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 10078683 bytes observed; XLSX; XLSX ZIP container | Water Budget Tool Version 2.0; Irregular tool and climate-data updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | The official 10.08 MB workbook downloaded; artifact-tool import exhausted the available inspection process twice, so bounded XLSX extraction is required |
| Water Budget data finder | https://www.epa.gov/watersense/water-budget-tool | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Water Budget Tool Version 2.0; Irregular tool and climate-data updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: The official 10.08 MB workbook downloaded; artifact-tool import exhausted the available inspection process twice, so bounded XLSX extraction is required.
The retained inspected artifact is ws-data-information-et-rainfall.xlsx, XLSX, 10078683 bytes, sha256:77afb36cff3dcb77eacad4db34a8dba44bd48eb24485c886958afd58e1846273.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `ZIP code`
- `reference evapotranspiration`
- `rainfall`
- `peak watering month`
- `landscape area by hydrozone`
- `plant factor`
- `irrigation efficiency`
- `baseline and proposed allowances`

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| ZIP code | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| reference evapotranspiration | Numeric scalar or numeric series | Inches | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| rainfall | Numeric scalar or numeric series | Inches | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| peak watering month | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| landscape area by hydrozone | Numeric scalar or numeric series | Source-declared area | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| plant factor | String, identifier, or source enumeration | Fraction, ratio, or source-declared efficiency unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| irrigation efficiency | Numeric scalar or numeric series | Fraction, ratio, or source-declared efficiency unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| baseline and proposed allowances | Numeric scalar or numeric series | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

Product and record sources must preserve a natural source identifier plus a release identifier as the composite natural key.
Model sources must preserve the complete input schema, package version, configuration, warnings, and output schema.
Dates remain source-native timestamps in raw snapshots and normalize to UTC timestamps or date-only effective intervals in query tables.
Enumerations remain source-native in raw storage and map through versioned crosswalk rows.
Null means unknown or not reported and must never be converted to zero.
Withdrawn, expired, superseded, and inactive records remain historically retained but are excluded from current resolution by default.
Duplicate manufacturer and model strings are normalized for search only, while the original source text remains immutable.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Approximate Landscape Area for Each Hydrozone | watersense_landscape; ITC-34 | User | Annual Operational Savings > Annual irrigation water reduction > Repeatable hydrozone definition > Approximate Landscape Area for Each Hydrozone | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Recognizable Plant or Landscape Type for Each Hydrozone | watersense_landscape; ITC-34 | User | Annual Operational Savings > Annual irrigation water reduction > Repeatable hydrozone definition > Recognizable Plant or Landscape Type for Each Hydrozone | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Irrigation method | watersense_landscape; ITC-34 | User | Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Irrigation method | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification | watersense_landscape; ITC-34 | Project Document | Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Documented Irrigation efficiency, if known from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Controller treatment | watersense_landscape; ITC-34 | User | Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Controller treatment | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site ZIP Code | watersense_landscape; ITC-34 | Profile | Annual Operational Savings > Annual irrigation water reduction > Site ZIP Code | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Baseline annual design water allowance | watersense_landscape; ITC-34 | ws-data-information-et-rainfall.xlsx | ZIP code; reference evapotranspiration; rainfall; peak watering month; landscape area by hydrozone; plant factor; irrigation efficiency; baseline and proposed allowances | landscape_water_allowance_gallons = eto_inches * landscape_area_ft2 * 0.623 * landscape_coefficient / irrigation_efficiency, with the exact Version 2.0 monthly and effective-rainfall method preserved | gallons/year | DERIVABLE_FROM_SOURCE | Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs |
| Proposed annual design water allowance | watersense_landscape; ITC-34 | ws-data-information-et-rainfall.xlsx | ZIP code; reference evapotranspiration; rainfall; peak watering month; landscape area by hydrozone; plant factor; irrigation efficiency; baseline and proposed allowances | landscape_water_allowance_gallons = eto_inches * landscape_area_ft2 * 0.623 * landscape_coefficient / irrigation_efficiency, with the exact Version 2.0 monthly and effective-rainfall method preserved | gallons/year | DERIVABLE_FROM_SOURCE | Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: landscape_water_allowance_gallons = eto_inches * landscape_area_ft2 * 0.623 * landscape_coefficient / irrigation_efficiency, with the exact Version 2.0 monthly and effective-rainfall method preserved.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
WaterSense Water Budget Tool Version 2.0
-> Public web calculator
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> climate_crosswalks + geographic_crosswalks + benchmark_values + calculation_assumptions
-> deterministic watersense-landscape adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: climate_crosswalks, geographic_crosswalks, benchmark_values, calculation_assumptions.

```sql
CREATE TABLE os_watersense_landscape_records (
  source_release_id uuid NOT NULL REFERENCES source_releases(id),
  source_record_key text NOT NULL,
  effective_from date,
  effective_to date,
  active boolean NOT NULL,
  native_payload jsonb NOT NULL,
  normalized_payload jsonb NOT NULL,
  unit_registry_version text NOT NULL,
  source_artifact_id uuid NOT NULL REFERENCES source_artifacts(id),
  created_at timestamptz NOT NULL,
  PRIMARY KEY (source_release_id, source_record_key)
);
CREATE INDEX os_watersense_landscape_active_exact_idx
  ON os_watersense_landscape_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_watersense_landscape_requirements_idx
  ON os_watersense_landscape_records USING gin (normalized_payload jsonb_path_ops)
  WHERE active;
```

Source-native payloads remain queryable for audits, while formula adapters consume only validated normalized columns or pinned local-model results.

## 8. Exact resolution

Identifiers are Unicode-normalized, trimmed, case-folded for search, and compared with punctuation-insensitive aliases only after exact original matching fails.
Manufacturer aliases and model aliases are versioned rows, never destructive edits.
Equipment class, capacity, geography, effective date, active status, source version, and test procedure are mandatory filters whenever the source exposes them.
An exact path must return one compatible active record.
Zero records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
The original identifier, matched alias, filters, and rejected candidates remain in provenance.

## 9. Requirements-based resolution

Mandatory filters are the category's explicit equipment class, performance requirement, capacity boundary, geography, date, active status, test-procedure version, and source release.
The eligible population contains only records satisfying every mandatory filter.
Inactive, withdrawn, superseded, incompatible-unit, missing-required-field, and cross-test-procedure records are excluded.
The source release is never mixed with another release inside one population.
A single eligible record may be selected directly.
Multiple eligible records use an official recommended value only when the source defines one, then a weighted median only when a defensible source weight exists, then an ordinary median only for a true scalar benchmark population.
Structured records and model result sets are never median-selected.

## 10. Benchmark resolution

The benchmark population must be authoritative, category-specific, unit-compatible, and filtered to the same context dimensions used by the formula.
The minimum sample size is five unless an official source explicitly publishes one typical value or a category-specific report approves a different threshold.
The weighting field must come from the source and is never inferred from record order.
The weighted median is the first value whose cumulative positive weight reaches at least half of total eligible weight after sorting by value.
The ordinary median is permitted only when no defensible weight exists and the population is an exchangeable scalar population.
The selected value retains filters, population size, sample size, method, fallback level, and uncertainty.
The unsupported boundary is Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs.

## 11. Calculation or local-model execution

The exact output contract contains: Baseline annual design water allowance; Proposed annual design water allowance.
The governing source equation or transformation is landscape_water_allowance_gallons = eto_inches * landscape_area_ft2 * 0.623 * landscape_coefficient / irrigation_efficiency, with the exact Version 2.0 monthly and effective-rainfall method preserved.
The local execution mode is Bounded build-time workbook extraction to a compact ZIP-climate lookup plus local Water Budget equations.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Irregular tool and climate-data updates.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Bounded build-time workbook extraction to a compact ZIP-climate lookup plus local Water Budget equations.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 100-170 hours.
Estimated raw storage is 0.1 GB.
Estimated published storage is 0.03 GB.
Refresh effort is 6-12 per workbook update.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.04 at 100 calculations per month, $0.08 at 1,000, and $0.30 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Official Version 2.0 method scope and downloaded climate workbook.
The retained compact sample is `docs/operational-savings-automation-research/samples/watersense-landscape.sample.json`.
The source or model interface inspected is ws-data-information-et-rainfall.xlsx.
The local output kind is `model_result_set`, the selection rule is `PINNED_LOCAL_FORMULA:landscapeAllowance`, and the output unit is `gallons`.
The prototype runs without network access after acquisition.
The prototype completed without warnings.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is U.S. ZIP-based design comparison for explicit hydrozones, plant factors, areas, and irrigation methods.
The unsupported boundary is Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs.

## 17. Final recommended strategy

Extract only required climate columns in a streaming XLSX reader, recreate the documented Version 2.0 water-budget method locally, and retain the source ZIP and every user-supplied design input.
This is the single recommended production path for this Standard.
The rejected alternative is: The web tool is rejected for runtime use because it is external and the official page explicitly says the tool is not irrigation scheduling.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
