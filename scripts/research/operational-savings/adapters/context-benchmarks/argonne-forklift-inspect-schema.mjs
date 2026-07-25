import { readFile } from "node:fs/promises";

import parsePdf from "pdf-parse";

import { sha256Json } from "../../lib/artifact.mjs";

const TITLE =
  "Full Fuel-Cycle Comparison of Forklift Propulsion Systems";
const COMPARISON_TEXT =
  "The report included a side-by-side cost table for electric and propane forklifts, each with a capacity of 5,000 lb.";
const INTENSITY_TEXT =
  "The electric forklift is reported to incur a cost $0.58/h for electricity, at $0.077/kWh (7.5 kWh/h), and the ICE a propane cost of $1.50/h for fuel, at $1.09/gal (1.38 gal/h).";

function normalizePdfText(value) {
  return value
    .normalize("NFKC")
    .replaceAll(/\s+/g, " ")
    .trim();
}

export function schemaFromArgonneForkliftPdf(parsed) {
  if (
    parsed.numpages !== 40 ||
    parsed.info?.Title !== TITLE
  ) {
    throw new Error(
      "ARGONNE_FORKLIFT_SOURCE_SCHEMA_DRIFT: PDF identity"
    );
  }
  const text = normalizePdfText(parsed.text);
  for (const [label, expected] of [
    ["side-by-side capacity statement", COMPARISON_TEXT],
    ["paired hourly intensity statement", INTENSITY_TEXT]
  ]) {
    if (!text.includes(expected)) {
      throw new Error(
        `ARGONNE_FORKLIFT_SOURCE_SCHEMA_DRIFT: missing ${label}`
      );
    }
  }
  const observed = {
    format: "PDF native paragraph",
    title: TITLE,
    pageCount: parsed.numpages,
    comparison: {
      sourceStudy: "EPRI report for Alabama Power",
      relationship: "side-by-side cost table",
      ratedCapacityLb: 5_000,
      existingPropulsion: "PROPANE",
      proposedPropulsion: "BATTERY_ELECTRIC",
      comparableDutyRequired: true
    },
    fields: [
      {
        name: "propane_fuel_per_hour",
        value: 1.38,
        unit: "gallons/hour"
      },
      {
        name: "wall_electricity_per_hour",
        value: 7.5,
        unit: "kWh/hour"
      }
    ],
    limitations: [
      "The report says forklift usage varies.",
      "The paired intensities are not a universal class default."
    ]
  };
  return {
    observed,
    fingerprintSha256: sha256Json(observed),
    ratedCapacityLb: 5_000,
    propaneGallonsPerHour: 1.38,
    wallElectricityKwhPerHour: 7.5
  };
}

export async function inspectArgonneForkliftSchema(
  artifactPath
) {
  return schemaFromArgonneForkliftPdf(
    await parsePdf(await readFile(artifactPath))
  );
}
