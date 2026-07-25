import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  basename,
  dirname,
  join,
  relative,
  resolve,
  sep
} from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import {
  DEFAULT_PROOF_EXECUTION_RUN_RECORD_RELATIVE_PATH,
  assertProofExecutionInputStateUnchanged,
  assertProofExecutionIsolationMatches,
  assertProofExecutionSnapshotMatches,
  buildProofCacheIdentity,
  buildProofExecutionToolchainIdentity,
  captureProofExecutionInputState,
  captureProofExecutionSnapshotState,
  generateProofExecutionRunRecord
} from "./proof-execution-run-record.mjs";
import { loadProofManifestFiles } from "./proof-ledger.mjs";
import {
  NETWORK_ENFORCEMENT,
  spawnSyncWithNetworkDenied
} from "./lib/network-isolation.mjs";

export const DEFAULT_REPOSITORY_ROOT = fileURLToPath(
  new URL("../../..", import.meta.url)
);
export const REAL_PROOF_TEST_ROOT =
  "scripts/research/operational-savings/tests";
export const TRACKED_VITEST_CONFIG = "vite.config.ts";
export const ATTESTED_PROOF_RUN_TEMP_PREFIX =
  "vitest-proof-attested-run-";

const DEFAULT_VITEST_PATH = fileURLToPath(
  new URL("../../../node_modules/vitest/vitest.mjs", import.meta.url)
);
export const GIT_PATH = "/usr/bin/git";
export const APFS_CLONE_COPY_PATH = "/bin/cp";
const ADAPTERS_ROOT =
  "scripts/research/operational-savings/adapters";
const NODE_MODULES_ROOT = "node_modules";
const RESEARCH_CACHE_ROOT =
  "scripts/research/operational-savings/.cache";
const RESEARCH_WORKTREE_INPUT_ROOT = "tmp";
const CONFIG_OVERRIDE_ARGUMENTS = new Set([
  "--config",
  "-c"
]);
const execFileAsync = promisify(execFile);

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

function toPosixPath(path) {
  return path.split(sep).join("/");
}

function displayPath(repoRoot, path) {
  const rel = relative(resolve(repoRoot), resolve(path));
  return rel &&
    rel !== ".." &&
    !rel.startsWith(`..${sep}`)
    ? toPosixPath(rel)
    : toPosixPath(resolve(path));
}

function toolPath(toolchainIdentity, toolId) {
  const tool = toolchainIdentity.tools.find(
    (candidate) => candidate.toolId === toolId
  );
  if (!tool) {
    throw new Error(
      `PROOF_EXECUTION_TOOL_MISSING: ${toolId} is absent from the bound toolchain`
    );
  }
  return tool.requestedPath ?? tool.resolvedPath;
}

export function sanitizedProofExecutionEnvironment({
  toolchainIdentity,
  homePath,
  temporaryPath,
  ambientEnvironment = process.env
}) {
  const term =
    typeof ambientEnvironment.TERM === "string" &&
    ambientEnvironment.TERM.trim()
      ? ambientEnvironment.TERM
      : "dumb";
  const temporaryDirectory = `${resolve(temporaryPath)}${sep}`;
  return {
    HOME: resolve(homePath),
    TMPDIR: temporaryDirectory,
    TMP: temporaryDirectory,
    TEMP: temporaryDirectory,
    PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
    LANG: "C",
    LC_ALL: "C",
    TZ: "UTC",
    TERM: term,
    CI: "1",
    NO_COLOR: "1",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_CONFIG_COUNT: "0",
    GIT_OPTIONAL_LOCKS: "0",
    PYTHONNOUSERSITE: "1",
    PYTHONSAFEPATH: "1",
    PYTHONDONTWRITEBYTECODE: "1",
    MEASUR_CXX: toolPath(
      toolchainIdentity,
      "measur-cxx"
    ),
    SSC_PYTHON: toolPath(
      toolchainIdentity,
      "ssc-python"
    ),
    OS_RESEARCH_REAL_PROOFS: "required",
    OS_RESEARCH_NETWORK: "disabled",
    OS_RESEARCH_NETWORK_ENFORCEMENT:
      NETWORK_ENFORCEMENT
  };
}

function gitEnvironment() {
  return {
    PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_CONFIG_COUNT: "0",
    GIT_OPTIONAL_LOCKS: "0"
  };
}

async function gitOutput(args, cwd) {
  const { stdout } = await execFileAsync(
    GIT_PATH,
    args,
    {
      cwd,
      encoding: "utf8",
      env: gitEnvironment(),
      maxBuffer: 16 * 1024 * 1024
    }
  );
  return stdout;
}

async function canonicalizePotentialPath(path) {
  const missingSegments = [];
  let candidate = resolve(path);
  while (true) {
    try {
      const existing = await realpath(candidate);
      return resolve(
        existing,
        ...missingSegments.reverse()
      );
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      const parent = dirname(candidate);
      if (parent === candidate) throw error;
      missingSegments.push(basename(candidate));
      candidate = parent;
    }
  }
}

function directChildPath(parent, candidate) {
  const rel = relative(parent, candidate);
  return (
    rel &&
    rel !== ".." &&
    !rel.startsWith(`..${sep}`) &&
    !rel.includes(sep)
  );
}

async function worktreeAdminTarget(adminDirectory) {
  const adminDetails = await lstat(adminDirectory);
  if (
    !adminDetails.isDirectory() ||
    adminDetails.isSymbolicLink()
  ) {
    throw new Error(
      `PROOF_EXECUTION_WORKTREE_ADMIN_UNSAFE: ${adminDirectory} must be a regular directory`
    );
  }
  const gitdirPath = join(adminDirectory, "gitdir");
  const gitdirDetails = await lstat(gitdirPath);
  if (
    !gitdirDetails.isFile() ||
    gitdirDetails.isSymbolicLink()
  ) {
    throw new Error(
      `PROOF_EXECUTION_WORKTREE_ADMIN_UNSAFE: ${gitdirPath} must be a regular file`
    );
  }
  const rawTarget = (
    await readFile(gitdirPath, "utf8")
  ).trim();
  if (!rawTarget) {
    throw new Error(
      `PROOF_EXECUTION_WORKTREE_ADMIN_UNSAFE: ${gitdirPath} is empty`
    );
  }
  return canonicalizePotentialPath(
    resolve(adminDirectory, rawTarget)
  );
}

export async function resolveExactWorktreeAdminDirectory({
  repoRoot,
  snapshotRoot
}) {
  const root = resolve(repoRoot);
  const destination = resolve(snapshotRoot);
  const commonGitOutput = (
    await gitOutput(
      ["rev-parse", "--git-common-dir"],
      root
    )
  ).trim();
  if (!commonGitOutput) {
    throw new Error(
      "PROOF_EXECUTION_WORKTREE_ADMIN_UNSAFE: Git returned an empty common directory"
    );
  }
  const commonGitDirectory = await realpath(
    resolve(root, commonGitOutput)
  );
  const worktreesDirectory = join(
    commonGitDirectory,
    "worktrees"
  );
  const worktreesDetails = await lstat(
    worktreesDirectory
  ).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (worktreesDetails === null) return null;
  if (
    !worktreesDetails.isDirectory() ||
    worktreesDetails.isSymbolicLink()
  ) {
    throw new Error(
      `PROOF_EXECUTION_WORKTREE_ADMIN_UNSAFE: ${worktreesDirectory} must be a regular directory`
    );
  }
  const canonicalTargetGitFile =
    await canonicalizePotentialPath(
      join(destination, ".git")
    );
  const matches = [];
  for (const entry of await readdir(worktreesDirectory, {
    withFileTypes: true
  })) {
    if (!entry.isDirectory() || entry.isSymbolicLink()) {
      continue;
    }
    const adminDirectory = resolve(
      worktreesDirectory,
      entry.name
    );
    if (
      !directChildPath(
        worktreesDirectory,
        adminDirectory
      )
    ) {
      throw new Error(
        `PROOF_EXECUTION_WORKTREE_ADMIN_UNSAFE: ${adminDirectory} is not a direct child of the Git worktree metadata directory`
      );
    }
    const target = await worktreeAdminTarget(
      adminDirectory
    ).catch(() => null);
    if (target === canonicalTargetGitFile) {
      matches.push(adminDirectory);
    }
  }
  if (matches.length > 1) {
    throw new Error(
      `PROOF_EXECUTION_WORKTREE_ADMIN_AMBIGUOUS: multiple registrations target ${destination}`
    );
  }
  if (matches.length === 0) return null;
  const [adminDirectory] = matches;
  const snapshotGitFile = join(destination, ".git");
  const snapshotGitDetails = await lstat(
    snapshotGitFile
  ).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (snapshotGitDetails !== null) {
    if (
      !snapshotGitDetails.isFile() ||
      snapshotGitDetails.isSymbolicLink()
    ) {
      throw new Error(
        `PROOF_EXECUTION_WORKTREE_ADMIN_UNSAFE: ${snapshotGitFile} must be a regular file`
      );
    }
    const declaration = (
      await readFile(snapshotGitFile, "utf8")
    ).trim();
    const prefix = "gitdir: ";
    if (!declaration.startsWith(prefix)) {
      throw new Error(
        `PROOF_EXECUTION_WORKTREE_ADMIN_UNSAFE: ${snapshotGitFile} has an invalid gitdir declaration`
      );
    }
    const declaredAdminDirectory =
      await canonicalizePotentialPath(
        resolve(
          destination,
          declaration.slice(prefix.length)
        )
      );
    if (declaredAdminDirectory !== adminDirectory) {
      throw new Error(
        `PROOF_EXECUTION_WORKTREE_ADMIN_MISMATCH: ${snapshotGitFile} does not identify the exact matching registration`
      );
    }
  }
  return {
    adminDirectory,
    commonGitDirectory,
    targetGitFile: canonicalTargetGitFile
  };
}

export async function materializeCommittedProofSnapshot({
  repoRoot,
  snapshotRoot,
  expectedCommit,
  cloneDirectory = clonePrivateDirectory
}) {
  const root = resolve(repoRoot);
  const destination = resolve(snapshotRoot);
  const destinationParent = dirname(destination);
  await mkdir(destinationParent, {
    recursive: true,
    mode: 0o700
  });
  try {
    await gitOutput(
      [
        "-c",
        "core.hooksPath=/dev/null",
        "worktree",
        "add",
        "--detach",
        destination,
        expectedCommit
      ],
      root
    );
    const snapshotCommit = (
      await gitOutput(
        ["-C", destination, "rev-parse", "HEAD"],
        root
      )
    ).trim();
    if (snapshotCommit !== expectedCommit) {
      throw new Error(
        `PROOF_EXECUTION_SNAPSHOT_COMMIT_MISMATCH: expected ${expectedCommit}, received ${snapshotCommit}`
      );
    }
    const nodeModulesSource = resolve(
      root,
      NODE_MODULES_ROOT
    );
    await lstat(nodeModulesSource);
    await cloneDirectory(
      nodeModulesSource,
      resolve(destination, NODE_MODULES_ROOT)
    );
    await Promise.all(
      [".vite", ".vite-temp"].map((entry) =>
        rm(
          resolve(
            destination,
            NODE_MODULES_ROOT,
            entry
          ),
          {
            recursive: true,
            force: true
          }
        )
      )
    );
    const cacheSource = resolve(root, RESEARCH_CACHE_ROOT);
    await lstat(cacheSource);
    const cacheDestination = resolve(
      destination,
      RESEARCH_CACHE_ROOT
    );
    await mkdir(dirname(cacheDestination), {
      recursive: true
    });
    await removeMatchingTrackedCacheScaffold(
      cacheSource,
      cacheDestination
    );
    await cloneDirectory(cacheSource, cacheDestination);
    const worktreeInputSource = resolve(
      root,
      RESEARCH_WORKTREE_INPUT_ROOT
    );
    await lstat(worktreeInputSource);
    await cloneDirectory(
      worktreeInputSource,
      resolve(destination, RESEARCH_WORKTREE_INPUT_ROOT)
    );
    return {
      snapshotRoot: destination,
      sourceCommit: snapshotCommit,
      privateCopyMode:
        process.platform === "darwin"
          ? "MACOS_CLONEFILE_OR_PRIVATE_COPY"
          : "FULL_PRIVATE_DIRECTORY_COPY"
    };
  } catch (error) {
    let cleanupError = null;
    try {
      await removeCommittedProofSnapshot({
        repoRoot: root,
        snapshotRoot: destination
      });
    } catch (candidate) {
      cleanupError = candidate;
    }
    if (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        "PROOF_EXECUTION_SNAPSHOT_SETUP_AND_CLEANUP_FAILED"
      );
    }
    throw error;
  }
}

export async function removeMatchingTrackedCacheScaffold(
  sourcePath,
  destinationPath
) {
  const source = resolve(sourcePath);
  const destination = resolve(destinationPath);
  const destinationDetails = await lstat(destination).catch(
    (error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  );
  if (destinationDetails === null) return false;
  if (
    !destinationDetails.isDirectory() ||
    destinationDetails.isSymbolicLink()
  ) {
    throw new Error(
      `PROOF_EXECUTION_CACHE_SCAFFOLD_UNSAFE: ${destination} must be a regular directory`
    );
  }
  const entries = await readdir(destination, {
    withFileTypes: true
  });
  if (
    entries.length !== 1 ||
    entries[0].name !== ".gitignore" ||
    !entries[0].isFile() ||
    entries[0].isSymbolicLink()
  ) {
    throw new Error(
      `PROOF_EXECUTION_CACHE_SCAFFOLD_UNSAFE: ${destination} must contain only a regular .gitignore file`
    );
  }
  const sourceIgnorePath = resolve(source, ".gitignore");
  const destinationIgnorePath = resolve(
    destination,
    ".gitignore"
  );
  const [sourceIgnoreDetails, destinationIgnoreDetails] =
    await Promise.all([
      lstat(sourceIgnorePath),
      lstat(destinationIgnorePath)
    ]);
  if (
    !sourceIgnoreDetails.isFile() ||
    sourceIgnoreDetails.isSymbolicLink() ||
    !destinationIgnoreDetails.isFile() ||
    destinationIgnoreDetails.isSymbolicLink()
  ) {
    throw new Error(
      "PROOF_EXECUTION_CACHE_SCAFFOLD_UNSAFE: cache .gitignore entries must be regular files"
    );
  }
  const [sourceIgnore, destinationIgnore] =
    await Promise.all([
      readFile(sourceIgnorePath),
      readFile(destinationIgnorePath)
    ]);
  if (!sourceIgnore.equals(destinationIgnore)) {
    throw new Error(
      `PROOF_EXECUTION_CACHE_SCAFFOLD_MISMATCH: ${destinationIgnorePath} does not match the source cache scaffold`
    );
  }
  await rm(destination, {
    recursive: true,
    force: false
  });
  return true;
}

export async function clonePrivateDirectory(
  sourcePath,
  destinationPath
) {
  const source = resolve(sourcePath);
  const destination = resolve(destinationPath);
  const sourceDetails = await lstat(source);
  if (
    !sourceDetails.isDirectory() ||
    sourceDetails.isSymbolicLink()
  ) {
    throw new Error(
      `PROOF_EXECUTION_PRIVATE_COPY_SOURCE_INVALID: ${source} must be a regular directory`
    );
  }
  const destinationDetails = await lstat(destination).catch(
    (error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  );
  if (destinationDetails !== null) {
    throw new Error(
      `PROOF_EXECUTION_PRIVATE_COPY_DESTINATION_EXISTS: ${destination}`
    );
  }
  await mkdir(dirname(destination), {
    recursive: true,
    mode: 0o700
  });
  if (process.platform === "darwin") {
    await execFileAsync(
      APFS_CLONE_COPY_PATH,
      ["-cR", source, destination],
      {
        env: {
          PATH: "/usr/bin:/bin:/usr/sbin:/sbin"
        },
        maxBuffer: 1024 * 1024
      }
    );
  } else {
    await cp(source, destination, {
      recursive: true,
      dereference: false,
      errorOnExist: true,
      force: false,
      preserveTimestamps: true
    });
  }
  const clonedDetails = await lstat(destination);
  if (
    !clonedDetails.isDirectory() ||
    clonedDetails.isSymbolicLink()
  ) {
    throw new Error(
      `PROOF_EXECUTION_PRIVATE_COPY_INVALID: ${destination} is not a private directory`
    );
  }
}

export async function verifyCommittedProofSnapshotClean({
  repoRoot,
  snapshotRoot,
  expectedCommit
}) {
  const root = resolve(repoRoot);
  const destination = resolve(snapshotRoot);
  const [head, status] = await Promise.all([
    gitOutput(
      ["-C", destination, "rev-parse", "HEAD"],
      root
    ),
    gitOutput(
      [
        "-C",
        destination,
        "status",
        "--porcelain=v1",
        "--untracked-files=all",
        "--",
        ".",
        ":(exclude)node_modules",
        ":(exclude)scripts/research/operational-savings/.cache"
      ],
      root
    )
  ]);
  if (head.trim() !== expectedCommit) {
    throw new Error(
      "PROOF_EXECUTION_SNAPSHOT_COMMIT_CHANGED: the private execution snapshot changed commits during the run"
    );
  }
  if (status.trim()) {
    throw new Error(
      `PROOF_EXECUTION_SNAPSHOT_DIRTY: the private execution snapshot was modified during the run: ${status.trim()}`
    );
  }
}

export async function removeCommittedProofSnapshot({
  repoRoot,
  snapshotRoot,
  operations = {}
}) {
  const root = resolve(repoRoot);
  const destination = resolve(snapshotRoot);
  const removeRegisteredWorktree =
    operations.removeRegisteredWorktree ??
    (async () =>
      gitOutput(
        [
          "-c",
          "core.hooksPath=/dev/null",
          "worktree",
          "remove",
          "--force",
          destination
        ],
        root
      ));
  const removeDestination =
    operations.removeDestination ??
    (async () =>
      rm(destination, {
        recursive: true,
        force: true
      }));
  const failures = [];
  const exactRegistration =
    await resolveExactWorktreeAdminDirectory({
      repoRoot: root,
      snapshotRoot: destination
    }).catch((error) => {
      failures.push(error);
      return null;
    });
  let registeredRemovalFailed = false;
  try {
    await removeRegisteredWorktree();
  } catch (error) {
    failures.push(error);
    registeredRemovalFailed = true;
  }
  try {
    await removeDestination();
  } catch (error) {
    failures.push(error);
  }
  if (registeredRemovalFailed && exactRegistration) {
    const removeExactRegistration =
      operations.removeExactRegistration ??
      (async () =>
        rm(exactRegistration.adminDirectory, {
          recursive: true,
          force: false
        }));
    try {
      await removeExactRegistration(exactRegistration);
    } catch (error) {
      failures.push(error);
    }
  }
  const destinationRemains = await lstat(destination)
    .then(() => true)
    .catch((error) => {
      if (error.code === "ENOENT") return false;
      failures.push(error);
      return true;
    });
  const registrationRemains =
    await resolveExactWorktreeAdminDirectory({
      repoRoot: root,
      snapshotRoot: destination
    })
      .then((registration) => registration !== null)
      .catch((error) => {
        failures.push(error);
        return true;
      });
  if (
    destinationRemains ||
    registrationRemains ||
    (failures.length > 0 &&
      operations.requireEveryCleanupStep === true)
  ) {
    throw new AggregateError(
      failures,
      "PROOF_EXECUTION_SNAPSHOT_CLEANUP_FAILED"
    );
  }
}

function rejectConfigOverride(arguments_) {
  for (const argument of arguments_) {
    if (
      CONFIG_OVERRIDE_ARGUMENTS.has(argument) ||
      argument.startsWith("--config=")
    ) {
      throw new Error(
        "REAL_PROOF_CONFIG_OVERRIDE_FORBIDDEN: the real suite must use the tracked vite.config.ts"
      );
    }
  }
}

export function buildRealProofVitestArguments(
  forwardedArguments = []
) {
  rejectConfigOverride(forwardedArguments);
  const defaultTestRoot =
    forwardedArguments[0] &&
    !forwardedArguments[0].startsWith("-")
      ? []
      : [REAL_PROOF_TEST_ROOT];
  return [
    DEFAULT_VITEST_PATH,
    "run",
    ...defaultTestRoot,
    ...forwardedArguments,
    "--config",
    TRACKED_VITEST_CONFIG
  ];
}

export function buildAttestedVitestArguments(
  outputPath,
  vitestPath
) {
  return [
    vitestPath,
    "run",
    REAL_PROOF_TEST_ROOT,
    "--config",
    TRACKED_VITEST_CONFIG,
    "--reporter=json",
    "--outputFile",
    outputPath,
    "--no-file-parallelism",
    "--no-cache"
  ];
}

async function readFreshVitestJson(path) {
  const details = await lstat(path).catch((error) => {
    if (error.code === "ENOENT") {
      throw new Error(
        "PROOF_EXECUTION_VITEST_JSON_MISSING: the orchestrated real suite did not create its isolated JSON result"
      );
    }
    throw error;
  });
  if (!details.isFile() || details.isSymbolicLink()) {
    throw new Error(
      "PROOF_EXECUTION_VITEST_JSON_INVALID: the orchestrated result must be a regular non-symlink file"
    );
  }
  const bytes = await readFile(path);
  let content;
  try {
    content = JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    throw new Error(
      `PROOF_EXECUTION_VITEST_JSON_INVALID: ${error.message}`
    );
  }
  return {
    bytes,
    content
  };
}

async function writeRecordAtomically(outputPath, record) {
  const outputDirectory = dirname(outputPath);
  await mkdir(outputDirectory, { recursive: true });
  const stagingDirectory = await mkdtemp(
    join(
      outputDirectory,
      `.${basename(outputPath)}.staging-`
    )
  );
  const stagedPath = join(stagingDirectory, basename(outputPath));
  try {
    await writeFile(
      stagedPath,
      `${JSON.stringify(record, null, 2)}\n`,
      {
        encoding: "utf8",
        flag: "wx"
      }
    );
    await rename(stagedPath, outputPath);
  } finally {
    await rm(stagingDirectory, {
      recursive: true,
      force: true
    });
  }
}

export async function setupProofExecutionRunDirectory({
  homePath,
  temporaryPath
}) {
  await Promise.all([
    mkdir(homePath, { recursive: true, mode: 0o700 }),
    mkdir(temporaryPath, {
      recursive: true,
      mode: 0o700
    })
  ]);
}

export async function runProofExecutionAttestation({
  repoRoot = DEFAULT_REPOSITORY_ROOT,
  outputPath = resolve(
    repoRoot,
    DEFAULT_PROOF_EXECUTION_RUN_RECORD_RELATIVE_PATH
  ),
  setupRunDirectory =
    setupProofExecutionRunDirectory
} = {}) {
  const root = resolve(repoRoot);
  const manifestFiles = await loadProofManifestFiles(
    resolve(root, ADAPTERS_ROOT)
  );
  const runDirectory = await mkdtemp(
    join(tmpdir(), ATTESTED_PROOF_RUN_TEMP_PREFIX)
  );
  let snapshotRoot = null;
  let snapshotAttempted = false;
  let record;
  try {
    snapshotRoot = join(runDirectory, "repository");
    const homePath = join(runDirectory, "home");
    const temporaryPath = join(runDirectory, "tmp");
    const vitestJsonPath = join(
      runDirectory,
      "vitest-results.json"
    );
    await setupRunDirectory({
      runDirectory,
      homePath,
      temporaryPath
    });
    const [
      preRunToolchainIdentity,
      preRunCacheIdentity
    ] = await Promise.all([
      buildProofExecutionToolchainIdentity({
        repoRoot: root,
        useCache: false
      }),
      buildProofCacheIdentity({
        repoRoot: root
      })
    ]);
    const preRunInputState =
      await captureProofExecutionInputState({
        repoRoot: root,
        manifestFiles,
        executionToolchainIdentity:
          preRunToolchainIdentity
      });
    snapshotAttempted = true;
    const materializedSnapshot =
      await materializeCommittedProofSnapshot({
        repoRoot: root,
        snapshotRoot,
        expectedCommit:
          preRunInputState.repositoryState.gitHeadCommit
      });
    const snapshotManifestFiles =
      await loadProofManifestFiles(
        resolve(snapshotRoot, ADAPTERS_ROOT)
      );
    const [
      preRunSnapshotState,
      preRunSnapshotToolchainIdentity,
      preRunSnapshotCacheIdentity
    ] = await Promise.all([
      captureProofExecutionSnapshotState({
        repoRoot: snapshotRoot,
        manifestFiles: snapshotManifestFiles
      }),
      buildProofExecutionToolchainIdentity({
        repoRoot: snapshotRoot,
        useCache: false
      }),
      buildProofCacheIdentity({
        repoRoot: snapshotRoot
      })
    ]);
    assertProofExecutionSnapshotMatches({
      preRunInputState,
      preRunSnapshotState,
      postRunSnapshotState: preRunSnapshotState
    });
    assertProofExecutionIsolationMatches({
      privateCopyMode:
        materializedSnapshot.privateCopyMode,
      originalPreToolchainIdentity:
        preRunToolchainIdentity,
      originalPostToolchainIdentity:
        preRunToolchainIdentity,
      snapshotPreToolchainIdentity:
        preRunSnapshotToolchainIdentity,
      snapshotPostToolchainIdentity:
        preRunSnapshotToolchainIdentity,
      originalPreCacheIdentity:
        preRunCacheIdentity,
      originalPostCacheIdentity:
        preRunCacheIdentity,
      snapshotPreCacheIdentity:
        preRunSnapshotCacheIdentity,
      snapshotPostCacheIdentity:
        preRunSnapshotCacheIdentity
    });
    const snapshotVitestPath = toolPath(
      preRunSnapshotToolchainIdentity,
      "vitest-entrypoint"
    );
    const vitestArguments =
      buildAttestedVitestArguments(
        vitestJsonPath,
        snapshotVitestPath
      );
    const executionEnvironment =
      sanitizedProofExecutionEnvironment({
        toolchainIdentity:
          preRunSnapshotToolchainIdentity,
        homePath,
        temporaryPath
      });
    const runnerStartedAtMs = Date.now();
    const result = spawnSyncWithNetworkDenied(
      process.execPath,
      vitestArguments,
      {
        cwd: snapshotRoot,
        env: executionEnvironment,
        stdio: "inherit"
      },
      {
        forceTopLevelSandbox: true
      }
    );
    const runnerCompletedAtMs = Date.now();
    if (result.error) throw result.error;
    if (result.status === null) {
      throw new Error(
        `PROOF_EXECUTION_RUNNER_TERMINATED: signal ${result.signal ?? "unknown"}`
      );
    }
    await verifyCommittedProofSnapshotClean({
      repoRoot: root,
      snapshotRoot,
      expectedCommit:
        preRunInputState.repositoryState.gitHeadCommit
    });
    const [
      postRunSnapshotState,
      postRunSnapshotToolchainIdentity,
      postRunSnapshotCacheIdentity
    ] = await Promise.all([
      captureProofExecutionSnapshotState({
        repoRoot: snapshotRoot,
        manifestFiles: snapshotManifestFiles
      }),
      buildProofExecutionToolchainIdentity({
        repoRoot: snapshotRoot,
        useCache: false
      }),
      buildProofCacheIdentity({
        repoRoot: snapshotRoot
      })
    ]);
    assertProofExecutionSnapshotMatches({
      preRunInputState,
      preRunSnapshotState,
      postRunSnapshotState
    });
    const [
      postRunToolchainIdentity,
      postRunCacheIdentity
    ] = await Promise.all([
      buildProofExecutionToolchainIdentity({
        repoRoot: root,
        useCache: false
      }),
      buildProofCacheIdentity({
        repoRoot: root
      })
    ]);
    const postRunInputState =
      await captureProofExecutionInputState({
        repoRoot: root,
        manifestFiles,
        executionToolchainIdentity:
          postRunToolchainIdentity
      });
    assertProofExecutionInputStateUnchanged({
      preRunInputState,
      postRunInputState
    });
    const executionIsolation =
      assertProofExecutionIsolationMatches({
        privateCopyMode:
          materializedSnapshot.privateCopyMode,
        originalPreToolchainIdentity:
          preRunToolchainIdentity,
        originalPostToolchainIdentity:
          postRunToolchainIdentity,
        snapshotPreToolchainIdentity:
          preRunSnapshotToolchainIdentity,
        snapshotPostToolchainIdentity:
          postRunSnapshotToolchainIdentity,
        originalPreCacheIdentity:
          preRunCacheIdentity,
        originalPostCacheIdentity:
          postRunCacheIdentity,
        snapshotPreCacheIdentity:
          preRunSnapshotCacheIdentity,
        snapshotPostCacheIdentity:
          postRunSnapshotCacheIdentity
      });
    const vitestJson =
      await readFreshVitestJson(vitestJsonPath);
    const command = JSON.stringify([
      process.execPath,
      ...vitestArguments
    ]);
    record = await generateProofExecutionRunRecord({
      repoRoot: root,
      executionRoot: snapshotRoot,
      manifestFiles,
      preRunInputState,
      postRunInputState,
      preRunSnapshotState,
      postRunSnapshotState,
      executionIsolation,
      vitestJson: vitestJson.content,
      vitestJsonSha256: sha256Bytes(
        vitestJson.bytes
      ),
      command,
      runnerStartedAtMs,
      runnerCompletedAtMs,
      runnerExitStatus: result.status
    });
  } finally {
    try {
      if (snapshotAttempted) {
        await removeCommittedProofSnapshot({
          repoRoot: root,
          snapshotRoot
        });
      }
    } finally {
      await rm(runDirectory, {
        recursive: true,
        force: true
      });
    }
  }
  await writeRecordAtomically(resolve(outputPath), record);
  return {
    record,
    outputPath: displayPath(root, outputPath)
  };
}
