#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  readFileSync(join(directory, "build-manifest.json"), "utf8")
);
const image = process.env.SCOUT_IMAGE ?? manifest.image.repositoryTag;

function sha256File(path) {
  return createHash("sha256")
    .update(readFileSync(path))
    .digest("hex");
}

function docker(args, options = {}) {
  return execFileSync("docker", args, {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
    timeout: options.timeout ?? 30 * 60 * 1000
  }).trim();
}

for (const input of [
  ...manifest.buildInputs,
  ...manifest.verificationInputs
]) {
  assert.equal(
    sha256File(join(directory, input.path)),
    input.sha256,
    `${input.path} checksum`
  );
}

const inspection = JSON.parse(docker(["image", "inspect", image]))[0];
assert.equal(inspection.Os, "linux", "image OS");
assert.equal(inspection.Architecture, "arm64", "image architecture");
assert.equal(inspection.Id, manifest.image.localImageId, "local image ID");
assert.equal(inspection.Config.User, "65532:65532", "runtime user");
assert.ok(
  inspection.Config.Env.includes("PYTHONDONTWRITEBYTECODE=1"),
  "offline runtime bytecode setting"
);

const commonArguments = [
  "run",
  "--rm",
  "--platform",
  "linux/arm64",
  "--network",
  "none",
  "--read-only",
  "--cap-drop",
  "ALL",
  "--security-opt",
  "no-new-privileges",
  "--pull",
  "never"
];

const retained = JSON.parse(
  docker([...commonArguments, image, "verify"])
);
assert.equal(retained.status, "PASS", "retained proof status");
assert.equal(
  retained.outputSha256,
  manifest.proofRuns[0].outputSha256,
  "retained output checksum"
);
assert.equal(
  retained.sourceCommit,
  manifest.source.commit,
  "retained source commit"
);

const rerun = JSON.parse(
  docker(
    [
      ...commonArguments.slice(0, 2),
      "--tmpfs",
      "/tmp:rw,nosuid,nodev,size=1536m",
      ...commonArguments.slice(2),
      image,
      "rerun"
    ],
    { timeout: 30 * 60 * 1000 }
  )
);
assert.equal(rerun.status, "PASS", "full rerun proof status");
assert.equal(
  rerun.outputSha256,
  retained.outputSha256,
  "full rerun output checksum"
);
assert.equal(
  rerun.smallOfficeReductionFraction,
  0.2,
  "small-office reduction fraction"
);
assert.deepEqual(
  rerun.technicalPotential2026,
  manifest.proofRuns[1].technicalPotential2026,
  "2026 technical-potential energy"
);

const licenseLine = docker([
  ...commonArguments,
  "--entrypoint",
  "sha256sum",
  image,
  manifest.source.license.path
]);
assert.equal(
  licenseLine.split(/\s+/, 1)[0],
  manifest.source.license.sha256,
  "Scout license checksum"
);

process.stdout.write(
  `${JSON.stringify({
    schemaVersion: 1,
    status: "PASS",
    image,
    imageId: inspection.Id,
    architecture: `${inspection.Os}/${inspection.Architecture}`,
    networkMode: "none",
    retained,
    rerun
  })}\n`
);
