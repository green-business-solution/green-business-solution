import {
  readFile,
  stat
} from "node:fs/promises";
import { join } from "node:path";

import {
  assertNetworkDisabled,
  sha256File,
  sha256Json
} from "../../lib/artifact.mjs";
import {
  upsertSourceProof,
  upsertSourceRelease,
  withDeferredReleasePublication
} from "../../lib/sqlite.mjs";
import {
  inspectReoptSourceSchema,
  REOPT_COMMIT,
  REOPT_FILES
} from "./inspect-schema.mjs";

const STANDARD_ID = "STD-REOPT-LOCAL-DISPATCH";
const SOURCE_ID = "source:reopt-jl";
const SCHEMA_ID = `schema:reopt-jl:${REOPT_COMMIT}`;
const RELEASE_ID = "release:reopt-jl:0.59.2";
const ARTIFACT_ID = "artifact:reopt-jl-project-toml:0.59.2";
const MODEL_ID = "model:reopt-jl:0.59.2";
const MODEL_SCHEMA_ID = "model-schema:reopt-jl:0.59.2";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/reopt/run.mjs";
const PROOF_TIMESTAMP = "2026-07-24T20:33:19.000Z";
const PVWATTS_CALCULATION_ID =
  "pvwatts_v8-fb39ece6873f88e42f9584bc";
const PVWATTS_LIBRARY_ARTIFACT_ID =
  "artifact:pvwatts:ssc-303";
const RETROFI_PROOF_SOURCE_ID =
  "source:retrofi-reopt-solar-storage-proof";
const RETROFI_PROOF_RELEASE_ID =
  "release:retrofi-reopt-solar-storage-proof:v1";
const SSC_FIXTURE_SOURCE_ID =
  "source:ssc-pvwatts-official-fixtures";
const SSC_FIXTURE_RELEASE_ID =
  "release:ssc-pvwatts-fixtures:ba7a7968a115baa0c250597ce2381c7ffb27fbf2";
const EVIDENCE = {
  official: {
    path: "official-proof.json",
    sha256:
      "11fdb7626d56c84a1275e02b77b79a2126be0747e01fedef02a3b722446cbfe4"
  },
  retrofi: {
    path: "retrofi-proof.json",
    sha256:
      "28828d9f83e5527292fcb07107c375ec9e5efbb2b0d6112d95a03ec46cc2f99c"
  },
  solarStorage: {
    artifactId:
      "artifact:retrofi:reopt-solar-storage-proof:d47b6ad66e555d0676ebde6e975f08b78c7ab13c123849a3cebaac805f2ae801",
    path: "solar-storage-proof.json",
    sha256:
      "d47b6ad66e555d0676ebde6e975f08b78c7ab13c123849a3cebaac805f2ae801"
  }
};
const SOLAR_STORAGE_SPEC = {
  artifactId:
    "artifact:retrofi:reopt-solar-storage-spec:39c97cf3b30265d68ddfc910b51e6e7dadc4b5a86f9e10447ac1d018ff197a2c",
  path: "retrofi-solar-storage-spec.json",
  sha256:
    "39c97cf3b30265d68ddfc910b51e6e7dadc4b5a86f9e10447ac1d018ff197a2c"
};
const PVWATTS_SERIES = {
  artifactId:
    "artifact:retrofi:pvwatts-interval-series:d57fd0f03e904bebe7b6056c9e41385fd081eb313b165681c5ca2533bc9c65f0",
  path: "pvwatts-interval-series.json",
  sha256:
    "d57fd0f03e904bebe7b6056c9e41385fd081eb313b165681c5ca2533bc9c65f0",
  seriesSha256:
    "a842a7a51583fca8b7c559a1ed12b16aa9d396ec7c6b92dbfabfc282dbaf0f1c",
  inputSha256:
    "e3f415eb40b37927dd12a9aa4c48ffa5512b09f7a5c18c97386e539a843b180e",
  outputSha256:
    "4447dfd0255ba2194a685c2ed2221325c0d7f3488d2a6a82a1166a37e0614532",
  librarySha256:
    "db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f",
  fixtureSha256:
    "b806b704a8542aa22ab2ad9c06ece19dcd766eee75777b426039b73f23dfaa61",
  resourceSha256:
    "311b8871e989b40d0016f7019dcabc06ebf38e16509c51842fce4bf1e6f8c591"
};
const PVWATTS_LIBRARY = {
  artifactId: PVWATTS_LIBRARY_ARTIFACT_ID,
  path: "src/sam/libssc.dylib",
  sha256: PVWATTS_SERIES.librarySha256,
  byteSize: 37852576,
  parseJson: false
};
const PVWATTS_FIXTURE = {
  artifactId: "artifact:pvwatts:official-fixture",
  path: "test/input_cases/pvwatts_cases.h",
  sha256: PVWATTS_SERIES.fixtureSha256,
  byteSize: 3419,
  parseJson: false
};
const PVWATTS_RESOURCE = {
  artifactId: "artifact:pvwatts:phoenix-tmy2",
  path:
    "test/input_cases/pvsamv1_data/USA AZ Phoenix (TMY2).csv",
  sha256: PVWATTS_SERIES.resourceSha256,
  byteSize: 501341,
  parseJson: false
};
const BUILD_MANIFEST = {
  artifactId:
    "artifact:retrofi:reopt-build-manifest:919505d5684c853bf332cf6a73fefce9ddd88d8f518810aed729c565b21b3c8f",
  path: "build-manifest.json",
  sha256:
    "919505d5684c853bf332cf6a73fefce9ddd88d8f518810aed729c565b21b3c8f"
};
const IMAGE_DIGEST =
  "3f894dad8b57d0b9a4e89d7401b882a17a067b1f4b186b7da155f0aa6d89e717";
const CONTAINER_ARTIFACT_ID =
  `artifact:retrofi:reopt-container:${IMAGE_DIGEST}`;

function assertExactRow(actual, expected, label) {
  assertProof(Boolean(actual), `${label} is missing`);
  const changed = Object.entries(expected).filter(
    ([key, value]) => actual[key] !== value
  );
  assertProof(
    changed.length === 0,
    `${label} immutable identity drift: ${JSON.stringify({
      expected,
      actual
    })}`
  );
}

function insertImmutableSource(database, source) {
  database.prepare(`
    INSERT INTO source_registry (
      id, standard_id, organization, name, primary_url, license, attribution,
      access_mode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `).run(
    source.id,
    source.standard_id,
    source.organization,
    source.name,
    source.primary_url,
    source.license,
    source.attribution,
    source.access_mode
  );
  assertExactRow(
    database.prepare(`
      SELECT id, standard_id, organization, name, primary_url, license,
        attribution, access_mode
      FROM source_registry
      WHERE id = ?
    `).get(source.id),
    source,
    `source ${source.id}`
  );
}

function insertImmutableRelease(database, release) {
  upsertSourceRelease(database, {
    id: release.id,
    sourceId: release.source_id,
    version: release.version,
    publishedAt: release.published_at,
    acquiredAt: release.acquired_at,
    status: release.status,
    schemaVersionId: release.schema_version_id
  });
}

function insertImmutableArtifact(database, artifact) {
  database.prepare(`
    INSERT INTO source_artifacts (
      id, release_id, source_url, local_name, media_type, byte_size, sha256,
      acquired_at, official
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `).run(
    artifact.id,
    artifact.release_id,
    artifact.source_url,
    artifact.local_name,
    artifact.media_type,
    artifact.byte_size,
    artifact.sha256,
    artifact.acquired_at,
    artifact.official
  );
  assertExactRow(
    database.prepare(`
      SELECT id, release_id, source_url, local_name, media_type, byte_size,
        sha256, acquired_at, official
      FROM source_artifacts
      WHERE id = ?
    `).get(artifact.id),
    artifact,
    `source artifact ${artifact.id}`
  );
  database.prepare(`
    INSERT INTO source_checksums (
      artifact_id, algorithm, digest, observed_at
    ) VALUES (?, 'sha256', ?, ?)
    ON CONFLICT(artifact_id, algorithm) DO NOTHING
  `).run(artifact.id, artifact.sha256, artifact.acquired_at);
  assertExactRow(
    database.prepare(`
      SELECT artifact_id, algorithm, digest, observed_at
      FROM source_checksums
      WHERE artifact_id = ? AND algorithm = 'sha256'
    `).get(artifact.id),
    {
      artifact_id: artifact.id,
      algorithm: "sha256",
      digest: artifact.sha256,
      observed_at: artifact.acquired_at
    },
    `source checksum ${artifact.id}`
  );
}

function assertImmutableArtifactBeforeUpsert(database, artifact) {
  const existing = database.prepare(`
    SELECT id, release_id, source_url, local_name, media_type, byte_size,
      sha256, acquired_at, official
    FROM source_artifacts
    WHERE id = ?
  `).get(artifact.id);
  if (existing) {
    assertExactRow(existing, artifact, `source artifact ${artifact.id}`);
  }
}

export async function ingestReoptSourceSchema({
  repoPath,
  database
}) {
  assertNetworkDisabled();
  const schema = await inspectReoptSourceSchema(repoPath);
  const projectPath = join(repoPath, REOPT_FILES.project.path);
  const projectStat = await stat(projectPath);
  const projectArtifact = {
    id: ARTIFACT_ID,
    release_id: RELEASE_ID,
    source_url:
      `https://github.com/NatLabRockies/REopt.jl/tree/${REOPT_COMMIT}`,
    local_name: "Project.toml",
    media_type: "text/plain",
    byte_size: projectStat.size,
    sha256: REOPT_FILES.project.sha256,
    acquired_at: "2026-07-23T00:00:00.000Z",
    official: 1
  };
  assertImmutableArtifactBeforeUpsert(database, projectArtifact);
  upsertSourceProof(database, {
    source: {
      id: SOURCE_ID,
      standardId: STANDARD_ID,
      organization: "National Laboratory of the Rockies",
      name: "REopt.jl",
      primaryUrl: "https://github.com/NatLabRockies/REopt.jl",
      license: "Apache-2.0 with repository NOTICE",
      attribution: "REopt.jl, National Laboratory of the Rockies",
      accessMode: "PUBLIC_GIT_REPOSITORY"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "JULIA_SOURCE_AND_JSON_SCENARIO",
      observed: schema,
      inspectedAt: "2026-07-24T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: `0.59.2, git commit ${REOPT_COMMIT}`,
      publishedAt: "2026-05-14T00:00:00.000Z",
      acquiredAt: "2026-07-23T00:00:00.000Z",
      status: "PUBLISHED"
    },
    artifact: {
      id: projectArtifact.id,
      sourceUrl: projectArtifact.source_url,
      localName: projectArtifact.local_name,
      mediaType: projectArtifact.media_type,
      byteSize: projectArtifact.byte_size,
      sha256: projectArtifact.sha256
    },
    ingestion: {
      id: "ingestion:reopt-jl:0.59.2:source-schema:v1",
      adapterVersion: "reopt-source-inspector-v1",
      startedAt: "2026-07-24T00:00:00.000Z",
      finishedAt: "2026-07-24T00:00:00.000Z",
      status: "SUCCEEDED",
      recordsRead: Object.keys(REOPT_FILES).length,
      recordsWritten: 2,
      warningCount: 1
    }
  });
  database.prepare(`
    INSERT INTO model_versions (
      id, standard_id, package_name, version, commit_sha, executable_sha256
    ) VALUES (?, ?, 'REopt.jl', '0.59.2', ?, NULL)
    ON CONFLICT(id) DO UPDATE SET
      commit_sha = excluded.commit_sha
  `).run(MODEL_ID, STANDARD_ID, REOPT_COMMIT);
  const schemaJson = {
    packageMetadata: schema.packageMetadata,
    electricStorageInputs: schema.electricStorageInputs,
    pvInputs: schema.pvInputs,
    electricTariffResultKeys: schema.electricTariffResultKeys,
    electricStorageResultKeys: schema.electricStorageResultKeys,
    pvResultKeys: schema.pvResultKeys,
    scenarioSections: schema.scenarioSections
  };
  database.prepare(`
    INSERT INTO model_input_schemas (
      id, model_version_id, module_name, fingerprint_sha256, schema_json
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      fingerprint_sha256 = excluded.fingerprint_sha256,
      schema_json = excluded.schema_json
  `).run(
    MODEL_SCHEMA_ID,
    MODEL_ID,
    "PV, ElectricStorage, and ElectricTariff source contract",
    sha256Json(schemaJson),
    JSON.stringify(schemaJson)
  );
  return {
    schema,
    modelExecutionStatus: "NOT_RUN_JULIA_RUNTIME_UNAVAILABLE",
    normalizedTargets: [
      "model_versions",
      "model_input_schemas"
    ]
  };
}

function assertProof(condition, message) {
  if (!condition) {
    throw new Error(`REOPT_PROOF_INVALID: ${message}`);
  }
}

async function loadPinnedEvidence(evidenceRoot, descriptor) {
  const path = join(evidenceRoot, descriptor.path);
  const [digest, fileStat] = await Promise.all([
    sha256File(path),
    stat(path)
  ]);
  assertProof(
    digest === descriptor.sha256,
    `${descriptor.path} checksum ${digest}`
  );
  if (descriptor.byteSize !== undefined) {
    assertProof(
      fileStat.size === descriptor.byteSize,
      `${descriptor.path} byte size ${fileStat.size}`
    );
  }
  return {
    path,
    digest,
    byteSize: fileStat.size,
    value:
      descriptor.parseJson === false
        ? null
        : JSON.parse(await readFile(path, "utf8"))
  };
}

function assertSolarInput(condition, message) {
  if (!condition) {
    throw new Error(`REOPT_SOLAR_STORAGE_INPUT_INVALID: ${message}`);
  }
}

function assertFiniteArray(values, count, predicate, label) {
  assertSolarInput(
    Array.isArray(values) &&
      values.length === count &&
      values.every(
        (value) =>
          typeof value === "number" &&
          Number.isFinite(value) &&
          predicate(value)
      ),
    label
  );
}

export function validateReoptSolarStorageInputs({ spec, series }) {
  assertSolarInput(
    spec &&
      typeof spec === "object" &&
      spec.timeBasis &&
      spec.site &&
      spec.loadProfile &&
      spec.tariff &&
      spec.pv &&
      spec.storage &&
      series &&
      typeof series === "object" &&
      series.site,
    "required input sections"
  );
  assertSolarInput(
    spec.schemaVersion === "retrofi/reopt-solar-storage-proof-v1" &&
      spec.year === 2023,
    "schema version or proof year"
  );
  assertSolarInput(
    spec.timeBasis.intervalHours === 1 &&
      spec.timeBasis.intervalCount === 8760 &&
      spec.timeBasis.timeZone === "America/Phoenix" &&
      spec.timeBasis.utcOffsetHours === -7 &&
      spec.timeBasis.observesDaylightSavingTime === false,
    "hourly Phoenix no-DST time basis"
  );
  assertSolarInput(
    series.schemaVersion === "retrofi/pvwatts-interval-series-v1" &&
      series.standardId === "STD-PVWATTS-V8" &&
      series.processKey === "pvwatts_v8" &&
      series.formulaTerm === "PV_AC_kWh_t" &&
      series.unit === "kWh/interval" &&
      series.intervalHours === 1 &&
      series.count === 8760 &&
      series.seriesSha256 === PVWATTS_SERIES.seriesSha256 &&
      series.sourceInputSha256 === PVWATTS_SERIES.inputSha256 &&
      series.sourceOutputSha256 === PVWATTS_SERIES.outputSha256 &&
      series.sourceLibrarySha256 ===
        PVWATTS_SERIES.librarySha256 &&
      series.sourceFixtureSha256 ===
        PVWATTS_SERIES.fixtureSha256 &&
      series.sourceResourceSha256 ===
        PVWATTS_SERIES.resourceSha256 &&
      series.modelVersion === "303",
    "PVWatts source identity"
  );
  assertSolarInput(
    series.site.latitude === spec.site.latitude &&
      series.site.longitude === spec.site.longitude &&
      series.site.timeZone === spec.timeBasis.timeZone &&
      series.site.utcOffsetHours === spec.timeBasis.utcOffsetHours &&
      series.site.observesDaylightSavingTime ===
        spec.timeBasis.observesDaylightSavingTime,
    "PVWatts and scenario site/time alignment"
  );
  assertSolarInput(
    spec.pv.sourceStandardId === series.standardId &&
      spec.pv.sourceFormulaTerm === series.formulaTerm &&
      spec.pv.intervalSeriesPath === PVWATTS_SERIES.path &&
      spec.pv.intervalSeriesSha256 === series.seriesSha256 &&
      spec.pv.systemCapacityDcKw === series.systemCapacityDcKw &&
      spec.pv.systemCapacityDcKw === 4,
    "PVWatts linkage and fixed capacity"
  );
  assertFiniteArray(
    series.values,
    8760,
    (value) => value >= 0 && value <= spec.pv.systemCapacityDcKw,
    "PVWatts interval values"
  );
  const annualGeneration = series.values.reduce(
    (sum, value) => sum + value,
    0
  );
  assertSolarInput(
    Math.abs(annualGeneration - series.annualEnergyKwh) <= 0.01,
    "PVWatts annual reconciliation"
  );
  assertSolarInput(
    spec.loadProfile.construction ===
      "repeat-hour-of-day-for-365-days",
    "load construction"
  );
  assertFiniteArray(
    spec.loadProfile.hourlyKw,
    24,
    (value) => value > 0,
    "load profile"
  );
  assertSolarInput(
    spec.tariff.construction ===
      "repeat-hour-of-day-for-365-days",
    "tariff construction"
  );
  assertFiniteArray(
    spec.tariff.hourlyEnergyRateUsdPerKwh,
    24,
    (value) => value >= 0,
    "energy-rate series"
  );
  assertFiniteArray(
    spec.tariff.monthlyDemandRateUsdPerKw,
    12,
    (value) => value >= 0,
    "monthly demand rates"
  );
  const storage = spec.storage;
  assertSolarInput(
    storage.powerKw === 4 &&
      storage.usableEnergyKwh === 8 &&
      storage.reserveFraction === 0.2 &&
      storage.initialSocFraction === 0.5 &&
      storage.chargeEfficiency === 0.95 &&
      storage.dischargeEfficiency === 0.95 &&
      storage.canGridCharge === false &&
      storage.initialSocFraction >= storage.reserveFraction,
    "fixed storage design and operating bounds"
  );
  return {
    intervalCount: series.values.length,
    annualGenerationKwh: series.annualEnergyKwh,
    pvCapacityDcKw: spec.pv.systemCapacityDcKw,
    storageNameplateEnergyKwh:
      storage.usableEnergyKwh / (1 - storage.reserveFraction)
  };
}

function validateEvidence({
  official,
  retrofi,
  solarStorage,
  solarInputs,
  buildManifest,
  officialScenarioSha256,
  inputSpecSha256
}) {
  assertProof(official.sourceCommit === REOPT_COMMIT, "official commit");
  assertProof(retrofi.sourceCommit === REOPT_COMMIT, "RetroFi commit");
  assertProof(
    official.inputSha256 === officialScenarioSha256,
    "official scenario checksum"
  );
  assertProof(
    retrofi.inputSpecSha256 === inputSpecSha256,
    "RetroFi input specification checksum"
  );
  assertProof(
    official.status === "optimal" &&
      official.terminationStatus === "OPTIMAL",
    "official solver status"
  );
  assertProof(
    retrofi.baseline.status === "optimal" &&
      retrofi.baseline.terminationStatus === "OPTIMAL" &&
      retrofi.proposed.status === "optimal" &&
      retrofi.proposed.terminationStatus === "OPTIMAL",
    "RetroFi pair solver status"
  );
  assertProof(
    official.metrics.annualLoadKwh === 10000 &&
      official.metrics.yearOneEnergyCostBeforeTaxUsd === 1000 &&
      official.metrics.yearOneDemandCostBeforeTaxUsd === 136.99,
    "official upstream regression values"
  );
  assertProof(
    retrofi.baseline.annualLoadKwh ===
      retrofi.proposed.annualLoadKwh,
    "baseline and proposed load equality"
  );
  assertProof(
    retrofi.baseline.storagePowerKw === 0 &&
      retrofi.baseline.storageEnergyKwh === 0 &&
      retrofi.proposed.storagePowerKw === 25 &&
      retrofi.proposed.storageEnergyKwh === 50,
    "fixed storage case"
  );
  assertProof(
    solarStorage.schemaVersion ===
      "retrofi/reopt-solar-storage-proof-v1" &&
      solarStorage.scenarioKind ===
        "retrofi_pvwatts_fixed_solar_storage_pair" &&
      solarStorage.sourceCommit === REOPT_COMMIT &&
      solarStorage.imageDigest === `sha256:${IMAGE_DIGEST}` &&
      solarStorage.networkEnforcement === "DOCKER_NONE" &&
      solarStorage.runtimeUser === "65532:65532",
    "solar-plus-storage execution identity"
  );
  assertProof(
    solarStorage.specSha256 === SOLAR_STORAGE_SPEC.sha256 &&
      solarStorage.pvwattsSeriesFileSha256 ===
        PVWATTS_SERIES.sha256 &&
      solarStorage.pvwattsSeriesSha256 ===
        PVWATTS_SERIES.seriesSha256 &&
      solarStorage.pvwattsInputSha256 ===
        PVWATTS_SERIES.inputSha256 &&
      solarStorage.pvwattsOutputSha256 ===
        PVWATTS_SERIES.outputSha256 &&
      solarStorage.pvwattsAnnualEnergyKwh ===
        solarInputs.annualGenerationKwh,
    "solar-plus-storage input provenance"
  );
  assertProof(
    solarStorage.baseline.status === "optimal" &&
      solarStorage.baseline.terminationStatus === "OPTIMAL" &&
      Number.isFinite(solarStorage.baseline.solverSeconds) &&
      solarStorage.baseline.solverSeconds >= 0 &&
      solarStorage.proposed.status === "optimal" &&
      solarStorage.proposed.terminationStatus === "OPTIMAL" &&
      Number.isFinite(solarStorage.proposed.solverSeconds) &&
      solarStorage.proposed.solverSeconds >= 0 &&
      solarStorage.baseline.annualLoadKwh ===
        solarStorage.proposed.annualLoadKwh,
    "solar-plus-storage pair solver status"
  );
  assertProof(
    solarStorage.proposed.pvCapacityDcKw ===
      solarInputs.pvCapacityDcKw &&
      solarStorage.proposed.storagePowerKw === 4 &&
      solarStorage.proposed.storageNameplateEnergyKwh ===
        solarInputs.storageNameplateEnergyKwh &&
      solarStorage.proposed.pvYearOneEnergyProducedKwh ===
        Math.round(solarInputs.annualGenerationKwh) &&
      Math.abs(
        solarStorage.proposed.pvToLoadKwh +
          solarStorage.proposed.pvToStorageKwh +
          solarStorage.proposed.pvToGridKwh +
          solarStorage.proposed.pvCurtailedKwh -
          solarInputs.annualGenerationKwh
      ) < 0.1 &&
      solarStorage.proposed.pvToStorageKwh > 0 &&
      solarStorage.proposed.storageDischargeKwh > 0 &&
      solarStorage.proposed.gridToStorageKwh === 0 &&
      solarStorage.proposed.storageSocTerminalFraction >=
        solarStorage.inputBoundaries.storageReserveFraction,
    "fixed solar-plus-storage dispatch"
  );
  assertProof(
    solarStorage.outputSha256 ===
      "2bab0bbd1dde3732cb5914d33ac135c2d87feeac518e0af618bfa90bad748e3b",
    "solar-plus-storage deterministic output checksum"
  );
  assertProof(
    solarStorage.formulaBindings.baseline_annual_bill.value ===
      solarStorage.baseline.yearOneBillBeforeTaxUsd &&
      solarStorage.formulaBindings.proposed_annual_bill.value ===
        solarStorage.proposed.yearOneBillBeforeTaxUsd &&
      solarStorage.formulaBindings.baseline_annual_bill.unit ===
        "USD/year" &&
      solarStorage.formulaBindings.proposed_annual_bill.unit ===
        "USD/year" &&
      solarStorage.baseline.yearOneBillBeforeTaxUsd >
        solarStorage.proposed.yearOneBillBeforeTaxUsd,
    "solar-plus-storage canonical bill mappings"
  );
  const billSavings =
    retrofi.baseline.yearOneBillBeforeTaxUsd -
    retrofi.proposed.yearOneBillBeforeTaxUsd;
  assertProof(
    Math.abs(
      billSavings -
      retrofi.metrics.yearOneBillSavingsBeforeTaxUsd
    ) < 1e-9 &&
      billSavings > 0,
    "bill savings arithmetic"
  );
  for (const proof of [official, retrofi, solarStorage]) {
    assertProof(
      proof.packageVersions.Julia === "1.10.4" &&
        proof.packageVersions.HiGHS === "1.12.0" &&
        proof.packageVersions.HiGHS_jll === "1.8.0+0" &&
        proof.packageVersions.JuMP === "1.23.6" &&
        proof.packageVersions.MathOptInterface === "1.34.0",
      "package versions"
    );
  }
  assertProof(
    buildManifest.image.digest === `sha256:${IMAGE_DIGEST}` &&
      buildManifest.image.os === "linux" &&
      buildManifest.image.architecture === "arm64" &&
      buildManifest.image.runtimeUser === "65532:65532",
    "container identity"
  );
  assertProof(
    buildManifest.runtime.juliaPkgOffline === true &&
      buildManifest.proofRuns.every(
        (run) => run.network === "docker-none"
      ),
    "offline runtime enforcement"
  );
}

function validatePvwattsPublication(database, publication) {
  assertProof(
    publication?.artifactId === PVWATTS_LIBRARY_ARTIFACT_ID &&
      publication?.calculationRunId === PVWATTS_CALCULATION_ID,
    "upstream PVWatts publication identity"
  );
  assertExactRow(
    database.prepare(`
      SELECT id, standard_id, process_key, input_sha256, output_sha256,
        network_disabled, status
      FROM calculation_runs
      WHERE id = ?
    `).get(PVWATTS_CALCULATION_ID),
    {
      id: PVWATTS_CALCULATION_ID,
      standard_id: "STD-PVWATTS-V8",
      process_key: "pvwatts_v8",
      input_sha256: PVWATTS_SERIES.inputSha256,
      output_sha256: PVWATTS_SERIES.outputSha256,
      network_disabled: 1,
      status: "SUCCESS"
    },
    "upstream PVWatts calculation"
  );
  assertExactRow(
    database.prepare(`
      SELECT id, sha256, byte_size, official
      FROM source_artifacts
      WHERE id = ?
    `).get(PVWATTS_LIBRARY_ARTIFACT_ID),
    {
      id: PVWATTS_LIBRARY_ARTIFACT_ID,
      sha256: PVWATTS_LIBRARY.sha256,
      byte_size: PVWATTS_LIBRARY.byteSize,
      official: 1
    },
    "upstream PVWatts library artifact"
  );
  const selected = database.prepare(`
    SELECT formula_term, value_json, unit, scope
    FROM selected_values
    WHERE calculation_run_id = ?
  `).get(PVWATTS_CALCULATION_ID);
  assertProof(
    selected?.formula_term === "PV_AC_kWh_t" &&
      selected.unit === "kWh/interval" &&
      selected.scope === "PROFILE",
    "upstream PVWatts selected series"
  );
  let selectedValue;
  try {
    selectedValue = JSON.parse(selected.value_json);
  } catch {
    assertProof(false, "upstream PVWatts selected series JSON");
  }
  assertProof(
    selectedValue.count === 8760 &&
      selectedValue.sha256 === PVWATTS_SERIES.seriesSha256,
    "upstream PVWatts selected series checksum"
  );
  return publication;
}

function registerSolarStorageProvenanceArtifacts(database, {
  solarSpecArtifact,
  pvwattsSeriesArtifact,
  solarEvidenceArtifact,
  buildManifestArtifact,
  buildManifest,
  pvwattsLibraryArtifact,
  pvwattsFixtureArtifact,
  pvwattsResourceArtifact
}) {
  insertImmutableSource(database, {
    id: RETROFI_PROOF_SOURCE_ID,
    standard_id: STANDARD_ID,
    organization: "RetroFi",
    name: "RetroFi bounded REopt solar-storage proof bundle",
    primary_url:
      "https://github.com/green-business-solution/green-business-solution",
    license:
      "Internal research artifacts; upstream component licenses remain authoritative",
    attribution:
      "RetroFi research proof generated from pinned REopt and PVWatts inputs",
    access_mode: "TRACKED_RESEARCH_FIXTURE_AND_MODEL_EVIDENCE"
  });
  insertImmutableRelease(database, {
    id: RETROFI_PROOF_RELEASE_ID,
    source_id: RETROFI_PROOF_SOURCE_ID,
    version: "reopt-solar-storage-proof-v1",
    published_at: null,
    acquired_at: PROOF_TIMESTAMP,
    status: "PUBLISHED",
    schema_version_id: null
  });
  insertImmutableSource(database, {
    id: SSC_FIXTURE_SOURCE_ID,
    standard_id: "STD-PVWATTS-V8",
    organization: "National Laboratory of the Rockies",
    name: "SSC PVWatts official repository fixtures",
    primary_url: "https://github.com/NatLabRockies/ssc",
    license: "BSD-3-Clause",
    attribution:
      "System Advisor Model Simulation Core official repository fixtures",
    access_mode: "PUBLIC_PINNED_GIT_REPOSITORY_FILES"
  });
  insertImmutableRelease(database, {
    id: SSC_FIXTURE_RELEASE_ID,
    source_id: SSC_FIXTURE_SOURCE_ID,
    version:
      "git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2",
    published_at: "2026-07-17T00:00:00.000Z",
    acquired_at: PROOF_TIMESTAMP,
    status: "PUBLISHED",
    schema_version_id: null
  });

  const internalBase = {
    release_id: RETROFI_PROOF_RELEASE_ID,
    acquired_at: PROOF_TIMESTAMP,
    official: 0
  };
  const artifacts = {
    solarStorageSpec: {
      ...internalBase,
      id: SOLAR_STORAGE_SPEC.artifactId,
      source_url:
        `repo://scripts/research/operational-savings/containers/reopt/${SOLAR_STORAGE_SPEC.path}`,
      local_name: SOLAR_STORAGE_SPEC.path,
      media_type: "application/json",
      byte_size: solarSpecArtifact.byteSize,
      sha256: solarSpecArtifact.digest
    },
    pvwattsIntervalSeries: {
      ...internalBase,
      id: PVWATTS_SERIES.artifactId,
      source_url:
        `repo://scripts/research/operational-savings/containers/reopt/${PVWATTS_SERIES.path}`,
      local_name: PVWATTS_SERIES.path,
      media_type: "application/json",
      byte_size: pvwattsSeriesArtifact.byteSize,
      sha256: pvwattsSeriesArtifact.digest
    },
    reoptExecutionEvidence: {
      ...internalBase,
      id: EVIDENCE.solarStorage.artifactId,
      source_url:
        `repo://scripts/research/operational-savings/containers/reopt/${EVIDENCE.solarStorage.path}`,
      local_name: EVIDENCE.solarStorage.path,
      media_type: "application/json",
      byte_size: solarEvidenceArtifact.byteSize,
      sha256: solarEvidenceArtifact.digest
    },
    reoptBuildManifest: {
      ...internalBase,
      id: BUILD_MANIFEST.artifactId,
      source_url:
        `repo://scripts/research/operational-savings/containers/reopt/${BUILD_MANIFEST.path}`,
      local_name: BUILD_MANIFEST.path,
      media_type: "application/json",
      byte_size: buildManifestArtifact.byteSize,
      sha256: buildManifestArtifact.digest
    },
    reoptContainerImage: {
      ...internalBase,
      id: CONTAINER_ARTIFACT_ID,
      source_url: buildManifest.ecr.imageUri,
      local_name: buildManifest.image.repositoryTag,
      media_type: buildManifest.ecr.imageManifestMediaType,
      byte_size: buildManifest.ecr.imageSizeBytes,
      sha256: IMAGE_DIGEST,
      acquired_at: buildManifest.ecr.pushedAt
    },
    pvwattsFixture: {
      id: PVWATTS_FIXTURE.artifactId,
      release_id: SSC_FIXTURE_RELEASE_ID,
      source_url:
        "https://github.com/NatLabRockies/ssc/blob/ba7a7968a115baa0c250597ce2381c7ffb27fbf2/test/input_cases/pvwatts_cases.h",
      local_name: "pvwatts_cases.h",
      media_type: "text/x-c++hdr",
      byte_size: pvwattsFixtureArtifact.byteSize,
      sha256: pvwattsFixtureArtifact.digest,
      acquired_at: PROOF_TIMESTAMP,
      official: 1
    },
    pvwattsResource: {
      id: PVWATTS_RESOURCE.artifactId,
      release_id: SSC_FIXTURE_RELEASE_ID,
      source_url:
        "https://github.com/NatLabRockies/ssc/blob/ba7a7968a115baa0c250597ce2381c7ffb27fbf2/test/input_cases/pvsamv1_data/USA%20AZ%20Phoenix%20(TMY2).csv",
      local_name: "USA AZ Phoenix (TMY2).csv",
      media_type: "text/csv",
      byte_size: pvwattsResourceArtifact.byteSize,
      sha256: pvwattsResourceArtifact.digest,
      acquired_at: PROOF_TIMESTAMP,
      official: 1
    }
  };
  for (const artifact of Object.values(artifacts)) {
    insertImmutableArtifact(database, artifact);
  }
  assertExactRow(
    database.prepare(`
      SELECT id, sha256, byte_size, official
      FROM source_artifacts
      WHERE id = ?
    `).get(PVWATTS_LIBRARY_ARTIFACT_ID),
    {
      id: PVWATTS_LIBRARY_ARTIFACT_ID,
      sha256: pvwattsLibraryArtifact.digest,
      byte_size: pvwattsLibraryArtifact.byteSize,
      official: 1
    },
    "PVWatts model library artifact"
  );
  return {
    ...Object.fromEntries(
      Object.entries(artifacts).map(([role, artifact]) => [
        role,
        artifact.id
      ])
    ),
    pvwattsModelLibrary: PVWATTS_LIBRARY_ARTIFACT_ID
  };
}

function insertImmutableCalculationDependency(database, dependency) {
  database.prepare(`
    INSERT INTO calculation_source_dependencies (
      calculation_run_id, dependency_role, input_calculation_run_id,
      source_artifact_id, source_fields_json, transformation
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(calculation_run_id, dependency_role) DO NOTHING
  `).run(
    dependency.calculation_run_id,
    dependency.dependency_role,
    dependency.input_calculation_run_id,
    dependency.source_artifact_id,
    dependency.source_fields_json,
    dependency.transformation
  );
  assertExactRow(
    database.prepare(`
      SELECT calculation_run_id, dependency_role,
        input_calculation_run_id, source_artifact_id, source_fields_json,
        transformation
      FROM calculation_source_dependencies
      WHERE calculation_run_id = ? AND dependency_role = ?
    `).get(
      dependency.calculation_run_id,
      dependency.dependency_role
    ),
    dependency,
    `calculation dependency ${dependency.calculation_run_id}/${dependency.dependency_role}`
  );
}

function registerSolarStorageCalculationDependencies(database, {
  calculationId,
  scenarioRole,
  artifactIds
}) {
  const evidencePrefix =
    scenarioRole === "baseline" ? "baseline" : "proposed";
  const dependencies = [
    {
      role: "reopt_source_contract",
      artifactId: ARTIFACT_ID,
      sourceFields: ["name", "version", "compat"],
      transformation:
        "Bind the exact REopt.jl package and inspected PV, ElectricStorage, and ElectricTariff field contract."
    },
    {
      role: "solar_storage_input_spec",
      artifactId: artifactIds.solarStorageSpec,
      sourceFields: [
        "timeBasis",
        "site",
        "loadProfile.hourlyKw",
        "tariff.hourlyEnergyRateUsdPerKwh",
        "tariff.monthlyDemandRateUsdPerKw",
        "pv",
        "storage"
      ],
      transformation:
        "Expand the retained 24-hour load and tariff patterns and fixed PV and storage boundaries into the exact 8,760-hour REopt scenario."
    },
    {
      role: "pvwatts_interval_series",
      artifactId: artifactIds.pvwattsIntervalSeries,
      inputCalculationRunId: PVWATTS_CALCULATION_ID,
      sourceFields: [
        "values",
        "seriesSha256",
        "sourceInputSha256",
        "sourceOutputSha256",
        "sourceLibrarySha256",
        "sourceFixtureSha256",
        "sourceResourceSha256"
      ],
      transformation:
        "Divide each upstream PVWatts AC kWh interval by the fixed 4 kW-DC capacity to populate REopt PV.production_factor_series."
    },
    {
      role: "pvwatts_model_library",
      artifactId: artifactIds.pvwattsModelLibrary,
      sourceFields: ["sourceLibrarySha256", "modelVersion"],
      transformation:
        "Retain the exact SSC library identity used by the upstream PVWatts calculation."
    },
    {
      role: "pvwatts_fixture_definition",
      artifactId: artifactIds.pvwattsFixture,
      sourceFields: ["sourceFixtureSha256"],
      transformation:
        "Retain the official PVWatts fixture definition used to construct the upstream calculation input."
    },
    {
      role: "pvwatts_weather_resource",
      artifactId: artifactIds.pvwattsResource,
      sourceFields: ["sourceResourceSha256", "site"],
      transformation:
        "Retain the exact Phoenix TMY2 resource used by the upstream PVWatts calculation."
    },
    {
      role: "reopt_container_image",
      artifactId: artifactIds.reoptContainerImage,
      sourceFields: [
        "imageDigest",
        "runtimeUser",
        "networkEnforcement"
      ],
      transformation:
        "Execute the pinned REopt image digest as the non-root runtime user with Docker networking disabled."
    },
    {
      role: "reopt_build_manifest",
      artifactId: artifactIds.reoptBuildManifest,
      sourceFields: [
        "image.digest",
        "image.runtimeUser",
        "runtime",
        "proofRuns[mode=solar-storage]"
      ],
      transformation:
        "Bind the model source commit, build inputs, package versions, image digest, and offline verification result."
    },
    {
      role: "reopt_execution_evidence",
      artifactId: artifactIds.reoptExecutionEvidence,
      sourceFields: [
        `${evidencePrefix}.inputSha256`,
        `${evidencePrefix}.yearOneBillBeforeTaxUsd`,
        "inputBoundaries",
        "outputSha256"
      ],
      transformation:
        `Select the ${scenarioRole} ElectricTariff year-one bill from the checksum-verified optimal solar-storage execution evidence.`
    }
  ];
  for (const dependency of dependencies) {
    insertImmutableCalculationDependency(database, {
      calculation_run_id: calculationId,
      dependency_role: dependency.role,
      input_calculation_run_id:
        dependency.inputCalculationRunId ?? null,
      source_artifact_id: dependency.artifactId,
      source_fields_json: JSON.stringify(dependency.sourceFields),
      transformation: dependency.transformation
    });
  }
  return dependencies.map(({ role }) => role);
}

function upsertCalculation(database, {
  id,
  processKey,
  inputSha256,
  outputSha256
}) {
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled,
      status, created_at
    ) VALUES (?, ?, ?, ?, ?, 'reopt-container-proof-v1', ?, ?, 1,
      'SUCCEEDED', '2026-07-24T00:00:00.000Z')
    ON CONFLICT(id) DO NOTHING
  `).run(
    id,
    STANDARD_ID,
    processKey,
    RELEASE_ID,
    MODEL_ID,
    inputSha256,
    outputSha256
  );
  assertExactRow(
    database.prepare(`
      SELECT id, standard_id, process_key, source_release_id,
        model_version_id, adapter_version, input_sha256, output_sha256,
        network_disabled, status, created_at
      FROM calculation_runs
      WHERE id = ?
    `).get(id),
    {
      id,
      standard_id: STANDARD_ID,
      process_key: processKey,
      source_release_id: RELEASE_ID,
      model_version_id: MODEL_ID,
      adapter_version: "reopt-container-proof-v1",
      input_sha256: inputSha256,
      output_sha256: outputSha256,
      network_disabled: 1,
      status: "SUCCEEDED",
      created_at: "2026-07-24T00:00:00.000Z"
    },
    `calculation ${id}`
  );
}

function upsertScenarioRun(database, {
  id,
  scenarioRole,
  sourceArtifactId = ARTIFACT_ID,
  sourceInputPath,
  evidencePath,
  evidenceSha256,
  evidenceOutputSha256,
  run
}) {
  database.prepare(`
    INSERT INTO reopt_scenario_runs (
      id, calculation_run_id, source_artifact_id, scenario_role,
      source_input_path, evidence_path, evidence_sha256,
      evidence_output_sha256, expanded_input_sha256,
      termination_status, solver_seconds, network_enforcement,
      julia_version, highs_version, highs_jll_version,
      annual_load_kwh, year_one_energy_cost_before_tax_usd,
      year_one_demand_cost_before_tax_usd,
      year_one_bill_before_tax_usd, storage_power_kw,
      storage_energy_kwh, storage_discharge_kwh,
      storage_soc_series_sha256, storage_discharge_series_sha256
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'DOCKER_NONE',
      '1.10.4', '1.12.0', '1.8.0+0', ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `).run(
    id,
    id,
    sourceArtifactId,
    scenarioRole,
    sourceInputPath,
    evidencePath,
    evidenceSha256,
    evidenceOutputSha256,
    run.inputSha256,
    run.terminationStatus,
    run.solverSeconds,
    run.annualLoadKwh,
    run.yearOneEnergyCostBeforeTaxUsd,
    run.yearOneDemandCostBeforeTaxUsd,
    run.yearOneBillBeforeTaxUsd,
    run.storagePowerKw ?? 0,
    run.storageEnergyKwh ?? 0,
    run.storageDischargeKwh ?? 0,
    run.storageSocSeriesSha256 ?? null,
    run.storageDischargeSeriesSha256 ?? null
  );
  assertExactRow(
    database.prepare(`
      SELECT id, calculation_run_id, source_artifact_id, scenario_role,
        source_input_path, evidence_path, evidence_sha256,
        evidence_output_sha256, expanded_input_sha256, termination_status,
        solver_seconds, network_enforcement, julia_version, highs_version,
        highs_jll_version, annual_load_kwh,
        year_one_energy_cost_before_tax_usd,
        year_one_demand_cost_before_tax_usd,
        year_one_bill_before_tax_usd, storage_power_kw,
        storage_energy_kwh, storage_discharge_kwh,
        storage_soc_series_sha256, storage_discharge_series_sha256
      FROM reopt_scenario_runs
      WHERE id = ?
    `).get(id),
    {
      id,
      calculation_run_id: id,
      source_artifact_id: sourceArtifactId,
      scenario_role: scenarioRole,
      source_input_path: sourceInputPath,
      evidence_path: evidencePath,
      evidence_sha256: evidenceSha256,
      evidence_output_sha256: evidenceOutputSha256,
      expanded_input_sha256: run.inputSha256,
      termination_status: run.terminationStatus,
      solver_seconds: run.solverSeconds,
      network_enforcement: "DOCKER_NONE",
      julia_version: "1.10.4",
      highs_version: "1.12.0",
      highs_jll_version: "1.8.0+0",
      annual_load_kwh: run.annualLoadKwh,
      year_one_energy_cost_before_tax_usd:
        run.yearOneEnergyCostBeforeTaxUsd,
      year_one_demand_cost_before_tax_usd:
        run.yearOneDemandCostBeforeTaxUsd,
      year_one_bill_before_tax_usd: run.yearOneBillBeforeTaxUsd,
      storage_power_kw: run.storagePowerKw ?? 0,
      storage_energy_kwh: run.storageEnergyKwh ?? 0,
      storage_discharge_kwh: run.storageDischargeKwh ?? 0,
      storage_soc_series_sha256:
        run.storageSocSeriesSha256 ?? null,
      storage_discharge_series_sha256:
        run.storageDischargeSeriesSha256 ?? null
    },
    `REopt scenario ${id}`
  );
}

function upsertSavingsSelection(database, retrofi) {
  const calculationId = "calculation:reopt:retrofi-storage:proposed:v1";
  const selectedValueId =
    "selected:reopt:retrofi-storage:year-one-bill-savings:v1";
  const selectionRule =
    "SAME_8760_LOAD_AND_LOCAL_TARIFF_FIXED_25_KW_50_KWH_STORAGE";
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, value_json, unit,
      scope, selection_rule
    ) VALUES (?, ?, 'year_one_bill_savings_before_tax', ?, NULL,
      'USD/year', 'BOUNDED_LOCAL_PROOF_CASE',
      'SAME_8760_LOAD_AND_LOCAL_TARIFF_FIXED_25_KW_50_KWH_STORAGE')
    ON CONFLICT(id) DO NOTHING
  `).run(
    selectedValueId,
    calculationId,
    retrofi.metrics.yearOneBillSavingsBeforeTaxUsd
  );
  assertExactRow(
    database.prepare(`
      SELECT id, calculation_run_id, formula_term, value, value_json, unit,
        scope, selection_rule
      FROM selected_values
      WHERE id = ?
    `).get(selectedValueId),
    {
      id: selectedValueId,
      calculation_run_id: calculationId,
      formula_term: "year_one_bill_savings_before_tax",
      value: retrofi.metrics.yearOneBillSavingsBeforeTaxUsd,
      value_json: null,
      unit: "USD/year",
      scope: "BOUNDED_LOCAL_PROOF_CASE",
      selection_rule: selectionRule
    },
    `selected value ${selectedValueId}`
  );
  const sourceFieldsJson = JSON.stringify({
    baseline: "baseline.yearOneBillBeforeTaxUsd",
    proposed: "proposed.yearOneBillBeforeTaxUsd",
    model: "REopt.jl 0.59.2",
    solver: "HiGHS.jl 1.12.0"
  });
  const filtersJson = JSON.stringify({
    inputSpecSha256: retrofi.inputSpecSha256,
    baselineInputSha256: retrofi.baseline.inputSha256,
    proposedInputSha256: retrofi.proposed.inputSha256,
    networkEnforcement: "DOCKER_NONE"
  });
  const transformation =
    "Subtract the proposed fixed-storage annual bill from the no-storage annual bill while holding the exact 8,760-hour load and local tariff constant.";
  database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json,
      filters_json, transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO NOTHING
  `).run(
    selectedValueId,
    ARTIFACT_ID,
    sourceFieldsJson,
    filtersJson,
    transformation,
    ADAPTER_PATH
  );
  assertExactRow(
    database.prepare(`
      SELECT selected_value_id, source_artifact_id, source_fields_json,
        filters_json, transformation, adapter_path
      FROM selected_value_provenance
      WHERE selected_value_id = ?
    `).get(selectedValueId),
    {
      selected_value_id: selectedValueId,
      source_artifact_id: ARTIFACT_ID,
      source_fields_json: sourceFieldsJson,
      filters_json: filtersJson,
      transformation,
      adapter_path: ADAPTER_PATH
    },
    `selected value provenance ${selectedValueId}`
  );
  return selectedValueId;
}

function upsertSolarStorageBillSelections(
  database,
  solarStorage,
  sourceArtifactId
) {
  const filters = JSON.stringify({
    sourceCommit: REOPT_COMMIT,
    imageDigest: `sha256:${IMAGE_DIGEST}`,
    networkEnforcement: "DOCKER_NONE",
    runtimeUser: "65532:65532",
    specSha256: solarStorage.specSha256,
    pvwattsSeriesFileSha256:
      solarStorage.pvwattsSeriesFileSha256,
    pvwattsSeriesSha256: solarStorage.pvwattsSeriesSha256,
    pvwattsInputSha256: solarStorage.pvwattsInputSha256,
    pvwattsOutputSha256: solarStorage.pvwattsOutputSha256,
    baselineInputSha256: solarStorage.baseline.inputSha256,
    proposedInputSha256: solarStorage.proposed.inputSha256,
    inputBoundaries: solarStorage.inputBoundaries
  });
  const selections = [
    {
      id: "selected:reopt:solar-storage:baseline-annual-bill:v1",
      calculationId:
        "calculation:reopt:solar-storage:baseline:v1",
      formulaTerm: "baseline_annual_bill",
      value: solarStorage.baseline.yearOneBillBeforeTaxUsd,
      role: "baseline",
      sourceField: "ElectricTariff.year_one_bill_before_tax"
    },
    {
      id: "selected:reopt:solar-storage:proposed-annual-bill:v1",
      calculationId:
        "calculation:reopt:solar-storage:proposed:v1",
      formulaTerm: "proposed_annual_bill",
      value: solarStorage.proposed.yearOneBillBeforeTaxUsd,
      role: "proposed",
      sourceField: "ElectricTariff.year_one_bill_before_tax"
    }
  ];
  for (const selection of selections) {
    const selectionRule =
      "SAME_8760_LOAD_TARIFF_AND_TIME_BASIS_FIXED_4_KW_PV_AND_4_KW_8_KWH_USABLE_STORAGE";
    database.prepare(`
      INSERT INTO selected_values (
        id, calculation_run_id, formula_term, value, value_json, unit,
        scope, selection_rule
      ) VALUES (?, ?, ?, ?, NULL, 'USD/year',
        'BOUNDED_SOLAR_PLUS_STORAGE_PROOF_CASE',
        'SAME_8760_LOAD_TARIFF_AND_TIME_BASIS_FIXED_4_KW_PV_AND_4_KW_8_KWH_USABLE_STORAGE')
      ON CONFLICT(id) DO NOTHING
    `).run(
      selection.id,
      selection.calculationId,
      selection.formulaTerm,
      selection.value
    );
    assertExactRow(
      database.prepare(`
        SELECT id, calculation_run_id, formula_term, value, value_json, unit,
          scope, selection_rule
        FROM selected_values
        WHERE id = ?
      `).get(selection.id),
      {
        id: selection.id,
        calculation_run_id: selection.calculationId,
        formula_term: selection.formulaTerm,
        value: selection.value,
        value_json: null,
        unit: "USD/year",
        scope: "BOUNDED_SOLAR_PLUS_STORAGE_PROOF_CASE",
        selection_rule: selectionRule
      },
      `selected value ${selection.id}`
    );
    const sourceFieldsJson = JSON.stringify({
      role: selection.role,
      bill: selection.sourceField,
      load: "ElectricLoad.loads_kw",
      tariff:
        "ElectricTariff.tou_energy_rates_per_kwh and monthly_demand_rates",
      solar:
        "STD-PVWATTS-V8 PV_AC_kWh_t divided by fixed 4 kW-DC capacity",
      storage:
        "ElectricStorage fixed power, converted nameplate energy, efficiencies, initial SOC, and reserve",
      model: "REopt.jl 0.59.2",
      solver: "HiGHS.jl 1.12.0"
    });
    const transformation =
      `Map the ${selection.role} pinned REopt ElectricTariff year-one bill without numeric alteration after enforcing the exact shared hourly load, tariff, site/time basis, and the role-specific no-technology or fixed PV-plus-storage inputs.`;
    database.prepare(`
      INSERT INTO selected_value_provenance (
        selected_value_id, source_artifact_id, source_fields_json,
        filters_json, transformation, adapter_path
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(selected_value_id) DO NOTHING
    `).run(
      selection.id,
      sourceArtifactId,
      sourceFieldsJson,
      filters,
      transformation,
      ADAPTER_PATH
    );
    assertExactRow(
      database.prepare(`
        SELECT selected_value_id, source_artifact_id, source_fields_json,
          filters_json, transformation, adapter_path
        FROM selected_value_provenance
        WHERE selected_value_id = ?
      `).get(selection.id),
      {
        selected_value_id: selection.id,
        source_artifact_id: sourceArtifactId,
        source_fields_json: sourceFieldsJson,
        filters_json: filters,
        transformation,
        adapter_path: ADAPTER_PATH
      },
      `selected value provenance ${selection.id}`
    );
  }
  return selections.map((selection) => selection.id);
}

async function ingestReoptRealProofWithinPublication({
  repoPath,
  pvwattsRepoPath,
  evidenceRoot,
  pvwattsPublication,
  database
}) {
  assertNetworkDisabled();
  validatePvwattsPublication(database, pvwattsPublication);
  const source = await ingestReoptSourceSchema({
    repoPath,
    database
  });
  const [
    officialEvidence,
    retrofiEvidence,
    solarStorageEvidence,
    solarSpecArtifact,
    pvwattsSeriesArtifact,
    buildManifestArtifact,
    pvwattsLibraryArtifact,
    pvwattsFixtureArtifact,
    pvwattsResourceArtifact
  ] = await Promise.all([
    loadPinnedEvidence(evidenceRoot, EVIDENCE.official),
    loadPinnedEvidence(evidenceRoot, EVIDENCE.retrofi),
    loadPinnedEvidence(evidenceRoot, EVIDENCE.solarStorage),
    loadPinnedEvidence(evidenceRoot, SOLAR_STORAGE_SPEC),
    loadPinnedEvidence(evidenceRoot, PVWATTS_SERIES),
    loadPinnedEvidence(evidenceRoot, BUILD_MANIFEST),
    loadPinnedEvidence(repoPath, PVWATTS_LIBRARY),
    loadPinnedEvidence(pvwattsRepoPath, PVWATTS_FIXTURE),
    loadPinnedEvidence(pvwattsRepoPath, PVWATTS_RESOURCE)
  ]);
  const solarInputs = validateReoptSolarStorageInputs({
    spec: solarSpecArtifact.value,
    series: pvwattsSeriesArtifact.value
  });
  const buildManifest = buildManifestArtifact.value;
  const officialScenarioSha256 = await sha256File(
    join(repoPath, "test/scenarios/no_techs.json")
  );
  const inputSpecSha256 = await sha256File(
    join(evidenceRoot, "retrofi-storage-spec.json")
  );
  validateEvidence({
    official: officialEvidence.value,
    retrofi: retrofiEvidence.value,
    solarStorage: solarStorageEvidence.value,
    solarInputs,
    buildManifest,
    officialScenarioSha256,
    inputSpecSha256
  });
  const provenanceArtifactIds =
    registerSolarStorageProvenanceArtifacts(database, {
      solarSpecArtifact,
      pvwattsSeriesArtifact,
      solarEvidenceArtifact: solarStorageEvidence,
      buildManifestArtifact,
      buildManifest,
      pvwattsLibraryArtifact,
      pvwattsFixtureArtifact,
      pvwattsResourceArtifact
    });
  const existingModel = database.prepare(`
    SELECT id, standard_id, package_name, version, commit_sha,
      executable_sha256
    FROM model_versions
    WHERE id = ?
  `).get(MODEL_ID);
  assertProof(
    existingModel?.executable_sha256 === null ||
      existingModel?.executable_sha256 === IMAGE_DIGEST,
    `model ${MODEL_ID} immutable executable identity drift`
  );
  database.prepare(`
    UPDATE model_versions
    SET executable_sha256 = ?
    WHERE id = ? AND executable_sha256 IS NULL
  `).run(IMAGE_DIGEST, MODEL_ID);
  assertExactRow(
    database.prepare(`
      SELECT id, standard_id, package_name, version, commit_sha,
        executable_sha256
      FROM model_versions
      WHERE id = ?
    `).get(MODEL_ID),
    {
      id: MODEL_ID,
      standard_id: STANDARD_ID,
      package_name: "REopt.jl",
      version: "0.59.2",
      commit_sha: REOPT_COMMIT,
      executable_sha256: IMAGE_DIGEST
    },
    `model ${MODEL_ID}`
  );

  const official = officialEvidence.value;
  const retrofi = retrofiEvidence.value;
  const officialId = "calculation:reopt:official-no-techs:v1";
  const baselineId = "calculation:reopt:retrofi-storage:baseline:v1";
  const proposedId = "calculation:reopt:retrofi-storage:proposed:v1";
  upsertCalculation(database, {
    id: officialId,
    processKey: "reopt_official_regression",
    inputSha256: official.inputSha256,
    outputSha256: official.outputSha256
  });
  upsertCalculation(database, {
    id: baselineId,
    processKey: "reopt_local_dispatch_baseline",
    inputSha256: retrofi.baseline.inputSha256,
    outputSha256: sha256Json(retrofi.baseline)
  });
  upsertCalculation(database, {
    id: proposedId,
    processKey: "reopt_local_dispatch_proposed",
    inputSha256: retrofi.proposed.inputSha256,
    outputSha256: sha256Json(retrofi.proposed)
  });
  upsertScenarioRun(database, {
    id: officialId,
    scenarioRole: "OFFICIAL",
    sourceInputPath: official.sourcePath,
    evidencePath: EVIDENCE.official.path,
    evidenceSha256: officialEvidence.digest,
    evidenceOutputSha256: official.outputSha256,
    run: {
      ...official.metrics,
      inputSha256: official.inputSha256,
      terminationStatus: official.terminationStatus,
      solverSeconds: official.solverSeconds
    }
  });
  for (const [id, scenarioRole, run] of [
    [baselineId, "BASELINE", retrofi.baseline],
    [proposedId, "PROPOSED", retrofi.proposed]
  ]) {
    upsertScenarioRun(database, {
      id,
      scenarioRole,
      sourceInputPath: retrofi.inputSpecPath,
      evidencePath: EVIDENCE.retrofi.path,
      evidenceSha256: retrofiEvidence.digest,
      evidenceOutputSha256: retrofi.outputSha256,
      run
    });
  }
  const selectedValueId = upsertSavingsSelection(database, retrofi);
  const solarStorage = solarStorageEvidence.value;
  const solarBaselineId =
    "calculation:reopt:solar-storage:baseline:v1";
  const solarProposedId =
    "calculation:reopt:solar-storage:proposed:v1";
  for (const [id, processKey, run] of [
    [
      solarBaselineId,
      "reopt_solar_plus_storage_baseline",
      solarStorage.baseline
    ],
    [
      solarProposedId,
      "reopt_solar_plus_storage_proposed",
      solarStorage.proposed
    ]
  ]) {
    upsertCalculation(database, {
      id,
      processKey,
      inputSha256: run.inputSha256,
      outputSha256: sha256Json(run)
    });
  }
  upsertScenarioRun(database, {
    id: solarBaselineId,
    scenarioRole: "BASELINE",
    sourceArtifactId:
      provenanceArtifactIds.reoptExecutionEvidence,
    sourceInputPath: solarStorage.specPath,
    evidencePath: EVIDENCE.solarStorage.path,
    evidenceSha256: solarStorageEvidence.digest,
    evidenceOutputSha256: solarStorage.outputSha256,
    run: {
      ...solarStorage.baseline,
      storagePowerKw: 0,
      storageEnergyKwh: 0,
      storageDischargeKwh: 0,
      storageSocSeriesSha256: sha256Json([]),
      storageDischargeSeriesSha256: sha256Json([])
    }
  });
  upsertScenarioRun(database, {
    id: solarProposedId,
    scenarioRole: "PROPOSED",
    sourceArtifactId:
      provenanceArtifactIds.reoptExecutionEvidence,
    sourceInputPath: solarStorage.specPath,
    evidencePath: EVIDENCE.solarStorage.path,
    evidenceSha256: solarStorageEvidence.digest,
    evidenceOutputSha256: solarStorage.outputSha256,
    run: {
      ...solarStorage.proposed,
      storageEnergyKwh:
        solarStorage.proposed.storageNameplateEnergyKwh
    }
  });
  const solarStorageDependencyRoles = {};
  for (const [calculationId, scenarioRole] of [
    [solarBaselineId, "baseline"],
    [solarProposedId, "proposed"]
  ]) {
    solarStorageDependencyRoles[scenarioRole] =
      registerSolarStorageCalculationDependencies(database, {
        calculationId,
        scenarioRole,
        artifactIds: provenanceArtifactIds
      });
  }
  const solarSelectedValueIds =
    upsertSolarStorageBillSelections(
      database,
      solarStorage,
      provenanceArtifactIds.reoptExecutionEvidence
    );
  return {
    ...source,
    modelExecutionStatus: "OPTIMAL",
    imageDigest: `sha256:${IMAGE_DIGEST}`,
    official,
    retrofi,
    solarStorage,
    calculationIds: [
      officialId,
      baselineId,
      proposedId,
      solarBaselineId,
      solarProposedId
    ],
    selectedValueId,
    solarSelectedValueIds,
    solarStorageDependencyRoles,
    provenanceArtifactIds,
    normalizedTargets: [
      ...source.normalizedTargets,
      "source_registry",
      "source_releases",
      "source_artifacts",
      "source_checksums",
      "calculation_runs",
      "calculation_source_dependencies",
      "reopt_scenario_runs",
      "selected_values",
      "selected_value_provenance"
    ]
  };
}

export async function ingestReoptRealProof(options) {
  return withDeferredReleasePublication(
    options.database,
    () => ingestReoptRealProofWithinPublication(options)
  );
}
