import { createWriteStream } from "node:fs";
import { mkdir, rename, rm } from "node:fs/promises";
import { dirname } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

export const OFFICIAL_TARIFF_ARTIFACTS = Object.freeze({
  urdb: {
    url: "https://openei.org/apps/USURDB/download/usurdb.csv.gz",
    fileName: "usurdb.csv.gz"
  },
  sdgePublication: {
    url: "https://www.sdge.com/sites/default/files/regulatory/Summary%20Table%20for%20Small%20Comm%206-1-26.pdf",
    fileName: "sdge-small-commercial-rates-2026-06-01.pdf"
  },
  jointComparison: {
    url: "https://sdge.com/sites/default/files/SDCP_SDGE_JRC_06.01.2026_Final.pdf",
    fileName: "sdge-sdcp-joint-rate-comparison-2026-06-01.pdf"
  }
});

async function downloadAtomic(url, outputPath) {
  if (process.env.OS_RESEARCH_NETWORK === "disabled") {
    throw new Error(
      "RUNTIME_NETWORK_FORBIDDEN: acquisition cannot run in offline mode"
    );
  }
  await mkdir(dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.partial`;
  await rm(temporaryPath, { force: true });
  const response = await fetch(url, {
    headers: {
      "user-agent": "RetroFi operational-savings source research"
    },
    redirect: "follow"
  });
  if (!response.ok || !response.body) {
    throw new Error(
      `ACQUISITION_FAILED: ${url} returned HTTP ${response.status}`
    );
  }
  try {
    await pipeline(
      Readable.fromWeb(response.body),
      createWriteStream(temporaryPath, { flags: "wx" })
    );
    await rename(temporaryPath, outputPath);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
  return outputPath;
}

export async function acquireIntervalTariffArtifacts(outputDirectory) {
  const acquired = {};
  for (const [key, artifact] of Object.entries(
    OFFICIAL_TARIFF_ARTIFACTS
  )) {
    acquired[key] = await downloadAtomic(
      artifact.url,
      `${outputDirectory}/${artifact.fileName}`
    );
  }
  return acquired;
}
