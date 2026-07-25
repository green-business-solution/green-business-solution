import { createHash } from "node:crypto";

import {
  inspectWorkbook,
  readWorksheet,
  worksheetSchema
} from "../../lib/xlsx.mjs";

export const LANDSCAPE_SHEET_CONTRACT = Object.freeze([
  Object.freeze({ name: "About", dimension: "A1:X11", rowCount: 11 }),
  Object.freeze({
    name: "Peak_Month",
    dimension: "A1:D31736",
    rowCount: 31_736
  }),
  Object.freeze({ name: "ETo", dimension: "A1:N55915", rowCount: 55_915 }),
  Object.freeze({ name: "P50", dimension: "A1:N55915", rowCount: 55_915 })
]);

export const LANDSCAPE_REQUIRED_CELLS = Object.freeze([
  Object.freeze({
    sheet: "About",
    cell: "A1",
    type: "s",
    value:
      "The values attached represented average reference evapotranspiration and rainfall in inches/month and estimated peak watering month as defined by the WaterSense Water Budget Tool.",
    semantic: "workbook scope and native climate unit"
  }),
  Object.freeze({
    sheet: "About",
    cell: "A2",
    type: "s",
    value:
      "U.S. postal codes are represented as the 5-digit zip code. Canadian postal codes are represented as the Forward Sortation Area (FSA) or first 3 characters.",
    semantic: "postal-code representation"
  }),
  Object.freeze({
    sheet: "About",
    cell: "C5",
    type: "s",
    value:
      "Peak watering month is identified by determining the month where the difference between ETo and P50 is the greatest, or the month with the highest ETo for postal codes where rainfall exceeds ETo in every month of the year.",
    semantic: "peak-month selection rule"
  }),
  Object.freeze({
    sheet: "About",
    cell: "B6",
    type: "s",
    value:
      " ·ETo – This tab displays the average ETo (inches) for each month and the annual average for each zip code or FSA.  ETo represents reference evapotranspiration in inches.  ",
    semantic: "native ETo unit note",
    unit: "inches"
  }),
  Object.freeze({
    sheet: "About",
    cell: "B7",
    type: "s",
    value:
      " ·P50 – This tab displays the P50 (inches) for each month and the annual average for each zip code or FSA.  P50 represents average rainfall in inches.",
    semantic: "native P50 unit note",
    unit: "inches"
  }),
  Object.freeze({
    sheet: "Peak_Month",
    cell: "A1",
    type: "s",
    value: "Postal Code",
    semantic: "source key"
  }),
  Object.freeze({
    sheet: "Peak_Month",
    cell: "B1",
    type: "s",
    value: "Peak Watering Month",
    semantic: "peak-month enumeration"
  }),
  Object.freeze({
    sheet: "Peak_Month",
    cell: "C1",
    type: "s",
    value: "Eto",
    semantic: "peak-month reference evapotranspiration",
    unit: "inches/month"
  }),
  Object.freeze({
    sheet: "Peak_Month",
    cell: "D1",
    type: "s",
    value: "RAINFALL",
    semantic: "peak-month rainfall",
    unit: "inches/month"
  }),
  ...[
    "Postal Code",
    "JAN_ET",
    "FEB_ET",
    "MAR_ET",
    "APR_ET",
    "MAY_ET",
    "JUN_ET",
    "JUL_ET",
    "AUG_ET",
    "SEP_ET",
    "OCT_ET",
    "NOV_ET",
    "DEC_ET",
    "Annual"
  ].map((value, index) =>
    Object.freeze({
      sheet: "ETo",
      cell: `${String.fromCharCode(65 + index)}1`,
      type: "s",
      value,
      semantic:
        index === 0
          ? "source key"
          : index === 13
            ? "annual reference evapotranspiration"
            : "monthly reference evapotranspiration",
      ...(index > 0 ? { unit: index === 13 ? "inches/year" : "inches/month" } : {})
    })
  ),
  ...[
    "Postal Code",
    "JAN_RF",
    "FEB_RF",
    "MAR_RF",
    "APR_RF",
    "MAY_RF",
    "JUN_RF",
    "JUL_RF",
    "AUG_RF",
    "SEP_RF",
    "OCT_RF",
    "NOV_RF",
    "DEC_RF",
    "Annual"
  ].map((value, index) =>
    Object.freeze({
      sheet: "P50",
      cell: `${String.fromCharCode(65 + index)}1`,
      type: "s",
      value,
      semantic:
        index === 0
          ? "source key"
          : index === 13
            ? "annual P50 rainfall"
            : "monthly P50 rainfall",
      ...(index > 0 ? { unit: index === 13 ? "inches/year" : "inches/month" } : {})
    })
  )
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

export function validateLandscapeObservedSchema(observed) {
  if (!observed || observed.format !== "XLSX") {
    throw new Error("INVALID_LANDSCAPE_SCHEMA: expected XLSX");
  }
  const actualSheets = observed.sheets ?? [];
  if (actualSheets.length !== LANDSCAPE_SHEET_CONTRACT.length) {
    throw new Error(
      `LANDSCAPE_SHEET_COUNT_MISMATCH: expected ${LANDSCAPE_SHEET_CONTRACT.length}, received ${actualSheets.length}`
    );
  }
  for (let index = 0; index < LANDSCAPE_SHEET_CONTRACT.length; index += 1) {
    const expected = LANDSCAPE_SHEET_CONTRACT[index];
    const actual = actualSheets[index];
    if (actual?.name !== expected.name) {
      throw new Error(
        `LANDSCAPE_SHEET_ORDER_MISMATCH: expected ${expected.name} at position ${index + 1}`
      );
    }
    if (actual.dimension !== expected.dimension || actual.rowCount !== expected.rowCount) {
      throw new Error(
        `LANDSCAPE_SHEET_DIMENSION_MISMATCH: ${expected.name} expected ${expected.dimension}/${expected.rowCount}, received ${actual.dimension}/${actual.rowCount}`
      );
    }
  }
  const actualCells = new Map(
    (observed.requiredCells ?? []).map((cell) => [
      `${cell.sheet}!${cell.cell}`,
      cell
    ])
  );
  for (const expected of LANDSCAPE_REQUIRED_CELLS) {
    const key = `${expected.sheet}!${expected.cell}`;
    const actual = actualCells.get(key);
    if (!actual) {
      throw new Error(`MISSING_REQUIRED_XLSX_CELL: ${key}`);
    }
    if (actual.type !== expected.type || actual.value !== expected.value) {
      throw new Error(
        `LANDSCAPE_NATIVE_CELL_MISMATCH: ${key} expected ${JSON.stringify(expected.value)}`
      );
    }
    if (expected.unit && actual.unit !== expected.unit) {
      throw new Error(
        `LANDSCAPE_NATIVE_UNIT_MISMATCH: ${key} expected ${expected.unit}`
      );
    }
  }
  if (observed.formulaCount !== 0) {
    throw new Error(
      `LANDSCAPE_UNEXPECTED_FORMULA: climate data workbook contains ${observed.formulaCount} formula cells`
    );
  }
  return observed;
}

export async function loadAndInspectLandscapeWorkbook(artifactPath) {
  const workbook = await inspectWorkbook(artifactPath);
  const worksheets = new Map();
  for (const contract of LANDSCAPE_SHEET_CONTRACT) {
    worksheets.set(contract.name, await readWorksheet(artifactPath, contract.name));
  }
  const requiredCells = LANDSCAPE_REQUIRED_CELLS.map((expected) => {
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
    recordContract: {
      sourceKey: "5-digit U.S. ZIP code or 3-character Canadian FSA",
      peakRows: 31_735,
      monthlyClimateRows: 31_735,
      usZipRows: 30_116,
      canadianFsaRows: 1_619,
      styledBlankRowsInMonthlySheets: 24_179,
      monthEnumerations: [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
      ],
      monthlyUnits: {
        referenceEvapotranspiration: "inches/month",
        rainfall: "inches/month"
      },
      annualUnits: {
        referenceEvapotranspiration: "inches/year",
        rainfall: "inches/year"
      }
    }
  };
  validateLandscapeObservedSchema(observed);
  return {
    schema: {
      ...observed,
      fingerprintSha256: stableFingerprint(observed)
    },
    worksheets
  };
}

export async function inspectLandscapeSchema(artifactPath) {
  return (await loadAndInspectLandscapeWorkbook(artifactPath)).schema;
}
