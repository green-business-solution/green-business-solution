CREATE TABLE IF NOT EXISTS energy_star_dishwasher_operating_modes (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES equipment_products(id),
  operating_mode TEXT NOT NULL CHECK (
    operating_mode IN ('LOW_TEMPERATURE', 'HIGH_TEMPERATURE')
  ),
  water_gallons_per_rack REAL CHECK (
    water_gallons_per_rack IS NULL
    OR water_gallons_per_rack > 0
  ),
  washing_kwh_per_rack REAL CHECK (
    washing_kwh_per_rack IS NULL
    OR washing_kwh_per_rack >= 0
  ),
  idle_energy_rate_kw REAL CHECK (
    idle_energy_rate_kw IS NULL
    OR idle_energy_rate_kw >= 0
  ),
  booster_idle_energy_rate_kw REAL CHECK (
    booster_idle_energy_rate_kw IS NULL
    OR booster_idle_energy_rate_kw >= 0
  ),
  racks_per_hour REAL CHECK (
    racks_per_hour IS NULL
    OR racks_per_hour > 0
  ),
  washing_native_field TEXT NOT NULL,
  idle_native_field TEXT NOT NULL,
  booster_native_field TEXT,
  UNIQUE (product_id, operating_mode)
);

CREATE INDEX IF NOT EXISTS
  idx_energy_star_dishwasher_modes_compatibility
ON energy_star_dishwasher_operating_modes (
  operating_mode,
  racks_per_hour,
  water_gallons_per_rack,
  washing_kwh_per_rack,
  idle_energy_rate_kw
);
