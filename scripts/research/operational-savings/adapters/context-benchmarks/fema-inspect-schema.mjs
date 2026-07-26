import { readFile } from "node:fs/promises";

import { sha256Json } from "../../lib/artifact.mjs";

const CONTENT_ID =
  "C240F205241532849DA151301005E142ADESC";
const TITLE = "Operational generator fueling requirements";
const FORMULA_TEXT =
  "0.07 gallons/hour x kW size of the generator x 24 hours/day = gallons of fuel required per day";
const EXAMPLE_TEXT =
  "Example: 40 kW generator = 0.07 x 40 x 24 = 67.2 gallons per day";
const APPLICABILITY_TEXT =
  "This applies for diesel fuel generators only.";

function decodeHtmlEntities(value) {
  return value
    .replaceAll(/&#(\d+);/g, (_, decimal) =>
      String.fromCodePoint(Number(decimal))
    )
    .replaceAll(/&#x([0-9a-f]+);/gi, (_, hexadecimal) =>
      String.fromCodePoint(Number.parseInt(hexadecimal, 16))
    )
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function textFromHtml(fragment) {
  return decodeHtmlEntities(fragment.replaceAll(/<[^>]*>/g, " "))
    .normalize("NFKC")
    .replaceAll(/\s+/g, " ")
    .trim();
}

export function parseFemaGeneratorFuelingHtml(html) {
  if (typeof html !== "string" || !html.trim()) {
    throw new Error("EMPTY_SOURCE_ARTIFACT");
  }
  const contentPattern = new RegExp(
    `<span\\s+id="${CONTENT_ID}"[^>]*>([\\s\\S]*?)<\\/span>`,
    "gi"
  );
  const matches = [...html.matchAll(contentPattern)];
  if (matches.length !== 1) {
    throw new Error(
      `FEMA_SOURCE_SCHEMA_DRIFT: expected one ${CONTENT_ID} section`
    );
  }
  const titleCount = [...html.matchAll(
    /class="title">Operational generator fueling requirements<\/span>/g
  )].length;
  if (titleCount !== 1) {
    throw new Error(
      `FEMA_SOURCE_SCHEMA_DRIFT: expected one ${TITLE} title`
    );
  }
  const content = textFromHtml(matches[0][1]);
  for (const requiredText of [
    FORMULA_TEXT,
    EXAMPLE_TEXT,
    APPLICABILITY_TEXT
  ]) {
    if (!content.includes(requiredText)) {
      throw new Error(
        `FEMA_SOURCE_SCHEMA_DRIFT: missing native statement ${requiredText}`
      );
    }
  }
  const coefficientMatch = FORMULA_TEXT.match(
    /^(\d+(?:\.\d+)?) gallons\/hour/
  );
  const exampleMatch = EXAMPLE_TEXT.match(
    /(\d+) kW generator = (\d+(?:\.\d+)?) x (\d+) x (\d+) = (\d+(?:\.\d+)?) gallons per day/
  );
  if (!coefficientMatch || !exampleMatch) {
    throw new Error(
      "FEMA_SOURCE_SCHEMA_DRIFT: native formula could not be parsed"
    );
  }
  const coefficient = Number(coefficientMatch[1]);
  const example = {
    ratedCapacityKw: Number(exampleMatch[1]),
    coefficient: Number(exampleMatch[2]),
    hours: Number(exampleMatch[4]),
    gallons: Number(exampleMatch[5])
  };
  if (
    example.coefficient !== coefficient ||
    coefficient * example.ratedCapacityKw * example.hours !==
      example.gallons
  ) {
    throw new Error(
      "FEMA_SOURCE_SCHEMA_DRIFT: native example no longer validates the formula"
    );
  }
  const observed = {
    format: "HTML lesson section",
    contentId: CONTENT_ID,
    title: TITLE,
    fields: [
      {
        name: "full_load_diesel_fuel_coefficient",
        nativeText: FORMULA_TEXT,
        value: coefficient,
        unit: "gallon/(hour kW)",
        applicability: "diesel generator at full load"
      },
      {
        name: "rated_generator_capacity",
        nativeText: "kW size of the generator",
        unit: "kW",
        role: "project input"
      },
      {
        name: "operating_duration",
        nativeText: "24 hours/day",
        unit: "hours",
        role: "source example, not an annual schedule default"
      }
    ],
    example,
    applicabilityText: APPLICABILITY_TEXT
  };
  return {
    coefficient,
    observed,
    fingerprintSha256: sha256Json(observed)
  };
}

export async function inspectFemaGeneratorFuelingSchema(
  artifactPath
) {
  return parseFemaGeneratorFuelingHtml(
    await readFile(artifactPath, "utf8")
  );
}
