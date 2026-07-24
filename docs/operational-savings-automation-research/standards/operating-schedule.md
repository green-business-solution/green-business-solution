# STD-OPERATING-SCHEDULE - Recognizable schedule to annual operating hours

## 1. RetroFi role

This Standard is used by 13 categories and 15 category-local process instances.
The categories are ITC-02, ITC-09, ITC-12, ITC-20, ITC-30, ITC-37, ITC-38, ITC-40, ITC-41, ITC-42, ITC-43, ITC-47, ITC-51.
The process keys are daylight-lighting-hours, fixed-lighting-hours, lighting-replacement-calculation, operating_schedule.
The formula terms supplied are annual_hours, annual_kWh, annual_on_hours, annual_operating_hours, annual_pressurized_hours, avoided_run_hours, hours_period.
The current claimed output set contains 6 distinct output descriptions.
The present automation limitation is: A generic building-type schedule presented as actual operation and daylight without coordinates or event definition.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-SCHEDULE-EXPLICIT | USNO Rise, Set, and Twilight Definitions | Current | UNVERIFIED | Calendar arithmetic and USNO daylight definitions |
| E-SCHEDULE-CONTEXT-UNSUPPORTED | DOE Commercial Reference Buildings | Current | UNSUPPORTED | Reference-building schedules |

## 2. Official source inventory

The primary organization is U.S. Naval Observatory and U.S. Department of Energy.
The selected official source is Explicit calendar schedules, USNO daylight definitions, and approved reference schedules.
The pinned version is USNO definitions current 2026-07-23.
The release date or release state is Current definitions.
The expected update cadence is Definitions are stable; calendars change annually; reference schedules change by model release.
The license finding is Federal definitions and model assets; retain source-specific metadata.
The legal-review requirement is Low.

- https://aa.usno.navy.mil/faq/RST_defs
- https://www.energy.gov/cmei/buildings/commercial-reference-buildings

## 3. What can actually be acquired

- Explicit profile or project schedule
- Local calendar arithmetic
- USNO daylight definition page
- Approved DOE reference-building schedule files

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Explicit profile or project schedule | https://aa.usno.navy.mil/faq/RST_defs | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | USNO definitions current 2026-07-23; Definitions are stable; calendars change annually; reference schedules change by model release; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Local calendar arithmetic | https://aa.usno.navy.mil/faq/RST_defs | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | USNO definitions current 2026-07-23; Definitions are stable; calendars change annually; reference schedules change by model release; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| USNO daylight definition page | https://aa.usno.navy.mil/faq/RST_defs | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 27057 bytes observed; HTML; Route-specific source structure | USNO definitions current 2026-07-23; Definitions are stable; calendars change annually; reference schedules change by model release; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | The USNO definition page downloaded and explicit schedule arithmetic was inspected in current category trees |
| Approved DOE reference-building schedule files | https://aa.usno.navy.mil/faq/RST_defs | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | USNO definitions current 2026-07-23; Definitions are stable; calendars change annually; reference schedules change by model release; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: The USNO definition page downloaded and explicit schedule arithmetic was inspected in current category trees.
The retained inspected artifact is USNO rise, set, and twilight definitions HTML, HTML, 27057 bytes, sha256:178f7024fdbce65bf3c3ee80f758ec3429e0115dff4d538cf54c59a978f58281.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `weekday intervals`
- `weekend intervals`
- `holiday exclusions`
- `season`
- `latitude and longitude`
- `sunrise and sunset definition`
- `annual hours`

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| weekday intervals | Structured record or array | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| weekend intervals | Structured record or array | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| holiday exclusions | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| season | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| latitude and longitude | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| sunrise and sunset definition | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| annual hours | Numeric scalar or numeric series | Hours or source-declared time | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

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
| Lighting hours per operating day | fixed-lighting-hours; ITC-02 | User | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Lighting Hours per Operating Day | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Operating days per week | fixed-lighting-hours; ITC-02 | User | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Operating Days per Week | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Active weeks per year | fixed-lighting-hours; ITC-02 | User | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Active Weeks per Year | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Control type and timing offset | daylight-lighting-hours; ITC-02 | User | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Control Type and Timing Offset | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site location | daylight-lighting-hours; ITC-02 | Profile | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Site Location | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Analysis year | daylight-lighting-hours; ITC-02 | User | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Analysis Year | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Replacement fixture count | lighting-replacement-calculation; ITC-02 | User | Annual Operational Savings > Annual Electricity Reduction > Replacement Fixture Count | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing fixture watts | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Existing Fixture Watts > Standard 1.1 - Existing Fixture Wattage Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed fixture watts from the exact-product process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Standard 1.2 - Exact New Fixture Wattage Lookup | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed fixture watts from the requirement-selected process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Standard 1.3 - Requirement-Based New Fixture Wattage Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours from the fixed-schedule process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Standard 2.1 - Fixed-Schedule Lighting Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours from the daylight-based process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Standard 2.2 - Daylight-Based Lighting Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing control schedule | operating_schedule; ITC-09 | Project Document | Annual Operational Savings > Annual thermal-input and pump-electricity reduction > Existing control schedule | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed control schedule | operating_schedule; ITC-09 | Linked Opportunity | Annual Operational Savings > Annual thermal-input and pump-electricity reduction > Proposed control schedule | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Recognizable Business, Shift, Seasonal, or Usage Pattern | operating_schedule; ITC-09, ITC-12, ITC-20, ITC-30, ITC-37, ITC-38, ITC-40, ITC-41, ITC-42, ITC-43, ITC-47, ITC-51 | User | Annual Operational Savings > Annual thermal-input and pump-electricity reduction > Annual operating hours > Recognizable Business, Shift, Seasonal, or Usage Pattern | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Detailed Operating Days, Shifts, or Active Season, if known | operating_schedule; ITC-09, ITC-12, ITC-20, ITC-30, ITC-37, ITC-38, ITC-40, ITC-41, ITC-42, ITC-43, ITC-47, ITC-51 | User | Annual Operational Savings > Annual thermal-input and pump-electricity reduction > Annual operating hours > Detailed Operating Days, Shifts, or Active Season, if known | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Measured Annual Operating Hours, if known | operating_schedule; ITC-09, ITC-12, ITC-20, ITC-30, ITC-37, ITC-38, ITC-40, ITC-41, ITC-42, ITC-43, ITC-47, ITC-51 | Project Document | Annual Operational Savings > Annual thermal-input and pump-electricity reduction > Annual operating hours > Measured Annual Operating Hours, if known | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location and Business Activity | operating_schedule; ITC-09, ITC-12, ITC-20, ITC-30, ITC-37, ITC-38, ITC-40, ITC-41, ITC-42, ITC-43, ITC-47, ITC-51 | Profile | Annual Operational Savings > Annual thermal-input and pump-electricity reduction > Annual operating hours > Site Location and Business Activity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing airflow schedule from a nameplate, measurement, audit, or contractor specification | operating_schedule; ITC-37 | Project Document | Annual Operational Savings > Annual kitchen ventilation fan and makeup-air resource reduction > Documented Existing airflow schedule from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed airflow schedule from a nameplate, measurement, audit, or contractor specification | operating_schedule; ITC-37 | Linked Opportunity | Annual Operational Savings > Annual kitchen ventilation fan and makeup-air resource reduction > Proposed airflow schedule | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location for outdoor conditions | operating_schedule; ITC-37 | Profile | Annual Operational Savings > Annual kitchen ventilation fan and makeup-air resource reduction > Site Location for outdoor conditions | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours | fixed-lighting-hours; ITC-02 | USNO rise, set, and twilight definitions HTML | weekday intervals; weekend intervals; holiday exclusions; season; latitude and longitude; sunrise and sunset definition; annual hours | annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates | hours/year | DERIVABLE_FROM_SOURCE | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |
| Annual daylight-based operating hours | daylight-lighting-hours; ITC-02 | USNO rise, set, and twilight definitions HTML | weekday intervals; weekend intervals; holiday exclusions; season; latitude and longitude; sunrise and sunset definition; annual hours | annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates | hours/year | DERIVABLE_FROM_SOURCE | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |
| Annual electricity reduction | lighting-replacement-calculation; ITC-02 | USNO rise, set, and twilight definitions HTML | weekday intervals; weekend intervals; holiday exclusions; season; latitude and longitude; sunrise and sunset definition; annual hours | annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates | kWh/year | DERIVABLE_FROM_SOURCE | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |
| Avoided annual recirculation pump run hours | operating_schedule; ITC-09 | USNO rise, set, and twilight definitions HTML | weekday intervals; weekend intervals; holiday exclusions; season; latitude and longitude; sunrise and sunset definition; annual hours | annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates | hours/year | DERIVABLE_FROM_SOURCE | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |
| Annual operating hours | operating_schedule; ITC-12, ITC-30, ITC-38, ITC-40, ITC-41, ITC-42, ITC-51 | USNO rise, set, and twilight definitions HTML | weekday intervals; weekend intervals; holiday exclusions; season; latitude and longitude; sunrise and sunset definition; annual hours | annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates | hours/year | DERIVABLE_FROM_SOURCE | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |
| Annual operating hours | operating_schedule; ITC-20 | USNO rise, set, and twilight definitions HTML | weekday intervals; weekend intervals; holiday exclusions; season; latitude and longitude; sunrise and sunset definition; annual hours | annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates | hours/year | DERIVABLE_FROM_SOURCE | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |
| Operating hours by modeled period | operating_schedule; ITC-37 | USNO rise, set, and twilight definitions HTML | weekday intervals; weekend intervals; holiday exclusions; season; latitude and longitude; sunrise and sunset definition; annual hours | annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates | hours/period | DERIVABLE_FROM_SOURCE | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |
| Annual pressurized hours | operating_schedule; ITC-43, ITC-47 | USNO rise, set, and twilight definitions HTML | weekday intervals; weekend intervals; holiday exclusions; season; latitude and longitude; sunrise and sunset definition; annual hours | annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates | hours/year | DERIVABLE_FROM_SOURCE | A generic building-type schedule presented as actual operation and daylight without coordinates or event definition |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
Explicit calendar schedules, USNO daylight definitions, and approved reference schedules
-> Explicit profile or project schedule
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> calculation_assumptions + benchmark_values + model_input_schemas
-> deterministic operating-schedule adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: calculation_assumptions, benchmark_values, model_input_schemas.

```sql
CREATE TABLE os_operating_schedule_records (
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
CREATE INDEX os_operating_schedule_active_exact_idx
  ON os_operating_schedule_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_operating_schedule_requirements_idx
  ON os_operating_schedule_records USING gin (normalized_payload jsonb_path_ops)
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
The unsupported boundary is A generic building-type schedule presented as actual operation and daylight without coordinates or event definition.

## 11. Calculation or local-model execution

The exact output contract contains: Annual operating hours; Annual daylight-based operating hours; Annual electricity reduction; Avoided annual recirculation pump run hours; Operating hours by modeled period; Annual pressurized hours.
The governing source equation or transformation is annual_hours = sum_calendar_days max(0, local_end_time - local_start_time) after holiday and seasonal rules; daylight hours use the selected USNO event definition and local coordinates.
The local execution mode is Local deterministic calendar engine with optional approved reference-schedule artifacts.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Definitions are stable; calendars change annually; reference schedules change by model release.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Local deterministic calendar engine with optional approved reference-schedule artifacts.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 60-100 hours.
Estimated raw storage is 0.2 GB.
Estimated published storage is 0.05 GB.
Refresh effort is 4-8 annually.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.04 at 100 calculations per month, $0.08 at 1,000, and $0.30 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Explicit calendar schedule method.
The retained compact sample is `docs/operational-savings-automation-research/samples/operating-schedule.sample.json`.
The source or model interface inspected is USNO rise, set, and twilight definitions HTML.
The local output kind is `model_result_set`, the selection rule is `PINNED_LOCAL_FORMULA:weeklyScheduleHours`, and the output unit is `hours/year`.
The prototype runs without network access after acquisition.
The prototype completed without warnings.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is Explicit schedules and a narrow approved context schedule with documented calendar and timezone.
The unsupported boundary is A generic building-type schedule presented as actual operation and daylight without coordinates or event definition.

## 17. Final recommended strategy

Prefer explicit profile or project schedules, calculate annual hours locally with a pinned calendar and timezone library, and use reference schedules only as labeled screening assumptions.
This is the single recommended production path for this Standard.
The rejected alternative is: A single fixed 8,760-hour fraction is rejected because holidays, seasons, weekends, and daylight materially change category outputs.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
