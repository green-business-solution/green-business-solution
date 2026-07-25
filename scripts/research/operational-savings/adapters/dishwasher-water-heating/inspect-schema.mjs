import { sha256Json } from "../../lib/artifact.mjs";
import {
  inspectWorkbook,
  readWorksheet
} from "../../lib/xlsx.mjs";

const EXPECTED_SHEETS = Object.freeze([
  "How To Use This Calculator",
  "INPUTS",
  "RESULTS SUMMARY",
  "RESULTS DETAIL",
  "Dishwasher Calcs",
  "Freezer Calcs",
  "Fryer Calcs",
  "Griddle Calcs",
  "HFHC Calcs",
  "Ice Machine Calcs",
  "Oven Calcs",
  "Refrigerator Calcs",
  "Steam Cooker Calcs",
  "Electric Cooktop Calcs",
  "General Assumptions"
]);

const REQUIRED_DISHWASHER_CELLS = Object.freeze({
  I18: {
    value: 1,
    role: "specificHeatWater",
    unit: "Btu/pound/degree F"
  },
  I19: {
    value: 8.208556149732619,
    formula: "61.4/7.48",
    role: "waterDensity",
    unit: "pounds/gallon"
  },
  C20: {
    value: 0.98,
    role: "buildingElectricEfficiency",
    unit: "fraction"
  },
  D20: {
    value: 0.8,
    role: "buildingGasEfficiency",
    unit: "fraction"
  },
  E20: {
    value: 70,
    role: "buildingTemperatureRise",
    unit: "degree F"
  },
  C21: {
    value: 0.98,
    role: "boosterElectricEfficiency",
    unit: "fraction"
  },
  D21: {
    value: 0.8,
    role: "boosterGasEfficiency",
    unit: "fraction"
  },
  E21: {
    value: 40,
    role: "boosterTemperatureRise",
    unit: "degree F"
  },
  C39: {
    value: 0.17179180757885015,
    formula: "E20*I18*I19/C20/'General Assumptions'!C63",
    role: "buildingElectricInputPerGallon",
    unit: "kWh/gallon"
  },
  D39: {
    value: 0.007182486631016042,
    formula: "E20*I18*I19/D20/'General Assumptions'!C62",
    role: "buildingGasInputPerGallon",
    unit: "therm/gallon"
  },
  C40: {
    value: 0.09816674718791438,
    formula: "E21*I18*I19/C21/'General Assumptions'!C63",
    role: "boosterElectricInputPerGallon",
    unit: "kWh/gallon"
  },
  D40: {
    value: 0.004104278074866309,
    formula: "E21*I18*I19/D21/'General Assumptions'!C62",
    role: "boosterGasInputPerGallon",
    unit: "therm/gallon"
  }
});

const REQUIRED_GENERAL_CELLS = Object.freeze({
  C62: {
    value: 100000,
    role: "btuPerTherm",
    unit: "Btu/therm"
  },
  C63: {
    value: 3413,
    role: "btuPerKwh",
    unit: "Btu/kWh"
  }
});

function cellIndex(worksheet) {
  return new Map(
    worksheet.rows.flatMap((row) =>
      row.cells.filter(Boolean).map((cell) => [cell.reference, cell])
    )
  );
}

function numbersEqual(left, right) {
  return Math.abs(Number(left) - Number(right)) <=
    Math.max(1e-12, Math.abs(Number(right)) * 1e-12);
}

function assertCell(index, reference, expected, sheetName) {
  const cell = index.get(reference);
  if (!cell) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${sheetName}!${reference} is missing`
    );
  }
  if (
    typeof expected.value === "number"
      ? !numbersEqual(cell.value, expected.value)
      : cell.value !== expected.value
  ) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${sheetName}!${reference} cached value changed`
    );
  }
  if (
    Object.prototype.hasOwnProperty.call(expected, "formula") &&
    cell.formula !== expected.formula
  ) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${sheetName}!${reference} formula changed`
    );
  }
  return {
    reference,
    role: expected.role,
    value: cell.value,
    formula: cell.formula,
    unit: expected.unit
  };
}

export function schemaFromDishwasherWorksheets({
  workbook,
  dishwasher,
  general
}) {
  const sheetNames = workbook.sheets.map((sheet) => sheet.name);
  if (
    sheetNames.length !== EXPECTED_SHEETS.length ||
    EXPECTED_SHEETS.some((name, index) => sheetNames[index] !== name)
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: workbook sheet order or membership changed"
    );
  }
  if (dishwasher.dimension !== "A1:Q104") {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: Dishwasher Calcs dimension ${dishwasher.dimension}`
    );
  }
  const dishwasherIndex = cellIndex(dishwasher);
  const generalIndex = cellIndex(general);
  const fields = [
    ...Object.entries(REQUIRED_DISHWASHER_CELLS).map(([reference, expected]) =>
      assertCell(
        dishwasherIndex,
        reference,
        expected,
        "Dishwasher Calcs"
      )
    ),
    ...Object.entries(REQUIRED_GENERAL_CELLS).map(([reference, expected]) =>
      assertCell(
        generalIndex,
        reference,
        expected,
        "General Assumptions"
      )
    )
  ];
  const observed = {
    format: "XLSX_OOXML",
    workbookSheetCount: sheetNames.length,
    sheetNames,
    worksheet: "Dishwasher Calcs",
    worksheetDimension: dishwasher.dimension,
    requiredCells: fields
  };
  return {
    ...observed,
    fingerprintSha256: sha256Json(observed)
  };
}

export async function inspectDishwasherWaterHeatingSchema(path) {
  const [workbook, dishwasher, general] = await Promise.all([
    inspectWorkbook(path),
    readWorksheet(path, "Dishwasher Calcs"),
    readWorksheet(path, "General Assumptions")
  ]);
  return schemaFromDishwasherWorksheets({
    workbook,
    dishwasher,
    general
  });
}

export {
  EXPECTED_SHEETS,
  REQUIRED_DISHWASHER_CELLS,
  REQUIRED_GENERAL_CELLS
};
