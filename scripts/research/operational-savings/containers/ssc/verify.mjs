#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(directory, "build-manifest.json"), "utf8"));
const image = process.env.SSC_IMAGE ?? manifest.image.repositoryTag;

function docker(args) {
  return execFileSync("docker", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function sha256File(path) {
  return createHash("sha256")
    .update(readFileSync(path))
    .digest("hex");
}

function near(actual, expected, tolerance, label) {
  assert.equal(typeof actual, "number", `${label} must be numeric`);
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${expected} +/- ${tolerance}, received ${actual}`,
  );
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
assert.equal(
  inspection.Config.User,
  "65532:65532",
  "image default user"
);
assert.deepEqual(
  inspection.Config.Entrypoint,
  ["/usr/local/bin/ssc-runner"],
  "image entrypoint"
);
assert.equal(
  inspection.Config.Labels["org.opencontainers.image.source"],
  manifest.source.repository.replace(/\.git$/, ""),
  "image source label"
);
assert.equal(
  inspection.Config.Labels["org.opencontainers.image.revision"],
  manifest.source.commit,
  "image revision label"
);
assert.equal(
  inspection.Config.Labels["org.opencontainers.image.version"],
  String(manifest.source.sscApiVersion),
  "image version label"
);
assert.equal(
  inspection.Config.Labels["org.opencontainers.image.licenses"],
  manifest.source.license.spdxId,
  "image license label"
);
if (manifest.image.localImageId !== null) {
  assert.equal(inspection.Id, manifest.image.localImageId, "local image ID");
}

const expectedFiles = new Map([
  [
    manifest.source.license.file,
    manifest.source.license.fileSha256
  ],
  ...manifest.fixtures.map((fixture) => [
    `/opt/ssc-source/${fixture.path}`,
    fixture.sha256
  ])
]);
const checksumOutput = docker([
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
  "--entrypoint",
  "/usr/bin/sha256sum",
  image,
  ...expectedFiles.keys()
]);
const observedFiles = new Map(
  checksumOutput.split("\n").map((line) => {
    const match = line.match(/^([a-f0-9]{64})  (.+)$/);
    assert.ok(match, `unexpected sha256sum output: ${line}`);
    return [match[2], match[1]];
  })
);
assert.equal(
  observedFiles.size,
  expectedFiles.size,
  "verified file count"
);
for (const [path, expectedSha256] of expectedFiles) {
  assert.equal(
    observedFiles.get(path),
    expectedSha256,
    `${path} SHA-256`
  );
}

const results = {};
for (const model of manifest.models) {
  const output = docker([
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
    image,
    model.cliArgument,
  ]);
  const parsed = JSON.parse(output);
  assert.equal(parsed.schemaVersion, 1, `${model.id} schema version`);
  assert.equal(parsed.sourceCommit, manifest.source.commit, `${model.id} source commit`);
  assert.equal(parsed.sscApiVersion, manifest.source.sscApiVersion, `${model.id} SSC API version`);
  assert.equal(parsed.model, model.sscModule, `${model.id} module`);
  assert.equal(parsed.fixture, model.fixture, `${model.id} fixture`);
  for (const [name, expectation] of Object.entries(model.expectedOutputs)) {
    near(parsed.outputs[name], expectation.value, expectation.absoluteTolerance, `${model.id}.${name}`);
  }
  results[model.id] = parsed.outputs;
}

process.stdout.write(
  `${JSON.stringify({
    schemaVersion: 1,
    status: "PASS",
    image,
    imageId: inspection.Id,
    architecture: `${inspection.Os}/${inspection.Architecture}`,
    runtimeUser: inspection.Config.User,
    networkMode: "none",
    verifiedFiles: Object.fromEntries(observedFiles),
    results,
  })}\n`,
);
