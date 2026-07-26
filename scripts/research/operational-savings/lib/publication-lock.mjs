import { randomUUID } from "node:crypto";
import {
  mkdir,
  readFile,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import { hostname } from "node:os";
import { resolve } from "node:path";

const LOCK_SCHEMA_VERSION =
  "operational-savings/research-publication-lock-v1";

function publicationLockPath(outputPath) {
  return `${resolve(outputPath)}.research-publication-lock`;
}

function processIsAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error.code === "ESRCH") {
      return false;
    }
    return null;
  }
}

async function readLockOwner(lockPath) {
  try {
    return JSON.parse(
      await readFile(`${lockPath}/owner.json`, "utf8")
    );
  } catch (error) {
    if (
      error.code === "ENOENT" ||
      error instanceof SyntaxError
    ) {
      return null;
    }
    throw error;
  }
}

async function inspectExistingLock(lockPath) {
  const [owner, lockStat] = await Promise.all([
    readLockOwner(lockPath),
    stat(lockPath)
  ]);
  const localHost = hostname();
  const sameHost = owner?.hostname === localHost;
  const ownerProcessAlive =
    sameHost && Number.isSafeInteger(owner?.pid)
      ? processIsAlive(owner.pid)
      : null;
  return {
    lockPath,
    owner,
    sameHost,
    ownerProcessAlive,
    ageMilliseconds: Math.max(
      0,
      Date.now() - lockStat.mtimeMs
    ),
    staleCandidate:
      Boolean(owner) &&
      sameHost &&
      ownerProcessAlive === false
  };
}

function lockError(inspection) {
  const code = inspection.staleCandidate
    ? "PUBLICATION_LOCK_STALE"
    : "PUBLICATION_LOCKED";
  const details = {
    lockPath: inspection.lockPath,
    owner: inspection.owner,
    sameHost: inspection.sameHost,
    ownerProcessAlive: inspection.ownerProcessAlive,
    ageMilliseconds: inspection.ageMilliseconds,
    recovery:
      inspection.staleCandidate
        ? "Inspect this exact lock and its owner record before removing it. Automatic stale-lock deletion is intentionally disabled."
        : "Wait for the recorded publisher to finish. Do not remove a lock owned by a live or unverifiable process."
  };
  return new Error(`${code}: ${JSON.stringify(details)}`);
}

async function releaseLockDirectory(lockPath, lockId) {
  const owner = await readLockOwner(lockPath);
  if (owner?.lockId !== lockId) {
    throw new Error(
      `PUBLICATION_LOCK_OWNERSHIP_LOST: ${JSON.stringify({
        lockPath,
        expectedLockId: lockId,
        observedLockId: owner?.lockId ?? null
      })}`
    );
  }
  await rm(lockPath, { recursive: true, force: false });
}

export async function acquirePublicationLocks(outputPaths) {
  const resolvedOutputPaths = [
    ...new Set(outputPaths.map((path) => resolve(path)))
  ].sort();
  if (!resolvedOutputPaths.length) {
    throw new Error(
      "PUBLICATION_LOCK_OUTPUTS_REQUIRED: at least one output path is required"
    );
  }

  const lockId = randomUUID();
  const acquiredAt = new Date().toISOString();
  const acquired = [];
  try {
    for (const outputPath of resolvedOutputPaths) {
      const lockPath = publicationLockPath(outputPath);
      try {
        await mkdir(lockPath);
      } catch (error) {
        if (error.code !== "EEXIST") {
          throw error;
        }
        throw lockError(
          await inspectExistingLock(lockPath)
        );
      }
      acquired.push(lockPath);
      await writeFile(
        `${lockPath}/owner.json`,
        `${JSON.stringify({
          schemaVersion: LOCK_SCHEMA_VERSION,
          lockId,
          pid: process.pid,
          hostname: hostname(),
          acquiredAt,
          outputPath
        }, null, 2)}\n`,
        {
          encoding: "utf8",
          flag: "wx"
        }
      );
    }
  } catch (error) {
    await Promise.all(
      acquired.reverse().map(async (lockPath) => {
        const owner = await readLockOwner(lockPath);
        if (owner?.lockId === lockId) {
          await rm(lockPath, {
            recursive: true,
            force: false
          });
        }
      })
    );
    throw error;
  }

  let released = false;
  return {
    lockId,
    outputPaths: resolvedOutputPaths,
    lockPaths: [...acquired],
    async release() {
      if (released) {
        return;
      }
      for (const lockPath of [...acquired].reverse()) {
        await releaseLockDirectory(lockPath, lockId);
      }
      released = true;
    }
  };
}

export async function inspectPublicationLock(outputPath) {
  const lockPath = publicationLockPath(outputPath);
  try {
    return await inspectExistingLock(lockPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}
