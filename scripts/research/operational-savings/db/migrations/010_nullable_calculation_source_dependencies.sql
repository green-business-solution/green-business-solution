ALTER TABLE calculation_source_dependencies
  RENAME TO calculation_source_dependencies_v1;

CREATE TABLE calculation_source_dependencies (
  calculation_run_id TEXT NOT NULL REFERENCES calculation_runs(id),
  dependency_role TEXT NOT NULL,
  input_calculation_run_id TEXT REFERENCES calculation_runs(id),
  source_artifact_id TEXT REFERENCES source_artifacts(id),
  source_fields_json TEXT NOT NULL,
  transformation TEXT NOT NULL,
  PRIMARY KEY (calculation_run_id, dependency_role),
  CHECK (
    input_calculation_run_id IS NOT NULL
    OR source_artifact_id IS NOT NULL
  )
);

INSERT INTO calculation_source_dependencies (
  calculation_run_id,
  dependency_role,
  input_calculation_run_id,
  source_artifact_id,
  source_fields_json,
  transformation
)
SELECT
  calculation_run_id,
  dependency_role,
  input_calculation_run_id,
  source_artifact_id,
  source_fields_json,
  transformation
FROM calculation_source_dependencies_v1;

DROP TABLE calculation_source_dependencies_v1;

CREATE INDEX calculation_source_dependency_artifact_idx
  ON calculation_source_dependencies (source_artifact_id);

CREATE INDEX calculation_source_dependency_input_run_idx
  ON calculation_source_dependencies (input_calculation_run_id);
