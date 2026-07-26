import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";

export const DOE_MEASUR_COMMIT =
  "bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b";
export const DOE_MEASUR_REPOSITORY_URL =
  "https://github.com/ORNL-AMO/AMO-Tools-Suite";
export const DOE_MEASUR_SOURCE_SCHEMA_ID =
  `schema:doe-measur:${DOE_MEASUR_COMMIT}:repository-v1`;
export const DOE_MEASUR_SOURCE_SCHEMA = Object.freeze({
  format: "PINNED_GIT_REPOSITORY_RELEASE",
  repositoryUrl: DOE_MEASUR_REPOSITORY_URL,
  commit: DOE_MEASUR_COMMIT
});
export const DOE_MEASUR_SOURCE_SCHEMA_FINGERPRINT_SHA256 =
  sha256Json(DOE_MEASUR_SOURCE_SCHEMA);

export const DOE_MEASUR_PINNED_FILES = Object.freeze({
  leakHeader: Object.freeze({
    relativePath: "include/calculator/util/CompressedAirLeakSurvey.h",
    byteSize: 6870,
    sha256: "6e8fd190d67677f94e9c4f1020cd7ddc46414a2a149c432ab8ad3577bdbb1319"
  }),
  leakSource: Object.freeze({
    relativePath: "src/calculator/util/CompressedAirLeakSurvey.cpp",
    byteSize: 7163,
    sha256: "e149207339296c4ccff80d7ffef88ab24efa67acbd08830c82fca2de7329af18"
  }),
  reductionHeader: Object.freeze({
    relativePath: "include/calculator/util/CompressedAirReduction.h",
    byteSize: 5526,
    sha256: "07376dbb3346d1103d672a182dd32968aa7e19c7222d08dbbbd845790890d4ef"
  }),
  reductionSource: Object.freeze({
    relativePath: "src/calculator/util/CompressedAirReduction.cpp",
    byteSize: 5490,
    sha256: "009ee7129e7235467052459cf83cfd725ba0093d7e984dee572ad8d910c54e36"
  }),
  wasmBinding: Object.freeze({
    relativePath: "bindings-wasm/calculator.cpp",
    byteSize: 11216,
    sha256: "5bad679bac1bef93727365874324836fd3ae9a81ab8bbd2638920720e197a3e5"
  }),
  goldenTest: Object.freeze({
    relativePath: "tests/cpp/CompressedAirLeakSurvey.unit.cpp",
    byteSize: 6311,
    sha256: "4c3de4eca1270d47eb2e9b2384efcc26fd6f22ad70501a46fad313a042616d61"
  }),
  license: Object.freeze({
    relativePath: "LICENSE.txt",
    byteSize: 2227,
    sha256: "7372b9cff1cab763899bf6c4516b44163f8442fd38d0a3786e3ceafc0e81df62"
  })
});

function requireSourceToken(source, token, label) {
  if (!source.includes(token)) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: ${label} lacks ${token}`);
  }
}

export function assertCompressedAirNativeInterface({
  leakHeader,
  reductionHeader,
  wasmBinding,
  goldenTest
}) {
  for (const token of [
    "const int hoursPerYear",
    "const int utilityType",
    "const double utilityCost",
    "const int measurementMethod",
    "const EstimateMethodData estimateMethodData",
    "const DecibelsMethodData decibelsMethodData",
    "const BagMethodData bagMethodData",
    "const OrificeMethodData orificeMethodData",
    "const CompressorElectricityData compressorElectricityData",
    "const int units",
    "double annualTotalElectricity = 0, annualTotalElectricityCost = 0, totalFlowRate = 0, annualTotalFlowRate = 0"
  ]) {
    requireSourceToken(leakHeader, token, "CompressedAirLeakSurvey.h");
  }
  for (const token of [
    "const double compressorControlAdjustment",
    "const double compressorSpecificPower"
  ]) {
    requireSourceToken(
      reductionHeader,
      token,
      "CompressedAirReduction.h"
    );
  }
  for (const token of [
    '.property("annualTotalElectricity"',
    '.property("annualTotalElectricityCost"',
    '.property("totalFlowRate"',
    '.property("annualTotalFlowRate"'
  ]) {
    requireSourceToken(wasmBinding, token, "calculator.cpp binding");
  }
  for (const token of [
    "CompressedAirLeakSurveyInput(8640, 1, 0.12, 0,",
    "EstimateMethodData(0.1)",
    "CompressorElectricityData(0.40, 0.16)",
    "CHECK(testOutput.annualTotalElectricity == Approx(138.24))",
    "CHECK(testOutput.totalFlowRate == Approx(0.1))"
  ]) {
    requireSourceToken(
      goldenTest,
      token,
      "CompressedAirLeakSurvey.unit.cpp"
    );
  }
  return {
    inputs: [
      { name: "hoursPerYear", nativeType: "int", unit: "hours/year" },
      {
        name: "utilityType",
        nativeType: "int",
        enumeration: { 0: "compressed-air cost", 1: "electricity cost" }
      },
      { name: "utilityCost", nativeType: "double", unit: "currency/utility-unit" },
      {
        name: "measurementMethod",
        nativeType: "int",
        enumeration: {
          0: "estimate",
          1: "decibels",
          2: "bag",
          3: "orifice"
        }
      },
      {
        name: "estimateMethodData.leakRateEstimate",
        nativeType: "double",
        unit: "flow/leak"
      },
      {
        name: "compressorElectricityData.compressorSpecificPower",
        nativeType: "double",
        unit: "kW/flow-unit"
      },
      { name: "units", nativeType: "int", unit: "equipment count" }
    ],
    outputs: [
      {
        name: "annualTotalElectricity",
        nativeType: "double",
        unit: "kWh/year"
      },
      {
        name: "annualTotalElectricityCost",
        nativeType: "double",
        unit: "currency/year"
      },
      { name: "totalFlowRate", nativeType: "double", unit: "flow/leak" },
      {
        name: "annualTotalFlowRate",
        nativeType: "double",
        unit: "flow-volume/year"
      }
    ],
    retainedGoldenFixture: {
      hoursPerYear: 8640,
      utilityType: 1,
      utilityCost: 0.12,
      measurementMethod: 0,
      leakRateEstimate: 0.1,
      compressorControlAdjustment: 0.4,
      compressorSpecificPower: 0.16,
      units: 1,
      expected: {
        annualTotalElectricity: 138.24,
        annualTotalElectricityCost: 16.5888,
        totalFlowRate: 0.1,
        annualTotalFlowRate: 51840
      }
    }
  };
}

export function verifyDoeMeasurCommit(repositoryPath) {
  const result = spawnSync(
    "git",
    ["-C", repositoryPath, "rev-parse", "HEAD"],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_TERMINAL_PROMPT: "0"
      }
    }
  );
  if (result.status !== 0) {
    throw new Error(
      `SOURCE_REPOSITORY_INVALID: ${result.stderr.trim() || "git rev-parse failed"}`
    );
  }
  const commit = result.stdout.trim();
  if (commit !== DOE_MEASUR_COMMIT) {
    throw new Error(
      `SOURCE_COMMIT_MISMATCH: expected ${DOE_MEASUR_COMMIT}, received ${commit}`
    );
  }
  return commit;
}

export async function inspectDoeMeasurRepository(repositoryPath) {
  assertNetworkDisabled();
  const commit = verifyDoeMeasurCommit(repositoryPath);
  const entries = await Promise.all(
    Object.entries(DOE_MEASUR_PINNED_FILES).map(
      async ([key, expected]) => [
        key,
        await verifyArtifact(
          join(repositoryPath, expected.relativePath),
          expected
        )
      ]
    )
  );
  const artifacts = Object.fromEntries(entries);
  const sources = Object.fromEntries(
    await Promise.all(
      ["leakHeader", "reductionHeader", "wasmBinding", "goldenTest"].map(
        async (key) => [
          key,
          await readFile(
            join(repositoryPath, DOE_MEASUR_PINNED_FILES[key].relativePath),
            "utf8"
          )
        ]
      )
    )
  );
  const nativeInterface = assertCompressedAirNativeInterface(sources);
  const observedSchema = {
    format: "PINNED_CPP_HEADER_SOURCE_BINDING_AND_GOLDEN_TEST",
    commit,
    calculator: "CompressedAirLeakSurvey",
    nativeInterface
  };
  return {
    commit,
    artifacts,
    nativeInterface,
    observedSchema,
    schemaFingerprintSha256: sha256Json(observedSchema)
  };
}
