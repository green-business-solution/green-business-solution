import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

import { expect, test } from "vitest";

import {
  POST_HOC_REPLAY_IMPLEMENTATION_PATHS,
  POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
  POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  POST_HOC_REPLAY_SCHEMA_VERSION,
  POST_HOC_REPLAY_SEMANTICS,
  assertLivePostHocReplayReceipt,
  loadPostHocReplayReceipt,
  sealPostHocReplayReceipt,
  validatePostHocReplayReceipt
} from "../storage/post-hoc-replay.mjs";

const execFileAsync = promisify(execFile);
const MODEL_ID = "reopt";
const MODEL_ROOT =
  "scripts/research/operational-savings/containers/reopt";
const MANIFEST_PATH = `${MODEL_ROOT}/build-manifest.json`;
const INPUT_PATH = `${MODEL_ROOT}/binary-input.dat`;
const VERIFIER_PATH = `${MODEL_ROOT}/verify.mjs`;
const IMAGE_ID = `sha256:${"a".repeat(64)}`;
const SOURCE_COMMIT = "b".repeat(40);

test("binds every writer, validator, inventory, and cleanup interpretation module", () => {
  expect(POST_HOC_REPLAY_IMPLEMENTATION_PATHS).toEqual([
    "scripts/research/operational-savings/verify-model-containers.mjs",
    "scripts/research/operational-savings/storage/post-hoc-replay.mjs",
    "scripts/research/operational-savings/storage/inventory.mjs",
    "scripts/research/operational-savings/storage/ecr-evidence.mjs"
  ]);
});

function sha256(value) {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

async function writeRepositoryFile(
  repoRoot,
  repositoryPath,
  bytes
) {
  const absolutePath = join(repoRoot, repositoryPath);
  await mkdir(dirname(absolutePath), {
    recursive: true
  });
  await writeFile(absolutePath, bytes);
}

async function git(repoRoot, args) {
  const result = await execFileAsync(
    "/usr/bin/git",
    ["-C", repoRoot, ...args],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_TERMINAL_PROMPT: "0",
        LANG: "C",
        LC_ALL: "C"
      }
    }
  );
  return result.stdout.trim();
}

async function replayFixture({
  commitReceipt = true,
  declaredInputSha256 = null
} = {}) {
  const repoRoot = await mkdtemp(
    join(tmpdir(), "retrofi-post-hoc-replay-")
  );
  const implementationBytes =
    POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
      (repositoryPath, index) =>
        Buffer.from(
          `export const implementation${index} = ${JSON.stringify(repositoryPath)};\n`
        )
    );
  const manifestBytes =
    Buffer.from('{"schemaVersion":1}\n');
  const inputBytes = Buffer.from([
    0x00,
    0xff,
    0x41,
    0x0a
  ]);
  const verifierBytes =
    Buffer.from("process.stdout.write('PASS\\n');\n");

  await git(repoRoot, ["init", "--quiet"]);
  await git(repoRoot, [
    "config",
    "user.name",
    "Receipt Test"
  ]);
  await git(repoRoot, [
    "config",
    "user.email",
    "receipt@example.test"
  ]);
  for (const [index, repositoryPath] of
    POST_HOC_REPLAY_IMPLEMENTATION_PATHS.entries()) {
    await writeRepositoryFile(
      repoRoot,
      repositoryPath,
      implementationBytes[index]
    );
  }
  await writeRepositoryFile(
    repoRoot,
    MANIFEST_PATH,
    manifestBytes
  );
  await writeRepositoryFile(
    repoRoot,
    INPUT_PATH,
    inputBytes
  );
  await writeRepositoryFile(
    repoRoot,
    VERIFIER_PATH,
    verifierBytes
  );
  await git(repoRoot, ["add", "."]);
  await git(repoRoot, [
    "commit",
    "--quiet",
    "-m",
    "freeze replay source"
  ]);
  const contextGitCommit = await git(repoRoot, [
    "rev-parse",
    "HEAD"
  ]);
  const contextGitTree = await git(repoRoot, [
    "rev-parse",
    "HEAD^{tree}"
  ]);
  const buildInputs = [
    {
      path: "binary-input.dat",
      repositoryPath: INPUT_PATH,
      sha256:
        declaredInputSha256 ?? sha256(inputBytes),
      byteSize: inputBytes.length
    }
  ];
  const verificationInputs = [
    {
      path: "verify.mjs",
      repositoryPath: VERIFIER_PATH,
      sha256: sha256(verifierBytes),
      byteSize: verifierBytes.length
    }
  ];
  const completeInputSetSha256 = sha256(
    JSON.stringify({
      buildInputs,
      verificationInputs
    })
  );
  const repositories = [
    {
      modelId: MODEL_ID,
      buildManifest: {
        path: MANIFEST_PATH,
        sha256: sha256(manifestBytes),
        buildEvidence: {
          contentBinding: {
            buildInputs,
            verificationInputs,
            completeInputSetSha256
          }
        }
      },
      localImage: {
        imageId: IMAGE_ID,
        verificationCommand:
          `node ${VERIFIER_PATH}`
      },
      remoteImage: {
        imageDigest: IMAGE_ID
      },
      provenance: {
        sourceCommit: SOURCE_COMMIT
      }
    }
  ];
  const receipt = sealPostHocReplayReceipt({
    schemaVersion: POST_HOC_REPLAY_SCHEMA_VERSION,
    status: "PASS_COMMITTED_POST_HOC_REPLAY",
    semantics: POST_HOC_REPLAY_SEMANTICS,
    executionEnvironment:
      POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
    contextGitCommit,
    contextGitTree,
    createdAt: "2026-07-24T20:00:00.000Z",
    implementationFiles:
      POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
        (path, index) => ({
          path,
          sha256: sha256(implementationBytes[index])
        })
      ),
    models: [
      {
        modelId: MODEL_ID,
        buildManifestPath: MANIFEST_PATH,
        buildManifestSha256: sha256(manifestBytes),
        completeInputSetSha256,
        imageId: IMAGE_ID,
        imageDigest: IMAGE_ID,
        sourceCommit: SOURCE_COMMIT,
        verifierPath: VERIFIER_PATH,
        verifierSha256: sha256(verifierBytes),
        exitCode: 0,
        stdoutSha256: sha256("PASS\n"),
        stdoutSizeBytes: 5,
        stderrSha256: sha256(""),
        stderrSizeBytes: 0,
        replayedAt: "2026-07-24T20:00:01.000Z",
        replayKind:
          POST_HOC_REPLAY_SEMANTICS.replayKind,
        historicalBuildContext:
          POST_HOC_REPLAY_SEMANTICS
            .historicalBuildContext
      }
    ]
  });
  await writeRepositoryFile(
    repoRoot,
    POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
    `${JSON.stringify(receipt, null, 2)}\n`
  );
  if (commitReceipt) {
    await git(repoRoot, [
      "add",
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    ]);
    await git(repoRoot, [
      "commit",
      "--quiet",
      "-m",
      "record replay receipt"
    ]);
  }
  return {
    repoRoot,
    repositories,
    receipt,
    inputBytes
  };
}

async function withReplayFixture(options, callback) {
  const fixture = await replayFixture(options);
  try {
    await callback(fixture);
  } finally {
    await rm(fixture.repoRoot, {
      recursive: true,
      force: true
    });
  }
}

test("accepts an exact committed post-hoc replay receipt with binary inputs", async () => {
  await withReplayFixture({}, async ({
    repoRoot,
    repositories,
    receipt
  }) => {
    await expect(
      validatePostHocReplayReceipt({
        repoRoot,
        repositories,
        receipt
      })
    ).resolves.toEqual(receipt);
    await expect(
      loadPostHocReplayReceipt({
        repoRoot,
        repositories
      })
    ).resolves.toMatchObject({
      path: POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
      status: "PASS_COMMITTED_POST_HOC_REPLAY",
      blocker: null,
      receipt
    });
  });
});

test("live-gates a persisted manifest against the exact committed receipt bytes", async () => {
  await withReplayFixture({}, async ({
    repoRoot,
    repositories,
    receipt
  }) => {
    const manifest = {
      destination: {
        ecr: {
          repositories,
          postHocReplayReceipt: {
            path:
              POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
            status:
              "PASS_COMMITTED_POST_HOC_REPLAY",
            blocker: null,
            receipt
          }
        }
      }
    };
    await expect(
      assertLivePostHocReplayReceipt({
        repoRoot,
        manifest
      })
    ).resolves.toEqual(
      manifest.destination.ecr
        .postHocReplayReceipt
    );

    const staleReceipt =
      sealPostHocReplayReceipt({
        ...receipt,
        createdAt: "2026-07-24T20:01:00.000Z"
      });
    manifest.destination.ecr.postHocReplayReceipt
      .receipt = staleReceipt;
    await expect(
      assertLivePostHocReplayReceipt({
        repoRoot,
        manifest
      })
    ).rejects.toThrow(
      /POST_HOC_REPLAY_MANIFEST_RECEIPT_MISMATCH/
    );
  });
});

test("rejects a nonexistent recorded context commit", async () => {
  await withReplayFixture({}, async ({
    repoRoot,
    repositories,
    receipt
  }) => {
    const invalidReceipt =
      sealPostHocReplayReceipt({
        ...receipt,
        contextGitCommit: "f".repeat(40)
      });
    await expect(
      validatePostHocReplayReceipt({
        repoRoot,
        repositories,
        receipt: invalidReceipt
      })
    ).rejects.toThrow();
  });
});

test("rejects receipts that omit the unsigned forgeability boundary", async () => {
  await withReplayFixture({}, async ({
    repoRoot,
    repositories,
    receipt
  }) => {
    const semantics = {
      ...receipt.semantics
    };
    delete semantics.forgeability;
    const invalidReceipt =
      sealPostHocReplayReceipt({
        ...receipt,
        semantics
      });
    await expect(
      validatePostHocReplayReceipt({
        repoRoot,
        repositories,
        receipt: invalidReceipt
      })
    ).rejects.toThrow(
      /POST_HOC_REPLAY_RECEIPT_INVALID/
    );
  });
});

test("does not inherit hostile Git object-directory environment state", async () => {
  await withReplayFixture({}, async ({
    repoRoot,
    repositories,
    receipt
  }) => {
    const previous =
      process.env.GIT_OBJECT_DIRECTORY;
    process.env.GIT_OBJECT_DIRECTORY =
      join(repoRoot, "hostile-object-directory");
    try {
      await expect(
        validatePostHocReplayReceipt({
          repoRoot,
          repositories,
          receipt
        })
      ).resolves.toEqual(receipt);
    } finally {
      if (previous === undefined) {
        delete process.env.GIT_OBJECT_DIRECTORY;
      } else {
        process.env.GIT_OBJECT_DIRECTORY =
          previous;
      }
    }
  });
});

test("rejects an input declaration that does not match the committed or local bytes", async () => {
  await withReplayFixture(
    {
      declaredInputSha256: "e".repeat(64)
    },
    async ({
      repoRoot,
      repositories,
      receipt
    }) => {
      await expect(
        validatePostHocReplayReceipt({
          repoRoot,
          repositories,
          receipt
        })
      ).rejects.toThrow(
        /POST_HOC_REPLAY_COMMIT_FILE_MISMATCH/
      );
    }
  );
});

test("rejects a receipt that has not been committed", async () => {
  await withReplayFixture(
    { commitReceipt: false },
    async ({ repoRoot, repositories }) => {
      await expect(
        loadPostHocReplayReceipt({
          repoRoot,
          repositories
        })
      ).resolves.toMatchObject({
        status: "INVALID"
      });
    }
  );
});

test("rejects local input mutation after the recorded context", async () => {
  await withReplayFixture({}, async ({
    repoRoot,
    repositories,
    receipt
  }) => {
    await writeRepositoryFile(
      repoRoot,
      INPUT_PATH,
      Buffer.from("mutated")
    );
    await expect(
      validatePostHocReplayReceipt({
        repoRoot,
        repositories,
        receipt
      })
    ).rejects.toThrow(
      /POST_HOC_REPLAY_COMMIT_FILE_MISMATCH/
    );
    await expect(
      validatePostHocReplayReceipt({
        repoRoot,
        repositories,
        receipt,
        requireCurrentInputFiles: false
      })
    ).resolves.toEqual(receipt);
  });
});

test("reports a missing receipt as pending without requiring Git history", async () => {
  const repoRoot = await mkdtemp(
    join(tmpdir(), "retrofi-post-hoc-missing-")
  );
  try {
    await expect(
      loadPostHocReplayReceipt({
        repoRoot,
        repositories: []
      })
    ).resolves.toEqual({
      path: POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
      status: "PENDING",
      blocker:
        "Run and commit the explicit post-hoc four-model replay receipt after the source context is frozen."
    });
  } finally {
    await rm(repoRoot, {
      recursive: true,
      force: true
    });
  }
});

test("committed receipt bytes are exact rather than reserialized JSON", async () => {
  await withReplayFixture({}, async ({
    repoRoot,
    repositories
  }) => {
    const receiptPath = join(
      repoRoot,
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH
    );
    const parsed = JSON.parse(
      await readFile(receiptPath, "utf8")
    );
    await writeFile(
      receiptPath,
      `${JSON.stringify(parsed)}\n`,
      "utf8"
    );
    await expect(
      loadPostHocReplayReceipt({
        repoRoot,
        repositories
      })
    ).resolves.toMatchObject({
      status: "INVALID",
      blocker:
        "POST_HOC_REPLAY_RECEIPT_NOT_COMMITTED"
    });
  });
});
