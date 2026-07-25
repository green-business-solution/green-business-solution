import { createHash } from "node:crypto";

import {
  inspectWorkbook,
  readWorksheet,
  worksheetSchema
} from "../../lib/xlsx.mjs";

export const CI_SHEET_CONTRACT = Object.freeze([
  Object.freeze({ name: "Title Page", dimension: "A1:I34", rowCount: 34 }),
  Object.freeze({
    name: "Action Plan Checklist",
    dimension: "A1:E57",
    rowCount: 57
  }),
  Object.freeze({
    name: "Building Water Survey",
    dimension: "A1:E22",
    rowCount: 22
  }),
  Object.freeze({
    name: "List of Water Meters",
    dimension: "A1:D19",
    rowCount: 19
  }),
  Object.freeze({
    name: "Water Consumption History",
    dimension: "A1:M21",
    rowCount: 20
  }),
  Object.freeze({
    name: "Existing Plumbing Equipment",
    dimension: "A1:J20",
    rowCount: 20
  }),
  Object.freeze({
    name: "Water Use Inventory",
    dimension: "A1:F22",
    rowCount: 22
  })
]);

export const CI_REQUIRED_CELLS = Object.freeze([
  Object.freeze({
    sheet: "Title Page",
    cell: "A14",
    type: "s",
    value:
      "Writable Tables from WaterSense at Work: Best Management Practices for Commercial and Institutional Facilities",
    semantic: "workbook identity"
  }),
  Object.freeze({
    sheet: "Title Page",
    cell: "A16",
    type: "s",
    value: "October 2012",
    semantic: "source publication date"
  }),
  Object.freeze({
    sheet: "Action Plan Checklist",
    cell: "A7",
    type: "s",
    value: "Implement a leak detection and repair program.",
    semantic: "leak method scope"
  }),
  Object.freeze({
    sheet: "Action Plan Checklist",
    cell: "B7",
    type: "n",
    value: 2.3,
    semantic: "native guide section reference"
  }),
  Object.freeze({
    sheet: "Action Plan Checklist",
    cell: "A43",
    type: "s",
    value:
      "Professionally monitor cooling tower and boiler chemistry and maximize cycles of concentration.",
    semantic: "cooling-tower opportunity scope"
  }),
  Object.freeze({
    sheet: "Action Plan Checklist",
    cell: "A44",
    type: "s",
    value:
      "Install cooling tower meters and control systems to control chemical feed and blowdown based on conductivity.",
    semantic: "cooling-tower measurement scope"
  }),
  Object.freeze({
    sheet: "Water Consumption History",
    cell: "A20",
    type: "s",
    value:
      "1 The abbreviation ccf represents 100 cubic feet, or roughly 748 gallons.",
    semantic: "billing-unit conversion note",
    unit: "approximately 748 gallons/ccf"
  }),
  Object.freeze({
    sheet: "Water Consumption History",
    cell: "A21",
    type: "s",
    value:
      "2 The abbreviation GPWD represents gallons per workday, assuming five days per week.",
    semantic: "workday-normalization note",
    unit: "gallons/workday"
  }),
  Object.freeze({
    sheet: "Existing Plumbing Equipment",
    cell: "H2",
    type: "s",
    value: "Average Flow Rate or Consumption",
    semantic: "equipment performance input"
  }),
  Object.freeze({
    sheet: "Existing Plumbing Equipment",
    cell: "I2",
    type: "s",
    value: "Average Uses per Week per Unit",
    semantic: "equipment activity input"
  }),
  Object.freeze({
    sheet: "Existing Plumbing Equipment",
    cell: "J2",
    type: "s",
    value: "Comments (leaks, control, etc.)",
    semantic: "leak observation input"
  }),
  Object.freeze({
    sheet: "Water Use Inventory",
    cell: "C2",
    type: "s",
    value: "Flow\n(gallons per minute)",
    semantic: "measured flow input",
    unit: "gallons/minute"
  }),
  Object.freeze({
    sheet: "Water Use Inventory",
    cell: "D2",
    type: "s",
    value: "Operating Time (minutes per day)",
    semantic: "measured duration input",
    unit: "minutes/day"
  }),
  Object.freeze({
    sheet: "Water Use Inventory",
    cell: "E2",
    type: "s",
    value: "Flow per Day (gallons per day)",
    semantic: "flow-times-duration output",
    unit: "gallons/day"
  })
]);

function cellAt(worksheet, reference) {
  for (const row of worksheet.rows) {
    const cell = row.cells.find((candidate) => candidate?.reference === reference);
    if (cell) return cell;
  }
  return null;
}

function stableFingerprint(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function validateCiObservedSchema(observed) {
  if (!observed || observed.format !== "XLSX") {
    throw new Error("INVALID_WATERSENSE_CI_SCHEMA: expected XLSX");
  }
  const actualSheets = observed.sheets ?? [];
  if (actualSheets.length !== CI_SHEET_CONTRACT.length) {
    throw new Error(
      `WATERSENSE_CI_SHEET_COUNT_MISMATCH: expected ${CI_SHEET_CONTRACT.length}, received ${actualSheets.length}`
    );
  }
  for (let index = 0; index < CI_SHEET_CONTRACT.length; index += 1) {
    const expected = CI_SHEET_CONTRACT[index];
    const actual = actualSheets[index];
    if (actual?.name !== expected.name) {
      throw new Error(
        `WATERSENSE_CI_SHEET_ORDER_MISMATCH: expected ${expected.name} at position ${index + 1}`
      );
    }
    if (actual.dimension !== expected.dimension || actual.rowCount !== expected.rowCount) {
      throw new Error(
        `WATERSENSE_CI_SHEET_DIMENSION_MISMATCH: ${expected.name} expected ${expected.dimension}/${expected.rowCount}, received ${actual.dimension}/${actual.rowCount}`
      );
    }
  }
  const actualCells = new Map(
    (observed.requiredCells ?? []).map((cell) => [
      `${cell.sheet}!${cell.cell}`,
      cell
    ])
  );
  for (const expected of CI_REQUIRED_CELLS) {
    const key = `${expected.sheet}!${expected.cell}`;
    const actual = actualCells.get(key);
    if (!actual) {
      throw new Error(`MISSING_REQUIRED_XLSX_CELL: ${key}`);
    }
    if (actual.type !== expected.type || actual.value !== expected.value) {
      throw new Error(
        `WATERSENSE_CI_NATIVE_CELL_MISMATCH: ${key} expected ${JSON.stringify(expected.value)}`
      );
    }
    if (expected.unit && actual.unit !== expected.unit) {
      throw new Error(
        `WATERSENSE_CI_NATIVE_UNIT_MISMATCH: ${key} expected ${expected.unit}`
      );
    }
  }
  if (observed.formulaCount !== 0) {
    throw new Error(
      `WATERSENSE_CI_UNEXPECTED_FORMULA: writeable table workbook contains ${observed.formulaCount} formula cells`
    );
  }
  return observed;
}

export async function loadAndInspectCiWorkbook(artifactPath) {
  const workbook = await inspectWorkbook(artifactPath);
  const worksheets = new Map();
  for (const contract of CI_SHEET_CONTRACT) {
    worksheets.set(contract.name, await readWorksheet(artifactPath, contract.name));
  }
  const requiredCells = CI_REQUIRED_CELLS.map((expected) => {
    const cell = cellAt(worksheets.get(expected.sheet), expected.cell);
    return {
      sheet: expected.sheet,
      cell: expected.cell,
      type: cell?.type ?? null,
      value: cell?.value ?? null,
      semantic: expected.semantic,
      ...(expected.unit ? { unit: expected.unit } : {})
    };
  });
  const formulaCount = [...worksheets.values()].reduce(
    (count, worksheet) =>
      count +
      worksheet.rows.reduce(
        (sheetCount, row) =>
          sheetCount + row.cells.filter((cell) => cell?.formula).length,
        0
      ),
    0
  );
  const observed = {
    format: "XLSX",
    sheetOrder: workbook.sheets.map((sheet) => sheet.name),
    sheets: workbook.sheets.map((sheet) => {
      const schema = worksheetSchema(worksheets.get(sheet.name));
      return {
        name: schema.sheetName,
        dimension: schema.dimension,
        rowCount: schema.rowCount,
        maximumColumn: schema.maximumColumn,
        nativeTypesByColumn: schema.columns
      };
    }),
    requiredCells,
    formulaCount,
    methodContract: {
      measuredFlowCell: "Water Use Inventory!C2",
      measuredDurationCell: "Water Use Inventory!D2",
      dailyFlowCell: "Water Use Inventory!E2",
      measuredRelationship:
        "gallons/minute multiplied by minutes/day produces gallons/day",
      coolingTowerEvidenceCells: [
        "Action Plan Checklist!A43",
        "Action Plan Checklist!A44"
      ],
      coolingTowerEquationPresent: false
    }
  };
  validateCiObservedSchema(observed);
  return {
    schema: {
      ...observed,
      fingerprintSha256: stableFingerprint(observed)
    },
    worksheets
  };
}

export async function inspectCiSchema(artifactPath) {
  return (await loadAndInspectCiWorkbook(artifactPath)).schema;
}
