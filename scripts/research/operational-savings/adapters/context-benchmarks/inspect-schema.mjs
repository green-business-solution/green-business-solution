import { sha256Json } from "../../lib/artifact.mjs";
import {
  inspectWorkbook,
  readWorksheet
} from "../../lib/xlsx.mjs";

const DISHWASHER_DEFAULT_ROWS = Object.freeze([
  {
    row: 6,
    sanitationMethod: "Low Temperature",
    machineType: "Under Counter",
    racksPerOperatingDay: 75
  },
  {
    row: 7,
    sanitationMethod: "Low Temperature",
    machineType: "Stationary Single Tank Door",
    racksPerOperatingDay: 280
  },
  {
    row: 8,
    sanitationMethod: "Low Temperature",
    machineType: "Single Tank Conveyor",
    racksPerOperatingDay: 400
  },
  {
    row: 9,
    sanitationMethod: "Low Temperature",
    machineType: "Multi Tank Conveyor",
    racksPerOperatingDay: 600
  },
  {
    row: 11,
    sanitationMethod: "High Temperature",
    machineType: "Under Counter",
    racksPerOperatingDay: 75
  },
  {
    row: 12,
    sanitationMethod: "High Temperature",
    machineType: "Stationary Single Tank Door",
    racksPerOperatingDay: 280
  },
  {
    row: 13,
    sanitationMethod: "High Temperature",
    machineType: "Single Tank Conveyor",
    racksPerOperatingDay: 400
  },
  {
    row: 14,
    sanitationMethod: "High Temperature",
    machineType: "Multi Tank Conveyor",
    racksPerOperatingDay: 600
  },
  {
    row: 15,
    sanitationMethod: "High Temperature",
    machineType: "Pot, Pan, and Utensil",
    racksPerOperatingDay: 200
  }
]);

const COOKTOP_CELLS = Object.freeze({
  C17: {
    role: "conventionalCookingEfficiency",
    value: 0.7603,
    unit: "fraction"
  },
  D17: {
    role: "energyStarCookingEfficiency",
    value: 0.8,
    unit: "fraction"
  },
  C20: {
    role: "conventionalBoilCycleEnergy",
    value: 1.03,
    unit: "kWh/boil cycle"
  },
  D20: {
    role: "energyStarBoilCycleEnergy",
    value: 0.91,
    unit: "kWh/boil cycle"
  }
});

function cellIndex(worksheet) {
  return new Map(
    worksheet.rows.flatMap((row) =>
      row.cells.filter(Boolean).map((cell) => [cell.reference, cell])
    )
  );
}

function assertCell(index, reference, expected, sheetName) {
  const cell = index.get(reference);
  if (!cell) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${sheetName}!${reference} is missing`
    );
  }
  if (
    typeof expected === "number"
      ? Math.abs(cell.value - expected) > 1e-12
      : cell.value !== expected
  ) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${sheetName}!${reference} changed`
    );
  }
  return cell;
}

export function schemaFromContextWorkbook({
  workbook,
  dishwasher,
  cooktop
}) {
  if (workbook.sheets.length !== 15) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: expected 15 sheets, received ${workbook.sheets.length}`
    );
  }
  if (dishwasher.dimension !== "A1:Q104") {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: Dishwasher Calcs dimension ${dishwasher.dimension}`
    );
  }
  if (cooktop.dimension !== "A1:P47") {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: Electric Cooktop Calcs dimension ${cooktop.dimension}`
    );
  }
  const dishwasherIndex = cellIndex(dishwasher);
  const cooktopIndex = cellIndex(cooktop);
  assertCell(
    dishwasherIndex,
    "E4",
    "Racks washed per day",
    "Dishwasher Calcs"
  );
  const dishwasherActivityDefaults = DISHWASHER_DEFAULT_ROWS.map((expected) => {
    assertCell(
      dishwasherIndex,
      `B${expected.row}`,
      expected.machineType,
      "Dishwasher Calcs"
    );
    assertCell(
      dishwasherIndex,
      `E${expected.row}`,
      expected.racksPerOperatingDay,
      "Dishwasher Calcs"
    );
    return {
      ...expected,
      machineTypeCell: `B${expected.row}`,
      valueCell: `E${expected.row}`,
      unit: "racks/operating day"
    };
  });
  assertCell(
    dishwasherIndex,
    "B5",
    "Low Temperature",
    "Dishwasher Calcs"
  );
  assertCell(
    dishwasherIndex,
    "B10",
    "High Temperature",
    "Dishwasher Calcs"
  );
  assertCell(
    cooktopIndex,
    "C34",
    " - A boil cycle is the process of taking 20-lbs of water from 70˚F to 200˚F.",
    "Electric Cooktop Calcs"
  );
  const cooktopDuty = Object.entries(COOKTOP_CELLS).map(
    ([reference, expected]) => {
      const cell = assertCell(
        cooktopIndex,
        reference,
        expected.value,
        "Electric Cooktop Calcs"
      );
      return {
        reference,
        role: expected.role,
        value: cell.value,
        unit: expected.unit
      };
    }
  );
  const observed = {
    format: "XLSX_OOXML",
    workbookSheetCount: workbook.sheets.length,
    worksheets: [
      {
        name: dishwasher.sheet.name,
        dimension: dishwasher.dimension
      },
      {
        name: cooktop.sheet.name,
        dimension: cooktop.dimension
      }
    ],
    dishwasherActivityDefaults,
    cooktopDutyDefinition:
      "20 pounds of water heated from 70 degrees F to 200 degrees F",
    cooktopDuty
  };
  return {
    ...observed,
    fingerprintSha256: sha256Json(observed)
  };
}

export async function inspectContextBenchmarkSchema(path) {
  const [workbook, dishwasher, cooktop] = await Promise.all([
    inspectWorkbook(path),
    readWorksheet(path, "Dishwasher Calcs"),
    readWorksheet(path, "Electric Cooktop Calcs")
  ]);
  return schemaFromContextWorkbook({
    workbook,
    dishwasher,
    cooktop
  });
}

const LIGHTING_MARKET_HEADERS = Object.freeze([
  "Incandescent",
  "Halogen",
  "CFL",
  "Linear Fluorescent",
  "MV",
  "MH",
  "HPS",
  "LPS",
  "LED",
  "Other",
  "Average"
]);

const LIGHTING_MARKET_APPLICATIONS = Object.freeze([
  "Airfield",
  "Billboard",
  "Building Exterior: C&I",
  "Comm. Tower",
  "Parking",
  "Railway",
  "Roadway",
  "Sports Field",
  "Traffic Signal"
]);

function requireCell(index, reference, expected) {
  const cell = index.get(reference);
  if (!cell || cell.value !== expected) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: Table 4-29!${reference} changed`
    );
  }
  return cell;
}

export function schemaFromLightingMarketWorkbook({
  workbook,
  table
}) {
  if (
    workbook.sheets.length !== 61 ||
    workbook.sheets[30]?.name !== "Table 4-29"
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: expected 61-sheet LMC workbook with Table 4-29 at index 30"
    );
  }
  if (table.dimension !== "A1:L14") {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: Table 4-29 dimension ${table.dimension}`
    );
  }
  const index = cellIndex(table);
  requireCell(index, "A1", "Outdoor Sector");
  requireCell(
    index,
    "A2",
    "Average Wattage per Lamp by Subsector in 2015"
  );
  LIGHTING_MARKET_HEADERS.forEach((header, offset) => {
    const column = String.fromCharCode("B".charCodeAt(0) + offset);
    requireCell(index, `${column}3`, header);
  });
  const applicationAverages = LIGHTING_MARKET_APPLICATIONS.map(
    (application, offset) => {
      const row = 5 + offset;
      requireCell(index, `A${row}`, application);
      const average = index.get(`L${row}`);
      if (
        !average ||
        !Number.isFinite(average.value) ||
        average.value <= 0
      ) {
        throw new Error(
          `SOURCE_SCHEMA_DRIFT: Table 4-29!L${row} is not a positive average wattage`
        );
      }
      return {
        application,
        applicationCell: `A${row}`,
        averageWatts: average.value,
        averageCell: `L${row}`,
        unit: "watts/lamp-or-luminaire"
      };
    }
  );
  requireCell(index, "A14", "Average");
  requireCell(index, "L14", 165.7);
  const observed = {
    format: "XLSX_OOXML",
    workbookSheetCount: workbook.sheets.length,
    worksheet: {
      name: table.sheet.name,
      dimension: table.dimension,
      titleCell: "A2",
      applicationColumn: "A5:A13",
      averageWattageColumn: "L5:L13"
    },
    headers: LIGHTING_MARKET_HEADERS,
    applicationAverages,
    overallAverage: {
      value: 165.7,
      cell: "L14",
      unit: "watts/lamp-or-luminaire"
    }
  };
  return {
    ...observed,
    fingerprintSha256: sha256Json(observed)
  };
}

export async function inspectLightingMarketSchema(path) {
  const [workbook, table] = await Promise.all([
    inspectWorkbook(path),
    readWorksheet(path, "Table 4-29")
  ]);
  return schemaFromLightingMarketWorkbook({ workbook, table });
}

export {
  COOKTOP_CELLS,
  DISHWASHER_DEFAULT_ROWS,
  LIGHTING_MARKET_APPLICATIONS,
  LIGHTING_MARKET_HEADERS
};
