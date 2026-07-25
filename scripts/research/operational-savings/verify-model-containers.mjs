#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto";
import { execFile, spawnSync } from "node:child_process";
import { constants } from "node:fs";
import {
  link,
  lstat,
  open,
  readFile,
  realpath,
  unlink
} from "node:fs/promises";
import {
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep
} from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

import {
  DEFAULT_REPO_ROOT,
  buildResearchEcrInventory
} from "./storage/inventory.mjs";
import {
  POST_HOC_REPLAY_EXECUTION_ENVIRONMENT,
  POST_HOC_REPLAY_IMPLEMENTATION_PATHS,
  POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  POST_HOC_REPLAY_SCHEMA_VERSION,
  POST_HOC_REPLAY_SEMANTICS,
  sealPostHocReplayReceipt
} from "./storage/post-hoc-replay.mjs";

const execFileAsync = promisify(execFile);
const scriptPath = fileURLToPath(import.meta.url);
const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const SHA256_IDENTIFIER_PATTERN = /^sha256:[a-f0-9]{64}$/;
const GIT_OBJECT_PATTERN = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/;

export const MODEL_CONTAINER_REPLAY_SPECS = Object.freeze([
  Object.freeze({
    modelId: "reopt",
    environmentKey: "REOPT_IMAGE"
  }),
  Object.freeze({
    modelId: "ssc",
    environmentKey: "SSC_IMAGE"
  }),
  Object.freeze({
    modelId: "measur",
    environmentKey: "MEASUR_IMAGE"
  }),
  Object.freeze({
    modelId: "scout",
    environmentKey: "SCOUT_IMAGE"
  })
]);
const MODEL_IMAGE_ENVIRONMENT_KEYS = new Set(
  MODEL_CONTAINER_REPLAY_SPECS.map(
    (spec) => spec.environmentKey
  )
);

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

function safeRepositoryPath(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    !isAbsolute(value) &&
    !value.includes("\\") &&
    !/[\u0000-\u001f\u007f]/.test(value) &&
    value.split("/").every(
      (segment) =>
        segment.length > 0 &&
        segment !== "." &&
        segment !== ".."
    )
  );
}

function safeReceiptRepositoryPath(value) {
  const segments =
    typeof value === "string"
      ? value.split("/")
      : [];
  return (
    safeRepositoryPath(value) &&
    value.startsWith(
      "scripts/research/operational-savings/containers/"
    ) &&
    value.endsWith(".json") &&
    !segments.includes(".git")
  );
}

function repositoryAbsolutePath(repoRoot, repositoryPath) {
  if (!safeRepositoryPath(repositoryPath)) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_REPOSITORY_PATH_INVALID: ${repositoryPath}`
    );
  }
  const absolutePath = join(repoRoot, repositoryPath);
  const contained = relative(repoRoot, absolutePath);
  if (
    contained === ".." ||
    contained.startsWith(`..${sep}`) ||
    isAbsolute(contained)
  ) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_REPOSITORY_PATH_ESCAPE: ${repositoryPath}`
    );
  }
  return absolutePath;
}

async function readRepositoryRegularFile(repoRoot, repositoryPath) {
  const absolutePath = repositoryAbsolutePath(
    repoRoot,
    repositoryPath
  );
  const details = await lstat(absolutePath);
  if (!details.isFile() || details.isSymbolicLink()) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_REGULAR_FILE_REQUIRED: ${repositoryPath}`
    );
  }
  const [canonicalRoot, canonicalPath] =
    await Promise.all([
      realpath(repoRoot),
      realpath(absolutePath)
    ]);
  if (
    canonicalPath !==
    join(canonicalRoot, repositoryPath)
  ) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_FILE_PATH_SYMLINKED: ${repositoryPath}`
    );
  }
  const handle = await open(
    canonicalPath,
    constants.O_RDONLY | constants.O_NOFOLLOW
  );
  try {
    const before = await handle.stat({
      bigint: true
    });
    if (!before.isFile()) {
      throw new Error(
        `MODEL_CONTAINER_REPLAY_REGULAR_FILE_REQUIRED: ${repositoryPath}`
      );
    }
    const bytes = await handle.readFile();
    const after = await handle.stat({
      bigint: true
    });
    if (
      before.dev !== after.dev ||
      before.ino !== after.ino ||
      before.size !== after.size ||
      before.mtimeNs !== after.mtimeNs ||
      before.ctimeNs !== after.ctimeNs
    ) {
      throw new Error(
        `MODEL_CONTAINER_REPLAY_FILE_CHANGED: ${repositoryPath}`
      );
    }
    return bytes;
  } finally {
    await handle.close();
  }
}

async function defaultGitRunner(
  repoRoot,
  args,
  { encoding } = {}
) {
  const result = await execFileAsync(
    "/usr/bin/git",
    ["-C", repoRoot, ...args],
    {
      encoding: encoding ?? null,
      maxBuffer: 64 * 1024 * 1024,
      env: {
        PATH: "/usr/bin:/bin",
        LANG: "C",
        LC_ALL: "C",
        GIT_CONFIG_GLOBAL: "/dev/null",
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_CONFIG_SYSTEM: "/dev/null",
        GIT_CONFIG_COUNT: "0",
        GIT_OPTIONAL_LOCKS: "0",
        GIT_TERMINAL_PROMPT: "0",
      }
    }
  );
  return result.stdout;
}

async function gitOutput({
  gitRunner,
  repoRoot,
  args,
  encoding
}) {
  const result = await gitRunner(
    repoRoot,
    args,
    { encoding }
  );
  return result?.stdout ?? result;
}

async function gitText(options) {
  const output = await gitOutput({
    ...options,
    encoding: "utf8"
  });
  return String(output).trim();
}

async function gitBlob({
  gitRunner,
  repoRoot,
  revision,
  repositoryPath
}) {
  const output = await gitOutput({
    gitRunner,
    repoRoot,
    args: [
      "cat-file",
      "blob",
      `${revision}:${repositoryPath}`
    ]
  });
  return Buffer.isBuffer(output)
    ? output
    : Buffer.from(output);
}

export async function captureCleanCommittedSourceContext({
  repoRoot,
  gitRunner = defaultGitRunner
}) {
  const status = await gitOutput({
    gitRunner,
    repoRoot,
    args: [
      "status",
      "--porcelain=v1",
      "-z",
      "--untracked-files=all"
    ]
  });
  const statusBytes = Buffer.isBuffer(status)
    ? status
    : Buffer.from(status);
  if (statusBytes.length !== 0) {
    throw new Error(
      "MODEL_CONTAINER_REPLAY_SOURCE_CONTEXT_DIRTY"
    );
  }
  const [contextGitCommit, contextGitTree] =
    await Promise.all([
      gitText({
        gitRunner,
        repoRoot,
        args: ["rev-parse", "--verify", "HEAD^{commit}"]
      }),
      gitText({
        gitRunner,
        repoRoot,
        args: ["rev-parse", "--verify", "HEAD^{tree}"]
      })
    ]);
  if (
    !GIT_OBJECT_PATTERN.test(contextGitCommit) ||
    !GIT_OBJECT_PATTERN.test(contextGitTree)
  ) {
    throw new Error(
      "MODEL_CONTAINER_REPLAY_SOURCE_CONTEXT_INVALID"
    );
  }
  return {
    contextGitCommit,
    contextGitTree
  };
}

function assertSameSourceContext(expected, actual) {
  if (
    actual.contextGitCommit !== expected.contextGitCommit ||
    actual.contextGitTree !== expected.contextGitTree
  ) {
    throw new Error(
      "MODEL_CONTAINER_REPLAY_SOURCE_CONTEXT_CHANGED"
    );
  }
}

function exactVerifierPath(repository) {
  const command =
    repository.localImage?.verificationCommand;
  const match =
    typeof command === "string"
      ? command.match(/^node\s+([^\s]+)$/)
      : null;
  if (!match || !safeRepositoryPath(match[1])) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_VERIFIER_COMMAND_INVALID: ${repository.modelId}`
    );
  }
  return match[1];
}

function assertReplayInventory(inventory) {
  const repositories = inventory?.repositories;
  if (
    !Array.isArray(repositories) ||
    repositories.length !==
      MODEL_CONTAINER_REPLAY_SPECS.length
  ) {
    throw new Error(
      "MODEL_CONTAINER_REPLAY_INVENTORY_SET_INVALID"
    );
  }
  return repositories.map((repository, index) => {
    const spec = MODEL_CONTAINER_REPLAY_SPECS[index];
    const contentBinding =
      repository.buildManifest?.buildEvidence
        ?.contentBinding;
    const verifierPath = exactVerifierPath(repository);
    const verifierInputs = [
      ...(contentBinding?.buildInputs ?? []),
      ...(contentBinding?.verificationInputs ?? [])
    ].filter(
      (input) =>
        input.repositoryPath === verifierPath
    );
    if (
      repository.modelId !== spec.modelId ||
      repository.buildManifest?.status !== "VERIFIED" ||
      !safeRepositoryPath(
        repository.buildManifest?.path
      ) ||
      !SHA256_PATTERN.test(
        repository.buildManifest?.sha256 ?? ""
      ) ||
      contentBinding?.status !==
        "VERIFIED_EXACT_LOCAL_CONTENT" ||
      !Array.isArray(contentBinding.buildInputs) ||
      !Array.isArray(contentBinding.verificationInputs) ||
      !SHA256_PATTERN.test(
        contentBinding.completeInputSetSha256 ?? ""
      ) ||
      !SHA256_IDENTIFIER_PATTERN.test(
        repository.localImage?.imageId ?? ""
      ) ||
      repository.localImage.imageId !==
        repository.remoteImage?.imageDigest ||
      !GIT_OBJECT_PATTERN.test(
        repository.provenance?.sourceCommit ?? ""
      ) ||
      verifierInputs.length !== 1 ||
      !SHA256_PATTERN.test(
        verifierInputs[0].sha256 ?? ""
      )
    ) {
      throw new Error(
        `MODEL_CONTAINER_REPLAY_INVENTORY_ENTRY_INVALID: ${spec.modelId}`
      );
    }
    for (const input of [
      ...contentBinding.buildInputs,
      ...contentBinding.verificationInputs
    ]) {
      if (
        !safeRepositoryPath(input?.repositoryPath) ||
        !SHA256_PATTERN.test(input?.sha256 ?? "")
      ) {
        throw new Error(
          `MODEL_CONTAINER_REPLAY_INPUT_INVALID: ${spec.modelId}`
        );
      }
    }
    return {
      spec,
      repository,
      contentBinding,
      verifierPath,
      verifierSha256: verifierInputs[0].sha256
    };
  });
}

async function collectCommittedFileBindings({
  repoRoot,
  contextGitCommit,
  modelBindings,
  gitRunner
}) {
  const expectedFiles = new Map();
  const addExpectedFile = (repositoryPath, sha256) => {
    const prior = expectedFiles.get(repositoryPath);
    if (prior && prior !== sha256) {
      throw new Error(
        `MODEL_CONTAINER_REPLAY_FILE_BINDING_CONFLICT: ${repositoryPath}`
      );
    }
    expectedFiles.set(repositoryPath, sha256);
  };

  for (const repositoryPath of
    POST_HOC_REPLAY_IMPLEMENTATION_PATHS) {
    const bytes = await readRepositoryRegularFile(
      repoRoot,
      repositoryPath
    );
    addExpectedFile(
      repositoryPath,
      sha256Bytes(bytes)
    );
  }
  for (const {
    repository,
    contentBinding
  } of modelBindings) {
    addExpectedFile(
      repository.buildManifest.path,
      repository.buildManifest.sha256
    );
    for (const input of [
      ...contentBinding.buildInputs,
      ...contentBinding.verificationInputs
    ]) {
      addExpectedFile(
        input.repositoryPath,
        input.sha256
      );
    }
  }

  await Promise.all(
    [...expectedFiles].map(
      async ([repositoryPath, expectedSha256]) => {
        const [localBytes, committedBytes] =
          await Promise.all([
            readRepositoryRegularFile(
              repoRoot,
              repositoryPath
            ),
            gitBlob({
              gitRunner,
              repoRoot,
              revision: contextGitCommit,
              repositoryPath
            })
          ]);
        if (
          sha256Bytes(localBytes) !== expectedSha256 ||
          sha256Bytes(committedBytes) !== expectedSha256
        ) {
          throw new Error(
            `MODEL_CONTAINER_REPLAY_COMMITTED_FILE_MISMATCH: ${repositoryPath}`
          );
        }
      }
    )
  );
  return expectedFiles;
}

async function assertCommittedFileBindings({
  repoRoot,
  contextGitCommit,
  expectedFiles,
  gitRunner
}) {
  await Promise.all(
    [...expectedFiles].map(
      async ([repositoryPath, expectedSha256]) => {
        const [localBytes, committedBytes] =
          await Promise.all([
            readRepositoryRegularFile(
              repoRoot,
              repositoryPath
            ),
            gitBlob({
              gitRunner,
              repoRoot,
              revision: contextGitCommit,
              repositoryPath
            })
          ]);
        if (
          sha256Bytes(localBytes) !== expectedSha256 ||
          sha256Bytes(committedBytes) !== expectedSha256
        ) {
          throw new Error(
            `MODEL_CONTAINER_REPLAY_COMMITTED_FILE_CHANGED: ${repositoryPath}`
          );
        }
      }
    )
  );
}

export function sanitizedReplayVerifierEnvironment({
  environmentKey,
  imageId
}) {
  if (
    !MODEL_IMAGE_ENVIRONMENT_KEYS.has(
      environmentKey
    ) ||
    !SHA256_IDENTIFIER_PATTERN.test(imageId ?? "")
  ) {
    throw new Error(
      "MODEL_CONTAINER_REPLAY_ENVIRONMENT_BINDING_INVALID"
    );
  }
  return {
    PATH:
      "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin",
    LANG: "C",
    LC_ALL: "C",
    HOME: "/var/empty",
    DOCKER_CONFIG: "/var/empty",
    DOCKER_HOST: "unix:///var/run/docker.sock",
    [environmentKey]: imageId
  };
}

function defaultVerifierRunner({
  repoRoot,
  verifierPath,
  environmentKey,
  imageId
}) {
  return spawnSync(
    process.execPath,
    [join(repoRoot, verifierPath)],
    {
      cwd: repoRoot,
      env: sanitizedReplayVerifierEnvironment({
        environmentKey,
        imageId
      }),
      encoding: null,
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 64 * 1024 * 1024
    }
  );
}

function outputBuffer(value) {
  if (Buffer.isBuffer(value)) return value;
  if (value == null) return Buffer.alloc(0);
  return Buffer.from(String(value));
}

async function executeVerifier({
  binding,
  repoRoot,
  verifierRunner,
  output
}) {
  const result = await verifierRunner({
    modelId: binding.spec.modelId,
    repoRoot,
    verifierPath: binding.verifierPath,
    environmentKey: binding.spec.environmentKey,
    imageId: binding.repository.localImage.imageId
  });
  const stdout = outputBuffer(result?.stdout);
  const stderr = outputBuffer(result?.stderr);
  if (stdout.length > 0) output.stdout.write(stdout);
  if (stderr.length > 0) output.stderr.write(stderr);
  if (result?.error) throw result.error;
  if (result?.status !== 0) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_FAILED: ${binding.spec.modelId} exited ${String(result?.status)}`
    );
  }
  if (stdout.length === 0) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_STDOUT_EMPTY: ${binding.spec.modelId}`
    );
  }
  return {
    stdout,
    stderr,
    exitCode: result.status
  };
}

function isoTimestamp(clock) {
  const value = clock();
  const timestamp =
    value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(timestamp.getTime())) {
    throw new Error(
      "MODEL_CONTAINER_REPLAY_TIMESTAMP_INVALID"
    );
  }
  return timestamp.toISOString();
}

async function assertReceiptParentDirectory({
  repoRoot,
  receiptRelativePath
}) {
  if (!safeReceiptRepositoryPath(receiptRelativePath)) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_RECEIPT_PATH_INVALID: ${receiptRelativePath}`
    );
  }
  const absolutePath = repositoryAbsolutePath(
    repoRoot,
    receiptRelativePath
  );
  let cursor = repoRoot;
  const directorySegments = dirname(
    receiptRelativePath
  ).split("/");
  if (
    directorySegments.length === 1 &&
    directorySegments[0] === "."
  ) {
    return absolutePath;
  }
  for (const segment of directorySegments) {
    cursor = join(cursor, segment);
    const details = await lstat(cursor);
    if (!details.isDirectory() || details.isSymbolicLink()) {
      throw new Error(
        `MODEL_CONTAINER_REPLAY_RECEIPT_PARENT_INVALID: ${receiptRelativePath}`
      );
    }
  }
  return absolutePath;
}

async function assertReceiptAbsent(options) {
  const absolutePath =
    await assertReceiptParentDirectory(options);
  try {
    await lstat(absolutePath);
  } catch (error) {
    if (error.code === "ENOENT") return absolutePath;
    throw error;
  }
  throw new Error(
    `MODEL_CONTAINER_REPLAY_RECEIPT_ALREADY_EXISTS: ${options.receiptRelativePath}`
  );
}

export async function writeReceiptExclusive({
  repoRoot,
  receiptRelativePath,
  receipt
}) {
  const absolutePath = await assertReceiptAbsent({
    repoRoot,
    receiptRelativePath
  });
  const temporaryPath = join(
    dirname(absolutePath),
    `.${randomUUID()}.post-hoc-replay.tmp`
  );
  let handle = null;
  try {
    handle = await open(temporaryPath, "wx", 0o644);
    await handle.writeFile(
      `${JSON.stringify(receipt, null, 2)}\n`,
      "utf8"
    );
    await handle.sync();
    await handle.close();
    handle = null;
    await link(temporaryPath, absolutePath);
  } finally {
    if (handle) {
      await handle.close().catch(() => {});
    }
    await unlink(temporaryPath).catch(
      (error) => {
        if (error.code !== "ENOENT") throw error;
      }
    );
  }
  return absolutePath;
}

export async function runPostHocReplayAndWriteReceipt({
  repoRoot = DEFAULT_REPO_ROOT,
  receiptRelativePath =
    POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  inventoryBuilder = buildResearchEcrInventory,
  verifierRunner = defaultVerifierRunner,
  gitRunner = defaultGitRunner,
  clock = () => new Date(),
  output = {
    stdout: process.stdout,
    stderr: process.stderr
  }
} = {}) {
  if (verifierRunner !== defaultVerifierRunner) {
    throw new Error(
      "MODEL_CONTAINER_REPLAY_CUSTOM_RUNNER_RECEIPT_FORBIDDEN"
    );
  }
  const normalizedRepoRoot = resolve(repoRoot);
  const receiptPath = await assertReceiptAbsent({
    repoRoot: normalizedRepoRoot,
    receiptRelativePath
  });
  const initialContext =
    await captureCleanCommittedSourceContext({
      repoRoot: normalizedRepoRoot,
      gitRunner
    });
  const inventory = await inventoryBuilder({
    repoRoot: normalizedRepoRoot
  });
  const modelBindings = assertReplayInventory(
    inventory
  );
  const expectedFiles =
    await collectCommittedFileBindings({
      repoRoot: normalizedRepoRoot,
      contextGitCommit:
        initialContext.contextGitCommit,
      modelBindings,
      gitRunner
    });
  const preReplayContext =
    await captureCleanCommittedSourceContext({
      repoRoot: normalizedRepoRoot,
      gitRunner
    });
  assertSameSourceContext(
    initialContext,
    preReplayContext
  );
  const modelReceipts = [];

  for (const binding of modelBindings) {
    const replay = await executeVerifier({
      binding,
      repoRoot: normalizedRepoRoot,
      verifierRunner,
      output
    });
    const stableContext =
      await captureCleanCommittedSourceContext({
        repoRoot: normalizedRepoRoot,
        gitRunner
      });
    assertSameSourceContext(
      initialContext,
      stableContext
    );
    modelReceipts.push({
      modelId: binding.spec.modelId,
      buildManifestPath:
        binding.repository.buildManifest.path,
      buildManifestSha256:
        binding.repository.buildManifest.sha256,
      completeInputSetSha256:
        binding.contentBinding.completeInputSetSha256,
      imageId:
        binding.repository.localImage.imageId,
      imageDigest:
        binding.repository.remoteImage.imageDigest,
      sourceCommit:
        binding.repository.provenance.sourceCommit,
      verifierPath: binding.verifierPath,
      verifierSha256: binding.verifierSha256,
      exitCode: replay.exitCode,
      stdoutSha256: sha256Bytes(replay.stdout),
      stdoutSizeBytes: replay.stdout.length,
      stderrSha256: sha256Bytes(replay.stderr),
      stderrSizeBytes: replay.stderr.length,
      replayedAt: isoTimestamp(clock),
      replayKind:
        POST_HOC_REPLAY_SEMANTICS.replayKind,
      historicalBuildContext:
        POST_HOC_REPLAY_SEMANTICS
          .historicalBuildContext
    });
  }
  await assertCommittedFileBindings({
    repoRoot: normalizedRepoRoot,
    contextGitCommit:
      initialContext.contextGitCommit,
    expectedFiles,
    gitRunner
  });
  const finalContext =
    await captureCleanCommittedSourceContext({
      repoRoot: normalizedRepoRoot,
      gitRunner
    });
  assertSameSourceContext(
    initialContext,
    finalContext
  );

  const implementationFiles =
    POST_HOC_REPLAY_IMPLEMENTATION_PATHS.map(
      (repositoryPath) => ({
        path: repositoryPath,
        sha256: expectedFiles.get(repositoryPath)
      })
    );
  const receipt = sealPostHocReplayReceipt({
    schemaVersion: POST_HOC_REPLAY_SCHEMA_VERSION,
    status: "PASS_COMMITTED_POST_HOC_REPLAY",
    createdAt: isoTimestamp(clock),
    contextGitCommit:
      initialContext.contextGitCommit,
    contextGitTree: initialContext.contextGitTree,
    semantics: {
      ...POST_HOC_REPLAY_SEMANTICS
    },
    executionEnvironment: {
      ...POST_HOC_REPLAY_EXECUTION_ENVIRONMENT
    },
    implementationFiles,
    models: modelReceipts
  });
  await writeReceiptExclusive({
    repoRoot: normalizedRepoRoot,
    receiptRelativePath,
    receipt
  });
  return {
    receipt,
    receiptPath
  };
}

export async function runOrdinaryModelContainerReplay({
  repoRoot = DEFAULT_REPO_ROOT,
  verifierRunner = defaultVerifierRunner,
  output = {
    stdout: process.stdout,
    stderr: process.stderr
  }
} = {}) {
  const normalizedRepoRoot = resolve(repoRoot);
  for (const spec of MODEL_CONTAINER_REPLAY_SPECS) {
    const directory = join(
      normalizedRepoRoot,
      "scripts",
      "research",
      "operational-savings",
      "containers",
      spec.modelId
    );
    const manifest = JSON.parse(
      await readFile(
        join(directory, "build-manifest.json"),
        "utf8"
      )
    );
    const imageId = manifest.image?.localImageId;
    if (!SHA256_IDENTIFIER_PATTERN.test(imageId ?? "")) {
      throw new Error(
        `MODEL_IMAGE_ID_MISSING: ${spec.modelId}`
      );
    }
    const binding = {
      spec,
      verifierPath:
        `scripts/research/operational-savings/containers/${spec.modelId}/verify.mjs`,
      repository: {
        localImage: { imageId }
      }
    };
    await executeVerifier({
      binding,
      repoRoot: normalizedRepoRoot,
      verifierRunner,
      output
    });
  }
}

export function parseReplayArguments(argv) {
  let help = false;
  let writeReceipt = false;
  let receiptRelativePath =
    POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help") {
      help = true;
      continue;
    }
    if (
      argument === "--write-receipt" ||
      argument.startsWith("--write-receipt=")
    ) {
      if (writeReceipt) {
        throw new Error(
          "MODEL_CONTAINER_REPLAY_WRITE_RECEIPT_DUPLICATED"
        );
      }
      writeReceipt = true;
      if (argument.startsWith("--write-receipt=")) {
        const value = argument.slice(
          "--write-receipt=".length
        );
        if (!value) {
          throw new Error(
            "MODEL_CONTAINER_REPLAY_RECEIPT_PATH_EMPTY"
          );
        }
        receiptRelativePath = value;
      } else if (
        argv[index + 1] &&
        !argv[index + 1].startsWith("--")
      ) {
        receiptRelativePath = argv[index + 1];
        index += 1;
      }
      continue;
    }
    throw new Error(
      `MODEL_CONTAINER_REPLAY_ARGUMENT_UNKNOWN: ${argument}`
    );
  }
  if (!safeReceiptRepositoryPath(receiptRelativePath)) {
    throw new Error(
      `MODEL_CONTAINER_REPLAY_RECEIPT_PATH_INVALID: ${receiptRelativePath}`
    );
  }
  return {
    help,
    writeReceipt,
    receiptRelativePath
  };
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseReplayArguments(argv);
  if (options.help) {
    process.stdout.write(
      "Replay the exact local REopt, SSC, MEASUR, and Scout image IDs with each model's offline verifier.\n\n" +
      "Usage:\n" +
      "  node scripts/research/operational-savings/verify-model-containers.mjs\n" +
      "  node scripts/research/operational-savings/verify-model-containers.mjs --write-receipt [repository-relative-path]\n"
    );
    return;
  }
  if (options.writeReceipt) {
    const { receiptPath } =
      await runPostHocReplayAndWriteReceipt({
        receiptRelativePath:
          options.receiptRelativePath
      });
    process.stdout.write(
      `Wrote post-hoc replay receipt: ${relative(DEFAULT_REPO_ROOT, receiptPath)}\n`
    );
    return;
  }
  await runOrdinaryModelContainerReplay();
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(scriptPath)
) {
  main().catch((error) => {
    process.stderr.write(
      `${error?.stack ?? error}\n`
    );
    process.exitCode = 1;
  });
}
