#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { sha256File } from "../../lib/artifact.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  await readFile(join(root, "build-manifest.json"), "utf8")
);
const image = process.env.REOPT_IMAGE ?? manifest.image.tag;

function assert(condition, message) {
  if (!condition) {
    throw new Error(`REOPT_CONTAINER_PROOF_INVALID: ${message}`);
  }
}

for (const input of [
  ...manifest.buildInputs,
  ...manifest.verificationInputs
]) {
  const actual = await sha256File(join(root, input.path));
  assert(actual === input.sha256, `${input.path} checksum ${actual}`);
}

const proofs = {};
for (const run of manifest.proofRuns) {
  const path = join(root, run.evidencePath);
  const digest = await sha256File(path);
  assert(
    digest === run.evidenceSha256,
    `${run.evidencePath} checksum ${digest}`
  );
  const proof = JSON.parse(await readFile(path, "utf8"));
  assert(proof.outputSha256 === run.outputSha256, `${run.mode} output`);
  proofs[run.mode] = proof;
}

assert(
  proofs.official.status === "optimal" &&
    proofs.official.terminationStatus === "OPTIMAL",
  "official solver status"
);
assert(
  proofs.official.metrics.yearOneEnergyCostBeforeTaxUsd === 1000 &&
    proofs.official.metrics.yearOneDemandCostBeforeTaxUsd === 136.99,
  "official regression metrics"
);
assert(
  proofs.retrofi.baseline.status === "optimal" &&
    proofs.retrofi.proposed.status === "optimal",
  "RetroFi pair solver status"
);
assert(
  proofs.retrofi.baseline.annualLoadKwh ===
    proofs.retrofi.proposed.annualLoadKwh,
  "RetroFi load equality"
);
assert(
  proofs.retrofi.metrics.yearOneBillSavingsBeforeTaxUsd > 0,
  "RetroFi modeled savings"
);

if (!process.argv.includes("--skip-image")) {
  const inspect = spawnSync(
    "docker",
    [
      "image",
      "inspect",
      image,
      "--format",
      "{{json .}}"
    ],
    { encoding: "utf8" }
  );
  assert(inspect.status === 0, `docker image inspect: ${inspect.stderr}`);
  const inspection = JSON.parse(inspect.stdout);
  assert(
    inspection.Os === manifest.image.os,
    `image OS ${inspection.Os}`
  );
  assert(
    inspection.Architecture === manifest.image.architecture,
    `image architecture ${inspection.Architecture}`
  );
  assert(
    inspection.Id === manifest.image.digest,
    `image digest ${inspection.Id}`
  );
  assert(
    inspection.Config.User === manifest.image.runtimeUser,
    `runtime user ${inspection.Config.User}`
  );
  assert(
    inspection.Config.Env.includes("JULIA_PKG_OFFLINE=true"),
    "JULIA_PKG_OFFLINE"
  );
  const licenseCheck = spawnSync(
    "docker",
    [
      "run",
      "--rm",
      "--network",
      "none",
      "--read-only",
      "--pull",
      "never",
      "--entrypoint",
      "sha256sum",
      image,
      manifest.source.license.path,
      manifest.source.notice.path
    ],
    { encoding: "utf8" }
  );
  assert(
    licenseCheck.status === 0,
    `license checksums: ${licenseCheck.stderr}`
  );
  const licenseDigests = new Map(
    licenseCheck.stdout
      .trim()
      .split("\n")
      .map((line) => {
        const [digest, path] = line.trim().split(/\s+/, 2);
        return [path, digest];
      })
  );
  assert(
    licenseDigests.get(manifest.source.license.path) ===
      manifest.source.license.sha256,
    "license checksum"
  );
  assert(
    licenseDigests.get(manifest.source.notice.path) ===
      manifest.source.notice.sha256,
    "NOTICE checksum"
  );
}

console.log("REOPT_CONTAINER_PROOF_OK");
