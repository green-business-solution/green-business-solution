import { XMLParser } from "fast-xml-parser";

import { listZipEntries, readZipEntry } from "./zip.mjs";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  parseTagValue: false,
  trimValues: false
});

function array(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function textNode(value) {
  if (typeof value === "string") return value;
  if (value === undefined || value === null) return "";
  if (typeof value === "object" && "#text" in value) return String(value["#text"]);
  return String(value);
}

function sharedStringValue(item) {
  if (item.t !== undefined) return textNode(item.t);
  return array(item.r).map((run) => textNode(run.t)).join("");
}

function columnIndex(cellReference) {
  const match = String(cellReference).match(/^([A-Z]+)\d+$/i);
  if (!match) throw new Error(`INVALID_XLSX_CELL_REFERENCE: ${cellReference}`);
  return [...match[1].toUpperCase()].reduce(
    (value, character) => value * 26 + character.charCodeAt(0) - 64,
    0
  ) - 1;
}

function normalizeTarget(target) {
  const withoutParent = target.replace(/^\.\.\//, "");
  return withoutParent.startsWith("xl/") ? withoutParent : `xl/${withoutParent}`;
}

export async function inspectWorkbook(path) {
  const entries = new Set(await listZipEntries(path));
  for (const required of ["xl/workbook.xml", "xl/_rels/workbook.xml.rels"]) {
    if (!entries.has(required)) {
      throw new Error(`MISSING_REQUIRED_XLSX_PART: ${required}`);
    }
  }
  const workbook = parser.parse(
    (await readZipEntry(path, "xl/workbook.xml")).toString("utf8")
  ).workbook;
  const relationships = parser.parse(
    (await readZipEntry(path, "xl/_rels/workbook.xml.rels")).toString("utf8")
  ).Relationships;
  const relationshipTargets = new Map(
    array(relationships.Relationship).map((relationship) => [
      relationship.Id,
      normalizeTarget(relationship.Target)
    ])
  );
  const sheets = array(workbook.sheets?.sheet).map((sheet) => ({
    name: sheet.name,
    id: sheet.sheetId,
    relationshipId: sheet["r:id"],
    entry: relationshipTargets.get(sheet["r:id"])
  }));
  for (const sheet of sheets) {
    if (!sheet.entry || !entries.has(sheet.entry)) {
      throw new Error(`MISSING_REQUIRED_XLSX_SHEET_PART: ${sheet.name}`);
    }
  }
  const definedNames = array(workbook.definedNames?.definedName).map((name) => ({
    name: name.name,
    localSheetId: name.localSheetId ?? null,
    reference: textNode(name)
  }));
  let sharedStrings = [];
  if (entries.has("xl/sharedStrings.xml")) {
    const shared = parser.parse(
      (await readZipEntry(path, "xl/sharedStrings.xml")).toString("utf8")
    ).sst;
    sharedStrings = array(shared.si).map(sharedStringValue);
  }
  return {
    entries: [...entries].sort(),
    sheets,
    definedNames,
    sharedStrings
  };
}

export async function readWorksheet(path, sheetName) {
  const workbook = await inspectWorkbook(path);
  const sheet = workbook.sheets.find((candidate) => candidate.name === sheetName);
  if (!sheet) {
    throw new Error(`UNKNOWN_XLSX_SHEET: ${sheetName}`);
  }
  const worksheet = parser.parse(
    (await readZipEntry(path, sheet.entry)).toString("utf8")
  ).worksheet;
  const rows = [];
  for (const nativeRow of array(worksheet.sheetData?.row)) {
    const cells = [];
    for (const cell of array(nativeRow.c)) {
      const index = columnIndex(cell.r);
      let value = null;
      if (cell.t === "s") {
        value = workbook.sharedStrings[Number(textNode(cell.v))] ?? null;
      } else if (cell.t === "inlineStr") {
        value = sharedStringValue(cell.is ?? {});
      } else if (cell.t === "b") {
        value = textNode(cell.v) === "1";
      } else if (cell.v !== undefined) {
        const raw = textNode(cell.v);
        const numeric = Number(raw);
        value = raw !== "" && Number.isFinite(numeric) ? numeric : raw;
      }
      cells[index] = {
        reference: cell.r,
        type: cell.t ?? "n",
        value,
        formula: cell.f === undefined ? null : textNode(cell.f),
        styleIndex: cell.s === undefined ? null : Number(cell.s)
      };
    }
    rows.push({
      rowNumber: Number(nativeRow.r),
      cells
    });
  }
  return {
    sheet,
    rows,
    dimension: worksheet.dimension?.ref ?? null,
    mergeCells: array(worksheet.mergeCells?.mergeCell).map((cell) => cell.ref)
  };
}

export function worksheetSchema(worksheet) {
  const typeByColumn = new Map();
  let maximumColumn = 0;
  for (const row of worksheet.rows) {
    maximumColumn = Math.max(maximumColumn, row.cells.length);
    for (let index = 0; index < row.cells.length; index += 1) {
      const cell = row.cells[index];
      if (!cell || cell.value === null) continue;
      const types = typeByColumn.get(index) ?? new Set();
      types.add(typeof cell.value);
      if (cell.formula) types.add("formula");
      typeByColumn.set(index, types);
    }
  }
  return {
    sheetName: worksheet.sheet.name,
    dimension: worksheet.dimension,
    rowCount: worksheet.rows.length,
    maximumColumn,
    columns: [...typeByColumn.entries()].map(([index, types]) => ({
      index,
      types: [...types].sort()
    }))
  };
}
