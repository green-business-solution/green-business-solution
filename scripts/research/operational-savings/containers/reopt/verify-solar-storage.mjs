#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  readFile,
  writeFile
} from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { sha256File } from "../../lib/artifact.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const buildManifest = JSON.parse(
  await readFile(join(root, "build-manifest.json"), "utf8")
);
const image = process.env.REOPT_IMAGE ?? buildManifest.image.tag;
const files = {
  runner: {
    path: "solar-storage-runner.jl",
    containerPath: "/proof/solar-storage-runner.jl",
    sha256:
      "c17055e0e1af460be64c0c1c5abac406bb51a11867ea2d31f50e66db9c7f6eef"
  },
  spec: {
    path: "retrofi-solar-storage-spec.json",
    containerPath: "/proof/retrofi-solar-storage-spec.json",
    sha256:
      "39c97cf3b30265d68ddfc910b51e6e7dadc4b5a86f9e10447ac1d018ff197a2c"
  },
  series: {
    path: "pvwatts-interval-series.json",
    containerPath: "/proof/pvwatts-interval-series.json",
    sha256:
      "d57fd0f03e904bebe7b6056c9e41385fd081eb313b165681c5ca2533bc9c65f0"
  }
};

function assert(condition, message) {
  if (!condition) {
    throw new Error(
      `REOPT_SOLAR_STORAGE_REPLAY_INVALID: ${message}`
    );
  }
}

function near(actual, expected, tolerance, label) {
  assert(
    typeof actual === "number" &&
      Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${expected} +/- ${tolerance}, received ${actual}`
  );
}

function sorted(value) {
  if (Array.isArray(value)) {
    return value.map(sorted);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sorted(value[key])])
    );
  }
  return value;
}

function stableProof(value) {
  const copy = structuredClone(value);
  delete copy.baseline.solverSeconds;
  delete copy.proposed.solverSeconds;
  return sorted(copy);
}

function validateOutput(proof) {
  assert(
    proof.schemaVersion ===
      "retrofi/reopt-solar-storage-proof-v1" &&
      proof.scenarioKind ===
        "retrofi_pvwatts_fixed_solar_storage_pair",
    "proof identity"
  );
  assert(
    proof.sourceCommit === buildManifest.source.commit &&
      proof.imageDigest === buildManifest.image.digest &&
      proof.networkEnforcement === "DOCKER_NONE" &&
      proof.runtimeUser === buildManifest.image.runtimeUser,
    "source, image, and isolation identity"
  );
  assert(
    proof.packageVersions.Julia === "1.10.4" &&
      proof.packageVersions.HiGHS === "1.12.0" &&
      proof.packageVersions.HiGHS_jll === "1.8.0+0" &&
      proof.packageVersions.JuMP === "1.23.6" &&
      proof.packageVersions.MathOptInterface === "1.34.0",
    "runtime package versions"
  );
  assert(
    proof.specSha256 === files.spec.sha256 &&
      proof.pvwattsSeriesFileSha256 === files.series.sha256 &&
      proof.pvwattsSeriesSha256 ===
        "a842a7a51583fca8b7c559a1ed12b16aa9d396ec7c6b92dbfabfc282dbaf0f1c" &&
      proof.pvwattsInputSha256 ===
        "e3f415eb40b37927dd12a9aa4c48ffa5512b09f7a5c18c97386e539a843b180e" &&
      proof.pvwattsOutputSha256 ===
        "4447dfd0255ba2194a685c2ed2221325c0d7f3488d2a6a82a1166a37e0614532",
    "input provenance"
  );
  assert(
    proof.baseline.status === "optimal" &&
      proof.baseline.terminationStatus === "OPTIMAL" &&
      typeof proof.baseline.solverSeconds === "number" &&
      proof.baseline.solverSeconds >= 0 &&
      proof.proposed.status === "optimal" &&
      proof.proposed.terminationStatus === "OPTIMAL" &&
      typeof proof.proposed.solverSeconds === "number" &&
      proof.proposed.solverSeconds >= 0,
    "solver status"
  );
  near(
    proof.baseline.yearOneBillBeforeTaxUsd,
    89827,
    1e-9,
    "baseline annual bill"
  );
  near(
    proof.proposed.yearOneBillBeforeTaxUsd,
    87586.78,
    1e-9,
    "proposed annual bill"
  );
  near(
    proof.proposed.pvCapacityDcKw,
    4,
    1e-9,
    "fixed PV capacity"
  );
  near(
    proof.proposed.storagePowerKw,
    4,
    1e-9,
    "fixed storage power"
  );
  near(
    proof.proposed.storageNameplateEnergyKwh,
    10,
    1e-9,
    "converted storage nameplate energy"
  );
  near(
    proof.proposed.pvToStorageKwh,
    3016.674,
    1e-9,
    "PV to storage"
  );
  near(
    proof.proposed.storageDischargeKwh,
    2725.389,
    1e-9,
    "storage discharge"
  );
  near(
    proof.proposed.gridToStorageKwh,
    0,
    1e-9,
    "grid to storage"
  );
  near(
    proof.proposed.pvYearOneEnergyProducedKwh,
    Math.round(proof.pvwattsAnnualEnergyKwh),
    1e-9,
    "PV annual production"
  );
  near(
    proof.proposed.pvToLoadKwh +
      proof.proposed.pvToStorageKwh +
      proof.proposed.pvToGridKwh +
      proof.proposed.pvCurtailedKwh,
    proof.pvwattsAnnualEnergyKwh,
    0.1,
    "PVWatts to REopt dispatch reconciliation"
  );
  assert(
    proof.proposed.storageSocTerminalFraction >=
      proof.inputBoundaries.storageReserveFraction,
    "terminal storage reserve"
  );
  assert(
    proof.formulaBindings.baseline_annual_bill.value ===
      proof.baseline.yearOneBillBeforeTaxUsd &&
      proof.formulaBindings.proposed_annual_bill.value ===
        proof.proposed.yearOneBillBeforeTaxUsd &&
      proof.formulaBindings.baseline_annual_bill.unit ===
        "USD/year" &&
      proof.formulaBindings.proposed_annual_bill.unit === "USD/year",
    "canonical bill mappings"
  );
  assert(
    proof.baseline.inputSha256 ===
      "8a66a0459e489b1f205c884ab22a4051d2cf158002a6126ce8a2d28823905c6a" &&
      proof.proposed.inputSha256 ===
        "da5fd6c0174c6a592b7c615358d60ed4ffb16e81c530cd09e8e9f3477c9caa9c" &&
      proof.proposed.pvProductionFactorSeriesSha256 ===
        "f5f8ef6e0352cd2c19e51f6191268022a95a35579ad4df3fd4e0cc252d56add3" &&
      proof.proposed.storageSocSeriesSha256 ===
        "0ca30ed4df219b7fe7e3178f94e63dfa7be37a073adf3ba9685ac82b40f6a018" &&
      proof.proposed.storageDischargeSeriesSha256 ===
        "6bdc960457e429d49ee886c7775c1a1827ae6019b388daca7c3c90104ac34206" &&
      proof.outputSha256 ===
        "2bab0bbd1dde3732cb5914d33ac135c2d87feeac518e0af618bfa90bad748e3b",
    "deterministic input, dispatch, and output hashes"
  );
}

for (const file of Object.values(files)) {
  const digest = await sha256File(join(root, file.path));
  assert(digest === file.sha256, `${file.path} checksum ${digest}`);
}

const inspect = spawnSync(
  "docker",
  ["image", "inspect", image, "--format", "{{json .}}"],
  { encoding: "utf8" }
);
assert(inspect.status === 0, `docker image inspect: ${inspect.stderr}`);
const inspection = JSON.parse(inspect.stdout);
assert(
  inspection.Id === buildManifest.image.digest &&
    inspection.Os === "linux" &&
    inspection.Architecture === "arm64" &&
    inspection.Config.User === "65532:65532" &&
    inspection.Config.Env.includes("JULIA_PKG_OFFLINE=true"),
  "exact non-root offline image"
);

const dockerArguments = [
  "run",
  "--rm",
  "--network",
  "none",
  "--read-only",
  "--cap-drop",
  "ALL",
  "--security-opt",
  "no-new-privileges",
  "--pull",
  "never",
  "--user",
  "65532:65532",
  "--tmpfs",
  "/tmp:rw,nosuid,nodev,size=512m",
  ...Object.values(files).flatMap((file) => [
    "--volume",
    `${join(root, file.path)}:${file.containerPath}:ro`
  ]),
  "--entrypoint",
  "julia",
  image,
  "--startup-file=no",
  "--history-file=no",
  "--project=/opt/reopt",
  files.runner.containerPath,
  files.spec.containerPath,
  files.series.containerPath
];
const replay = spawnSync("docker", dockerArguments, {
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
  timeout: 20 * 60 * 1000
});
assert(
  replay.status === 0,
  `container replay failed: ${replay.stderr || replay.error}`
);
const outputLines = replay.stdout.trim().split(/\r?\n/).filter(Boolean);
assert(outputLines.length === 1, "expected one JSON output line");
const proof = JSON.parse(outputLines[0]);
validateOutput(proof);

const evidencePath = join(root, "solar-storage-proof.json");
if (process.argv.includes("--write-evidence")) {
  await writeFile(
    evidencePath,
    `${JSON.stringify(sorted(proof), null, 2)}\n`,
    "utf8"
  );
} else {
  const retained = JSON.parse(await readFile(evidencePath, "utf8"));
  validateOutput(retained);
  assert(
    JSON.stringify(stableProof(retained)) ===
      JSON.stringify(stableProof(proof)),
    "replay differs from retained proof"
  );
}

console.log(
  JSON.stringify({
    schemaVersion: 1,
    status: "PASS",
    image,
    imageDigest: inspection.Id,
    runtimeUser: inspection.Config.User,
    networkMode: "none",
    readOnlyRootFilesystem: true,
    capabilitiesDropped: "ALL",
    noNewPrivileges: true,
    baselineAnnualBillUsd:
      proof.formulaBindings.baseline_annual_bill.value,
    proposedAnnualBillUsd:
      proof.formulaBindings.proposed_annual_bill.value
  })
);
