import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const USNO_REFERENCE_URL =
  "https://aa.usno.navy.mil/api/rstt/oneday?date=2026-06-21&coords=37.7749,-122.4194&tz=-8&dst=true";

export async function acquireUsnoReference(outputPath) {
  if (process.env.OS_RESEARCH_NETWORK === "disabled") {
    throw new Error("RUNTIME_NETWORK_FORBIDDEN: USNO acquisition cannot run offline");
  }
  const response = await fetch(USNO_REFERENCE_URL, {
    headers: {
      "user-agent": "RetroFi operational-savings source research"
    }
  });
  if (!response.ok) {
    throw new Error(`ACQUISITION_FAILED: USNO returned HTTP ${response.status}`);
  }
  const payload = await response.json();
  if (payload.error) {
    throw new Error(`ACQUISITION_FAILED: USNO ${payload.error}`);
  }
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return outputPath;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const outputPath = process.argv[2];
  if (!outputPath) {
    throw new Error("Usage: node acquire.mjs <output-path>");
  }
  await acquireUsnoReference(outputPath);
}
