import { spawnSync } from "node:child_process";
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
import { afterAll, expect, test } from "vitest";

const operationalRoot = fileURLToPath(new URL("../", import.meta.url));
const temporaryDirectories = [];
const expectedVersion = 303;
const expectedBuild = "OS X 64 bit GNU/C++ Jul 24 2025 02:28:37";
const expectedLibrarySha256 =
  "db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f";

const cases = [
  {
    slug: "pvwatts",
    standardId: "STD-PVWATTS-V8",
    module: "pvwattsv8",
    formulaTerm: "PV_AC_kWh_t",
    annualEnergyKwh: 7043.197332586382,
    seriesSha256:
      "a842a7a51583fca8b7c559a1ed12b16aa9d396ec7c6b92dbfabfc282dbaf0f1c",
    nativeInput: "system_capacity",
    nativeOutput: "annual_energy"
  },
  {
    slug: "sam-solar-thermal",
    standardId: "STD-SAM-SOLAR-THERMAL",
    module: "swh",
    formulaTerm: "SAM_output",
    annualEnergyKwh: 2362.5011296263892,
    seriesSha256:
      "0e11aaf3c00536d39a06d15a504f71123f9ae7d7ae8db036369647ea5b15a2af",
    nativeInput: "scaled_draw",
    nativeOutput: "annual_Q_deliv"
  },
  {
    slug: "wind-sam",
    standardId: "STD-WIND-SAM",
    module: "windpower",
    formulaTerm: "wind_kWh_t",
    annualEnergyKwh: 33224152.70423391,
    seriesSha256:
      "9810d820d7f091b4d8439f64c0a51d062b58bd6bf153e8801dccc3a0df69012a",
    nativeInput: "wind_turbine_powercurve_powerout",
    nativeOutput: "annual_wake_loss_internal_percent"
  }
];

function runAdapter(slug, args = []) {
  const adapter = join(operationalRoot, "adapters", slug, "run.mjs");
  return spawnSync(process.execPath, [adapter, ...args], {
    cwd: fileURLToPath(new URL("../../../../", import.meta.url)),
    encoding: "utf8",
    env: {
      ...process.env,
      OS_RESEARCH_NETWORK: "disabled"
    },
    maxBuffer: 32 * 1024 * 1024
  });
}

function requireSuccessfulProof(slug, args = []) {
  const result = runAdapter(slug, args);
  expect(result.status, result.stderr).toBe(0);
  expect(result.stderr).toBe("");
  return JSON.parse(result.stdout);
}

function expectApproximately(actual, expected) {
  const tolerance = Math.max(1e-6, Math.abs(expected) * 1e-11);
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
}

afterAll(async () => {
  await Promise.all(
    temporaryDirectories.map((path) =>
      rm(path, { recursive: true, force: true })
    )
  );
});

for (const modelCase of cases) {
  test(
    `${modelCase.standardId} executes a real pinned local SSC model deterministically`,
    async () => {
      const first = requireSuccessfulProof(modelCase.slug);
      const second = requireSuccessfulProof(modelCase.slug);
      const manifest = JSON.parse(
        await readFile(
          join(operationalRoot, "adapters", modelCase.slug, "proof.json"),
          "utf8"
        )
      );

      expect(second).toEqual(first);
      expect(first).toEqual(manifest);
      expect(first.proofStatus).toBe("REAL_SOURCE_BACKED");
      expect(first.standardProofStatus).toBe("REAL_SOURCE_PARTIAL");
      expect(first.standardId).toBe(modelCase.standardId);
      expect(first.execution.status).toBe("SUCCESS");
      expect(first.execution.networkMode).toBe("OFFLINE_LOCAL_FILES_ONLY");
      expect(first.execution.networkDisabled).toBe(true);
      expect(first.execution.networkIsolation).toBe(
        "macOS sandbox-exec profile: deny network*"
      );
      expect(first.execution.networkProbe).toEqual({
        target: "127.0.0.1:9",
        result: "BLOCKED_EPERM"
      });
      expect(first.sourceIdentity.library.sscVersion).toBe(expectedVersion);
      expect(first.sourceIdentity.library.buildInfo).toBe(expectedBuild);
      expect(first.sourceIdentity.library.sha256).toBe(
        expectedLibrarySha256
      );
      expect(first.sourceIdentity.fixture.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(first.sourceIdentity.resources.length).toBeGreaterThan(0);
      for (const resource of first.sourceIdentity.resources) {
        expect(resource.sha256).toMatch(/^[a-f0-9]{64}$/);
      }

      expect(first.nativeModelInterface.module).toBe(modelCase.module);
      expect(
        first.nativeModelInterface.variables.some(
          (variable) =>
            variable.name === modelCase.nativeInput &&
            ["INPUT", "INOUT"].includes(variable.varType)
        )
      ).toBe(true);
      expect(
        first.nativeModelInterface.variables.some(
          (variable) =>
            variable.name === modelCase.nativeOutput &&
            ["OUTPUT", "INOUT"].includes(variable.varType)
        )
      ).toBe(true);
      expect(first.nativeModelInterface.schemaFingerprintSha256).toMatch(
        /^[a-f0-9]{64}$/
      );

      expectApproximately(
        first.normalizedOutput.annualEnergy.value,
        modelCase.annualEnergyKwh
      );
      expect(first.normalizedOutput.annualEnergy.unit).toBe("kWh");
      expect(first.normalizedOutput.intervalEnergy.count).toBe(8760);
      expect(first.normalizedOutput.intervalEnergy.intervalHours).toBe(1);
      expect(first.normalizedOutput.intervalEnergy.sha256).toBe(
        modelCase.seriesSha256
      );
      expect(
        first.normalizedOutput.intervalEnergy.matchesAnnualEnergy
      ).toBe(true);
      expectApproximately(
        first.normalizedOutput.intervalEnergy.annualSumKwh,
        modelCase.annualEnergyKwh
      );
      expect(first.formulaBinding.formulaTerm).toBe(modelCase.formulaTerm);
      expect(first.execution.inputSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(first.execution.outputSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(first.proofSha256).toMatch(/^[a-f0-9]{64}$/);
    },
    30_000
  );
}

for (const modelCase of cases) {
  test(
    `${modelCase.standardId} rejects a caller model-version mismatch`,
    () => {
      const result = runAdapter(modelCase.slug, [
        "--require-version",
        "304"
      ]);

      expect(result.status).toBe(2);
      expect(result.stdout).toBe("");
      expect(result.stderr).toContain("SSC_VERSION_MISMATCH");
      expect(result.stderr).toContain("pinned to SSC 303");
    }
  );
}

for (const modelCase of cases.filter(
  (candidate) => candidate.formulaTerm !== "SAM_output"
)) {
  test(
    `${modelCase.standardId} can return every interval formula input`,
    () => {
      const proof = requireSuccessfulProof(modelCase.slug, [
        "--include-series"
      ]);
      const series = proof.normalizedOutput.intervalEnergy;

      expect(series.values).toHaveLength(8760);
      expect(series.sha256).toBe(modelCase.seriesSha256);
      expectApproximately(
        series.values.reduce((sum, value) => sum + value, 0),
        modelCase.annualEnergyKwh
      );
      expect(proof.formulaBinding.value.valuesIncluded).toBe(true);
      expect(proof.publicationRows.selectedSeries.valuesIncluded).toBe(true);
    },
    30_000
  );
}

test("SSC model execution rejects a caller model-version mismatch", () => {
  const result = runAdapter("pvwatts", ["--require-version", "304"]);

  expect(result.status).toBe(2);
  expect(result.stdout).toBe("");
  expect(result.stderr).toContain("SSC_VERSION_MISMATCH");
  expect(result.stderr).toContain("pinned to SSC 303");
});

test(
  "SSC model execution rejects a checksum-corrupted official resource",
  async () => {
    const temporaryDirectory = await mkdtemp(
      join(tmpdir(), "retrofi-ssc-checksum-")
    );
    temporaryDirectories.push(temporaryDirectory);
    const sourcePath = join(
      operationalRoot,
      ".cache",
      "repos",
      "ssc",
      "test",
      "input_cases",
      "pvsamv1_data",
      "USA AZ Phoenix (TMY2).csv"
    );
    const corruptPath = join(temporaryDirectory, "corrupt-weather.csv");
    await copyFile(sourcePath, corruptPath);
    const bytes = await readFile(corruptPath);
    bytes[bytes.length - 1] ^= 1;
    await writeFile(corruptPath, bytes);

    const result = runAdapter("pvwatts", ["--resource", corruptPath]);

    expect(result.status).toBe(2);
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain("CORRUPT_CHECKSUM");
    expect(result.stderr).toContain("solar_resource_file resource");
  },
  30_000
);
