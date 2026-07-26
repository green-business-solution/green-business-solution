import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import {
  access,
  appendFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { promisify } from "node:util";
import {
  afterEach,
  expect,
  test
} from "vitest";

import {
  MODEL_CONTAINER_REPLAY_SPECS,
  captureCleanCommittedSourceContext,
  parseReplayArguments,
  runOrdinaryModelContainerReplay,
  runPostHocReplayAndWriteReceipt,
  sanitizedReplayVerifierEnvironment
} from "../verify-model-containers.mjs";
import {
  POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
  POST_HOC_REPLAY_IMPLEMENTATION_PATHS,
  POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  POST_HOC_REPLAY_SEMANTICS,
  assertPostHocReplayReceiptBinding
} from "../storage/post-hoc-replay.mjs";

const execFileAsync = promisify(execFile);
const temporaryDirectories = [];
const CONTAINER_ROOT =
  "scripts/research/operational-savings/containers";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function writeFixtureFile(root, repositoryPath, value) {
  const absolutePath = join(root, repositoryPath);
  await mkdir(dirname(absolutePath), {
    recursive: true
  });
  await writeFile(absolutePath, value);
  return absolutePath;
}

async function git(root, args, encoding = "utf8") {
  const result = await execFileAsync(
    "/usr/bin/git",
    ["-C", root, ...args],
    {
      encoding,
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_TERMINAL_PROMPT: "0"
      }
    }
  );
  return result.stdout;
}

function outputCollector() {
  const stdout = [];
  const stderr = [];
  return {
    output: {
      stdout: {
        write(value) {
          stdout.push(Buffer.from(value));
        }
      },
      stderr: {
        write(value) {
          stderr.push(Buffer.from(value));
        }
      }
    },
    stdoutText() {
      return Buffer.concat(stdout).toString("utf8");
    },
    stderrText() {
      return Buffer.concat(stderr).toString("utf8");
    }
  };
}

function deterministicClock() {
  let tick = 0;
  return () => {
    const result = new Date(
      Date.UTC(2026, 6, 24, 22, 0, tick)
    );
    tick += 1;
    return result;
  };
}

async function createReplayFixture({
  verifierSources = {}
} = {}) {
  const repoRoot = await mkdtemp(
    join(tmpdir(), "retrofi-post-hoc-replay-")
  );
  temporaryDirectories.push(repoRoot);
  for (const [index, repositoryPath] of
    POST_HOC_REPLAY_IMPLEMENTATION_PATHS.entries()) {
    await writeFixtureFile(
      repoRoot,
      repositoryPath,
      `// replay implementation ${index}\n`
    );
  }

  const repositories = [];
  for (const [index, spec] of
    MODEL_CONTAINER_REPLAY_SPECS.entries()) {
    const modelRoot =
      `${CONTAINER_ROOT}/${spec.modelId}`;
    const buildManifestPath =
      `${modelRoot}/build-manifest.json`;
    const buildInputPath =
      `${modelRoot}/Dockerfile`;
    const verifierPath =
      `${modelRoot}/verify.mjs`;
    const buildInputBytes =
      `FROM scratch\n# ${spec.modelId}\n`;
    const verifierBytes =
      verifierSources[spec.modelId] ??
      `process.stdout.write(${JSON.stringify(`${spec.modelId} verified\n`)});\n`;
    const imageId =
      `sha256:${String(index + 1).repeat(64)}`;
    const completeInputSetSha256 =
      String(index + 5).repeat(64);
    const manifest = {
      schemaVersion: 1,
      image: {
        localImageId: imageId
      }
    };
    const manifestBytes =
      `${JSON.stringify(manifest, null, 2)}\n`;
    await writeFixtureFile(
      repoRoot,
      buildInputPath,
      buildInputBytes
    );
    await writeFixtureFile(
      repoRoot,
      verifierPath,
      verifierBytes
    );
    await writeFixtureFile(
      repoRoot,
      buildManifestPath,
      manifestBytes
    );
    repositories.push({
      modelId: spec.modelId,
      buildManifest: {
        path: buildManifestPath,
        status: "VERIFIED",
        sha256: sha256(manifestBytes),
        buildEvidence: {
          contentBinding: {
            status: "VERIFIED_EXACT_LOCAL_CONTENT",
            buildInputs: [
              {
                repositoryPath: buildInputPath,
                sha256: sha256(buildInputBytes)
              }
            ],
            verificationInputs: [
              {
                repositoryPath: verifierPath,
                sha256: sha256(verifierBytes)
              }
            ],
            completeInputSetSha256
          }
        }
      },
      provenance: {
        sourceCommit:
          String.fromCharCode(97 + index).repeat(40)
      },
      localImage: {
        imageId,
        verificationCommand: `node ${verifierPath}`
      },
      remoteImage: {
        imageDigest: imageId
      }
    });
  }

  await git(repoRoot, ["init", "--quiet"]);
  await git(repoRoot, [
    "config",
    "user.email",
    "tests@retrofi.invalid"
  ]);
  await git(repoRoot, [
    "config",
    "user.name",
    "RetroFi tests"
  ]);
  await git(repoRoot, ["add", "--all"]);
  await git(repoRoot, [
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--quiet",
    "-m",
    "fixture"
  ]);
  return {
    repoRoot,
    inventory: {
      repositories
    },
    repositories
  };
}

async function expectMissing(path) {
  await expect(access(path)).rejects.toMatchObject({
    code: "ENOENT"
  });
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map(
      (directory) =>
        rm(directory, {
          recursive: true,
          force: true
        })
    )
  );
});

test("parses default and explicit receipt paths without accepting unsafe arguments", () => {
  expect(
    parseReplayArguments(["--write-receipt"])
  ).toEqual({
    help: false,
    writeReceipt: true,
    receiptRelativePath:
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
  });
  expect(
    parseReplayArguments([
      "--write-receipt",
      "scripts/research/operational-savings/containers/replay-debug.json"
    ])
  ).toEqual({
    help: false,
    writeReceipt: true,
    receiptRelativePath:
      "scripts/research/operational-savings/containers/replay-debug.json"
  });
  expect(
    parseReplayArguments([
      "--write-receipt=scripts/research/operational-savings/containers/replay-debug.json"
    ])
  ).toEqual({
    help: false,
    writeReceipt: true,
    receiptRelativePath:
      "scripts/research/operational-savings/containers/replay-debug.json"
  });
  expect(() =>
    parseReplayArguments([
      "--write-receipt=../outside.json"
    ])
  ).toThrow(
    /MODEL_CONTAINER_REPLAY_RECEIPT_PATH_INVALID/
  );
  for (const unsafePath of [
    "receipts/replay.json",
    ".git/refs/heads/replay.json",
    "scripts/research/operational-savings/containers/.git/replay.json"
  ]) {
    expect(() =>
      parseReplayArguments([
        `--write-receipt=${unsafePath}`
      ])
    ).toThrow(
      /MODEL_CONTAINER_REPLAY_RECEIPT_PATH_INVALID/
    );
  }
  expect(() =>
    parseReplayArguments(["--unknown"])
  ).toThrow(
    /MODEL_CONTAINER_REPLAY_ARGUMENT_UNKNOWN/
  );
});

test("uses a fixed verifier environment without ambient process state", () => {
  const prior = {
    NODE_OPTIONS: process.env.NODE_OPTIONS,
    DOCKER_CONTEXT: process.env.DOCKER_CONTEXT,
    AWS_SECRET_ACCESS_KEY:
      process.env.AWS_SECRET_ACCESS_KEY
  };
  process.env.NODE_OPTIONS =
    "--require=/tmp/hostile.js";
  process.env.DOCKER_CONTEXT = "production";
  process.env.AWS_SECRET_ACCESS_KEY = "secret";
  try {
    expect(
      sanitizedReplayVerifierEnvironment({
        environmentKey: "REOPT_IMAGE",
        imageId: `sha256:${"a".repeat(64)}`
      })
    ).toEqual({
      PATH:
        "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin",
      LANG: "C",
      LC_ALL: "C",
      HOME: "/var/empty",
      DOCKER_CONFIG: "/var/empty",
      DOCKER_HOST: "unix:///var/run/docker.sock",
      REOPT_IMAGE: `sha256:${"a".repeat(64)}`
    });
  } finally {
    for (const [key, value] of
      Object.entries(prior)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
  expect(() =>
    sanitizedReplayVerifierEnvironment({
      environmentKey: "UNAPPROVED_IMAGE",
      imageId: `sha256:${"a".repeat(64)}`
    })
  ).toThrow(
    /MODEL_CONTAINER_REPLAY_ENVIRONMENT_BINDING_INVALID/
  );
});

test("does not inherit hostile Git object-directory environment state", async () => {
  const fixture = await createReplayFixture();
  const previous =
    process.env.GIT_OBJECT_DIRECTORY;
  process.env.GIT_OBJECT_DIRECTORY = join(
    fixture.repoRoot,
    "hostile-object-directory"
  );
  try {
    await expect(
      captureCleanCommittedSourceContext({
        repoRoot: fixture.repoRoot
      })
    ).resolves.toMatchObject({
      contextGitCommit:
        expect.stringMatching(/^[a-f0-9]{40}$/),
      contextGitTree:
        expect.stringMatching(/^[a-f0-9]{40}$/)
    });
  } finally {
    if (previous === undefined) {
      delete process.env.GIT_OBJECT_DIRECTORY;
    } else {
      process.env.GIT_OBJECT_DIRECTORY =
        previous;
    }
  }
});

test("forbids an injected runner from producing a fixed-environment receipt claim", async () => {
  const fixture = await createReplayFixture();
  let inventoryCalled = false;
  await expect(
    runPostHocReplayAndWriteReceipt({
      repoRoot: fixture.repoRoot,
      inventoryBuilder: async () => {
        inventoryCalled = true;
        return fixture.inventory;
      },
      verifierRunner: async () => ({
        status: 0,
        stdout: Buffer.from("PASS\n"),
        stderr: Buffer.alloc(0)
      })
    })
  ).rejects.toThrow(
    /MODEL_CONTAINER_REPLAY_CUSTOM_RUNNER_RECEIPT_FORBIDDEN/
  );
  expect(inventoryCalled).toBe(false);
  await expectMissing(
    join(
      fixture.repoRoot,
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    )
  );
});

test("writes one sealed, exact-order replay receipt from a clean committed context", async () => {
  const fixture = await createReplayFixture({
    verifierSources: {
      ssc:
        `process.stdout.write(${JSON.stringify("ssc verified\n")});\n` +
        `process.stderr.write(${JSON.stringify("ssc diagnostic\n")});\n`
    }
  });
  const events = [];
  const collector = outputCollector();
  const result =
    await runPostHocReplayAndWriteReceipt({
      repoRoot: fixture.repoRoot,
      inventoryBuilder: async ({ repoRoot }) => {
        events.push(`inventory:${repoRoot}`);
        return fixture.inventory;
      },
      clock: deterministicClock(),
      output: collector.output
    });

  expect(events).toEqual([
    `inventory:${fixture.repoRoot}`
  ]);
  expect(collector.stdoutText()).toBe(
    "reopt verified\n" +
    "ssc verified\n" +
    "measur verified\n" +
    "scout verified\n"
  );
  expect(collector.stderrText()).toBe(
    "ssc diagnostic\n"
  );
  expect(result.receipt.semantics).toEqual(
    POST_HOC_REPLAY_SEMANTICS
  );
  expect(result.receipt.executionEnvironment).toEqual(
    POST_HOC_REPLAY_EXECUTION_ENVIRONMENT
  );
  expect(
    result.receipt.implementationFiles.map(
      (file) => file.path
    )
  ).toEqual(POST_HOC_REPLAY_IMPLEMENTATION_PATHS);
  expect(
    result.receipt.models.map((model) => model.modelId)
  ).toEqual(
    MODEL_CONTAINER_REPLAY_SPECS.map(
      (spec) => spec.modelId
    )
  );
  expect(
    result.receipt.models[1]
  ).toMatchObject({
    modelId: "ssc",
    exitCode: 0,
    stdoutSizeBytes:
      Buffer.byteLength("ssc verified\n"),
    stdoutSha256: sha256("ssc verified\n"),
    stderrSizeBytes:
      Buffer.byteLength("ssc diagnostic\n"),
    stderrSha256: sha256("ssc diagnostic\n"),
    replayKind:
      POST_HOC_REPLAY_SEMANTICS.replayKind,
    historicalBuildContext:
      POST_HOC_REPLAY_SEMANTICS
        .historicalBuildContext
  });
  expect(
    assertPostHocReplayReceiptBinding({
      receipt: result.receipt,
      repositories: fixture.repositories
    })
  ).toHaveLength(4);
  const storedReceipt = JSON.parse(
    await readFile(result.receiptPath, "utf8")
  );
  expect(storedReceipt).toEqual(result.receipt);
  expect(
    await git(
      fixture.repoRoot,
      ["status", "--porcelain=v1"],
      "utf8"
    )
  ).toContain(
    "post-hoc-replay-receipt.v1.json"
  );

  let secondInventoryCall = false;
  await expect(
    runPostHocReplayAndWriteReceipt({
      repoRoot: fixture.repoRoot,
      inventoryBuilder: async () => {
        secondInventoryCall = true;
        return fixture.inventory;
      }
    })
  ).rejects.toThrow(
    /MODEL_CONTAINER_REPLAY_RECEIPT_ALREADY_EXISTS/
  );
  expect(secondInventoryCall).toBe(false);
});

test("atomically rotates only an exact committed replay receipt", async () => {
  const fixture = await createReplayFixture();
  const receiptPath = await writeFixtureFile(
    fixture.repoRoot,
    POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
    '{"status":"stale"}\n'
  );
  await git(fixture.repoRoot, ["add", "--all"]);
  await git(fixture.repoRoot, [
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--quiet",
    "-m",
    "record stale receipt"
  ]);

  const result =
    await runPostHocReplayAndWriteReceipt({
      repoRoot: fixture.repoRoot,
      inventoryBuilder: async () =>
        fixture.inventory,
      replaceCommittedReceipt: true,
      clock: deterministicClock(),
      output: outputCollector().output
    });

  expect(result.receipt.status).toBe(
    "PASS_COMMITTED_POST_HOC_REPLAY"
  );
  expect(
    JSON.parse(await readFile(receiptPath, "utf8"))
  ).toEqual(result.receipt);
  expect(
    await git(
      fixture.repoRoot,
      ["status", "--porcelain=v1"],
      "utf8"
    )
  ).toContain(
    ` M ${POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH}`
  );
});

test("rejects a dirty source context before inventory or verifier execution", async () => {
  const fixture = await createReplayFixture();
  const inputPath = join(
    fixture.repoRoot,
    CONTAINER_ROOT,
    "reopt",
    "Dockerfile"
  );
  await appendFile(inputPath, "# dirty\n");
  let inventoryCalled = false;
  await expect(
    runPostHocReplayAndWriteReceipt({
      repoRoot: fixture.repoRoot,
      inventoryBuilder: async () => {
        inventoryCalled = true;
        return fixture.inventory;
      }
    })
  ).rejects.toThrow(
    /MODEL_CONTAINER_REPLAY_SOURCE_CONTEXT_DIRTY/
  );
  expect(inventoryCalled).toBe(false);
  await expectMissing(
    join(
      fixture.repoRoot,
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    )
  );
});

test("rejects a committed-file mismatch before any verifier executes", async () => {
  const fixture = await createReplayFixture();
  fixture.repositories[0].buildManifest.sha256 =
    "f".repeat(64);
  await expect(
    runPostHocReplayAndWriteReceipt({
      repoRoot: fixture.repoRoot,
      inventoryBuilder: async () =>
        fixture.inventory
    })
  ).rejects.toThrow(
    /MODEL_CONTAINER_REPLAY_COMMITTED_FILE_MISMATCH/
  );
});

test("stops when a verifier changes the committed source context and leaves no receipt", async () => {
  const fixture = await createReplayFixture({
    verifierSources: {
      reopt:
        'import { appendFileSync } from "node:fs";\n' +
        `appendFileSync(${JSON.stringify(`${CONTAINER_ROOT}/reopt/Dockerfile`)}, "# verifier mutation\\n");\n` +
        'process.stdout.write("PASS\\n");\n'
    }
  });
  const collector = outputCollector();
  await expect(
    runPostHocReplayAndWriteReceipt({
      repoRoot: fixture.repoRoot,
      inventoryBuilder: async () =>
        fixture.inventory,
      output: collector.output
    })
  ).rejects.toThrow(
    /MODEL_CONTAINER_REPLAY_SOURCE_CONTEXT_DIRTY/
  );
  expect(collector.stdoutText()).toBe("PASS\n");
  await expectMissing(
    join(
      fixture.repoRoot,
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    )
  );
});

test("echoes failing verifier output but never writes a passing receipt", async () => {
  const fixture = await createReplayFixture({
    verifierSources: {
      reopt:
        'process.stdout.write("partial output\\n");\n' +
        'process.stderr.write("verification failed\\n");\n' +
        "process.exitCode = 9;\n"
    }
  });
  const collector = outputCollector();
  await expect(
    runPostHocReplayAndWriteReceipt({
      repoRoot: fixture.repoRoot,
      inventoryBuilder: async () =>
        fixture.inventory,
      output: collector.output
    })
  ).rejects.toThrow(
    /MODEL_CONTAINER_REPLAY_FAILED: reopt exited 9/
  );
  expect(collector.stdoutText()).toBe(
    "partial output\n"
  );
  expect(collector.stderrText()).toBe(
    "verification failed\n"
  );
  await expectMissing(
    join(
      fixture.repoRoot,
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    )
  );
});

test("keeps ordinary replay available without requiring a clean Git context", async () => {
  const fixture = await createReplayFixture();
  await appendFile(
    join(
      fixture.repoRoot,
      CONTAINER_ROOT,
      "scout",
      "Dockerfile"
    ),
    "# ordinary mode permits dirty context\n"
  );
  const calls = [];
  const collector = outputCollector();
  await runOrdinaryModelContainerReplay({
    repoRoot: fixture.repoRoot,
    verifierRunner: async (options) => {
      calls.push({
        modelId: options.modelId,
        environmentKey: options.environmentKey,
        imageId: options.imageId
      });
      return {
        status: 0,
        stdout: Buffer.from(
          `${options.modelId} ordinary\n`
        ),
        stderr: Buffer.alloc(0)
      };
    },
    output: collector.output
  });
  expect(calls).toEqual(
    MODEL_CONTAINER_REPLAY_SPECS.map(
      (spec, index) => ({
        modelId: spec.modelId,
        environmentKey: spec.environmentKey,
        imageId:
          `sha256:${String(index + 1).repeat(64)}`
      })
    )
  );
  expect(collector.stdoutText()).toContain(
    "reopt ordinary\n"
  );
  expect(collector.stdoutText()).toContain(
    "scout ordinary\n"
  );
});
