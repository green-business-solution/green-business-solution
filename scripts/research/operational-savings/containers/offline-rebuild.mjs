#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { constants, createReadStream } from "node:fs";
import {
  chmod,
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  rm,
  stat,
  utimes,
  writeFile
} from "node:fs/promises";
import { homedir } from "node:os";
import {
  basename,
  dirname,
  isAbsolute,
  relative,
  resolve,
  sep
} from "node:path";
import { fileURLToPath } from "node:url";

import { validateTarArchive } from "./archive-safety.mjs";

const CONTAINERS_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const DEFAULT_REPO_ROOT = resolve(
  CONTAINERS_DIRECTORY,
  "../../../.."
);
const DEFAULT_PLAN_PATH = resolve(
  CONTAINERS_DIRECTORY,
  "offline-rebuild-plan.v1.json"
);
const PLAN_SCHEMA =
  "operational-savings/offline-container-rebuild-plan-v1";
const CONTEXT_LOCK_SCHEMA =
  "operational-savings/offline-container-build-context-lock-v1";
export const CANDIDATE_RECEIPT_SCHEMA =
  "operational-savings/offline-container-candidate-receipt-v1";
const VERIFIED_DURABLE_IMAGE_STATUS =
  "AWS_RESTORE_VERIFIED";
const VERIFIED_DAEMON_EGRESS_STATUS =
  "VERIFIED_DENY_EXTERNAL_EGRESS";
const NORMALIZED_FILE_MODE = 0o444;
const NORMALIZED_FILE_MODE_TEXT = "0444";
const NORMALIZED_MTIME = new Date(0);
const RESERVED_CONTEXT_PATHS = new Set([
  ".dockerignore",
  "offline-candidate-receipt.v1.json",
  "offline-candidate-verification.v1.json",
  "offline-context-lock.v1.json",
  "offline-rebuild-plan.v1.json"
]);

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function assertRelativePath(value, label) {
  if (
    typeof value !== "string" ||
    !value.trim() ||
    isAbsolute(value) ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/u.test(value) ||
    value
      .split("/")
      .some((segment) => segment === ".." || segment === ".")
  ) {
    throw new Error(
      `OFFLINE_REBUILD_INVALID_RELATIVE_PATH: ${label}`
    );
  }
  return value;
}

function resolveRepoPath(repoRoot, value, label) {
  const relativePath = assertRelativePath(value, label);
  const root = resolve(repoRoot);
  const absolutePath = resolve(root, relativePath);
  if (
    absolutePath !== root &&
    !absolutePath.startsWith(`${root}${sep}`)
  ) {
    throw new Error(
      `OFFLINE_REBUILD_PATH_ESCAPE: ${label}`
    );
  }
  return absolutePath;
}

function resolveContextPath(contextRoot, value, label) {
  const relativePath = assertRelativePath(value, label);
  const root = resolve(contextRoot);
  const absolutePath = resolve(root, relativePath);
  if (!absolutePath.startsWith(`${root}${sep}`)) {
    throw new Error(
      `OFFLINE_REBUILD_CONTEXT_PATH_ESCAPE: ${label}`
    );
  }
  return absolutePath;
}

async function assertExistingPathWithin(
  rootPath,
  absolutePath,
  label
) {
  const [rootRealPath, pathRealPath] = await Promise.all([
    realpath(rootPath),
    realpath(absolutePath)
  ]);
  if (
    pathRealPath !== rootRealPath &&
    !pathRealPath.startsWith(`${rootRealPath}${sep}`)
  ) {
    throw new Error(
      `OFFLINE_REBUILD_REALPATH_ESCAPE: ${label}`
    );
  }
  return pathRealPath;
}

async function pathState(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function sha256File(path) {
  return await new Promise((resolveHash, rejectHash) => {
    const hash = createHash("sha256");
    const stream = createReadStream(path);
    stream.on("error", rejectHash);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolveHash(hash.digest("hex")));
  });
}

function sha256Text(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizePackageName(value) {
  return value.toLowerCase().replace(/[-_.]+/g, "-");
}

export function parseHashedRequirements(source) {
  const requirements = [];
  for (const [index, rawLine] of source.split(/\r?\n/).entries()) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const match =
      /^([A-Za-z0-9_.-]+)==([^\s]+)\s+--hash=sha256:([a-f0-9]{64})$/.exec(
        line
      );
    if (!match) {
      throw new Error(
        `OFFLINE_REBUILD_INVALID_REQUIREMENT_LOCK_LINE: ${index + 1}`
      );
    }
    requirements.push({
      name: match[1],
      normalizedName: normalizePackageName(match[1]),
      version: match[2],
      sha256: match[3]
    });
  }
  const identities = new Set();
  const hashes = new Set();
  for (const requirement of requirements) {
    const identity =
      `${requirement.normalizedName}==${requirement.version}`;
    if (identities.has(identity) || hashes.has(requirement.sha256)) {
      throw new Error(
        `OFFLINE_REBUILD_DUPLICATE_REQUIREMENT: ${identity}`
      );
    }
    identities.add(identity);
    hashes.add(requirement.sha256);
  }
  return requirements;
}

function dockerfileInstructions(source) {
  const instructions = [];
  let current = "";
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    current = current ? `${current} ${line}` : line;
    if (current.endsWith("\\")) {
      current = current.slice(0, -1).trimEnd();
      continue;
    }
    instructions.push(current);
    current = "";
  }
  if (current) {
    instructions.push(current);
  }
  return instructions;
}

function parseDockerfileArgument(instruction) {
  const match = /^ARG\s+([A-Za-z_][A-Za-z0-9_]*)(?:=(.*))?$/i.exec(
    instruction
  );
  return match
    ? {
        name: match[1],
        value: match[2] ?? null
      }
    : null;
}

function parseFromInstruction(instruction) {
  const tokens = instruction.trim().split(/\s+/);
  let index = 1;
  while (tokens[index]?.startsWith("--")) {
    index += 1;
  }
  const image = tokens[index] ?? null;
  const asIndex = tokens.findIndex(
    (token, tokenIndex) =>
      tokenIndex > index && token.toUpperCase() === "AS"
  );
  return {
    image,
    options: tokens.slice(1, index),
    alias:
      asIndex !== -1 && tokens[asIndex + 1]
        ? tokens[asIndex + 1].toLowerCase()
        : null
  };
}

function referencedArgument(value) {
  const match = /^\$\{([A-Za-z_][A-Za-z0-9_]*)\}$/.exec(
    value ?? ""
  );
  return match?.[1] ?? null;
}

export function validateOfflineDockerfile(
  source,
  {
    allowedBaseReferences = null,
    allowedBaseArguments = null
  } = {}
) {
  const violations = [];
  const declaredArguments = new Map();
  const stageAliases = new Set();
  let stageCount = 0;
  if (/^\s*#\s*syntax\s*=/im.test(source)) {
    violations.push("EXTERNAL_DOCKERFILE_FRONTEND");
  }
  if (/^\s*#\s*(?:escape|check)\s*=/im.test(source)) {
    violations.push(
      "UNSUPPORTED_DOCKERFILE_PARSER_DIRECTIVE"
    );
  }
  for (const instruction of dockerfileInstructions(source)) {
    const instructionName =
      /^([A-Z]+)/i.exec(instruction)?.[1]?.toUpperCase() ??
      null;
    if (
      ![
        "ADD",
        "ARG",
        "CMD",
        "COPY",
        "ENTRYPOINT",
        "ENV",
        "FROM",
        "LABEL",
        "RUN",
        "USER",
        "WORKDIR"
      ].includes(instructionName)
    ) {
      violations.push("UNSUPPORTED_DOCKERFILE_INSTRUCTION");
      continue;
    }
    if (instructionName === "ARG") {
      const argument = parseDockerfileArgument(instruction);
      if (!argument) {
        violations.push("INVALID_DOCKERFILE_ARGUMENT");
      } else {
        declaredArguments.set(argument.name, argument.value);
        if (
          allowedBaseArguments?.has(argument.name) &&
          argument.value !==
            allowedBaseArguments.get(argument.name)
        ) {
          violations.push("BASE_ARGUMENT_DEFAULT_MISMATCH");
        }
      }
      continue;
    }
    if (instructionName === "FROM") {
      const parsed = parseFromInstruction(instruction);
      if (parsed.options.length > 0) {
        violations.push("FROM_OPTIONS_FORBIDDEN");
      }
      const argumentName = referencedArgument(parsed.image);
      const reference = argumentName
        ? declaredArguments.get(argumentName)
        : parsed.image;
      if (
        reference !== "scratch" &&
        (
          typeof reference !== "string" ||
          !/@sha256:[a-f0-9]{64}$/.test(reference)
        )
      ) {
        violations.push("UNPINNED_FROM");
      }
      if (
        argumentName &&
        allowedBaseArguments &&
        !allowedBaseArguments.has(argumentName)
      ) {
        violations.push("UNRECOGNIZED_BASE_ARGUMENT");
      }
      if (
        reference !== "scratch" &&
        allowedBaseReferences &&
        !allowedBaseReferences.has(reference)
      ) {
        violations.push("UNRECOGNIZED_FROM");
      }
      if (parsed.alias) {
        stageAliases.add(parsed.alias);
      }
      stageCount += 1;
      continue;
    }
    if (instructionName === "ADD") {
      violations.push("ADD_FORBIDDEN");
      continue;
    }
    if (instructionName === "COPY") {
      const fromMatch =
        /(?:^|\s)--from(?:=|\s+)([^\s]+)/i.exec(instruction);
      if (fromMatch) {
        const source = fromMatch[1].toLowerCase();
        const localStage =
          /^\d+$/.test(source)
            ? Number.parseInt(source, 10) < stageCount
            : stageAliases.has(source);
        if (!localStage) {
          violations.push("EXTERNAL_COPY_SOURCE");
        }
      }
      continue;
    }
    if (instructionName !== "RUN") {
      continue;
    }
    const runNetworks = [
      ...instruction.matchAll(
        /(?:^|\s)--network(?:=|\s+)([^\s]+)/gi
      )
    ].map((match) => match[1]);
    if (
      runNetworks.length > 1 ||
      runNetworks.some((network) => network !== "none")
    ) {
      violations.push("RUN_NETWORK_OVERRIDE");
    }
    if (
      /(?:^|\s)--(?:mount|device|security)(?:=|\s+)/i.test(
        instruction
      )
    ) {
      violations.push("RUN_PRIVILEGED_OPTION_FORBIDDEN");
    }
    if (/\bhttps?:\/\//i.test(instruction)) {
      violations.push("RUN_REMOTE_URL_LITERAL");
    }
    if (/\/dev\/tcp\b/i.test(instruction)) {
      violations.push("RUN_SHELL_NETWORK_PRIMITIVE");
    }
    if (/\b(?:curl|wget)\b/i.test(instruction)) {
      violations.push("LIVE_HTTP_CLIENT");
    }
    if (/\bgit\s+(?:clone|fetch|pull)\b/i.test(instruction)) {
      violations.push("LIVE_GIT_OPERATION");
    }
    if (
      /\b(?:apt-get|apt|apk|dnf|yum)\s+(?:update|install|add)\b/i.test(
        instruction
      )
    ) {
      violations.push("LIVE_SYSTEM_PACKAGE_OPERATION");
    }
    if (/\bPkg\.(?:add|instantiate|resolve|update)\b/.test(instruction)) {
      violations.push("LIVE_JULIA_PACKAGE_OPERATION");
    }
    if (
      /\b(?:python(?:3)?\s+-m\s+pip|pip(?:3)?)\s+install\b/i.test(
        instruction
      ) &&
      (
        !/--no-index\b/i.test(instruction) ||
        !/--require-hashes\b/i.test(instruction)
      )
    ) {
      violations.push("PIP_INSTALL_WITHOUT_OFFLINE_HASH_LOCK");
    }
    if (
      /\b(?:python(?:3)?\s+-m\s+pip|pip(?:3)?)\s+download\b/i.test(
        instruction
      )
    ) {
      violations.push("LIVE_PIP_DOWNLOAD");
    }
    if (
      /\b(?:npm|pnpm|yarn)\s+(?:add|install|update)\b/i.test(
        instruction
      ) ||
      /\bcargo\s+(?:install|fetch|update)\b/i.test(instruction) ||
      /\bgo\s+(?:get|install)\b/i.test(instruction)
    ) {
      violations.push("LIVE_LANGUAGE_PACKAGE_OPERATION");
    }
  }
  return [...new Set(violations)].sort();
}

function parseWheelIdentity(filename) {
  if (!filename.endsWith(".whl")) {
    throw new Error(
      `OFFLINE_REBUILD_NON_WHEEL_DEPENDENCY: ${filename}`
    );
  }
  const segments = filename.slice(0, -4).split("-");
  if (segments.length < 5) {
    throw new Error(
      `OFFLINE_REBUILD_INVALID_WHEEL_FILENAME: ${filename}`
    );
  }
  return {
    normalizedName: normalizePackageName(segments[0]),
    version: segments[1]
  };
}

async function inspectPinnedFile({
  repoRoot,
  artifact
}) {
  const declaredPath =
    artifact.cachePath ?? artifact.plannedCachePath;
  const absolutePath = resolveRepoPath(
    repoRoot,
    declaredPath,
    `${artifact.artifactId} cache path`
  );
  const fileState = await pathState(absolutePath);
  const base = {
    artifactId: artifact.artifactId,
    cachePath: artifact.cachePath ?? null,
    plannedCachePath: artifact.plannedCachePath ?? null,
    contextPath: artifact.contextPath,
    buildArgument: artifact.buildArgument ?? null,
    expectedSha256: artifact.sha256,
    expectedSizeBytes: artifact.sizeBytes,
    required: artifact.required === true,
    missingReason: artifact.missingReason ?? null,
    absolutePath
  };
  if (
    typeof artifact.sha256 !== "string" ||
    !/^[a-f0-9]{64}$/.test(artifact.sha256) ||
    !Number.isSafeInteger(artifact.sizeBytes) ||
    artifact.sizeBytes < 0
  ) {
    return {
      ...base,
      exists: fileState !== null,
      status: "MISSING_PINNED_IDENTITY"
    };
  }
  if (fileState === null) {
    return {
      ...base,
      exists: false,
      status: "MISSING_EXACT_ARTIFACT"
    };
  }
  if (!fileState.isFile() || fileState.isSymbolicLink()) {
    return {
      ...base,
      exists: true,
      status: "NOT_A_REGULAR_FILE"
    };
  }
  if (fileState.size !== artifact.sizeBytes) {
    return {
      ...base,
      exists: true,
      actualSizeBytes: fileState.size,
      status: "SIZE_MISMATCH"
    };
  }
  const realPath = await assertExistingPathWithin(
    repoRoot,
    absolutePath,
    `${artifact.artifactId} cache path`
  );
  const actualSha256 = await sha256File(realPath);
  if (actualSha256 !== artifact.sha256) {
    return {
      ...base,
      absolutePath: realPath,
      exists: true,
      actualSizeBytes: fileState.size,
      actualSha256,
      status: "SHA256_MISMATCH"
    };
  }
  let archiveSafety = null;
  if (artifact.archivePolicy) {
    try {
      archiveSafety = await validateTarArchive(realPath, {
        compression: artifact.archivePolicy.compression,
        requiredMembers:
          artifact.archivePolicy.requiredMembers ?? []
      });
    } catch (error) {
      return {
        ...base,
        absolutePath: realPath,
        exists: true,
        actualSizeBytes: fileState.size,
        actualSha256,
        archiveSafety: {
          status: "UNSAFE_ARCHIVE_CONTENTS",
          diagnostic: error.message
        },
        status: "UNSAFE_ARCHIVE_CONTENTS"
      };
    }
  }
  return {
    ...base,
    absolutePath: realPath,
    exists: true,
    actualSizeBytes: fileState.size,
    actualSha256,
    archiveSafety,
    status: "VERIFIED_EXACT_LOCAL_INPUT"
  };
}

async function inspectTrackedFile({
  repoRoot,
  file
}) {
  const absolutePath = resolveRepoPath(
    repoRoot,
    file.sourcePath,
    `${file.sourcePath} source path`
  );
  const fileState = await pathState(absolutePath);
  if (
    fileState === null ||
    !fileState.isFile() ||
    fileState.isSymbolicLink()
  ) {
    return {
      sourcePath: file.sourcePath,
      contextPath: file.contextPath,
      absolutePath,
      status: "MISSING_TRACKED_CONTEXT_FILE"
    };
  }
  const realPath = await assertExistingPathWithin(
    repoRoot,
    absolutePath,
    `${file.sourcePath} source path`
  );
  const sha256 = await sha256File(realPath);
  if (file.contextPath === "Dockerfile") {
    const policyViolations = validateOfflineDockerfile(
      await readFile(realPath, "utf8"),
      file.dockerfilePolicy ?? {}
    );
    if (policyViolations.length > 0) {
      return {
        sourcePath: file.sourcePath,
        contextPath: file.contextPath,
        absolutePath: realPath,
        sizeBytes: fileState.size,
        sha256,
        policyViolations,
        status: "BLOCKED_DOCKERFILE_NETWORK_POLICY"
      };
    }
  }
  return {
    sourcePath: file.sourcePath,
    contextPath: file.contextPath,
    absolutePath: realPath,
    sizeBytes: fileState.size,
    sha256,
    policyViolations: [],
    status: "VERIFIED_CURRENT_TRACKED_INPUT"
  };
}

async function inspectWheelhouse({
  repoRoot,
  wheelhouse
}) {
  if (!wheelhouse) {
    return null;
  }
  const requirementsPath = resolveRepoPath(
    repoRoot,
    wheelhouse.requirementsPath,
    "wheelhouse requirements path"
  );
  const cacheDirectory = resolveRepoPath(
    repoRoot,
    wheelhouse.cacheDirectory,
    "wheelhouse cache directory"
  );
  const lockState = await pathState(requirementsPath);
  const directoryState = await pathState(cacheDirectory);
  if (
    lockState === null ||
    !lockState.isFile() ||
    lockState.isSymbolicLink()
  ) {
    return {
      status: "MISSING_REQUIREMENTS_LOCK",
      requirementsPath,
      cacheDirectory,
      files: []
    };
  }
  if (
    directoryState === null ||
    !directoryState.isDirectory() ||
    directoryState.isSymbolicLink()
  ) {
    return {
      status: "MISSING_WHEELHOUSE",
      requirementsPath,
      cacheDirectory,
      files: []
    };
  }
  const [realRequirementsPath, realCacheDirectory] =
    await Promise.all([
      assertExistingPathWithin(
        repoRoot,
        requirementsPath,
        "wheelhouse requirements path"
      ),
      assertExistingPathWithin(
        repoRoot,
        cacheDirectory,
        "wheelhouse cache directory"
      )
    ]);

  const requirementsSource = await readFile(
    realRequirementsPath,
    "utf8"
  );
  const requirements = parseHashedRequirements(
    requirementsSource
  );
  if (
    requirements.length !== wheelhouse.expectedPackageCount
  ) {
    return {
      status: "REQUIREMENT_COUNT_MISMATCH",
      requirementsPath: realRequirementsPath,
      cacheDirectory: realCacheDirectory,
      expectedPackageCount: wheelhouse.expectedPackageCount,
      actualPackageCount: requirements.length,
      files: []
    };
  }
  const expectedByIdentity = new Map(
    requirements.map((requirement) => [
      `${requirement.normalizedName}==${requirement.version}`,
      requirement
    ])
  );
  const directoryEntries = await readdir(realCacheDirectory, {
    withFileTypes: true
  });
  const files = [];
  for (const entry of directoryEntries) {
    if (!entry.isFile() || entry.isSymbolicLink()) {
      return {
        status: "UNEXPECTED_WHEELHOUSE_ENTRY",
        requirementsPath: realRequirementsPath,
        cacheDirectory: realCacheDirectory,
        unexpectedEntry: entry.name,
        files
      };
    }
    const identity = parseWheelIdentity(entry.name);
    const identityKey =
      `${identity.normalizedName}==${identity.version}`;
    const requirement = expectedByIdentity.get(identityKey);
    if (!requirement) {
      return {
        status: "WHEEL_NOT_IN_REQUIREMENTS_LOCK",
        requirementsPath: realRequirementsPath,
        cacheDirectory: realCacheDirectory,
        unexpectedEntry: entry.name,
        files
      };
    }
    const absolutePath = resolve(realCacheDirectory, entry.name);
    const fileState = await lstat(absolutePath);
    if (!fileState.isFile() || fileState.isSymbolicLink()) {
      return {
        status: "UNEXPECTED_WHEELHOUSE_ENTRY",
        requirementsPath: realRequirementsPath,
        cacheDirectory: realCacheDirectory,
        unexpectedEntry: entry.name,
        files
      };
    }
    const actualSha256 = await sha256File(absolutePath);
    files.push({
      filename: entry.name,
      identity: identityKey,
      absolutePath,
      sizeBytes: fileState.size,
      expectedSha256: requirement.sha256,
      actualSha256,
      status:
        actualSha256 === requirement.sha256
          ? "VERIFIED_EXACT_LOCKED_WHEEL"
          : "WHEEL_SHA256_MISMATCH"
    });
  }
  files.sort((left, right) =>
    compareText(left.filename, right.filename)
  );
  const foundIdentities = new Set(
    files.map((file) => file.identity)
  );
  const missingIdentities = [...expectedByIdentity.keys()]
    .filter((identity) => !foundIdentities.has(identity))
    .sort(compareText);
  const mismatch = files.find(
    (file) =>
      file.status !== "VERIFIED_EXACT_LOCKED_WHEEL"
  );
  const countMatches =
    files.length === wheelhouse.expectedPackageCount;
  let status = "VERIFIED_EXACT_LOCKED_WHEELHOUSE";
  if (mismatch) {
    status = "WHEEL_SHA256_MISMATCH";
  } else if (!countMatches || missingIdentities.length > 0) {
    status = "WHEELHOUSE_COVERAGE_MISMATCH";
  }
  return {
    status,
    requirementsPath: realRequirementsPath,
    requirementsSha256: await sha256File(
      realRequirementsPath
    ),
    cacheDirectory: realCacheDirectory,
    contextDirectory: wheelhouse.contextDirectory,
    expectedPackageCount: wheelhouse.expectedPackageCount,
    actualPackageCount: files.length,
    missingIdentities,
    files
  };
}

function captureProcess(command, args, options = {}) {
  return new Promise((resolveProcess) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on(
      "data",
      (chunk) => (stdout += chunk.toString())
    );
    child.stderr.on(
      "data",
      (chunk) => (stderr += chunk.toString())
    );
    child.on("error", (error) =>
      resolveProcess({
        exitCode: null,
        stdout,
        stderr,
        error: error.message
      })
    );
    child.on("close", (exitCode) =>
      resolveProcess({
        exitCode,
        stdout,
        stderr,
        error: null
      })
    );
  });
}

function executeProcess(command, args, options = {}) {
  return new Promise((resolveProcess, rejectProcess) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      stdio: "inherit"
    });
    child.on("error", rejectProcess);
    child.on("close", (exitCode, signal) =>
      resolveProcess({ exitCode, signal })
    );
  });
}

export async function inspectLocalBaseImage(
  reference,
  { runProcess = captureProcess } = {}
) {
  const result = await runProcess("docker", [
    "image",
    "inspect",
    "--format",
    "{{.Id}}|{{.Architecture}}|{{.Os}}",
    reference
  ]);
  if (result.exitCode !== 0) {
    return {
      reference,
      status: "PINNED_BASE_IMAGE_NOT_LOCAL",
      present: false,
      diagnostic:
        result.error ??
        result.stderr.trim() ??
        "docker image inspect failed"
    };
  }
  const [imageId, architecture, os] =
    result.stdout.trim().split("|");
  if (
    !/^sha256:[a-f0-9]{64}$/.test(imageId) ||
    architecture !== "arm64" ||
    os !== "linux"
  ) {
    return {
      reference,
      status: "PINNED_BASE_IMAGE_PLATFORM_MISMATCH",
      present: true,
      imageId,
      architecture,
      os
    };
  }
  return {
    reference,
    status: "VERIFIED_LOCAL_PINNED_BASE_IMAGE",
    present: true,
    imageId,
    architecture,
    os
  };
}

export async function inspectLocalBuildxBuilder({
  targetPlatform,
  runProcess = captureProcess
}) {
  const [buildersResult, contextResult] = await Promise.all([
    runProcess("docker", [
      "buildx",
      "ls",
      "--format",
      "{{json .}}"
    ]),
    runProcess("docker", ["context", "show"])
  ]);
  if (
    buildersResult.exitCode !== 0 ||
    contextResult.exitCode !== 0
  ) {
    return {
      status: "LOCAL_BUILDER_INSPECTION_FAILED",
      diagnostic:
        buildersResult.error ??
        buildersResult.stderr.trim() ??
        contextResult.error ??
        contextResult.stderr.trim()
    };
  }
  const currentContext = contextResult.stdout.trim();
  const contextInspection = await runProcess("docker", [
    "context",
    "inspect",
    currentContext,
    "--format",
    "{{json .Endpoints.docker.Host}}"
  ]);
  if (contextInspection.exitCode !== 0) {
    return {
      status: "LOCAL_DOCKER_CONTEXT_INSPECTION_FAILED",
      currentContext,
      diagnostic:
        contextInspection.error ??
        contextInspection.stderr.trim()
    };
  }
  let dockerHost;
  try {
    dockerHost = JSON.parse(
      contextInspection.stdout.trim()
    );
  } catch {
    return {
      status: "LOCAL_DOCKER_CONTEXT_INSPECTION_INVALID",
      currentContext
    };
  }
  const builders = new Map();
  try {
    for (const line of buildersResult.stdout
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)) {
      const builder = JSON.parse(line);
      builders.set(builder.Name, builder);
    }
  } catch {
    return {
      status: "LOCAL_BUILDER_INSPECTION_INVALID",
      currentContext
    };
  }
  const currentBuilders = [...builders.values()].filter(
    (builder) => builder.Current === true
  );
  const builder = currentBuilders[0];
  const nodes = builder?.Nodes ?? [];
  const localHost =
    typeof dockerHost === "string" &&
    (
      dockerHost.startsWith("unix://") ||
      dockerHost.startsWith("npipe://")
    );
  if (
    currentBuilders.length !== 1 ||
    builder.Driver !== "docker" ||
    !localHost ||
    nodes.length === 0 ||
    nodes.some(
      (node) =>
        node.Status !== "running" ||
        !node.Platforms?.includes(targetPlatform)
    )
  ) {
    return {
      status: "UNVERIFIED_OR_REMOTE_BUILDX_BUILDER",
      currentContext,
      dockerHost,
      builder: builder ?? null
    };
  }
  const inspection = {
    name: builder.Name,
    driver: builder.Driver,
    currentContext,
    dockerHost,
    nodes: nodes.map((node) => ({
      name: node.Name,
      endpoint: node.Endpoint,
      status: node.Status,
      version: node.Version,
      platforms: [...node.Platforms].sort(compareText)
    }))
  };
  return {
    status: "VERIFIED_LOCAL_DOCKER_BUILDER",
    ...inspection,
    inspectionSha256: sha256Text(
      `${JSON.stringify(inspection)}\n`
    )
  };
}

export async function inspectCandidateImage(
  reference,
  { runProcess = captureProcess } = {}
) {
  const result = await runProcess("docker", [
    "image",
    "inspect",
    "--format",
    "{{json .}}",
    reference
  ]);
  if (result.exitCode !== 0) {
    return {
      status: "CANDIDATE_IMAGE_INSPECTION_FAILED",
      reference,
      diagnostic:
        result.error ??
        result.stderr.trim() ??
        "docker image inspect failed"
    };
  }
  let inspection;
  try {
    inspection = JSON.parse(result.stdout.trim());
  } catch {
    return {
      status: "CANDIDATE_IMAGE_INSPECTION_INVALID",
      reference
    };
  }
  if (
    !/^sha256:[a-f0-9]{64}$/.test(inspection.Id ?? "") ||
    inspection.Os !== "linux" ||
    inspection.Architecture !== "arm64"
  ) {
    return {
      status: "CANDIDATE_IMAGE_IDENTITY_INVALID",
      reference,
      imageId: inspection.Id ?? null,
      os: inspection.Os ?? null,
      architecture: inspection.Architecture ?? null
    };
  }
  return {
    status: "VERIFIED_LOCAL_CANDIDATE_IMAGE",
    reference,
    imageId: inspection.Id,
    os: inspection.Os,
    architecture: inspection.Architecture,
    runtimeUser: inspection.Config?.User ?? null,
    entrypoint: inspection.Config?.Entrypoint ?? null,
    labels: inspection.Config?.Labels ?? {}
  };
}

export async function loadOfflineRebuildPlan({
  planPath = DEFAULT_PLAN_PATH
} = {}) {
  const plan = JSON.parse(await readFile(planPath, "utf8"));
  if (
    plan.schemaVersion !== PLAN_SCHEMA ||
    plan.targetPlatform !== "linux/arm64" ||
    !Array.isArray(plan.models) ||
    !Array.isArray(plan.durableImageDependencies)
  ) {
    throw new Error("OFFLINE_REBUILD_INVALID_PLAN");
  }
  const imageDependencies = new Map();
  for (const dependency of plan.durableImageDependencies) {
    const referenceDigest =
      /@((?:sha256:)[a-f0-9]{64})$/.exec(
        dependency.reference ?? ""
      )?.[1] ?? null;
    if (
      typeof dependency.dependencyId !== "string" ||
      imageDependencies.has(dependency.dependencyId) ||
      !Array.isArray(dependency.roles) ||
      referenceDigest === null ||
      dependency.indexDigest !== referenceDigest ||
      !/^sha256:[a-f0-9]{64}$/.test(
        dependency.arm64ManifestDigest ?? ""
      ) ||
      !["NOT_RECORDED", VERIFIED_DURABLE_IMAGE_STATUS].includes(
        dependency.durableEvidence?.status
      )
    ) {
      throw new Error(
        "OFFLINE_REBUILD_INVALID_IMAGE_DEPENDENCY"
      );
    }
    imageDependencies.set(
      dependency.dependencyId,
      dependency
    );
  }
  if (
    !["NOT_VERIFIED", VERIFIED_DAEMON_EGRESS_STATUS].includes(
      plan.daemonEgressControl?.status
    )
  ) {
    throw new Error(
      "OFFLINE_REBUILD_INVALID_DAEMON_EGRESS_CONTROL"
    );
  }
  const modelIds = new Set();
  for (const model of plan.models) {
    if (
      typeof model.modelId !== "string" ||
      modelIds.has(model.modelId) ||
      !Array.isArray(model.exactArtifacts) ||
      !Array.isArray(model.trackedContextFiles) ||
      !Array.isArray(model.imageDependencyIds) ||
      model.imageDependencyIds.length === 0 ||
      !model.imageDependencyIds.every((dependencyId) =>
        imageDependencies.has(dependencyId)
      ) ||
      typeof model.candidateTag !== "string" ||
      !model.candidateTag.includes("-offline-candidate-") ||
      ![
        "IMPLEMENTED",
        "BLOCKED_PROSPECTIVE_WORKFLOW_NOT_IMPLEMENTED"
      ].includes(model.workflowStatus)
    ) {
      throw new Error("OFFLINE_REBUILD_INVALID_MODEL_PLAN");
    }
    modelIds.add(model.modelId);
    if (
      model.workflowStatus !== "IMPLEMENTED"
    ) {
      continue;
    }
    if (
      typeof model.offlineDockerfilePath !== "string" ||
      typeof model.baseImageArgument !== "string" ||
      typeof model.buildArguments?.[
        model.baseImageArgument
      ] !== "string" ||
      model.buildArguments[model.baseImageArgument] !==
        imageDependencies.get(model.imageDependencyIds[0])
          .reference
    ) {
      throw new Error(
        "OFFLINE_REBUILD_INCONSISTENT_BASE_ARGUMENT"
      );
    }
    const contextPaths = new Map();
    const registerContextPath = (path, label) => {
      assertRelativePath(path, label);
      const normalized = path.toLowerCase();
      if (
        RESERVED_CONTEXT_PATHS.has(normalized) ||
        [...RESERVED_CONTEXT_PATHS].some(
          (reserved) =>
            normalized.startsWith(`${reserved}/`) ||
            reserved.startsWith(`${normalized}/`)
        )
      ) {
        throw new Error(
          `OFFLINE_REBUILD_RESERVED_CONTEXT_PATH: ${path}`
        );
      }
      for (const [existingPath, existingLabel] of contextPaths) {
        if (
          existingPath === normalized ||
          existingPath.startsWith(`${normalized}/`) ||
          normalized.startsWith(`${existingPath}/`)
        ) {
          throw new Error(
            `OFFLINE_REBUILD_DUPLICATE_CONTEXT_PATH: ${label} conflicts with ${existingLabel}`
          );
        }
      }
      contextPaths.set(normalized, label);
    };
    const artifactIds = new Set();
    for (const artifact of model.exactArtifacts) {
      if (
        typeof artifact.artifactId !== "string" ||
        artifactIds.has(artifact.artifactId) ||
        (
          artifact.archivePolicy &&
          (
            artifact.archivePolicy.format !== "tar" ||
            !["none", "gzip"].includes(
              artifact.archivePolicy.compression
            ) ||
            !Array.isArray(
              artifact.archivePolicy.requiredMembers
            )
          )
        )
      ) {
        throw new Error(
          "OFFLINE_REBUILD_INVALID_ARTIFACT_PLAN"
        );
      }
      artifactIds.add(artifact.artifactId);
      registerContextPath(
        artifact.contextPath,
        `${model.modelId} artifact context path`
      );
    }
    for (const file of model.trackedContextFiles) {
      assertRelativePath(
        file.sourcePath,
        `${model.modelId} tracked source path`
      );
      registerContextPath(
        file.contextPath,
        `${model.modelId} tracked context path`
      );
    }
    const dockerfiles = model.trackedContextFiles.filter(
      (file) => file.contextPath === "Dockerfile"
    );
    if (
      dockerfiles.length !== 1 ||
      dockerfiles[0].sourcePath !==
        model.offlineDockerfilePath
    ) {
      throw new Error(
        "OFFLINE_REBUILD_DOCKERFILE_PLAN_MISMATCH"
      );
    }
    if (model.wheelhouse) {
      assertRelativePath(
        model.wheelhouse.cacheDirectory,
        `${model.modelId} wheelhouse cache directory`
      );
      assertRelativePath(
        model.wheelhouse.requirementsPath,
        `${model.modelId} wheelhouse requirements path`
      );
      const wheelContextDirectory = assertRelativePath(
        model.wheelhouse.contextDirectory,
        `${model.modelId} wheelhouse context directory`
      ).toLowerCase();
      for (const [existingPath, existingLabel] of contextPaths) {
        if (
          existingPath === wheelContextDirectory ||
          existingPath.startsWith(
            `${wheelContextDirectory}/`
          ) ||
          wheelContextDirectory.startsWith(
            `${existingPath}/`
          )
        ) {
          throw new Error(
            `OFFLINE_REBUILD_DUPLICATE_CONTEXT_PATH: wheelhouse conflicts with ${existingLabel}`
          );
        }
      }
      if (
        [...RESERVED_CONTEXT_PATHS].some(
          (reserved) =>
            wheelContextDirectory === reserved ||
            wheelContextDirectory.startsWith(
              `${reserved}/`
            ) ||
            reserved.startsWith(
              `${wheelContextDirectory}/`
            )
        )
      ) {
        throw new Error(
          "OFFLINE_REBUILD_RESERVED_WHEEL_CONTEXT_PATH"
        );
      }
    }
  }
  return plan;
}

function selectModel(plan, modelId) {
  const model = plan.models.find(
    (candidate) => candidate.modelId === modelId
  );
  if (!model) {
    throw new Error(
      `OFFLINE_REBUILD_UNKNOWN_MODEL: ${modelId}`
    );
  }
  return model;
}

function selectImageDependencies(plan, model) {
  const byId = new Map(
    plan.durableImageDependencies.map((dependency) => [
      dependency.dependencyId,
      dependency
    ])
  );
  return model.imageDependencyIds.map((dependencyId) => {
    const dependency = byId.get(dependencyId);
    if (!dependency) {
      throw new Error(
        `OFFLINE_REBUILD_UNKNOWN_IMAGE_DEPENDENCY: ${dependencyId}`
      );
    }
    return dependency;
  });
}

function durableEvidenceReady(dependency) {
  const evidence = dependency.durableEvidence;
  if (
    evidence?.status !== VERIFIED_DURABLE_IMAGE_STATUS ||
    ![
      "RESEARCH_S3_OCI_LAYOUT",
      "RESEARCH_ECR_IMAGE"
    ].includes(evidence.storageKind) ||
    typeof evidence.uri !== "string" ||
    typeof evidence.immutableIdentity !== "string" ||
    typeof evidence.verifiedAt !== "string" ||
    typeof evidence.restoreVerifiedAt !== "string" ||
    evidence.restoredReference !== dependency.reference ||
    evidence.restoredManifestDigest !==
      dependency.arm64ManifestDigest
  ) {
    return false;
  }
  if (evidence.storageKind === "RESEARCH_S3_OCI_LAYOUT") {
    return (
      evidence.uri.startsWith("s3://") &&
      /^[a-f0-9]{64}$/.test(evidence.contentSha256 ?? "")
    );
  }
  return (
    /^[0-9]+\.dkr\.ecr\.[a-z0-9-]+\.amazonaws\.com\/[^@]+@sha256:[a-f0-9]{64}$/.test(
      evidence.uri
    ) &&
    /^sha256:[a-f0-9]{64}$/.test(
      evidence.immutableIdentity
    )
  );
}

async function inspectDaemonEgressControl(
  plan,
  repoRoot
) {
  const control = plan.daemonEgressControl;
  if (
    control?.status !== VERIFIED_DAEMON_EGRESS_STATUS
  ) {
    return {
      ...control,
      status: "DAEMON_EGRESS_CONTROL_NOT_VERIFIED"
    };
  }
  if (
    typeof control.evidencePath !== "string" ||
    !/^[a-f0-9]{64}$/.test(
      control.evidenceSha256 ?? ""
    ) ||
    typeof control.verifiedAt !== "string"
  ) {
    return {
      ...control,
      status: "DAEMON_EGRESS_EVIDENCE_INVALID"
    };
  }
  const evidencePath = resolveRepoPath(
    repoRoot,
    control.evidencePath,
    "daemon egress evidence path"
  );
  const evidenceState = await pathState(evidencePath);
  if (
    !evidenceState?.isFile() ||
    evidenceState.isSymbolicLink()
  ) {
    return {
      ...control,
      status: "DAEMON_EGRESS_EVIDENCE_MISSING"
    };
  }
  const realEvidencePath = await assertExistingPathWithin(
    repoRoot,
    evidencePath,
    "daemon egress evidence path"
  );
  const actualSha256 = await sha256File(realEvidencePath);
  return {
    ...control,
    evidencePath: realEvidencePath,
    actualSha256,
    status:
      actualSha256 === control.evidenceSha256
        ? VERIFIED_DAEMON_EGRESS_STATUS
        : "DAEMON_EGRESS_EVIDENCE_SHA256_MISMATCH"
  };
}

export async function inspectOfflineRebuildModel({
  modelId,
  plan,
  repoRoot = DEFAULT_REPO_ROOT,
  checkBaseImage = false,
  inspectBaseImage = inspectLocalBaseImage
}) {
  const model = selectModel(plan, modelId);
  const imageDependencies = selectImageDependencies(
    plan,
    model
  );
  const daemonEgressControl =
    await inspectDaemonEgressControl(plan, repoRoot);
  if (
    model.workflowStatus !== "IMPLEMENTED"
  ) {
    return {
      schemaVersion:
        "operational-savings/offline-container-rebuild-readiness-v1",
      modelId,
      evidenceScope:
        "Prospective rebuild readiness only. This result does not modify or extend historical image evidence.",
      historicalBuildManifestPath:
        model.historicalBuildManifestPath,
      candidateTag: model.candidateTag,
      contextStatus:
        "BLOCKED_PROSPECTIVE_WORKFLOW_NOT_IMPLEMENTED",
      offlineBuildStatus:
        "BLOCKED_PROSPECTIVE_WORKFLOW_NOT_IMPLEMENTED",
      artifacts: [],
      wheelhouse: null,
      trackedFiles: [],
      imageDependencies: imageDependencies.map(
        (dependency) => ({
          ...dependency,
          durableEvidenceReady:
            durableEvidenceReady(dependency),
          localImage: {
            reference: dependency.reference,
            status: "LOCAL_PRESENCE_NOT_CHECKED",
            present: null
          }
        })
      ),
      daemonEgressControl,
      blockedAction: model.blockedAction
    };
  }
  const allowedBaseReferences = new Set(
    imageDependencies.map(
      (dependency) => dependency.reference
    )
  );
  const allowedBaseArguments = new Map([
    [
      model.baseImageArgument,
      model.buildArguments[model.baseImageArgument]
    ]
  ]);
  const artifacts = [];
  for (const artifact of model.exactArtifacts) {
    artifacts.push(
      await inspectPinnedFile({ repoRoot, artifact })
    );
  }
  const trackedFiles = [];
  for (const file of model.trackedContextFiles) {
    trackedFiles.push(
      await inspectTrackedFile({
        repoRoot,
        file:
          file.contextPath === "Dockerfile"
            ? {
                ...file,
                dockerfilePolicy: {
                  allowedBaseReferences,
                  allowedBaseArguments
                }
              }
            : file
      })
    );
  }
  const wheelhouse = await inspectWheelhouse({
    repoRoot,
    wheelhouse: model.wheelhouse
  });
  const missingPinnedIdentity = artifacts.some(
    (artifact) =>
      artifact.required &&
      artifact.status === "MISSING_PINNED_IDENTITY"
  );
  const exactArtifactsReady = artifacts.every(
    (artifact) =>
      artifact.status === "VERIFIED_EXACT_LOCAL_INPUT"
  );
  const trackedFilesReady = trackedFiles.every(
    (file) =>
      file.status === "VERIFIED_CURRENT_TRACKED_INPUT"
  );
  const wheelhouseReady =
    wheelhouse === null ||
    wheelhouse.status ===
      "VERIFIED_EXACT_LOCKED_WHEELHOUSE";
  let contextStatus =
    "VERIFIED_EXACT_CONTEXT_INPUTS_READY";
  if (missingPinnedIdentity) {
    contextStatus =
      "BLOCKED_MISSING_EXACT_DEPENDENCY_ARTIFACT";
  } else if (
    !exactArtifactsReady ||
    !trackedFilesReady ||
    !wheelhouseReady
  ) {
    contextStatus = "BLOCKED_EXACT_INPUT_VALIDATION";
  }
  const inspectedImageDependencies = [];
  for (const dependency of imageDependencies) {
    inspectedImageDependencies.push({
      ...dependency,
      durableEvidenceReady: durableEvidenceReady(dependency),
      localImage: checkBaseImage
        ? await inspectBaseImage(dependency.reference)
        : {
            reference: dependency.reference,
            status: "LOCAL_PRESENCE_NOT_CHECKED",
            present: null
          }
    });
  }
  let offlineBuildStatus = contextStatus;
  if (
    contextStatus ===
    "VERIFIED_EXACT_CONTEXT_INPUTS_READY"
  ) {
    if (
      inspectedImageDependencies.some(
        (dependency) =>
          !dependency.durableEvidenceReady
      )
    ) {
      offlineBuildStatus =
        "BLOCKED_MISSING_AWS_RESTORED_IMAGE_DEPENDENCY";
    } else if (
      daemonEgressControl.status !==
      VERIFIED_DAEMON_EGRESS_STATUS
    ) {
      offlineBuildStatus =
        "BLOCKED_DAEMON_EGRESS_CONTROL_NOT_VERIFIED";
    } else if (!checkBaseImage) {
      offlineBuildStatus =
        "BLOCKED_LOCAL_IMAGE_PRESENCE_NOT_CHECKED";
    } else if (
      inspectedImageDependencies.some(
        (dependency) =>
          dependency.localImage.status !==
          "VERIFIED_LOCAL_PINNED_BASE_IMAGE"
      )
    ) {
      offlineBuildStatus =
        "BLOCKED_PINNED_IMAGE_DEPENDENCY_NOT_LOCAL";
    } else {
      offlineBuildStatus =
        "READY_FOR_DAEMON_EGRESS_DENIED_CANDIDATE_BUILD";
    }
  }
  return {
    schemaVersion:
      "operational-savings/offline-container-rebuild-readiness-v1",
    modelId,
    evidenceScope:
      "Prospective rebuild readiness only. This result does not modify or extend historical image evidence.",
    historicalBuildManifestPath:
      model.historicalBuildManifestPath,
    candidateTag: model.candidateTag,
    contextStatus,
    offlineBuildStatus,
    artifacts,
    wheelhouse,
    trackedFiles,
    imageDependencies: inspectedImageDependencies,
    baseImage:
      inspectedImageDependencies[0]?.localImage ?? null,
    daemonEgressControl,
    runInstructionNetworkPolicy:
      "DEFAULT_NONE_VALIDATED_NO_NON_NONE_OVERRIDE",
    blockedAction: model.blockedAction
  };
}

export async function inspectOfflineRebuilds({
  modelIds,
  plan,
  repoRoot = DEFAULT_REPO_ROOT,
  checkBaseImage = false,
  inspectBaseImage = inspectLocalBaseImage
}) {
  const selectedModelIds =
    modelIds?.length > 0
      ? modelIds
      : plan.models.map((model) => model.modelId);
  const reports = [];
  for (const modelId of selectedModelIds) {
    reports.push(
      await inspectOfflineRebuildModel({
        modelId,
        plan,
        repoRoot,
        checkBaseImage,
        inspectBaseImage
      })
    );
  }
  return reports;
}

async function assertSafeNewContextTarget(
  outputPath,
  repoRoot
) {
  const requestedTarget = resolve(outputPath);
  const [root, userHome, realParent] = await Promise.all([
    realpath(repoRoot),
    realpath(homedir()),
    realpath(dirname(requestedTarget))
  ]);
  const target = resolve(
    realParent,
    basename(requestedTarget)
  );
  if (
    target === resolve("/") ||
    target === root ||
    target === userHome ||
    target.startsWith(`${root}${sep}`) ||
    root.startsWith(`${target}${sep}`) ||
    userHome.startsWith(`${target}${sep}`)
  ) {
    throw new Error(
      "OFFLINE_REBUILD_UNSAFE_CONTEXT_TARGET"
    );
  }
  return target;
}

async function copyLockedInput({
  sourcePath,
  targetPath,
  input
}) {
  await mkdir(dirname(targetPath), {
    recursive: true,
    mode: 0o755
  });
  await copyFile(
    sourcePath,
    targetPath,
    constants.COPYFILE_EXCL
  );
  await chmod(targetPath, NORMALIZED_FILE_MODE);
  await utimes(
    targetPath,
    NORMALIZED_MTIME,
    NORMALIZED_MTIME
  );
  const copiedSha256 = await sha256File(targetPath);
  const copiedState = await lstat(targetPath);
  if (
    !copiedState.isFile() ||
    copiedState.isSymbolicLink() ||
    copiedSha256 !== input.sha256 ||
    copiedState.size !== input.sizeBytes
  ) {
    throw new Error(
      `OFFLINE_REBUILD_CONTEXT_COPY_MISMATCH: ${input.contextPath}`
    );
  }
  return {
    ...input,
    copiedSha256,
    copiedSizeBytes: copiedState.size,
    normalizedMode: NORMALIZED_FILE_MODE_TEXT,
    normalizedMtime:
      NORMALIZED_MTIME.toISOString()
  };
}

async function writeNormalizedContextFile(
  path,
  source
) {
  await writeFile(path, source, {
    encoding: "utf8",
    flag: "wx",
    mode: NORMALIZED_FILE_MODE
  });
  await chmod(path, NORMALIZED_FILE_MODE);
  await utimes(path, NORMALIZED_MTIME, NORMALIZED_MTIME);
}

function buildInputTreeDigest({
  inputs,
  dockerignoreSha256
}) {
  return sha256Text(
    `${JSON.stringify(
      [
        ...inputs.map((input) => ({
          path: input.contextPath,
          sha256: input.sha256,
          sizeBytes: input.sizeBytes,
          mode: input.normalizedMode,
          mtime: input.normalizedMtime
        })),
        {
          path: ".dockerignore",
          sha256: dockerignoreSha256,
          mode: NORMALIZED_FILE_MODE_TEXT,
          mtime: NORMALIZED_MTIME.toISOString()
        }
      ].sort((left, right) =>
        compareText(left.path, right.path)
      ),
      null,
      0
    )}\n`
  );
}

async function walkContextFiles(root, directory = root) {
  const entries = await readdir(directory, {
    withFileTypes: true
  });
  const files = [];
  for (const entry of entries.sort((left, right) =>
    compareText(left.name, right.name)
  )) {
    const absolutePath = resolve(directory, entry.name);
    const contextPath = relative(root, absolutePath);
    const state = await lstat(absolutePath);
    if (state.isSymbolicLink()) {
      throw new Error(
        `OFFLINE_REBUILD_CONTEXT_SYMLINK_FORBIDDEN: ${contextPath}`
      );
    }
    if (state.isDirectory()) {
      files.push(
        ...(await walkContextFiles(root, absolutePath))
      );
    } else if (state.isFile()) {
      files.push({
        contextPath,
        absolutePath,
        sizeBytes: state.size,
        mode: state.mode & 0o777,
        mtimeMs: state.mtimeMs,
        sha256: await sha256File(absolutePath)
      });
    } else {
      throw new Error(
        `OFFLINE_REBUILD_CONTEXT_SPECIAL_FILE_FORBIDDEN: ${contextPath}`
      );
    }
  }
  return files;
}

export async function verifyPreparedContext({
  contextPath,
  contextLock,
  allowedReceiptFiles = []
}) {
  const root = await realpath(contextPath);
  const files = await walkContextFiles(root);
  const byPath = new Map(
    files.map((file) => [file.contextPath, file])
  );
  const expectedPaths = new Set([
    ...contextLock.inputs.map((input) => input.contextPath),
    ".dockerignore",
    "offline-context-lock.v1.json",
    "offline-rebuild-plan.v1.json",
    ...allowedReceiptFiles
  ]);
  for (const file of files) {
    if (!expectedPaths.has(file.contextPath)) {
      throw new Error(
        `OFFLINE_REBUILD_UNEXPECTED_CONTEXT_FILE: ${file.contextPath}`
      );
    }
  }
  for (const expectedPath of expectedPaths) {
    if (!byPath.has(expectedPath)) {
      throw new Error(
        `OFFLINE_REBUILD_CONTEXT_FILE_MISSING: ${expectedPath}`
      );
    }
  }
  for (const input of contextLock.inputs) {
    const file = byPath.get(input.contextPath);
    if (
      file.sha256 !== input.sha256 ||
      file.sizeBytes !== input.sizeBytes ||
      file.mode !== NORMALIZED_FILE_MODE ||
      file.mtimeMs !== 0
    ) {
      throw new Error(
        `OFFLINE_REBUILD_FINAL_CONTEXT_MISMATCH: ${input.contextPath}`
      );
    }
  }
  const dockerignore = byPath.get(".dockerignore");
  const planFile = byPath.get(
    "offline-rebuild-plan.v1.json"
  );
  if (
    dockerignore.sha256 !==
      contextLock.contextMetadata.dockerignoreSha256 ||
    planFile.sha256 !==
      contextLock.contextMetadata.planSha256
  ) {
    throw new Error(
      "OFFLINE_REBUILD_CONTEXT_METADATA_MISMATCH"
    );
  }
  const actualTreeSha256 = buildInputTreeDigest({
    inputs: contextLock.inputs,
    dockerignoreSha256: dockerignore.sha256
  });
  if (
    actualTreeSha256 !==
    contextLock.contextMetadata.dockerBuildInputTreeSha256
  ) {
    throw new Error(
      "OFFLINE_REBUILD_CONTEXT_TREE_DIGEST_MISMATCH"
    );
  }
  const lockSource = await readFile(
    resolve(root, "offline-context-lock.v1.json"),
    "utf8"
  );
  if (
    `${JSON.stringify(JSON.parse(lockSource), null, 2)}\n` !==
    `${JSON.stringify(contextLock, null, 2)}\n`
  ) {
    throw new Error(
      "OFFLINE_REBUILD_CONTEXT_LOCK_FILE_MISMATCH"
    );
  }
  return {
    status: "VERIFIED_FINAL_CONTEXT_TREE",
    dockerBuildInputTreeSha256: actualTreeSha256,
    fileCount: files.length
  };
}

function buildArgumentsFor(model, artifacts) {
  const argumentsMap = {
    ...(model.buildArguments ?? {})
  };
  for (const artifact of artifacts) {
    if (!artifact.buildArgument) {
      continue;
    }
    if (
      artifact.status !== "VERIFIED_EXACT_LOCAL_INPUT"
    ) {
      throw new Error(
        `OFFLINE_REBUILD_BUILD_ARGUMENT_UNVERIFIED: ${artifact.buildArgument}`
      );
    }
    argumentsMap[artifact.buildArgument] =
      artifact.actualSha256;
  }
  return Object.entries(argumentsMap).sort(([left], [right]) =>
    compareText(left, right)
  );
}

export function createRunNetworkNoneBuildCommand({
  model,
  targetPlatform,
  artifacts,
  builderName = null
}) {
  const command = [
    "docker",
    "buildx",
    "build",
    "--platform",
    targetPlatform,
    "--network",
    "none",
    "--no-cache",
    "--pull=false",
    "--provenance=false",
    "--sbom=false",
    "--load",
    "--tag",
    model.candidateTag,
    "--file",
    "Dockerfile"
  ];
  if (builderName) {
    command.push("--builder", builderName);
  }
  for (const [name, value] of buildArgumentsFor(
    model,
    artifacts
  )) {
    command.push("--build-arg", `${name}=${value}`);
  }
  command.push(".");
  return command;
}

function renderShellArgument(value) {
  return /^[A-Za-z0-9_./:=@+-]+$/.test(value)
    ? value
    : `'${value.replaceAll("'", "'\\''")}'`;
}

export function renderShellCommand(command) {
  return command.map(renderShellArgument).join(" ");
}

export async function prepareOfflineBuildContext({
  modelId,
  outputPath,
  plan,
  repoRoot = DEFAULT_REPO_ROOT
}) {
  const model = selectModel(plan, modelId);
  const report = await inspectOfflineRebuildModel({
    modelId,
    plan,
    repoRoot,
    checkBaseImage: false
  });
  if (
    report.contextStatus !==
    "VERIFIED_EXACT_CONTEXT_INPUTS_READY"
  ) {
    throw new Error(
      `OFFLINE_REBUILD_CONTEXT_BLOCKED: ${modelId} ${report.contextStatus}`
    );
  }
  const target = await assertSafeNewContextTarget(
    outputPath,
    repoRoot
  );
  if ((await pathState(target)) !== null) {
    throw new Error(
      `OFFLINE_REBUILD_CONTEXT_TARGET_EXISTS: ${target}`
    );
  }

  let contextCreated = false;
  try {
    await mkdir(target, { mode: 0o700 });
    contextCreated = true;
    const lockedInputs = [];
    for (const artifact of report.artifacts) {
      const input = {
        kind: "EXACT_CACHE_ARTIFACT",
        artifactId: artifact.artifactId,
        sourcePath: relative(
          resolve(repoRoot),
          artifact.absolutePath
        ),
        contextPath: artifact.contextPath,
        sha256: artifact.actualSha256,
        sizeBytes: artifact.actualSizeBytes
      };
      lockedInputs.push(
        await copyLockedInput({
          sourcePath: artifact.absolutePath,
          targetPath: resolveContextPath(
            target,
            artifact.contextPath,
            `${artifact.artifactId} context path`
          ),
          input
        })
      );
    }
    for (const file of report.trackedFiles) {
      const input = {
        kind: "CURRENT_SOURCE_CONTROLLED_INPUT",
        sourcePath: file.sourcePath,
        contextPath: file.contextPath,
        sha256: file.sha256,
        sizeBytes: file.sizeBytes
      };
      lockedInputs.push(
        await copyLockedInput({
          sourcePath: file.absolutePath,
          targetPath: resolveContextPath(
            target,
            file.contextPath,
            `${file.sourcePath} context path`
          ),
          input
        })
      );
    }
    for (const wheel of report.wheelhouse?.files ?? []) {
      const contextPath = `${model.wheelhouse.contextDirectory}/${wheel.filename}`;
      const input = {
        kind: "EXACT_REQUIRE_HASH_LOCKED_WHEEL",
        sourcePath: relative(
          resolve(repoRoot),
          wheel.absolutePath
        ),
        contextPath,
        sha256: wheel.actualSha256,
        sizeBytes: wheel.sizeBytes,
        requirementIdentity: wheel.identity
      };
      lockedInputs.push(
        await copyLockedInput({
          sourcePath: wheel.absolutePath,
          targetPath: resolveContextPath(
            target,
            contextPath,
            `${wheel.filename} context path`
          ),
          input
        })
      );
    }
    lockedInputs.sort((left, right) =>
      compareText(left.contextPath, right.contextPath)
    );
    const buildCommand = createRunNetworkNoneBuildCommand({
      model,
      targetPlatform: plan.targetPlatform,
      artifacts: report.artifacts
    });
    const planSource = `${JSON.stringify(plan, null, 2)}\n`;
    const dockerignoreSource = [
      "*",
      "!Dockerfile",
      "!runner.*",
      "!requirements.lock",
      "!retrofi-storage-spec.json",
      "!inputs/",
      "!inputs/**",
      ""
    ].join("\n");
    const contextPlanPath = resolve(
      target,
      "offline-rebuild-plan.v1.json"
    );
    const dockerignorePath = resolve(target, ".dockerignore");
    await writeNormalizedContextFile(
      contextPlanPath,
      planSource
    );
    await writeNormalizedContextFile(
      dockerignorePath,
      dockerignoreSource
    );
    const planSha256 = await sha256File(contextPlanPath);
    const dockerignoreSha256 =
      await sha256File(dockerignorePath);
    const contextLock = {
      schemaVersion: CONTEXT_LOCK_SCHEMA,
      modelId,
      evidenceScope:
        "Prospective candidate context. It is not historical build evidence and is not associated with an accepted image digest until a new build, verification, publication, and manifest update complete.",
      targetPlatform: plan.targetPlatform,
      candidateTag: model.candidateTag,
      imageDependencies: report.imageDependencies.map(
        (dependency) => ({
          dependencyId: dependency.dependencyId,
          reference: dependency.reference,
          indexDigest: dependency.indexDigest,
          arm64ManifestDigest:
            dependency.arm64ManifestDigest,
          durableEvidence: dependency.durableEvidence,
          status:
            "AWS_RESTORE_AND_LOCAL_PRESENCE_MUST_BE_VERIFIED_BEFORE_BUILD"
        })
      ),
      inputs: lockedInputs,
      contextMetadata: {
        planPath: "offline-rebuild-plan.v1.json",
        planSha256,
        dockerignorePath: ".dockerignore",
        dockerignoreSha256,
        dockerBuildInputTreeSha256:
          buildInputTreeDigest({
            inputs: lockedInputs,
            dockerignoreSha256
          }),
        metadataExcludedFromDockerContext: [
          "offline-candidate-receipt.v1.json",
          "offline-candidate-verification.v1.json",
          "offline-context-lock.v1.json",
          "offline-rebuild-plan.v1.json"
        ]
      },
      buildCommand,
      buildCommandShell: renderShellCommand(buildCommand),
      buildWorkingDirectory: ".",
      networkPolicy: {
        runInstructionDefaultNetwork: "none",
        runInstructionOverrides:
          "VALIDATED_NONE_OR_ABSENT",
        pull: false,
        daemonEgressControl:
          report.daemonEgressControl.status,
        registryAndFrontendResolution:
          "OUTSIDE_RUN_NETWORK_REQUIRES_INDEPENDENT_DAEMON_EGRESS_CONTROL"
      }
    };
    await writeNormalizedContextFile(
      resolve(target, "offline-context-lock.v1.json"),
      `${JSON.stringify(contextLock, null, 2)}\n`
    );
    const contextVerification =
      await verifyPreparedContext({
        contextPath: target,
        contextLock
      });
    return {
      contextPath: target,
      contextLock,
      readiness: report,
      contextVerification
    };
  } catch (error) {
    if (contextCreated) {
      await rm(target, { recursive: true, force: true });
    }
    throw error;
  }
}

export async function buildOfflineCandidate({
  modelId,
  outputPath,
  plan,
  repoRoot = DEFAULT_REPO_ROOT,
  inspectBaseImage = inspectLocalBaseImage,
  inspectBuilder = inspectLocalBuildxBuilder,
  inspectImage = inspectCandidateImage,
  runProcess = executeProcess
}) {
  const model = selectModel(plan, modelId);
  const readiness = await inspectOfflineRebuildModel({
    modelId,
    plan,
    repoRoot,
    checkBaseImage: true,
    inspectBaseImage
  });
  if (
    readiness.offlineBuildStatus !==
    "READY_FOR_DAEMON_EGRESS_DENIED_CANDIDATE_BUILD"
  ) {
    throw new Error(
      `OFFLINE_REBUILD_BUILD_BLOCKED: ${modelId} ${readiness.offlineBuildStatus}`
    );
  }
  const builderInspection = await inspectBuilder({
    targetPlatform: plan.targetPlatform
  });
  if (
    builderInspection.status !==
    "VERIFIED_LOCAL_DOCKER_BUILDER"
  ) {
    throw new Error(
      `OFFLINE_REBUILD_BUILDER_BLOCKED: ${builderInspection.status}`
    );
  }
  const prepared = await prepareOfflineBuildContext({
    modelId,
    outputPath,
    plan,
    repoRoot
  });
  const actualBuildCommand =
    createRunNetworkNoneBuildCommand({
      model,
      targetPlatform: plan.targetPlatform,
      artifacts: prepared.readiness.artifacts,
      builderName: builderInspection.name
    });
  const [
    command,
    ...args
  ] = actualBuildCommand;
  if (
    command !== "docker" ||
    !args.includes("--pull=false") ||
    !args.includes("--provenance=false") ||
    !args.includes("--sbom=false") ||
    !args.includes("--no-cache")
  ) {
    throw new Error(
      "OFFLINE_REBUILD_UNSAFE_GENERATED_BUILD_COMMAND"
    );
  }
  const networkIndex = args.indexOf("--network");
  if (
    networkIndex === -1 ||
    args[networkIndex + 1] !== "none"
  ) {
    throw new Error(
      "OFFLINE_REBUILD_UNSAFE_GENERATED_BUILD_NETWORK"
    );
  }
  const builderIndex = args.indexOf("--builder");
  if (
    builderIndex === -1 ||
    args[builderIndex + 1] !== builderInspection.name
  ) {
    throw new Error(
      "OFFLINE_REBUILD_UNVERIFIED_GENERATED_BUILDER"
    );
  }
  await verifyPreparedContext({
    contextPath: prepared.contextPath,
    contextLock: prepared.contextLock
  });
  const result = await runProcess(command, args, {
    cwd: prepared.contextPath
  });
  if (result.exitCode !== 0) {
    throw new Error(
      `OFFLINE_REBUILD_CANDIDATE_BUILD_FAILED: ${result.exitCode ?? result.signal ?? "unknown"}`
    );
  }
  await verifyPreparedContext({
    contextPath: prepared.contextPath,
    contextLock: prepared.contextLock
  });
  const candidateImage = await inspectImage(
    model.candidateTag
  );
  if (
    candidateImage.status !==
    "VERIFIED_LOCAL_CANDIDATE_IMAGE"
  ) {
    throw new Error(
      `OFFLINE_REBUILD_CANDIDATE_INSPECTION_BLOCKED: ${candidateImage.status}`
    );
  }
  const contextLockPath = resolve(
    prepared.contextPath,
    "offline-context-lock.v1.json"
  );
  const planPath = resolve(
    prepared.contextPath,
    "offline-rebuild-plan.v1.json"
  );
  const receipt = {
    schemaVersion: CANDIDATE_RECEIPT_SCHEMA,
    status:
      "LOCAL_CANDIDATE_BUILT_VERIFICATION_NOT_YET_RECORDED",
    evidenceScope:
      "Prospective candidate evidence only. This receipt does not modify, supersede, or extend the accepted historical build manifest.",
    createdAt: new Date().toISOString(),
    modelId,
    historicalBuildManifestPath:
      model.historicalBuildManifestPath,
    candidate: candidateImage,
    contextLock: {
      path: "offline-context-lock.v1.json",
      sha256: await sha256File(contextLockPath),
      dockerBuildInputTreeSha256:
        prepared.contextLock.contextMetadata
          .dockerBuildInputTreeSha256
    },
    plan: {
      path: "offline-rebuild-plan.v1.json",
      sha256: await sha256File(planPath)
    },
    builderInspection,
    command: actualBuildCommand,
    commandSha256: sha256Text(
      `${JSON.stringify(actualBuildCommand)}\n`
    ),
    networkEvidence: {
      runInstructionDefaultNetwork: "none",
      daemonEgressControl:
        readiness.daemonEgressControl,
      pull: false,
      cacheReuse: false
    },
    historicalEvidenceChanged: false
  };
  const receiptPath = resolve(
    prepared.contextPath,
    "offline-candidate-receipt.v1.json"
  );
  await writeNormalizedContextFile(
    receiptPath,
    `${JSON.stringify(receipt, null, 2)}\n`
  );
  await verifyPreparedContext({
    contextPath: prepared.contextPath,
    contextLock: prepared.contextLock,
    allowedReceiptFiles: [
      "offline-candidate-receipt.v1.json"
    ]
  });
  return {
    ...prepared,
    receiptPath,
    receipt,
    build: {
      status:
        "LOCAL_CANDIDATE_BUILT_VERIFICATION_NOT_YET_RECORDED",
      candidateTag: model.candidateTag,
      imageId: candidateImage.imageId,
      command: actualBuildCommand,
      historicalEvidenceChanged: false
    }
  };
}

function parseCliArguments(argv) {
  const [command = "inspect", ...rest] = argv;
  const result = {
    command,
    modelIds: [],
    outputPath: null,
    receiptPath: null,
    checkBaseImage: true
  };
  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index];
    if (value === "--model") {
      const modelId = rest[index + 1];
      if (!modelId) {
        throw new Error(
          "OFFLINE_REBUILD_MISSING_MODEL_ARGUMENT"
        );
      }
      result.modelIds.push(modelId);
      index += 1;
    } else if (value === "--output") {
      const outputPath = rest[index + 1];
      if (!outputPath) {
        throw new Error(
          "OFFLINE_REBUILD_MISSING_OUTPUT_ARGUMENT"
        );
      }
      result.outputPath = outputPath;
      index += 1;
    } else if (value === "--skip-base-check") {
      result.checkBaseImage = false;
    } else if (value === "--receipt") {
      const receiptPath = rest[index + 1];
      if (!receiptPath) {
        throw new Error(
          "OFFLINE_REBUILD_MISSING_RECEIPT_ARGUMENT"
        );
      }
      result.receiptPath = receiptPath;
      index += 1;
    } else {
      throw new Error(
        `OFFLINE_REBUILD_UNKNOWN_ARGUMENT: ${value}`
      );
    }
  }
  return result;
}

function usage() {
  return [
    "Usage:",
    "  node scripts/research/operational-savings/containers/offline-rebuild.mjs inspect [--model reopt|ssc|scout|measur] [--skip-base-check]",
    "  node scripts/research/operational-savings/containers/offline-rebuild.mjs prepare --model scout --output /new/context/path",
    "  node scripts/research/operational-savings/containers/offline-rebuild.mjs build --model scout --output /new/context/path",
    "  node scripts/research/operational-savings/containers/offline-rebuild.mjs verify-candidate --receipt /context/offline-candidate-receipt.v1.json",
    "",
    "inspect is read-only and fails closed when an exact required input or pinned local base image is unavailable.",
    "prepare writes a new immutable candidate context only after every non-base context input validates.",
    "build requires AWS-restored image evidence, independent daemon-egress evidence, exact local images, and a verified local Docker builder before it invokes Docker.",
    "The guarded build sets RUN networking to none, disables pulls and cache reuse, and uses a candidate-only tag.",
    "verify-candidate executes the current checksum-bound verifier against a temporary candidate-manifest overlay and writes separate prospective verification evidence.",
    ""
  ].join("\n");
}

async function main() {
  const options = parseCliArguments(process.argv.slice(2));
  if (options.command === "--help" || options.command === "help") {
    process.stdout.write(usage());
    return;
  }
  const plan = await loadOfflineRebuildPlan();
  if (options.command === "inspect") {
    const reports = await inspectOfflineRebuilds({
      modelIds: options.modelIds,
      plan,
      checkBaseImage: options.checkBaseImage
    });
    process.stdout.write(
      `${JSON.stringify(reports, null, 2)}\n`
    );
    if (
      reports.some(
        (report) =>
          report.offlineBuildStatus !==
          "READY_FOR_DAEMON_EGRESS_DENIED_CANDIDATE_BUILD"
      )
    ) {
      process.exitCode = 2;
    }
    return;
  }
  if (options.command === "prepare") {
    if (
      options.modelIds.length !== 1 ||
      !options.outputPath
    ) {
      throw new Error(
        "OFFLINE_REBUILD_PREPARE_REQUIRES_ONE_MODEL_AND_OUTPUT"
      );
    }
    const result = await prepareOfflineBuildContext({
      modelId: options.modelIds[0],
      outputPath: options.outputPath,
      plan
    });
    process.stdout.write(
      `${JSON.stringify(
        {
          contextPath: result.contextPath,
          modelId: result.contextLock.modelId,
          inputCount: result.contextLock.inputs.length,
          prospectiveBuildCommand:
            result.contextLock.buildCommandShell,
          nextAction:
            "Preload the exact base image, then use this CLI's guarded build command from a new context path. Do not run the prospective command directly or update accepted image evidence before verification."
        },
        null,
        2
      )}\n`
    );
    return;
  }
  if (options.command === "build") {
    if (
      options.modelIds.length !== 1 ||
      !options.outputPath
    ) {
      throw new Error(
        "OFFLINE_REBUILD_BUILD_REQUIRES_ONE_MODEL_AND_OUTPUT"
      );
    }
    const result = await buildOfflineCandidate({
      modelId: options.modelIds[0],
      outputPath: options.outputPath,
      plan
    });
    process.stdout.write(
      `${JSON.stringify(
        {
          contextPath: result.contextPath,
          modelId: result.contextLock.modelId,
          candidateTag: result.build.candidateTag,
          candidateImageId: result.build.imageId,
          receiptPath: result.receiptPath,
          status: result.build.status,
          nextAction:
            `Run this CLI's verify-candidate command with --receipt ${result.receiptPath}. Record a new digest and update evidence only after the candidate passes and is published by the authorized root workflow.`
        },
        null,
        2
      )}\n`
    );
    return;
  }
  if (options.command === "verify-candidate") {
    if (
      !options.receiptPath ||
      options.modelIds.length > 0 ||
      options.outputPath
    ) {
      throw new Error(
        "OFFLINE_REBUILD_VERIFY_CANDIDATE_REQUIRES_RECEIPT"
      );
    }
    const { verifyOfflineCandidateReceipt } =
      await import("./offline-candidate-verifier.mjs");
    const result = await verifyOfflineCandidateReceipt({
      receiptPath: options.receiptPath,
      repoRoot: DEFAULT_REPO_ROOT
    });
    process.stdout.write(
      `${JSON.stringify(
        {
          status: result.verification.status,
          modelId: result.verification.modelId,
          candidateImageId:
            result.verification.candidate.imageId,
          verificationPath: result.verificationPath,
          historicalEvidenceChanged: false,
          nextAction:
            "Publish only through the authorized research ECR workflow, verify the exact digest, and create new accepted evidence in a separate reviewed change."
        },
        null,
        2
      )}\n`
    );
    return;
  }
  throw new Error(
    `OFFLINE_REBUILD_UNKNOWN_COMMAND: ${options.command}`
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
