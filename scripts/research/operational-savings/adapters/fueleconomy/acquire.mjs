import { createWriteStream } from "node:fs";
import { mkdir, rename } from "node:fs/promises";
import { dirname } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

export const OFFICIAL_VEHICLE_BULK_URL =
  "https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip";

export async function acquireFuelEconomyBulk(outputPath) {
  if (process.env.OS_RESEARCH_NETWORK === "disabled") {
    throw new Error("RUNTIME_NETWORK_FORBIDDEN: acquisition cannot run in offline mode");
  }
  await mkdir(dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.partial`;
  const response = await fetch(OFFICIAL_VEHICLE_BULK_URL, {
    headers: {
      "user-agent": "RetroFi operational-savings source research"
    },
    redirect: "follow"
  });
  if (!response.ok || !response.body) {
    throw new Error(`ACQUISITION_FAILED: FuelEconomy.gov returned HTTP ${response.status}`);
  }
  await pipeline(
    Readable.fromWeb(response.body),
    createWriteStream(temporaryPath, { flags: "wx" })
  );
  await rename(temporaryPath, outputPath);
  return outputPath;
}
