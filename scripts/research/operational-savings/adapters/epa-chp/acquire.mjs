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

export const EPA_BIOMASS_CHP_CATALOG_URL =
  "https://www.epa.gov/sites/default/files/2015-07/documents/biomass_combined_heat_and_power_catalog_of_technologies_v.1.1.pdf";

const adapterRoot = fileURLToPath(new URL("./", import.meta.url));
const defaultArtifactPath = resolve(
  adapterRoot,
  "../../.cache/artifacts/epa-biomass-chp-catalog-v1.1.pdf"
);

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
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
    return "ALREADY_PRESENT";
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
  return "ACQUIRED";
}

export async function acquireEpaBiomassChpCatalog({
  artifactPath = defaultArtifactPath,
  fetchImplementation = fetch
} = {}) {
  const response = await fetchImplementation(
    EPA_BIOMASS_CHP_CATALOG_URL,
    {
      redirect: "follow",
      headers: {
        accept: "application/pdf",
        "user-agent":
          "RetroFi operational-savings research acquisition"
      }
    }
  );
  if (!response.ok) {
    throw new Error(
      `SOURCE_ACQUISITION_FAILED: ${response.status} ${EPA_BIOMASS_CHP_CATALOG_URL}`
    );
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (
    bytes.byteLength < 1_000_000 ||
    bytes.subarray(0, 5).toString("ascii") !== "%PDF-"
  ) {
    throw new Error(
      "SOURCE_ARTIFACT_INVALID: EPA biomass catalog is not the expected PDF"
    );
  }
  const publication = await publishImmutable(artifactPath, bytes);
  return {
    path: artifactPath,
    publication,
    byteSize: bytes.byteLength,
    sha256: sha256(bytes),
    sourceUrl: EPA_BIOMASS_CHP_CATALOG_URL,
    acquiredAt: new Date().toISOString()
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const result = await acquireEpaBiomassChpCatalog();
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}
