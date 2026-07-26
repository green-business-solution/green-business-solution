import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test } from "vitest";

import {
  acquirePublicationLocks,
  inspectPublicationLock
} from "../lib/publication-lock.mjs";

const temporaryRoots = [];

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((path) =>
      rm(path, { recursive: true, force: true })
    )
  );
});

async function makeTemporaryRoot() {
  const root = await mkdtemp(
    join(tmpdir(), "retrofi-publication-lock-")
  );
  temporaryRoots.push(root);
  return root;
}

test("serializes publishers that share any output path", async () => {
  const root = await makeTemporaryRoot();
  const databasePath = join(root, "research.sqlite");
  const compactExportPath = join(root, "research.compact.json");
  const receiptPath = join(root, "publication.json");
  const first = await acquirePublicationLocks([
    databasePath,
    compactExportPath,
    receiptPath
  ]);

  await expect(
    acquirePublicationLocks([
      join(root, "other.sqlite"),
      compactExportPath,
      join(root, "other-publication.json")
    ])
  ).rejects.toThrow(/PUBLICATION_LOCKED/);
  await expect(
    inspectPublicationLock(compactExportPath)
  ).resolves.toMatchObject({
    owner: {
      lockId: first.lockId,
      pid: process.pid,
      outputPath: compactExportPath
    },
    sameHost: true,
    ownerProcessAlive: true,
    staleCandidate: false
  });

  await first.release();
  await expect(
    inspectPublicationLock(compactExportPath)
  ).resolves.toBeNull();

  const second = await acquirePublicationLocks([
    databasePath,
    compactExportPath,
    receiptPath
  ]);
  await second.release();
});

test("release is idempotent", async () => {
  const root = await makeTemporaryRoot();
  const lock = await acquirePublicationLocks([
    join(root, "research.sqlite")
  ]);
  await lock.release();
  await expect(lock.release()).resolves.toBeUndefined();
});
