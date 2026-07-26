import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

export const FEMP_TABLE_1_TITLE =
  "Table 1. Efficiency Requirements for Exterior Lighting";
export const FEMP_TABLE_1_HEADERS = Object.freeze([
  "Category",
  "Luminaire Efficacy Rating (LER)"
]);

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

function extractCells(rowHtml) {
  return [...rowHtml.matchAll(/<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(
    (match) => textFromHtml(match[2])
  );
}

export function schemaFromFempRequirementRows(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("EMPTY_REQUIREMENTS_TABLE");
  }
  const seen = new Set();
  for (const [index, row] of rows.entries()) {
    if (
      !row ||
      typeof row.application !== "string" ||
      !row.application.trim() ||
      !Number.isFinite(row.requiredEfficacyLmPerW) ||
      row.requiredEfficacyLmPerW <= 0
    ) {
      throw new Error(`INVALID_REQUIREMENT_ROW: ${index + 1}`);
    }
    const normalized = row.application.normalize("NFKC").toLocaleLowerCase("en-US");
    if (seen.has(normalized)) {
      throw new Error(`AMBIGUOUS_APPLICATION_REQUIREMENT: ${row.application}`);
    }
    seen.add(normalized);
  }
  const observed = {
    format: "HTML table",
    tableTitle: FEMP_TABLE_1_TITLE,
    headers: [...FEMP_TABLE_1_HEADERS],
    rowCount: rows.length,
    fields: [
      {
        name: "Category",
        position: 0,
        logicalType: "application enumeration",
        nullable: false,
        keyRole: "EXACT_REQUIREMENT_LOOKUP"
      },
      {
        name: "Luminaire Efficacy Rating (LER)",
        position: 1,
        logicalType: "minimum decimal threshold",
        nullable: false,
        comparator: "greater than or equal",
        unit: "lumens/watt"
      }
    ],
    applications: rows.map((row) => row.application)
  };
  return {
    ...observed,
    fingerprintSha256: createHash("sha256")
      .update(JSON.stringify(observed))
      .digest("hex")
  };
}

export function parseFempTable1(html) {
  if (typeof html !== "string" || !html.trim()) {
    throw new Error("EMPTY_SOURCE_ARTIFACT");
  }
  const tables = [...html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)]
    .map((match) => match[0])
    .filter((table) => textFromHtml(table).includes(FEMP_TABLE_1_TITLE));
  if (tables.length === 0) {
    throw new Error(`MISSING_SOURCE_TABLE: ${FEMP_TABLE_1_TITLE}`);
  }
  if (tables.length !== 1) {
    throw new Error(`AMBIGUOUS_SOURCE_TABLE: ${FEMP_TABLE_1_TITLE}`);
  }

  const cellsByRow = [
    ...tables[0].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)
  ].map((match) => extractCells(match[1]));
  if (
    cellsByRow.length < 3 ||
    cellsByRow[0].length !== 1 ||
    cellsByRow[0][0] !== FEMP_TABLE_1_TITLE
  ) {
    throw new Error("UNEXPECTED_TABLE_TITLE_SCHEMA");
  }
  if (
    cellsByRow[1].length !== FEMP_TABLE_1_HEADERS.length ||
    cellsByRow[1].some(
      (header, index) => header !== FEMP_TABLE_1_HEADERS[index]
    )
  ) {
    throw new Error(
      `UNEXPECTED_TABLE_HEADER_SCHEMA: ${cellsByRow[1].join(" | ")}`
    );
  }

  const rows = cellsByRow.slice(2).map((cells, index) => {
    if (cells.length !== 2) {
      throw new Error(`UNEXPECTED_TABLE_ROW_SCHEMA: row ${index + 1}`);
    }
    const threshold = cells[1].match(/^≥\s*(\d+(?:\.\d+)?)$/u);
    if (!threshold) {
      throw new Error(
        `INVALID_EFFICACY_REQUIREMENT: ${cells[0]} value ${cells[1]}`
      );
    }
    const requiredEfficacyLmPerW = Number(threshold[1]);
    if (!Number.isFinite(requiredEfficacyLmPerW) || requiredEfficacyLmPerW <= 0) {
      throw new Error(`INVALID_EFFICACY_REQUIREMENT: ${cells[0]}`);
    }
    return {
      application: cells[0],
      requiredEfficacyLmPerW,
      nativeRequirement: cells[1],
      nativeRowText: `${cells[0]} | ${cells[1]}`
    };
  });
  const schema = schemaFromFempRequirementRows(rows);
  return { rows, schema };
}

export async function inspectFempLightingSchema(artifactPath) {
  return parseFempTable1(await readFile(artifactPath, "utf8"));
}
