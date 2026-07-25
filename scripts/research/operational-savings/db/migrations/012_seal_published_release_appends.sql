-- A release becomes an immutable publication boundary only by transitioning
-- to PUBLISHED after all of its owned rows have been populated.
CREATE TRIGGER block_direct_published_source_release_insert
BEFORE INSERT ON source_releases
FOR EACH ROW
WHEN
  NEW.status = 'PUBLISHED'
  AND NOT EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.id
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_REQUIRES_FINAL_TRANSITION: source_releases'
  );
END;

CREATE TRIGGER block_published_release_append_source_artifacts
BEFORE INSERT ON source_artifacts
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM source_artifacts WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: source_artifacts'
  );
END;

CREATE TRIGGER block_published_release_append_source_checksums
BEFORE INSERT ON source_checksums
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1
    FROM source_checksums
    WHERE artifact_id = NEW.artifact_id
      AND algorithm = NEW.algorithm
  )
  AND EXISTS (
    SELECT 1
    FROM source_artifacts AS artifact
    JOIN source_releases AS release
      ON release.id = artifact.release_id
    WHERE artifact.id = NEW.artifact_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: source_checksums'
  );
END;

CREATE TRIGGER block_published_release_append_ingestion_runs
BEFORE INSERT ON ingestion_runs
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM ingestion_runs WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: ingestion_runs'
  );
END;

CREATE TRIGGER block_published_release_append_equipment_products
BEFORE INSERT ON equipment_products
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM equipment_products WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: equipment_products'
  );
END;

CREATE TRIGGER block_published_release_append_equipment_certifications
BEFORE INSERT ON equipment_certifications
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM equipment_certifications WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM equipment_products AS product
    JOIN source_releases AS release
      ON release.id = product.source_release_id
    WHERE product.id = NEW.product_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: equipment_certifications'
  );
END;

CREATE TRIGGER block_published_release_append_equipment_performance_fields
BEFORE INSERT ON equipment_performance_fields
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM equipment_performance_fields WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM equipment_products AS product
    JOIN source_releases AS release
      ON release.id = product.source_release_id
    WHERE product.id = NEW.product_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: equipment_performance_fields'
  );
END;

CREATE TRIGGER block_published_release_append_product_taxonomy_crosswalks
BEFORE INSERT ON product_taxonomy_crosswalks
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM product_taxonomy_crosswalks WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: product_taxonomy_crosswalks'
  );
END;

CREATE TRIGGER block_published_release_append_building_upgrade_measures
BEFORE INSERT ON building_upgrade_measures
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM building_upgrade_measures WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: building_upgrade_measures'
  );
END;

CREATE TRIGGER block_published_release_append_building_archetype_benchmarks
BEFORE INSERT ON building_archetype_benchmarks
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM building_archetype_benchmarks WHERE id = NEW.id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM source_releases
      WHERE id = NEW.source_release_id
        AND status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM building_upgrade_measures AS measure
      JOIN source_releases AS release
        ON release.id = measure.source_release_id
      WHERE measure.id = NEW.measure_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: building_archetype_benchmarks'
  );
END;

CREATE TRIGGER block_published_release_append_installed_baseline_benchmarks
BEFORE INSERT ON installed_baseline_benchmarks
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM installed_baseline_benchmarks WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: installed_baseline_benchmarks'
  );
END;

CREATE TRIGGER block_published_release_append_retrofit_measure_crosswalks
BEFORE INSERT ON retrofit_measure_crosswalks
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM retrofit_measure_crosswalks WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: retrofit_measure_crosswalks'
  );
END;

CREATE TRIGGER block_published_release_append_geographic_crosswalks
BEFORE INSERT ON geographic_crosswalks
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM geographic_crosswalks WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: geographic_crosswalks'
  );
END;

CREATE TRIGGER block_published_release_append_climate_crosswalks
BEFORE INSERT ON climate_crosswalks
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM climate_crosswalks WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: climate_crosswalks'
  );
END;

CREATE TRIGGER block_published_release_append_utility_providers
BEFORE INSERT ON utility_providers
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM utility_providers WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: utility_providers'
  );
END;

CREATE TRIGGER block_published_release_append_utility_tariffs
BEFORE INSERT ON utility_tariffs
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM utility_tariffs WHERE id = NEW.id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM source_releases
      WHERE id = NEW.source_release_id
        AND status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM utility_providers AS utility
      JOIN source_releases AS release
        ON release.id = utility.source_release_id
      WHERE utility.id = NEW.utility_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: utility_tariffs'
  );
END;

CREATE TRIGGER block_published_release_append_tariff_periods
BEFORE INSERT ON tariff_periods
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM tariff_periods WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM utility_tariffs AS tariff
    JOIN source_releases AS release
      ON release.id = tariff.source_release_id
    WHERE tariff.id = NEW.tariff_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: tariff_periods'
  );
END;

CREATE TRIGGER block_published_release_append_tariff_energy_charges
BEFORE INSERT ON tariff_energy_charges
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM tariff_energy_charges WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM utility_tariffs AS tariff
    JOIN source_releases AS release
      ON release.id = tariff.source_release_id
    WHERE tariff.id = NEW.tariff_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: tariff_energy_charges'
  );
END;

CREATE TRIGGER block_published_release_append_tariff_demand_charges
BEFORE INSERT ON tariff_demand_charges
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM tariff_demand_charges WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM utility_tariffs AS tariff
    JOIN source_releases AS release
      ON release.id = tariff.source_release_id
    WHERE tariff.id = NEW.tariff_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: tariff_demand_charges'
  );
END;

CREATE TRIGGER block_published_release_append_tariff_export_rules
BEFORE INSERT ON tariff_export_rules
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM tariff_export_rules WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM utility_tariffs AS tariff
    JOIN source_releases AS release
      ON release.id = tariff.source_release_id
    WHERE tariff.id = NEW.tariff_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: tariff_export_rules'
  );
END;

CREATE TRIGGER block_published_release_append_tariff_publication_components
BEFORE INSERT ON tariff_publication_components
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM tariff_publication_components WHERE id = NEW.id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM utility_tariffs AS tariff
      JOIN source_releases AS release
        ON release.id = tariff.source_release_id
      WHERE tariff.id = NEW.tariff_id
        AND release.status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM source_artifacts AS artifact
      JOIN source_releases AS release
        ON release.id = artifact.release_id
      WHERE artifact.id = NEW.source_artifact_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: tariff_publication_components'
  );
END;

CREATE TRIGGER block_published_release_append_tariff_reconciliation_cases
BEFORE INSERT ON tariff_reconciliation_cases
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM tariff_reconciliation_cases WHERE id = NEW.id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM utility_tariffs AS tariff
      JOIN source_releases AS release
        ON release.id = tariff.source_release_id
      WHERE tariff.id = NEW.tariff_id
        AND release.status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM source_artifacts AS artifact
      JOIN source_releases AS release
        ON release.id = artifact.release_id
      WHERE artifact.id = NEW.source_artifact_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: tariff_reconciliation_cases'
  );
END;

CREATE TRIGGER block_published_release_append_benchmark_populations
BEFORE INSERT ON benchmark_populations
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM benchmark_populations WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: benchmark_populations'
  );
END;

CREATE TRIGGER block_published_release_append_benchmark_values
BEFORE INSERT ON benchmark_values
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM benchmark_values WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM benchmark_populations AS population
    JOIN source_releases AS release
      ON release.id = population.source_release_id
    WHERE population.id = NEW.population_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: benchmark_values'
  );
END;

CREATE TRIGGER block_published_release_append_calculation_assumptions
BEFORE INSERT ON calculation_assumptions
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM calculation_assumptions WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: calculation_assumptions'
  );
END;

CREATE TRIGGER block_published_release_append_calculation_runs
BEFORE INSERT ON calculation_runs
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM calculation_runs WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: calculation_runs'
  );
END;

CREATE TRIGGER block_published_release_append_selected_values
BEFORE INSERT ON selected_values
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM selected_values WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM calculation_runs AS calculation
    JOIN source_releases AS release
      ON release.id = calculation.source_release_id
    WHERE calculation.id = NEW.calculation_run_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: selected_values'
  );
END;

CREATE TRIGGER block_published_release_append_selected_value_provenance
BEFORE INSERT ON selected_value_provenance
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1
    FROM selected_value_provenance
    WHERE selected_value_id = NEW.selected_value_id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM selected_values AS selected
      JOIN calculation_runs AS calculation
        ON calculation.id = selected.calculation_run_id
      JOIN source_releases AS release
        ON release.id = calculation.source_release_id
      WHERE selected.id = NEW.selected_value_id
        AND release.status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM source_artifacts AS artifact
      JOIN source_releases AS release
        ON release.id = artifact.release_id
      WHERE artifact.id = NEW.source_artifact_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: selected_value_provenance'
  );
END;

CREATE TRIGGER block_published_release_append_calculation_warnings
BEFORE INSERT ON calculation_warnings
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM calculation_warnings WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM calculation_runs AS calculation
    JOIN source_releases AS release
      ON release.id = calculation.source_release_id
    WHERE calculation.id = NEW.calculation_run_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: calculation_warnings'
  );
END;

CREATE TRIGGER block_published_release_append_fuel_economy_vehicles
BEFORE INSERT ON fuel_economy_vehicles
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM fuel_economy_vehicles WHERE product_id = NEW.product_id
  )
  AND EXISTS (
    SELECT 1
    FROM equipment_products AS product
    JOIN source_releases AS release
      ON release.id = product.source_release_id
    WHERE product.id = NEW.product_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: fuel_economy_vehicles'
  );
END;

CREATE TRIGGER
  block_published_release_append_energy_star_commercial_dishwashers
BEFORE INSERT ON energy_star_commercial_dishwashers
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1
    FROM energy_star_commercial_dishwashers
    WHERE product_id = NEW.product_id
  )
  AND EXISTS (
    SELECT 1
    FROM equipment_products AS product
    JOIN source_releases AS release
      ON release.id = product.source_release_id
    WHERE product.id = NEW.product_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: energy_star_commercial_dishwashers'
  );
END;

CREATE TRIGGER
  block_published_release_append_femp_exterior_lighting_requirements
BEFORE INSERT ON femp_exterior_lighting_requirements
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1
    FROM femp_exterior_lighting_requirements
    WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: femp_exterior_lighting_requirements'
  );
END;

CREATE TRIGGER block_published_release_append_watersense_landscape_climate
BEFORE INSERT ON watersense_landscape_climate
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM watersense_landscape_climate WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: watersense_landscape_climate'
  );
END;

CREATE TRIGGER block_published_release_append_watersense_ci_methods
BEFORE INSERT ON watersense_ci_methods
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM watersense_ci_methods WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: watersense_ci_methods'
  );
END;

CREATE TRIGGER block_published_release_append_chp_catalog_performance
BEFORE INSERT ON chp_catalog_performance
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM chp_catalog_performance WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: chp_catalog_performance'
  );
END;

CREATE TRIGGER block_published_release_append_operating_schedule_references
BEFORE INSERT ON operating_schedule_references
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM operating_schedule_references WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: operating_schedule_references'
  );
END;

CREATE TRIGGER block_published_release_append_comstock_building_results
BEFORE INSERT ON comstock_building_results
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM comstock_building_results WHERE id = NEW.id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM source_releases
      WHERE id = NEW.source_release_id
        AND status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM source_artifacts AS artifact
      JOIN source_releases AS release
        ON release.id = artifact.release_id
      WHERE artifact.id = NEW.source_artifact_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: comstock_building_results'
  );
END;

CREATE TRIGGER block_published_release_append_comstock_paired_resource_deltas
BEFORE INSERT ON comstock_paired_resource_deltas
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM comstock_paired_resource_deltas WHERE id = NEW.id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM source_releases
      WHERE id = NEW.source_release_id
        AND status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM comstock_building_results AS result
      JOIN source_releases AS release
        ON release.id = result.source_release_id
      WHERE result.id IN (
        NEW.baseline_result_id,
        NEW.upgrade_result_id
      )
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: comstock_paired_resource_deltas'
  );
END;

CREATE TRIGGER
  block_published_release_append_energy_star_dishwasher_operating_modes
BEFORE INSERT ON energy_star_dishwasher_operating_modes
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1
    FROM energy_star_dishwasher_operating_modes
    WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM equipment_products AS product
    JOIN source_releases AS release
      ON release.id = product.source_release_id
    WHERE product.id = NEW.product_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: energy_star_dishwasher_operating_modes'
  );
END;

CREATE TRIGGER block_published_release_append_scout_preparation_runs
BEFORE INSERT ON scout_preparation_runs
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM scout_preparation_runs WHERE id = NEW.id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM source_releases
      WHERE id = NEW.source_release_id
        AND status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM source_artifacts AS artifact
      JOIN source_releases AS release
        ON release.id = artifact.release_id
      WHERE artifact.id = NEW.source_artifact_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: scout_preparation_runs'
  );
END;

CREATE TRIGGER block_published_release_append_scout_prepared_ecm_values
BEFORE INSERT ON scout_prepared_ecm_values
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM scout_prepared_ecm_values WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM scout_preparation_runs AS preparation
    JOIN source_releases AS release
      ON release.id = preparation.source_release_id
    WHERE preparation.id = NEW.preparation_run_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: scout_prepared_ecm_values'
  );
END;

CREATE TRIGGER block_published_release_append_scout_prepared_ecm_annual_results
BEFORE INSERT ON scout_prepared_ecm_annual_results
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM scout_prepared_ecm_annual_results WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM scout_preparation_runs AS preparation
    JOIN source_releases AS release
      ON release.id = preparation.source_release_id
    WHERE preparation.id = NEW.preparation_run_id
      AND release.status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: scout_prepared_ecm_annual_results'
  );
END;

CREATE TRIGGER block_published_release_append_reopt_scenario_runs
BEFORE INSERT ON reopt_scenario_runs
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM reopt_scenario_runs WHERE id = NEW.id
  )
  AND (
    EXISTS (
      SELECT 1
      FROM calculation_runs AS calculation
      JOIN source_releases AS release
        ON release.id = calculation.source_release_id
      WHERE calculation.id = NEW.calculation_run_id
        AND release.status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM source_artifacts AS artifact
      JOIN source_releases AS release
        ON release.id = artifact.release_id
      WHERE artifact.id = NEW.source_artifact_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: reopt_scenario_runs'
  );
END;

CREATE TRIGGER block_published_release_append_biomass_chp_performance
BEFORE INSERT ON biomass_chp_performance
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1 FROM biomass_chp_performance WHERE id = NEW.id
  )
  AND EXISTS (
    SELECT 1
    FROM source_releases
    WHERE id = NEW.source_release_id
      AND status = 'PUBLISHED'
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: biomass_chp_performance'
  );
END;

CREATE TRIGGER block_published_release_append_calculation_source_dependencies
BEFORE INSERT ON calculation_source_dependencies
FOR EACH ROW
WHEN
  NOT EXISTS (
    SELECT 1
    FROM calculation_source_dependencies
    WHERE calculation_run_id = NEW.calculation_run_id
      AND dependency_role = NEW.dependency_role
  )
  AND (
    EXISTS (
      SELECT 1
      FROM calculation_runs AS calculation
      JOIN source_releases AS release
        ON release.id = calculation.source_release_id
      WHERE calculation.id = NEW.calculation_run_id
        AND release.status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM calculation_runs AS calculation
      JOIN source_releases AS release
        ON release.id = calculation.source_release_id
      WHERE calculation.id = NEW.input_calculation_run_id
        AND release.status = 'PUBLISHED'
    )
    OR EXISTS (
      SELECT 1
      FROM source_artifacts AS artifact
      JOIN source_releases AS release
        ON release.id = artifact.release_id
      WHERE artifact.id = NEW.source_artifact_id
        AND release.status = 'PUBLISHED'
    )
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'PUBLISHED_RELEASE_APPEND_BLOCKED: calculation_source_dependencies'
  );
END;
