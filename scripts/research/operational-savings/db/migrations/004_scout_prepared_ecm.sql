CREATE TABLE IF NOT EXISTS scout_preparation_runs (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  source_artifact_id TEXT NOT NULL REFERENCES source_artifacts(id),
  model_version_id TEXT NOT NULL REFERENCES model_versions(id),
  commit_sha TEXT NOT NULL CHECK (length(commit_sha) = 40),
  entry_point TEXT NOT NULL,
  arguments_json TEXT NOT NULL,
  runtime_json TEXT NOT NULL,
  network_mode TEXT NOT NULL
    CHECK (network_mode = 'OS_SANDBOX_DENY_NETWORK'),
  output_byte_size INTEGER NOT NULL CHECK (output_byte_size > 0),
  output_sha256 TEXT NOT NULL CHECK (length(output_sha256) = 64),
  independent_replay_count INTEGER NOT NULL
    CHECK (independent_replay_count >= 2),
  replay_output_sha256 TEXT NOT NULL
    CHECK (length(replay_output_sha256) = 64),
  CHECK (output_sha256 = replay_output_sha256),
  UNIQUE (source_release_id, output_sha256)
);

CREATE TABLE IF NOT EXISTS scout_prepared_ecm_values (
  id TEXT PRIMARY KEY,
  preparation_run_id TEXT NOT NULL REFERENCES scout_preparation_runs(id),
  native_measure_name TEXT NOT NULL,
  building_type TEXT NOT NULL,
  climate_zones_json TEXT NOT NULL,
  structure_types_json TEXT NOT NULL,
  end_use TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  reduction_fraction REAL NOT NULL
    CHECK (reduction_fraction >= 0 AND reduction_fraction <= 1),
  native_unit TEXT NOT NULL,
  installed_cost REAL,
  installed_cost_unit TEXT,
  product_lifetime REAL,
  product_lifetime_unit TEXT,
  UNIQUE (
    preparation_run_id,
    native_measure_name,
    building_type,
    end_use,
    fuel_type
  )
);

CREATE TABLE IF NOT EXISTS scout_prepared_ecm_annual_results (
  id TEXT PRIMARY KEY,
  preparation_run_id TEXT NOT NULL REFERENCES scout_preparation_runs(id),
  native_measure_name TEXT NOT NULL,
  adoption_scenario TEXT NOT NULL
    CHECK (
      adoption_scenario IN (
        'Technical potential',
        'Max adoption potential'
      )
    ),
  model_year INTEGER NOT NULL CHECK (model_year BETWEEN 2020 AND 2100),
  baseline_energy_mmbtu REAL NOT NULL CHECK (baseline_energy_mmbtu > 0),
  efficient_energy_mmbtu REAL NOT NULL
    CHECK (
      efficient_energy_mmbtu >= 0
      AND efficient_energy_mmbtu <= baseline_energy_mmbtu
    ),
  aggregate_reduction_fraction REAL NOT NULL
    CHECK (
      aggregate_reduction_fraction >= 0
      AND aggregate_reduction_fraction <= 1
    ),
  UNIQUE (
    preparation_run_id,
    native_measure_name,
    adoption_scenario,
    model_year
  )
);

CREATE INDEX IF NOT EXISTS scout_prepared_ecm_lookup_idx
  ON scout_prepared_ecm_values (
    native_measure_name,
    building_type,
    end_use,
    fuel_type
  );
