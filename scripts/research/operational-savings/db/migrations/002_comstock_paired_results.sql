CREATE TABLE IF NOT EXISTS comstock_building_results (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  source_artifact_id TEXT NOT NULL REFERENCES source_artifacts(id),
  native_building_id INTEGER NOT NULL,
  source_weight REAL NOT NULL CHECK (source_weight > 0),
  upgrade_id INTEGER NOT NULL,
  geography TEXT NOT NULL,
  building_type TEXT NOT NULL,
  floor_area_ft2 REAL NOT NULL CHECK (floor_area_ft2 > 0),
  resource TEXT NOT NULL,
  annual_resource_value REAL NOT NULL,
  unit TEXT NOT NULL,
  applicability INTEGER NOT NULL CHECK (applicability IN (0, 1)),
  completed_status TEXT NOT NULL,
  UNIQUE (
    source_release_id,
    source_artifact_id,
    native_building_id,
    source_weight,
    resource
  )
);

CREATE TABLE IF NOT EXISTS comstock_paired_resource_deltas (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  baseline_result_id TEXT NOT NULL REFERENCES comstock_building_results(id),
  upgrade_result_id TEXT NOT NULL REFERENCES comstock_building_results(id),
  native_measure_id TEXT NOT NULL,
  resource TEXT NOT NULL,
  delta_per_ft2 REAL NOT NULL,
  unit TEXT NOT NULL,
  UNIQUE (
    source_release_id,
    baseline_result_id,
    upgrade_result_id,
    native_measure_id,
    resource
  )
);

CREATE INDEX IF NOT EXISTS comstock_result_segment_idx
  ON comstock_building_results (
    source_release_id,
    upgrade_id,
    geography,
    building_type,
    floor_area_ft2,
    resource
  );

CREATE INDEX IF NOT EXISTS comstock_delta_measure_idx
  ON comstock_paired_resource_deltas (
    source_release_id,
    native_measure_id,
    resource
  );
