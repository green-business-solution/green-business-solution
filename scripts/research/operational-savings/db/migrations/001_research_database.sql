PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS source_registry (
  id TEXT PRIMARY KEY,
  standard_id TEXT NOT NULL,
  organization TEXT NOT NULL,
  name TEXT NOT NULL,
  primary_url TEXT NOT NULL,
  license TEXT NOT NULL,
  attribution TEXT NOT NULL,
  access_mode TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS source_registry_standard_idx
  ON source_registry (standard_id);

CREATE TABLE IF NOT EXISTS schema_versions (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES source_registry(id),
  fingerprint_sha256 TEXT NOT NULL,
  schema_kind TEXT NOT NULL,
  schema_json TEXT NOT NULL,
  inspected_at TEXT NOT NULL,
  UNIQUE (source_id, fingerprint_sha256)
);

CREATE TABLE IF NOT EXISTS source_releases (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES source_registry(id),
  version TEXT NOT NULL,
  published_at TEXT,
  acquired_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('INSPECTED', 'NORMALIZED', 'PUBLISHED', 'QUARANTINED')),
  schema_version_id TEXT REFERENCES schema_versions(id),
  UNIQUE (source_id, version)
);

CREATE TABLE IF NOT EXISTS source_artifacts (
  id TEXT PRIMARY KEY,
  release_id TEXT NOT NULL REFERENCES source_releases(id),
  source_url TEXT NOT NULL,
  local_name TEXT NOT NULL,
  media_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
  sha256 TEXT NOT NULL CHECK (length(sha256) = 64),
  acquired_at TEXT NOT NULL,
  official INTEGER NOT NULL CHECK (official IN (0, 1)),
  UNIQUE (release_id, sha256)
);

CREATE TABLE IF NOT EXISTS source_checksums (
  artifact_id TEXT NOT NULL REFERENCES source_artifacts(id),
  algorithm TEXT NOT NULL,
  digest TEXT NOT NULL,
  observed_at TEXT NOT NULL,
  PRIMARY KEY (artifact_id, algorithm)
);

CREATE TABLE IF NOT EXISTS ingestion_runs (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES source_registry(id),
  release_id TEXT REFERENCES source_releases(id),
  adapter_version TEXT NOT NULL,
  started_at TEXT NOT NULL,
  finished_at TEXT,
  status TEXT NOT NULL CHECK (status IN ('RUNNING', 'SUCCEEDED', 'FAILED')),
  network_disabled INTEGER NOT NULL CHECK (network_disabled IN (0, 1)),
  records_read INTEGER NOT NULL DEFAULT 0,
  records_written INTEGER NOT NULL DEFAULT 0,
  warning_count INTEGER NOT NULL DEFAULT 0,
  error_message TEXT
);

CREATE TABLE IF NOT EXISTS equipment_products (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  native_id TEXT NOT NULL,
  manufacturer TEXT,
  brand TEXT,
  model TEXT NOT NULL,
  normalized_model TEXT NOT NULL,
  product_family TEXT NOT NULL,
  source_status TEXT,
  active INTEGER NOT NULL CHECK (active IN (0, 1)),
  modified_at TEXT,
  UNIQUE (source_release_id, native_id)
);

CREATE TABLE IF NOT EXISTS equipment_certifications (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES equipment_products(id),
  specification TEXT,
  test_procedure TEXT,
  effective_from TEXT,
  effective_to TEXT,
  active INTEGER NOT NULL CHECK (active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS equipment_performance_fields (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES equipment_products(id),
  field_key TEXT NOT NULL,
  numeric_value REAL,
  text_value TEXT,
  unit TEXT,
  native_field TEXT NOT NULL,
  CHECK ((numeric_value IS NULL) <> (text_value IS NULL)),
  UNIQUE (product_id, field_key)
);

CREATE TABLE IF NOT EXISTS product_taxonomy_crosswalks (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  source_family TEXT NOT NULL,
  source_class TEXT NOT NULL,
  retrofi_class TEXT NOT NULL,
  review_status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS building_upgrade_measures (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  native_measure_id TEXT NOT NULL,
  name TEXT NOT NULL,
  method TEXT,
  UNIQUE (source_release_id, native_measure_id)
);

CREATE TABLE IF NOT EXISTS building_archetype_benchmarks (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  measure_id TEXT REFERENCES building_upgrade_measures(id),
  geography TEXT NOT NULL,
  building_type TEXT NOT NULL,
  area_min_ft2 REAL,
  area_max_ft2 REAL,
  resource TEXT NOT NULL,
  delta_per_ft2 REAL NOT NULL,
  unit TEXT NOT NULL,
  source_weight REAL,
  population_size INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS installed_baseline_benchmarks (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  equipment_class TEXT NOT NULL,
  context_json TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS retrofit_measure_crosswalks (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  retrofit_id TEXT NOT NULL,
  native_measure_id TEXT NOT NULL,
  review_status TEXT NOT NULL,
  UNIQUE (source_release_id, retrofit_id, native_measure_id)
);

CREATE TABLE IF NOT EXISTS geographic_crosswalks (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  source_geography TEXT NOT NULL,
  normalized_geography TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS climate_crosswalks (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  postal_code TEXT,
  city TEXT,
  state TEXT,
  climate_zone TEXT,
  station_id TEXT
);

CREATE TABLE IF NOT EXISTS utility_providers (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  native_utility_id TEXT,
  name TEXT NOT NULL,
  state TEXT,
  eia_id TEXT
);

CREATE TABLE IF NOT EXISTS utility_tariffs (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  native_rate_id TEXT NOT NULL,
  utility_id TEXT REFERENCES utility_providers(id),
  label TEXT NOT NULL,
  sector TEXT,
  description TEXT,
  service_type TEXT,
  voltage_category TEXT,
  peak_kw_min REAL,
  peak_kw_max REAL,
  fixed_charge REAL,
  fixed_charge_unit TEXT,
  minimum_charge REAL,
  minimum_charge_unit TEXT,
  start_date TEXT,
  end_date TEXT,
  approved INTEGER,
  source_url TEXT,
  source_parent_url TEXT,
  supersedes_native_rate_id TEXT,
  latest_update TEXT,
  eligibility_json TEXT,
  UNIQUE (source_release_id, native_rate_id)
);

CREATE TABLE IF NOT EXISTS tariff_periods (
  id TEXT PRIMARY KEY,
  tariff_id TEXT NOT NULL REFERENCES utility_tariffs(id),
  period_kind TEXT NOT NULL,
  period_index INTEGER NOT NULL,
  period_name TEXT,
  season_months_json TEXT,
  weekday_schedule_json TEXT,
  weekend_schedule_json TEXT,
  UNIQUE (tariff_id, period_kind, period_index)
);

CREATE TABLE IF NOT EXISTS tariff_energy_charges (
  id TEXT PRIMARY KEY,
  tariff_id TEXT NOT NULL REFERENCES utility_tariffs(id),
  period_index INTEGER NOT NULL,
  tier_index INTEGER NOT NULL,
  rate REAL,
  unit TEXT,
  max_usage REAL,
  adjustment REAL,
  all_in_rate REAL,
  all_in_rate_source TEXT,
  sell_rate REAL,
  UNIQUE (tariff_id, period_index, tier_index)
);

CREATE TABLE IF NOT EXISTS tariff_demand_charges (
  id TEXT PRIMARY KEY,
  tariff_id TEXT NOT NULL REFERENCES utility_tariffs(id),
  charge_kind TEXT NOT NULL,
  period_index INTEGER NOT NULL,
  tier_index INTEGER NOT NULL,
  rate REAL,
  unit TEXT,
  max_demand REAL,
  adjustment REAL,
  UNIQUE (tariff_id, charge_kind, period_index, tier_index)
);

CREATE TABLE IF NOT EXISTS tariff_export_rules (
  id TEXT PRIMARY KEY,
  tariff_id TEXT NOT NULL REFERENCES utility_tariffs(id),
  sell_rate REAL,
  sell_unit TEXT,
  net_metering INTEGER,
  native_json TEXT
);

CREATE TABLE IF NOT EXISTS tariff_publication_components (
  id TEXT PRIMARY KEY,
  tariff_id TEXT NOT NULL REFERENCES utility_tariffs(id),
  source_artifact_id TEXT NOT NULL REFERENCES source_artifacts(id),
  season TEXT NOT NULL,
  period_name TEXT NOT NULL,
  voltage_category TEXT NOT NULL,
  component_name TEXT NOT NULL,
  rate REAL NOT NULL,
  unit TEXT NOT NULL,
  effective_date TEXT NOT NULL,
  source_page INTEGER NOT NULL,
  native_label TEXT NOT NULL,
  UNIQUE (
    tariff_id,
    source_artifact_id,
    season,
    period_name,
    voltage_category,
    component_name
  )
);

CREATE TABLE IF NOT EXISTS tariff_reconciliation_cases (
  id TEXT PRIMARY KEY,
  tariff_id TEXT NOT NULL REFERENCES utility_tariffs(id),
  source_artifact_id TEXT NOT NULL REFERENCES source_artifacts(id),
  usage_kwh REAL NOT NULL,
  demand_kw REAL,
  average_rate_per_kwh REAL NOT NULL,
  expected_bill REAL NOT NULL,
  calculated_bill REAL NOT NULL,
  tolerance REAL NOT NULL,
  status TEXT NOT NULL,
  source_page INTEGER NOT NULL,
  CHECK (status IN ('PASSED', 'FAILED'))
);

CREATE TABLE IF NOT EXISTS benchmark_populations (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  standard_id TEXT NOT NULL,
  process_key TEXT NOT NULL,
  filters_json TEXT NOT NULL,
  population_size INTEGER NOT NULL,
  weighting_field TEXT,
  selection_rule TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS benchmark_values (
  id TEXT PRIMARY KEY,
  population_id TEXT NOT NULL REFERENCES benchmark_populations(id),
  field_key TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  sample_size INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS model_versions (
  id TEXT PRIMARY KEY,
  standard_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  version TEXT NOT NULL,
  commit_sha TEXT,
  executable_sha256 TEXT,
  UNIQUE (standard_id, package_name, version)
);

CREATE TABLE IF NOT EXISTS model_input_schemas (
  id TEXT PRIMARY KEY,
  model_version_id TEXT NOT NULL REFERENCES model_versions(id),
  module_name TEXT NOT NULL,
  fingerprint_sha256 TEXT NOT NULL,
  schema_json TEXT NOT NULL,
  UNIQUE (model_version_id, module_name, fingerprint_sha256)
);

CREATE TABLE IF NOT EXISTS calculation_assumptions (
  id TEXT PRIMARY KEY,
  standard_id TEXT NOT NULL,
  assumption_key TEXT NOT NULL,
  value_json TEXT NOT NULL,
  unit TEXT,
  source_release_id TEXT REFERENCES source_releases(id)
);

CREATE TABLE IF NOT EXISTS calculation_runs (
  id TEXT PRIMARY KEY,
  standard_id TEXT NOT NULL,
  process_key TEXT NOT NULL,
  source_release_id TEXT REFERENCES source_releases(id),
  model_version_id TEXT REFERENCES model_versions(id),
  adapter_version TEXT NOT NULL,
  input_sha256 TEXT NOT NULL,
  output_sha256 TEXT NOT NULL,
  network_disabled INTEGER NOT NULL CHECK (network_disabled IN (0, 1)),
  status TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS selected_values (
  id TEXT PRIMARY KEY,
  calculation_run_id TEXT NOT NULL REFERENCES calculation_runs(id),
  formula_term TEXT NOT NULL,
  value REAL,
  value_json TEXT,
  unit TEXT NOT NULL,
  scope TEXT NOT NULL,
  selection_rule TEXT NOT NULL,
  CHECK ((value IS NULL) <> (value_json IS NULL))
);

CREATE TABLE IF NOT EXISTS selected_value_provenance (
  selected_value_id TEXT PRIMARY KEY REFERENCES selected_values(id),
  source_artifact_id TEXT REFERENCES source_artifacts(id),
  source_fields_json TEXT NOT NULL,
  filters_json TEXT NOT NULL,
  transformation TEXT NOT NULL,
  adapter_path TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS calculation_warnings (
  id TEXT PRIMARY KEY,
  calculation_run_id TEXT NOT NULL REFERENCES calculation_runs(id),
  code TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fuel_economy_vehicles (
  product_id TEXT PRIMARY KEY REFERENCES equipment_products(id),
  model_year INTEGER NOT NULL,
  vehicle_class TEXT NOT NULL,
  drive TEXT,
  fuel_type TEXT NOT NULL,
  comb08_mpg REAL,
  comb_e_kwh_per_100_miles REAL,
  modified_on TEXT
);

CREATE TABLE IF NOT EXISTS energy_star_commercial_dishwashers (
  product_id TEXT PRIMARY KEY REFERENCES equipment_products(id),
  machine_type TEXT NOT NULL,
  sanitation_method TEXT NOT NULL,
  water_gallons_per_rack REAL,
  washing_kwh_per_rack REAL,
  idle_energy_rate_kw REAL,
  date_qualified TEXT
);

CREATE TABLE IF NOT EXISTS femp_exterior_lighting_requirements (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  application TEXT NOT NULL,
  required_efficacy_lm_per_w REAL,
  lumen_min REAL,
  lumen_max REAL,
  example_power_w REAL,
  native_row_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS watersense_landscape_climate (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  postal_code TEXT,
  city TEXT,
  state TEXT,
  annual_eto_in REAL,
  annual_rainfall_in REAL,
  monthly_json TEXT,
  native_sheet TEXT NOT NULL,
  native_row INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS watersense_ci_methods (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  sheet_name TEXT NOT NULL,
  method_name TEXT NOT NULL,
  native_cell TEXT NOT NULL,
  formula_text TEXT,
  unit TEXT
);

CREATE TABLE IF NOT EXISTS chp_catalog_performance (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  technology TEXT NOT NULL,
  size_class TEXT NOT NULL,
  electrical_efficiency REAL,
  total_efficiency REAL,
  power_to_heat_ratio REAL,
  fuel_input_mmbtu_per_hour REAL,
  unit_basis TEXT,
  source_page INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS operating_schedule_references (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  reference_kind TEXT NOT NULL,
  location TEXT NOT NULL,
  local_date TEXT NOT NULL,
  event_name TEXT NOT NULL,
  local_time TEXT NOT NULL,
  native_text TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS equipment_products_exact_model_idx
  ON equipment_products (normalized_model, product_family, active);
CREATE INDEX IF NOT EXISTS utility_tariffs_resolution_idx
  ON utility_tariffs (utility_id, label, sector, start_date, end_date);
CREATE INDEX IF NOT EXISTS source_artifacts_sha_idx
  ON source_artifacts (sha256);
CREATE INDEX IF NOT EXISTS calculation_runs_replay_idx
  ON calculation_runs (standard_id, process_key, input_sha256);
