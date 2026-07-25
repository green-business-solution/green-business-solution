import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { constants } from "node:fs";
import {
  lstat,
  open,
  readFile,
  realpath
} from "node:fs/promises";
import { isAbsolute, join, relative, sep } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const POST_HOC_REPLAY_SCHEMA_VERSION =
  "operational-savings/model-container-post-hoc-replay-v1";
export const POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH =
  "scripts/research/operational-savings/containers/post-hoc-replay-receipt.v1.json";
export const POST_HOC_REPLAY_IMPLEMENTATION_PATHS =
  Object.freeze([
    "scripts/research/operational-savings/verify-model-containers.mjs",
    "scripts/research/operational-savings/storage/post-hoc-replay.mjs",
    "scripts/research/operational-savings/storage/inventory.mjs",
    "scripts/research/operational-savings/storage/ecr-evidence.mjs"
  ]);
export const POST_HOC_REPLAY_SEMANTICS = Object.freeze({
  replayKind: "POST_HOC_REPLAY",
  historicalBuildContext:
    "UNATTESTED_HISTORICAL_BUILD_CONTEXT",
  producerClaim:
    "DOES_NOT_ATTEST_HISTORICAL_IMAGE_BUILD_CONTEXT",
  authentication: "UNSIGNED_UNAUTHENTICATED",
  forgeability:
    "FORGEABLE_BY_ANY_REPOSITORY_WRITER",
  trustModel:
    "HONEST_LOCAL_OPERATOR_AND_REPOSITORY_INTEGRITY",
  hashGuarantee:
    "DETECTS_STALE_OR_CORRUPT_CONTENT_NOT_MALICIOUS_FORGERY"
});
export const POST_HOC_REPLAY_EXECUTION_ENVIRONMENT =
  Object.freeze({
    status:
      "UNBOUND_HONEST_LOCAL_OPERATOR_EXECUTION_ENVIRONMENT",
    nodeExecutableAndRuntime:
      "NOT_INDEPENDENTLY_ATTESTED",
    dockerCliBytesAndVersion:
      "NOT_INDEPENDENTLY_ATTESTED",
    dockerDaemonAndServerIdentity:
      "NOT_INDEPENDENTLY_ATTESTED",
    hostOperatingSystemAndKernel:
      "NOT_INDEPENDENTLY_ATTESTED",
    inheritedEnvironment:
      "EXCLUDED_BY_FIXED_CHILD_ENVIRONMENT_ALLOWLIST",
    childEnvironmentAllowlist:
      "PATH_LANG_LC_ALL_HOME_DOCKER_CONFIG_DOCKER_HOST_AND_EXACT_MODEL_IMAGE_ID",
    provenanceClaim:
      "CURRENT_POST_HOC_REPLAY_RESULT_ONLY"
  });

const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const SHA256_IDENTIFIER_PATTERN =
  /^sha256:[a-f0-9]{64}$/;
const GIT_OBJECT_PATTERN =
  /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/;

function canonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalJson(entry)).join(",")}]`;
  }
  if (
    value &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    return `{${Object.keys(value)
      .sort()
      .map(
        (key) =>
          `${JSON.stringify(key)}:${canonicalJson(value[key])}`
      )
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function postHocReplayDigest(value) {
  return createHash("sha256")
    .update(canonicalJson(value))
    .digest("hex");
}

function sha256Bytes(value) {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

export function sealPostHocReplayReceipt(receipt) {
  const sealed = structuredClone(receipt);
  delete sealed.receiptContentSha256;
  sealed.receiptContentSha256 =
    postHocReplayDigest(sealed);
  return sealed;
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

function repositoryAbsolutePath(repoRoot, repositoryPath) {
  if (!safeRepositoryPath(repositoryPath)) {
    throw new Error(
      `POST_HOC_REPLAY_REPOSITORY_PATH_INVALID: ${repositoryPath}`
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
      `POST_HOC_REPLAY_REPOSITORY_PATH_ESCAPE: ${repositoryPath}`
    );
  }
  return absolutePath;
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
      encoding,
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
  const value = await gitOutput({
    ...options,
    encoding: "utf8"
  });
  return String(value).trim();
}

async function gitBlob({
  gitRunner,
  repoRoot,
  revision,
  repositoryPath
}) {
  const value = await gitOutput({
    gitRunner,
    repoRoot,
    args: [
      "cat-file",
      "blob",
      `${revision}:${repositoryPath}`
    ],
    encoding: null
  });
  return Buffer.isBuffer(value)
    ? value
    : Buffer.from(value);
}

async function localRegularFileBytes(
  repoRoot,
  repositoryPath
) {
  const absolutePath = repositoryAbsolutePath(
    repoRoot,
    repositoryPath
  );
  const details = await lstat(absolutePath);
  if (!details.isFile() || details.isSymbolicLink()) {
    throw new Error(
      `POST_HOC_REPLAY_LOCAL_FILE_INVALID: ${repositoryPath}`
    );
  }
  const [canonicalRoot, canonicalPath] =
    await Promise.all([
      realpath(repoRoot),
      realpath(absolutePath)
    ]);
  const expectedCanonicalPath = join(
    canonicalRoot,
    repositoryPath
  );
  if (canonicalPath !== expectedCanonicalPath) {
    throw new Error(
      `POST_HOC_REPLAY_LOCAL_PATH_SYMLINKED: ${repositoryPath}`
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
        `POST_HOC_REPLAY_LOCAL_FILE_INVALID: ${repositoryPath}`
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
        `POST_HOC_REPLAY_LOCAL_FILE_CHANGED: ${repositoryPath}`
      );
    }
    return bytes;
  } finally {
    await handle.close();
  }
}

function exactVerifierPath(repository) {
  const command =
    repository.localImage?.verificationCommand;
  const match =
    typeof command === "string"
      ? command.match(/^node\s+([^\s]+)$/)
      : null;
  if (
    !match ||
    !safeRepositoryPath(match[1])
  ) {
    throw new Error(
      `POST_HOC_REPLAY_VERIFIER_COMMAND_INVALID: ${repository.modelId}`
    );
  }
  return match[1];
}

async function assertCommitFile({
  repoRoot,
  contextGitCommit,
  repositoryPath,
  expectedSha256,
  gitRunner
}) {
  if (!SHA256_PATTERN.test(expectedSha256 ?? "")) {
    throw new Error(
      `POST_HOC_REPLAY_FILE_SHA_INVALID: ${repositoryPath}`
    );
  }
  const [committedBytes, localBytes] = await Promise.all([
    gitBlob({
      gitRunner,
      repoRoot,
      revision: contextGitCommit,
      repositoryPath
    }),
    localRegularFileBytes(repoRoot, repositoryPath)
  ]);
  if (
    sha256Bytes(committedBytes) !==
      expectedSha256 ||
    sha256Bytes(localBytes) !== expectedSha256
  ) {
    throw new Error(
      `POST_HOC_REPLAY_COMMIT_FILE_MISMATCH: ${repositoryPath}`
    );
  }
}

function validateModelReceiptShape({
  modelReceipt,
  repository
}) {
  const contentBinding =
    repository.buildManifest?.buildEvidence
      ?.contentBinding;
  const verifierPath = exactVerifierPath(repository);
  if (
    modelReceipt?.modelId !== repository.modelId ||
    modelReceipt.buildManifestPath !==
      repository.buildManifest.path ||
    modelReceipt.buildManifestSha256 !==
      repository.buildManifest.sha256 ||
    modelReceipt.completeInputSetSha256 !==
      contentBinding?.completeInputSetSha256 ||
    modelReceipt.imageId !==
      repository.localImage?.imageId ||
    modelReceipt.imageDigest !==
      repository.remoteImage?.imageDigest ||
    !SHA256_IDENTIFIER_PATTERN.test(
      modelReceipt.imageId ?? ""
    ) ||
    modelReceipt.imageId !== modelReceipt.imageDigest ||
    modelReceipt.sourceCommit !==
      repository.provenance?.sourceCommit ||
    modelReceipt.verifierPath !== verifierPath ||
    !SHA256_PATTERN.test(
      modelReceipt.verifierSha256 ?? ""
    ) ||
    modelReceipt.exitCode !== 0 ||
    !SHA256_PATTERN.test(
      modelReceipt.stdoutSha256 ?? ""
    ) ||
    !Number.isSafeInteger(modelReceipt.stdoutSizeBytes) ||
    modelReceipt.stdoutSizeBytes <= 0 ||
    !SHA256_PATTERN.test(
      modelReceipt.stderrSha256 ?? ""
    ) ||
    !Number.isSafeInteger(modelReceipt.stderrSizeBytes) ||
    modelReceipt.stderrSizeBytes < 0 ||
    !Number.isFinite(
      Date.parse(modelReceipt.replayedAt ?? "")
    ) ||
    modelReceipt.replayKind !==
      POST_HOC_REPLAY_SEMANTICS.replayKind ||
    modelReceipt.historicalBuildContext !==
      POST_HOC_REPLAY_SEMANTICS.historicalBuildContext
  ) {
    throw new Error(
      `POST_HOC_REPLAY_MODEL_RECEIPT_INVALID: ${repository.modelId}`
    );
  }
  const verifierInput = [
    ...(contentBinding?.verificationInputs ?? []),
    ...(contentBinding?.buildInputs ?? [])
  ].filter(
    (input) =>
      input.repositoryPath === verifierPath
  );
  if (
    verifierInput.length !== 1 ||
    verifierInput[0].sha256 !==
      modelReceipt.verifierSha256
  ) {
    throw new Error(
      `POST_HOC_REPLAY_VERIFIER_BINDING_INVALID: ${repository.modelId}`
    );
  }
  return {
    contentBinding,
    verifierPath
  };
}

export function assertPostHocReplayReceiptBinding({
  receipt,
  repositories
}) {
  const unsealed = structuredClone(receipt ?? {});
  const recordedDigest =
    unsealed.receiptContentSha256;
  delete unsealed.receiptContentSha256;
  if (
    receipt?.schemaVersion !==
      POST_HOC_REPLAY_SCHEMA_VERSION ||
    receipt.status !==
      "PASS_COMMITTED_POST_HOC_REPLAY" ||
    JSON.stringify(receipt.semantics) !==
      JSON.stringify(POST_HOC_REPLAY_SEMANTICS) ||
    JSON.stringify(receipt.executionEnvironment) !==
      JSON.stringify(
        POST_HOC_REPLAY_EXECUTION_ENVIRONMENT
      ) ||
    !GIT_OBJECT_PATTERN.test(
      receipt.contextGitCommit ?? ""
    ) ||
    !GIT_OBJECT_PATTERN.test(
      receipt.contextGitTree ?? ""
    ) ||
    !Number.isFinite(Date.parse(receipt.createdAt ?? "")) ||
    !Array.isArray(receipt.implementationFiles) ||
    receipt.implementationFiles.length !==
      POST_HOC_REPLAY_IMPLEMENTATION_PATHS.length ||
    !Array.isArray(receipt.models) ||
    receipt.models.length !== repositories.length ||
    recordedDigest !== postHocReplayDigest(unsealed)
  ) {
    throw new Error(
      "POST_HOC_REPLAY_RECEIPT_INVALID"
    );
  }

  const implementationPaths = new Set();
  for (const [index, file] of
    receipt.implementationFiles.entries()) {
    const expectedPath =
      POST_HOC_REPLAY_IMPLEMENTATION_PATHS[index];
    if (
      file?.path !== expectedPath ||
      implementationPaths.has(file.path) ||
      !SHA256_PATTERN.test(file.sha256 ?? "")
    ) {
      throw new Error(
        "POST_HOC_REPLAY_IMPLEMENTATION_SET_INVALID"
      );
    }
    implementationPaths.add(file.path);
  }

  const expectedModelIds = repositories.map(
    (repository) => repository.modelId
  );
  if (
    new Set(
      receipt.models.map((model) => model.modelId)
    ).size !== receipt.models.length ||
    receipt.models.some(
      (model, index) =>
        model.modelId !== expectedModelIds[index]
    )
  ) {
    throw new Error(
      "POST_HOC_REPLAY_MODEL_SET_INVALID"
    );
  }

  return repositories.map(
    (repository, index) => ({
      repository,
      modelReceipt: receipt.models[index],
      ...validateModelReceiptShape({
        modelReceipt: receipt.models[index],
        repository
      })
    })
  );
}

export async function validatePostHocReplayReceipt({
  repoRoot,
  receipt,
  repositories,
  receiptRelativePath =
    POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  gitRunner = defaultGitRunner
}) {
  const modelBindings =
    assertPostHocReplayReceiptBinding({
      receipt,
      repositories
    });

  await gitOutput({
    gitRunner,
    repoRoot,
    args: [
      "cat-file",
      "-e",
      `${receipt.contextGitCommit}^{commit}`
    ]
  });
  const recordedTree = await gitText({
    gitRunner,
    repoRoot,
    args: [
      "rev-parse",
      `${receipt.contextGitCommit}^{tree}`
    ]
  });
  if (recordedTree !== receipt.contextGitTree) {
    throw new Error(
      "POST_HOC_REPLAY_CONTEXT_TREE_MISMATCH"
    );
  }
  await gitOutput({
    gitRunner,
    repoRoot,
    args: [
      "merge-base",
      "--is-ancestor",
      receipt.contextGitCommit,
      "HEAD"
    ]
  });

  for (const file of receipt.implementationFiles) {
    await assertCommitFile({
      repoRoot,
      contextGitCommit: receipt.contextGitCommit,
      repositoryPath: file.path,
      expectedSha256: file.sha256,
      gitRunner
    });
  }

  for (const {
    repository,
    modelReceipt,
    contentBinding
  } of modelBindings) {
    const committedInputs = [
      ...contentBinding.buildInputs,
      ...contentBinding.verificationInputs
    ];
    await assertCommitFile({
      repoRoot,
      contextGitCommit: receipt.contextGitCommit,
      repositoryPath:
        modelReceipt.buildManifestPath,
      expectedSha256:
        modelReceipt.buildManifestSha256,
      gitRunner
    });
    for (const input of committedInputs) {
      await assertCommitFile({
        repoRoot,
        contextGitCommit: receipt.contextGitCommit,
        repositoryPath: input.repositoryPath,
        expectedSha256: input.sha256,
        gitRunner
      });
    }
  }

  const receiptBytes = await localRegularFileBytes(
    repoRoot,
    receiptRelativePath
  );
  let localReceipt;
  try {
    localReceipt = JSON.parse(
      receiptBytes.toString("utf8")
    );
  } catch {
    throw new Error(
      "POST_HOC_REPLAY_COMMITTED_RECEIPT_JSON_INVALID"
    );
  }
  if (
    postHocReplayDigest(localReceipt) !==
      postHocReplayDigest(receipt)
  ) {
    throw new Error(
      "POST_HOC_REPLAY_MANIFEST_RECEIPT_MISMATCH"
    );
  }
  const committedReceiptBytes = await gitBlob({
    gitRunner,
    repoRoot,
    revision: "HEAD",
    repositoryPath: receiptRelativePath
  });
  if (
    sha256Bytes(receiptBytes) !==
      sha256Bytes(committedReceiptBytes)
  ) {
    throw new Error(
      "POST_HOC_REPLAY_RECEIPT_NOT_COMMITTED"
    );
  }
  return receipt;
}

export async function assertLivePostHocReplayReceipt({
  repoRoot,
  manifest,
  gitRunner = defaultGitRunner
}) {
  const replayState =
    manifest?.destination?.ecr
      ?.postHocReplayReceipt;
  const repositories =
    manifest?.destination?.ecr?.repositories;
  if (
    replayState?.path !==
      POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH ||
    replayState.status !==
      "PASS_COMMITTED_POST_HOC_REPLAY" ||
    replayState.blocker !== null ||
    !Array.isArray(repositories) ||
    repositories.length === 0 ||
    !replayState.receipt
  ) {
    throw new Error(
      "POST_HOC_REPLAY_LIVE_RECEIPT_REQUIRED"
    );
  }
  await validatePostHocReplayReceipt({
    repoRoot,
    receipt: replayState.receipt,
    repositories,
    receiptRelativePath: replayState.path,
    gitRunner
  });
  return replayState;
}

export async function loadPostHocReplayReceipt({
  repoRoot,
  repositories,
  receiptRelativePath =
    POST_HOC_REPLAY_RECEIPT_RELATIVE_PATH,
  gitRunner = defaultGitRunner
}) {
  const receiptPath = repositoryAbsolutePath(
    repoRoot,
    receiptRelativePath
  );
  let source;
  try {
    source = await readFile(receiptPath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return {
        path: receiptRelativePath,
        status: "PENDING",
        blocker:
          "Run and commit the explicit post-hoc four-model replay receipt after the source context is frozen."
      };
    }
    throw error;
  }
  let receipt;
  try {
    receipt = JSON.parse(source);
  } catch {
    return {
      path: receiptRelativePath,
      status: "INVALID",
      blocker: "POST_HOC_REPLAY_RECEIPT_JSON_INVALID"
    };
  }
  try {
    await validatePostHocReplayReceipt({
      repoRoot,
      receipt,
      repositories,
      receiptRelativePath,
      gitRunner
    });
    return {
      path: receiptRelativePath,
      status: "PASS_COMMITTED_POST_HOC_REPLAY",
      blocker: null,
      receipt
    };
  } catch (error) {
    return {
      path: receiptRelativePath,
      status: "INVALID",
      blocker: error.message
    };
  }
}
