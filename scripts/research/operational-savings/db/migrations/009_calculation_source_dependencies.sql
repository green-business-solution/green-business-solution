CREATE TABLE IF NOT EXISTS calculation_source_dependencies (
  calculation_run_id TEXT NOT NULL REFERENCES calculation_runs(id),
  dependency_role TEXT NOT NULL,
  input_calculation_run_id TEXT REFERENCES calculation_runs(id),
  source_artifact_id TEXT NOT NULL REFERENCES source_artifacts(id),
  source_fields_json TEXT NOT NULL,
  transformation TEXT NOT NULL,
  PRIMARY KEY (calculation_run_id, dependency_role)
);

CREATE INDEX IF NOT EXISTS calculation_source_dependency_artifact_idx
  ON calculation_source_dependencies (source_artifact_id);
