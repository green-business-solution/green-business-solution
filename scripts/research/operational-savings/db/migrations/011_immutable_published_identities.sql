CREATE TRIGGER immutable_source_registry_update
BEFORE UPDATE ON source_registry
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.standard_id,
  OLD.organization,
  OLD.name,
  OLD.primary_url,
  OLD.license,
  OLD.attribution,
  OLD.access_mode
) IS NOT (
  NEW.id,
  NEW.standard_id,
  NEW.organization,
  NEW.name,
  NEW.primary_url,
  NEW.license,
  NEW.attribution,
  NEW.access_mode
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: source_registry');
END;

CREATE TRIGGER immutable_benchmark_populations_update
BEFORE UPDATE ON benchmark_populations
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.standard_id,
  OLD.process_key,
  OLD.filters_json,
  OLD.population_size,
  OLD.weighting_field,
  OLD.selection_rule
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.standard_id,
  NEW.process_key,
  NEW.filters_json,
  NEW.population_size,
  NEW.weighting_field,
  NEW.selection_rule
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: benchmark_populations'
  );
END;

CREATE TRIGGER immutable_benchmark_values_update
BEFORE UPDATE ON benchmark_values
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.population_id,
  OLD.field_key,
  OLD.value,
  OLD.unit,
  OLD.sample_size
) IS NOT (
  NEW.id,
  NEW.population_id,
  NEW.field_key,
  NEW.value,
  NEW.unit,
  NEW.sample_size
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: benchmark_values'
  );
END;

CREATE TRIGGER immutable_biomass_chp_performance_update
BEFORE UPDATE ON biomass_chp_performance
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.system_name,
  OLD.conversion_technology,
  OLD.commercialization_status,
  OLD.capacity_kw,
  OLD.thermal_output_mmbtu_per_hour,
  OLD.biomass_fuel_input_mmbtu_per_hour,
  OLD.electrical_efficiency,
  OLD.total_efficiency,
  OLD.power_to_heat_ratio,
  OLD.operating_factor,
  OLD.source_table,
  OLD.source_document_page,
  OLD.source_pdf_page,
  OLD.speculative
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.system_name,
  NEW.conversion_technology,
  NEW.commercialization_status,
  NEW.capacity_kw,
  NEW.thermal_output_mmbtu_per_hour,
  NEW.biomass_fuel_input_mmbtu_per_hour,
  NEW.electrical_efficiency,
  NEW.total_efficiency,
  NEW.power_to_heat_ratio,
  NEW.operating_factor,
  NEW.source_table,
  NEW.source_document_page,
  NEW.source_pdf_page,
  NEW.speculative
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: biomass_chp_performance'
  );
END;

CREATE TRIGGER immutable_building_archetype_benchmarks_update
BEFORE UPDATE ON building_archetype_benchmarks
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.measure_id,
  OLD.geography,
  OLD.building_type,
  OLD.area_min_ft2,
  OLD.area_max_ft2,
  OLD.resource,
  OLD.delta_per_ft2,
  OLD.unit,
  OLD.source_weight,
  OLD.population_size
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.measure_id,
  NEW.geography,
  NEW.building_type,
  NEW.area_min_ft2,
  NEW.area_max_ft2,
  NEW.resource,
  NEW.delta_per_ft2,
  NEW.unit,
  NEW.source_weight,
  NEW.population_size
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: building_archetype_benchmarks'
  );
END;

CREATE TRIGGER immutable_building_upgrade_measures_update
BEFORE UPDATE ON building_upgrade_measures
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.native_measure_id,
  OLD.name,
  OLD.method
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.native_measure_id,
  NEW.name,
  NEW.method
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: building_upgrade_measures'
  );
END;

CREATE TRIGGER immutable_chp_catalog_performance_update
BEFORE UPDATE ON chp_catalog_performance
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.technology,
  OLD.size_class,
  OLD.electrical_efficiency,
  OLD.total_efficiency,
  OLD.power_to_heat_ratio,
  OLD.fuel_input_mmbtu_per_hour,
  OLD.unit_basis,
  OLD.source_page
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.technology,
  NEW.size_class,
  NEW.electrical_efficiency,
  NEW.total_efficiency,
  NEW.power_to_heat_ratio,
  NEW.fuel_input_mmbtu_per_hour,
  NEW.unit_basis,
  NEW.source_page
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: chp_catalog_performance'
  );
END;

CREATE TRIGGER immutable_comstock_building_results_update
BEFORE UPDATE ON comstock_building_results
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.source_artifact_id,
  OLD.native_building_id,
  OLD.source_weight,
  OLD.upgrade_id,
  OLD.geography,
  OLD.building_type,
  OLD.floor_area_ft2,
  OLD.resource,
  OLD.annual_resource_value,
  OLD.unit,
  OLD.applicability,
  OLD.completed_status
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.source_artifact_id,
  NEW.native_building_id,
  NEW.source_weight,
  NEW.upgrade_id,
  NEW.geography,
  NEW.building_type,
  NEW.floor_area_ft2,
  NEW.resource,
  NEW.annual_resource_value,
  NEW.unit,
  NEW.applicability,
  NEW.completed_status
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: comstock_building_results'
  );
END;

CREATE TRIGGER
  immutable_comstock_paired_resource_deltas_update
BEFORE UPDATE ON comstock_paired_resource_deltas
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.baseline_result_id,
  OLD.upgrade_result_id,
  OLD.native_measure_id,
  OLD.resource,
  OLD.delta_per_ft2,
  OLD.unit
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.baseline_result_id,
  NEW.upgrade_result_id,
  NEW.native_measure_id,
  NEW.resource,
  NEW.delta_per_ft2,
  NEW.unit
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: comstock_paired_resource_deltas'
  );
END;

CREATE TRIGGER
  immutable_femp_exterior_lighting_requirements_update
BEFORE UPDATE ON femp_exterior_lighting_requirements
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.application,
  OLD.required_efficacy_lm_per_w,
  OLD.lumen_min,
  OLD.lumen_max,
  OLD.example_power_w,
  OLD.native_row_text
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.application,
  NEW.required_efficacy_lm_per_w,
  NEW.lumen_min,
  NEW.lumen_max,
  NEW.example_power_w,
  NEW.native_row_text
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: femp_exterior_lighting_requirements'
  );
END;

CREATE TRIGGER immutable_fuel_economy_vehicles_update
BEFORE UPDATE ON fuel_economy_vehicles
FOR EACH ROW
WHEN (
  OLD.product_id,
  OLD.model_year,
  OLD.vehicle_class,
  OLD.drive,
  OLD.fuel_type,
  OLD.comb08_mpg,
  OLD.comb_e_kwh_per_100_miles,
  OLD.modified_on
) IS NOT (
  NEW.product_id,
  NEW.model_year,
  NEW.vehicle_class,
  NEW.drive,
  NEW.fuel_type,
  NEW.comb08_mpg,
  NEW.comb_e_kwh_per_100_miles,
  NEW.modified_on
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: fuel_economy_vehicles'
  );
END;

CREATE TRIGGER immutable_retrofit_measure_crosswalks_update
BEFORE UPDATE ON retrofit_measure_crosswalks
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.retrofit_id,
  OLD.native_measure_id,
  OLD.review_status
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.retrofit_id,
  NEW.native_measure_id,
  NEW.review_status
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: retrofit_measure_crosswalks'
  );
END;

CREATE TRIGGER
  immutable_scout_prepared_ecm_annual_results_update
BEFORE UPDATE ON scout_prepared_ecm_annual_results
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.preparation_run_id,
  OLD.native_measure_name,
  OLD.adoption_scenario,
  OLD.model_year,
  OLD.baseline_energy_mmbtu,
  OLD.efficient_energy_mmbtu,
  OLD.aggregate_reduction_fraction
) IS NOT (
  NEW.id,
  NEW.preparation_run_id,
  NEW.native_measure_name,
  NEW.adoption_scenario,
  NEW.model_year,
  NEW.baseline_energy_mmbtu,
  NEW.efficient_energy_mmbtu,
  NEW.aggregate_reduction_fraction
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: scout_prepared_ecm_annual_results'
  );
END;

CREATE TRIGGER immutable_scout_prepared_ecm_values_update
BEFORE UPDATE ON scout_prepared_ecm_values
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.preparation_run_id,
  OLD.native_measure_name,
  OLD.building_type,
  OLD.climate_zones_json,
  OLD.structure_types_json,
  OLD.end_use,
  OLD.fuel_type,
  OLD.reduction_fraction,
  OLD.native_unit,
  OLD.installed_cost,
  OLD.installed_cost_unit,
  OLD.product_lifetime,
  OLD.product_lifetime_unit
) IS NOT (
  NEW.id,
  NEW.preparation_run_id,
  NEW.native_measure_name,
  NEW.building_type,
  NEW.climate_zones_json,
  NEW.structure_types_json,
  NEW.end_use,
  NEW.fuel_type,
  NEW.reduction_fraction,
  NEW.native_unit,
  NEW.installed_cost,
  NEW.installed_cost_unit,
  NEW.product_lifetime,
  NEW.product_lifetime_unit
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: scout_prepared_ecm_values'
  );
END;

CREATE TRIGGER immutable_schema_versions_update
BEFORE UPDATE ON schema_versions
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_id,
  OLD.fingerprint_sha256,
  OLD.schema_kind,
  OLD.schema_json,
  OLD.inspected_at
) IS NOT (
  NEW.id,
  NEW.source_id,
  NEW.fingerprint_sha256,
  NEW.schema_kind,
  NEW.schema_json,
  NEW.inspected_at
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: schema_versions');
END;

CREATE TRIGGER immutable_source_release_identity_update
BEFORE UPDATE ON source_releases
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_id,
  OLD.version,
  OLD.published_at,
  OLD.acquired_at,
  OLD.schema_version_id
) IS NOT (
  NEW.id,
  NEW.source_id,
  NEW.version,
  NEW.published_at,
  NEW.acquired_at,
  NEW.schema_version_id
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: source_releases');
END;

-- Release status is lifecycle state, while the release identity is immutable.
CREATE TRIGGER valid_source_release_status_update
BEFORE UPDATE OF status ON source_releases
FOR EACH ROW
WHEN
  OLD.status IS NOT NEW.status
  AND NOT (
    (OLD.status = 'INSPECTED'
      AND NEW.status IN ('NORMALIZED', 'PUBLISHED'))
    OR
    (OLD.status = 'NORMALIZED' AND NEW.status = 'PUBLISHED')
  )
BEGIN
  SELECT RAISE(
    ABORT,
    'INVALID_RELEASE_STATUS_TRANSITION'
  );
END;

CREATE TRIGGER immutable_source_artifacts_update
BEFORE UPDATE ON source_artifacts
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.release_id,
  OLD.source_url,
  OLD.local_name,
  OLD.media_type,
  OLD.byte_size,
  OLD.sha256,
  OLD.acquired_at,
  OLD.official
) IS NOT (
  NEW.id,
  NEW.release_id,
  NEW.source_url,
  NEW.local_name,
  NEW.media_type,
  NEW.byte_size,
  NEW.sha256,
  NEW.acquired_at,
  NEW.official
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: source_artifacts');
END;

CREATE TRIGGER immutable_source_checksums_update
BEFORE UPDATE ON source_checksums
FOR EACH ROW
WHEN (
  OLD.artifact_id,
  OLD.algorithm,
  OLD.digest,
  OLD.observed_at
) IS NOT (
  NEW.artifact_id,
  NEW.algorithm,
  NEW.digest,
  NEW.observed_at
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: source_checksums');
END;

-- Completion, counts, warnings, and errors are ingestion lifecycle progress.
CREATE TRIGGER immutable_ingestion_run_identity_update
BEFORE UPDATE ON ingestion_runs
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_id,
  OLD.release_id,
  OLD.adapter_version,
  OLD.started_at,
  OLD.network_disabled
) IS NOT (
  NEW.id,
  NEW.source_id,
  NEW.release_id,
  NEW.adapter_version,
  NEW.started_at,
  NEW.network_disabled
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: ingestion_runs');
END;

-- A verified model executable digest may be filled once after source inspection.
CREATE TRIGGER immutable_model_versions_update
BEFORE UPDATE ON model_versions
FOR EACH ROW
WHEN
  (
    OLD.id,
    OLD.standard_id,
    OLD.package_name,
    OLD.version,
    OLD.commit_sha
  ) IS NOT (
    NEW.id,
    NEW.standard_id,
    NEW.package_name,
    NEW.version,
    NEW.commit_sha
  )
  OR (
    OLD.executable_sha256 IS NOT NEW.executable_sha256
    AND NOT (
      OLD.executable_sha256 IS NULL
      AND NEW.executable_sha256 IS NOT NULL
      AND length(NEW.executable_sha256) = 64
    )
  )
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: model_versions');
END;

CREATE TRIGGER immutable_model_input_schemas_update
BEFORE UPDATE ON model_input_schemas
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.model_version_id,
  OLD.module_name,
  OLD.fingerprint_sha256,
  OLD.schema_json
) IS NOT (
  NEW.id,
  NEW.model_version_id,
  NEW.module_name,
  NEW.fingerprint_sha256,
  NEW.schema_json
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: model_input_schemas');
END;

CREATE TRIGGER immutable_calculation_assumptions_update
BEFORE UPDATE ON calculation_assumptions
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.standard_id,
  OLD.assumption_key,
  OLD.value_json,
  OLD.unit,
  OLD.source_release_id
) IS NOT (
  NEW.id,
  NEW.standard_id,
  NEW.assumption_key,
  NEW.value_json,
  NEW.unit,
  NEW.source_release_id
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: calculation_assumptions');
END;

CREATE TRIGGER immutable_calculation_runs_update
BEFORE UPDATE ON calculation_runs
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.standard_id,
  OLD.process_key,
  OLD.source_release_id,
  OLD.model_version_id,
  OLD.adapter_version,
  OLD.input_sha256,
  OLD.output_sha256,
  OLD.network_disabled,
  OLD.status,
  OLD.created_at
) IS NOT (
  NEW.id,
  NEW.standard_id,
  NEW.process_key,
  NEW.source_release_id,
  NEW.model_version_id,
  NEW.adapter_version,
  NEW.input_sha256,
  NEW.output_sha256,
  NEW.network_disabled,
  NEW.status,
  NEW.created_at
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: calculation_runs');
END;

CREATE TRIGGER immutable_selected_values_update
BEFORE UPDATE ON selected_values
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.calculation_run_id,
  OLD.formula_term,
  OLD.value,
  OLD.value_json,
  OLD.unit,
  OLD.scope,
  OLD.selection_rule
) IS NOT (
  NEW.id,
  NEW.calculation_run_id,
  NEW.formula_term,
  NEW.value,
  NEW.value_json,
  NEW.unit,
  NEW.scope,
  NEW.selection_rule
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: selected_values');
END;

CREATE TRIGGER immutable_selected_value_provenance_update
BEFORE UPDATE ON selected_value_provenance
FOR EACH ROW
WHEN (
  OLD.selected_value_id,
  OLD.source_artifact_id,
  OLD.source_fields_json,
  OLD.filters_json,
  OLD.transformation,
  OLD.adapter_path
) IS NOT (
  NEW.selected_value_id,
  NEW.source_artifact_id,
  NEW.source_fields_json,
  NEW.filters_json,
  NEW.transformation,
  NEW.adapter_path
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: selected_value_provenance'
  );
END;

CREATE TRIGGER immutable_calculation_warnings_update
BEFORE UPDATE ON calculation_warnings
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.calculation_run_id,
  OLD.code,
  OLD.message,
  OLD.severity
) IS NOT (
  NEW.id,
  NEW.calculation_run_id,
  NEW.code,
  NEW.message,
  NEW.severity
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: calculation_warnings');
END;

CREATE TRIGGER immutable_calculation_source_dependencies_update
BEFORE UPDATE ON calculation_source_dependencies
FOR EACH ROW
WHEN (
  OLD.calculation_run_id,
  OLD.dependency_role,
  OLD.input_calculation_run_id,
  OLD.source_artifact_id,
  OLD.source_fields_json,
  OLD.transformation
) IS NOT (
  NEW.calculation_run_id,
  NEW.dependency_role,
  NEW.input_calculation_run_id,
  NEW.source_artifact_id,
  NEW.source_fields_json,
  NEW.transformation
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: calculation_source_dependencies'
  );
END;

CREATE TRIGGER immutable_reopt_scenario_runs_update
BEFORE UPDATE ON reopt_scenario_runs
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.calculation_run_id,
  OLD.source_artifact_id,
  OLD.scenario_role,
  OLD.source_input_path,
  OLD.evidence_path,
  OLD.evidence_sha256,
  OLD.evidence_output_sha256,
  OLD.expanded_input_sha256,
  OLD.termination_status,
  OLD.solver_seconds,
  OLD.network_enforcement,
  OLD.julia_version,
  OLD.highs_version,
  OLD.highs_jll_version,
  OLD.annual_load_kwh,
  OLD.year_one_energy_cost_before_tax_usd,
  OLD.year_one_demand_cost_before_tax_usd,
  OLD.year_one_bill_before_tax_usd,
  OLD.storage_power_kw,
  OLD.storage_energy_kwh,
  OLD.storage_discharge_kwh,
  OLD.storage_soc_series_sha256,
  OLD.storage_discharge_series_sha256
) IS NOT (
  NEW.id,
  NEW.calculation_run_id,
  NEW.source_artifact_id,
  NEW.scenario_role,
  NEW.source_input_path,
  NEW.evidence_path,
  NEW.evidence_sha256,
  NEW.evidence_output_sha256,
  NEW.expanded_input_sha256,
  NEW.termination_status,
  NEW.solver_seconds,
  NEW.network_enforcement,
  NEW.julia_version,
  NEW.highs_version,
  NEW.highs_jll_version,
  NEW.annual_load_kwh,
  NEW.year_one_energy_cost_before_tax_usd,
  NEW.year_one_demand_cost_before_tax_usd,
  NEW.year_one_bill_before_tax_usd,
  NEW.storage_power_kw,
  NEW.storage_energy_kwh,
  NEW.storage_discharge_kwh,
  NEW.storage_soc_series_sha256,
  NEW.storage_discharge_series_sha256
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: reopt_scenario_runs');
END;

CREATE TRIGGER immutable_scout_preparation_runs_update
BEFORE UPDATE ON scout_preparation_runs
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.source_artifact_id,
  OLD.model_version_id,
  OLD.commit_sha,
  OLD.entry_point,
  OLD.arguments_json,
  OLD.runtime_json,
  OLD.network_mode,
  OLD.output_byte_size,
  OLD.output_sha256,
  OLD.independent_replay_count,
  OLD.replay_output_sha256
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.source_artifact_id,
  NEW.model_version_id,
  NEW.commit_sha,
  NEW.entry_point,
  NEW.arguments_json,
  NEW.runtime_json,
  NEW.network_mode,
  NEW.output_byte_size,
  NEW.output_sha256,
  NEW.independent_replay_count,
  NEW.replay_output_sha256
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: scout_preparation_runs');
END;

CREATE TRIGGER immutable_equipment_products_update
BEFORE UPDATE ON equipment_products
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.native_id,
  OLD.manufacturer,
  OLD.brand,
  OLD.model,
  OLD.normalized_model,
  OLD.product_family,
  OLD.source_status,
  OLD.active,
  OLD.modified_at
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.native_id,
  NEW.manufacturer,
  NEW.brand,
  NEW.model,
  NEW.normalized_model,
  NEW.product_family,
  NEW.source_status,
  NEW.active,
  NEW.modified_at
)
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_UPDATE: equipment_products');
END;

CREATE TRIGGER immutable_equipment_certifications_update
BEFORE UPDATE ON equipment_certifications
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.product_id,
  OLD.specification,
  OLD.test_procedure,
  OLD.effective_from,
  OLD.effective_to,
  OLD.active
) IS NOT (
  NEW.id,
  NEW.product_id,
  NEW.specification,
  NEW.test_procedure,
  NEW.effective_from,
  NEW.effective_to,
  NEW.active
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: equipment_certifications'
  );
END;

CREATE TRIGGER immutable_equipment_performance_fields_update
BEFORE UPDATE ON equipment_performance_fields
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.product_id,
  OLD.field_key,
  OLD.numeric_value,
  OLD.text_value,
  OLD.unit,
  OLD.native_field
) IS NOT (
  NEW.id,
  NEW.product_id,
  NEW.field_key,
  NEW.numeric_value,
  NEW.text_value,
  NEW.unit,
  NEW.native_field
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: equipment_performance_fields'
  );
END;

CREATE TRIGGER
  immutable_energy_star_commercial_dishwashers_update
BEFORE UPDATE ON energy_star_commercial_dishwashers
FOR EACH ROW
WHEN (
  OLD.product_id,
  OLD.machine_type,
  OLD.sanitation_method,
  OLD.water_gallons_per_rack,
  OLD.washing_kwh_per_rack,
  OLD.idle_energy_rate_kw,
  OLD.date_qualified
) IS NOT (
  NEW.product_id,
  NEW.machine_type,
  NEW.sanitation_method,
  NEW.water_gallons_per_rack,
  NEW.washing_kwh_per_rack,
  NEW.idle_energy_rate_kw,
  NEW.date_qualified
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: energy_star_commercial_dishwashers'
  );
END;

CREATE TRIGGER
  immutable_energy_star_dishwasher_operating_modes_update
BEFORE UPDATE ON energy_star_dishwasher_operating_modes
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.product_id,
  OLD.operating_mode,
  OLD.water_gallons_per_rack,
  OLD.washing_kwh_per_rack,
  OLD.idle_energy_rate_kw,
  OLD.booster_idle_energy_rate_kw,
  OLD.racks_per_hour,
  OLD.washing_native_field,
  OLD.idle_native_field,
  OLD.booster_native_field
) IS NOT (
  NEW.id,
  NEW.product_id,
  NEW.operating_mode,
  NEW.water_gallons_per_rack,
  NEW.washing_kwh_per_rack,
  NEW.idle_energy_rate_kw,
  NEW.booster_idle_energy_rate_kw,
  NEW.racks_per_hour,
  NEW.washing_native_field,
  NEW.idle_native_field,
  NEW.booster_native_field
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: energy_star_dishwasher_operating_modes'
  );
END;

CREATE TRIGGER immutable_operating_schedule_references_update
BEFORE UPDATE ON operating_schedule_references
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.reference_kind,
  OLD.location,
  OLD.local_date,
  OLD.event_name,
  OLD.local_time,
  OLD.native_text
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.reference_kind,
  NEW.location,
  NEW.local_date,
  NEW.event_name,
  NEW.local_time,
  NEW.native_text
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: operating_schedule_references'
  );
END;

CREATE TRIGGER immutable_tariff_demand_charges_update
BEFORE UPDATE ON tariff_demand_charges
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.tariff_id,
  OLD.charge_kind,
  OLD.period_index,
  OLD.tier_index,
  OLD.rate,
  OLD.unit,
  OLD.max_demand,
  OLD.adjustment
) IS NOT (
  NEW.id,
  NEW.tariff_id,
  NEW.charge_kind,
  NEW.period_index,
  NEW.tier_index,
  NEW.rate,
  NEW.unit,
  NEW.max_demand,
  NEW.adjustment
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: tariff_demand_charges'
  );
END;

CREATE TRIGGER immutable_tariff_energy_charges_update
BEFORE UPDATE ON tariff_energy_charges
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.tariff_id,
  OLD.period_index,
  OLD.tier_index,
  OLD.rate,
  OLD.unit,
  OLD.max_usage,
  OLD.adjustment,
  OLD.all_in_rate,
  OLD.all_in_rate_source,
  OLD.sell_rate
) IS NOT (
  NEW.id,
  NEW.tariff_id,
  NEW.period_index,
  NEW.tier_index,
  NEW.rate,
  NEW.unit,
  NEW.max_usage,
  NEW.adjustment,
  NEW.all_in_rate,
  NEW.all_in_rate_source,
  NEW.sell_rate
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: tariff_energy_charges'
  );
END;

CREATE TRIGGER immutable_tariff_export_rules_update
BEFORE UPDATE ON tariff_export_rules
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.tariff_id,
  OLD.sell_rate,
  OLD.sell_unit,
  OLD.net_metering,
  OLD.native_json
) IS NOT (
  NEW.id,
  NEW.tariff_id,
  NEW.sell_rate,
  NEW.sell_unit,
  NEW.net_metering,
  NEW.native_json
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: tariff_export_rules'
  );
END;

CREATE TRIGGER immutable_tariff_periods_update
BEFORE UPDATE ON tariff_periods
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.tariff_id,
  OLD.period_kind,
  OLD.period_index,
  OLD.period_name,
  OLD.season_months_json,
  OLD.weekday_schedule_json,
  OLD.weekend_schedule_json
) IS NOT (
  NEW.id,
  NEW.tariff_id,
  NEW.period_kind,
  NEW.period_index,
  NEW.period_name,
  NEW.season_months_json,
  NEW.weekday_schedule_json,
  NEW.weekend_schedule_json
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: tariff_periods'
  );
END;

CREATE TRIGGER
  immutable_tariff_publication_components_update
BEFORE UPDATE ON tariff_publication_components
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.tariff_id,
  OLD.source_artifact_id,
  OLD.season,
  OLD.period_name,
  OLD.voltage_category,
  OLD.component_name,
  OLD.rate,
  OLD.unit,
  OLD.effective_date,
  OLD.source_page,
  OLD.native_label
) IS NOT (
  NEW.id,
  NEW.tariff_id,
  NEW.source_artifact_id,
  NEW.season,
  NEW.period_name,
  NEW.voltage_category,
  NEW.component_name,
  NEW.rate,
  NEW.unit,
  NEW.effective_date,
  NEW.source_page,
  NEW.native_label
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: tariff_publication_components'
  );
END;

CREATE TRIGGER immutable_tariff_reconciliation_cases_update
BEFORE UPDATE ON tariff_reconciliation_cases
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.tariff_id,
  OLD.source_artifact_id,
  OLD.usage_kwh,
  OLD.demand_kw,
  OLD.average_rate_per_kwh,
  OLD.expected_bill,
  OLD.calculated_bill,
  OLD.tolerance,
  OLD.status,
  OLD.source_page
) IS NOT (
  NEW.id,
  NEW.tariff_id,
  NEW.source_artifact_id,
  NEW.usage_kwh,
  NEW.demand_kw,
  NEW.average_rate_per_kwh,
  NEW.expected_bill,
  NEW.calculated_bill,
  NEW.tolerance,
  NEW.status,
  NEW.source_page
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: tariff_reconciliation_cases'
  );
END;

CREATE TRIGGER immutable_utility_providers_update
BEFORE UPDATE ON utility_providers
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.native_utility_id,
  OLD.name,
  OLD.state,
  OLD.eia_id
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.native_utility_id,
  NEW.name,
  NEW.state,
  NEW.eia_id
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: utility_providers'
  );
END;

CREATE TRIGGER immutable_utility_tariffs_update
BEFORE UPDATE ON utility_tariffs
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.native_rate_id,
  OLD.utility_id,
  OLD.label,
  OLD.sector,
  OLD.description,
  OLD.service_type,
  OLD.voltage_category,
  OLD.peak_kw_min,
  OLD.peak_kw_max,
  OLD.fixed_charge,
  OLD.fixed_charge_unit,
  OLD.minimum_charge,
  OLD.minimum_charge_unit,
  OLD.start_date,
  OLD.end_date,
  OLD.approved,
  OLD.source_url,
  OLD.source_parent_url,
  OLD.supersedes_native_rate_id,
  OLD.latest_update,
  OLD.eligibility_json
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.native_rate_id,
  NEW.utility_id,
  NEW.label,
  NEW.sector,
  NEW.description,
  NEW.service_type,
  NEW.voltage_category,
  NEW.peak_kw_min,
  NEW.peak_kw_max,
  NEW.fixed_charge,
  NEW.fixed_charge_unit,
  NEW.minimum_charge,
  NEW.minimum_charge_unit,
  NEW.start_date,
  NEW.end_date,
  NEW.approved,
  NEW.source_url,
  NEW.source_parent_url,
  NEW.supersedes_native_rate_id,
  NEW.latest_update,
  NEW.eligibility_json
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: utility_tariffs'
  );
END;

CREATE TRIGGER immutable_watersense_ci_methods_update
BEFORE UPDATE ON watersense_ci_methods
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.sheet_name,
  OLD.method_name,
  OLD.native_cell,
  OLD.formula_text,
  OLD.unit
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.sheet_name,
  NEW.method_name,
  NEW.native_cell,
  NEW.formula_text,
  NEW.unit
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: watersense_ci_methods'
  );
END;

CREATE TRIGGER immutable_watersense_landscape_climate_update
BEFORE UPDATE ON watersense_landscape_climate
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.postal_code,
  OLD.city,
  OLD.state,
  OLD.annual_eto_in,
  OLD.annual_rainfall_in,
  OLD.monthly_json,
  OLD.native_sheet,
  OLD.native_row
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.postal_code,
  NEW.city,
  NEW.state,
  NEW.annual_eto_in,
  NEW.annual_rainfall_in,
  NEW.monthly_json,
  NEW.native_sheet,
  NEW.native_row
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: watersense_landscape_climate'
  );
END;

CREATE TRIGGER immutable_installed_baseline_benchmarks_update
BEFORE UPDATE ON installed_baseline_benchmarks
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.equipment_class,
  OLD.context_json,
  OLD.value,
  OLD.unit
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.equipment_class,
  NEW.context_json,
  NEW.value,
  NEW.unit
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: installed_baseline_benchmarks'
  );
END;

CREATE TRIGGER immutable_product_taxonomy_crosswalks_update
BEFORE UPDATE ON product_taxonomy_crosswalks
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.source_family,
  OLD.source_class,
  OLD.retrofi_class,
  OLD.review_status
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.source_family,
  NEW.source_class,
  NEW.retrofi_class,
  NEW.review_status
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: product_taxonomy_crosswalks'
  );
END;

CREATE TRIGGER immutable_geographic_crosswalks_update
BEFORE UPDATE ON geographic_crosswalks
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.source_geography,
  OLD.normalized_geography
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.source_geography,
  NEW.normalized_geography
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: geographic_crosswalks'
  );
END;

CREATE TRIGGER immutable_climate_crosswalks_update
BEFORE UPDATE ON climate_crosswalks
FOR EACH ROW
WHEN (
  OLD.id,
  OLD.source_release_id,
  OLD.postal_code,
  OLD.city,
  OLD.state,
  OLD.climate_zone,
  OLD.station_id
) IS NOT (
  NEW.id,
  NEW.source_release_id,
  NEW.postal_code,
  NEW.city,
  NEW.state,
  NEW.climate_zone,
  NEW.station_id
)
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_UPDATE: climate_crosswalks'
  );
END;

CREATE TRIGGER immutable_source_registry_delete
BEFORE DELETE ON source_registry
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: source_registry');
END;

CREATE TRIGGER immutable_schema_versions_delete
BEFORE DELETE ON schema_versions
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: schema_versions');
END;

CREATE TRIGGER immutable_source_releases_delete
BEFORE DELETE ON source_releases
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: source_releases');
END;

CREATE TRIGGER immutable_source_artifacts_delete
BEFORE DELETE ON source_artifacts
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: source_artifacts');
END;

CREATE TRIGGER immutable_source_checksums_delete
BEFORE DELETE ON source_checksums
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: source_checksums');
END;

CREATE TRIGGER immutable_ingestion_runs_delete
BEFORE DELETE ON ingestion_runs
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: ingestion_runs');
END;

CREATE TRIGGER immutable_model_versions_delete
BEFORE DELETE ON model_versions
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: model_versions');
END;

CREATE TRIGGER immutable_model_input_schemas_delete
BEFORE DELETE ON model_input_schemas
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: model_input_schemas');
END;

CREATE TRIGGER immutable_calculation_assumptions_delete
BEFORE DELETE ON calculation_assumptions
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: calculation_assumptions'
  );
END;

CREATE TRIGGER immutable_calculation_runs_delete
BEFORE DELETE ON calculation_runs
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: calculation_runs');
END;

CREATE TRIGGER immutable_selected_values_delete
BEFORE DELETE ON selected_values
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: selected_values');
END;

CREATE TRIGGER immutable_selected_value_provenance_delete
BEFORE DELETE ON selected_value_provenance
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: selected_value_provenance'
  );
END;

CREATE TRIGGER immutable_calculation_warnings_delete
BEFORE DELETE ON calculation_warnings
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: calculation_warnings'
  );
END;

CREATE TRIGGER immutable_calculation_source_dependencies_delete
BEFORE DELETE ON calculation_source_dependencies
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: calculation_source_dependencies'
  );
END;

CREATE TRIGGER immutable_reopt_scenario_runs_delete
BEFORE DELETE ON reopt_scenario_runs
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: reopt_scenario_runs'
  );
END;

CREATE TRIGGER immutable_scout_preparation_runs_delete
BEFORE DELETE ON scout_preparation_runs
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: scout_preparation_runs'
  );
END;

CREATE TRIGGER immutable_benchmark_populations_delete
BEFORE DELETE ON benchmark_populations
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: benchmark_populations');
END;

CREATE TRIGGER immutable_benchmark_values_delete
BEFORE DELETE ON benchmark_values
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: benchmark_values');
END;

CREATE TRIGGER immutable_biomass_chp_performance_delete
BEFORE DELETE ON biomass_chp_performance
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: biomass_chp_performance');
END;

CREATE TRIGGER immutable_building_archetype_benchmarks_delete
BEFORE DELETE ON building_archetype_benchmarks
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: building_archetype_benchmarks'
  );
END;

CREATE TRIGGER immutable_building_upgrade_measures_delete
BEFORE DELETE ON building_upgrade_measures
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: building_upgrade_measures'
  );
END;

CREATE TRIGGER immutable_chp_catalog_performance_delete
BEFORE DELETE ON chp_catalog_performance
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: chp_catalog_performance');
END;

CREATE TRIGGER immutable_climate_crosswalks_delete
BEFORE DELETE ON climate_crosswalks
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: climate_crosswalks');
END;

CREATE TRIGGER immutable_comstock_building_results_delete
BEFORE DELETE ON comstock_building_results
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: comstock_building_results');
END;

CREATE TRIGGER immutable_comstock_paired_resource_deltas_delete
BEFORE DELETE ON comstock_paired_resource_deltas
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: comstock_paired_resource_deltas'
  );
END;

CREATE TRIGGER immutable_energy_star_commercial_dishwashers_delete
BEFORE DELETE ON energy_star_commercial_dishwashers
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: energy_star_commercial_dishwashers'
  );
END;

CREATE TRIGGER immutable_energy_star_dishwasher_operating_modes_delete
BEFORE DELETE ON energy_star_dishwasher_operating_modes
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: energy_star_dishwasher_operating_modes'
  );
END;

CREATE TRIGGER immutable_equipment_certifications_delete
BEFORE DELETE ON equipment_certifications
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: equipment_certifications'
  );
END;

CREATE TRIGGER immutable_equipment_performance_fields_delete
BEFORE DELETE ON equipment_performance_fields
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: equipment_performance_fields'
  );
END;

CREATE TRIGGER immutable_equipment_products_delete
BEFORE DELETE ON equipment_products
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: equipment_products');
END;

CREATE TRIGGER immutable_femp_exterior_lighting_requirements_delete
BEFORE DELETE ON femp_exterior_lighting_requirements
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: femp_exterior_lighting_requirements'
  );
END;

CREATE TRIGGER immutable_fuel_economy_vehicles_delete
BEFORE DELETE ON fuel_economy_vehicles
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: fuel_economy_vehicles');
END;

CREATE TRIGGER immutable_geographic_crosswalks_delete
BEFORE DELETE ON geographic_crosswalks
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: geographic_crosswalks');
END;

CREATE TRIGGER immutable_installed_baseline_benchmarks_delete
BEFORE DELETE ON installed_baseline_benchmarks
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: installed_baseline_benchmarks'
  );
END;

CREATE TRIGGER immutable_operating_schedule_references_delete
BEFORE DELETE ON operating_schedule_references
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: operating_schedule_references'
  );
END;

CREATE TRIGGER immutable_product_taxonomy_crosswalks_delete
BEFORE DELETE ON product_taxonomy_crosswalks
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: product_taxonomy_crosswalks'
  );
END;

CREATE TRIGGER immutable_retrofit_measure_crosswalks_delete
BEFORE DELETE ON retrofit_measure_crosswalks
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: retrofit_measure_crosswalks'
  );
END;

CREATE TRIGGER immutable_scout_prepared_ecm_annual_results_delete
BEFORE DELETE ON scout_prepared_ecm_annual_results
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: scout_prepared_ecm_annual_results'
  );
END;

CREATE TRIGGER immutable_scout_prepared_ecm_values_delete
BEFORE DELETE ON scout_prepared_ecm_values
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: scout_prepared_ecm_values'
  );
END;

CREATE TRIGGER immutable_tariff_demand_charges_delete
BEFORE DELETE ON tariff_demand_charges
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: tariff_demand_charges');
END;

CREATE TRIGGER immutable_tariff_energy_charges_delete
BEFORE DELETE ON tariff_energy_charges
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: tariff_energy_charges');
END;

CREATE TRIGGER immutable_tariff_export_rules_delete
BEFORE DELETE ON tariff_export_rules
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: tariff_export_rules');
END;

CREATE TRIGGER immutable_tariff_periods_delete
BEFORE DELETE ON tariff_periods
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: tariff_periods');
END;

CREATE TRIGGER immutable_tariff_publication_components_delete
BEFORE DELETE ON tariff_publication_components
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: tariff_publication_components'
  );
END;

CREATE TRIGGER immutable_tariff_reconciliation_cases_delete
BEFORE DELETE ON tariff_reconciliation_cases
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: tariff_reconciliation_cases'
  );
END;

CREATE TRIGGER immutable_utility_providers_delete
BEFORE DELETE ON utility_providers
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: utility_providers');
END;

CREATE TRIGGER immutable_utility_tariffs_delete
BEFORE DELETE ON utility_tariffs
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: utility_tariffs');
END;

CREATE TRIGGER immutable_watersense_ci_methods_delete
BEFORE DELETE ON watersense_ci_methods
FOR EACH ROW
BEGIN
  SELECT RAISE(ABORT, 'IMMUTABLE_ROW_DELETE: watersense_ci_methods');
END;

CREATE TRIGGER immutable_watersense_landscape_climate_delete
BEFORE DELETE ON watersense_landscape_climate
FOR EACH ROW
BEGIN
  SELECT RAISE(
    ABORT,
    'IMMUTABLE_ROW_DELETE: watersense_landscape_climate'
  );
END;
