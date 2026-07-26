import { readFile } from "node:fs/promises";

import parsePdf from "pdf-parse";

import { sha256Json } from "../../lib/artifact.mjs";

const TOILET_TITLE =
  "WaterSense at Work Section 3.1: Toilets (Water Closets)";
const URINAL_TITLE = "WaterSense at Work 3.2 Urinals";
const TOILET_ACTIVITY_TEXT =
  "Female building occupants use the toilet three times per day on average, while male building occupants use the toilet once per day on average.";
const URINAL_ACTIVITY_TEXT =
  "Male building occupants use the urinal two times per day on average.";
const TOILET_EQUATION_TEXT =
  "Equation 2. Water Use of Toilet (gallons or liters per year) = Toilet Flush Volume x Number of Flushes x Days of Facility Operation";
const URINAL_EQUATION_TEXT =
  "Equation 2. Water Use of Urinal (gallons or liters per year) = Urinal Flush Volume x Number of Flushes x Days of Facility Operation";

function normalizePdfText(value) {
  return value
    .normalize("NFKC")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function requireText(text, expected, label) {
  if (!text.includes(expected)) {
    throw new Error(
      `WATERSENSE_FLUSH_SOURCE_SCHEMA_DRIFT: missing ${label}`
    );
  }
}

export function schemaFromWaterSenseFlushPdfs({
  toilet,
  urinal
}) {
  if (
    toilet.numpages !== 14 ||
    toilet.info?.Title !== TOILET_TITLE
  ) {
    throw new Error(
      "WATERSENSE_FLUSH_SOURCE_SCHEMA_DRIFT: toilet PDF identity"
    );
  }
  if (
    urinal.numpages !== 10 ||
    urinal.info?.Title !== URINAL_TITLE
  ) {
    throw new Error(
      "WATERSENSE_FLUSH_SOURCE_SCHEMA_DRIFT: urinal PDF identity"
    );
  }
  const toiletText = normalizePdfText(toilet.text);
  const urinalText = normalizePdfText(urinal.text);
  requireText(
    toiletText,
    TOILET_ACTIVITY_TEXT,
    "toilet sex-specific daily activity assumptions"
  );
  requireText(
    toiletText,
    TOILET_EQUATION_TEXT,
    "toilet annual water-use equation"
  );
  requireText(
    urinalText,
    URINAL_ACTIVITY_TEXT,
    "urinal daily activity assumption"
  );
  requireText(
    urinalText,
    URINAL_EQUATION_TEXT,
    "urinal annual water-use equation"
  );
  const observed = {
    format: "PDF native text and equations",
    documents: [
      {
        section: "3.1",
        title: TOILET_TITLE,
        pageCount: toilet.numpages,
        fields: [
          {
            name:
              "female_toilet_flushes_per_person_per_operating_day",
            value: 3,
            unit: "flushes/(person operating day)"
          },
          {
            name:
              "male_toilet_flushes_per_person_per_operating_day",
            value: 1,
            unit: "flushes/(person operating day)"
          }
        ],
        equation: TOILET_EQUATION_TEXT
      },
      {
        section: "3.2",
        title: URINAL_TITLE,
        pageCount: urinal.numpages,
        fields: [
          {
            name:
              "male_urinal_flushes_per_person_per_operating_day",
            value: 2,
            unit: "flushes/(person operating day)"
          }
        ],
        equation: URINAL_EQUATION_TEXT
      }
    ],
    annualizationInput: {
      name: "days_of_facility_operation",
      unit: "days/year",
      sourceRole: "project input"
    }
  };
  return {
    observed,
    fingerprintSha256: sha256Json(observed),
    assumptions: {
      femaleToiletFlushesPerOperatingDay: 3,
      maleToiletFlushesPerOperatingDay: 1,
      maleUrinalFlushesPerOperatingDay: 2
    }
  };
}

export async function inspectWaterSenseFlushSchemas({
  toiletArtifactPath,
  urinalArtifactPath
}) {
  const [toilet, urinal] = await Promise.all([
    readFile(toiletArtifactPath).then(parsePdf),
    readFile(urinalArtifactPath).then(parsePdf)
  ]);
  return schemaFromWaterSenseFlushPdfs({
    toilet,
    urinal
  });
}
