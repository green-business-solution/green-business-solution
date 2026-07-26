import { createHash } from "node:crypto";
import {
  access,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import {
  buildRealResearchDatabase,
  REAL_PROOF_STANDARD_IDS,
  verifyRealResearchDatabasePublication
} from "../run-real-proofs.mjs";

const repositoryRoot = fileURLToPath(
  new URL("../../../..", import.meta.url)
);
const committedFixturePath = join(
  repositoryRoot,
  "docs",
  "operational-savings-automation-research",
  "fixtures",
  "research-database.compact.json"
);

async function temporaryBuildDirectories(path) {
  return (await readdir(path)).filter(
    (name) =>
      name.startsWith(".research-database-build-") ||
      name.startsWith(".research-export-build-") ||
      name.startsWith(".research-publication-build-")
  );
}

test(
  "refuses to build without the measured process-wide network sandbox",
  async () => {
    const previousNetworkMode =
      process.env.OS_RESEARCH_NETWORK;
    const previousNetworkEnforcement =
      process.env.OS_RESEARCH_NETWORK_ENFORCEMENT;
    const temporaryRoot = await mkdtemp(
      join(tmpdir(), "retrofi-real-database-network-")
    );
    try {
      delete process.env.OS_RESEARCH_NETWORK_ENFORCEMENT;
      await expect(
        buildRealResearchDatabase({
          databasePath: join(temporaryRoot, "research.sqlite"),
          compactExportPath: join(
            temporaryRoot,
            "research.compact.json"
          )
        })
      ).rejects.toThrow(/NETWORK_SANDBOX_MARKER_MISSING/);
      expect(await readdir(temporaryRoot)).toEqual([]);
    } finally {
      if (previousNetworkMode === undefined) {
        delete process.env.OS_RESEARCH_NETWORK;
      } else {
        process.env.OS_RESEARCH_NETWORK =
          previousNetworkMode;
      }
      if (previousNetworkEnforcement === undefined) {
        delete process.env.OS_RESEARCH_NETWORK_ENFORCEMENT;
      } else {
        process.env.OS_RESEARCH_NETWORK_ENFORCEMENT =
          previousNetworkEnforcement;
      }
      await rm(temporaryRoot, {
        recursive: true,
        force: true
      });
    }
  }
);

test(
  "keeps the prior database when a real source artifact cannot be verified",
  async () => {
    const temporaryRoot = await mkdtemp(
      join(tmpdir(), "retrofi-real-database-failure-")
    );
    const databasePath = join(temporaryRoot, "research.sqlite");
    const compactExportPath = join(
      temporaryRoot,
      "research.compact.json"
    );
    await writeFile(databasePath, "prior database bytes", "utf8");
    try {
      await expect(
        buildRealResearchDatabase({
          databasePath,
          compactExportPath,
          artifactRoot: join(temporaryRoot, "missing-artifacts")
        })
      ).rejects.toThrow();
      expect(await readFile(databasePath, "utf8")).toBe(
        "prior database bytes"
      );
      await expect(access(compactExportPath)).rejects.toMatchObject({
        code: "ENOENT"
      });
      expect(
        await temporaryBuildDirectories(temporaryRoot)
      ).toEqual([]);
    } finally {
      await rm(temporaryRoot, { recursive: true, force: true });
    }
  },
  30_000
);

test(
  "rejects a concurrent publisher for the same output set",
  async () => {
    const temporaryRoot = await mkdtemp(
      join(tmpdir(), "retrofi-real-database-concurrent-")
    );
    const databasePath = join(temporaryRoot, "research.sqlite");
    const compactExportPath = join(
      temporaryRoot,
      "research.compact.json"
    );
    let notifyLockAcquired;
    let releaseFirstPublisher;
    const lockAcquired = new Promise((resolve) => {
      notifyLockAcquired = resolve;
    });
    const holdFirstPublisher = new Promise((resolve) => {
      releaseFirstPublisher = resolve;
    });
    try {
      const firstPublisher = buildRealResearchDatabase({
        databasePath,
        compactExportPath,
        artifactRoot: join(temporaryRoot, "missing-artifacts"),
        publicationHooks: {
          async afterPublicationLockAcquired() {
            notifyLockAcquired();
            await holdFirstPublisher;
          }
        }
      });
      await lockAcquired;
      await expect(
        buildRealResearchDatabase({
          databasePath,
          compactExportPath,
          artifactRoot: join(
            temporaryRoot,
            "other-missing-artifacts"
          )
        })
      ).rejects.toThrow(/PUBLICATION_LOCKED/);
      releaseFirstPublisher();
      await expect(firstPublisher).rejects.toThrow();
      expect(await readdir(temporaryRoot)).toEqual([]);
    } finally {
      releaseFirstPublisher?.();
      await rm(temporaryRoot, {
        recursive: true,
        force: true
      });
    }
  },
  30_000
);

test(
  "builds the complete real-proof database and reproduces the compact fixture",
  async () => {
    const temporaryRoot = await mkdtemp(
      join(tmpdir(), "retrofi-real-database-success-")
    );
    const databasePath = join(temporaryRoot, "research.sqlite");
    const compactExportPath = join(
      temporaryRoot,
      "research.compact.json"
    );
    await writeFile(databasePath, "stale database bytes", "utf8");
    await writeFile(compactExportPath, "stale export bytes", "utf8");
    let database;
    try {
      const result = await buildRealResearchDatabase({
        databasePath,
        compactExportPath
      });
      expect(result.networkDisabled).toBe(true);
      await expect(
        verifyRealResearchDatabasePublication({
          databasePath,
          compactExportPath
        })
      ).resolves.toMatchObject({
        receipt: {
          status: "COMMITTED",
          generationId:
            result.publicationReceipt.generationId
        }
      });
      expect(result.publications.map(({ standardId }) => standardId))
        .toEqual([
          "STD-COMSTOCK-ANNUAL-DELTA",
          "STD-FUELECONOMY-VEHICLES",
          "STD-ENERGY-STAR-PRODUCT-DATA",
          "STD-FEMP-EXTERIOR-LIGHTING",
          "STD-EPA-CHP-PERFORMANCE",
          "STD-OPERATING-SCHEDULE",
          "STD-CONTEXT-BENCHMARKS",
          "STD-CONTEXT-BENCHMARKS",
          "STD-CONTEXT-BENCHMARKS",
          "STD-CONTEXT-BENCHMARKS",
          "STD-CONTEXT-BENCHMARKS",
          "STD-FEMP-EXTERIOR-LIGHTING",
          "STD-WATERSENSE-LANDSCAPE",
          "STD-WATERSENSE-CI-OPERATIONS",
          "STD-DISHWASHER-WATER-HEATING",
          "STD-DOE-MEASUR",
          "STD-SCOUT-ECM-SCREEN",
          "STD-REOPT-LOCAL-DISPATCH",
          "STD-INTERVAL-TARIFF",
          "STD-PVWATTS-V8",
          "STD-SAM-SOLAR-THERMAL",
          "STD-WIND-SAM"
        ]);
      expect(result.counts).toEqual({
        benchmark_populations: 34,
        benchmark_values: 49,
        biomass_chp_performance: 1,
        building_archetype_benchmarks: 1,
        building_upgrade_measures: 2,
        calculation_assumptions: 16,
        calculation_runs: 37,
        calculation_source_dependencies: 21,
        calculation_warnings: 13,
        chp_catalog_performance: 16,
        climate_crosswalks: 0,
        comstock_building_results: 1904,
        comstock_paired_resource_deltas: 952,
        energy_star_commercial_dishwashers: 418,
        energy_star_dishwasher_operating_modes: 448,
        equipment_certifications: 418,
        equipment_performance_fields: 53_709,
        equipment_products: 50_413,
        femp_exterior_lighting_requirements: 7,
        fuel_economy_vehicles: 49_995,
        geographic_crosswalks: 0,
        ingestion_runs: 26,
        installed_baseline_benchmarks: 0,
        model_input_schemas: 11,
        model_versions: 8,
        operating_schedule_references: 5,
        product_taxonomy_crosswalks: 0,
        reopt_scenario_runs: 5,
        retrofit_measure_crosswalks: 1,
        schema_versions: 25,
        scout_preparation_runs: 1,
        scout_prepared_ecm_annual_results: 6,
        scout_prepared_ecm_values: 10,
        selected_value_provenance: 56,
        selected_values: 56,
        source_artifacts: 58,
        source_checksums: 58,
        source_registry: 25,
        source_releases: 27,
        tariff_demand_charges: 2,
        tariff_energy_charges: 4,
        tariff_export_rules: 1,
        tariff_periods: 4,
        tariff_publication_components: 16,
        tariff_reconciliation_cases: 1,
        utility_providers: 1,
        utility_tariffs: 1,
        watersense_ci_methods: 7,
        watersense_landscape_climate: 31_735
      });

      const generatedFixture = await readFile(
        compactExportPath,
        "utf8"
      );
      const committedFixture = await readFile(
        committedFixturePath,
        "utf8"
      );
      expect(generatedFixture).toBe(committedFixture);

      database = new DatabaseSync(databasePath, {
        readOnly: true
      });
      expect(
        database.prepare("PRAGMA integrity_check").get()
      ).toEqual({ integrity_check: "ok" });
      expect(
        database.prepare("PRAGMA foreign_key_check").all()
      ).toEqual([]);
      expect(
        database.prepare(`
          SELECT DISTINCT standard_id AS standardId
          FROM source_registry
          ORDER BY standard_id
        `).all().map(({ standardId }) => standardId)
      ).toEqual([...REAL_PROOF_STANDARD_IDS].sort());
      expect(
        database.prepare(`
          SELECT count(*) AS count
          FROM source_registry
          WHERE upper(name) LIKE '%SYNTHETIC%'
            OR upper(access_mode) LIKE '%SYNTHETIC%'
        `).get().count
      ).toBe(0);
      expect(
        database.prepare(`
          SELECT formula_term AS formulaTerm
          FROM selected_values
          ORDER BY formula_term
        `).all().map(({ formulaTerm }) => formulaTerm)
      ).toEqual([
        "CHP_input_fuel",
        "PV_AC_kWh_t",
        "SAM_output",
        "Scout_reduction_fraction_r",
        "active_kWh_per_rack_proposed",
        "active_kWh_per_rack_proposed",
        "added_fuel",
        "annual_generation",
        "annual_hours",
        "annual_kWh",
        "annual_on_hours",
        "annual_racks_per_unit",
        "avoided_fan_kWh",
        "baseline_annual_bill",
        "baseline_design_allowance_gallons",
        "benchmark_annual_test_fuel_per_unit",
        "compressor_specific_power",
        "confirmed_leak_minutes_per_year",
        "current_annual_refrigeration_kWh",
        "existing_combined_mpg",
        "existing_fuel_per_hour",
        "existing_input_kW",
        "existing_input_kW",
        "existing_kW",
        "generation",
        "generation",
        "generation",
        "idle_kW_proposed",
        "idle_kW_proposed",
        "input_fuel",
        "leak_flow",
        "measured_leak_gpm",
        "median_ComStock_delta_r_per_ft²",
        "proposed_annual_bill",
        "proposed_annual_refrigeration_kWh",
        "proposed_combE",
        "proposed_design_allowance_gallons",
        "proposed_input_kW",
        "proposed_input_kW",
        "proposed_kW",
        "proposed_kWh_per_hour",
        "scheduled_input_fuel",
        "tariff_input_set",
        "total_annual_flushes_group",
        "useful_heat",
        "useful_heat",
        "useful_heat",
        "vehicle_kWh_per_mile",
        "water_heating_R_per_rack_existing",
        "water_heating_R_per_rack_proposed",
        "water_per_rack_proposed",
        "water_per_rack_proposed",
        "wind_kWh_t",
        "year_one_bill_savings_before_tax",
        "η_existing",
        "η_proposed"
      ]);
      expect(
        await temporaryBuildDirectories(temporaryRoot)
      ).toEqual([]);
    } finally {
      database?.close();
      await rm(temporaryRoot, { recursive: true, force: true });
    }
  },
  180_000
);

test(
  "fails closed when publication stops between the database and compact export",
  async () => {
    const temporaryRoot = await mkdtemp(
      join(tmpdir(), "retrofi-real-database-interruption-")
    );
    const databasePath = join(temporaryRoot, "research.sqlite");
    const compactExportPath = join(
      temporaryRoot,
      "research.compact.json"
    );
    const publicationReceiptPath =
      `${databasePath}.publication.json`;
    const priorDatabase = Buffer.from("prior database", "utf8");
    const priorExport = Buffer.from("prior export", "utf8");
    const digest = (value) =>
      createHash("sha256").update(value).digest("hex");
    const priorDatabaseIdentity = {
      byteSize: priorDatabase.length,
      sha256: digest(priorDatabase)
    };
    const priorExportIdentity = {
      byteSize: priorExport.length,
      sha256: digest(priorExport)
    };
    const priorGenerationId = digest(
      JSON.stringify({
        database: priorDatabaseIdentity,
        compactExport: priorExportIdentity
      })
    );
    await writeFile(databasePath, priorDatabase);
    await writeFile(compactExportPath, priorExport);
    await writeFile(
      publicationReceiptPath,
      `${JSON.stringify({
        schemaVersion:
          "operational-savings/research-database-publication-v1",
        status: "COMMITTED",
        generationId: priorGenerationId,
        database: {
          fileName: "research.sqlite",
          ...priorDatabaseIdentity
        },
        compactExport: {
          fileName: "research.compact.json",
          ...priorExportIdentity
        }
      }, null, 2)}\n`,
      "utf8"
    );
    try {
      await expect(
        verifyRealResearchDatabasePublication({
          databasePath,
          compactExportPath,
          publicationReceiptPath
        })
      ).resolves.toMatchObject({
        receipt: {
          generationId: priorGenerationId
        }
      });
      await expect(
        buildRealResearchDatabase({
          databasePath,
          compactExportPath,
          publicationReceiptPath,
          publicationHooks: {
            afterDatabasePublished() {
              throw new Error(
                "INJECTED_PUBLICATION_INTERRUPTION"
              );
            }
          }
        })
      ).rejects.toThrow(/INJECTED_PUBLICATION_INTERRUPTION/);
      await expect(
        verifyRealResearchDatabasePublication({
          databasePath,
          compactExportPath,
          publicationReceiptPath
        })
      ).rejects.toThrow(
        /ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/
      );
      expect(
        await temporaryBuildDirectories(temporaryRoot)
      ).toEqual([]);
    } finally {
      await rm(temporaryRoot, { recursive: true, force: true });
    }
  },
  180_000
);
