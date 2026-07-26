import {
  cp,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  afterAll,
  beforeAll,
  expect,
  test
} from "vitest";

import {
  inspectReoptSourceSchema,
  parseJuliaKwdefStruct,
  parseJuliaMutableStructFields,
  parseJuliaResultKeys,
  REOPT_COMMIT,
  REOPT_FILES,
  schemaFromReoptSources
} from "../adapters/reopt/inspect-schema.mjs";
import {
  ingestReoptRealProof,
  validateReoptSolarStorageInputs
} from "../adapters/reopt/run.mjs";
import { publishSscProof } from "../lib/ssc-publication.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const reoptPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/repos/reopt"
);
const pvwattsPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/repos/ssc"
);
const evidenceRoot = join(
  repoRoot,
  "scripts/research/operational-savings/containers/reopt"
);
const provenanceArtifacts = {
  project:
    "artifact:reopt-jl-project-toml:0.59.2",
  pvwattsModelLibrary: "artifact:pvwatts:ssc-303",
  pvwattsFixture: "artifact:pvwatts:official-fixture",
  pvwattsResource: "artifact:pvwatts:phoenix-tmy2",
  solarStorageSpec:
    "artifact:retrofi:reopt-solar-storage-spec:39c97cf3b30265d68ddfc910b51e6e7dadc4b5a86f9e10447ac1d018ff197a2c",
  pvwattsIntervalSeries:
    "artifact:retrofi:pvwatts-interval-series:d57fd0f03e904bebe7b6056c9e41385fd081eb313b165681c5ca2533bc9c65f0",
  reoptExecutionEvidence:
    "artifact:retrofi:reopt-solar-storage-proof:d47b6ad66e555d0676ebde6e975f08b78c7ab13c123849a3cebaac805f2ae801",
  reoptBuildManifest:
    "artifact:retrofi:reopt-build-manifest:919505d5684c853bf332cf6a73fefce9ddd88d8f518810aed729c565b21b3c8f",
  reoptContainerImage:
    "artifact:retrofi:reopt-container:3f894dad8b57d0b9a4e89d7401b882a17a067b1f4b186b7da155f0aa6d89e717"
};
const dependencyMetadata = {
  pvwatts_fixture_definition: {
    artifactId: provenanceArtifacts.pvwattsFixture,
    sha256:
      "b806b704a8542aa22ab2ad9c06ece19dcd766eee75777b426039b73f23dfaa61",
    inputCalculationId: null,
    sourceFields: ["sourceFixtureSha256"],
    transformation:
      "Retain the official PVWatts fixture definition used to construct the upstream calculation input."
  },
  pvwatts_interval_series: {
    artifactId: provenanceArtifacts.pvwattsIntervalSeries,
    sha256:
      "d57fd0f03e904bebe7b6056c9e41385fd081eb313b165681c5ca2533bc9c65f0",
    inputCalculationId:
      "pvwatts_v8-fb39ece6873f88e42f9584bc",
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
  pvwatts_model_library: {
    artifactId: provenanceArtifacts.pvwattsModelLibrary,
    sha256:
      "db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f",
    inputCalculationId: null,
    sourceFields: ["sourceLibrarySha256", "modelVersion"],
    transformation:
      "Retain the exact SSC library identity used by the upstream PVWatts calculation."
  },
  pvwatts_weather_resource: {
    artifactId: provenanceArtifacts.pvwattsResource,
    sha256:
      "311b8871e989b40d0016f7019dcabc06ebf38e16509c51842fce4bf1e6f8c591",
    inputCalculationId: null,
    sourceFields: ["sourceResourceSha256", "site"],
    transformation:
      "Retain the exact Phoenix TMY2 resource used by the upstream PVWatts calculation."
  },
  reopt_build_manifest: {
    artifactId: provenanceArtifacts.reoptBuildManifest,
    sha256:
      "919505d5684c853bf332cf6a73fefce9ddd88d8f518810aed729c565b21b3c8f",
    inputCalculationId: null,
    sourceFields: [
      "image.digest",
      "image.runtimeUser",
      "runtime",
      "proofRuns[mode=solar-storage]"
    ],
    transformation:
      "Bind the model source commit, build inputs, package versions, image digest, and offline verification result."
  },
  reopt_container_image: {
    artifactId: provenanceArtifacts.reoptContainerImage,
    sha256:
      "3f894dad8b57d0b9a4e89d7401b882a17a067b1f4b186b7da155f0aa6d89e717",
    inputCalculationId: null,
    sourceFields: [
      "imageDigest",
      "runtimeUser",
      "networkEnforcement"
    ],
    transformation:
      "Execute the pinned REopt image digest as the non-root runtime user with Docker networking disabled."
  },
  reopt_source_contract: {
    artifactId: provenanceArtifacts.project,
    sha256:
      "f67d05bba64f2d17f3bdb8944e1b17b3713e1de8b87ba8e52a5c742c3737a0c6",
    inputCalculationId: null,
    sourceFields: ["name", "version", "compat"],
    transformation:
      "Bind the exact REopt.jl package and inspected PV, ElectricStorage, and ElectricTariff field contract."
  },
  solar_storage_input_spec: {
    artifactId: provenanceArtifacts.solarStorageSpec,
    sha256:
      "39c97cf3b30265d68ddfc910b51e6e7dadc4b5a86f9e10447ac1d018ff197a2c",
    inputCalculationId: null,
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
  }
};

let database;
let temporaryRoot;
let ingestion;
let pvwattsPublication;
let pvwattsProof;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(
    join(tmpdir(), "retrofi-reopt-source-")
  );
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  pvwattsProof = JSON.parse(
    await readFile(
      join(
        repoRoot,
        "scripts/research/operational-savings/adapters/pvwatts/proof.json"
      ),
      "utf8"
    )
  );
  pvwattsPublication = publishSscProof(database, pvwattsProof);
  ingestion = await ingestReoptRealProof({
    repoPath: reoptPath,
    pvwattsRepoPath: pvwattsPath,
    evidenceRoot,
    pvwattsPublication,
    database
  });
});

afterAll(async () => {
  database?.close();
  if (temporaryRoot) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("pins the official REopt commit and exact source-file checksums", () => {
  expect(ingestion.schema.commitSha).toBe(REOPT_COMMIT);
  expect(ingestion.schema.packageMetadata).toEqual({
    name: "REopt",
    uuid: "d36ad4e8-d74a-4f7a-ace1-eaea049febf6",
    version: "0.59.2"
  });
  expect(ingestion.schema.fileChecksums).toEqual(
    Object.fromEntries(
      Object.entries(REOPT_FILES).map(([key, file]) => [
        key,
        {
          path: file.path,
          sha256: file.sha256
        }
      ])
    )
  );
});

test("extracts exact ElectricStorage, PV, and result keys", () => {
  expect(ingestion.schema.electricStorageInputs).toHaveLength(39);
  expect(
    ingestion.schema.electricStorageInputs.find(
      (field) => field.name === "charge_efficiency"
    )
  ).toEqual({
    name: "charge_efficiency",
    juliaType: "Float64",
    defaultExpression:
      "rectifier_efficiency_fraction * internal_efficiency_fraction^0.5"
  });
  expect(ingestion.schema.electricTariffResultKeys).toContain(
    "year_one_bill_before_tax"
  );
  expect(ingestion.schema.electricStorageResultKeys).toEqual(
    expect.arrayContaining([
      "size_kw",
      "size_kwh",
      "soc_series_fraction",
      "storage_to_load_series_kw"
    ])
  );
  expect(ingestion.schema.pvInputs).toEqual(
    expect.arrayContaining([
      "min_kw",
      "max_kw",
      "production_factor_series",
      "can_net_meter",
      "can_wholesale",
      "can_export_beyond_nem_limit",
      "can_curtail"
    ])
  );
  expect(ingestion.schema.pvResultKeys).toEqual(
    expect.arrayContaining([
      "size_kw",
      "year_one_energy_produced_kwh",
      "electric_to_load_series_kw",
      "electric_to_storage_series_kw",
      "production_factor_series"
    ])
  );
  expect(ingestion.modelExecutionStatus).toBe("OPTIMAL");
});

test("publishes exact offline official, baseline, and proposed runs", () => {
  expect(
    database.prepare(`
      SELECT package_name AS packageName, version, commit_sha AS commitSha,
        executable_sha256 AS executableSha256
      FROM model_versions
      WHERE id = 'model:reopt-jl:0.59.2'
    `).get()
  ).toEqual({
    packageName: "REopt.jl",
    version: "0.59.2",
    commitSha: REOPT_COMMIT,
    executableSha256:
      "3f894dad8b57d0b9a4e89d7401b882a17a067b1f4b186b7da155f0aa6d89e717"
  });
  expect(
    database.prepare(`
      SELECT scenario_role AS scenarioRole, termination_status AS status,
        network_enforcement AS networkEnforcement,
        annual_load_kwh AS annualLoadKwh,
        year_one_bill_before_tax_usd AS bill,
        storage_power_kw AS storagePowerKw,
        storage_energy_kwh AS storageEnergyKwh
      FROM reopt_scenario_runs
      WHERE id IN (
        'calculation:reopt:official-no-techs:v1',
        'calculation:reopt:retrofi-storage:baseline:v1',
        'calculation:reopt:retrofi-storage:proposed:v1'
      )
      ORDER BY CASE scenario_role
        WHEN 'OFFICIAL' THEN 1
        WHEN 'BASELINE' THEN 2
        ELSE 3
      END
    `).all()
  ).toEqual([
    {
      scenarioRole: "OFFICIAL",
      status: "OPTIMAL",
      networkEnforcement: "DOCKER_NONE",
      annualLoadKwh: 10000,
      bill: 1136.99,
      storagePowerKw: 0,
      storageEnergyKwh: 0
    },
    {
      scenarioRole: "BASELINE",
      status: "OPTIMAL",
      networkEnforcement: "DOCKER_NONE",
      annualLoadKwh: 439460,
      bill: 89827,
      storagePowerKw: 0,
      storageEnergyKwh: 0
    },
    {
      scenarioRole: "PROPOSED",
      status: "OPTIMAL",
      networkEnforcement: "DOCKER_NONE",
      annualLoadKwh: 439460,
      bill: 84032.2,
      storagePowerKw: 25,
      storageEnergyKwh: 50
    }
  ]);
  expect(
    database.prepare(`
      SELECT value, unit, scope
      FROM selected_values
      WHERE id =
        'selected:reopt:retrofi-storage:year-one-bill-savings:v1'
    `).get()
  ).toEqual({
    value: 5794.800000000003,
    unit: "USD/year",
    scope: "BOUNDED_LOCAL_PROOF_CASE"
  });
  expect(ingestion.official.metrics).toMatchObject({
    yearOneEnergyCostBeforeTaxUsd: 1000,
    yearOneDemandCostBeforeTaxUsd: 136.99
  });
});

test("publishes the exact solar-plus-storage bill pair and provenance", () => {
  expect(ingestion.solarStorage).toMatchObject({
    sourceCommit: REOPT_COMMIT,
    imageDigest:
      "sha256:3f894dad8b57d0b9a4e89d7401b882a17a067b1f4b186b7da155f0aa6d89e717",
    networkEnforcement: "DOCKER_NONE",
    runtimeUser: "65532:65532",
    baseline: {
      status: "optimal",
      yearOneBillBeforeTaxUsd: 89827
    },
    proposed: {
      status: "optimal",
      yearOneBillBeforeTaxUsd: 87586.78,
      pvCapacityDcKw: 4,
      storagePowerKw: 4,
      storageNameplateEnergyKwh: 10,
      gridToStorageKwh: 0
    }
  });
  expect(
    database.prepare(`
      SELECT id, scenario_role AS scenarioRole,
        year_one_bill_before_tax_usd AS bill,
        storage_power_kw AS storagePowerKw,
        storage_energy_kwh AS storageEnergyKwh
      FROM reopt_scenario_runs
      WHERE id LIKE 'calculation:reopt:solar-storage:%'
      ORDER BY id
    `).all()
  ).toEqual([
    {
      id: "calculation:reopt:solar-storage:baseline:v1",
      scenarioRole: "BASELINE",
      bill: 89827,
      storagePowerKw: 0,
      storageEnergyKwh: 0
    },
    {
      id: "calculation:reopt:solar-storage:proposed:v1",
      scenarioRole: "PROPOSED",
      bill: 87586.78,
      storagePowerKw: 4,
      storageEnergyKwh: 10
    }
  ]);
  expect(
    database.prepare(`
      SELECT id, formula_term AS formulaTerm, value, unit, scope
      FROM selected_values
      WHERE id LIKE 'selected:reopt:solar-storage:%'
      ORDER BY id
    `).all()
  ).toEqual([
    {
      id: "selected:reopt:solar-storage:baseline-annual-bill:v1",
      formulaTerm: "baseline_annual_bill",
      value: 89827,
      unit: "USD/year",
      scope: "BOUNDED_SOLAR_PLUS_STORAGE_PROOF_CASE"
    },
    {
      id: "selected:reopt:solar-storage:proposed-annual-bill:v1",
      formulaTerm: "proposed_annual_bill",
      value: 87586.78,
      unit: "USD/year",
      scope: "BOUNDED_SOLAR_PLUS_STORAGE_PROOF_CASE"
    }
  ]);
  const provenance = database.prepare(`
    SELECT source_artifact_id AS sourceArtifactId,
      source_fields_json AS sourceFields,
      filters_json AS filters
    FROM selected_value_provenance
    WHERE selected_value_id =
      'selected:reopt:solar-storage:proposed-annual-bill:v1'
  `).get();
  expect(provenance.sourceArtifactId).toBe(
    provenanceArtifacts.reoptExecutionEvidence
  );
  expect(JSON.parse(provenance.sourceFields)).toMatchObject({
    bill: "ElectricTariff.year_one_bill_before_tax",
    solar:
      "STD-PVWATTS-V8 PV_AC_kWh_t divided by fixed 4 kW-DC capacity",
    model: "REopt.jl 0.59.2",
    solver: "HiGHS.jl 1.12.0"
  });
  expect(JSON.parse(provenance.filters)).toMatchObject({
    networkEnforcement: "DOCKER_NONE",
    runtimeUser: "65532:65532",
    pvwattsSeriesSha256:
      "a842a7a51583fca8b7c559a1ed12b16aa9d396ec7c6b92dbfabfc282dbaf0f1c",
    inputBoundaries: {
      intervalCount: 8760,
      pvCapacityDcKw: 4,
      storageUsableEnergyKwh: 8,
      storageReserveFraction: 0.2,
      canGridCharge: false
    }
  });
});

test("registers exact material artifacts and typed solar-storage dependencies", () => {
  const artifactIds = Object.values(provenanceArtifacts);
  const artifactRows = database.prepare(`
    SELECT id, sha256, byte_size AS byteSize, official
    FROM source_artifacts
    WHERE id IN (${artifactIds.map(() => "?").join(", ")})
    ORDER BY id
  `).all(...artifactIds);
  expect(artifactRows).toEqual([
    {
      id: provenanceArtifacts.pvwattsModelLibrary,
      sha256:
        "db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f",
      byteSize: 37852576,
      official: 1
    },
    {
      id: provenanceArtifacts.pvwattsFixture,
      sha256:
        "b806b704a8542aa22ab2ad9c06ece19dcd766eee75777b426039b73f23dfaa61",
      byteSize: 3419,
      official: 1
    },
    {
      id: provenanceArtifacts.pvwattsResource,
      sha256:
        "311b8871e989b40d0016f7019dcabc06ebf38e16509c51842fce4bf1e6f8c591",
      byteSize: 501341,
      official: 1
    },
    {
      id: provenanceArtifacts.reoptBuildManifest,
      sha256:
      "919505d5684c853bf332cf6a73fefce9ddd88d8f518810aed729c565b21b3c8f",
      byteSize: 9921,
      official: 0
    },
    {
      id: provenanceArtifacts.reoptContainerImage,
      sha256:
        "3f894dad8b57d0b9a4e89d7401b882a17a067b1f4b186b7da155f0aa6d89e717",
      byteSize: 606085102,
      official: 0
    },
    {
      id: provenanceArtifacts.reoptExecutionEvidence,
      sha256:
        "d47b6ad66e555d0676ebde6e975f08b78c7ab13c123849a3cebaac805f2ae801",
      byteSize: 3273,
      official: 0
    },
    {
      id: provenanceArtifacts.solarStorageSpec,
      sha256:
        "39c97cf3b30265d68ddfc910b51e6e7dadc4b5a86f9e10447ac1d018ff197a2c",
      byteSize: 1698,
      official: 0
    },
    {
      id: provenanceArtifacts.pvwattsIntervalSeries,
      sha256:
        "d57fd0f03e904bebe7b6056c9e41385fd081eb313b165681c5ca2533bc9c65f0",
      byteSize: 96046,
      official: 0
    },
    {
      id: provenanceArtifacts.project,
      sha256:
        "f67d05bba64f2d17f3bdb8944e1b17b3713e1de8b87ba8e52a5c742c3737a0c6",
      byteSize: 1693,
      official: 1
    }
  ].sort((left, right) => left.id.localeCompare(right.id)));

  const dependencies = database.prepare(`
    SELECT d.calculation_run_id AS calculationId,
      d.dependency_role AS role,
      d.input_calculation_run_id AS inputCalculationId,
      d.source_artifact_id AS artifactId,
      a.sha256,
      d.source_fields_json AS sourceFields,
      d.transformation
    FROM calculation_source_dependencies d
    JOIN source_artifacts a ON a.id = d.source_artifact_id
    WHERE d.calculation_run_id IN (
      'calculation:reopt:solar-storage:baseline:v1',
      'calculation:reopt:solar-storage:proposed:v1'
    )
    ORDER BY d.calculation_run_id, d.dependency_role
  `).all();
  expect(dependencies).toHaveLength(18);
  expect(
    ingestion.solarStorageDependencyRoles
  ).toEqual({
    baseline: [
      "reopt_source_contract",
      "solar_storage_input_spec",
      "pvwatts_interval_series",
      "pvwatts_model_library",
      "pvwatts_fixture_definition",
      "pvwatts_weather_resource",
      "reopt_container_image",
      "reopt_build_manifest",
      "reopt_execution_evidence"
    ],
    proposed: [
      "reopt_source_contract",
      "solar_storage_input_spec",
      "pvwatts_interval_series",
      "pvwatts_model_library",
      "pvwatts_fixture_definition",
      "pvwatts_weather_resource",
      "reopt_container_image",
      "reopt_build_manifest",
      "reopt_execution_evidence"
    ]
  });
  for (const dependency of dependencies) {
    if (dependency.role === "reopt_execution_evidence") {
      const scenarioRole = dependency.calculationId.includes(
        ":baseline:"
      )
        ? "baseline"
        : "proposed";
      expect(dependency).toMatchObject({
        inputCalculationId: null,
        artifactId: provenanceArtifacts.reoptExecutionEvidence,
        sha256:
          "d47b6ad66e555d0676ebde6e975f08b78c7ab13c123849a3cebaac805f2ae801",
        transformation:
          `Select the ${scenarioRole} ElectricTariff year-one bill from the checksum-verified optimal solar-storage execution evidence.`
      });
      expect(JSON.parse(dependency.sourceFields)).toEqual([
        `${scenarioRole}.inputSha256`,
        `${scenarioRole}.yearOneBillBeforeTaxUsd`,
        "inputBoundaries",
        "outputSha256"
      ]);
      continue;
    }
    const expected = dependencyMetadata[dependency.role];
    expect(expected).toBeDefined();
    expect(dependency).toMatchObject({
      inputCalculationId: expected.inputCalculationId,
      artifactId: expected.artifactId,
      sha256: expected.sha256,
      transformation: expected.transformation
    });
    expect(JSON.parse(dependency.sourceFields)).toEqual(
      expected.sourceFields
    );
  }
});

test("fails missing structs, missing result keys, and changed package identity", async () => {
  expect(() =>
    parseJuliaKwdefStruct(
      "Base.@kwdef struct SomethingElse\nx::Real = 1\nend\n",
      "ElectricStorageDefaults"
    )
  ).toThrow(/SOURCE_SCHEMA_DRIFT.*ElectricStorageDefaults/);
  expect(
    parseJuliaResultKeys('r["one"] = 1\nr["one"] = 2\n')
  ).toEqual(["one"]);
  expect(() =>
    parseJuliaMutableStructFields(
      "mutable struct SomethingElse\nfield\n    function SomethingElse(;\n",
      "PV"
    )
  ).toThrow(/SOURCE_SCHEMA_DRIFT.*PV/);

  const sources = Object.fromEntries(
    await Promise.all(
      Object.entries(REOPT_FILES).map(async ([key, file]) => [
        key,
        await readFile(join(reoptPath, file.path), "utf8")
      ])
    )
  );
  expect(() =>
    schemaFromReoptSources({
      projectSource: sources.project.replace(
        'version = "0.59.2"',
        'version = "0.60.0"'
      ),
      storageSource: sources.electricStorage,
      pvSource: sources.pv,
      tariffResultsSource: sources.electricTariffResults,
      storageResultsSource: sources.electricStorageResults,
      pvResultsSource: sources.pvResults,
      scenarioSource: sources.scenario,
      fileChecksums: {}
    })
  ).toThrow(/SOURCE_SCHEMA_DRIFT: REopt package identity/);
  expect(() =>
    schemaFromReoptSources({
      projectSource: sources.project,
      storageSource: sources.electricStorage,
      pvSource: sources.pv,
      tariffResultsSource: sources.electricTariffResults.replaceAll(
        "year_one_bill_before_tax",
        "removed_bill_result"
      ),
      storageResultsSource: sources.electricStorageResults,
      pvResultsSource: sources.pvResults,
      scenarioSource: sources.scenario,
      fileChecksums: {}
    })
  ).toThrow(/SOURCE_SCHEMA_DRIFT.*year_one_bill_before_tax/);
});

test("fails closed outside the exact solar-plus-storage input boundaries", async () => {
  const [spec, series] = await Promise.all([
    readFile(
      join(evidenceRoot, "retrofi-solar-storage-spec.json"),
      "utf8"
    ).then(JSON.parse),
    readFile(
      join(evidenceRoot, "pvwatts-interval-series.json"),
      "utf8"
    ).then(JSON.parse)
  ]);
  expect(
    validateReoptSolarStorageInputs({ spec, series })
  ).toMatchObject({
    intervalCount: 8760,
    pvCapacityDcKw: 4,
    storageNameplateEnergyKwh: 10
  });
  for (const mutate of [
    (copy) => {
      copy.spec.timeBasis.observesDaylightSavingTime = true;
    },
    (copy) => {
      copy.spec.storage.canGridCharge = true;
    },
    (copy) => {
      copy.spec.storage.initialSocFraction = 0.1;
    },
    (copy) => {
      copy.series.site.timeZone = "America/Los_Angeles";
    },
    (copy) => {
      copy.series.values[100] = 5;
    },
    (copy) => {
      copy.series.values.pop();
    },
    (copy) => {
      delete copy.spec.storage;
    }
  ]) {
    const copy = structuredClone({ spec, series });
    mutate(copy);
    expect(() =>
      validateReoptSolarStorageInputs(copy)
    ).toThrow(/REOPT_SOLAR_STORAGE_INPUT_INVALID/);
  }
});

test("requires offline mode and never calls fetch", async () => {
  const previousNetwork = process.env.OS_RESEARCH_NETWORK;
  const previousFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("network must not be called");
  };
  try {
    process.env.OS_RESEARCH_NETWORK = "enabled";
    await expect(
      ingestReoptRealProof({
        repoPath: reoptPath,
        pvwattsRepoPath: pvwattsPath,
        evidenceRoot,
        pvwattsPublication,
        database
      })
    ).rejects.toThrow(/OFFLINE_GUARD_REQUIRED/);
    await expect(
      inspectReoptSourceSchema(reoptPath)
    ).resolves.toMatchObject({
      commitSha: REOPT_COMMIT
    });
    expect(fetchCalls).toBe(0);
  } finally {
    process.env.OS_RESEARCH_NETWORK = previousNetwork;
    globalThis.fetch = previousFetch;
  }
});

test("rejects mutated run evidence before database publication", async () => {
  const mutatedRoot = join(temporaryRoot, "mutated-evidence");
  await cp(evidenceRoot, mutatedRoot, { recursive: true });
  const official = JSON.parse(
    await readFile(join(mutatedRoot, "official-proof.json"), "utf8")
  );
  official.metrics.yearOneEnergyCostBeforeTaxUsd = 999;
  await writeFile(
    join(mutatedRoot, "official-proof.json"),
    `${JSON.stringify(official)}\n`,
    "utf8"
  );
  await expect(
    ingestReoptRealProof({
      repoPath: reoptPath,
      pvwattsRepoPath: pvwattsPath,
      evidenceRoot: mutatedRoot,
      pvwattsPublication,
      database
    })
  ).rejects.toThrow(/REOPT_PROOF_INVALID.*checksum/);
});

test(
  "fails closed instead of rewriting immutable artifact or calculation identities",
  async () => {
    const cases = [
      {
        name: "artifact",
        trigger: "immutable_source_artifacts_update",
        triggerError: "IMMUTABLE_ROW_UPDATE: source_artifacts",
        mutate(testDatabase) {
          testDatabase.prepare(`
            UPDATE source_artifacts
            SET sha256 = ?
            WHERE id = ?
          `).run(
            "0".repeat(64),
            provenanceArtifacts.solarStorageSpec
          );
        },
        read(testDatabase) {
          return testDatabase.prepare(`
            SELECT sha256
            FROM source_artifacts
            WHERE id = ?
          `).get(provenanceArtifacts.solarStorageSpec).sha256;
        },
        expected: "0".repeat(64),
        error: /source artifact .* immutable identity drift/
      },
      {
        name: "calculation",
        trigger: "immutable_calculation_runs_update",
        triggerError: "IMMUTABLE_ROW_UPDATE: calculation_runs",
        mutate(testDatabase) {
          testDatabase.prepare(`
            UPDATE calculation_runs
            SET input_sha256 = ?
            WHERE id =
              'calculation:reopt:solar-storage:baseline:v1'
          `).run("0".repeat(64));
        },
        read(testDatabase) {
          return testDatabase.prepare(`
            SELECT input_sha256 AS inputSha256
            FROM calculation_runs
            WHERE id =
              'calculation:reopt:solar-storage:baseline:v1'
          `).get().inputSha256;
        },
        expected: "0".repeat(64),
        error: /calculation .* immutable identity drift/
      }
    ];
    for (const mutationCase of cases) {
      const caseDatabase = await openResearchDatabase(
        join(
          temporaryRoot,
          `immutable-${mutationCase.name}.sqlite`
        ),
        { deferReleasePublicationUntilClose: true }
      );
      try {
        const publication = publishSscProof(
          caseDatabase,
          pvwattsProof
        );
        await ingestReoptRealProof({
          repoPath: reoptPath,
          pvwattsRepoPath: pvwattsPath,
          evidenceRoot,
          pvwattsPublication: publication,
          database: caseDatabase
        });
        const original = mutationCase.read(caseDatabase);
        expect(() =>
          mutationCase.mutate(caseDatabase)
        ).toThrow(mutationCase.triggerError);
        expect(mutationCase.read(caseDatabase)).toBe(original);

        caseDatabase.exec(
          `DROP TRIGGER ${mutationCase.trigger}`
        );
        mutationCase.mutate(caseDatabase);
        await expect(
          ingestReoptRealProof({
            repoPath: reoptPath,
            pvwattsRepoPath: pvwattsPath,
            evidenceRoot,
            pvwattsPublication: publication,
            database: caseDatabase
          })
        ).rejects.toThrow(mutationCase.error);
        expect(mutationCase.read(caseDatabase)).toBe(
          mutationCase.expected
        );
      } finally {
        caseDatabase.close();
      }
    }
  },
  30_000
);
