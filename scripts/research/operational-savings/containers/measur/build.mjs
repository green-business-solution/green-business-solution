#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  execFileSync,
  spawnSync
} from "node:child_process";
import {
  mkdir,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const buildDirectory = join(directory, ".build");
const sourceDirectory = resolve(
  process.env.MEASUR_SOURCE_DIR ??
    join(directory, "../../.cache/repos/amo-tools-suite")
);
const commit =
  "bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b";
const archiveSha256 =
  "8d0b14a6d86454b7530b1c94290f0e1dc24b72f8fb8ed9d551c9d525c0fd6fb4";
const gccImage =
  "gcc:13.3.0-bookworm@sha256:1d71f0f3450214bef38fe09e6f610fb6cca90cf97b43f4ce845bfc32a4168818";
const imageTag =
  "retrofit-research-measur:amo-tools-bdc33b8-arm64";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    ...options
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `${command} failed: ${
        result.stderr?.trim() ||
        result.stdout?.trim() ||
        `exit ${result.status}`
      }`
    );
  }
  return result.stdout?.trim() ?? "";
}

async function sha256File(path) {
  const value = await readFile(path);
  return createHash("sha256").update(value).digest("hex");
}

function extractRawTemplate(source, identifier) {
  const marker =
    `const ${identifier} = String.raw` + "`";
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) {
    throw new Error(
      `MEASUR_HARNESS_NOT_FOUND: ${identifier}`
    );
  }
  const start = markerIndex + marker.length;
  const end = source.indexOf("\n`;", start);
  if (end < 0) {
    throw new Error(
      `MEASUR_HARNESS_TERMINATOR_NOT_FOUND: ${identifier}`
    );
  }
  return `${source.slice(start, end)}\n`;
}

const actualCommit = run(
  "git",
  ["-C", sourceDirectory, "rev-parse", "HEAD"],
  {
    env: {
      ...process.env,
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_TERMINAL_PROMPT: "0",
      LANG: "C",
      LC_ALL: "C"
    }
  }
);
if (actualCommit !== commit) {
  throw new Error(
    `MEASUR_SOURCE_COMMIT_MISMATCH: expected ${commit}, received ${actualCommit}`
  );
}

const sourceStatus = run(
  "git",
  [
    "-C",
    sourceDirectory,
    "status",
    "--porcelain=v1",
    "--untracked-files=all"
  ],
  {
    env: {
      ...process.env,
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_TERMINAL_PROMPT: "0",
      LANG: "C",
      LC_ALL: "C"
    }
  }
);
if (sourceStatus) {
  throw new Error(
    `MEASUR_SOURCE_DIRTY: ${sourceStatus.split(/\r?\n/, 1)[0]}`
  );
}

await rm(buildDirectory, {
  recursive: true,
  force: true
});
await mkdir(buildDirectory, { recursive: true });

try {
  const archivePath = join(
    buildDirectory,
    "amo-tools-suite.tar"
  );
  execFileSync(
    "git",
    [
      "-C",
      sourceDirectory,
      "archive",
      "--format=tar",
      `--output=${archivePath}`,
      commit
    ],
    {
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_TERMINAL_PROMPT: "0",
        LANG: "C",
        LC_ALL: "C"
      },
      stdio: ["ignore", "pipe", "pipe"]
    }
  );
  const actualArchiveSha256 =
    await sha256File(archivePath);
  if (actualArchiveSha256 !== archiveSha256) {
    throw new Error(
      `MEASUR_SOURCE_ARCHIVE_MISMATCH: expected ${archiveSha256}, received ${actualArchiveSha256}`
    );
  }

  const adapterDirectory = resolve(
    directory,
    "../../adapters/doe-measur"
  );
  const compressedAirAdapter = await readFile(
    join(adapterDirectory, "run.mjs"),
    "utf8"
  );
  const equipmentAdapter = await readFile(
    join(adapterDirectory, "equipment.mjs"),
    "utf8"
  );
  await writeFile(
    join(buildDirectory, "compressed-air.cpp"),
    extractRawTemplate(
      compressedAirAdapter,
      "COMPRESSED_AIR_HARNESS_SOURCE"
    ),
    "utf8"
  );
  await writeFile(
    join(buildDirectory, "equipment.cpp"),
    extractRawTemplate(
      equipmentAdapter,
      "EQUIPMENT_HARNESS_SOURCE"
    ),
    "utf8"
  );

  const dockerArguments = [
    "buildx",
    "build",
    "--platform",
    "linux/arm64",
    "--load",
    "--provenance=false",
    "--sbom=false",
    "--tag",
    imageTag,
    "--build-arg",
    `GCC_IMAGE=${gccImage}`,
    "--build-arg",
    `MEASUR_ARCHIVE_SHA256=${archiveSha256}`,
    "--build-arg",
    `MEASUR_COMMIT=${commit}`,
    directory
  ];
  const build = spawnSync(
    "docker",
    dockerArguments,
    {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      stdio: "inherit"
    }
  );
  if (build.error) throw build.error;
  if (build.status !== 0) {
    throw new Error(
      `MEASUR_CONTAINER_BUILD_FAILED: exit ${build.status}`
    );
  }

  const inspection = JSON.parse(
    run("docker", ["image", "inspect", imageTag])
  )[0];
  process.stdout.write(
    `${JSON.stringify(
      {
        status: "BUILT",
        image: imageTag,
        imageId: inspection.Id,
        platform:
          `${inspection.Os}/${inspection.Architecture}`,
        sourceCommit: commit,
        sourceArchiveSha256: archiveSha256
      },
      null,
      2
    )}\n`
  );
} finally {
  await rm(buildDirectory, {
    recursive: true,
    force: true
  });
}
