import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import {
  createReadStream,
  realpathSync
} from "node:fs";
import {
  lstat,
  readFile,
  readdir,
  readlink,
  realpath
} from "node:fs/promises";
import {
  isAbsolute,
  join,
  relative,
  resolve,
  sep
} from "node:path";
import { promisify } from "node:util";

export const PROOF_EXECUTION_RUN_RECORD_SCHEMA_VERSION =
  "operational-savings/proof-execution-run-record-v2";
export const PROOF_SOURCE_FINGERPRINT_SCHEMA_VERSION =
  "operational-savings/proof-source-evidence-fingerprint-v2";
export const PROOF_ARTIFACT_IDENTITY_CATALOG_SCHEMA_VERSION =
  "operational-savings/proof-artifact-identity-catalog-v1";
export const PROOF_EXECUTION_TOOLCHAIN_SCHEMA_VERSION =
  "operational-savings/proof-execution-toolchain-v2";
export const PROOF_EXECUTION_CACHE_IDENTITY_SCHEMA_VERSION =
  "operational-savings/proof-execution-cache-identity-v2";
export const PROOF_EXECUTION_RECORD_TYPE =
  "LOCAL_CONTENT_BOUND_RUN_RECORD";
export const DEFAULT_PROOF_EXECUTION_RUN_RECORD_RELATIVE_PATH =
  "docs/operational-savings-automation-research/proof-execution-run-record.v2.json";

const execFileAsync = promisify(execFile);
const GIT_PATH = "/usr/bin/git";
const TEST_RESULT_STATUSES = Object.freeze([
  "PASSED",
  "FAILED",
  "SKIPPED",
  "MISSING",
  "PATH_MISMATCH",
  "NAME_MISMATCH",
  "AMBIGUOUS"
]);
const NETWORK_ENFORCEMENT_CONTROL = Object.freeze({
  testId: "control:process-wide-network-deny",
  path:
    "scripts/research/operational-savings/tests/network-sandbox-real.test.mjs",
  name:
    "enforces deny-network policy across the real Vitest process tree",
  manifestPath: "RUN_RECORD_CONTROL"
});
const CANONICAL_SOURCE_FILES = Object.freeze([
  "package.json",
  "package-lock.json",
  "vite.config.ts",
  "tsconfig.json",
  "tsconfig.node.json",
  "scripts/research/operational-savings/proof-ledger.mjs",
  "scripts/research/operational-savings/proof-execution-run-record.mjs",
  "scripts/generate-operational-savings-review-pages.mjs",
  "scripts/operational-savings-information-card-registry.mjs",
  "apps/api/server/matching/retrofitTaxonomy.mjs",
  "apps/api/server/matching/normalizeUserProfile.mjs",
  "apps/api/server/matching/ontologies.mjs",
  "docs/operational-savings-information-trees.md",
  "docs/operational-savings-standard-registry.md",
  "docs/operational-savings-information-tree-audit.md",
  "docs/operational-savings-source-evidence.json",
  "docs/operational-savings-category-contracts.json",
  "data/bill_field_dictionary.json",
  "docs/operational-savings-fixtures/source-fixture.schema.json",
  "docs/operational-savings-unit-registry.json",
  "docs/operational-savings-fixtures/profile/normalized-profile-paths.json",
  "docs/operational-savings-information-card.schema.json",
  "docs/operational-savings-information-card-bindings.json",
  "docs/operational-savings-user-input-realism.schema.json",
  "docs/operational-savings-user-input-decisions.json"
]);
const FINGERPRINT_SOURCE_DIRECTORIES = Object.freeze([
  "scripts/research/operational-savings",
  "docs/operational-savings-fixtures/categories",
  "docs/operational-savings-fixtures/sources",
  "docs/operational-savings-automation-research/fixtures"
]);
const ABSOLUTE_EXECUTION_TOOLS = Object.freeze([
  {
    toolId: "git",
    path: "/usr/bin/git"
  },
  {
    toolId: "archive-extractor",
    path: "/usr/bin/bsdtar"
  },
  {
    toolId: "tar-reader",
    path: "/usr/bin/tar"
  },
  {
    toolId: "zip-reader",
    path: "/usr/bin/unzip"
  },
  {
    toolId: "fifo-test-helper",
    path: "/usr/bin/mkfifo"
  },
  {
    toolId: "network-sandbox",
    path: "/usr/bin/sandbox-exec"
  },
  {
    toolId: "developer-tool-resolver",
    path: "/usr/bin/xcrun"
  }
]);
const LOCAL_RECORD_TRUST = Object.freeze({
  runnerIdentityAuthenticated: false,
  signer: {
    status: "UNSIGNED",
    provider: null,
    keyId: null,
    signature: null
  },
  threatModel:
    "HONEST_LOCAL_OPERATOR_WITH_MANDATORY_REPOSITORY_REVIEW",
  forgeryResistance:
    "NONE_REPOSITORY_WRITER_CAN_FABRICATE_A_SELF_CONSISTENT_RECORD",
  contentDigestPurpose:
    "STALE_CONTENT_AND_ACCIDENTAL_CORRUPTION_DETECTION_ONLY",
  limitation:
    "This local record binds exact named Vitest results to exact hashed content only under an honest-local-operator assumption. A repository writer can fabricate the unsigned record, so it is not authenticated execution provenance."
});
const TOOLCHAIN_BINDING_SCOPE = Object.freeze({
  boundInputs: [
    "NAMED_EXECUTABLE_AND_ENTRYPOINT_FILE_BYTES",
    "LOCKFILE_DECLARATIONS",
    "INSTALLED_NODE_PACKAGE_FILE_TREES",
    "INSTALLED_NODE_WORKSPACE_LINK_TARGET_FILE_TREES",
    "NODE_PACKAGE_BIN_LINK_TARGETS"
  ],
  deliberatelyExcludedMutableNodeRuntimeCaches: [
    "node_modules/.vite",
    "node_modules/.vite-temp"
  ],
  unboundInputs: [
    "OPERATING_SYSTEM_RUNTIME",
    "DYNAMIC_LIBRARIES_LOADED_BY_BOUND_EXECUTABLES",
    "PYTHON_STANDARD_LIBRARY_AND_SITE_PACKAGES_OUTSIDE_NODE_MODULES",
    "COMPILER_SDK_HEADERS_LIBRARIES_AND_DRIVER_DISCOVERY"
  ],
  claim:
    "The identity content-binds only the listed executable, entrypoint, installed Node package, workspace-link target, and bin-link inputs. It does not content-bind the operating system, dynamically loaded libraries, Python runtime libraries outside node_modules, or compiler SDK inputs."
});
const EXCLUDED_NODE_RUNTIME_CACHE_NAMES = new Set([
  ".vite",
  ".vite-temp"
]);

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

function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function sha256File(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

function sha256Canonical(value) {
  return sha256Bytes(canonicalJson(value));
}

function milliseconds(value, label) {
  const parsed =
    typeof value === "string" ? Date.parse(value) : value;
  if (
    !Number.isFinite(parsed) ||
    parsed < 0 ||
    Math.trunc(parsed) !== parsed
  ) {
    throw new Error(`${label} must be a valid millisecond timestamp`);
  }
  return parsed;
}

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function toPosixPath(path) {
  return path.split(sep).join("/");
}

function canonicalRepositoryCoordinates(repoRoot, path) {
  const lexicalRoot = resolve(repoRoot);
  const canonicalRoot = realpathSync(lexicalRoot);
  const lexicalAbsolute = isAbsolute(path)
    ? resolve(path)
    : resolve(lexicalRoot, path);
  let canonicalAbsolute;
  try {
    canonicalAbsolute = realpathSync(lexicalAbsolute);
  } catch (error) {
    if (
      error.code !== "ENOENT" &&
      error.code !== "ENOTDIR"
    ) {
      throw error;
    }
    const lexicalRelative = relative(
      lexicalRoot,
      lexicalAbsolute
    );
    canonicalAbsolute =
      lexicalRelative &&
      lexicalRelative !== ".." &&
      !lexicalRelative.startsWith(`..${sep}`)
        ? resolve(canonicalRoot, lexicalRelative)
        : lexicalAbsolute;
  }
  return {
    canonicalRoot,
    canonicalAbsolute
  };
}

export function repoRelativePath(repoRoot, path, label) {
  const {
    canonicalRoot,
    canonicalAbsolute
  } = canonicalRepositoryCoordinates(repoRoot, path);
  const rel = relative(
    canonicalRoot,
    canonicalAbsolute
  );
  if (
    !rel ||
    rel === ".." ||
    rel.startsWith(`..${sep}`)
  ) {
    throw new Error(
      `${label} must resolve to a file inside the repository: ${path}`
    );
  }
  return toPosixPath(rel);
}

function displayPath(repoRoot, path) {
  const {
    canonicalRoot,
    canonicalAbsolute
  } = canonicalRepositoryCoordinates(repoRoot, path);
  const rel = relative(
    canonicalRoot,
    canonicalAbsolute
  );
  if (
    rel &&
    rel !== ".." &&
    !rel.startsWith(`..${sep}`)
  ) {
    return toPosixPath(rel);
  }
  return toPosixPath(canonicalAbsolute);
}

function manifestProcessEntries(content) {
  return content.processes ?? content.processClaims ?? [];
}

function testsDeclaredByManifest(content) {
  const tests = [...(content.tests ?? [])];
  const topLevelById = new Map(
    tests
      .filter((test) => test?.testId)
      .map((test) => [test.testId, test])
  );
  const topLevelIds = new Set(
    topLevelById.keys()
  );
  for (const process of manifestProcessEntries(content)) {
    for (const candidate of [
      ...(process.realTests ?? []),
      ...(process.syntheticTests ?? [])
    ]) {
      const test =
        typeof candidate === "string"
          ? topLevelById.get(candidate) ?? {
              testId: candidate
            }
          : candidate;
      if (!topLevelIds.has(test?.testId)) {
        tests.push(test);
        if (test?.testId) {
          topLevelIds.add(test.testId);
        }
      }
    }
  }
  return tests;
}

export function proofTestDeclarations({
  repoRoot,
  manifestFiles
}) {
  const declarations = [];
  const byTestId = new Map();
  for (const { path: manifestPath, content } of manifestFiles) {
    for (const [index, test] of testsDeclaredByManifest(
      content
    ).entries()) {
      const label = `${manifestPath}.tests[${index}]`;
      const declaration = {
        testId: requireString(
          test?.testId,
          `${label}.testId`
        ),
        path: repoRelativePath(
          repoRoot,
          requireString(test?.path, `${label}.path`),
          `${label}.path`
        ),
        name: requireString(
          test?.name,
          `${label}.name`
        ),
        manifestPath: displayPath(repoRoot, manifestPath)
      };
      const previous = byTestId.get(declaration.testId);
      if (previous) {
        throw new Error(
          `Duplicate proof test ID ${declaration.testId} in ${previous.manifestPath} and ${declaration.manifestPath}`
        );
      }
      byTestId.set(declaration.testId, declaration);
      declarations.push(declaration);
    }
  }
  const identities = new Map();
  for (const declaration of declarations) {
    const identity = `${declaration.path}\u0000${declaration.name}`;
    const previous = identities.get(identity);
    if (previous) {
      throw new Error(
        `Proof tests ${previous} and ${declaration.testId} declare the same file and exact test name`
      );
    }
    identities.set(identity, declaration.testId);
  }
  return declarations.sort((left, right) =>
    left.testId.localeCompare(right.testId)
  );
}

async function regularFile(path, label) {
  const details = await lstat(path).catch((error) => {
    if (error.code === "ENOENT") {
      throw new Error(`${label} does not exist: ${path}`);
    }
    throw error;
  });
  if (!details.isFile() || details.isSymbolicLink()) {
    throw new Error(`${label} must be a regular file: ${path}`);
  }
  return details;
}

export async function regularFilesBelow(
  directory,
  {
    optional = false,
    excludedAbsolutePaths = []
  } = {}
) {
  const files = [];
  const rootDetails = await lstat(directory).catch((error) => {
    if (optional && error.code === "ENOENT") return null;
    throw error;
  });
  if (rootDetails === null) return files;
  if (
    !rootDetails.isDirectory() ||
    rootDetails.isSymbolicLink()
  ) {
    throw new Error(
      `FINGERPRINT_TREE_ENTRY_UNSAFE: fingerprint roots must be regular directories, not symlinks or special entries: ${directory}`
    );
  }
  const entries = await readdir(directory, {
    withFileTypes: true
  });
  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name)
  )) {
    const path = join(directory, entry.name);
    if (
      excludedAbsolutePaths.some(
        (excludedPath) =>
          resolve(excludedPath) === resolve(path)
      )
    ) {
      continue;
    }
    if (entry.isDirectory()) {
      files.push(
        ...(await regularFilesBelow(path, {
          excludedAbsolutePaths
        }))
      );
    } else if (entry.isFile()) {
      files.push(path);
    } else {
      throw new Error(
        `FINGERPRINT_TREE_ENTRY_UNSAFE: symlinks and special entries are forbidden below fingerprint roots: ${path}`
      );
    }
  }
  return files;
}

async function collectFingerprintPaths({
  repoRoot,
  manifestFiles,
  declarations
}) {
  const root = resolve(repoRoot);
  const paths = new Set(
    CANONICAL_SOURCE_FILES.map((path) =>
      resolve(root, path)
    )
  );
  for (const { path } of manifestFiles) {
    paths.add(resolve(path));
  }
  for (const declaration of declarations) {
    paths.add(resolve(root, declaration.path));
  }
  for (const { content } of manifestFiles) {
    for (const adapterPath of [
      content.adapterPath,
      ...manifestProcessEntries(content).map(
        (process) => process.adapterPath
      )
    ].filter(Boolean)) {
      paths.add(
        resolve(
          root,
          repoRelativePath(
            root,
            adapterPath,
            "proof adapterPath"
          )
        )
      );
    }
  }
  for (const [index, relativeDirectory] of
    FINGERPRINT_SOURCE_DIRECTORIES.entries()) {
    for (const path of await regularFilesBelow(
      resolve(root, relativeDirectory),
      {
        optional: index > 1,
        excludedAbsolutePaths:
          relativeDirectory ===
          "scripts/research/operational-savings"
            ? [
                resolve(
                  root,
                  "scripts/research/operational-savings/.cache"
                ),
                resolve(
                  root,
                  "scripts/research/operational-savings/containers/post-hoc-replay-receipt.v1.json"
                )
              ]
            : []
      }
    )) {
      paths.add(path);
    }
  }
  return [...paths].sort((left, right) =>
    displayPath(root, left).localeCompare(
      displayPath(root, right)
    )
  );
}

export async function buildProofSourceEvidenceFingerprint({
  repoRoot,
  manifestFiles
}) {
  const root = resolve(repoRoot);
  const resolvedRoot = await realpath(root);
  const declarations = proofTestDeclarations({
    repoRoot: root,
    manifestFiles
  });
  const paths = await collectFingerprintPaths({
    repoRoot: root,
    manifestFiles,
    declarations
  });
  const files = [];
  for (const path of paths) {
    const relativePath = relative(root, resolve(path));
    if (
      relativePath &&
      relativePath !== ".." &&
      !relativePath.startsWith(`..${sep}`)
    ) {
      const resolvedPath = await realpath(path);
      const expectedResolvedPath = resolve(
        resolvedRoot,
        relativePath
      );
      if (resolvedPath !== expectedResolvedPath) {
        throw new Error(
          `FINGERPRINT_TREE_ENTRY_UNSAFE: symlinked path components are forbidden for fingerprint sources: ${path}`
        );
      }
    }
    const details = await regularFile(
      path,
      "Fingerprint source"
    );
    const bytes = await readFile(path);
    files.push({
      path: displayPath(root, path),
      sizeBytes: details.size,
      executable: Boolean(details.mode & 0o111),
      sha256: sha256Bytes(bytes)
    });
  }
  const fingerprintPayload = {
    schemaVersion:
      PROOF_SOURCE_FINGERPRINT_SCHEMA_VERSION,
    algorithm: "SHA-256",
    files
  };
  return {
    ...fingerprintPayload,
    digest: sha256Canonical(fingerprintPayload),
    fileCount: files.length,
    testCatalogFingerprint: sha256Canonical(
      declarations
    )
  };
}

const toolchainIdentityCache = new Map();

async function exactExecutionToolIdentity({
  toolId,
  path
}) {
  const requestedPath = resolve(path);
  const requestedDetails = await lstat(requestedPath).catch(
    (error) => {
      if (error.code === "ENOENT") {
        throw new Error(
          `PROOF_EXECUTION_TOOL_MISSING: ${toolId} is missing at ${requestedPath}`
        );
      }
      throw error;
    }
  );
  const symlinkTarget = requestedDetails.isSymbolicLink()
    ? await readlink(requestedPath)
    : null;
  const resolvedPath = await realpath(requestedPath);
  const details = await regularFile(
    resolvedPath,
    `Proof execution tool ${toolId}`
  );
  const bytes = await readFile(resolvedPath);
  return {
    toolId,
    requestedPath,
    resolvedPath,
    requestedPathType: requestedDetails.isSymbolicLink()
      ? "SYMLINK_TO_BOUND_REGULAR_FILE"
      : "REGULAR_FILE",
    symlinkTarget,
    sizeBytes: details.size,
    executable: Boolean(details.mode & 0o111),
    sha256: sha256Bytes(bytes)
  };
}

async function xcrunToolPath(toolName) {
  const { stdout } = await execFileAsync(
    "/usr/bin/xcrun",
    ["--find", toolName],
    {
      encoding: "utf8",
      env: {
        PATH: "/usr/bin:/bin:/usr/sbin:/sbin"
      },
      maxBuffer: 1024 * 1024
    }
  );
  const path = requireString(
    stdout.trim(),
    `xcrun path for ${toolName}`
  );
  if (!isAbsolute(path)) {
    throw new Error(
      `PROOF_EXECUTION_TOOL_PATH_INVALID: xcrun returned a non-absolute path for ${toolName}`
    );
  }
  return path;
}

async function installedPackageFiles(packageRoot) {
  const paths = [];
  async function visit(directory) {
    const entries = await readdir(directory, {
      withFileTypes: true
    });
    for (const entry of entries.sort((left, right) =>
      left.name.localeCompare(right.name)
    )) {
      if (entry.name === "node_modules") continue;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
      } else if (entry.isFile()) {
        paths.push(path);
      } else {
        throw new Error(
          `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: ${path} is not a regular file or directory`
        );
      }
    }
  }
  await visit(packageRoot);
  const files = new Array(paths.length);
  let nextIndex = 0;
  await Promise.all(
    Array.from(
      { length: Math.min(32, paths.length) },
      async () => {
        while (nextIndex < paths.length) {
          const index = nextIndex;
          nextIndex += 1;
          const path = paths[index];
          const before = await lstat(path);
          const sha256 = await sha256File(path);
          const after = await lstat(path);
          if (
            !before.isFile() ||
            before.isSymbolicLink() ||
            !after.isFile() ||
            after.isSymbolicLink() ||
            before.dev !== after.dev ||
            before.ino !== after.ino ||
            before.size !== after.size ||
            before.mtimeMs !== after.mtimeMs ||
            before.ctimeMs !== after.ctimeMs
          ) {
            throw new Error(
              `PROOF_EXECUTION_DEPENDENCY_CHANGED_DURING_CAPTURE: ${path}`
            );
          }
          files[index] = {
            path: toPosixPath(
              relative(packageRoot, path)
            ),
            sizeBytes: after.size,
            executable: Boolean(after.mode & 0o111),
            sha256
          };
        }
      }
    )
  );
  return files;
}

async function actualInstalledPackageRoots(
  nodeModulesRoot
) {
  const roots = new Set();
  async function visitNodeModules(directory, prefix) {
    const entries = await readdir(directory, {
      withFileTypes: true
    });
    for (const entry of entries.sort((left, right) =>
      left.name.localeCompare(right.name)
    )) {
      const path = join(directory, entry.name);
      if (entry.name === ".bin") {
        if (
          !entry.isDirectory() ||
          entry.isSymbolicLink()
        ) {
          throw new Error(
            `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: ${path} must be a regular directory`
          );
        }
        continue;
      }
      if (entry.name === ".package-lock.json") {
        if (!entry.isFile() || entry.isSymbolicLink()) {
          throw new Error(
            `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: ${path} must be a regular file`
          );
        }
        continue;
      }
      if (
        EXCLUDED_NODE_RUNTIME_CACHE_NAMES.has(entry.name)
      ) {
        if (
          !entry.isDirectory() ||
          entry.isSymbolicLink()
        ) {
          throw new Error(
            `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: excluded runtime cache ${path} must be a regular directory`
          );
        }
        continue;
      }
      if (entry.name.startsWith("@")) {
        if (
          !entry.isDirectory() ||
          entry.isSymbolicLink()
        ) {
          throw new Error(
            `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: package scope ${path} must be a regular directory`
          );
        }
        const scopedEntries = await readdir(path, {
          withFileTypes: true
        });
        for (const scopedEntry of scopedEntries.sort(
          (left, right) =>
            left.name.localeCompare(right.name)
        )) {
          if (scopedEntry.name.startsWith(".")) {
            throw new Error(
              `PROOF_EXECUTION_EXTRANEOUS_PACKAGE_ROOT: ${join(path, scopedEntry.name)}`
            );
          }
          await visitPackageRoot(
            join(path, scopedEntry.name),
            `${prefix}/${entry.name}/${scopedEntry.name}`,
            scopedEntry
          );
        }
        continue;
      }
      if (entry.name.startsWith(".")) {
        throw new Error(
          `PROOF_EXECUTION_EXTRANEOUS_PACKAGE_ROOT: ${path}`
        );
      }
      await visitPackageRoot(
        path,
        `${prefix}/${entry.name}`,
        entry
      );
    }
  }
  async function visitPackageRoot(path, packagePath, entry) {
    if (
      !entry.isDirectory() &&
      !entry.isSymbolicLink()
    ) {
      throw new Error(
        `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: package root ${path} must be a directory or workspace symlink`
      );
    }
    roots.add(toPosixPath(packagePath));
    if (entry.isDirectory() && !entry.isSymbolicLink()) {
      const nested = join(path, "node_modules");
      const nestedDetails = await lstat(nested).catch(
        (error) => {
          if (error.code === "ENOENT") return null;
          throw error;
        }
      );
      if (nestedDetails !== null) {
        if (
          !nestedDetails.isDirectory() ||
          nestedDetails.isSymbolicLink()
        ) {
          throw new Error(
            `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: nested node_modules ${nested} must be a regular directory`
          );
        }
        await visitNodeModules(nested, `${packagePath}/node_modules`);
      }
    }
  }
  await visitNodeModules(nodeModulesRoot, "node_modules");
  return [...roots].sort();
}

async function installedBinLinkCatalog(nodeModulesRoot) {
  const resolvedNodeModulesRoot =
    await realpath(nodeModulesRoot);
  const binRoot = join(nodeModulesRoot, ".bin");
  const details = await lstat(binRoot).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (details === null) return [];
  if (!details.isDirectory() || details.isSymbolicLink()) {
    throw new Error(
      "PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: node_modules/.bin must be a regular directory"
    );
  }
  const catalog = [];
  for (const entry of await readdir(binRoot, {
    withFileTypes: true
  })) {
    const path = join(binRoot, entry.name);
    if (!entry.isSymbolicLink()) {
      throw new Error(
        `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: ${path} must be a symlink to a bound package file`
      );
    }
    const target = await readlink(path);
    const resolvedTarget = await realpath(path);
    const targetRelative = relative(
      resolvedNodeModulesRoot,
      resolvedTarget
    );
    if (
      !targetRelative ||
      targetRelative === ".." ||
      targetRelative.startsWith(`..${sep}`)
    ) {
      throw new Error(
        `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: ${path} escapes node_modules`
      );
    }
    const targetDetails = await regularFile(
      resolvedTarget,
      `Installed package bin target ${entry.name}`
    );
    catalog.push({
      name: entry.name,
      symlinkTarget: target,
      resolvedTarget: toPosixPath(targetRelative),
      targetSizeBytes: targetDetails.size,
      targetSha256: await sha256File(resolvedTarget)
    });
  }
  return catalog.sort((left, right) =>
    left.name.localeCompare(right.name)
  );
}

export async function installedDependencyTreeIdentity(repoRoot) {
  const root = resolve(repoRoot);
  const nodeModulesRoot = resolve(root, "node_modules");
  const nodeModulesDetails = await lstat(nodeModulesRoot);
  if (
    !nodeModulesDetails.isDirectory() ||
    nodeModulesDetails.isSymbolicLink()
  ) {
    throw new Error(
      "PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: node_modules must be a regular directory"
    );
  }
  const resolvedNodeModulesRoot =
    await realpath(nodeModulesRoot);
  const lockPath = resolve(root, "package-lock.json");
  const lockBytes = await readFile(lockPath);
  let lock;
  try {
    lock = JSON.parse(lockBytes.toString("utf8"));
  } catch (error) {
    throw new Error(
      `PROOF_EXECUTION_PACKAGE_LOCK_INVALID: ${error.message}`
    );
  }
  if (
    !lock.packages ||
    typeof lock.packages !== "object" ||
    Array.isArray(lock.packages)
  ) {
    throw new Error(
      "PROOF_EXECUTION_PACKAGE_LOCK_INVALID: packages catalog is missing"
    );
  }
  const packageCatalog = [];
  const fileCatalog = [];
  const workspaceLinkCatalog = [];
  const expectedInstalledPackageRoots = new Set();
  let totalSizeBytes = 0;
  for (const [packagePath, metadata] of Object.entries(
    lock.packages
  ).sort(([left], [right]) => left.localeCompare(right))) {
    if (!packagePath.startsWith("node_modules/")) {
      continue;
    }
    const packageRoot = resolve(root, packagePath);
    const packageRelativePath = relative(
      nodeModulesRoot,
      packageRoot
    );
    if (
      !packageRelativePath ||
      packageRelativePath === ".." ||
      packageRelativePath.startsWith(`..${sep}`)
    ) {
      throw new Error(
        `PROOF_EXECUTION_PACKAGE_PATH_INVALID: ${packagePath} escapes node_modules`
      );
    }
    const details = await lstat(packageRoot).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (metadata?.link === true) {
      if (details === null) {
        throw new Error(
          `PROOF_EXECUTION_WORKSPACE_LINK_MISSING: ${packagePath}`
        );
      }
      if (!details.isSymbolicLink()) {
        throw new Error(
          `PROOF_EXECUTION_WORKSPACE_LINK_INVALID: ${packagePath} must be a symlink`
        );
      }
      const resolved = requireString(
        metadata?.resolved,
        `${packagePath}.resolved`
      );
      const expectedTarget = resolve(root, resolved);
      const expectedTargetRelative = relative(
        root,
        expectedTarget
      );
      if (
        !expectedTargetRelative ||
        expectedTargetRelative === ".." ||
        expectedTargetRelative.startsWith(`..${sep}`)
      ) {
        throw new Error(
          `PROOF_EXECUTION_WORKSPACE_LINK_INVALID: ${packagePath} target escapes the repository`
        );
      }
      const actualTarget = await realpath(packageRoot);
      const resolvedExpectedTarget =
        await realpath(expectedTarget);
      const resolvedRepositoryRoot =
        await realpath(root);
      if (
        resolvedExpectedTarget !==
        resolve(
          resolvedRepositoryRoot,
          expectedTargetRelative
        )
      ) {
        throw new Error(
          `PROOF_EXECUTION_WORKSPACE_LINK_INVALID: ${packagePath} target contains a symlinked path component`
        );
      }
      if (actualTarget !== resolvedExpectedTarget) {
        throw new Error(
          `PROOF_EXECUTION_WORKSPACE_LINK_INVALID: ${packagePath} does not resolve to ${resolved}`
        );
      }
      const workspaceFiles =
        await installedPackageFiles(expectedTarget);
      const workspaceFileCatalog = workspaceFiles.map(
        (file) => ({
          path: `${toPosixPath(expectedTargetRelative)}/${file.path}`,
          sizeBytes: file.sizeBytes,
          executable: file.executable,
          sha256: file.sha256
        })
      );
      expectedInstalledPackageRoots.add(packagePath);
      workspaceLinkCatalog.push({
        packagePath,
        resolved: toPosixPath(expectedTargetRelative),
        symlinkTarget: await readlink(packageRoot),
        fileCount: workspaceFileCatalog.length,
        fileTreeSha256:
          sha256Canonical(workspaceFileCatalog)
      });
      continue;
    }
    const integrity = requireString(
      metadata?.integrity,
      `${packagePath}.integrity`
    );
    if (!/^(?:sha256|sha384|sha512)-[A-Za-z0-9+/=]+$/.test(integrity)) {
      throw new Error(
        `PROOF_EXECUTION_PACKAGE_INTEGRITY_INVALID: ${packagePath} has an invalid lockfile integrity`
      );
    }
    if (details === null) {
      if (metadata.optional === true) {
        packageCatalog.push({
          packagePath,
          version: metadata.version ?? null,
          integrity,
          optional: true,
          installed: false
        });
        continue;
      }
      throw new Error(
        `PROOF_EXECUTION_DEPENDENCY_MISSING: ${packagePath}`
      );
    }
    expectedInstalledPackageRoots.add(packagePath);
    if (!details.isDirectory() || details.isSymbolicLink()) {
      throw new Error(
        `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: ${packagePath} must be a regular directory`
      );
    }
    const resolvedPackageRoot = await realpath(packageRoot);
    if (
      resolvedPackageRoot !==
      resolve(
        resolvedNodeModulesRoot,
        packageRelativePath
      )
    ) {
      throw new Error(
        `PROOF_EXECUTION_DEPENDENCY_ENTRY_UNSAFE: ${packagePath} contains a symlinked path component`
      );
    }
    const files = await installedPackageFiles(packageRoot);
    const packageFiles = files.map((file) => ({
      path: `${packagePath}/${file.path}`,
      sizeBytes: file.sizeBytes,
      executable: file.executable,
      sha256: file.sha256
    }));
    fileCatalog.push(...packageFiles);
    totalSizeBytes += packageFiles.reduce(
      (sum, file) => sum + file.sizeBytes,
      0
    );
    packageCatalog.push({
      packagePath,
      version: metadata.version ?? null,
      integrity,
      optional: metadata.optional === true,
      installed: true,
      fileCount: packageFiles.length,
      fileTreeSha256: sha256Canonical(packageFiles)
    });
  }
  const actualPackageRoots =
    await actualInstalledPackageRoots(nodeModulesRoot);
  const expectedPackageRoots = [
    ...expectedInstalledPackageRoots
  ].sort();
  if (
    canonicalJson(actualPackageRoots) !==
    canonicalJson(expectedPackageRoots)
  ) {
    const expected = new Set(expectedPackageRoots);
    const actual = new Set(actualPackageRoots);
    const extraneous = actualPackageRoots.filter(
      (path) => !expected.has(path)
    );
    const missing = expectedPackageRoots.filter(
      (path) => !actual.has(path)
    );
    throw new Error(
      `PROOF_EXECUTION_PACKAGE_ROOT_CATALOG_MISMATCH: ${JSON.stringify(
        {
          extraneous,
          missing
        }
      )}`
    );
  }
  const [binLinkCatalog, hiddenLockBytes] =
    await Promise.all([
      installedBinLinkCatalog(nodeModulesRoot),
      readFile(join(nodeModulesRoot, ".package-lock.json"))
    ]);
  const payload = {
    lockfileSha256: sha256Bytes(lockBytes),
    hiddenLockfileSha256: sha256Bytes(hiddenLockBytes),
    packageCatalog,
    fileCatalog,
    workspaceLinkCatalog,
    binLinkCatalog,
    installedPackageRoots: actualPackageRoots,
    excludedRuntimeCacheDirectories: [
      "node_modules/.vite",
      "node_modules/.vite-temp"
    ]
  };
  return {
    lockfileSha256: payload.lockfileSha256,
    hiddenLockfileSha256:
      payload.hiddenLockfileSha256,
    declaredPackageCount: packageCatalog.length,
    installedPackageCount: packageCatalog.filter(
      (entry) => entry.installed
    ).length,
    fileCount: fileCatalog.length,
    workspaceLinkCount: workspaceLinkCatalog.length,
    binLinkCount: binLinkCatalog.length,
    installedPackageRootCount:
      actualPackageRoots.length,
    totalSizeBytes,
    packageCatalogSha256: sha256Canonical(packageCatalog),
    fileTreeSha256: sha256Canonical(fileCatalog),
    workspaceLinkCatalogSha256:
      sha256Canonical(workspaceLinkCatalog),
    binLinkCatalogSha256:
      sha256Canonical(binLinkCatalog),
    installedPackageRootsSha256:
      sha256Canonical(actualPackageRoots),
    excludedRuntimeCacheDirectories:
      payload.excludedRuntimeCacheDirectories,
    digest: sha256Canonical(payload)
  };
}

async function buildFreshProofExecutionToolchainIdentity(
  repoRoot
) {
  const root = resolve(repoRoot);
  const vitestPath = resolve(
    root,
    "node_modules/vitest/vitest.mjs"
  );
  const pythonPath = await xcrunToolPath("python3");
  const toolDefinitions = [
    {
      toolId: "node-runtime",
      path: process.execPath
    },
    {
      toolId: "vitest-entrypoint",
      path: vitestPath
    },
    ...ABSOLUTE_EXECUTION_TOOLS,
    {
      toolId: "measur-cxx",
      path: "/usr/bin/clang++"
    },
    {
      toolId: "ssc-python",
      path: pythonPath
    }
  ];
  const [tools, installedDependencies] =
    await Promise.all([
      Promise.all(
        toolDefinitions.map(exactExecutionToolIdentity)
      ),
      installedDependencyTreeIdentity(root)
    ]);
  const payload = {
    schemaVersion:
      PROOF_EXECUTION_TOOLCHAIN_SCHEMA_VERSION,
    bindingScope: TOOLCHAIN_BINDING_SCOPE,
    tools: tools.sort((left, right) =>
      left.toolId.localeCompare(right.toolId)
    ),
    installedDependencies
  };
  return {
    ...payload,
    digest: sha256Canonical(payload)
  };
}

export async function buildProofExecutionToolchainIdentity({
  repoRoot,
  useCache = true
}) {
  const root = resolve(repoRoot);
  if (!useCache) {
    return buildFreshProofExecutionToolchainIdentity(root);
  }
  if (!toolchainIdentityCache.has(root)) {
    toolchainIdentityCache.set(
      root,
      buildFreshProofExecutionToolchainIdentity(root)
    );
  }
  return toolchainIdentityCache.get(root);
}

export async function buildProofCacheIdentity({
  repoRoot
}) {
  const root = resolve(repoRoot);
  const inputRoots = [
    "scripts/research/operational-savings/.cache",
    "tmp"
  ].map((relativePath) => ({
    relativePath,
    absolutePath: resolve(root, relativePath)
  }));
  const identifiedPaths = [];
  for (const inputRoot of inputRoots) {
    const rootDetails = await lstat(
      inputRoot.absolutePath
    );
    if (
      !rootDetails.isDirectory() ||
      rootDetails.isSymbolicLink()
    ) {
      throw new Error(
        `PROOF_EXECUTION_CACHE_ENTRY_UNSAFE: the research-local input must be a regular directory: ${inputRoot.relativePath}`
      );
    }
    for (const path of await regularFilesBelow(
      inputRoot.absolutePath
    )) {
      identifiedPaths.push({
        path,
        relativePath: toPosixPath(relative(root, path))
      });
    }
  }
  const files = new Array(identifiedPaths.length);
  let nextIndex = 0;
  await Promise.all(
    Array.from(
      { length: Math.min(4, identifiedPaths.length) },
      async () => {
        while (nextIndex < identifiedPaths.length) {
          const index = nextIndex;
          nextIndex += 1;
          const { path, relativePath } =
            identifiedPaths[index];
          const before = await lstat(path);
          const sha256 = await sha256File(path);
          const after = await lstat(path);
          if (
            !before.isFile() ||
            before.isSymbolicLink() ||
            !after.isFile() ||
            after.isSymbolicLink() ||
            before.dev !== after.dev ||
            before.ino !== after.ino ||
            before.size !== after.size ||
            before.mtimeMs !== after.mtimeMs ||
            before.ctimeMs !== after.ctimeMs
          ) {
            throw new Error(
              `PROOF_EXECUTION_CACHE_CHANGED_DURING_CAPTURE: ${path}`
            );
          }
          files[index] = {
            path: relativePath,
            sizeBytes: after.size,
            executable: Boolean(after.mode & 0o111),
            sha256
          };
        }
      }
    )
  );
  const payload = {
    schemaVersion:
      PROOF_EXECUTION_CACHE_IDENTITY_SCHEMA_VERSION,
    files
  };
  return {
    ...payload,
    fileCount: files.length,
    totalSizeBytes: files.reduce(
      (sum, file) => sum + file.sizeBytes,
      0
    ),
    digest: sha256Canonical(payload)
  };
}

function portableToolchainContentIdentity(identity) {
  return {
    schemaVersion: identity.schemaVersion,
    bindingScope: identity.bindingScope,
    tools: identity.tools.map((tool) => ({
      toolId: tool.toolId,
      requestedPathType: tool.requestedPathType,
      sizeBytes: tool.sizeBytes,
      executable: tool.executable,
      sha256: tool.sha256
    })),
    installedDependencies:
      identity.installedDependencies
  };
}

function validateProofCacheIdentity(identity, label) {
  const paths = new Set();
  let totalSizeBytes = 0;
  if (
    identity?.schemaVersion !==
      PROOF_EXECUTION_CACHE_IDENTITY_SCHEMA_VERSION ||
    !Array.isArray(identity.files) ||
    identity.fileCount !== identity.files.length
  ) {
    throw new Error(
      `PROOF_EXECUTION_ISOLATION_IDENTITY_INVALID: ${label} cache identity is invalid`
    );
  }
  for (const file of identity.files) {
    if (
      typeof file?.path !== "string" ||
      !file.path ||
      isAbsolute(file.path) ||
      file.path === ".." ||
      file.path.startsWith("../") ||
      paths.has(file.path) ||
      !Number.isSafeInteger(file.sizeBytes) ||
      file.sizeBytes < 0 ||
      typeof file.executable !== "boolean" ||
      !/^[a-f0-9]{64}$/.test(file.sha256 ?? "")
    ) {
      throw new Error(
        `PROOF_EXECUTION_ISOLATION_IDENTITY_INVALID: ${label} cache file entry is invalid`
      );
    }
    paths.add(file.path);
    totalSizeBytes += file.sizeBytes;
  }
  const payload = {
    schemaVersion: identity.schemaVersion,
    files: identity.files
  };
  if (
    identity.digest !== sha256Canonical(payload) ||
    identity.totalSizeBytes !== totalSizeBytes
  ) {
    throw new Error(
      `PROOF_EXECUTION_ISOLATION_IDENTITY_INVALID: ${label} cache digest or size is invalid`
    );
  }
  return identity;
}

export function assertProofExecutionIsolationMatches({
  privateCopyMode,
  originalPreToolchainIdentity,
  originalPostToolchainIdentity,
  snapshotPreToolchainIdentity,
  snapshotPostToolchainIdentity,
  originalPreCacheIdentity,
  originalPostCacheIdentity,
  snapshotPreCacheIdentity,
  snapshotPostCacheIdentity
}) {
  for (const [label, identity] of [
    ["original pre-run", originalPreToolchainIdentity],
    ["original post-run", originalPostToolchainIdentity],
    ["snapshot pre-run", snapshotPreToolchainIdentity],
    ["snapshot post-run", snapshotPostToolchainIdentity]
  ]) {
    validateProofExecutionToolchainIdentity(identity);
    if (!identity?.digest) {
      throw new Error(
        `PROOF_EXECUTION_ISOLATION_IDENTITY_INVALID: ${label} toolchain identity is missing`
      );
    }
  }
  for (const [label, identity] of [
    ["original pre-run", originalPreCacheIdentity],
    ["original post-run", originalPostCacheIdentity],
    ["snapshot pre-run", snapshotPreCacheIdentity],
    ["snapshot post-run", snapshotPostCacheIdentity]
  ]) {
    validateProofCacheIdentity(identity, label);
  }
  if (
    originalPreToolchainIdentity.digest !==
      originalPostToolchainIdentity.digest ||
    snapshotPreToolchainIdentity.digest !==
      snapshotPostToolchainIdentity.digest
  ) {
    throw new Error(
      "PROOF_EXECUTION_ISOLATED_DEPENDENCIES_CHANGED: original or private-snapshot installed dependencies changed during execution"
    );
  }
  const originalPortable = sha256Canonical(
    portableToolchainContentIdentity(
      originalPreToolchainIdentity
    )
  );
  const snapshotPortable = sha256Canonical(
    portableToolchainContentIdentity(
      snapshotPreToolchainIdentity
    )
  );
  if (originalPortable !== snapshotPortable) {
    throw new Error(
      "PROOF_EXECUTION_ISOLATED_DEPENDENCIES_MISMATCH: private-snapshot dependencies differ from the original measured dependencies"
    );
  }
  if (
    originalPreCacheIdentity.digest !==
      originalPostCacheIdentity.digest ||
    snapshotPreCacheIdentity.digest !==
      snapshotPostCacheIdentity.digest ||
    originalPreCacheIdentity.digest !==
      snapshotPreCacheIdentity.digest
  ) {
    throw new Error(
      "PROOF_EXECUTION_ISOLATED_CACHE_MISMATCH: original or private-snapshot research cache content changed or differs"
    );
  }
  if (
    ![
      "MACOS_CLONEFILE_OR_PRIVATE_COPY",
      "FULL_PRIVATE_DIRECTORY_COPY"
    ].includes(privateCopyMode)
  ) {
    throw new Error(
      "PROOF_EXECUTION_PRIVATE_COPY_MODE_INVALID"
    );
  }
  const vitestTool =
    snapshotPreToolchainIdentity.tools.find(
      (tool) => tool.toolId === "vitest-entrypoint"
    );
  return {
    mode:
      "PRIVATE_CONTENT_VERIFIED_DEPENDENCY_AND_CACHE_COPIES",
    privateCopyMode,
    originalInputsUnchanged: true,
    snapshotInputsUnchanged: true,
    originalAndSnapshotContentMatched: true,
    installedDependencyIdentityDigest:
      originalPreToolchainIdentity.installedDependencies
        .digest,
    researchCacheIdentityDigest:
      originalPreCacheIdentity.digest,
    researchCacheFileCount:
      originalPreCacheIdentity.fileCount,
    researchCacheSizeBytes:
      originalPreCacheIdentity.totalSizeBytes,
    snapshotVitestEntrypointSha256: vitestTool.sha256,
    vitestExecutedFromPrivateSnapshot: true
  };
}

function normalizedArtifactIdentity(artifact, label) {
  const sha256 = artifact?.sha256 ?? null;
  const commitSha = artifact?.commitSha ?? null;
  const byteSize = artifact?.byteSize ?? null;
  if (sha256 !== null && !/^[a-f0-9]{64}$/.test(sha256)) {
    throw new Error(`${label}.sha256 must be a lowercase SHA-256 digest`);
  }
  if (
    commitSha !== null &&
    !/^[a-f0-9]{40,64}$/.test(commitSha)
  ) {
    throw new Error(`${label}.commitSha must be a Git object ID`);
  }
  if (
    byteSize !== null &&
    (!Number.isSafeInteger(byteSize) || byteSize < 0)
  ) {
    throw new Error(`${label}.byteSize must be a non-negative safe integer`);
  }
  if (sha256 === null && commitSha === null) {
    throw new Error(
      `${label} must declare sha256 or commitSha`
    );
  }
  return {
    artifactId: requireString(
      artifact?.artifactId,
      `${label}.artifactId`
    ),
    sha256,
    commitSha,
    byteSize
  };
}

export function proofArtifactIdentityCatalog({
  repoRoot,
  manifestFiles
}) {
  const identities = new Map();
  for (const { path: manifestPath, content } of manifestFiles) {
    const declarations = [
      ...(content.artifacts ?? []),
      ...manifestProcessEntries(content).flatMap(
        (process) => process.realArtifacts ?? []
      )
    ];
    for (const [index, artifact] of declarations.entries()) {
      const identity = normalizedArtifactIdentity(
        artifact,
        `${manifestPath}.artifact[${index}]`
      );
      const prior = identities.get(identity.artifactId);
      const declaredIn = displayPath(repoRoot, manifestPath);
      if (prior) {
        for (const field of [
          "sha256",
          "commitSha",
          "byteSize"
        ]) {
          if (
            prior.identity[field] !== null &&
            identity[field] !== null &&
            prior.identity[field] !== identity[field]
          ) {
            throw new Error(
              `Artifact ${identity.artifactId} has conflicting ${field} identities in proof manifests`
            );
          }
          prior.identity[field] ??= identity[field];
        }
        prior.declaredIn.add(declaredIn);
      } else {
        identities.set(identity.artifactId, {
          identity,
          declaredIn: new Set([declaredIn])
        });
      }
    }
  }
  const artifacts = [...identities.values()]
    .map(({ identity, declaredIn }) => ({
      ...identity,
      declaredIn: [...declaredIn].sort()
    }))
    .sort((left, right) =>
      left.artifactId.localeCompare(right.artifactId)
    );
  const payload = {
    schemaVersion:
      PROOF_ARTIFACT_IDENTITY_CATALOG_SCHEMA_VERSION,
    artifacts
  };
  return {
    ...payload,
    artifactCount: artifacts.length,
    digest: sha256Canonical(payload)
  };
}

async function gitRepositoryState(repoRoot, fingerprint) {
  const [{ stdout: headStdout }, { stdout: statusStdout }] =
    await Promise.all([
      execFileAsync(GIT_PATH, ["rev-parse", "HEAD"], {
        cwd: repoRoot,
        encoding: "utf8",
        env: {
          PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
          LANG: "C",
          LC_ALL: "C",
          GIT_CONFIG_NOSYSTEM: "1",
          GIT_CONFIG_GLOBAL: "/dev/null",
          GIT_CONFIG_SYSTEM: "/dev/null",
          GIT_CONFIG_COUNT: "0",
          GIT_OPTIONAL_LOCKS: "0"
        }
      }),
      execFileAsync(
        GIT_PATH,
        [
          "status",
          "--porcelain=v1",
          "--untracked-files=all"
        ],
        {
          cwd: repoRoot,
          encoding: "utf8",
          env: {
            PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
            LANG: "C",
            LC_ALL: "C",
            GIT_CONFIG_NOSYSTEM: "1",
            GIT_CONFIG_GLOBAL: "/dev/null",
            GIT_CONFIG_SYSTEM: "/dev/null",
            GIT_CONFIG_COUNT: "0",
            GIT_OPTIONAL_LOCKS: "0"
          },
          maxBuffer: 16 * 1024 * 1024
        }
      )
    ]);
  const statusEntries = statusStdout
    .split("\n")
    .filter(Boolean);
  const statusPayload = statusEntries.join("\n");
  return {
    observation:
      "PRE_RUN_AND_POST_RUN_BEFORE_RECORD_WRITE",
    gitHeadCommit: requireString(
      headStdout.trim(),
      "git HEAD"
    ),
    dirtyTreeStatus:
      statusEntries.length > 0 ? "DIRTY" : "CLEAN",
    dirtyEntryCount: statusEntries.length,
    porcelainV1Sha256: sha256Bytes(statusPayload),
    porcelainV1Entries: statusEntries,
    relevantContentDigest: fingerprint.digest,
    relevantContentFileCount: fingerprint.fileCount
  };
}

function proofExecutionInputStatePayload(state) {
  return {
    sourceEvidenceFingerprint:
      state.sourceEvidenceFingerprint,
    artifactIdentityCatalog:
      state.artifactIdentityCatalog,
    executionToolchainIdentity:
      state.executionToolchainIdentity,
    repositoryState: state.repositoryState
  };
}

export async function captureProofExecutionInputState({
  repoRoot,
  manifestFiles,
  capturedAtMs = Date.now(),
  executionToolchainIdentity = undefined,
  useCachedToolchainIdentity = true
}) {
  const root = resolve(repoRoot);
  const sourceEvidenceFingerprint =
    await buildProofSourceEvidenceFingerprint({
      repoRoot: root,
      manifestFiles
    });
  const artifactIdentityCatalog =
    proofArtifactIdentityCatalog({
      repoRoot: root,
      manifestFiles
    });
  const resolvedExecutionToolchainIdentity =
    executionToolchainIdentity ??
    (await buildProofExecutionToolchainIdentity({
      repoRoot: root,
      useCache: useCachedToolchainIdentity
    }));
  const repositoryState = await gitRepositoryState(
    root,
    sourceEvidenceFingerprint
  );
  const state = {
    capturedAt: isoTimestamp(
      capturedAtMs,
      "proof execution input capture time"
    ),
    sourceEvidenceFingerprint,
    artifactIdentityCatalog,
    executionToolchainIdentity:
      resolvedExecutionToolchainIdentity,
    repositoryState
  };
  state.inputStateSha256 = sha256Canonical(
    proofExecutionInputStatePayload(state)
  );
  return state;
}

export function assertProofExecutionInputStateUnchanged({
  preRunInputState,
  postRunInputState
}) {
  if (!preRunInputState || !postRunInputState) {
    throw new Error(
      "PROOF_EXECUTION_INPUT_STATE_REQUIRED: both pre-run and post-run input states are required"
    );
  }
  for (const [label, state] of [
    ["pre-run", preRunInputState],
    ["post-run", postRunInputState]
  ]) {
    milliseconds(
      state.capturedAt,
      `${label} input capture time`
    );
    const expectedDigest = sha256Canonical(
      proofExecutionInputStatePayload(state)
    );
    if (
      !/^[a-f0-9]{64}$/.test(
        state.inputStateSha256 ?? ""
      ) ||
      state.inputStateSha256 !== expectedDigest
    ) {
      throw new Error(
        `PROOF_EXECUTION_INPUT_STATE_INVALID: ${label} input-state digest does not match its content`
      );
    }
  }
  if (
    preRunInputState.inputStateSha256 !==
    postRunInputState.inputStateSha256
  ) {
    throw new Error(
      "PROOF_EXECUTION_INPUTS_CHANGED: proof source, test configuration, artifact identity, or repository state changed while the real suite was running"
    );
  }
  return preRunInputState;
}

function proofExecutionSnapshotStatePayload(state) {
  return {
    sourceEvidenceFingerprint:
      state.sourceEvidenceFingerprint,
    artifactIdentityCatalog:
      state.artifactIdentityCatalog
  };
}

export async function captureProofExecutionSnapshotState({
  repoRoot,
  manifestFiles,
  capturedAtMs = Date.now()
}) {
  const root = resolve(repoRoot);
  const state = {
    capturedAt: isoTimestamp(
      capturedAtMs,
      "proof execution snapshot capture time"
    ),
    sourceEvidenceFingerprint:
      await buildProofSourceEvidenceFingerprint({
        repoRoot: root,
        manifestFiles
      }),
    artifactIdentityCatalog:
      proofArtifactIdentityCatalog({
        repoRoot: root,
        manifestFiles
      })
  };
  state.snapshotStateSha256 = sha256Canonical(
    proofExecutionSnapshotStatePayload(state)
  );
  return state;
}

export function assertProofExecutionSnapshotMatches({
  preRunInputState,
  preRunSnapshotState,
  postRunSnapshotState
}) {
  if (
    !preRunInputState ||
    !preRunSnapshotState ||
    !postRunSnapshotState
  ) {
    throw new Error(
      "PROOF_EXECUTION_SNAPSHOT_STATE_REQUIRED: original, pre-run snapshot, and post-run snapshot states are required"
    );
  }
  for (const [label, state] of [
    ["pre-run", preRunSnapshotState],
    ["post-run", postRunSnapshotState]
  ]) {
    milliseconds(
      state.capturedAt,
      `${label} snapshot capture time`
    );
    const expectedDigest = sha256Canonical(
      proofExecutionSnapshotStatePayload(state)
    );
    if (
      !/^[a-f0-9]{64}$/.test(
        state.snapshotStateSha256 ?? ""
      ) ||
      state.snapshotStateSha256 !== expectedDigest
    ) {
      throw new Error(
        `PROOF_EXECUTION_SNAPSHOT_STATE_INVALID: ${label} snapshot digest does not match its content`
      );
    }
  }
  const originalPayload = {
    sourceEvidenceFingerprint:
      preRunInputState.sourceEvidenceFingerprint,
    artifactIdentityCatalog:
      preRunInputState.artifactIdentityCatalog
  };
  if (
    canonicalJson(originalPayload) !==
    canonicalJson(
      proofExecutionSnapshotStatePayload(
        preRunSnapshotState
      )
    )
  ) {
    throw new Error(
      "PROOF_EXECUTION_SNAPSHOT_SOURCE_MISMATCH: relevant source is dirty, untracked, uncommitted, or otherwise differs from the committed execution snapshot"
    );
  }
  if (
    preRunSnapshotState.snapshotStateSha256 !==
    postRunSnapshotState.snapshotStateSha256
  ) {
    throw new Error(
      "PROOF_EXECUTION_SNAPSHOT_CHANGED: the private committed execution snapshot changed while the real suite was running"
    );
  }
  return preRunSnapshotState;
}

async function installedVitestVersion(repoRoot) {
  const packagePath = resolve(
    repoRoot,
    "node_modules/vitest/package.json"
  );
  const packageJson = JSON.parse(
    await readFile(packagePath, "utf8")
  );
  return requireString(
    packageJson.version,
    "installed Vitest version"
  );
}

function normalizedNetworkEnforcement(controlResult) {
  const verified = controlResult.status === "PASSED";
  return {
    status: verified
      ? "VERIFIED_PROCESS_WIDE_DENY_NETWORK"
      : "PROCESS_WIDE_DENY_NETWORK_NOT_VERIFIED",
    processWideNetworkIsolationVerified: verified,
    scope: "ENTIRE_REAL_VITEST_PROCESS_TREE",
    mechanism:
      "macOS sandbox-exec profile (version 1)(allow default)(deny network*)",
    claim: verified
      ? "The exact sandbox control assertion passed inside the real Vitest process tree after an outbound socket attempt failed immediately with EPERM."
      : "Process-wide network denial is not claimed because the exact sandbox control assertion did not pass.",
    evidence: controlResult
  };
}

function normalizedVitestAssertions(repoRoot, vitestJson) {
  if (
    !vitestJson ||
    typeof vitestJson !== "object" ||
    !Array.isArray(vitestJson.testResults)
  ) {
    throw new Error(
      "VITEST_JSON_INVALID: testResults must be an array"
    );
  }
  const assertions = [];
  for (const [suiteIndex, suite] of
    vitestJson.testResults.entries()) {
    const path = repoRelativePath(
      repoRoot,
      requireString(
        suite?.name,
        `vitest.testResults[${suiteIndex}].name`
      ),
      `vitest.testResults[${suiteIndex}].name`
    );
    if (!Array.isArray(suite.assertionResults)) {
      throw new Error(
        `VITEST_JSON_INVALID: ${path} assertionResults must be an array`
      );
    }
    for (const [assertionIndex, assertion] of
      suite.assertionResults.entries()) {
      const name = requireString(
        assertion?.fullName,
        `${path}.assertionResults[${assertionIndex}].fullName`
      );
      assertions.push({
        path,
        name,
        status: String(
          assertion.status ?? "unknown"
        ).toLowerCase(),
        durationMs:
          Number.isFinite(assertion.duration) &&
          assertion.duration >= 0
            ? assertion.duration
            : null,
        suiteStatus: String(
          suite.status ?? "unknown"
        ).toLowerCase()
      });
    }
  }
  return assertions;
}

function statusForExactAssertions(assertions) {
  if (assertions.length > 1) return "AMBIGUOUS";
  if (assertions.length === 0) return null;
  const [assertion] = assertions;
  if (
    assertion.status === "passed" &&
    assertion.suiteStatus === "passed"
  ) {
    return "PASSED";
  }
  if (
    ["skipped", "pending", "todo"].includes(
      assertion.status
    )
  ) {
    return "SKIPPED";
  }
  return "FAILED";
}

function matchDeclaration(declaration, assertions) {
  const exact = assertions.filter(
    (assertion) =>
      assertion.path === declaration.path &&
      assertion.name === declaration.name
  );
  const exactStatus = statusForExactAssertions(exact);
  if (exactStatus) {
    return {
      ...declaration,
      status: exactStatus,
      durationMs:
        exact.length === 1 ? exact[0].durationMs : null,
      observedPaths: [declaration.path],
      observedNames: [declaration.name]
    };
  }
  const sameName = assertions.filter(
    (assertion) => assertion.name === declaration.name
  );
  if (sameName.length > 0) {
    return {
      ...declaration,
      status: "PATH_MISMATCH",
      durationMs: null,
      observedPaths: [
        ...new Set(sameName.map((assertion) => assertion.path))
      ].sort(),
      observedNames: [declaration.name]
    };
  }
  const samePath = assertions.filter(
    (assertion) => assertion.path === declaration.path
  );
  if (samePath.length > 0) {
    return {
      ...declaration,
      status: "NAME_MISMATCH",
      durationMs: null,
      observedPaths: [declaration.path],
      observedNames: [
        ...new Set(samePath.map((assertion) => assertion.name))
      ].sort()
    };
  }
  return {
    ...declaration,
    status: "MISSING",
    durationMs: null,
    observedPaths: [],
    observedNames: []
  };
}

function isoTimestamp(milliseconds, label) {
  if (
    !Number.isFinite(milliseconds) ||
    milliseconds < 0
  ) {
    throw new Error(`${label} must be a non-negative number`);
  }
  return new Date(milliseconds).toISOString();
}

function runTiming(vitestJson) {
  const rawStartedAtMs = vitestJson.startTime;
  const endTimes = (vitestJson.testResults ?? [])
    .map((suite) => suite.endTime)
    .filter(Number.isFinite);
  const rawCompletedAtMs =
    endTimes.length > 0
      ? Math.max(...endTimes)
      : rawStartedAtMs;
  if (
    !Number.isFinite(rawStartedAtMs) ||
    !Number.isFinite(rawCompletedAtMs) ||
    rawCompletedAtMs < rawStartedAtMs
  ) {
    throw new Error(
      "VITEST_JSON_INVALID: run timestamps are missing or reversed"
    );
  }
  const startedAtMs = Math.trunc(rawStartedAtMs);
  const completedAtMs = Math.trunc(rawCompletedAtMs);
  return {
    startedAt: isoTimestamp(
      startedAtMs,
      "vitest.startTime"
    ),
    completedAt: isoTimestamp(
      completedAtMs,
      "vitest completed time"
    ),
    durationMs: completedAtMs - startedAtMs
  };
}

function normalizedPlatform(platform = {}) {
  return {
    operatingSystem: requireString(
      platform.operatingSystem ?? process.platform,
      "platform.operatingSystem"
    ),
    architecture: requireString(
      platform.architecture ?? process.arch,
      "platform.architecture"
    ),
    nodeVersion: requireString(
      platform.nodeVersion ?? process.version,
      "platform.nodeVersion"
    )
  };
}

function resultCounts(results) {
  return Object.fromEntries(
    TEST_RESULT_STATUSES.map((status) => [
      status,
      results.filter((result) => result.status === status)
        .length
    ])
  );
}

function recordDigest(record) {
  const copy = structuredClone(record);
  delete copy.recordContentSha256;
  return sha256Canonical(copy);
}

function validateProofExecutionToolchainIdentity(identity) {
  if (
    identity?.schemaVersion !==
      PROOF_EXECUTION_TOOLCHAIN_SCHEMA_VERSION ||
    canonicalJson(identity?.bindingScope) !==
      canonicalJson(TOOLCHAIN_BINDING_SCOPE) ||
    !Array.isArray(identity?.tools) ||
    identity.tools.length < 11
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: execution toolchain identity is invalid"
    );
  }
  const toolIds = new Set();
  for (const tool of identity.tools) {
    if (
      toolIds.has(tool?.toolId) ||
      typeof tool?.toolId !== "string" ||
      !tool.toolId.trim() ||
      !isAbsolute(tool?.requestedPath ?? "") ||
      !isAbsolute(tool?.resolvedPath ?? "") ||
      ![
        "REGULAR_FILE",
        "SYMLINK_TO_BOUND_REGULAR_FILE"
      ].includes(tool?.requestedPathType) ||
      (tool.requestedPathType === "REGULAR_FILE" &&
        tool.symlinkTarget !== null) ||
      (tool.requestedPathType ===
        "SYMLINK_TO_BOUND_REGULAR_FILE" &&
        (typeof tool.symlinkTarget !== "string" ||
          !tool.symlinkTarget)) ||
      !Number.isSafeInteger(tool.sizeBytes) ||
      tool.sizeBytes < 0 ||
      typeof tool.executable !== "boolean" ||
      !/^[a-f0-9]{64}$/.test(tool.sha256 ?? "")
    ) {
      throw new Error(
        `PROOF_RUN_RECORD_INVALID: invalid execution tool ${tool?.toolId}`
      );
    }
    toolIds.add(tool.toolId);
  }
  for (const requiredToolId of [
    "node-runtime",
    "vitest-entrypoint",
    "git",
    "archive-extractor",
    "tar-reader",
    "zip-reader",
    "fifo-test-helper",
    "network-sandbox",
    "developer-tool-resolver",
    "measur-cxx",
    "ssc-python"
  ]) {
    if (!toolIds.has(requiredToolId)) {
      throw new Error(
        `PROOF_RUN_RECORD_INVALID: execution toolchain omits ${requiredToolId}`
      );
    }
  }
  const dependencies = identity.installedDependencies;
  if (
    !/^[a-f0-9]{64}$/.test(
      dependencies?.lockfileSha256 ?? ""
    ) ||
    !/^[a-f0-9]{64}$/.test(
      dependencies?.hiddenLockfileSha256 ?? ""
    ) ||
    ![
      dependencies?.declaredPackageCount,
      dependencies?.installedPackageCount,
      dependencies?.fileCount,
      dependencies?.workspaceLinkCount,
      dependencies?.binLinkCount,
      dependencies?.installedPackageRootCount,
      dependencies?.totalSizeBytes
    ].every(
      (value) =>
        Number.isSafeInteger(value) && value >= 0
    ) ||
    dependencies.installedPackageCount >
      dependencies.declaredPackageCount ||
    ![
      dependencies?.packageCatalogSha256,
      dependencies?.fileTreeSha256,
      dependencies?.workspaceLinkCatalogSha256,
      dependencies?.binLinkCatalogSha256,
      dependencies?.installedPackageRootsSha256,
      dependencies?.digest
    ].every((value) => /^[a-f0-9]{64}$/.test(value ?? ""))
    ||
    canonicalJson(
      dependencies?.excludedRuntimeCacheDirectories
    ) !==
      canonicalJson([
        "node_modules/.vite",
        "node_modules/.vite-temp"
      ])
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: installed dependency identity is invalid"
    );
  }
  const payload = {
    schemaVersion: identity.schemaVersion,
    bindingScope: identity.bindingScope,
    tools: identity.tools,
    installedDependencies: identity.installedDependencies
  };
  if (identity.digest !== sha256Canonical(payload)) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: execution toolchain digest mismatch"
    );
  }
  return identity;
}

function validateProofExecutionIsolation(identity) {
  if (
    identity?.mode !==
      "PRIVATE_CONTENT_VERIFIED_DEPENDENCY_AND_CACHE_COPIES" ||
    ![
      "MACOS_CLONEFILE_OR_PRIVATE_COPY",
      "FULL_PRIVATE_DIRECTORY_COPY"
    ].includes(identity?.privateCopyMode) ||
    identity?.originalInputsUnchanged !== true ||
    identity?.snapshotInputsUnchanged !== true ||
    identity?.originalAndSnapshotContentMatched !== true ||
    identity?.vitestExecutedFromPrivateSnapshot !== true ||
    ![
      identity?.installedDependencyIdentityDigest,
      identity?.researchCacheIdentityDigest,
      identity?.snapshotVitestEntrypointSha256
    ].every((value) => /^[a-f0-9]{64}$/.test(value ?? "")) ||
    !Number.isSafeInteger(
      identity?.researchCacheFileCount
    ) ||
    identity.researchCacheFileCount < 0 ||
    !Number.isSafeInteger(
      identity?.researchCacheSizeBytes
    ) ||
    identity.researchCacheSizeBytes < 0
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: private execution-input isolation evidence is invalid"
    );
  }
  return identity;
}

export async function generateProofExecutionRunRecord({
  repoRoot,
  executionRoot = repoRoot,
  manifestFiles,
  preRunInputState,
  postRunInputState,
  preRunSnapshotState,
  postRunSnapshotState,
  executionIsolation,
  vitestJson,
  vitestJsonSha256,
  command,
  runnerStartedAtMs,
  runnerCompletedAtMs,
  runnerExitStatus,
  platform,
  vitestVersion
}) {
  const root = resolve(repoRoot);
  const stableInputState =
    assertProofExecutionInputStateUnchanged({
      preRunInputState,
      postRunInputState
    });
  const stableSnapshotState =
    assertProofExecutionSnapshotMatches({
      preRunInputState,
      preRunSnapshotState,
      postRunSnapshotState
    });
  const declarations = proofTestDeclarations({
    repoRoot: root,
    manifestFiles
  });
  const fingerprint =
    stableInputState.sourceEvidenceFingerprint;
  const artifactIdentityCatalog =
    stableInputState.artifactIdentityCatalog;
  const repositoryState =
    stableInputState.repositoryState;
  const stableExecutionIsolation =
    validateProofExecutionIsolation(
      executionIsolation
    );
  if (
    stableExecutionIsolation
      .installedDependencyIdentityDigest !==
    stableInputState.executionToolchainIdentity
      .installedDependencies.digest
  ) {
    throw new Error(
      "PROOF_EXECUTION_ISOLATION_IDENTITY_INVALID: record isolation evidence does not match the bound dependency identity"
    );
  }
  if (
    fingerprint.testCatalogFingerprint !==
    sha256Canonical(declarations)
  ) {
    throw new Error(
      "PROOF_EXECUTION_INPUTS_CHANGED: the current test declarations do not match the pre-run test catalog"
    );
  }
  const assertions = normalizedVitestAssertions(
    resolve(executionRoot),
    vitestJson
  );
  const results = declarations.map((declaration) =>
    matchDeclaration(declaration, assertions)
  );
  const networkControlResult = matchDeclaration(
    NETWORK_ENFORCEMENT_CONTROL,
    assertions
  );
  const timing = runTiming(vitestJson);
  const preRunCapturedAtMs = milliseconds(
    stableInputState.capturedAt,
    "pre-run input capture time"
  );
  const postRunCapturedAtMs = milliseconds(
    postRunInputState.capturedAt,
    "post-run input capture time"
  );
  const preRunSnapshotCapturedAtMs = milliseconds(
    stableSnapshotState.capturedAt,
    "pre-run snapshot capture time"
  );
  const postRunSnapshotCapturedAtMs = milliseconds(
    postRunSnapshotState.capturedAt,
    "post-run snapshot capture time"
  );
  const normalizedRunnerStartedAtMs = milliseconds(
    runnerStartedAtMs,
    "runner start time"
  );
  const normalizedRunnerCompletedAtMs = milliseconds(
    runnerCompletedAtMs,
    "runner completion time"
  );
  const vitestStartedAtMs = Date.parse(timing.startedAt);
  const vitestCompletedAtMs = Date.parse(
    timing.completedAt
  );
  if (
    preRunCapturedAtMs > normalizedRunnerStartedAtMs ||
    preRunCapturedAtMs > preRunSnapshotCapturedAtMs ||
    preRunSnapshotCapturedAtMs >
      normalizedRunnerStartedAtMs ||
    normalizedRunnerStartedAtMs > vitestStartedAtMs ||
    vitestCompletedAtMs > normalizedRunnerCompletedAtMs ||
    normalizedRunnerCompletedAtMs >
      postRunSnapshotCapturedAtMs ||
    postRunSnapshotCapturedAtMs > postRunCapturedAtMs
  ) {
    throw new Error(
      "PROOF_EXECUTION_TIMELINE_INVALID: Vitest JSON is not bounded by this orchestrated pre-run capture, runner process, and post-run capture"
    );
  }
  if (
    !Number.isSafeInteger(runnerExitStatus) ||
    runnerExitStatus < 0
  ) {
    throw new Error(
      "PROOF_EXECUTION_RUNNER_STATUS_INVALID: runnerExitStatus must be a non-negative safe integer"
    );
  }
  const allDeclarationsPassed = results.every(
    (result) => result.status === "PASSED"
  );
  const executionStatus =
    runnerExitStatus === 0 &&
    vitestJson.success === true &&
    allDeclarationsPassed &&
    networkControlResult.status === "PASSED"
      ? "PASSED"
      : "FAILED";
  const base = {
    schemaVersion:
      PROOF_EXECUTION_RUN_RECORD_SCHEMA_VERSION,
    recordType: PROOF_EXECUTION_RECORD_TYPE,
    trust: structuredClone(LOCAL_RECORD_TRUST),
    sourceEvidenceFingerprint: fingerprint,
    repositoryState,
    artifactIdentityCatalog,
    executionToolchainIdentity:
      stableInputState.executionToolchainIdentity,
    testCatalogFingerprint:
      fingerprint.testCatalogFingerprint,
    execution: {
      status: executionStatus,
      command: requireString(command, "command"),
      attestation: {
        mode:
          "PRIVATE_COMMITTED_SNAPSHOT_WITH_PRE_RUN_POST_RUN_EQUALITY",
        inputStateUnchanged: true,
        inputStateSha256:
          stableInputState.inputStateSha256,
        preRunCapturedAt:
          stableInputState.capturedAt,
        runnerStartedAt: isoTimestamp(
          normalizedRunnerStartedAtMs,
          "runner start time"
        ),
        runnerCompletedAt: isoTimestamp(
          normalizedRunnerCompletedAtMs,
          "runner completion time"
        ),
        postRunCapturedAt:
          postRunInputState.capturedAt,
        runnerExitStatus,
        executionSnapshot: {
          mode:
            "PRIVATE_DETACHED_COMMITTED_GIT_WORKTREE",
          sourceCommit:
            repositoryState.gitHeadCommit,
          sourceEvidenceFingerprintDigest:
            stableSnapshotState
              .sourceEvidenceFingerprint.digest,
          artifactIdentityCatalogDigest:
            stableSnapshotState
              .artifactIdentityCatalog.digest,
          preRunSnapshotStateSha256:
            stableSnapshotState.snapshotStateSha256,
          postRunSnapshotStateSha256:
            postRunSnapshotState.snapshotStateSha256,
          preRunCapturedAt:
            stableSnapshotState.capturedAt,
          postRunCapturedAt:
            postRunSnapshotState.capturedAt,
          privatePathRetained: false,
          isolatedExecutionInputs:
            stableExecutionIsolation
        }
      },
      platform: normalizedPlatform(platform),
      runner: {
        framework: "Vitest",
        version: requireString(
          vitestVersion ??
            (await installedVitestVersion(root)),
          "vitestVersion"
        )
      },
      networkEnforcement:
        normalizedNetworkEnforcement(
          networkControlResult
        ),
      ...timing,
      vitestJsonSha256: requireString(
        vitestJsonSha256,
        "vitestJsonSha256"
      ),
      vitestSuccess: vitestJson.success === true,
      declaredTestCount: declarations.length,
      matchedPassedTestCount: results.filter(
        (result) => result.status === "PASSED"
      ).length,
      requiredControlCount: 1,
      matchedPassedControlCount:
        networkControlResult.status === "PASSED" ? 1 : 0,
      unmatchedVitestAssertionCount:
        assertions.filter(
          (assertion) =>
            ![
              ...declarations,
              NETWORK_ENFORCEMENT_CONTROL
            ].some(
              (declaration) =>
                declaration.path === assertion.path &&
                declaration.name === assertion.name
            )
        ).length,
      resultCounts: resultCounts(results)
    },
    tests: results
  };
  const runId = `local-content-${sha256Canonical(base)}`;
  const record = {
    ...base,
    runId,
    recordedAt: postRunInputState.capturedAt
  };
  record.recordContentSha256 = recordDigest(record);
  validateProofExecutionRunRecord(record);
  return record;
}

export function validateProofExecutionRunRecord(record) {
  if (
    !record ||
    typeof record !== "object" ||
    Array.isArray(record)
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: expected an object"
    );
  }
  if (
    record.schemaVersion !==
    PROOF_EXECUTION_RUN_RECORD_SCHEMA_VERSION
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: wrong schemaVersion"
    );
  }
  if (record.recordType !== PROOF_EXECUTION_RECORD_TYPE) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: wrong recordType"
    );
  }
  if (
    canonicalJson(record.trust) !==
    canonicalJson(LOCAL_RECORD_TRUST)
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: local records must retain the explicit unsigned, unauthenticated, repository-writer-forgeable trust boundary"
    );
  }
  if (
    record.sourceEvidenceFingerprint?.schemaVersion !==
      PROOF_SOURCE_FINGERPRINT_SCHEMA_VERSION ||
    record.sourceEvidenceFingerprint?.algorithm !==
      "SHA-256" ||
    !/^[a-f0-9]{64}$/.test(
      record.sourceEvidenceFingerprint?.digest ?? ""
    ) ||
    !Array.isArray(
      record.sourceEvidenceFingerprint?.files
    ) ||
    record.sourceEvidenceFingerprint.fileCount !==
      record.sourceEvidenceFingerprint.files.length
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: source fingerprint is invalid"
    );
  }
  const fingerprintFiles =
    record.sourceEvidenceFingerprint.files;
  const fingerprintPaths = new Set();
  for (const file of fingerprintFiles) {
    requireString(file?.path, "fingerprint file path");
    if (
      (
        file.path ===
          "scripts/research/operational-savings/.cache" ||
        file.path.startsWith(
          "scripts/research/operational-savings/.cache/"
        )
      ) ||
      fingerprintPaths.has(file.path) ||
      !Number.isSafeInteger(file.sizeBytes) ||
      file.sizeBytes < 0 ||
      typeof file.executable !== "boolean" ||
      !/^[a-f0-9]{64}$/.test(file.sha256 ?? "")
    ) {
      throw new Error(
        `PROOF_RUN_RECORD_INVALID: invalid fingerprint file ${file?.path}`
      );
    }
    fingerprintPaths.add(file.path);
  }
  const fingerprintPayload = {
    schemaVersion:
      record.sourceEvidenceFingerprint.schemaVersion,
    algorithm:
      record.sourceEvidenceFingerprint.algorithm,
    files: fingerprintFiles
  };
  if (
    record.sourceEvidenceFingerprint.digest !==
    sha256Canonical(fingerprintPayload)
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: source fingerprint digest does not match its files"
    );
  }
  validateProofExecutionToolchainIdentity(
    record.executionToolchainIdentity
  );
  const artifactCatalog = record.artifactIdentityCatalog;
  if (
    artifactCatalog?.schemaVersion !==
      PROOF_ARTIFACT_IDENTITY_CATALOG_SCHEMA_VERSION ||
    !Array.isArray(artifactCatalog?.artifacts) ||
    artifactCatalog.artifactCount !==
      artifactCatalog.artifacts.length
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: artifact identity catalog is invalid"
    );
  }
  const artifactIds = new Set();
  for (const artifact of artifactCatalog.artifacts) {
    normalizedArtifactIdentity(
      artifact,
      `artifact identity ${artifact?.artifactId}`
    );
    if (
      artifactIds.has(artifact.artifactId) ||
      !Array.isArray(artifact.declaredIn) ||
      artifact.declaredIn.length === 0 ||
      artifact.declaredIn.some(
        (path) =>
          typeof path !== "string" || !path.trim()
      )
    ) {
      throw new Error(
        `PROOF_RUN_RECORD_INVALID: duplicate or invalid artifact identity ${artifact.artifactId}`
      );
    }
    artifactIds.add(artifact.artifactId);
  }
  const artifactPayload = {
    schemaVersion: artifactCatalog.schemaVersion,
    artifacts: artifactCatalog.artifacts
  };
  if (
    artifactCatalog.digest !==
    sha256Canonical(artifactPayload)
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: artifact identity catalog digest mismatch"
    );
  }
  const repositoryState = record.repositoryState;
  if (
    repositoryState?.observation !==
      "PRE_RUN_AND_POST_RUN_BEFORE_RECORD_WRITE" ||
    !/^[a-f0-9]{40,64}$/.test(
      repositoryState?.gitHeadCommit ?? ""
    ) ||
    !["CLEAN", "DIRTY"].includes(
      repositoryState?.dirtyTreeStatus
    ) ||
    !Array.isArray(repositoryState?.porcelainV1Entries) ||
    repositoryState.dirtyEntryCount !==
      repositoryState.porcelainV1Entries.length ||
    (repositoryState.dirtyTreeStatus === "DIRTY") !==
      (repositoryState.dirtyEntryCount > 0) ||
    repositoryState.porcelainV1Sha256 !==
      sha256Bytes(
        repositoryState.porcelainV1Entries.join("\n")
      ) ||
    repositoryState.relevantContentDigest !==
      record.sourceEvidenceFingerprint.digest ||
    repositoryState.relevantContentFileCount !==
      record.sourceEvidenceFingerprint.fileCount
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: repository state is invalid"
    );
  }
  const attestation = record.execution?.attestation;
  const preRunCapturedAt = Date.parse(
    attestation?.preRunCapturedAt
  );
  const runnerStartedAt = Date.parse(
    attestation?.runnerStartedAt
  );
  const runnerCompletedAt = Date.parse(
    attestation?.runnerCompletedAt
  );
  const postRunCapturedAt = Date.parse(
    attestation?.postRunCapturedAt
  );
  const expectedInputStateSha256 = sha256Canonical({
    sourceEvidenceFingerprint:
      record.sourceEvidenceFingerprint,
    artifactIdentityCatalog:
      record.artifactIdentityCatalog,
    executionToolchainIdentity:
      record.executionToolchainIdentity,
    repositoryState: record.repositoryState
  });
  const executionSnapshot =
    attestation?.executionSnapshot;
  const expectedSnapshotStateSha256 = sha256Canonical({
    sourceEvidenceFingerprint:
      record.sourceEvidenceFingerprint,
    artifactIdentityCatalog:
      record.artifactIdentityCatalog
  });
  const preRunSnapshotCapturedAt = Date.parse(
    executionSnapshot?.preRunCapturedAt
  );
  const postRunSnapshotCapturedAt = Date.parse(
    executionSnapshot?.postRunCapturedAt
  );
  let isolatedExecutionInputs;
  try {
    isolatedExecutionInputs =
      validateProofExecutionIsolation(
        executionSnapshot?.isolatedExecutionInputs
      );
  } catch {
    isolatedExecutionInputs = null;
  }
  if (
    attestation?.mode !==
      "PRIVATE_COMMITTED_SNAPSHOT_WITH_PRE_RUN_POST_RUN_EQUALITY" ||
    attestation?.inputStateUnchanged !== true ||
    attestation?.inputStateSha256 !==
      expectedInputStateSha256 ||
    !Number.isSafeInteger(
      attestation?.runnerExitStatus
    ) ||
    attestation.runnerExitStatus < 0 ||
    ![
      preRunCapturedAt,
      runnerStartedAt,
      runnerCompletedAt,
      postRunCapturedAt,
      preRunSnapshotCapturedAt,
      postRunSnapshotCapturedAt
    ].every(Number.isFinite) ||
    preRunCapturedAt > runnerStartedAt ||
    preRunCapturedAt > preRunSnapshotCapturedAt ||
    preRunSnapshotCapturedAt > runnerStartedAt ||
    runnerStartedAt > runnerCompletedAt ||
    runnerCompletedAt > postRunSnapshotCapturedAt ||
    postRunSnapshotCapturedAt > postRunCapturedAt ||
    executionSnapshot?.mode !==
      "PRIVATE_DETACHED_COMMITTED_GIT_WORKTREE" ||
    executionSnapshot?.sourceCommit !==
      repositoryState.gitHeadCommit ||
    executionSnapshot
      ?.sourceEvidenceFingerprintDigest !==
      record.sourceEvidenceFingerprint.digest ||
    executionSnapshot
      ?.artifactIdentityCatalogDigest !==
      record.artifactIdentityCatalog.digest ||
    !/^[a-f0-9]{64}$/.test(
      executionSnapshot?.preRunSnapshotStateSha256 ??
        ""
    ) ||
    executionSnapshot?.preRunSnapshotStateSha256 !==
      expectedSnapshotStateSha256 ||
    executionSnapshot?.preRunSnapshotStateSha256 !==
      executionSnapshot?.postRunSnapshotStateSha256 ||
    executionSnapshot?.privatePathRetained !== false ||
    isolatedExecutionInputs === null ||
    isolatedExecutionInputs
      .installedDependencyIdentityDigest !==
      record.executionToolchainIdentity
        .installedDependencies.digest
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: orchestrated pre-run and post-run attestation is invalid"
    );
  }
  const networkEnforcement =
    record.execution?.networkEnforcement;
  const networkEvidence = networkEnforcement?.evidence;
  const networkVerified =
    networkEvidence?.status === "PASSED";
  if (
    typeof networkEnforcement
      ?.processWideNetworkIsolationVerified !==
      "boolean" ||
    ![
      networkEnforcement?.status,
      networkEnforcement?.scope,
      networkEnforcement?.mechanism,
      networkEnforcement?.claim
    ].every(
      (value) =>
        typeof value === "string" && value.trim()
    ) ||
    networkEvidence?.testId !==
      NETWORK_ENFORCEMENT_CONTROL.testId ||
    networkEvidence?.path !==
      NETWORK_ENFORCEMENT_CONTROL.path ||
    networkEvidence?.name !==
      NETWORK_ENFORCEMENT_CONTROL.name ||
    networkEvidence?.manifestPath !==
      NETWORK_ENFORCEMENT_CONTROL.manifestPath ||
    !TEST_RESULT_STATUSES.includes(
      networkEvidence?.status
    ) ||
    networkEnforcement
      .processWideNetworkIsolationVerified !==
      networkVerified ||
    networkEnforcement.status !==
      (networkVerified
        ? "VERIFIED_PROCESS_WIDE_DENY_NETWORK"
        : "PROCESS_WIDE_DENY_NETWORK_NOT_VERIFIED")
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: network enforcement claim is invalid"
    );
  }
  if (
    !["PASSED", "FAILED"].includes(
      record.execution?.status
    ) ||
    typeof record.execution?.vitestSuccess !== "boolean" ||
    record.execution?.runner?.framework !== "Vitest" ||
    typeof record.execution?.runner?.version !== "string" ||
    !record.execution.runner.version.trim() ||
    !/^[a-f0-9]{64}$/.test(
      record.execution?.vitestJsonSha256 ?? ""
    ) ||
    typeof record.execution?.command !== "string" ||
    !record.execution.command.trim() ||
    !record.execution?.platform ||
    !Number.isSafeInteger(
      record.execution?.unmatchedVitestAssertionCount
    ) ||
    record.execution.unmatchedVitestAssertionCount < 0 ||
    ![
      record.execution.platform.operatingSystem,
      record.execution.platform.architecture,
      record.execution.platform.nodeVersion
    ].every(
      (value) =>
        typeof value === "string" && value.trim()
    ) ||
    !Array.isArray(record.tests)
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: execution result is invalid"
    );
  }
  const testIds = new Set();
  for (const result of record.tests) {
    requireString(result.testId, "run record testId");
    requireString(result.path, "run record test path");
    requireString(result.name, "run record test name");
    if (
      !TEST_RESULT_STATUSES.includes(result.status) ||
      testIds.has(result.testId)
    ) {
      throw new Error(
        `PROOF_RUN_RECORD_INVALID: invalid or duplicate result ${result.testId}`
      );
    }
    testIds.add(result.testId);
  }
  const declaredTests = record.tests
    .map((result) => ({
      testId: result.testId,
      path: result.path,
      name: result.name,
      manifestPath: result.manifestPath
    }))
    .sort((left, right) =>
      left.testId.localeCompare(right.testId)
    );
  if (
    record.testCatalogFingerprint !==
      sha256Canonical(declaredTests) ||
    record.sourceEvidenceFingerprint
      .testCatalogFingerprint !==
      record.testCatalogFingerprint
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: test catalog digest mismatch"
    );
  }
  const startedAt = Date.parse(
    record.execution.startedAt
  );
  const completedAt = Date.parse(
    record.execution.completedAt
  );
  if (
    !Number.isFinite(startedAt) ||
    !Number.isFinite(completedAt) ||
    completedAt < startedAt ||
    runnerStartedAt > startedAt ||
    completedAt > runnerCompletedAt ||
    record.execution.durationMs !==
      completedAt - startedAt ||
    record.recordedAt !==
      record.execution.attestation.postRunCapturedAt
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: execution timing is invalid"
    );
  }
  const allPassed = record.tests.every(
    (result) => result.status === "PASSED"
  );
  if (
    (record.execution.status === "PASSED") !==
      (record.execution.attestation.runnerExitStatus ===
        0 &&
        record.execution.vitestSuccess === true &&
        allPassed &&
        networkVerified) ||
    record.execution.declaredTestCount !==
      record.tests.length ||
    record.execution.matchedPassedTestCount !==
      record.tests.filter(
        (result) => result.status === "PASSED"
      ).length ||
    record.execution.requiredControlCount !== 1 ||
    record.execution.matchedPassedControlCount !==
      (networkVerified ? 1 : 0) ||
    canonicalJson(record.execution.resultCounts) !==
      canonicalJson(resultCounts(record.tests))
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: execution summary does not match test results"
    );
  }
  if (
    record.runId !==
      `local-content-${sha256Canonical(
        Object.fromEntries(
          Object.entries(record).filter(
            ([key]) =>
              ![
                "runId",
                "recordedAt",
                "recordContentSha256"
              ].includes(key)
          )
        )
      )}` ||
    record.recordContentSha256 !== recordDigest(record)
  ) {
    throw new Error(
      "PROOF_RUN_RECORD_INVALID: content digest mismatch"
    );
  }
  return record;
}

export function verifyProofExecutionRunRecord({
  record,
  currentFingerprint,
  declarations,
  currentArtifactIdentityCatalog,
  currentExecutionToolchainIdentity
}) {
  if (!record) {
    return {
      status: "NO_RUN_RECORD",
      recordType: null,
      runId: null,
      trustLevel: null,
      runnerIdentityAuthenticated: false,
      testResultsById: new Map()
    };
  }
  validateProofExecutionRunRecord(record);
  if (
    record.sourceEvidenceFingerprint.digest !==
      currentFingerprint.digest ||
    record.sourceEvidenceFingerprint.fileCount !==
      currentFingerprint.fileCount ||
    record.testCatalogFingerprint !==
      currentFingerprint.testCatalogFingerprint
  ) {
    return {
      status: "STALE_SOURCE_FINGERPRINT",
      recordType: record.recordType,
      runId: record.runId,
      trustLevel: "LOCAL_CONTENT_BOUND",
      runnerIdentityAuthenticated: false,
      testResultsById: new Map()
    };
  }
  if (
    currentArtifactIdentityCatalog &&
    (record.artifactIdentityCatalog.digest !==
      currentArtifactIdentityCatalog.digest ||
      record.artifactIdentityCatalog.artifactCount !==
        currentArtifactIdentityCatalog.artifactCount)
  ) {
    return {
      status: "ARTIFACT_CATALOG_MISMATCH",
      recordType: record.recordType,
      runId: record.runId,
      trustLevel: "LOCAL_CONTENT_BOUND",
      runnerIdentityAuthenticated: false,
      testResultsById: new Map()
    };
  }
  if (
    !currentExecutionToolchainIdentity ||
    record.executionToolchainIdentity.digest !==
      currentExecutionToolchainIdentity.digest
  ) {
    return {
      status: "TOOLCHAIN_IDENTITY_MISMATCH",
      recordType: record.recordType,
      runId: record.runId,
      trustLevel: "LOCAL_CONTENT_BOUND",
      runnerIdentityAuthenticated: false,
      testResultsById: new Map()
    };
  }
  const currentById = new Map(
    declarations.map((declaration) => [
      declaration.testId,
      declaration
    ])
  );
  if (
    record.tests.length !== declarations.length ||
    record.tests.some((result) => {
      const declaration = currentById.get(result.testId);
      return (
        !declaration ||
        declaration.path !== result.path ||
        declaration.name !== result.name ||
        declaration.manifestPath !== result.manifestPath
      );
    })
  ) {
    return {
      status: "TEST_CATALOG_MISMATCH",
      recordType: record.recordType,
      runId: record.runId,
      trustLevel: "LOCAL_CONTENT_BOUND",
      runnerIdentityAuthenticated: false,
      testResultsById: new Map()
    };
  }
  const testResultsById = new Map(
    record.tests.map((result) => [
      result.testId,
      result
    ])
  );
  if (record.execution.status !== "PASSED") {
    return {
      status: "RUN_FAILED",
      recordType: record.recordType,
      runId: record.runId,
      trustLevel: "LOCAL_CONTENT_BOUND",
      runnerIdentityAuthenticated: false,
      testResultsById
    };
  }
  return {
    status: "CURRENT_LOCAL_CONTENT_BOUND_PASS",
    recordType: record.recordType,
    runId: record.runId,
    trustLevel: "LOCAL_CONTENT_BOUND",
    runnerIdentityAuthenticated: false,
    testResultsById
  };
}

export async function loadProofExecutionRunRecord(path) {
  const source = await readFile(path, "utf8").catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (source === null) return null;
  let record;
  try {
    record = JSON.parse(source);
  } catch (error) {
    throw new Error(
      `PROOF_RUN_RECORD_INVALID_JSON: ${error.message}`
    );
  }
  return validateProofExecutionRunRecord(record);
}
