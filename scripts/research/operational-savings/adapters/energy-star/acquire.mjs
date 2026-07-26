#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto";
import {
  mkdir,
  open,
  readFile,
  rename,
  rm
} from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ENERGY_STAR_DISHWASHER_BULK_URL =
  "https://data.energystar.gov/resource/pk8q-dim8.json?$limit=50000&$order=pd_id";
export const ENERGY_STAR_DISHWASHER_METADATA_URL =
  "https://data.energystar.gov/api/views/pk8q-dim8";

const adapterRoot = fileURLToPath(new URL("./", import.meta.url));
const defaultArtifactRoot = resolve(
  adapterRoot,
  "../../.cache/artifacts"
);

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function fetchBytes(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      accept: "application/json",
      "user-agent": "RetroFi operational-savings research acquisition"
    }
  });
  if (!response.ok) {
    throw new Error(
      `SOURCE_ACQUISITION_FAILED: ${response.status} ${url}`
    );
  }
  return Buffer.from(await response.arrayBuffer());
}

async function publishImmutable(path, bytes) {
  const existing = await readFile(path).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (existing !== null) {
    if (!existing.equals(bytes)) {
      throw new Error(
        `IMMUTABLE_SNAPSHOT_CONFLICT: ${path} already contains different bytes`
      );
    }
    return;
  }
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.${randomUUID()}.tmp`;
  let handle;
  try {
    handle = await open(temporaryPath, "wx", 0o600);
    await handle.writeFile(bytes);
    await handle.sync();
    await handle.close();
    handle = undefined;
    await rename(temporaryPath, path);
  } finally {
    await handle?.close();
    await rm(temporaryPath, { force: true });
  }
}

export async function acquireEnergyStarDishwashers({
  artifactRoot = defaultArtifactRoot
} = {}) {
  const [recordsBytes, metadataBytes] = await Promise.all([
    fetchBytes(ENERGY_STAR_DISHWASHER_BULK_URL),
    fetchBytes(ENERGY_STAR_DISHWASHER_METADATA_URL)
  ]);
  const records = JSON.parse(recordsBytes.toString("utf8"));
  const metadata = JSON.parse(metadataBytes.toString("utf8"));
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error(
      "EMPTY_SOURCE_ARTIFACT: ENERGY STAR bulk response"
    );
  }
  const pdIds = records.map((record) => record.pd_id);
  if (
    pdIds.some((pdId) => typeof pdId !== "string" || !pdId) ||
    new Set(pdIds).size !== pdIds.length
  ) {
    throw new Error(
      "SOURCE_IDENTITY_INVALID: pd_id values must be unique nonempty strings"
    );
  }
  const sortedPdIds = [...pdIds].sort((left, right) =>
    left.localeCompare(right, "en-US", { numeric: true })
  );
  if (
    JSON.stringify(pdIds) !== JSON.stringify(sortedPdIds)
  ) {
    throw new Error(
      "SOURCE_ORDER_INVALID: bulk response is not ordered by pd_id"
    );
  }
  if (
    metadata.id !== "pk8q-dim8" ||
    metadata.name !==
      "ENERGY STAR Certified Commercial Dishwashers"
  ) {
    throw new Error(
      "SOURCE_METADATA_DRIFT: unexpected ENERGY STAR dataset identity"
    );
  }

  const recordsPath = resolve(
    artifactRoot,
    "energy-star-commercial-dishwashers-full.json"
  );
  const metadataPath = resolve(
    artifactRoot,
    "energy-star-commercial-dishwashers-metadata.json"
  );
  await Promise.all([
    publishImmutable(recordsPath, recordsBytes),
    publishImmutable(metadataPath, metadataBytes)
  ]);
  return {
    records: {
      path: recordsPath,
      byteSize: recordsBytes.byteLength,
      sha256: sha256(recordsBytes),
      rowCount: records.length,
      sourceUrl: ENERGY_STAR_DISHWASHER_BULK_URL
    },
    metadata: {
      path: metadataPath,
      byteSize: metadataBytes.byteLength,
      sha256: sha256(metadataBytes),
      rowsUpdatedAt: new Date(
        metadata.rowsUpdatedAt * 1000
      ).toISOString(),
      sourceUrl: ENERGY_STAR_DISHWASHER_METADATA_URL
    }
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const result = await acquireEnergyStarDishwashers();
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}
