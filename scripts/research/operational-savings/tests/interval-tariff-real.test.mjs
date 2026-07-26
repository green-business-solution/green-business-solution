import {
  copyFile,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import {
  inspectUrdbArtifact,
  normalizeSelectedUrdbRecord,
  parseSchedule,
  validateUrdbHeaders
} from "../adapters/interval-tariff/inspect-schema.mjs";
import {
  ingestIntervalTariff,
  INTERVAL_TARIFF_ARTIFACT_IDS,
  INTERVAL_TARIFF_RELEASE_IDS,
  parseJointRateComparison,
  parseSmallCommercialPublication,
  publishIntervalTariffNormalizedRelease,
  recordIntervalTariffFormulaMapping,
  resolveCurrentSmbTariff
} from "../adapters/interval-tariff/run.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const operationalRoot = fileURLToPath(new URL("../", import.meta.url));
const artifactRoot = join(operationalRoot, ".cache", "artifacts");
const urdbPath = join(artifactRoot, "usurdb.csv.gz");
const publicationPath = join(
  artifactRoot,
  "sdge-small-commercial-rates-2026-06-01.pdf"
);
const comparisonPath = join(
  artifactRoot,
  "sdge-sdcp-joint-rate-comparison-2026-06-01.pdf"
);
const previousNetworkMode = process.env.OS_RESEARCH_NETWORK;

let temporaryDirectory;
let database;
let inspection;
let ingestion;
let mapped;

const alternateReleaseIds = Object.freeze({
  urdb: "release:usurdb:two-release-coexistence",
  controllingPublication:
    "release:sdge-small-commercial:two-release-coexistence",
  officialComparison:
    "release:sdge-sdcp-jrc:two-release-coexistence"
});
const alternateArtifactIds = Object.freeze({
  urdb: "artifact:usurdb:two-release-coexistence",
  controllingPublication:
    "artifact:sdge-small-commercial:two-release-coexistence",
  officialComparison:
    "artifact:sdge-sdcp-jrc:two-release-coexistence"
});

function resolveTariff(sourceReleaseId) {
  return resolveCurrentSmbTariff(database, {
    utilityName: "San Diego Gas & Electric Co",
    schedule: "TOU-A",
    sector: "Commercial",
    asOf: "2026-07-24",
    demandKw: 5.3,
    voltageCategory: "Secondary",
    serviceType: "Bundled",
    exportMode: "NO_EXPORT",
    sourceReleaseId
  });
}

function snapshotTariffRelease(sourceReleaseId) {
  const queries = {
    utilities: `
      SELECT *
      FROM utility_providers
      WHERE source_release_id = ?
      ORDER BY id
    `,
    tariffs: `
      SELECT *
      FROM utility_tariffs
      WHERE source_release_id = ?
      ORDER BY id
    `,
    periods: `
      SELECT child.*
      FROM tariff_periods AS child
      JOIN utility_tariffs AS tariff
        ON tariff.id = child.tariff_id
      WHERE tariff.source_release_id = ?
      ORDER BY child.id
    `,
    energyCharges: `
      SELECT child.*
      FROM tariff_energy_charges AS child
      JOIN utility_tariffs AS tariff
        ON tariff.id = child.tariff_id
      WHERE tariff.source_release_id = ?
      ORDER BY child.id
    `,
    demandCharges: `
      SELECT child.*
      FROM tariff_demand_charges AS child
      JOIN utility_tariffs AS tariff
        ON tariff.id = child.tariff_id
      WHERE tariff.source_release_id = ?
      ORDER BY child.id
    `,
    exportRules: `
      SELECT child.*
      FROM tariff_export_rules AS child
      JOIN utility_tariffs AS tariff
        ON tariff.id = child.tariff_id
      WHERE tariff.source_release_id = ?
      ORDER BY child.id
    `,
    publicationComponents: `
      SELECT child.*
      FROM tariff_publication_components AS child
      JOIN utility_tariffs AS tariff
        ON tariff.id = child.tariff_id
      WHERE tariff.source_release_id = ?
      ORDER BY child.id
    `,
    reconciliations: `
      SELECT child.*
      FROM tariff_reconciliation_cases AS child
      JOIN utility_tariffs AS tariff
        ON tariff.id = child.tariff_id
      WHERE tariff.source_release_id = ?
      ORDER BY child.id
    `
  };
  return Object.fromEntries(
    Object.entries(queries).map(([name, sql]) => [
      name,
      JSON.stringify(database.prepare(sql).all(sourceReleaseId))
    ])
  );
}

function cloneTariffSourceReleasesForTest() {
  for (const role of Object.keys(INTERVAL_TARIFF_RELEASE_IDS)) {
    database.prepare(`
      INSERT INTO source_releases (
        id, source_id, version, published_at, acquired_at,
        status, schema_version_id
      )
      SELECT ?, source_id, ?, published_at, acquired_at,
        status, schema_version_id
      FROM source_releases
      WHERE id = ?
    `).run(
      alternateReleaseIds[role],
      `two-release coexistence fixture ${role}`,
      INTERVAL_TARIFF_RELEASE_IDS[role]
    );
    database.prepare(`
      INSERT INTO source_artifacts (
        id, release_id, source_url, local_name, media_type,
        byte_size, sha256, acquired_at, official
      )
      SELECT ?, ?, source_url, local_name, media_type,
        byte_size, sha256, acquired_at, official
      FROM source_artifacts
      WHERE id = ?
    `).run(
      alternateArtifactIds[role],
      alternateReleaseIds[role],
      INTERVAL_TARIFF_ARTIFACT_IDS[role]
    );
    database.prepare(`
      INSERT INTO source_checksums (
        artifact_id, algorithm, digest, observed_at
      )
      SELECT ?, algorithm, digest, observed_at
      FROM source_checksums
      WHERE artifact_id = ?
    `).run(
      alternateArtifactIds[role],
      INTERVAL_TARIFF_ARTIFACT_IDS[role]
    );
  }
}

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryDirectory = await mkdtemp(
    join(tmpdir(), "retrofi-interval-tariff-")
  );
  database = await openResearchDatabase(
    join(temporaryDirectory, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  inspection = await inspectUrdbArtifact(urdbPath);
  ingestion = await ingestIntervalTariff({
    urdbArtifactPath: urdbPath,
    sdgePublicationPath: publicationPath,
    jointComparisonPath: comparisonPath,
    database
  });
  mapped = resolveCurrentSmbTariff(database, {
    utilityName: "San Diego Gas & Electric Co",
    schedule: "TOU-A",
    sector: "Commercial",
    asOf: "2026-07-24",
    demandKw: 5.3,
    voltageCategory: "Secondary",
    serviceType: "Bundled",
    exportMode: "NO_EXPORT"
  });
}, 30_000);

afterAll(async () => {
  database?.close();
  await rm(temporaryDirectory, { recursive: true, force: true });
  if (previousNetworkMode === undefined) {
    delete process.env.OS_RESEARCH_NETWORK;
  } else {
    process.env.OS_RESEARCH_NETWORK = previousNetworkMode;
  }
});

test("inspects every row and all 737 exact columns in the official URDB bulk artifact", () => {
  expect(inspection.artifact).toMatchObject({
    byteSize: 12218163,
    sha256:
      "89081ef124080ea322516040dc6b2c1945f9f754eced63f3130d4a8f14947032"
  });
  expect(inspection.recordsRead).toBe(58920);
  expect(inspection.schema).toMatchObject({
    columnCount: 737,
    fingerprintSha256:
      "fb43f7b46b13eb497982623d6986706c675810e8e039f699a92e399851d7f761"
  });
  expect(inspection.currentCaliforniaCommercialCount).toBeGreaterThan(500);
});

test("normalizes the exact current SDG&E TOU-A 5-20 kW source record", () => {
  expect(inspection.selectedTariff).toMatchObject({
    nativeRateId: "6a4584dbab8f09871f06ef7b",
    name: "TOU-A Secondary (5-20kW)",
    utility: "San Diego Gas & Electric Co",
    sector: "Commercial",
    serviceType: "Bundled",
    startDate: "2026-06-01",
    voltageCategory: "Secondary",
    peakKwMin: 5,
    peakKwMax: 20,
    fixedCharge: 19.23,
    fixedChargeUnit: "$/month"
  });
  expect(inspection.selectedTariff.weekdaySchedule).toHaveLength(12);
  expect(inspection.selectedTariff.weekdaySchedule[0]).toHaveLength(24);
  expect(inspection.selectedTariff.structures.energy).toHaveLength(4);
  expect(inspection.selectedTariff.structures.demand[0].rate).toBe(0);
  expect(inspection.selectedTariff.structures.flatDemand[0].rate).toBe(0);
});

test("extracts controlling publication components and reconciles all-in rates", () => {
  expect(ingestion.publication.rows).toEqual([
    expect.objectContaining({
      season: "Summer",
      periodName: "On-Peak",
      totalUdcRate: 0.23311,
      nonBypassableRate: 0.00591,
      commodityRate: 0.33672,
      totalElectricRate: 0.57574
    }),
    expect.objectContaining({
      season: "Summer",
      periodName: "Off-Peak",
      totalElectricRate: 0.42312
    }),
    expect.objectContaining({
      season: "Winter",
      periodName: "On-Peak",
      totalElectricRate: 0.43513
    }),
    expect.objectContaining({
      season: "Winter",
      periodName: "Off-Peak",
      totalElectricRate: 0.33589
    })
  ]);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM tariff_publication_components"
    ).get().count
  ).toBe(16);
});

test("reconciles the official TOU-A secondary representative comparison", () => {
  expect(ingestion.comparison).toMatchObject({
    effectiveDate: "2026-06-01",
    schedule: "TOU-A",
    usageKwh: 1123,
    demandKw: 5.3,
    averageRate: 0.41248,
    expectedBill: 463.21,
    status: "PASSED",
    sourcePage: 10
  });
  expect(ingestion.comparison.calculatedBill).toBeCloseTo(463.21504, 8);
});

test("publishes real normalized tariff, charge, schedule, and reconciliation rows", () => {
  const counts = Object.fromEntries(
    [
      "source_registry",
      "source_releases",
      "source_artifacts",
      "utility_providers",
      "utility_tariffs",
      "tariff_periods",
      "tariff_energy_charges",
      "tariff_demand_charges",
      "tariff_export_rules",
      "tariff_publication_components",
      "tariff_reconciliation_cases"
    ].map((table) => [
      table,
      database.prepare(`SELECT count(*) AS count FROM ${table}`).get().count
    ])
  );
  expect(counts).toEqual({
    source_registry: 1,
    source_releases: 3,
    source_artifacts: 3,
    utility_providers: 1,
    utility_tariffs: 1,
    tariff_periods: 4,
    tariff_energy_charges: 4,
    tariff_demand_charges: 2,
    tariff_export_rules: 1,
    tariff_publication_components: 16,
    tariff_reconciliation_cases: 1
  });
});

test("keeps two tariff releases independently resolvable and prevents mutation", () => {
  const releaseOneSnapshot = snapshotTariffRelease(
    INTERVAL_TARIFF_RELEASE_IDS.urdb
  );
  cloneTariffSourceReleasesForTest();
  const alternateSelectedTariff = structuredClone(
    ingestion.selectedTariff
  );
  const alternatePublication = structuredClone(
    ingestion.publication
  );
  alternateSelectedTariff.fixedCharge = 20.23;
  alternatePublication.fixedCharge = 20.23;

  expect(() =>
    publishIntervalTariffNormalizedRelease(database, {
      selectedTariff: alternateSelectedTariff,
      publication: alternatePublication,
      comparison: ingestion.comparison,
      sourceReleaseIds: alternateReleaseIds,
      sourceArtifactIds: {
        ...alternateArtifactIds,
        controllingPublication:
          INTERVAL_TARIFF_ARTIFACT_IDS.controllingPublication
      }
    })
  ).toThrow(/RELEASE_LINEAGE_MISMATCH/);

  const alternateNormalized =
    publishIntervalTariffNormalizedRelease(database, {
      selectedTariff: alternateSelectedTariff,
      publication: alternatePublication,
      comparison: ingestion.comparison,
      sourceReleaseIds: alternateReleaseIds,
      sourceArtifactIds: alternateArtifactIds
    });
  expect(
    snapshotTariffRelease(INTERVAL_TARIFF_RELEASE_IDS.urdb)
  ).toEqual(releaseOneSnapshot);
  expect(alternateNormalized.tariffId).not.toBe(
    ingestion.tariffId
  );
  expect(
    Object.fromEntries(
      [
        "utility_providers",
        "utility_tariffs",
        "tariff_periods",
        "tariff_energy_charges",
        "tariff_demand_charges",
        "tariff_export_rules",
        "tariff_publication_components",
        "tariff_reconciliation_cases"
      ].map((table) => [
        table,
        database.prepare(
          `SELECT count(*) AS count FROM ${table}`
        ).get().count
      ])
    )
  ).toEqual({
    utility_providers: 2,
    utility_tariffs: 2,
    tariff_periods: 8,
    tariff_energy_charges: 8,
    tariff_demand_charges: 4,
    tariff_export_rules: 2,
    tariff_publication_components: 32,
    tariff_reconciliation_cases: 2
  });
  expect(
    resolveTariff(INTERVAL_TARIFF_RELEASE_IDS.urdb)
  ).toMatchObject({
    sourceReleaseId: INTERVAL_TARIFF_RELEASE_IDS.urdb,
    values: {
      tariff_input_set: {
        fixedCharge: { value: 19.23 }
      }
    }
  });
  const alternateMapped = resolveTariff(
    alternateReleaseIds.urdb
  );
  expect(alternateMapped).toMatchObject({
    sourceReleaseId: alternateReleaseIds.urdb,
    sourceReleaseIds: alternateReleaseIds,
    values: {
      tariff_input_set: {
        fixedCharge: { value: 20.23 },
        controllingPublication: {
          artifactId:
            alternateArtifactIds.controllingPublication
        },
        officialReconciliation: {
          artifactId: alternateArtifactIds.officialComparison
        }
      }
    }
  });
  const alternateRecorded =
    recordIntervalTariffFormulaMapping(
      database,
      alternateMapped
    );
  expect(
    database.prepare(`
      SELECT source_release_id AS sourceReleaseId
      FROM calculation_runs
      WHERE id = ?
    `).get(alternateRecorded.calculationId)
  ).toEqual({
    sourceReleaseId: alternateReleaseIds.urdb
  });
  const currentRecorded =
    recordIntervalTariffFormulaMapping(database, mapped);
  expect(alternateRecorded.calculationId).not.toBe(
    currentRecorded.calculationId
  );

  const alternateSnapshot = snapshotTariffRelease(
    alternateReleaseIds.urdb
  );
  publishIntervalTariffNormalizedRelease(database, {
    selectedTariff: alternateSelectedTariff,
    publication: alternatePublication,
    comparison: ingestion.comparison,
    sourceReleaseIds: alternateReleaseIds,
    sourceArtifactIds: alternateArtifactIds
  });
  expect(
    snapshotTariffRelease(alternateReleaseIds.urdb)
  ).toEqual(alternateSnapshot);
  expect(() =>
    publishIntervalTariffNormalizedRelease(database, {
      selectedTariff: {
        ...alternateSelectedTariff,
        fixedCharge: 21.23
      },
      publication: {
        ...alternatePublication,
        fixedCharge: 21.23
      },
      comparison: ingestion.comparison,
      sourceReleaseIds: alternateReleaseIds,
      sourceArtifactIds: alternateArtifactIds
    })
  ).toThrow(/IMMUTABLE_ROW_UPDATE/);
  expect(
    snapshotTariffRelease(alternateReleaseIds.urdb)
  ).toEqual(alternateSnapshot);
});

test("returns the exact tariff_input_set formula term offline", () => {
  expect(mapped.formulaBindings).toEqual([
    expect.objectContaining({
      formulaTerm: "tariff_input_set",
      unit: "record set",
      scope: "RECORD_SET"
    })
  ]);
  expect(mapped.values.tariff_input_set).toMatchObject({
    nativeRateId: "6a4584dbab8f09871f06ef7b",
    schedule: "TOU-A",
    fixedCharge: { value: 19.23, unit: "$/month" },
    export: {
      mode: "NO_EXPORT",
      sellRate: 0,
      sellRateUnit: "$/kWh"
    },
    officialReconciliation: {
      status: "PASSED",
      expectedBill: 463.21
    }
  });
  expect(mapped.values.tariff_input_set.energyPeriods).toHaveLength(4);
  const publicationIds = new Set(
    mapped.values.tariff_input_set.energyPeriods.map(
      (period) => period.controllingArtifactId
    )
  );
  expect(publicationIds).toEqual(
    new Set([
      "artifact:sdge-small-commercial-rates:2026-06-01"
    ])
  );
  const recorded = recordIntervalTariffFormulaMapping(database, mapped);
  expect(recorded.selectedValueId).toContain("tariff-input-set");
  const selected = database.prepare(`
    SELECT formula_term, value, value_json, unit, scope
    FROM selected_values
    WHERE id = ?
  `).get(recorded.selectedValueId);
  expect(selected.formula_term).toBe("tariff_input_set");
  expect(selected.value).toBeNull();
  expect(JSON.parse(selected.value_json).nativeRateId).toBe(
    "6a4584dbab8f09871f06ef7b"
  );
  expect(selected).toMatchObject({
    unit: "record set",
    scope: "RECORD_SET"
  });
});

test("fails closed when the exact URDB schema changes", () => {
  const headers = Object.keys(inspection.selectedRecord);
  expect(() =>
    validateUrdbHeaders(
      headers.filter(
        (header) =>
          header !== "energyratestructure/period0/tier0adj"
      )
    )
  ).toThrow(/MISSING_REQUIRED_COLUMN/);
});

test("fails closed when a required tariff term or schedule is mutated", () => {
  const missingTerm = structuredClone(inspection.selectedRecord);
  missingTerm["energyratestructure/period0/tier0adj"] = "";
  expect(() => normalizeSelectedUrdbRecord(missingTerm)).toThrow(
    /MISSING_TARIFF_TERM/
  );
  expect(() => parseSchedule("[[0, 1]]", "mutated_schedule")).toThrow(
    /INCOMPATIBLE_SCHEDULE/
  );
});

test("fails closed for an ineligible demand band or unsupported export credit", () => {
  const base = {
    utilityName: "San Diego Gas & Electric Co",
    schedule: "TOU-A",
    sector: "Commercial",
    asOf: "2026-07-24",
    demandKw: 20.1,
    voltageCategory: "Secondary",
    serviceType: "Bundled",
    exportMode: "NO_EXPORT"
  };
  expect(() => resolveCurrentSmbTariff(database, base)).toThrow(
    /INELIGIBLE_TARIFF/
  );
  expect(() =>
    resolveCurrentSmbTariff(database, {
      ...base,
      demandKw: 5.3,
      exportMode: "NET_METERING"
    })
  ).toThrow(/SOURCE_UNSUPPORTED/);
});

test("fails closed for changed publication identity and comparison schema", () => {
  expect(() =>
    parseSmallCommercialPublication(
      "Available Rates for Small Commercial Customers\n(Effective 7/1/26)",
      5
    )
  ).toThrow(/SOURCE_SCHEMA_DRIFT/);
  expect(() =>
    parseJointRateComparison("SMALL COMMERCIAL", 18)
  ).toThrow(/SOURCE_SCHEMA_DRIFT/);
});

test(
  "rejects a checksum-corrupted URDB artifact before parsing",
  async () => {
    const corruptPath = join(temporaryDirectory, "corrupt-usurdb.csv.gz");
    await copyFile(urdbPath, corruptPath);
    const bytes = await readFile(corruptPath);
    bytes[bytes.length - 1] ^= 1;
    await writeFile(corruptPath, bytes);
    await expect(inspectUrdbArtifact(corruptPath)).rejects.toThrow(
      /CORRUPT_CHECKSUM/
    );
  },
  20_000
);

test("requires the explicit offline guard for runtime resolution", () => {
  process.env.OS_RESEARCH_NETWORK = "enabled";
  try {
    expect(() =>
      resolveCurrentSmbTariff(database, {
        utilityName: "San Diego Gas & Electric Co",
        schedule: "TOU-A",
        sector: "Commercial",
        asOf: "2026-07-24",
        demandKw: 5.3,
        voltageCategory: "Secondary",
        serviceType: "Bundled",
        exportMode: "NO_EXPORT"
      })
    ).toThrow(/OFFLINE_GUARD_REQUIRED/);
  } finally {
    process.env.OS_RESEARCH_NETWORK = "disabled";
  }
});
