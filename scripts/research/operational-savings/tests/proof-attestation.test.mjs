import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import {
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { expect, test } from "vitest";

import {
  GIT_PATH,
  REAL_PROOF_TEST_ROOT,
  TRACKED_VITEST_CONFIG,
  buildAttestedVitestArguments,
  buildRealProofVitestArguments,
  clonePrivateDirectory,
  materializeCommittedProofSnapshot,
  removeCommittedProofSnapshot,
  resolveExactWorktreeAdminDirectory,
  runProofExecutionAttestation,
  sanitizedProofExecutionEnvironment,
  verifyCommittedProofSnapshotClean
} from "../proof-attestation.mjs";
import {
  assertProofExecutionIsolationMatches,
  assertProofExecutionSnapshotMatches,
  buildProofExecutionToolchainIdentity,
  installedDependencyTreeIdentity,
  regularFilesBelow
} from "../proof-execution-run-record.mjs";
import {
  NETWORK_ENFORCEMENT,
  networkSandboxRequired
} from "../lib/network-isolation.mjs";

const execFileAsync = promisify(execFile);

function canonicalize(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (
    value &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])])
    );
  }
  return value;
}

function sha256Canonical(value) {
  return createHash("sha256")
    .update(JSON.stringify(canonicalize(value)))
    .digest("hex");
}

function cacheIdentity(content) {
  const files = [
    {
      path: "proof-cache.txt",
      sizeBytes: Buffer.byteLength(content),
      executable: false,
      sha256: createHash("sha256")
        .update(content)
        .digest("hex")
    }
  ];
  const payload = {
    schemaVersion:
      "operational-savings/proof-execution-cache-identity-v1",
    files
  };
  return {
    ...payload,
    fileCount: files.length,
    totalSizeBytes: files[0].sizeBytes,
    digest: sha256Canonical(payload)
  };
}

async function git(args, cwd) {
  return execFileAsync(GIT_PATH, args, {
    cwd,
    encoding: "utf8",
    env: {
      PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_SYSTEM: "/dev/null"
    }
  });
}

async function initializeSnapshotFixture(repository) {
  await git(["init"], repository);
  await git(
    ["config", "user.email", "proof@example.invalid"],
    repository
  );
  await git(
    ["config", "user.name", "Proof Test"],
    repository
  );
  await Promise.all([
    mkdir(join(repository, "node_modules"), {
      recursive: true
    }),
    mkdir(
      join(
        repository,
        "scripts/research/operational-savings/.cache"
      ),
      { recursive: true }
    )
  ]);
  await writeFile(
    join(repository, ".gitignore"),
    [
      "node_modules/",
      "scripts/research/operational-savings/.cache/"
    ].join("\n") + "\n"
  );
  await writeFile(
    join(repository, "proof-source.txt"),
    "committed\n"
  );
  await git(
    ["add", ".gitignore", "proof-source.txt"],
    repository
  );
  await git(["commit", "-m", "proof fixture"], repository);
  const { stdout } = await git(
    ["rev-parse", "HEAD"],
    repository
  );
  return stdout.trim();
}

test("forces the tracked Vitest config for the complete real suite", () => {
  const arguments_ = buildRealProofVitestArguments([
    "--no-file-parallelism"
  ]);
  expect(arguments_).toContain(REAL_PROOF_TEST_ROOT);
  expect(
    arguments_.slice(-2)
  ).toEqual(["--config", TRACKED_VITEST_CONFIG]);
  expect(arguments_).not.toContain("vite.config.js");
});

test("keeps focused real runs while still forcing the tracked config", () => {
  const testPath =
    "scripts/research/operational-savings/tests/scout-real.test.mjs";
  const arguments_ = buildRealProofVitestArguments([
    testPath
  ]);
  expect(arguments_).toContain(testPath);
  expect(arguments_).not.toContain(REAL_PROOF_TEST_ROOT);
  expect(
    arguments_.slice(-2)
  ).toEqual(["--config", TRACKED_VITEST_CONFIG]);
});

test("executes attested Vitest from the private snapshot dependency tree", () => {
  const snapshotVitest =
    "/private/snapshot/node_modules/vitest/vitest.mjs";
  const arguments_ = buildAttestedVitestArguments(
    "/private/results/vitest.json",
    snapshotVitest
  );
  expect(arguments_[0]).toBe(snapshotVitest);
  expect(arguments_).not.toContain(
    join(
      process.cwd(),
      "node_modules/vitest/vitest.mjs"
    )
  );
});

test.each([
  ["--config", "vite.config.js"],
  ["-c", "vite.config.js"],
  ["--config=vite.config.js"]
])(
  "rejects a real-suite config override",
  (...arguments_) => {
    expect(() =>
      buildRealProofVitestArguments(arguments_)
    ).toThrow(/REAL_PROOF_CONFIG_OVERRIDE_FORBIDDEN/);
  }
);

test("removes the private run tree when run-directory setup fails", async () => {
  let capturedRunDirectory = null;
  await expect(
    runProofExecutionAttestation({
      repoRoot: process.cwd(),
      outputPath: join(
        tmpdir(),
        "proof-setup-failure-record.json"
      ),
      setupRunDirectory: async ({
        runDirectory,
        homePath
      }) => {
        capturedRunDirectory = runDirectory;
        await mkdir(homePath, {
          recursive: true
        });
        throw new Error(
          "injected private-run setup failure"
        );
      }
    })
  ).rejects.toThrow(/injected private-run setup failure/);
  expect(capturedRunDirectory).not.toBeNull();
  expect(
    await lstat(capturedRunDirectory)
      .then(() => true)
      .catch((error) => {
        if (error.code === "ENOENT") return false;
        throw error;
      })
  ).toBe(false);
});

test("sanitizes hostile runtime injection variables and pins exact proof tools", () => {
  const environment = sanitizedProofExecutionEnvironment({
    toolchainIdentity: {
      tools: [
        {
          toolId: "measur-cxx",
          resolvedPath: "/bound/tools/clang++"
        },
        {
          toolId: "ssc-python",
          resolvedPath: "/bound/tools/python3"
        }
      ]
    },
    homePath: "/private/proof-home",
    temporaryPath: "/private/proof-tmp",
    ambientEnvironment: {
      TERM: "xterm-256color",
      PATH: "/hostile/bin",
      NODE_OPTIONS: "--import=/tmp/forge.mjs",
      NODE_PATH: "/tmp/modules",
      SSC_PYTHON: "/tmp/fake-python",
      MEASUR_CXX: "/tmp/fake-clang",
      PYTHONPATH: "/tmp/python",
      PYTHONHOME: "/tmp/python-home",
      DYLD_INSERT_LIBRARIES: "/tmp/inject.dylib",
      LD_PRELOAD: "/tmp/inject.so",
      BASH_ENV: "/tmp/bash-env",
      OS_RESEARCH_NETWORK_ENFORCEMENT:
        NETWORK_ENFORCEMENT
    }
  });

  expect(environment).toMatchObject({
    PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
    HOME: "/private/proof-home",
    MEASUR_CXX: "/bound/tools/clang++",
    SSC_PYTHON: "/bound/tools/python3",
    OS_RESEARCH_NETWORK_ENFORCEMENT:
      NETWORK_ENFORCEMENT
  });
  for (const key of [
    "NODE_OPTIONS",
    "NODE_PATH",
    "PYTHONPATH",
    "PYTHONHOME",
    "DYLD_INSERT_LIBRARIES",
    "LD_PRELOAD",
    "BASH_ENV"
  ]) {
    expect(environment).not.toHaveProperty(key);
  }
});

test("a caller-set network marker cannot bypass the top-level sandbox", () => {
  expect(
    networkSandboxRequired({
      ambientNetworkEnforcement: NETWORK_ENFORCEMENT
    })
  ).toBe(true);
  expect(
    networkSandboxRequired({
      forceTopLevelSandbox: true,
      ambientNetworkEnforcement: NETWORK_ENFORCEMENT
    })
  ).toBe(true);
  expect(
    networkSandboxRequired({
      forceTopLevelSandbox: false,
      ambientNetworkEnforcement: NETWORK_ENFORCEMENT
    })
  ).toBe(false);
});

test("rejects symlinks and special entries below fingerprint roots", async () => {
  const root = await mkdtemp(
    join(tmpdir(), "retrofi-proof-tree-")
  );
  const linkedRoot = `${root}-link`;
  try {
    const target = join(root, "target.mjs");
    await writeFile(target, "export default true;\n");
    await symlink(target, join(root, "linked.mjs"));
    await expect(
      regularFilesBelow(root)
    ).rejects.toThrow(/FINGERPRINT_TREE_ENTRY_UNSAFE/);

    await rm(join(root, "linked.mjs"));
    const namedPipe = join(root, "named-pipe");
    await execFileAsync("/usr/bin/mkfifo", [namedPipe]);
    await expect(
      regularFilesBelow(root)
    ).rejects.toThrow(/FINGERPRINT_TREE_ENTRY_UNSAFE/);
    await rm(namedPipe);

    const excludedCache = join(root, ".cache");
    const includedNestedCache = join(
      root,
      "nested/.cache/input.mjs"
    );
    await mkdir(join(root, "nested/.cache"), {
      recursive: true
    });
    await writeFile(
      includedNestedCache,
      "export default 'included';\n"
    );
    await symlink(target, excludedCache);
    const files = await regularFilesBelow(root, {
      excludedAbsolutePaths: [excludedCache]
    });
    expect(files).toContain(includedNestedCache);
    expect(files).not.toContain(excludedCache);

    await symlink(root, linkedRoot, "dir");
    await expect(
      regularFilesBelow(linkedRoot)
    ).rejects.toThrow(/FINGERPRINT_TREE_ENTRY_UNSAFE/);
  } finally {
    await Promise.all([
      rm(linkedRoot, { force: true }),
      rm(root, { recursive: true, force: true })
    ]);
  }
});

test("runs from a detached committed snapshot that ignores a mutation-and-revert in the caller worktree", async () => {
  const repository = await mkdtemp(
    join(tmpdir(), "retrofi-proof-repository-")
  );
  const privateRoot = await mkdtemp(
    join(tmpdir(), "retrofi-proof-private-")
  );
  const snapshotRoot = join(privateRoot, "repository");
  let snapshotCreated = false;
  try {
    await git(["init"], repository);
    await git(
      ["config", "user.email", "proof@example.invalid"],
      repository
    );
    await git(
      ["config", "user.name", "Proof Test"],
      repository
    );
    await Promise.all([
      mkdir(join(repository, "node_modules"), {
        recursive: true
      }),
      mkdir(
        join(
          repository,
          "scripts/research/operational-savings/.cache"
        ),
        { recursive: true }
      )
    ]);
    const dependencyPath = join(
      repository,
      "node_modules/proof-dependency.txt"
    );
    const cachePath = join(
      repository,
      "scripts/research/operational-savings/.cache/proof-cache.txt"
    );
    await Promise.all([
      writeFile(dependencyPath, "original dependency\n"),
      writeFile(cachePath, "original cache\n")
    ]);
    await writeFile(
      join(repository, ".gitignore"),
      [
        "node_modules/",
        "scripts/research/operational-savings/.cache/"
      ].join("\n") + "\n"
    );
    const sourcePath = join(
      repository,
      "proof-source.txt"
    );
    await writeFile(sourcePath, "committed\n");
    await git(["add", ".gitignore", "proof-source.txt"], repository);
    await git(["commit", "-m", "proof fixture"], repository);
    const { stdout } = await git(
      ["rev-parse", "HEAD"],
      repository
    );
    const commit = stdout.trim();

    await materializeCommittedProofSnapshot({
      repoRoot: repository,
      snapshotRoot,
      expectedCommit: commit
    });
    snapshotCreated = true;
    expect(
      await readFile(
        join(snapshotRoot, "proof-source.txt"),
        "utf8"
      )
    ).toBe("committed\n");
    expect(
      await readFile(
        join(
          snapshotRoot,
          "node_modules/proof-dependency.txt"
        ),
        "utf8"
      )
    ).toBe("original dependency\n");
    expect(
      await readFile(
        join(
          snapshotRoot,
          "scripts/research/operational-savings/.cache/proof-cache.txt"
        ),
        "utf8"
      )
    ).toBe("original cache\n");

    await writeFile(sourcePath, "transient mutation\n");
    await writeFile(sourcePath, "committed\n");
    await Promise.all([
      writeFile(dependencyPath, "mutated dependency\n"),
      writeFile(cachePath, "mutated cache\n")
    ]);

    expect(
      await readFile(
        join(snapshotRoot, "proof-source.txt"),
        "utf8"
      )
    ).toBe("committed\n");
    expect(
      await readFile(
        join(
          snapshotRoot,
          "node_modules/proof-dependency.txt"
        ),
        "utf8"
      )
    ).toBe("original dependency\n");
    expect(
      await readFile(
        join(
          snapshotRoot,
          "scripts/research/operational-savings/.cache/proof-cache.txt"
        ),
        "utf8"
      )
    ).toBe("original cache\n");
    await verifyCommittedProofSnapshotClean({
      repoRoot: repository,
      snapshotRoot,
      expectedCommit: commit
    });
  } finally {
    if (snapshotCreated) {
      await removeCommittedProofSnapshot({
        repoRoot: repository,
        snapshotRoot
      });
    }
    await Promise.all([
      rm(privateRoot, { recursive: true, force: true }),
      rm(repository, { recursive: true, force: true })
    ]);
  }
});

test("removes the worktree and private copies when snapshot setup fails", async () => {
  const repository = await mkdtemp(
    join(tmpdir(), "retrofi-proof-setup-failure-")
  );
  const privateRoot = await mkdtemp(
    join(tmpdir(), "retrofi-proof-setup-private-")
  );
  const snapshotRoot = join(privateRoot, "repository");
  try {
    const commit =
      await initializeSnapshotFixture(repository);
    let copyCount = 0;
    await expect(
      materializeCommittedProofSnapshot({
        repoRoot: repository,
        snapshotRoot,
        expectedCommit: commit,
        cloneDirectory: async (source, destination) => {
          copyCount += 1;
          if (copyCount === 2) {
            throw new Error("injected cache-copy failure");
          }
          await clonePrivateDirectory(source, destination);
        }
      })
    ).rejects.toThrow(/injected cache-copy failure/);
    expect(
      await lstat(snapshotRoot)
        .then(() => true)
        .catch((error) => {
          if (error.code === "ENOENT") return false;
          throw error;
        })
    ).toBe(false);
    const { stdout } = await git(
      ["worktree", "list", "--porcelain"],
      repository
    );
    expect(stdout).not.toContain(snapshotRoot);
  } finally {
    await Promise.all([
      rm(privateRoot, { recursive: true, force: true }),
      rm(repository, { recursive: true, force: true })
    ]);
  }
});

test("removes only the target registration and preserves an unrelated stale worktree when primary removal fails", async () => {
  const repository = await mkdtemp(
    join(tmpdir(), "retrofi-proof-cleanup-fallback-")
  );
  const privateRoot = await mkdtemp(
    join(tmpdir(), "retrofi-proof-cleanup-private-")
  );
  const snapshotRoot = join(privateRoot, "repository");
  const unrelatedRoot = join(privateRoot, "unrelated");
  try {
    const commit =
      await initializeSnapshotFixture(repository);
    await materializeCommittedProofSnapshot({
      repoRoot: repository,
      snapshotRoot,
      expectedCommit: commit
    });
    await git(
      [
        "worktree",
        "add",
        "--detach",
        unrelatedRoot,
        commit
      ],
      repository
    );
    const unrelatedRegistration =
      await resolveExactWorktreeAdminDirectory({
        repoRoot: repository,
        snapshotRoot: unrelatedRoot
      });
    expect(unrelatedRegistration).not.toBeNull();
    await rm(unrelatedRoot, {
      recursive: true,
      force: true
    });
    await removeCommittedProofSnapshot({
      repoRoot: repository,
      snapshotRoot,
      operations: {
        removeRegisteredWorktree: async () => {
          throw new Error(
            "injected worktree-remove failure"
          );
        }
      }
    });
    const { stdout } = await git(
      ["worktree", "list", "--porcelain"],
      repository
    );
    expect(stdout).not.toContain(snapshotRoot);
    expect(
      await lstat(
        unrelatedRegistration.adminDirectory
      ).then((details) => details.isDirectory())
    ).toBe(true);
    expect(
      await resolveExactWorktreeAdminDirectory({
        repoRoot: repository,
        snapshotRoot
      })
    ).toBeNull();
    expect(
      await lstat(snapshotRoot)
        .then(() => true)
        .catch((error) => {
          if (error.code === "ENOENT") return false;
          throw error;
        })
    ).toBe(false);
  } finally {
    await Promise.all([
      rm(privateRoot, { recursive: true, force: true }),
      rm(repository, { recursive: true, force: true })
    ]);
  }
});

test("binds workspace links and rejects extraneous installed package roots", async () => {
  const repository = await mkdtemp(
    join(tmpdir(), "retrofi-proof-dependencies-")
  );
  try {
    const lock = {
      name: "proof-dependencies",
      lockfileVersion: 3,
      packages: {
        "": {
          name: "proof-dependencies"
        },
        "apps/api": {
          name: "@gbs/api",
          version: "1.0.0"
        },
        "node_modules/dependency": {
          version: "1.0.0",
          integrity: "sha512-YQ=="
        },
        "node_modules/@gbs/api": {
          resolved: "apps/api",
          link: true
        }
      }
    };
    await Promise.all([
      mkdir(join(repository, "node_modules/dependency"), {
        recursive: true
      }),
      mkdir(join(repository, "node_modules/@gbs"), {
        recursive: true
      }),
      mkdir(join(repository, "apps/api"), {
        recursive: true
      })
    ]);
    await Promise.all([
      writeFile(
        join(repository, "package-lock.json"),
        `${JSON.stringify(lock)}\n`
      ),
      writeFile(
        join(repository, "node_modules/.package-lock.json"),
        `${JSON.stringify(lock)}\n`
      ),
      writeFile(
        join(repository, "node_modules/dependency/index.js"),
        "export default true;\n"
      ),
      writeFile(
        join(repository, "apps/api/index.mjs"),
        "export const api = true;\n"
      )
    ]);
    await symlink(
      "../../apps/api",
      join(repository, "node_modules/@gbs/api"),
      "dir"
    );
    const identity =
      await installedDependencyTreeIdentity(repository);
    expect(identity.workspaceLinkCount).toBe(1);
    expect(identity.installedPackageRootCount).toBe(2);

    await mkdir(
      join(repository, "node_modules/extraneous"),
      {
        recursive: true
      }
    );
    await expect(
      installedDependencyTreeIdentity(repository)
    ).rejects.toThrow(
      /PROOF_EXECUTION_PACKAGE_ROOT_CATALOG_MISMATCH/
    );
  } finally {
    await rm(repository, {
      recursive: true,
      force: true
    });
  }
});

test("rejects a workspace package link that does not resolve to its lockfile target", async () => {
  const repository = await mkdtemp(
    join(tmpdir(), "retrofi-proof-workspace-link-")
  );
  try {
    const lock = {
      lockfileVersion: 3,
      packages: {
        "": {},
        "apps/api": {
          name: "@gbs/api",
          version: "1.0.0"
        },
        "node_modules/@gbs/api": {
          resolved: "apps/api",
          link: true
        }
      }
    };
    await Promise.all([
      mkdir(join(repository, "node_modules/@gbs"), {
        recursive: true
      }),
      mkdir(join(repository, "apps/api"), {
        recursive: true
      }),
      mkdir(join(repository, "apps/other"), {
        recursive: true
      })
    ]);
    await Promise.all([
      writeFile(
        join(repository, "package-lock.json"),
        JSON.stringify(lock)
      ),
      writeFile(
        join(repository, "node_modules/.package-lock.json"),
        JSON.stringify(lock)
      ),
      writeFile(
        join(repository, "apps/api/index.mjs"),
        "export const api = true;\n"
      ),
      writeFile(
        join(repository, "apps/other/index.mjs"),
        "export const other = true;\n"
      )
    ]);
    await symlink(
      "../../apps/other",
      join(repository, "node_modules/@gbs/api"),
      "dir"
    );
    await expect(
      installedDependencyTreeIdentity(repository)
    ).rejects.toThrow(
      /PROOF_EXECUTION_WORKSPACE_LINK_INVALID/
    );
  } finally {
    await rm(repository, {
      recursive: true,
      force: true
    });
  }
});

test("fails closed when original and private cache identities differ", {
  timeout: 30_000
}, async () => {
  const toolchain =
    await buildProofExecutionToolchainIdentity({
      repoRoot: process.cwd()
    });
  const originalCache = cacheIdentity("original\n");
  const snapshotCache = cacheIdentity("snapshot\n");
  expect(
    toolchain.bindingScope.unboundInputs
  ).toEqual(
    expect.arrayContaining([
      "OPERATING_SYSTEM_RUNTIME",
      "DYNAMIC_LIBRARIES_LOADED_BY_BOUND_EXECUTABLES",
      "PYTHON_STANDARD_LIBRARY_AND_SITE_PACKAGES_OUTSIDE_NODE_MODULES",
      "COMPILER_SDK_HEADERS_LIBRARIES_AND_DRIVER_DISCOVERY"
    ])
  );
  expect(() =>
    assertProofExecutionIsolationMatches({
      privateCopyMode:
        "MACOS_CLONEFILE_OR_PRIVATE_COPY",
      originalPreToolchainIdentity: toolchain,
      originalPostToolchainIdentity: toolchain,
      snapshotPreToolchainIdentity: toolchain,
      snapshotPostToolchainIdentity: toolchain,
      originalPreCacheIdentity: originalCache,
      originalPostCacheIdentity: originalCache,
      snapshotPreCacheIdentity: snapshotCache,
      snapshotPostCacheIdentity: snapshotCache
    })
  ).toThrow(/PROOF_EXECUTION_ISOLATED_CACHE_MISMATCH/);
});

test("rejects relevant dirty or untracked source that is absent from the committed snapshot", () => {
  const snapshotPayload = {
    sourceEvidenceFingerprint: {
      schemaVersion:
        "operational-savings/proof-source-evidence-fingerprint-v2",
      algorithm: "SHA-256",
      files: [],
      digest: "a".repeat(64),
      fileCount: 0,
      testCatalogFingerprint: "b".repeat(64)
    },
    artifactIdentityCatalog: {
      schemaVersion:
        "operational-savings/proof-artifact-identity-catalog-v1",
      artifacts: [],
      artifactCount: 0,
      digest: "c".repeat(64)
    }
  };
  const snapshotState = {
    capturedAt: "2026-07-24T00:00:00.000Z",
    ...snapshotPayload,
    snapshotStateSha256:
      sha256Canonical(snapshotPayload)
  };
  const originalState = {
    sourceEvidenceFingerprint: {
      ...snapshotPayload.sourceEvidenceFingerprint,
      files: [
        {
          path: "untracked-proof-input.mjs",
          sizeBytes: 1,
          executable: false,
          sha256: "d".repeat(64)
        }
      ],
      fileCount: 1,
      digest: "e".repeat(64)
    },
    artifactIdentityCatalog:
      snapshotPayload.artifactIdentityCatalog
  };

  expect(() =>
    assertProofExecutionSnapshotMatches({
      preRunInputState: originalState,
      preRunSnapshotState: snapshotState,
      postRunSnapshotState: snapshotState
    })
  ).toThrow(/PROOF_EXECUTION_SNAPSHOT_SOURCE_MISMATCH/);
});
