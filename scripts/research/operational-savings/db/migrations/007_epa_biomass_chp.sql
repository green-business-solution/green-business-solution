CREATE TABLE IF NOT EXISTS biomass_chp_performance (
  id TEXT PRIMARY KEY,
  source_release_id TEXT NOT NULL REFERENCES source_releases(id),
  system_name TEXT NOT NULL,
  conversion_technology TEXT NOT NULL,
  commercialization_status TEXT NOT NULL,
  capacity_kw REAL NOT NULL CHECK (capacity_kw > 0),
  thermal_output_mmbtu_per_hour REAL NOT NULL
    CHECK (thermal_output_mmbtu_per_hour >= 0),
  biomass_fuel_input_mmbtu_per_hour REAL NOT NULL
    CHECK (biomass_fuel_input_mmbtu_per_hour > 0),
  electrical_efficiency REAL NOT NULL
    CHECK (electrical_efficiency > 0 AND electrical_efficiency <= 1),
  total_efficiency REAL NOT NULL
    CHECK (total_efficiency > 0 AND total_efficiency <= 1),
  power_to_heat_ratio REAL NOT NULL CHECK (power_to_heat_ratio > 0),
  operating_factor REAL NOT NULL
    CHECK (operating_factor > 0 AND operating_factor <= 1),
  source_table TEXT NOT NULL,
  source_document_page INTEGER NOT NULL CHECK (source_document_page > 0),
  source_pdf_page INTEGER NOT NULL CHECK (source_pdf_page > 0),
  speculative INTEGER NOT NULL CHECK (speculative IN (0, 1)),
  UNIQUE (source_release_id, system_name)
);

CREATE INDEX IF NOT EXISTS biomass_chp_performance_lookup_idx
  ON biomass_chp_performance (
    conversion_technology,
    capacity_kw
  );
