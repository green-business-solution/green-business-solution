# STD-SCOUT-ECM-SCREEN - Scout ECM performance screen

## 1. Canonical role and current process proof

This Standard is used by 3 categories and 3 category-local process instances.
The categories are ITC-05, ITC-11, ITC-14.
The process keys are scout_ecm_screen.
The formula terms supplied are Scout_reduction_fraction_r, duct_loss_reduction_fraction, reduction_fraction.
The canonical output set contains 1 distinct output description.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-05/scout_ecm_screen | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/scout/run.mjs | scout-offline-crosswalk-proof: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: requires offline mode and an independently reviewed crosswalk<br>scout-pinned-source-gap-audit: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: proves the pinned source inventory cannot supply ITC-05 or ITC-11 | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-11/scout_ecm_screen | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/scout/run.mjs | scout-offline-crosswalk-proof: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: requires offline mode and an independently reviewed crosswalk<br>scout-pinned-source-gap-audit: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: proves the pinned source inventory cannot supply ITC-05 or ITC-11 | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-14/scout_ecm_screen | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/scout/run.mjs | scout-market-scope-failure-proof: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: rejects incompatible markets, unsupported units, and missing schema fields<br>scout-offline-crosswalk-proof: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: requires offline mode and an independently reviewed crosswalk<br>scout-prepared-output-mutation-proof: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: rejects mixed commits, altered outputs, and prepared-value mutations<br>scout-real-commercial-lighting-preparation-proof: PASSED; scripts/research/operational-savings/tests/scout-real.test.mjs :: maps only an exact prepared Scout market to the ITC-14 formula term | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is U.S. Department of Energy and National Laboratory of the Rockies.
The selected official source is Scout.
The catalog acquisition target is Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3.
Its release date or release state is 2026-07-23.
The expected update cadence is Continuous source repository with release tags.
The license finding is Apache-2.0, with a conditional BSD alternative.
The legal-review requirement is Retain the selected license text and source commit; do not imply DOE endorsement.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://github.com/trynthink/scout
- https://scout-bto.readthedocs.io/

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-SCOUT-ECM | Scout source repository | Unpinned | UNVERIFIED | ECM definitions and Scout processing code |

## 3. What can actually be acquired

- Public Git repository
- ECM JSON definitions
- Baseline stock and technology data files
- Local Python execution

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public Git repository | https://github.com/trynthink/scout | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Git tree | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3; Continuous source repository with release tags; Commit pins are stable | Public acquisition appears automatable, subject to artifact-specific license review | Repository cloned and the ECM definitions, schemas, examples, and processing code were inspected |
| ECM JSON definitions | https://github.com/trynthink/scout | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3; Continuous source repository with release tags; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Repository cloned and the ECM definitions, schemas, examples, and processing code were inspected |
| Baseline stock and technology data files | https://github.com/trynthink/scout | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3; Continuous source repository with release tags; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Local Python execution | https://github.com/trynthink/scout | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3; Continuous source repository with release tags; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: Repository cloned and the ECM definitions, schemas, examples, and processing code were inspected.
The planning catalog observation is docs/examples/led_troffers.json, JSON; no artifact checksum is recorded in the planning catalog.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:scout-commercial-901-lighting-72bcf419 | PINNED_REPOSITORY_FILE | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout/blob/72bcf419eb1cb37379f163563344b0ec61507fd3/ecm_definitions/%28C%29%2090.1%20Lighting.json | sha256:f58f1dec2e3b4693339eae59a73cf018b637a5c34400ff6c62dae189cfe18baa; 3558 bytes | DOCUMENTATION_ONLY | ITC-14/scout_ecm_screen |
| artifact:scout-commercial-air-sealing-72bcf419 | PINNED_REPOSITORY_FILE | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout/blob/72bcf419eb1cb37379f163563344b0ec61507fd3/ecm_definitions/%28C%29%20BTO%20RDO%20Air%20Sealing%20%28Exist%29.json | sha256:71b615e0995af9e258edb234feadbc311aeea0f7aaf9b87127d35a2ca9fb6714; 2610 bytes | DOCUMENTATION_ONLY | ITC-05/scout_ecm_screen |
| artifact:scout-commercial-best-refrigeration-72bcf419 | PINNED_REPOSITORY_FILE | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout/blob/72bcf419eb1cb37379f163563344b0ec61507fd3/ecm_definitions/%28C%29%20Best%20Refrigeration.json | sha256:3833cf6f406dec2ea5b72c507aefd3f1fd4312c4c7491405d83a7c4835b907de; 4054 bytes | DOCUMENTATION_ONLY | ITC-11/scout_ecm_screen |
| artifact:scout-config-schema-72bcf419 | PINNED_REPOSITORY_FILE | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout/blob/72bcf419eb1cb37379f163563344b0ec61507fd3/scout/supporting_data/config_schema.yml | sha256:1e6eff0552e7f88ed276950eb77551089c283734bb45caf00174c8be1e9405c8; 17699 bytes | DOCUMENTATION_ONLY | ITC-14/scout_ecm_screen |
| artifact:scout-ecm-prep-entrypoint-72bcf419 | PINNED_REPOSITORY_FILE | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout/blob/72bcf419eb1cb37379f163563344b0ec61507fd3/scout/ecm_prep.py | sha256:639134208b7368e7a9cafe9975b8205ed8fe4b864cce10368167557cd5831848; 863824 bytes | DOCUMENTATION_ONLY | ITC-14/scout_ecm_screen |
| artifact:scout-ecm-prep-output-72bcf419 | LOCALLY_GENERATED_REAL_MODEL_OUTPUT | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout | sha256:f7b428a2e66d90b4bfc4cf6272d85f52b1aea88229ff3c3fb53e33f536eccf50; 599004 bytes | DOCUMENTATION_ONLY | ITC-14/scout_ecm_screen |
| artifact:scout-ecm-schema-72bcf419 | PINNED_REPOSITORY_FILE | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout/blob/72bcf419eb1cb37379f163563344b0ec61507fd3/ecm_definitions/ecm_schema.json | sha256:d28cdc4fd33c65a03a05c0c08e5e222b1eaf26bb081670c5e081e78f7d1b07ed; 39231 bytes | DOCUMENTATION_ONLY | ITC-05/scout_ecm_screen, ITC-11/scout_ecm_screen, ITC-14/scout_ecm_screen |
| artifact:scout-preparation-result-72bcf419 | LOCALLY_GENERATED_REAL_MODEL_PROOF | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout | sha256:9e1a8df3f7d498b6bf7651af191b165afb0551f41d84e4d04d17f050f76fe38c; 4309 bytes | DOCUMENTATION_ONLY | ITC-14/scout_ecm_screen |
| artifact:scout-repository-72bcf419 | PUBLIC_GIT_CLONE | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3 | https://github.com/trynthink/scout | commit:72bcf419eb1cb37379f163563344b0ec61507fd3 | DOCUMENTATION_ONLY | ITC-05/scout_ecm_screen, ITC-11/scout_ecm_screen, ITC-14/scout_ecm_screen |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:scout-ecm-v1.0.0-72bcf419 | artifact:scout-ecm-schema-72bcf419 | JSON_SCHEMA_DRAFT_07_ECM_AND_EXECUTED_PREPARATION_OUTPUT | scripts/research/operational-savings/adapters/scout/inspect-schema.mjs | name; _description; measure_type; climate_zone; bldg_type; structure_type; end_use; fuel_type; technology; energy_efficiency; energy_efficiency_units; installed_cost; cost_units; product_lifetime; product_lifetime_units | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `name`
- `climate_zone`
- `bldg_type`
- `structure_type`
- `end_use`
- `energy_efficiency`
- `energy_efficiency_units`
- `energy_efficiency_source`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HVAC share of billed resource, if known | scout_ecm_screen; ITC-05 | Project Document | Annual Operational Savings > Annual HVAC resource reduction > Annual HVAC resource by end use and fuel > Documented HVAC share of billed resource, if known from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing building vintage class | scout_ecm_screen; ITC-05, ITC-11, ITC-14 | User | Annual Operational Savings > Annual HVAC resource reduction > Existing building vintage class | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing duct location and condition | scout_ecm_screen; ITC-05 | User | Annual Operational Savings > Annual HVAC resource reduction > Existing duct location and condition | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed sealing and insulation scope | scout_ecm_screen; ITC-05 | Linked Opportunity | Annual Operational Savings > Annual HVAC resource reduction > Proposed sealing and insulation scope | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Building Type | scout_ecm_screen; ITC-05, ITC-11, ITC-14 | Profile | Annual Operational Savings > Annual HVAC resource reduction > Building Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Climate Zone | scout_ecm_screen; ITC-05, ITC-11, ITC-14 | Profile | Annual Operational Savings > Annual HVAC resource reduction > Site Climate Zone | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Affected-load share, if known | scout_ecm_screen; ITC-11 | Project Document | Annual Operational Savings > Annual refrigeration electricity reduction > Affected refrigeration annual kWh > Documented Affected-load share, if known from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing condition or control | scout_ecm_screen; ITC-11 | User | Annual Operational Savings > Annual refrigeration electricity reduction > Existing condition or control | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed scope or sequence | scout_ecm_screen; ITC-11 | Linked Opportunity | Annual Operational Savings > Annual refrigeration electricity reduction > Proposed scope or sequence | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing Building Condition | scout_ecm_screen; ITC-14 | User | Annual Operational Savings > Annual direct resource reduction by end use and fuel > Existing Building Condition | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed Upgrade Option | scout_ecm_screen; ITC-14 | Linked Opportunity | Annual Operational Savings > Annual direct resource reduction by end use and fuel > Proposed Upgrade Option | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Documented resource-reduction factor for the approved measure and market segment, with source version and units | scout_ecm_screen; ITC-05 | artifact:scout-commercial-air-sealing-72bcf419; artifact:scout-ecm-schema-72bcf419; artifact:scout-repository-72bcf419 | name; climate_zone; bldg_type; structure_type; end_use; energy_efficiency; energy_efficiency_units; energy_efficiency_source | When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance | fraction | DERIVABLE_FROM_SOURCE | Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market |
| Documented resource-reduction factor for the approved measure and market segment, with source version and units | scout_ecm_screen; ITC-11 | artifact:scout-commercial-best-refrigeration-72bcf419; artifact:scout-ecm-schema-72bcf419; artifact:scout-repository-72bcf419 | name; climate_zone; bldg_type; structure_type; end_use; energy_efficiency; energy_efficiency_units; energy_efficiency_source | When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance | fraction | DERIVABLE_FROM_SOURCE | Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market |
| Documented resource-reduction factor for the approved measure and market segment, with source version and units | scout_ecm_screen; ITC-14 | artifact:scout-commercial-901-lighting-72bcf419; artifact:scout-config-schema-72bcf419; artifact:scout-ecm-prep-entrypoint-72bcf419; artifact:scout-ecm-prep-output-72bcf419; artifact:scout-ecm-schema-72bcf419; artifact:scout-preparation-result-72bcf419; artifact:scout-repository-72bcf419 | name; climate_zone; bldg_type; structure_type; end_use; energy_efficiency; energy_efficiency_units; energy_efficiency_source | When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance | fraction | DERIVABLE_FROM_SOURCE | Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
Scout
-> Public Git repository
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into building_upgrade_measures + retrofit_measure_crosswalks + benchmark_populations + benchmark_values + model_versions
-> deterministic scout-ecm-screen adapter
-> typed Standard output
-> category formula mapping
-> immutable calculation and provenance
```

Acquisition runs under a scheduler or approved operator action and never during a customer estimate.
A failed checksum, schema validation, normalization, or publication step leaves the prior accepted release and publication receipt active.
Implementation evidence must come from executed migrations, populated table counts, exact artifact identities, and the committed compact proof publication.

## 7. Resolution rules

Exact resolution requires one compatible active record after applying every source-supported identity, equipment class, capacity, geography, effective-date, and test-procedure filter.
Zero compatible records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
Requirements resolution admits only records satisfying every mandatory project and category constraint from one source release.
Benchmark resolution requires an authoritative, category-specific, unit-compatible population and a retained numeric selection rule.
An official recommended value takes precedence, followed by a defensible source-weighted median, then an ordinary median only for an exchangeable scalar population.
Structured records and model result sets are never median-selected.
Every selection retains its filters, eligible population, sample size, method, fallback level, uncertainty, and rejected candidates.

## 8. Calculation and runtime execution

The exact output contract contains: Documented resource-reduction factor for the approved measure and market segment, with source version and units.
The governing source equation or transformation is When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance.
The selected runtime design is Pinned build-time Scout preparation followed by compact approved ECM lookup artifacts.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Continuous source repository with release tags.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 80-130 hours.
Estimated raw storage is 3 GB.
Estimated published storage is 0.1 GB.
Refresh effort is 8-16 per release.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.15 at 100 calculations per month, $0.20 at 1,000, and $0.50 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/scout-ecm-screen.sample.json`.
Its local output kind is `product_record`, its selection rule is `EXACT_NORMALIZED_IDENTIFIER`, and its output unit is `lm/W`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 3 bound processes.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Explicit Scout ECM definitions whose markets and efficiency units match a reviewed RetroFi retrofit.
The unsupported boundary is Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market.

## 13. Recommended strategy and later card review

Pin one Scout release, validate each approved ECM JSON against its source schema, execute preparation offline, and publish only reviewed reduction factors with the complete market selector.
The rejected alternative is: A generic Scout median is rejected because ECM results are structured scenarios and not an interchangeable benchmark population.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
