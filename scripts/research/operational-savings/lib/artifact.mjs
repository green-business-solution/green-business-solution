import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

export async function sha256File(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

export function sha256Json(value) {
  return createHash("sha256")
    .update(JSON.stringify(value))
    .digest("hex");
}

export async function verifyArtifact(path, expected) {
  const details = await stat(path);
  const digest = await sha256File(path);
  if (expected.byteSize !== undefined && details.size !== expected.byteSize) {
    throw new Error(
      `ARTIFACT_SIZE_MISMATCH: expected ${expected.byteSize}, received ${details.size}`
    );
  }
  if (expected.sha256 && digest !== expected.sha256) {
    throw new Error(
      `CORRUPT_CHECKSUM: expected ${expected.sha256}, received ${digest}`
    );
  }
  return {
    path,
    byteSize: details.size,
    sha256: digest
  };
}

export function assertNetworkDisabled() {
  if (process.env.OS_RESEARCH_NETWORK !== "disabled") {
    throw new Error(
      "OFFLINE_GUARD_REQUIRED: set OS_RESEARCH_NETWORK=disabled for normalization, resolution, and formula mapping"
    );
  }
}

export function normalizeIdentifier(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .trim()
    .toLocaleUpperCase("en-US")
    .replaceAll(/[\s\p{P}]+/gu, "");
}

export function buildProvenance({
  standardId,
  artifact,
  sourceVersion,
  sourceFields,
  filters,
  transformation,
  adapterPath
}) {
  const payload = {
    standardId,
    artifactSha256: artifact.sha256,
    artifactByteSize: artifact.byteSize,
    sourceVersion,
    sourceFields,
    filters,
    transformation,
    adapterPath
  };
  return {
    ...payload,
    provenanceSha256: sha256Json(payload)
  };
}
