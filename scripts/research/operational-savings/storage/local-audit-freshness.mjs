import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import {
  lstat,
  readdir,
  readlink
} from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  isAbsolute,
  join,
  relative,
  resolve,
  sep
} from "node:path";

export const AUDITED_DIRECTORY_TREE_DIGEST_SCHEMA_VERSION =
  "relative-path-type-mode-size-content-sha256-symlink-target-v1";

export const OPERATIONAL_SAVINGS_TEMP_ENTRY_PREFIXES =
  Object.freeze([
    "gbs-",
    "gbs-baseline-audit.",
    "gbs-operational-savings-",
    "measur-",
    "operational-",
    "os-",
    "os-baseline.",
    "proof-",
    "proof-ledger-",
    "reopt-",
    "retrofi-container-",
    "retrofi-",
    "retrofi-ecr-",
    "retrofi-fema.",
    "retrofi-incomplete-repos.",
    "retrofi-inventory-",
    "retrofi-json-",
    "retrofi-npm-audit-",
    "retrofi-offline-",
    "retrofi-operational-savings-",
    "retrofi-proof-ledger-",
    "retrofi-publication-lock-",
    "retrofi-pvwatts-",
    "retrofi-real-",
    "retrofi-research-",
    "retrofi-scout-",
    "retrofi-source-audit.",
    "retrofi-sqlite-",
    "retrofi-ssc-",
    "retrofi-storage-",
    "scout-",
    "sdge-",
    "ssc-",
    "usurdb-",
    "watersense-",
    "ws-toilet-",
    "ws-urinal-"
  ]);
export const OPERATIONAL_SAVINGS_TEMP_ENTRY_EXCLUSIONS =
  Object.freeze([
    "retrofi-web-enrichment-"
  ]);

function filesystemAuditRecords(audit) {
  return audit.artifactGroups.flatMap((group) => [
    ...(group.childFiles ?? []).map((record) => ({
      kind: "EXACT_FILE",
      path: record.originalPath,
      byteSize: record.byteSize,
      sha256: record.sha256
    })),
    ...(group.directoryEntries ?? []).map((record) => ({
      kind: "DIRECTORY_AGGREGATE",
      path: record.originalPath,
      fileCount: record.fileCount,
      symlinkCount: record.symlinkCount,
      logicalBytes: record.logicalBytes,
      treeDigestSchemaVersion:
        record.treeDigestSchemaVersion,
      fullTreeSha256: record.fullTreeSha256
    }))
  ]).filter(
    (record) =>
      typeof record.path === "string" &&
      isAbsolute(record.path)
  );
}

function recordWithinRoot(record, root) {
  const child = relative(root, resolve(record.path));
  if (
    child === "" ||
    child === ".." ||
    child.startsWith(`..${sep}`)
  ) {
    return null;
  }
  return {
    ...record,
    path: resolve(record.path),
    topLevelName: child.split(sep)[0]
  };
}

function digestRecord(hash, record) {
  hash.update(JSON.stringify(record));
  hash.update("\n");
}

export async function auditedDirectoryTreeIdentity(path) {
  let fileCount = 0;
  let symlinkCount = 0;
  let logicalBytes = 0;
  const leafPaths = [];
  const hash = createHash("sha256");
  const root = resolve(path);

  async function visit(directory, relativeDirectory) {
    const directoryDetails = await lstat(directory);
    if (
      !directoryDetails.isDirectory() ||
      directoryDetails.isSymbolicLink()
    ) {
      throw new Error(
        `AUDITED_DIRECTORY_REQUIRED: ${directory}`
      );
    }
    digestRecord(hash, [
      "DIRECTORY",
      relativeDirectory,
      directoryDetails.mode & 0o7777
    ]);
    const entries = await readdir(directory, {
      withFileTypes: true
    });
    entries.sort((left, right) =>
      left.name.localeCompare(right.name)
    );
    for (const entry of entries) {
      const entryPath = join(directory, entry.name);
      const relativePath = relative(root, entryPath)
        .split(sep)
        .join("/");
      if (entry.isDirectory()) {
        await visit(entryPath, relativePath);
        continue;
      }
      const details = await lstat(entryPath);
      leafPaths.push(resolve(entryPath));
      if (details.isSymbolicLink()) {
        symlinkCount += 1;
        digestRecord(hash, [
          "SYMLINK",
          relativePath,
          await readlink(entryPath)
        ]);
      } else if (details.isFile()) {
        fileCount += 1;
        logicalBytes += details.size;
        digestRecord(hash, [
          "FILE",
          relativePath,
          details.mode & 0o7777,
          details.size,
          await sha256File(entryPath)
        ]);
      } else {
        throw new Error(
          `AUDITED_DIRECTORY_UNSUPPORTED_ENTRY: ${entryPath}`
        );
      }
    }
  }

  await visit(root, "");
  return {
    fileCount,
    symlinkCount,
    logicalBytes,
    leafPaths: leafPaths.sort(),
    treeDigestSchemaVersion:
      AUDITED_DIRECTORY_TREE_DIGEST_SCHEMA_VERSION,
    fullTreeSha256: hash.digest("hex")
  };
}

async function sha256File(path) {
  return await new Promise((resolveHash, rejectHash) => {
    const hash = createHash("sha256");
    const stream = createReadStream(path);
    stream.on("error", rejectHash);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () =>
      resolveHash(hash.digest("hex"))
    );
  });
}

function staleAuditError(details) {
  return new Error(
    `LOCAL_ARTIFACT_AUDIT_STALE: ${JSON.stringify(details)}`
  );
}

export function assertLocalArtifactAuditWorktree({
  audit,
  repoRoot
}) {
  if (
    typeof audit.scope?.worktree !== "string" ||
    resolve(audit.scope.worktree) !== resolve(repoRoot)
  ) {
    throw staleAuditError({
      reason: "AUDIT_WORKTREE_MISMATCH",
      expected: resolve(repoRoot),
      actual: audit.scope?.worktree ?? null
    });
  }
  return resolve(repoRoot);
}

export async function assertLocalArtifactAuditFresh({
  audit,
  roots = ["/private/tmp", tmpdir()],
  prefixes = OPERATIONAL_SAVINGS_TEMP_ENTRY_PREFIXES,
  excludedPrefixes =
    OPERATIONAL_SAVINGS_TEMP_ENTRY_EXCLUSIONS,
  allowMissingRecordedPaths = false
}) {
  const normalizedRoots = [
    ...new Set(
      roots
        .filter((root) => typeof root === "string")
        .map((root) => resolve(root))
    )
  ];
  const auditRecords = filesystemAuditRecords(audit);
  const results = [];

  for (const root of normalizedRoots) {
    let entries;
    try {
      entries = await readdir(root, {
        withFileTypes: true
      });
    } catch (error) {
      if (error.code === "ENOENT") {
        results.push({
          root,
          status: "ROOT_NOT_PRESENT",
          monitoredEntryCount: 0
        });
        continue;
      }
      throw error;
    }

    const records = auditRecords
      .map((record) => recordWithinRoot(record, root))
      .filter(Boolean);
    if (!allowMissingRecordedPaths) {
      const missingRecordedPaths = [];
      for (const record of records) {
        try {
          await lstat(record.path);
        } catch (error) {
          if (error.code === "ENOENT") {
            missingRecordedPaths.push(record.path);
            continue;
          }
          throw error;
        }
      }
      if (missingRecordedPaths.length) {
        throw staleAuditError({
          reason: "RECORDED_PATH_MISSING",
          root,
          paths: [...new Set(missingRecordedPaths)].sort()
        });
      }
    }
    const recordsByTopLevelName = new Map();
    for (const record of records) {
      const existing =
        recordsByTopLevelName.get(record.topLevelName) ?? [];
      existing.push(record);
      recordsByTopLevelName.set(
        record.topLevelName,
        existing
      );
    }
    const monitoredEntries = entries.filter(
      (entry) =>
        recordsByTopLevelName.has(entry.name) ||
        (
          prefixes.some((prefix) =>
            entry.name.startsWith(prefix)
          ) &&
          !excludedPrefixes.some((prefix) =>
            entry.name.startsWith(prefix)
          )
        )
    );
    const unrecordedTopLevelPaths = monitoredEntries
      .filter(
        (entry) => !recordsByTopLevelName.has(entry.name)
      )
      .map((entry) => join(root, entry.name))
      .sort();
    if (unrecordedTopLevelPaths.length) {
      throw staleAuditError({
        reason: "UNRECORDED_MONITORED_TOP_LEVEL_PATH",
        root,
        paths: unrecordedTopLevelPaths
      });
    }

    for (const entry of monitoredEntries) {
      const entryPath = resolve(join(root, entry.name));
      const coveringRecords =
        recordsByTopLevelName.get(entry.name) ?? [];
      const exactRecords = coveringRecords.filter(
        (record) => record.kind === "EXACT_FILE"
      );
      for (const record of exactRecords) {
        let details;
        try {
          details = await lstat(record.path);
        } catch (error) {
          if (
            error.code === "ENOENT" &&
            allowMissingRecordedPaths
          ) {
            continue;
          }
          throw error;
        }
        if (
          !details.isFile() ||
          details.isSymbolicLink() ||
          !Number.isSafeInteger(record.byteSize) ||
          !/^[a-f0-9]{64}$/.test(record.sha256)
        ) {
          throw staleAuditError({
            reason: "AUDITED_EXACT_FILE_INVALID",
            path: record.path
          });
        }
        const actualSha256 = await sha256File(record.path);
        if (
          details.size !== record.byteSize ||
          actualSha256 !== record.sha256
        ) {
          throw staleAuditError({
            reason: "AUDITED_EXACT_FILE_CONTENT_CHANGED",
            path: record.path,
            expected: {
              byteSize: record.byteSize,
              sha256: record.sha256
            },
            observed: {
              byteSize: details.size,
              sha256: actualSha256
            }
          });
        }
      }
      const aggregate = coveringRecords.find(
        (record) =>
          record.kind === "DIRECTORY_AGGREGATE" &&
          record.path === entryPath
      );
      if (aggregate) {
        if (!entry.isDirectory()) {
          throw staleAuditError({
            reason: "AUDITED_DIRECTORY_KIND_CHANGED",
            path: entryPath
          });
        }
        const observed =
          await auditedDirectoryTreeIdentity(entryPath);
        const expected = {
          fileCount: aggregate.fileCount,
          symlinkCount: aggregate.symlinkCount,
          logicalBytes: aggregate.logicalBytes,
          treeDigestSchemaVersion:
            aggregate.treeDigestSchemaVersion,
          fullTreeSha256:
            aggregate.fullTreeSha256
        };
        if (
          observed.fileCount !== expected.fileCount ||
          observed.symlinkCount !== expected.symlinkCount ||
          (
            expected.logicalBytes !== null &&
            observed.logicalBytes !== expected.logicalBytes
          ) ||
          observed.treeDigestSchemaVersion !==
            expected.treeDigestSchemaVersion ||
          observed.fullTreeSha256 !==
            expected.fullTreeSha256
        ) {
          throw staleAuditError({
            reason: "AUDITED_DIRECTORY_CONTENT_CHANGED",
            path: entryPath,
            expected,
            observed: {
              fileCount: observed.fileCount,
              symlinkCount: observed.symlinkCount,
              logicalBytes: observed.logicalBytes,
              treeDigestSchemaVersion:
                observed.treeDigestSchemaVersion,
              fullTreeSha256:
                observed.fullTreeSha256
            }
          });
        }
        continue;
      }

      const exactPaths = new Set(
        exactRecords
          .map((record) => record.path)
      );
      if (entry.isDirectory()) {
        const observed =
          await auditedDirectoryTreeIdentity(entryPath);
        const unrecordedLeafPaths = observed.leafPaths.filter(
          (path) => !exactPaths.has(path)
        );
        if (unrecordedLeafPaths.length) {
          throw staleAuditError({
            reason: "UNRECORDED_FILE_WITHIN_AUDITED_TEMP_TREE",
            path: entryPath,
            paths: unrecordedLeafPaths
          });
        }
      } else if (!exactPaths.has(entryPath)) {
        throw staleAuditError({
          reason: "UNRECORDED_MONITORED_FILE",
          path: entryPath
        });
      }
    }

    results.push({
      root,
      status: "CURRENT",
      monitoredEntryCount: monitoredEntries.length
    });
  }

  return {
    status: "CURRENT",
    roots: results,
    prefixCount: prefixes.length
  };
}
