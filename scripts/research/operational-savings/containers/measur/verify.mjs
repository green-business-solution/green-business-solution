#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  readFileSync(
    join(directory, "build-manifest.json"),
    "utf8"
  )
);
const fixtureDocument = JSON.parse(
  readFileSync(join(directory, "fixtures.json"), "utf8")
);
const image =
  process.env.MEASUR_IMAGE ??
  manifest.image.repositoryTag;

function sha256File(path) {
  return createHash("sha256")
    .update(readFileSync(path))
    .digest("hex");
}

function docker(args) {
  return execFileSync("docker", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

function compareOutputs(
  actual,
  expected,
  absoluteTolerance,
  relativeTolerance,
  path = "outputs"
) {
  for (const [name, expectation] of Object.entries(expected)) {
    const fieldPath = `${path}.${name}`;
    if (
      expectation !== null &&
      typeof expectation === "object"
    ) {
      assert.ok(
        actual?.[name] &&
          typeof actual[name] === "object",
        `${fieldPath} must be an object`
      );
      compareOutputs(
        actual[name],
        expectation,
        absoluteTolerance,
        relativeTolerance,
        fieldPath
      );
      continue;
    }
    assert.equal(
      typeof actual?.[name],
      "number",
      `${fieldPath} must be numeric`
    );
    const tolerance = Math.max(
      absoluteTolerance,
      Math.abs(expectation) * relativeTolerance
    );
    assert.ok(
      Math.abs(actual[name] - expectation) <= tolerance,
      `${fieldPath}: expected ${expectation} +/- ${tolerance}, received ${actual[name]}`
    );
  }
}

assert.equal(manifest.schemaVersion, 1);
assert.equal(fixtureDocument.schemaVersion, 1);
assert.equal(
  fixtureDocument.sourceCommit,
  manifest.source.commit
);

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

const inspection = JSON.parse(
  docker(["image", "inspect", image])
)[0];
assert.equal(inspection.Os, "linux", "image OS");
assert.equal(
  inspection.Architecture,
  "arm64",
  "image architecture"
);
assert.equal(
  inspection.Id,
  manifest.image.localImageId,
  "local image ID"
);
assert.equal(
  inspection.Config.User,
  manifest.image.runtimeUser,
  "runtime user"
);
assert.ok(
  inspection.Config.Env.includes(
    `MEASUR_SOURCE_COMMIT=${manifest.source.commit}`
  ),
  "source commit environment"
);
assert.equal(
  inspection.Config.Labels[
    "org.opencontainers.image.source"
  ],
  manifest.source.repository,
  "source label"
);
assert.equal(
  inspection.Config.Labels[
    "org.opencontainers.image.revision"
  ],
  manifest.source.commit,
  "revision label"
);
assert.equal(
  inspection.Config.Labels[
    "org.opencontainers.image.licenses"
  ],
  manifest.source.license.spdxId,
  "license label"
);

const identity = docker([
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
  "sh",
  image,
  "-c",
  "printf '%s:%s' \"$(id -u)\" \"$(id -g)\""
]);
assert.equal(
  identity,
  manifest.image.runtimeUser,
  "effective runtime user"
);

const licenseOutput = docker([
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
  "sha256sum",
  image,
  manifest.source.license.path
]);
assert.equal(
  licenseOutput.split(/\s+/, 1)[0],
  manifest.source.license.sha256,
  "license checksum"
);

const results = {};
for (const fixture of fixtureDocument.fixtures) {
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
    fixture.cliArgument,
    ...fixture.arguments
  ]);
  const parsed = JSON.parse(output);
  assert.equal(
    parsed.schemaVersion,
    1,
    `${fixture.id} schema version`
  );
  assert.equal(
    parsed.sourceCommit,
    manifest.source.commit,
    `${fixture.id} source commit`
  );
  assert.equal(
    parsed.model,
    fixture.model,
    `${fixture.id} model`
  );
  assert.equal(
    parsed.fixture,
    fixture.id,
    `${fixture.id} fixture`
  );
  compareOutputs(
    parsed.outputs,
    fixture.expectedOutputs,
    fixture.absoluteTolerance,
    fixture.relativeTolerance
  );
  results[fixture.id] = parsed.outputs;
}

process.stdout.write(
  `${JSON.stringify({
    schemaVersion: 1,
    status: "PASS",
    image,
    imageId: inspection.Id,
    architecture:
      `${inspection.Os}/${inspection.Architecture}`,
    runtimeUser: identity,
    networkMode: "none",
    readOnlyRootFilesystem: true,
    capabilitiesDropped: "ALL",
    noNewPrivileges: true,
    results
  })}\n`
);
