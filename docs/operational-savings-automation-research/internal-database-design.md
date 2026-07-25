# Internal operational-savings database design

## Storage tiers

Immutable raw snapshots belong in content-addressed object storage outside the relational query path.
Large analytical source releases such as ComStock belong in Parquet and should be filtered and aggregated with DuckDB during ingestion.
Normalized product, certification, tariff, crosswalk, selected-value, and provenance records belong in PostgreSQL-compatible tables.
Small reviewed tables such as FEMP exterior-lighting requirements may publish as checksummed JSON artifacts loaded locally.
Pinned models belong in reproducible packages with checksums, while their inputs, outputs, and warnings belong in the calculation tables.

## Proposed logical tables

| Table | Purpose | Primary key | Important columns |
| --- | --- | --- | --- |
| source_registry | One row per official source and license boundary | id | organization, name, primary_url, license, attribution, legal_review_status |
| source_releases | Immutable discovered source releases | id | source_id, version, published_at, discovered_at, status, schema_version_id |
| source_artifacts | Acquired files or repository trees | id | release_id, url, media_type, byte_size, sha256, storage_uri |
| source_checksums | Independent checksum observations | id | artifact_id, algorithm, digest, observed_at |
| ingestion_runs | Acquisition and normalization audit | id | source_id, release_id, started_at, finished_at, status, logs_uri |
| schema_versions | Pinned source and normalized schema fingerprints | id | source_id, fingerprint, schema_json, accepted_at |
| equipment_products | Normalized product identity | id | source_release_id, native_id, manufacturer, brand, model, normalized_model |
| equipment_certifications | Certification and status history | id | product_id, specification, test_procedure, effective_from, effective_to, active |
| equipment_performance_fields | Typed source-native product metrics | id | certification_id, field_key, numeric_value, text_value, unit_id |
| energy_star_commercial_dishwashers | ENERGY STAR commercial-dishwasher summary fields | product_id | machine_type, sanitation_method, water_gallons_per_rack, washing_kwh_per_rack, idle_energy_rate_kw, date_qualified |
| energy_star_dishwasher_operating_modes | Mode-specific ENERGY STAR commercial-dishwasher metrics | id | product_id, operating_mode, water_gallons_per_rack, washing_kwh_per_rack, idle_energy_rate_kw, booster_idle_energy_rate_kw, racks_per_hour |
| installed_baseline_benchmarks | Approved installed-equipment populations | id | population_id, equipment_class, context_json |
| building_upgrade_measures | ComStock and Scout measure definitions | id | release_id, native_measure_id, name, method |
| building_archetype_benchmarks | Precomputed building resource deltas | id | measure_id, geography_id, archetype, resource, value, unit_id |
| geographic_crosswalks | ZIP, county, state, climate, and utility mappings | id | release_id, source_geography, target_geography, confidence |
| climate_crosswalks | Weather and climate artifact selection | id | geography_id, model_version_id, resource_artifact_id |
| utility_providers | Canonical utility identity | id | eia_id, name, state_code |
| utility_tariffs | Approved effective tariff versions | id | provider_id, native_label, schedule_name, sector, effective_from, effective_to, approved |
| tariff_periods | Calendar period definitions | id | tariff_id, charge_type, period_index, weekday_schedule, weekend_schedule |
| tariff_energy_charges | Energy tiers and rates | id | period_id, tier_index, minimum_kwh, maximum_kwh, rate_usd_per_kwh |
| tariff_demand_charges | Demand tiers, ratchets, and lookbacks | id | period_id, tier_index, rate_usd_per_kw, ratchet_json |
| tariff_export_rules | Export and non-bypassable treatment | id | tariff_id, rule_type, rate, unit_id, conditions_json |
| product_taxonomy_crosswalks | RetroFi to source product classes | id | source_release_id, retrofit_id, source_class, approval_status |
| retrofit_measure_crosswalks | RetroFi to building measure IDs | id | source_release_id, retrofit_id, measure_id, approval_status |
| benchmark_populations | Immutable eligible population definitions | id | source_release_id, population_key, filters_json, minimum_sample_size |
| benchmark_values | Selected official, weighted-median, or median values | id | population_id, field_key, value, unit_id, sample_size, selection_rule |
| operating_schedule_references | Pinned source-backed astronomy or schedule validation observations | id | source_release_id, reference_kind, location, local_date, event_name, local_time, native_text |
| model_versions | Pinned executable models | id | name, version, commit_sha, package_sha256, license |
| model_input_schemas | Model input contracts | id | model_version_id, schema_json, fingerprint |
| calculation_assumptions | Versioned RetroFi-owned assumptions | id | assumption_key, value_json, unit_id, effective_from, approved_by |
| selected_values | One selected value or structure per resolver | id | calculation_run_id, process_key, result_kind, value_json, unit_id |
| selected_value_provenance | Complete selected-value trace | id | selected_value_id, release_id, artifact_id, filters_json, population_id, fallback_level |
| calculation_runs | Reproducible local executions | id | adapter_version, input_hash, model_version_id, started_at, result_hash, status |
| calculation_source_dependencies | Typed lineage from a calculation to upstream runs or retained source artifacts | calculation_run_id + dependency_role | input_calculation_run_id, source_artifact_id, source_fields_json, transformation |
| calculation_warnings | Typed warnings and review gates | id | calculation_run_id, code, severity, message |

## Core PostgreSQL-compatible schema

```sql
CREATE TABLE source_registry (
  id uuid PRIMARY KEY,
  source_key text UNIQUE NOT NULL,
  organization text NOT NULL,
  official_name text NOT NULL,
  primary_url text NOT NULL,
  license_expression text,
  attribution text,
  legal_review_status text NOT NULL,
  created_at timestamptz NOT NULL
);

CREATE TABLE source_releases (
  id uuid PRIMARY KEY,
  source_id uuid NOT NULL REFERENCES source_registry(id),
  source_version text NOT NULL,
  published_at timestamptz,
  discovered_at timestamptz NOT NULL,
  schema_fingerprint text NOT NULL,
  publication_status text NOT NULL,
  UNIQUE (source_id, source_version, schema_fingerprint)
);

CREATE TABLE source_artifacts (
  id uuid PRIMARY KEY,
  source_release_id uuid NOT NULL REFERENCES source_releases(id),
  source_url text NOT NULL,
  media_type text NOT NULL,
  byte_size bigint NOT NULL CHECK (byte_size >= 0),
  sha256 char(64) NOT NULL,
  storage_uri text NOT NULL,
  acquired_at timestamptz NOT NULL,
  UNIQUE (source_release_id, sha256)
);

CREATE TABLE selected_values (
  id uuid PRIMARY KEY,
  calculation_run_id uuid NOT NULL REFERENCES calculation_runs(id),
  category_id text NOT NULL,
  process_key text NOT NULL,
  result_kind text NOT NULL,
  selected_value jsonb,
  unit_id text,
  scope text NOT NULL,
  uncertainty text NOT NULL
);

CREATE TABLE selected_value_provenance (
  id uuid PRIMARY KEY,
  selected_value_id uuid NOT NULL REFERENCES selected_values(id),
  source_release_id uuid REFERENCES source_releases(id),
  source_artifact_id uuid REFERENCES source_artifacts(id),
  filters jsonb NOT NULL,
  eligible_population jsonb,
  population_size integer,
  sample_size integer,
  selection_rule text NOT NULL,
  fallback_level text NOT NULL,
  warnings jsonb NOT NULL
);

CREATE TABLE calculation_source_dependencies (
  calculation_run_id uuid NOT NULL REFERENCES calculation_runs(id),
  dependency_role text NOT NULL,
  input_calculation_run_id uuid REFERENCES calculation_runs(id),
  source_artifact_id uuid REFERENCES source_artifacts(id),
  source_fields_json jsonb NOT NULL,
  transformation text NOT NULL,
  PRIMARY KEY (calculation_run_id, dependency_role),
  CHECK (
    input_calculation_run_id IS NOT NULL
    OR source_artifact_id IS NOT NULL
  )
);
```

## Versioning and publication

Every raw artifact and normalized release is immutable.
Source, release, artifact, model-version, assumption, calculation-run, selected-value, and dependency identities are content-bound.
An idempotent insert may confirm identical content, but no upsert may replace different content behind an existing identity.
A source release moves through discovered, acquired, validated, normalized, reviewed, published, deprecated, and rejected states.
Only a published release may be selected by an estimate.
Publication is an atomic source-specific pointer and rollback changes that pointer without deleting data.
Effective dates are separate from ingestion and publication dates.
Historical calculations pin their source-release IDs and remain reproducible after a newer release is published.
A source-backed calculation dependency pins its source artifact.
A project, profile, bill, linked-opportunity, or document dependency may omit the source artifact only when it pins an immutable upstream calculation run whose input hash records the exact owned input.
`calculation_source_dependencies` enforces that every dependency has an upstream calculation run, a source artifact, or both.

The research database publisher builds the SQLite database, compact JSON export, and publication receipt in temporary paths.
It hashes the database and compact export, records their byte sizes under one generation ID, renames the data files, and renames the receipt last as the commit marker.
Consumers must verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json` before use.
If any build, rename, or verification step fails, the prior committed generation remains authoritative.

## Deduplication and matching

Native source identifiers remain the authoritative identity.
Search-normalized manufacturer and model strings are secondary indexes, not primary keys.
Alias rows include their origin, reviewer, effective interval, and reason.
Exact matching requires one compatible active record after product class, capacity, geography, date, and test-procedure filters.
Ambiguous matches fail closed.

## Index strategy

Use B-tree indexes for exact identifiers, effective intervals, source versions, utility EIA IDs, tariff labels, and active status.
Use GIN indexes for bounded source-specific requirements JSON only where stable normalized columns would create excessive sparsity.
Use BRIN indexes for very large time-ordered ingestion and calculation tables.
Partition interval and result-series tables by source release or calculation month only after measured volume justifies it.

## Attribution and licensing

License expression, attribution text, legal-review state, artifact URL, and original notice are retained at source and release level.
Adapters return source and source-version attribution with every selected value.
Publication is blocked when a license is missing or marked for legal review.
