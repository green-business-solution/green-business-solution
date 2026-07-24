# STD-EPA-CHP-PERFORMANCE - EPA CHP and fuel-cell performance

## 1. RetroFi role

This Standard is used by 4 categories and 4 category-local process instances.
The categories are ITC-20, ITC-21, ITC-22, ITC-26.
The process keys are epa_chp_performance.
The formula terms supplied are CHP_input_fuel, added_fuel, annual_generation, generation, input_fuel, scheduled_input_fuel, useful_heat.
The current claimed output set contains 5 distinct output descriptions.
The present automation limitation is: Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-EPA-CHP | EPA CHP technologies | Current page and linked catalog, unpinned | UNVERIFIED | Technology and capacity performance tables plus CHP savings calculator workbook |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is CHP technology catalog and screening methods.
The pinned version is Catalog artifact downloaded 2026-07-23; technology page current February 2026.
The release date or release state is Catalog editions vary by technology.
The expected update cadence is Irregular catalog and tool updates.
The license finding is Federal EPA publications are generally public domain; retain source attribution.
The legal-review requirement is Confirm terms of linked non-EPA supporting datasets if incorporated.

- https://www.epa.gov/chp/chp-technologies
- https://www.epa.gov/chp/chp-energy-and-emissions-savings-calculator

## 3. What can actually be acquired

- Public technology catalog PDFs
- Public calculator workbook
- Public method pages

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public technology catalog PDFs | https://www.epa.gov/chp/chp-technologies | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 4135792 bytes observed; PDF; PDF | Catalog artifact downloaded 2026-07-23; technology page current February 2026; Irregular catalog and tool updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | A 4.1 MB official CHP technology catalog PDF was downloaded and its tables and method sections were inspected |
| Public calculator workbook | https://www.epa.gov/chp/chp-technologies | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Catalog artifact downloaded 2026-07-23; technology page current February 2026; Irregular catalog and tool updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Public method pages | https://www.epa.gov/chp/chp-technologies | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Catalog artifact downloaded 2026-07-23; technology page current February 2026; Irregular catalog and tool updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: A 4.1 MB official CHP technology catalog PDF was downloaded and its tables and method sections were inspected.
The retained inspected artifact is EPA CHP catalog PDF, PDF, 4135792 bytes, sha256:eccea396f5bcc5c86c16a75b8d41b1a4a7b43df064b7363ee7054d53063f0d09.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `prime mover`
- `size class`
- `electric efficiency`
- `total CHP efficiency`
- `power-to-heat ratio`
- `fuel input`
- `electric output`
- `useful thermal output`

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| prime mover | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| size class | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| electric efficiency | Numeric scalar or numeric series | Fraction, ratio, or source-declared efficiency unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| total CHP efficiency | Numeric scalar or numeric series | Fraction, ratio, or source-declared efficiency unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| power-to-heat ratio | Numeric scalar or numeric series | Source-declared power unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| fuel input | Numeric scalar or numeric series | Source-declared fuel or thermal unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| electric output | Numeric scalar or numeric series | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| useful thermal output | Numeric scalar or numeric series | Source-declared fuel or thermal unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

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
| Prime-mover type | epa_chp_performance; ITC-20 | Linked Opportunity | Annual Operational Savings > Prime-mover type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Input fuel | epa_chp_performance; ITC-20, ITC-21, ITC-26 | Linked Opportunity | Annual Operational Savings > Input fuel | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Selected Unit Model, if known | epa_chp_performance; ITC-20, ITC-21, ITC-22, ITC-26 | Linked Opportunity | Annual Operational Savings > Selected Unit Model, if known | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Total installed capacity | epa_chp_performance; ITC-20, ITC-21 | Linked Opportunity | Annual Operational Savings > Total installed capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Operating load fraction from an uploaded site study, controls trend, or engineering audit | epa_chp_performance; ITC-20 | Project Document | Annual Operational Savings > Documented Operating load fraction from Controls Trends or Engineering Audit | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Coincident Onsite Electric Load, if known | epa_chp_performance; ITC-20 | Project Document | Annual Operational Savings > Documented Coincident Onsite Electric Load, if known from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours from the connected schedule process | epa_chp_performance; ITC-20 | Standard Output | Annual Operational Savings > Annual operating hours > Standard 1.1 - Fuel Cell Electricity Generation Annual Operating Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Prime mover | epa_chp_performance; ITC-21, ITC-26 | Linked Opportunity | Annual Operational Savings > Prime mover | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual capacity factor | epa_chp_performance; ITC-21 | Linked Opportunity | Annual Operational Savings > Annual capacity factor | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Coincident onsite electric-load constraint, if known | epa_chp_performance; ITC-21, ITC-22 | Project Document | Annual Operational Savings > Documented Coincident onsite electric-load constraint, if known from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Coincident useful thermal-load constraint | epa_chp_performance; ITC-21, ITC-22 | Project Document | Annual Operational Savings > Documented Coincident useful thermal-load constraint from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing Boiler Nameplate or Combustion-Test Information, if known | epa_chp_performance; ITC-21, ITC-22 | Project Document | Annual Operational Savings > Existing Boiler Nameplate or Combustion-Test Information, if known | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Confirmed annual fuel availability, if known | epa_chp_performance; ITC-22 | User | Annual Operational Savings > Confirmed annual fuel availability, if known | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Fuel unit | epa_chp_performance; ITC-22 | User | Annual Operational Savings > Fuel unit | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Fuel lower heating value, if known from a nameplate, measurement, audit, or contractor specification | epa_chp_performance; ITC-22 | Project Document | Annual Operational Savings > Documented Fuel lower heating value, if known from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Conversion technology | epa_chp_performance; ITC-22 | Linked Opportunity | Annual Operational Savings > Conversion technology | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Installed capacity | epa_chp_performance; ITC-22, ITC-26 | Linked Opportunity | Annual Operational Savings > Installed capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Coincident useful thermal-load constraint when heat recovery is included | epa_chp_performance; ITC-26 | Project Document | Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Documented Coincident useful thermal-load constraint when heat recovery is included from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual electricity generation | epa_chp_performance; ITC-20 | EPA CHP catalog PDF | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | kWh/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual input fuel | epa_chp_performance; ITC-20 | EPA CHP catalog PDF | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | fuel-unit/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual electricity generation | epa_chp_performance; ITC-21, ITC-22, ITC-26 | EPA CHP catalog PDF | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | kWh/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual CHP input fuel | epa_chp_performance; ITC-21 | EPA CHP catalog PDF | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | fuel-unit/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual useful recovered heat | epa_chp_performance; ITC-21, ITC-22, ITC-26 | EPA CHP catalog PDF | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | energy/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Scheduled annual input fuel | epa_chp_performance; ITC-22 | EPA CHP catalog PDF | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | resource-unit/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual input fuel | epa_chp_performance; ITC-26 | EPA CHP catalog PDF | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | fuel-unit/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency).
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
CHP technology catalog and screening methods
-> Public technology catalog PDFs
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> equipment_performance_fields + benchmark_populations + benchmark_values + calculation_assumptions
-> deterministic epa-chp-performance adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: equipment_performance_fields, benchmark_populations, benchmark_values, calculation_assumptions.

```sql
CREATE TABLE os_epa_chp_performance_records (
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
CREATE INDEX os_epa_chp_performance_active_exact_idx
  ON os_epa_chp_performance_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_epa_chp_performance_requirements_idx
  ON os_epa_chp_performance_records USING gin (normalized_payload jsonb_path_ops)
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
The unsupported boundary is Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability.

## 11. Calculation or local-model execution

The exact output contract contains: Annual electricity generation; Annual input fuel; Annual CHP input fuel; Annual useful recovered heat; Scheduled annual input fuel.
The governing source equation or transformation is input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency).
The local execution mode is Versioned locally transcribed catalog tables with deterministic CHP equations.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Irregular catalog and tool updates.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Versioned locally transcribed catalog tables with deterministic CHP equations.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 90-150 hours.
Estimated raw storage is 0.2 GB.
Estimated published storage is 0.02 GB.
Refresh effort is 8-16 per catalog update.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.05 at 100 calculations per month, $0.10 at 1,000, and $0.40 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Official EPA CHP method equation.
The retained compact sample is `docs/operational-savings-automation-research/samples/epa-chp-performance.sample.json`.
The source or model interface inspected is EPA CHP catalog PDF.
The local output kind is `model_result_set`, the selection rule is `PINNED_LOCAL_FORMULA:chpFuelAndUsefulHeat`, and the output unit is `MMBtu/year`.
The prototype runs without network access after acquisition.
The prototype completed without warnings.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is Screening estimates for a matched prime mover and size class with explicit operating schedule.
The unsupported boundary is Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability.

## 17. Final recommended strategy

Transcribe the current catalog tables with dual review, retain table and page citations, map only compatible prime mover and size classes, and execute the documented fuel and useful-heat equations locally.
This is the single recommended production path for this Standard.
The rejected alternative is: PDF parsing at customer runtime is rejected because table interpretation and version control require review.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
