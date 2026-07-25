CREATE TABLE IF NOT EXISTS reopt_scenario_runs (
  id TEXT PRIMARY KEY,
  calculation_run_id TEXT NOT NULL UNIQUE
    REFERENCES calculation_runs(id),
  source_artifact_id TEXT NOT NULL
    REFERENCES source_artifacts(id),
  scenario_role TEXT NOT NULL
    CHECK (scenario_role IN ('OFFICIAL', 'BASELINE', 'PROPOSED')),
  source_input_path TEXT NOT NULL,
  evidence_path TEXT NOT NULL,
  evidence_sha256 TEXT NOT NULL CHECK (length(evidence_sha256) = 64),
  evidence_output_sha256 TEXT NOT NULL
    CHECK (length(evidence_output_sha256) = 64),
  expanded_input_sha256 TEXT NOT NULL
    CHECK (length(expanded_input_sha256) = 64),
  termination_status TEXT NOT NULL CHECK (termination_status = 'OPTIMAL'),
  solver_seconds REAL NOT NULL CHECK (solver_seconds >= 0),
  network_enforcement TEXT NOT NULL
    CHECK (network_enforcement = 'DOCKER_NONE'),
  julia_version TEXT NOT NULL,
  highs_version TEXT NOT NULL,
  highs_jll_version TEXT NOT NULL,
  annual_load_kwh REAL NOT NULL CHECK (annual_load_kwh > 0),
  year_one_energy_cost_before_tax_usd REAL NOT NULL,
  year_one_demand_cost_before_tax_usd REAL NOT NULL,
  year_one_bill_before_tax_usd REAL NOT NULL,
  storage_power_kw REAL NOT NULL CHECK (storage_power_kw >= 0),
  storage_energy_kwh REAL NOT NULL CHECK (storage_energy_kwh >= 0),
  storage_discharge_kwh REAL NOT NULL CHECK (storage_discharge_kwh >= 0),
  storage_soc_series_sha256 TEXT,
  storage_discharge_series_sha256 TEXT,
  CHECK (
    (scenario_role = 'OFFICIAL'
      AND storage_soc_series_sha256 IS NULL
      AND storage_discharge_series_sha256 IS NULL)
    OR
    (scenario_role IN ('BASELINE', 'PROPOSED')
      AND length(storage_soc_series_sha256) = 64
      AND length(storage_discharge_series_sha256) = 64)
  )
);

CREATE INDEX IF NOT EXISTS reopt_scenario_runs_role_idx
  ON reopt_scenario_runs (scenario_role);
