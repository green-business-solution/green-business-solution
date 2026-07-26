import { createHash } from "node:crypto";
import {
  mkdtemp,
  readFile,
  readdir,
  rm
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { afterEach, expect, test } from "vitest";

import {
  openResearchDatabase
} from "../lib/sqlite.mjs";

const MIGRATIONS_ROOT = new URL("../db/migrations/", import.meta.url);
const MIGRATION_APPLIED_AT = "2026-07-24T00:00:00.000Z";
const IMMUTABILITY_MIGRATION =
  "011_immutable_published_identities.sql";
const PUBLICATION_SEAL_MIGRATION =
  "012_seal_published_release_appends.sql";
const SHA_A = "a".repeat(64);
const SHA_B = "b".repeat(64);
const SHA_C = "c".repeat(64);
const SHA_D = "d".repeat(64);
const SHA_E = "e".repeat(64);
const SHA_F = "f".repeat(64);
const IMMUTABLE_DOMAIN_TABLES = [
  "benchmark_populations",
  "benchmark_values",
  "biomass_chp_performance",
  "building_archetype_benchmarks",
  "building_upgrade_measures",
  "chp_catalog_performance",
  "climate_crosswalks",
  "comstock_building_results",
  "comstock_paired_resource_deltas",
  "energy_star_commercial_dishwashers",
  "energy_star_dishwasher_operating_modes",
  "equipment_certifications",
  "equipment_performance_fields",
  "equipment_products",
  "femp_exterior_lighting_requirements",
  "fuel_economy_vehicles",
  "geographic_crosswalks",
  "installed_baseline_benchmarks",
  "operating_schedule_references",
  "product_taxonomy_crosswalks",
  "retrofit_measure_crosswalks",
  "scout_prepared_ecm_annual_results",
  "scout_prepared_ecm_values",
  "tariff_demand_charges",
  "tariff_energy_charges",
  "tariff_export_rules",
  "tariff_periods",
  "tariff_publication_components",
  "tariff_reconciliation_cases",
  "utility_providers",
  "utility_tariffs",
  "watersense_ci_methods",
  "watersense_landscape_climate"
];
const IMMUTABLE_CORE_DELETE_TABLES = [
  "calculation_assumptions",
  "calculation_runs",
  "calculation_source_dependencies",
  "calculation_warnings",
  "ingestion_runs",
  "model_input_schemas",
  "model_versions",
  "reopt_scenario_runs",
  "schema_versions",
  "scout_preparation_runs",
  "selected_value_provenance",
  "selected_values",
  "source_artifacts",
  "source_checksums",
  "source_registry",
  "source_releases"
];
const PUBLISHED_RELEASE_OWNED_TABLES = [
  "benchmark_populations",
  "benchmark_values",
  "biomass_chp_performance",
  "building_archetype_benchmarks",
  "building_upgrade_measures",
  "calculation_assumptions",
  "calculation_runs",
  "calculation_source_dependencies",
  "calculation_warnings",
  "chp_catalog_performance",
  "climate_crosswalks",
  "comstock_building_results",
  "comstock_paired_resource_deltas",
  "energy_star_commercial_dishwashers",
  "energy_star_dishwasher_operating_modes",
  "equipment_certifications",
  "equipment_performance_fields",
  "equipment_products",
  "femp_exterior_lighting_requirements",
  "fuel_economy_vehicles",
  "geographic_crosswalks",
  "ingestion_runs",
  "installed_baseline_benchmarks",
  "operating_schedule_references",
  "product_taxonomy_crosswalks",
  "reopt_scenario_runs",
  "retrofit_measure_crosswalks",
  "scout_preparation_runs",
  "scout_prepared_ecm_annual_results",
  "scout_prepared_ecm_values",
  "selected_value_provenance",
  "selected_values",
  "source_artifacts",
  "source_checksums",
  "tariff_demand_charges",
  "tariff_energy_charges",
  "tariff_export_rules",
  "tariff_periods",
  "tariff_publication_components",
  "tariff_reconciliation_cases",
  "utility_providers",
  "utility_tariffs",
  "watersense_ci_methods",
  "watersense_landscape_climate"
];
const EXPECTED_TRIGGERS = [
  "block_direct_published_source_release_insert",
  ...PUBLISHED_RELEASE_OWNED_TABLES.map(
    (table) => `block_published_release_append_${table}`
  ),
  "immutable_calculation_assumptions_update",
  "immutable_calculation_runs_update",
  "immutable_calculation_source_dependencies_update",
  "immutable_calculation_warnings_update",
  "immutable_ingestion_run_identity_update",
  "immutable_model_input_schemas_update",
  "immutable_model_versions_update",
  "immutable_reopt_scenario_runs_update",
  "immutable_schema_versions_update",
  "immutable_scout_preparation_runs_update",
  "immutable_selected_value_provenance_update",
  "immutable_selected_values_update",
  "immutable_source_artifacts_update",
  "immutable_source_checksums_update",
  "immutable_source_registry_update",
  "immutable_source_release_identity_update",
  ...IMMUTABLE_DOMAIN_TABLES.map(
    (table) => `immutable_${table}_update`
  ),
  ...[
    ...IMMUTABLE_CORE_DELETE_TABLES,
    ...IMMUTABLE_DOMAIN_TABLES
  ].map((table) => `immutable_${table}_delete`),
  "valid_source_release_status_update"
].sort();
const PROTECTED_TABLES = [
  "benchmark_populations",
  "benchmark_values",
  "calculation_assumptions",
  "calculation_runs",
  "calculation_source_dependencies",
  "calculation_warnings",
  "energy_star_commercial_dishwashers",
  "energy_star_dishwasher_operating_modes",
  "equipment_certifications",
  "equipment_performance_fields",
  "equipment_products",
  "ingestion_runs",
  "model_input_schemas",
  "model_versions",
  "operating_schedule_references",
  "reopt_scenario_runs",
  "schema_versions",
  "scout_preparation_runs",
  "selected_value_provenance",
  "selected_values",
  "source_artifacts",
  "source_checksums",
  "source_registry",
  "source_releases"
];

const temporaryRoots = [];

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((path) =>
      rm(path, { recursive: true, force: true })
    )
  );
});

async function applyPreImmutabilityMigrations(path) {
  const database = new DatabaseSync(path);
  database.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE research_migrations (
      name TEXT PRIMARY KEY,
      sha256 TEXT NOT NULL,
      applied_at TEXT NOT NULL
    );
  `);
  const names = (await readdir(MIGRATIONS_ROOT))
    .filter(
      (name) =>
        name.endsWith(".sql") &&
        name < IMMUTABILITY_MIGRATION
    )
    .sort();
  for (const name of names) {
    const sql = await readFile(
      new URL(name, MIGRATIONS_ROOT),
      "utf8"
    );
    const digest = createHash("sha256")
      .update(sql)
      .digest("hex");
    database.exec("BEGIN IMMEDIATE");
    try {
      database.exec(sql);
      database.prepare(`
        INSERT INTO research_migrations (
          name, sha256, applied_at
        ) VALUES (?, ?, ?)
      `).run(name, digest, MIGRATION_APPLIED_AT);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      database.close();
      throw error;
    }
  }
  seedPublishedRows(database);
  database.close();
}

function seedPublishedRows(database) {
  database.prepare(`
    INSERT INTO source_registry (
      id, standard_id, organization, name, primary_url, license,
      attribution, access_mode
    ) VALUES (
      'source:test', 'STD-TEST', 'Test Organization', 'Test Source',
      'https://example.test/source', 'Test License', 'Test Attribution',
      'PINNED_TEST'
    )
  `).run();
  database.prepare(`
    INSERT INTO schema_versions (
      id, source_id, fingerprint_sha256, schema_kind, schema_json,
      inspected_at
    ) VALUES (
      'schema:test', 'source:test', ?, 'JSON', '{"fields":["value"]}',
      '2026-07-24T00:00:00.000Z'
    )
  `).run(SHA_A);
  database.prepare(`
    INSERT INTO source_releases (
      id, source_id, version, published_at, acquired_at, status,
      schema_version_id
    ) VALUES (
      'release:test', 'source:test', 'v1',
      '2026-07-01T00:00:00.000Z',
      '2026-07-24T00:00:00.000Z', 'INSPECTED', 'schema:test'
    )
  `).run();
  database.prepare(`
    INSERT INTO source_artifacts (
      id, release_id, source_url, local_name, media_type, byte_size,
      sha256, acquired_at, official
    ) VALUES (
      'artifact:test', 'release:test',
      'https://example.test/artifact.json', 'artifact.json',
      'application/json', 12, ?,
      '2026-07-24T00:00:00.000Z', 1
    )
  `).run(SHA_A);
  database.prepare(`
    INSERT INTO source_checksums (
      artifact_id, algorithm, digest, observed_at
    ) VALUES (
      'artifact:test', 'sha256', ?,
      '2026-07-24T00:00:00.000Z'
    )
  `).run(SHA_A);
  database.prepare(`
    INSERT INTO benchmark_populations (
      id, source_release_id, standard_id, process_key, filters_json,
      population_size, weighting_field, selection_rule
    ) VALUES (
      'benchmark:release:test:population', 'release:test',
      'STD-TEST', 'test_benchmark', '{"class":"test"}',
      1, NULL, 'EXACT_TEST_POPULATION'
    )
  `).run();
  database.prepare(`
    INSERT INTO benchmark_values (
      id, population_id, field_key, value, unit, sample_size
    ) VALUES (
      'benchmark:release:test:population:value',
      'benchmark:release:test:population', 'test_value',
      10, 'unit', 1
    )
  `).run();
  database.prepare(`
    INSERT INTO equipment_products (
      id, source_release_id, native_id, manufacturer, brand, model,
      normalized_model, product_family, source_status, active,
      modified_at
    ) VALUES (
      'product:release:test:dishwasher:1', 'release:test', '1',
      'Test Manufacturer', 'Test Brand', 'Model 1',
      'TEST BRAND\u001fMODEL 1', 'commercial dishwasher',
      'PRESENT_IN_TEST_RELEASE', 1,
      '2026-07-24T00:00:00.000Z'
    )
  `).run();
  database.prepare(`
    INSERT INTO equipment_certifications (
      id, product_id, specification, test_procedure, effective_from,
      effective_to, active
    ) VALUES (
      'certification:release:test:dishwasher:1',
      'product:release:test:dishwasher:1',
      'Test Specification', 'Test Procedure', '2026-01-01',
      NULL, 1
    )
  `).run();
  database.prepare(`
    INSERT INTO equipment_performance_fields (
      id, product_id, field_key, numeric_value, text_value, unit,
      native_field
    ) VALUES (
      'performance:release:test:dishwasher:1:water',
      'product:release:test:dishwasher:1', 'water_per_rack',
      0.8, NULL, 'gallons/rack', 'water_native'
    )
  `).run();
  database.prepare(`
    INSERT INTO energy_star_commercial_dishwashers (
      product_id, machine_type, sanitation_method,
      water_gallons_per_rack, washing_kwh_per_rack,
      idle_energy_rate_kw, date_qualified
    ) VALUES (
      'product:release:test:dishwasher:1', 'Test Machine',
      'Hot Water Sanitizing (High Temp) Machine',
      0.8, 0.2, 0.4, '2026-01-01'
    )
  `).run();
  database.prepare(`
    INSERT INTO energy_star_dishwasher_operating_modes (
      id, product_id, operating_mode, water_gallons_per_rack,
      washing_kwh_per_rack, idle_energy_rate_kw,
      booster_idle_energy_rate_kw, racks_per_hour,
      washing_native_field, idle_native_field, booster_native_field
    ) VALUES (
      'mode:release:test:dishwasher:1:high',
      'product:release:test:dishwasher:1', 'HIGH_TEMPERATURE',
      0.8, 0.2, 0.4, NULL, 50,
      'washing_native', 'idle_native', NULL
    )
  `).run();
  database.prepare(`
    INSERT INTO operating_schedule_references (
      id, source_release_id, reference_kind, location, local_date,
      event_name, local_time, native_text
    ) VALUES (
      'reference:release:test:rise', 'release:test',
      'USNO_SOLAR_EVENT', 'Test Location', '2026-07-24',
      'Rise', '05:00', '{"phen":"Rise","time":"05:00"}'
    )
  `).run();
  database.prepare(`
    INSERT INTO ingestion_runs (
      id, source_id, release_id, adapter_version, started_at,
      finished_at, status, network_disabled, records_read,
      records_written, warning_count, error_message
    ) VALUES (
      'ingestion:test', 'source:test', 'release:test', 'adapter-v1',
      '2026-07-24T00:00:00.000Z', NULL, 'RUNNING', 1, 0, 0, 0, NULL
    )
  `).run();
  database.prepare(`
    INSERT INTO model_versions (
      id, standard_id, package_name, version, commit_sha,
      executable_sha256
    ) VALUES (
      'model:test', 'STD-TEST', 'Test Model', '1.0.0',
      '1234567890123456789012345678901234567890', NULL
    )
  `).run();
  database.prepare(`
    INSERT INTO model_input_schemas (
      id, model_version_id, module_name, fingerprint_sha256,
      schema_json
    ) VALUES (
      'model-schema:test', 'model:test', 'test_module', ?,
      '{"inputs":["value"]}'
    )
  `).run(SHA_B);
  database.prepare(`
    INSERT INTO calculation_assumptions (
      id, standard_id, assumption_key, value_json, unit,
      source_release_id
    ) VALUES (
      'assumption:test', 'STD-TEST', 'test_assumption', '1',
      'fraction', 'release:test'
    )
  `).run();
  const insertCalculation = database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled,
      status, created_at
    ) VALUES (
      ?, 'STD-TEST', ?, 'release:test', 'model:test', 'adapter-v1',
      ?, ?, 1, 'SUCCEEDED', '2026-07-24T00:00:00.000Z'
    )
  `);
  insertCalculation.run(
    "calculation:test:upstream",
    "upstream",
    SHA_B,
    SHA_C
  );
  insertCalculation.run(
    "calculation:test:target",
    "target",
    SHA_C,
    SHA_D
  );
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, value_json, unit,
      scope, selection_rule
    ) VALUES (
      'selected:test', 'calculation:test:target', 'test_output',
      42, NULL, 'unit', 'TEST_SCOPE', 'EXACT_TEST_SELECTION'
    )
  `).run();
  database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json,
      filters_json, transformation, adapter_path
    ) VALUES (
      'selected:test', 'artifact:test', '["value"]', '{"id":"test"}',
      'Select the exact test value.',
      'scripts/research/operational-savings/tests/test-adapter.mjs'
    )
  `).run();
  database.prepare(`
    INSERT INTO calculation_warnings (
      id, calculation_run_id, code, message, severity
    ) VALUES (
      'warning:test', 'calculation:test:target', 'TEST_WARNING',
      'Retained test warning.', 'INFO'
    )
  `).run();
  database.prepare(`
    INSERT INTO calculation_source_dependencies (
      calculation_run_id, dependency_role, input_calculation_run_id,
      source_artifact_id, source_fields_json, transformation
    ) VALUES (
      'calculation:test:target', 'test_input',
      'calculation:test:upstream', 'artifact:test', '["value"]',
      'Use the exact upstream test value.'
    )
  `).run();
  database.prepare(`
    INSERT INTO reopt_scenario_runs (
      id, calculation_run_id, source_artifact_id, scenario_role,
      source_input_path, evidence_path, evidence_sha256,
      evidence_output_sha256, expanded_input_sha256,
      termination_status, solver_seconds, network_enforcement,
      julia_version, highs_version, highs_jll_version, annual_load_kwh,
      year_one_energy_cost_before_tax_usd,
      year_one_demand_cost_before_tax_usd,
      year_one_bill_before_tax_usd, storage_power_kw,
      storage_energy_kwh, storage_discharge_kwh,
      storage_soc_series_sha256, storage_discharge_series_sha256
    ) VALUES (
      'scenario:test', 'calculation:test:target', 'artifact:test',
      'OFFICIAL', 'input.json', 'evidence.json', ?, ?, ?, 'OPTIMAL',
      0.5, 'DOCKER_NONE', '1.10.4', '1.12.0', '1.8.0+0', 1000,
      100, 10, 110, 0, 0, 0, NULL, NULL
    )
  `).run(SHA_B, SHA_C, SHA_D);
  database.prepare(`
    INSERT INTO scout_preparation_runs (
      id, source_release_id, source_artifact_id, model_version_id,
      commit_sha, entry_point, arguments_json, runtime_json,
      network_mode, output_byte_size, output_sha256,
      independent_replay_count, replay_output_sha256
    ) VALUES (
      'scout-preparation:test', 'release:test', 'artifact:test',
      'model:test', '1234567890123456789012345678901234567890',
      'test.py', '[]', '{"python":"3.12"}',
      'OS_SANDBOX_DENY_NETWORK', 100, ?, 2, ?
    )
  `).run(SHA_E, SHA_E);
}

async function upgradedDatabase() {
  const temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-immutability-")
  );
  temporaryRoots.push(temporaryRoot);
  const path = join(temporaryRoot, "research.sqlite");
  await applyPreImmutabilityMigrations(path);
  return openResearchDatabase(path, {
    migrationAppliedAt: MIGRATION_APPLIED_AT
  });
}

test("upgrades existing rows and installs the complete trigger set", async () => {
  const database = await upgradedDatabase();
  try {
    expect(
      database.prepare("PRAGMA recursive_triggers").get()
    ).toEqual({
      recursive_triggers: 1
    });
    expect(
      database.prepare(`
        SELECT name
        FROM sqlite_schema
        WHERE type = 'trigger'
        ORDER BY name
      `).all().map(({ name }) => name)
    ).toEqual(EXPECTED_TRIGGERS);
    expect(
      database.prepare(`
        SELECT name, applied_at AS appliedAt
        FROM research_migrations
        WHERE name IN (?, ?)
        ORDER BY name
      `).all(IMMUTABILITY_MIGRATION, PUBLICATION_SEAL_MIGRATION)
    ).toEqual([
      {
        name: IMMUTABILITY_MIGRATION,
        appliedAt: MIGRATION_APPLIED_AT
      },
      {
        name: PUBLICATION_SEAL_MIGRATION,
        appliedAt: MIGRATION_APPLIED_AT
      }
    ]);
    for (const table of PROTECTED_TABLES) {
      expect(
        database.prepare(
          `SELECT count(*) AS count FROM "${table}"`
        ).get().count
      ).toBeGreaterThan(0);
    }
    expect(
      database.prepare(`
        SELECT sha256, byte_size AS byteSize
        FROM source_artifacts
        WHERE id = 'artifact:test'
      `).get()
    ).toEqual({
      sha256: SHA_A,
      byteSize: 12
    });
    expect(
      database.prepare(`
        SELECT input_sha256 AS inputSha256,
          output_sha256 AS outputSha256
        FROM calculation_runs
        WHERE id = 'calculation:test:target'
      `).get()
    ).toEqual({
      inputSha256: SHA_C,
      outputSha256: SHA_D
    });
  } finally {
    database.close();
  }
});

test("rejects INSERT OR REPLACE against immutable published rows", async () => {
  const database = await upgradedDatabase();
  try {
    expect(() =>
      database.prepare(`
        INSERT OR REPLACE INTO benchmark_values (
          id, population_id, field_key, value, unit, sample_size
        ) VALUES (
          'benchmark:release:test:population:value',
          'benchmark:release:test:population', 'test_value',
          99, 'unit', 1
        )
      `).run()
    ).toThrow("IMMUTABLE_ROW_DELETE: benchmark_values");
    expect(
      database.prepare(`
        SELECT value
        FROM benchmark_values
        WHERE id = 'benchmark:release:test:population:value'
      `).get().value
    ).toBe(10);
  } finally {
    database.close();
  }
});

test("allows no-op replays and explicit lifecycle progress", async () => {
  const database = await upgradedDatabase();
  try {
    for (const table of PROTECTED_TABLES) {
      expect(() =>
        database.exec(`UPDATE "${table}" SET rowid = rowid`)
      ).not.toThrow();
    }
    expect(() =>
      database.prepare(`
        INSERT INTO source_artifacts (
          id, release_id, source_url, local_name, media_type, byte_size,
          sha256, acquired_at, official
        ) VALUES (
          'artifact:test', 'release:test',
          'https://example.test/artifact.json', 'artifact.json',
          'application/json', 12, ?,
          '2026-07-24T00:00:00.000Z', 1
        )
        ON CONFLICT(id) DO UPDATE SET
          release_id = excluded.release_id,
          source_url = excluded.source_url,
          local_name = excluded.local_name,
          media_type = excluded.media_type,
          byte_size = excluded.byte_size,
          sha256 = excluded.sha256,
          acquired_at = excluded.acquired_at,
          official = excluded.official
      `).run(SHA_A)
    ).not.toThrow();
    database.prepare(`
      UPDATE source_releases
      SET status = 'PUBLISHED'
      WHERE id = 'release:test'
    `).run();
    database.prepare(`
      UPDATE ingestion_runs
      SET finished_at = '2026-07-24T01:00:00.000Z',
        status = 'SUCCEEDED',
        records_read = 10,
        records_written = 8,
        warning_count = 1,
        error_message = NULL
      WHERE id = 'ingestion:test'
    `).run();
    database.prepare(`
      UPDATE model_versions
      SET executable_sha256 = ?
      WHERE id = 'model:test'
    `).run(SHA_F);
    expect(() =>
      database.prepare(`
        UPDATE model_versions
        SET executable_sha256 = ?
        WHERE id = 'model:test'
      `).run(SHA_F)
    ).not.toThrow();
    expect(
      database.prepare(`
        SELECT status
        FROM source_releases
        WHERE id = 'release:test'
      `).get().status
    ).toBe("PUBLISHED");
    expect(
      database.prepare(`
        SELECT status, records_read AS recordsRead,
          records_written AS recordsWritten
        FROM ingestion_runs
        WHERE id = 'ingestion:test'
      `).get()
    ).toEqual({
      status: "SUCCEEDED",
      recordsRead: 10,
      recordsWritten: 8
    });
    expect(
      database.prepare(`
        SELECT executable_sha256 AS executableSha256
        FROM model_versions
        WHERE id = 'model:test'
      `).get().executableSha256
    ).toBe(SHA_F);
    expect(() =>
      database.prepare(`
        UPDATE source_releases
        SET status = 'NORMALIZED'
        WHERE id = 'release:test'
      `).run()
    ).toThrow("INVALID_RELEASE_STATUS_TRANSITION");
    expect(() =>
      database.prepare(`
        UPDATE source_releases
        SET status = 'QUARANTINED'
        WHERE id = 'release:test'
      `).run()
    ).toThrow("INVALID_RELEASE_STATUS_TRANSITION");
  } finally {
    database.close();
  }
});

test("allows staged population and rejects fresh direct and indirect appends after publication", async () => {
  const database = await upgradedDatabase();
  try {
    expect(() =>
      database.prepare(`
        INSERT INTO source_releases (
          id, source_id, version, published_at, acquired_at, status,
          schema_version_id
        ) VALUES (
          'release:test:direct-published', 'source:test', 'direct-published',
          '2026-07-24T00:00:00.000Z',
          '2026-07-24T00:00:00.000Z', 'PUBLISHED', 'schema:test'
        )
      `).run()
    ).toThrow(
      "PUBLISHED_RELEASE_REQUIRES_FINAL_TRANSITION: source_releases"
    );

    database.prepare(`
      INSERT INTO source_artifacts (
        id, release_id, source_url, local_name, media_type, byte_size,
        sha256, acquired_at, official
      ) VALUES (
        'artifact:test:staged', 'release:test',
        'https://example.test/staged.json', 'staged.json',
        'application/json', 13, ?,
        '2026-07-24T00:00:00.000Z', 1
      )
    `).run(SHA_B);
    database.prepare(`
      INSERT INTO source_checksums (
        artifact_id, algorithm, digest, observed_at
      ) VALUES (
        'artifact:test:staged', 'sha256', ?,
        '2026-07-24T00:00:00.000Z'
      )
    `).run(SHA_B);
    database.prepare(`
      INSERT INTO benchmark_values (
        id, population_id, field_key, value, unit, sample_size
      ) VALUES (
        'benchmark:release:test:population:staged',
        'benchmark:release:test:population',
        'staged_value', 11, 'unit', 1
      )
    `).run();
    database.prepare(`
      INSERT INTO equipment_certifications (
        id, product_id, specification, test_procedure,
        effective_from, effective_to, active
      ) VALUES (
        'certification:release:test:dishwasher:staged',
        'product:release:test:dishwasher:1',
        'Staged Specification', 'Staged Procedure',
        '2026-01-01', NULL, 1
      )
    `).run();
    database.prepare(`
      INSERT INTO calculation_source_dependencies (
        calculation_run_id, dependency_role,
        input_calculation_run_id, source_artifact_id,
        source_fields_json, transformation
      ) VALUES (
        'calculation:test:target', 'staged_input',
        'calculation:test:upstream', 'artifact:test:staged',
        '["value"]', 'Use the staged test value.'
      )
    `).run();

    database.prepare(`
      UPDATE source_releases
      SET status = 'PUBLISHED'
      WHERE id = 'release:test'
    `).run();

    expect(() =>
      database.prepare(`
        INSERT INTO source_artifacts (
          id, release_id, source_url, local_name, media_type, byte_size,
          sha256, acquired_at, official
        ) VALUES (
          'artifact:test:staged', 'release:test',
          'https://example.test/staged.json', 'staged.json',
          'application/json', 13, ?,
          '2026-07-24T00:00:00.000Z', 1
        )
        ON CONFLICT(id) DO NOTHING
      `).run(SHA_B)
    ).not.toThrow();
    expect(() =>
      database.prepare(`
        INSERT INTO source_artifacts (
          id, release_id, source_url, local_name, media_type, byte_size,
          sha256, acquired_at, official
        ) VALUES (
          'artifact:test:late', 'release:test',
          'https://example.test/late.json', 'late.json',
          'application/json', 14, ?,
          '2026-07-24T00:00:00.000Z', 1
        )
      `).run(SHA_C)
    ).toThrow(
      "PUBLISHED_RELEASE_APPEND_BLOCKED: source_artifacts"
    );
    expect(() =>
      database.prepare(`
        INSERT INTO source_checksums (
          artifact_id, algorithm, digest, observed_at
        ) VALUES (
          'artifact:test:staged', 'sha512', ?,
          '2026-07-24T00:00:00.000Z'
        )
      `).run(SHA_C)
    ).toThrow(
      "PUBLISHED_RELEASE_APPEND_BLOCKED: source_checksums"
    );
    expect(() =>
      database.prepare(`
        INSERT INTO benchmark_values (
          id, population_id, field_key, value, unit, sample_size
        ) VALUES (
          'benchmark:release:test:population:late',
          'benchmark:release:test:population',
          'late_value', 12, 'unit', 1
        )
      `).run()
    ).toThrow(
      "PUBLISHED_RELEASE_APPEND_BLOCKED: benchmark_values"
    );
    expect(() =>
      database.prepare(`
        INSERT INTO equipment_certifications (
          id, product_id, specification, test_procedure,
          effective_from, effective_to, active
        ) VALUES (
          'certification:release:test:dishwasher:late',
          'product:release:test:dishwasher:1',
          'Late Specification', 'Late Procedure',
          '2026-01-01', NULL, 1
        )
      `).run()
    ).toThrow(
      "PUBLISHED_RELEASE_APPEND_BLOCKED: equipment_certifications"
    );
    expect(() =>
      database.prepare(`
        INSERT INTO calculation_source_dependencies (
          calculation_run_id, dependency_role,
          input_calculation_run_id, source_artifact_id,
          source_fields_json, transformation
        ) VALUES (
          'calculation:test:target', 'late_input',
          'calculation:test:upstream', 'artifact:test',
          '["value"]', 'Use a late test value.'
        )
      `).run()
    ).toThrow(
      "PUBLISHED_RELEASE_APPEND_BLOCKED: calculation_source_dependencies"
    );

    expect(() =>
      database.prepare(`
        INSERT INTO calculation_runs (
          id, standard_id, process_key, source_release_id,
          model_version_id, adapter_version, input_sha256,
          output_sha256, network_disabled, status, created_at
        ) VALUES (
          'calculation:test:unowned', 'STD-TEST', 'unowned',
          NULL, 'model:test', 'adapter-v1', ?, ?, 1,
          'SUCCEEDED', '2026-07-24T00:00:00.000Z'
        )
      `).run(SHA_E, SHA_F)
    ).not.toThrow();
  } finally {
    database.close();
  }
});

test("rejects deletion of every seeded published row", async () => {
  const database = await upgradedDatabase();
  try {
    for (const table of PROTECTED_TABLES) {
      expect(
        () => database.exec(`DELETE FROM "${table}"`)
      ).toThrow(/IMMUTABLE_ROW_DELETE/);
      expect(
        database.prepare(
          `SELECT count(*) AS count FROM "${table}"`
        ).get().count
      ).toBeGreaterThan(0);
    }
  } finally {
    database.close();
  }
});

test("rejects changed content under stable identities", async () => {
  const database = await upgradedDatabase();
  try {
    const mutationCases = [
      {
        table: "equipment_products",
        sql: `
          UPDATE equipment_products
          SET model = 'Changed Model'
          WHERE id = 'product:release:test:dishwasher:1'
        `
      },
      {
        table: "equipment_certifications",
        sql: `
          UPDATE equipment_certifications
          SET specification = 'Changed Specification'
          WHERE id = 'certification:release:test:dishwasher:1'
        `
      },
      {
        table: "equipment_performance_fields",
        sql: `
          UPDATE equipment_performance_fields
          SET numeric_value = 0.9
          WHERE id = 'performance:release:test:dishwasher:1:water'
        `
      },
      {
        table: "energy_star_commercial_dishwashers",
        sql: `
          UPDATE energy_star_commercial_dishwashers
          SET water_gallons_per_rack = 0.9
          WHERE product_id = 'product:release:test:dishwasher:1'
        `
      },
      {
        table: "energy_star_dishwasher_operating_modes",
        sql: `
          UPDATE energy_star_dishwasher_operating_modes
          SET washing_kwh_per_rack = 0.3
          WHERE id = 'mode:release:test:dishwasher:1:high'
        `
      },
      {
        table: "operating_schedule_references",
        sql: `
          UPDATE operating_schedule_references
          SET local_time = '05:01'
          WHERE id = 'reference:release:test:rise'
        `
      },
      {
        table: "source_registry",
        sql: `
          UPDATE source_registry
          SET name = 'Changed Source'
          WHERE id = 'source:test'
        `
      },
      {
        table: "schema_versions",
        sql: `
          UPDATE schema_versions
          SET schema_json = '{"fields":["changed"]}'
          WHERE id = 'schema:test'
        `
      },
      {
        table: "source_releases",
        sql: `
          UPDATE source_releases
          SET version = 'v2'
          WHERE id = 'release:test'
        `
      },
      {
        table: "source_artifacts",
        sql: `
          UPDATE source_artifacts
          SET sha256 = '${SHA_B}'
          WHERE id = 'artifact:test'
        `
      },
      {
        table: "source_checksums",
        sql: `
          UPDATE source_checksums
          SET digest = '${SHA_B}'
          WHERE artifact_id = 'artifact:test'
            AND algorithm = 'sha256'
        `
      },
      {
        table: "ingestion_runs",
        sql: `
          UPDATE ingestion_runs
          SET adapter_version = 'adapter-v2'
          WHERE id = 'ingestion:test'
        `
      },
      {
        table: "model_versions",
        sql: `
          UPDATE model_versions
          SET version = '2.0.0'
          WHERE id = 'model:test'
        `
      },
      {
        table: "model_input_schemas",
        sql: `
          UPDATE model_input_schemas
          SET schema_json = '{"inputs":["changed"]}'
          WHERE id = 'model-schema:test'
        `
      },
      {
        table: "calculation_assumptions",
        sql: `
          UPDATE calculation_assumptions
          SET value_json = '2'
          WHERE id = 'assumption:test'
        `
      },
      {
        table: "calculation_runs",
        sql: `
          UPDATE calculation_runs
          SET input_sha256 = '${SHA_E}'
          WHERE id = 'calculation:test:target'
        `
      },
      {
        table: "selected_values",
        sql: `
          UPDATE selected_values
          SET value = 43
          WHERE id = 'selected:test'
        `
      },
      {
        table: "selected_value_provenance",
        sql: `
          UPDATE selected_value_provenance
          SET filters_json = '{"id":"changed"}'
          WHERE selected_value_id = 'selected:test'
        `
      },
      {
        table: "calculation_warnings",
        sql: `
          UPDATE calculation_warnings
          SET message = 'Changed warning.'
          WHERE id = 'warning:test'
        `
      },
      {
        table: "calculation_source_dependencies",
        sql: `
          UPDATE calculation_source_dependencies
          SET transformation = 'Changed transformation.'
          WHERE calculation_run_id = 'calculation:test:target'
            AND dependency_role = 'test_input'
        `
      },
      {
        table: "reopt_scenario_runs",
        sql: `
          UPDATE reopt_scenario_runs
          SET evidence_sha256 = '${SHA_E}'
          WHERE id = 'scenario:test'
        `
      },
      {
        table: "scout_preparation_runs",
        sql: `
          UPDATE scout_preparation_runs
          SET output_byte_size = 101
          WHERE id = 'scout-preparation:test'
        `
      }
    ];
    for (const mutation of mutationCases) {
      expect(() => database.exec(mutation.sql)).toThrow(
        `IMMUTABLE_ROW_UPDATE: ${mutation.table}`
      );
    }

    expect(() =>
      database.prepare(`
        INSERT INTO source_artifacts (
          id, release_id, source_url, local_name, media_type, byte_size,
          sha256, acquired_at, official
        ) VALUES (
          'artifact:test', 'release:test',
          'https://example.test/artifact.json', 'artifact.json',
          'application/json', 12, ?,
          '2026-07-24T00:00:00.000Z', 1
        )
        ON CONFLICT(id) DO UPDATE SET
          sha256 = excluded.sha256
      `).run(SHA_B)
    ).toThrow("IMMUTABLE_ROW_UPDATE: source_artifacts");
    expect(() =>
      database.prepare(`
        INSERT INTO calculation_runs (
          id, standard_id, process_key, source_release_id,
          model_version_id, adapter_version, input_sha256,
          output_sha256, network_disabled, status, created_at
        ) VALUES (
          'calculation:test:target', 'STD-TEST', 'target',
          'release:test', 'model:test', 'adapter-v1', ?, ?, 1,
          'SUCCEEDED', '2026-07-24T00:00:00.000Z'
        )
        ON CONFLICT(id) DO UPDATE SET
          input_sha256 = excluded.input_sha256
      `).run(SHA_E, SHA_D)
    ).toThrow("IMMUTABLE_ROW_UPDATE: calculation_runs");
    expect(() =>
      database.prepare(`
        INSERT INTO selected_values (
          id, calculation_run_id, formula_term, value, value_json, unit,
          scope, selection_rule
        ) VALUES (
          'selected:test', 'calculation:test:target', 'test_output',
          43, NULL, 'unit', 'TEST_SCOPE', 'EXACT_TEST_SELECTION'
        )
        ON CONFLICT(id) DO UPDATE SET
          value = excluded.value
      `).run()
    ).toThrow("IMMUTABLE_ROW_UPDATE: selected_values");
    expect(() =>
      database.prepare(`
        INSERT INTO selected_value_provenance (
          selected_value_id, source_artifact_id, source_fields_json,
          filters_json, transformation, adapter_path
        ) VALUES (
          'selected:test', 'artifact:test', '["value"]',
          '{"id":"changed"}', 'Select the exact test value.',
          'scripts/research/operational-savings/tests/test-adapter.mjs'
        )
        ON CONFLICT(selected_value_id) DO UPDATE SET
          filters_json = excluded.filters_json
      `).run()
    ).toThrow(
      "IMMUTABLE_ROW_UPDATE: selected_value_provenance"
    );
    expect(() =>
      database.prepare(`
        INSERT INTO calculation_source_dependencies (
          calculation_run_id, dependency_role,
          input_calculation_run_id, source_artifact_id,
          source_fields_json, transformation
        ) VALUES (
          'calculation:test:target', 'test_input',
          'calculation:test:upstream', 'artifact:test', '["value"]',
          'Changed transformation.'
        )
        ON CONFLICT(calculation_run_id, dependency_role) DO UPDATE SET
          transformation = excluded.transformation
      `).run()
    ).toThrow(
      "IMMUTABLE_ROW_UPDATE: calculation_source_dependencies"
    );

    database.prepare(`
      UPDATE model_versions
      SET executable_sha256 = ?
      WHERE id = 'model:test'
    `).run(SHA_F);
    expect(() =>
      database.prepare(`
        UPDATE model_versions
        SET executable_sha256 = ?
        WHERE id = 'model:test'
      `).run(SHA_E)
    ).toThrow("IMMUTABLE_ROW_UPDATE: model_versions");
    expect(
      database.prepare(`
        SELECT sha256
        FROM source_artifacts
        WHERE id = 'artifact:test'
      `).get().sha256
    ).toBe(SHA_A);
    expect(
      database.prepare(`
        SELECT input_sha256 AS inputSha256
        FROM calculation_runs
        WHERE id = 'calculation:test:target'
      `).get().inputSha256
    ).toBe(SHA_C);
    expect(
      database.prepare(`
        SELECT value
        FROM selected_values
        WHERE id = 'selected:test'
      `).get().value
    ).toBe(42);
  } finally {
    database.close();
  }
});

test("preserves two release-scoped domain versions and rejects same-identity mutation", async () => {
  const database = await upgradedDatabase();
  try {
    database.prepare(`
      INSERT INTO source_releases (
        id, source_id, version, published_at, acquired_at, status,
        schema_version_id
      ) VALUES (
        'release:test:v2', 'source:test', 'v2',
        '2026-07-02T00:00:00.000Z',
        '2026-07-24T01:00:00.000Z', 'INSPECTED',
        'schema:test'
      )
    `).run();
    database.prepare(`
      INSERT INTO benchmark_populations (
        id, source_release_id, standard_id, process_key,
        filters_json, population_size, weighting_field,
        selection_rule
      ) VALUES (
        'benchmark:release:test:v2:population',
        'release:test:v2', 'STD-TEST', 'test_benchmark',
        '{"class":"test"}', 1, NULL,
        'EXACT_TEST_POPULATION'
      )
    `).run();
    database.prepare(`
      INSERT INTO benchmark_values (
        id, population_id, field_key, value, unit, sample_size
      ) VALUES (
        'benchmark:release:test:v2:population:value',
        'benchmark:release:test:v2:population',
        'test_value', 20, 'unit', 1
      )
    `).run();
    database.prepare(`
      UPDATE source_releases
      SET status = 'PUBLISHED'
      WHERE id = 'release:test:v2'
    `).run();
    expect(
      database.prepare(`
        SELECT p.source_release_id AS releaseId, v.value
        FROM benchmark_populations p
        JOIN benchmark_values v ON v.population_id = p.id
        WHERE p.process_key = 'test_benchmark'
        ORDER BY p.source_release_id
      `).all()
    ).toEqual([
      { releaseId: "release:test", value: 10 },
      { releaseId: "release:test:v2", value: 20 }
    ]);
    expect(() =>
      database.prepare(`
        UPDATE benchmark_values
        SET value = 20
        WHERE id = 'benchmark:release:test:population:value'
      `).run()
    ).toThrow("IMMUTABLE_ROW_UPDATE: benchmark_values");
  } finally {
    database.close();
  }
});
