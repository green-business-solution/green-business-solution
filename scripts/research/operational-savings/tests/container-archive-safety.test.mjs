import {
  mkdtemp,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test } from "vitest";

import { validateTarArchive } from "../containers/archive-safety.mjs";

const temporaryDirectories = [];
const TAR_BLOCK_SIZE = 512;

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((path) =>
      rm(path, { recursive: true, force: true })
    )
  );
});

function writeTarText(header, offset, length, value) {
  Buffer.from(value).copy(
    header,
    offset,
    0,
    Math.min(length, Buffer.byteLength(value))
  );
}

function writeTarOctal(header, offset, length, value) {
  writeTarText(
    header,
    offset,
    length,
    `${value.toString(8).padStart(length - 1, "0")}\0`
  );
}

function createTarEntry({
  name,
  type = "0",
  linkTarget = "",
  payload = Buffer.alloc(0)
}) {
  const header = Buffer.alloc(TAR_BLOCK_SIZE);
  writeTarText(header, 0, 100, name);
  writeTarOctal(header, 100, 8, 0o644);
  writeTarOctal(header, 108, 8, 0);
  writeTarOctal(header, 116, 8, 0);
  writeTarOctal(header, 124, 12, payload.length);
  writeTarOctal(header, 136, 12, 0);
  header.fill(0x20, 148, 156);
  writeTarText(header, 156, 1, type);
  writeTarText(header, 157, 100, linkTarget);
  writeTarText(header, 257, 6, "ustar\0");
  writeTarText(header, 263, 2, "00");
  const checksum = header.reduce(
    (sum, byte) => sum + byte,
    0
  );
  writeTarText(
    header,
    148,
    8,
    `${checksum.toString(8).padStart(6, "0")}\0 `
  );
  const padding = Buffer.alloc(
    Math.ceil(payload.length / TAR_BLOCK_SIZE) *
      TAR_BLOCK_SIZE -
      payload.length
  );
  return Buffer.concat([header, payload, padding]);
}

function createTar(entries) {
  return Buffer.concat([
    ...entries.map(createTarEntry),
    Buffer.alloc(TAR_BLOCK_SIZE * 2)
  ]);
}

async function writeTemporaryTar(entries) {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-archive-safety-")
  );
  temporaryDirectories.push(directory);
  const path = join(directory, "fixture.tar");
  await writeFile(path, createTar(entries));
  return path;
}

test("accepts safe members and verifies required members", async () => {
  const path = await writeTemporaryTar([
    {
      name: "package/LICENSE",
      payload: Buffer.from("license")
    },
    {
      name: "package/model.bin",
      payload: Buffer.from("model")
    }
  ]);

  await expect(
    validateTarArchive(path, {
      requiredMembers: ["package/LICENSE"]
    })
  ).resolves.toMatchObject({
    status: "VERIFIED_SAFE_ARCHIVE_MEMBERS",
    entryCount: 2,
    requiredMembers: ["package/LICENSE"]
  });
});

test("rejects path traversal and escaping symlinks", async () => {
  const traversalPath = await writeTemporaryTar([
    {
      name: "../outside",
      payload: Buffer.from("unsafe")
    }
  ]);
  const symlinkPath = await writeTemporaryTar([
    {
      name: "package/link",
      type: "2",
      linkTarget: "../../outside"
    }
  ]);

  await expect(
    validateTarArchive(traversalPath)
  ).rejects.toThrow("OFFLINE_REBUILD_ARCHIVE_PATH_ESCAPE");
  await expect(
    validateTarArchive(symlinkPath)
  ).rejects.toThrow("OFFLINE_REBUILD_ARCHIVE_PATH_ESCAPE");
});

test("rejects duplicate and missing required members", async () => {
  const duplicatePath = await writeTemporaryTar([
    {
      name: "package/model.bin",
      payload: Buffer.from("first")
    },
    {
      name: "package/model.bin",
      payload: Buffer.from("second")
    }
  ]);
  const missingPath = await writeTemporaryTar([
    {
      name: "package/model.bin",
      payload: Buffer.from("model")
    }
  ]);

  await expect(
    validateTarArchive(duplicatePath)
  ).rejects.toThrow(
    "OFFLINE_REBUILD_DUPLICATE_ARCHIVE_MEMBER"
  );
  await expect(
    validateTarArchive(missingPath, {
      requiredMembers: ["package/LICENSE"]
    })
  ).rejects.toThrow(
    "OFFLINE_REBUILD_REQUIRED_ARCHIVE_MEMBER_MISSING"
  );
});
