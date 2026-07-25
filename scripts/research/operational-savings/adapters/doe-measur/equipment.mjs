import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  DOE_MEASUR_COMMIT,
  DOE_MEASUR_REPOSITORY_URL,
  DOE_MEASUR_SOURCE_SCHEMA,
  DOE_MEASUR_SOURCE_SCHEMA_FINGERPRINT_SHA256,
  DOE_MEASUR_SOURCE_SCHEMA_ID
} from "./inspect-schema.mjs";
import {
  DOE_MEASUR_EQUIPMENT_PINNED_FILES,
  DOE_MEASUR_EQUIPMENT_SOURCE_FILES,
  inspectDoeMeasurEquipmentRepository
} from "./inspect-equipment-schema.mjs";
import { compileAndRunNativeJsonHarness } from "./native-harness.mjs";

const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/doe-measur/equipment.mjs";
const SOURCE_ID = "source:doe-measur";
const RELEASE_ID =
  `release:doe-measur:${DOE_MEASUR_COMMIT}`;
const MODEL_VERSION_ID =
  `model:doe-measur:${DOE_MEASUR_COMMIT}:equipment-v1`;
const INGESTION_ID =
  `ingestion:doe-measur:${DOE_MEASUR_COMMIT}:equipment-v1`;
const ACQUIRED_AT = "2026-07-23T00:00:00.000Z";
const ADAPTER_VERSION = "doe-measur-equipment-v1";

export const DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE =
  Object.freeze({
    motor: Object.freeze({
      lineFrequencyHz: 60,
      ratedPowerHp: 150,
      ratedSpeedRpm: 1600,
      loadFraction: 0.25,
      existingEfficiencyClass: "STANDARD",
      existingSpecifiedEfficiency: null,
      proposedEfficiencyClass: "SPECIFIED",
      proposedSpecifiedEfficiency: 0.95
    }),
    psat: Object.freeze({
      pumpStyle: "END_SUCTION_ANSI_API",
      pumpEfficiency: 0.382,
      pumpRatedSpeedRpm: 1780,
      drive: "V_BELT_DRIVE",
      driveSpecifiedEfficiency: 1,
      kinematicViscosityCentistokes: 1,
      specificGravity: 1,
      stageCount: 1,
      fixedSpeed: false,
      motorLineFrequencyHz: 60,
      motorRatedPowerHp: 200,
      motorRatedSpeedRpm: 1780,
      motorEfficiencyClass: "SPECIFIED",
      motorSpecifiedEfficiency: 0.95,
      motorRatedVoltage: 460,
      motorFullLoadAmps: 227.29,
      motorSizeMargin: 0,
      flowRateGpm: 1000,
      headFeet: 277,
      loadEstimationMethod: "POWER",
      measuredMotorPowerKw: 150,
      measuredMotorCurrentAmps: 125.857,
      measuredVoltage: 480,
      annualOperatingHours: 8760,
      utilityCostPerKwh: 0.06
    }),
    fan: Object.freeze({
      fanSpeedRpm: 1180,
      airDensityLbPerCubicFoot: 0.07024,
      drive: "DIRECT_DRIVE",
      driveSpecifiedEfficiency: 1,
      motorLineFrequencyHz: 60,
      motorRatedPowerHp: 600,
      motorRatedSpeedRpm: 1180,
      motorEfficiencyClass: "ENERGY_EFFICIENT",
      motorSpecifiedEfficiency: 0.96,
      motorRatedVoltage: 460,
      motorFullLoadAmps: 683.2505707137,
      motorSizeMargin: 1,
      existingMeasuredMotorPowerKw: 460,
      measuredVoltage: 460,
      measuredMotorCurrentAmps: 660,
      flowRateCfm: 129691,
      inletPressureInWg: -16.36,
      outletPressureInWg: 1.1,
      compressibilityFactor: 0.988,
      velocityPressureInWg: 0,
      loadEstimationMethod: "POWER",
      proposedFanEfficiency: 0.595398315,
      annualOperatingHours: 8760,
      utilityCostPerKwh: 0.06
    }),
    coolingTower: Object.freeze({
      ratedFanPowerHp: 59.5119,
      waterLeavingTemperatureF: 81.6495,
      waterEnteringTemperatureF: 87.98386,
      operatingWetBulbTemperatureF: 76,
      annualOperatingHours: 1,
      existingFanControlSpeedType: "ONE",
      proposedFanControlSpeedType: "VARIABLE"
    })
  });

const MOTOR_CLASS_VALUES = Object.freeze([
  "STANDARD",
  "ENERGY_EFFICIENT",
  "PREMIUM",
  "SPECIFIED"
]);
const MOTOR_CLASSES = new Set(MOTOR_CLASS_VALUES);
const DRIVE_VALUES = Object.freeze([
  "DIRECT_DRIVE",
  "V_BELT_DRIVE",
  "N_V_BELT_DRIVE",
  "S_BELT_DRIVE",
  "SPECIFIED"
]);
const DRIVES = new Set(DRIVE_VALUES);
const PUMP_STYLE_VALUES = Object.freeze([
  "END_SUCTION_SLURRY",
  "END_SUCTION_SEWAGE",
  "END_SUCTION_STOCK",
  "END_SUCTION_SUBMERSIBLE_SEWAGE",
  "API_DOUBLE_SUCTION",
  "MULTISTAGE_BOILER_FEED",
  "END_SUCTION_ANSI_API",
  "AXIAL_FLOW",
  "DOUBLE_SUCTION",
  "VERTICAL_TURBINE",
  "LARGE_END_SUCTION",
  "SPECIFIED_OPTIMAL_EFFICIENCY"
]);
const PUMP_STYLES = new Set(PUMP_STYLE_VALUES);
const LOAD_ESTIMATION_METHOD_VALUES =
  Object.freeze(["POWER", "CURRENT"]);
const FAN_CONTROL_SPEED_TYPE_VALUES = Object.freeze([
  "ONE",
  "TWO",
  "VARIABLE"
]);
const FAN_CONTROL_SPEED_TYPES = new Set(
  FAN_CONTROL_SPEED_TYPE_VALUES
);

function validatePositiveNumber(value, label) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(
      `INCOMPATIBLE_UNIT_OR_VALUE: ${label} must be positive`
    );
  }
}

function validateFraction(value, label, {
  allowZero = false
} = {}) {
  if (
    !Number.isFinite(value) ||
    value > 1 ||
    (allowZero ? value < 0 : value <= 0)
  ) {
    throw new Error(
      `INCOMPATIBLE_UNIT_OR_VALUE: ${label} must be ${
        allowZero ? "between zero and one" : "greater than zero and at most one"
      }`
    );
  }
}

function validateAnnualHours(value) {
  validatePositiveNumber(value, "annualOperatingHours");
  if (value > 8784) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: annualOperatingHours exceeds leap-year hours"
    );
  }
}

function validateLineFrequency(value, label) {
  if (value !== 50 && value !== 60) {
    throw new Error(
      `INCOMPATIBLE_UNIT_OR_VALUE: ${label} must be 50 or 60 Hz`
    );
  }
}

function validateMotorClass(value, specified, label) {
  if (!MOTOR_CLASSES.has(value)) {
    throw new Error(
      `INCOMPATIBLE_ENUMERATION: ${label} ${value}`
    );
  }
  if (value === "SPECIFIED") {
    validateFraction(specified, `${label}SpecifiedEfficiency`);
  } else if (specified !== null && specified !== undefined) {
    validateFraction(specified, `${label}SpecifiedEfficiency`);
  }
}

function validateDrive(value, specifiedEfficiency, label) {
  if (!DRIVES.has(value)) {
    throw new Error(
      `INCOMPATIBLE_ENUMERATION: ${label} ${value}`
    );
  }
  if (value === "SPECIFIED") {
    validateFraction(
      specifiedEfficiency,
      `${label}SpecifiedEfficiency`
    );
  } else if (
    specifiedEfficiency !== null &&
    specifiedEfficiency !== undefined
  ) {
    validateFraction(
      specifiedEfficiency,
      `${label}SpecifiedEfficiency`
    );
  }
}

function validateEquipmentInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error(
      "MISSING_REQUIRED_INPUT: MEASUR equipment input"
    );
  }
  const { motor, psat, fan, coolingTower } = input;
  if (!motor || !psat || !fan || !coolingTower) {
    throw new Error(
      "MISSING_REQUIRED_INPUT: motor, psat, fan, and coolingTower inputs are required"
    );
  }

  validateLineFrequency(
    motor.lineFrequencyHz,
    "motor.lineFrequencyHz"
  );
  validatePositiveNumber(
    motor.ratedPowerHp,
    "motor.ratedPowerHp"
  );
  validatePositiveNumber(
    motor.ratedSpeedRpm,
    "motor.ratedSpeedRpm"
  );
  validateFraction(
    motor.loadFraction,
    "motor.loadFraction"
  );
  validateMotorClass(
    motor.existingEfficiencyClass,
    motor.existingSpecifiedEfficiency,
    "motor.existingEfficiencyClass"
  );
  validateMotorClass(
    motor.proposedEfficiencyClass,
    motor.proposedSpecifiedEfficiency,
    "motor.proposedEfficiencyClass"
  );

  if (!PUMP_STYLES.has(psat.pumpStyle)) {
    throw new Error(
      `INCOMPATIBLE_ENUMERATION: psat.pumpStyle ${psat.pumpStyle}`
    );
  }
  validateFraction(psat.pumpEfficiency, "psat.pumpEfficiency");
  validatePositiveNumber(
    psat.pumpRatedSpeedRpm,
    "psat.pumpRatedSpeedRpm"
  );
  validateDrive(
    psat.drive,
    psat.driveSpecifiedEfficiency,
    "psat.drive"
  );
  validatePositiveNumber(
    psat.kinematicViscosityCentistokes,
    "psat.kinematicViscosityCentistokes"
  );
  validatePositiveNumber(
    psat.specificGravity,
    "psat.specificGravity"
  );
  if (!Number.isInteger(psat.stageCount) || psat.stageCount <= 0) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: psat.stageCount must be a positive integer"
    );
  }
  if (typeof psat.fixedSpeed !== "boolean") {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: psat.fixedSpeed must be boolean"
    );
  }
  validateLineFrequency(
    psat.motorLineFrequencyHz,
    "psat.motorLineFrequencyHz"
  );
  for (const field of [
    "motorRatedPowerHp",
    "motorRatedSpeedRpm",
    "motorRatedVoltage",
    "motorFullLoadAmps",
    "flowRateGpm",
    "headFeet",
    "measuredMotorPowerKw",
    "measuredMotorCurrentAmps",
    "measuredVoltage"
  ]) {
    validatePositiveNumber(psat[field], `psat.${field}`);
  }
  validateMotorClass(
    psat.motorEfficiencyClass,
    psat.motorSpecifiedEfficiency,
    "psat.motorEfficiencyClass"
  );
  if (
    !Number.isFinite(psat.motorSizeMargin) ||
    psat.motorSizeMargin < 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: psat.motorSizeMargin must be non-negative"
    );
  }
  if (
    !LOAD_ESTIMATION_METHOD_VALUES.includes(
      psat.loadEstimationMethod
    )
  ) {
    throw new Error(
      `INCOMPATIBLE_ENUMERATION: psat.loadEstimationMethod ${psat.loadEstimationMethod}`
    );
  }
  validateAnnualHours(psat.annualOperatingHours);
  if (
    !Number.isFinite(psat.utilityCostPerKwh) ||
    psat.utilityCostPerKwh < 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: psat.utilityCostPerKwh must be non-negative"
    );
  }

  validateDrive(
    fan.drive,
    fan.driveSpecifiedEfficiency,
    "fan.drive"
  );
  validateLineFrequency(
    fan.motorLineFrequencyHz,
    "fan.motorLineFrequencyHz"
  );
  for (const field of [
    "fanSpeedRpm",
    "airDensityLbPerCubicFoot",
    "motorRatedPowerHp",
    "motorRatedSpeedRpm",
    "motorRatedVoltage",
    "motorFullLoadAmps",
    "existingMeasuredMotorPowerKw",
    "measuredVoltage",
    "measuredMotorCurrentAmps",
    "flowRateCfm",
    "compressibilityFactor"
  ]) {
    validatePositiveNumber(fan[field], `fan.${field}`);
  }
  validateMotorClass(
    fan.motorEfficiencyClass,
    fan.motorSpecifiedEfficiency,
    "fan.motorEfficiencyClass"
  );
  if (
    !Number.isFinite(fan.motorSizeMargin) ||
    fan.motorSizeMargin < 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: fan.motorSizeMargin must be non-negative"
    );
  }
  for (const field of [
    "inletPressureInWg",
    "outletPressureInWg",
    "velocityPressureInWg"
  ]) {
    if (!Number.isFinite(fan[field])) {
      throw new Error(
        `INCOMPATIBLE_UNIT_OR_VALUE: fan.${field} must be finite`
      );
    }
  }
  if (
    !LOAD_ESTIMATION_METHOD_VALUES.includes(
      fan.loadEstimationMethod
    )
  ) {
    throw new Error(
      `INCOMPATIBLE_ENUMERATION: fan.loadEstimationMethod ${fan.loadEstimationMethod}`
    );
  }
  validateFraction(
    fan.proposedFanEfficiency,
    "fan.proposedFanEfficiency"
  );
  validateAnnualHours(fan.annualOperatingHours);
  if (
    !Number.isFinite(fan.utilityCostPerKwh) ||
    fan.utilityCostPerKwh < 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: fan.utilityCostPerKwh must be non-negative"
    );
  }
  validatePositiveNumber(
    coolingTower.ratedFanPowerHp,
    "coolingTower.ratedFanPowerHp"
  );
  for (const field of [
    "waterLeavingTemperatureF",
    "waterEnteringTemperatureF",
    "operatingWetBulbTemperatureF"
  ]) {
    if (!Number.isFinite(coolingTower[field])) {
      throw new Error(
        `INCOMPATIBLE_UNIT_OR_VALUE: coolingTower.${field} must be finite`
      );
    }
  }
  if (
    !(
      coolingTower.operatingWetBulbTemperatureF <
        coolingTower.waterLeavingTemperatureF &&
      coolingTower.waterLeavingTemperatureF <
        coolingTower.waterEnteringTemperatureF
    )
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: cooling tower temperatures must satisfy wet bulb < leaving water < entering water"
    );
  }
  validateAnnualHours(coolingTower.annualOperatingHours);
  for (const field of [
    "existingFanControlSpeedType",
    "proposedFanControlSpeedType"
  ]) {
    if (!FAN_CONTROL_SPEED_TYPES.has(coolingTower[field])) {
      throw new Error(
        `INCOMPATIBLE_ENUMERATION: coolingTower.${field} ${coolingTower[field]}`
      );
    }
  }
  return structuredClone(input);
}

function cppNumber(value) {
  if (!Number.isFinite(value)) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: non-finite MEASUR input"
    );
  }
  return Number(value).toString();
}

function enumArgument(values, value, label) {
  const index = values.indexOf(value);
  if (index < 0) {
    throw new Error(
      `INCOMPATIBLE_ENUMERATION: ${label} ${value}`
    );
  }
  return String(index);
}

const EQUIPMENT_HARNESS_SOURCE = String.raw`
#include <iomanip>
#include <iostream>
#include <stdexcept>
#include <string>
#include "calculator/motor/MotorEfficiency.h"
#include "chillers/CoolingTower.h"
#include "results/Results.h"

double numberArgument(char* argv[], int index) {
  return std::stod(argv[index]);
}

int integerArgument(char* argv[], int index) {
  return std::stoi(argv[index]);
}

Motor::LineFrequency lineFrequencyArgument(
  char* argv[],
  int index
) {
  switch (integerArgument(argv, index)) {
    case 50:
      return Motor::LineFrequency::FREQ50;
    case 60:
      return Motor::LineFrequency::FREQ60;
    default:
      throw std::invalid_argument("unsupported line frequency");
  }
}

Motor::EfficiencyClass motorClassArgument(
  char* argv[],
  int index
) {
  switch (integerArgument(argv, index)) {
    case 0:
      return Motor::EfficiencyClass::STANDARD;
    case 1:
      return Motor::EfficiencyClass::ENERGY_EFFICIENT;
    case 2:
      return Motor::EfficiencyClass::PREMIUM;
    case 3:
      return Motor::EfficiencyClass::SPECIFIED;
    default:
      throw std::invalid_argument("unsupported motor class");
  }
}

Motor::Drive driveArgument(char* argv[], int index) {
  switch (integerArgument(argv, index)) {
    case 0:
      return Motor::Drive::DIRECT_DRIVE;
    case 1:
      return Motor::Drive::V_BELT_DRIVE;
    case 2:
      return Motor::Drive::N_V_BELT_DRIVE;
    case 3:
      return Motor::Drive::S_BELT_DRIVE;
    case 4:
      return Motor::Drive::SPECIFIED;
    default:
      throw std::invalid_argument("unsupported drive");
  }
}

Pump::Style pumpStyleArgument(char* argv[], int index) {
  switch (integerArgument(argv, index)) {
    case 0:
      return Pump::Style::END_SUCTION_SLURRY;
    case 1:
      return Pump::Style::END_SUCTION_SEWAGE;
    case 2:
      return Pump::Style::END_SUCTION_STOCK;
    case 3:
      return Pump::Style::END_SUCTION_SUBMERSIBLE_SEWAGE;
    case 4:
      return Pump::Style::API_DOUBLE_SUCTION;
    case 5:
      return Pump::Style::MULTISTAGE_BOILER_FEED;
    case 6:
      return Pump::Style::END_SUCTION_ANSI_API;
    case 7:
      return Pump::Style::AXIAL_FLOW;
    case 8:
      return Pump::Style::DOUBLE_SUCTION;
    case 9:
      return Pump::Style::VERTICAL_TURBINE;
    case 10:
      return Pump::Style::LARGE_END_SUCTION;
    case 11:
      return Pump::Style::SPECIFIED_OPTIMAL_EFFICIENCY;
    default:
      throw std::invalid_argument("unsupported pump style");
  }
}

Motor::LoadEstimationMethod loadMethodArgument(
  char* argv[],
  int index
) {
  switch (integerArgument(argv, index)) {
    case 0:
      return Motor::LoadEstimationMethod::POWER;
    case 1:
      return Motor::LoadEstimationMethod::CURRENT;
    default:
      throw std::invalid_argument(
        "unsupported load estimation method"
      );
  }
}

CoolingTower::FanControlSpeedType fanControlArgument(
  char* argv[],
  int index
) {
  switch (integerArgument(argv, index)) {
    case 0:
      return CoolingTower::FanControlSpeedType::One;
    case 1:
      return CoolingTower::FanControlSpeedType::Two;
    case 2:
      return CoolingTower::FanControlSpeedType::Variable;
    default:
      throw std::invalid_argument(
        "unsupported fan control speed type"
      );
  }
}

int main(int argc, char* argv[]) {
  if (argc != 65) {
    std::cerr << "expected 64 MEASUR equipment arguments";
    return 2;
  }
  const double existingMotorEfficiency =
    MotorEfficiency(
      lineFrequencyArgument(argv, 1),
      numberArgument(argv, 2),
      motorClassArgument(argv, 3),
      numberArgument(argv, 4)
    ).calculate(
      numberArgument(argv, 5),
      numberArgument(argv, 6)
    );
  const double proposedMotorEfficiency =
    MotorEfficiency(
      lineFrequencyArgument(argv, 1),
      numberArgument(argv, 2),
      motorClassArgument(argv, 7),
      numberArgument(argv, 4)
    ).calculate(
      numberArgument(argv, 5),
      numberArgument(argv, 8)
    );

  Pump::Input pump(
    pumpStyleArgument(argv, 9),
    numberArgument(argv, 10),
    numberArgument(argv, 11),
    driveArgument(argv, 12),
    numberArgument(argv, 13),
    numberArgument(argv, 14),
    integerArgument(argv, 15),
    integerArgument(argv, 16)
      ? Pump::SpecificSpeed::FIXED_SPEED
      : Pump::SpecificSpeed::NOT_FIXED_SPEED,
    numberArgument(argv, 17)
  );
  Motor pumpMotor(
    lineFrequencyArgument(argv, 18),
    numberArgument(argv, 19),
    numberArgument(argv, 20),
    motorClassArgument(argv, 21),
    numberArgument(argv, 22),
    numberArgument(argv, 23),
    numberArgument(argv, 24),
    numberArgument(argv, 25)
  );
  Pump::FieldData pumpFieldData(
    numberArgument(argv, 26),
    numberArgument(argv, 27),
    loadMethodArgument(argv, 28),
    numberArgument(argv, 29),
    numberArgument(argv, 30),
    numberArgument(argv, 31)
  );
  PSATResult psatResult(
    pump,
    pumpMotor,
    pumpFieldData,
    numberArgument(argv, 32),
    numberArgument(argv, 33)
  );
  const auto pumpExisting = psatResult.calculateExisting();
  const auto pumpProposed = psatResult.calculateModified();

  Fan::Input fanInput(
    numberArgument(argv, 34),
    numberArgument(argv, 35),
    driveArgument(argv, 36),
    numberArgument(argv, 37)
  );
  Motor fanMotor(
    lineFrequencyArgument(argv, 38),
    numberArgument(argv, 39),
    numberArgument(argv, 40),
    motorClassArgument(argv, 41),
    numberArgument(argv, 42),
    numberArgument(argv, 43),
    numberArgument(argv, 44),
    numberArgument(argv, 45)
  );
  Fan::FieldDataBaseline fanExistingInput(
    numberArgument(argv, 46),
    numberArgument(argv, 47),
    numberArgument(argv, 48),
    numberArgument(argv, 49),
    numberArgument(argv, 50),
    numberArgument(argv, 51),
    numberArgument(argv, 52),
    loadMethodArgument(argv, 53),
    numberArgument(argv, 54)
  );
  Fan::FieldDataModified fanProposedInput(
    numberArgument(argv, 47),
    numberArgument(argv, 48),
    numberArgument(argv, 49),
    numberArgument(argv, 50),
    numberArgument(argv, 51),
    numberArgument(argv, 52),
    numberArgument(argv, 54)
  );
  FanResult fanResult(
    fanInput,
    fanMotor,
    numberArgument(argv, 56),
    numberArgument(argv, 57)
  );
  const auto fanExisting =
    fanResult.calculateExisting(fanExistingInput);
  const auto fanProposed =
    fanResult.calculateModified(
      fanProposedInput,
      numberArgument(argv, 55)
    );
  const auto coolingTowerFan =
    CoolingTower::FanEnergyConsumption(
      numberArgument(argv, 58),
      numberArgument(argv, 59),
      numberArgument(argv, 60),
      numberArgument(argv, 61),
      numberArgument(argv, 62),
      fanControlArgument(argv, 63),
      fanControlArgument(argv, 64)
    );

  std::cout << std::setprecision(17)
    << "{\"motor\":{\"existingEfficiency\":"
    << existingMotorEfficiency
    << ",\"proposedEfficiency\":"
    << proposedMotorEfficiency
    << "},\"psat\":{\"existingInputKw\":"
    << pumpExisting.motorPower
    << ",\"proposedInputKw\":"
    << pumpProposed.motorPower
    << ",\"existingPumpEfficiency\":"
    << pumpExisting.pumpEfficiency
    << ",\"proposedPumpEfficiency\":"
    << pumpProposed.pumpEfficiency
    << ",\"existingAnnualEnergyMwh\":"
    << pumpExisting.annualEnergy
    << ",\"proposedAnnualEnergyMwh\":"
    << pumpProposed.annualEnergy
    << "},\"fan\":{\"existingInputKw\":"
    << fanExisting.motorPower
    << ",\"proposedInputKw\":"
    << fanProposed.motorPower
    << ",\"existingFanEfficiency\":"
    << fanExisting.fanEfficiency
    << ",\"proposedFanEfficiency\":"
    << fanProposed.fanEfficiency
    << ",\"existingAnnualEnergyMwh\":"
    << fanExisting.annualEnergy
    << ",\"proposedAnnualEnergyMwh\":"
    << fanProposed.annualEnergy
    << "},\"coolingTower\":{\"existingFanPowerHp\":"
    << coolingTowerFan.baselinePower
    << ",\"existingFanEnergyKwh\":"
    << coolingTowerFan.baselineEnergy
    << ",\"proposedFanPowerHp\":"
    << coolingTowerFan.modPower
    << ",\"proposedFanEnergyKwh\":"
    << coolingTowerFan.modEnergy
    << ",\"avoidedFanEnergyKwh\":"
    << coolingTowerFan.savingsEnergy
    << "}}";
  return 0;
}
`;

function buildEquipmentHarnessArguments(input) {
  const { motor, psat, fan, coolingTower } = input;
  return [
    cppNumber(motor.lineFrequencyHz),
    cppNumber(motor.ratedSpeedRpm),
    enumArgument(
      MOTOR_CLASS_VALUES,
      motor.existingEfficiencyClass,
      "motor.existingEfficiencyClass"
    ),
    cppNumber(motor.ratedPowerHp),
    cppNumber(motor.loadFraction),
    cppNumber(motor.existingSpecifiedEfficiency ?? -1),
    enumArgument(
      MOTOR_CLASS_VALUES,
      motor.proposedEfficiencyClass,
      "motor.proposedEfficiencyClass"
    ),
    cppNumber(motor.proposedSpecifiedEfficiency ?? -1),
    enumArgument(
      PUMP_STYLE_VALUES,
      psat.pumpStyle,
      "psat.pumpStyle"
    ),
    cppNumber(psat.pumpEfficiency),
    cppNumber(psat.pumpRatedSpeedRpm),
    enumArgument(DRIVE_VALUES, psat.drive, "psat.drive"),
    cppNumber(psat.kinematicViscosityCentistokes),
    cppNumber(psat.specificGravity),
    cppNumber(psat.stageCount),
    psat.fixedSpeed ? "1" : "0",
    cppNumber(psat.driveSpecifiedEfficiency),
    cppNumber(psat.motorLineFrequencyHz),
    cppNumber(psat.motorRatedPowerHp),
    cppNumber(psat.motorRatedSpeedRpm),
    enumArgument(
      MOTOR_CLASS_VALUES,
      psat.motorEfficiencyClass,
      "psat.motorEfficiencyClass"
    ),
    cppNumber(psat.motorSpecifiedEfficiency ?? -1),
    cppNumber(psat.motorRatedVoltage),
    cppNumber(psat.motorFullLoadAmps),
    cppNumber(psat.motorSizeMargin),
    cppNumber(psat.flowRateGpm),
    cppNumber(psat.headFeet),
    enumArgument(
      LOAD_ESTIMATION_METHOD_VALUES,
      psat.loadEstimationMethod,
      "psat.loadEstimationMethod"
    ),
    cppNumber(psat.measuredMotorPowerKw),
    cppNumber(psat.measuredMotorCurrentAmps),
    cppNumber(psat.measuredVoltage),
    cppNumber(psat.annualOperatingHours),
    cppNumber(psat.utilityCostPerKwh),
    cppNumber(fan.fanSpeedRpm),
    cppNumber(fan.airDensityLbPerCubicFoot),
    enumArgument(DRIVE_VALUES, fan.drive, "fan.drive"),
    cppNumber(fan.driveSpecifiedEfficiency),
    cppNumber(fan.motorLineFrequencyHz),
    cppNumber(fan.motorRatedPowerHp),
    cppNumber(fan.motorRatedSpeedRpm),
    enumArgument(
      MOTOR_CLASS_VALUES,
      fan.motorEfficiencyClass,
      "fan.motorEfficiencyClass"
    ),
    cppNumber(fan.motorSpecifiedEfficiency ?? -1),
    cppNumber(fan.motorRatedVoltage),
    cppNumber(fan.motorFullLoadAmps),
    cppNumber(fan.motorSizeMargin),
    cppNumber(fan.existingMeasuredMotorPowerKw),
    cppNumber(fan.measuredVoltage),
    cppNumber(fan.measuredMotorCurrentAmps),
    cppNumber(fan.flowRateCfm),
    cppNumber(fan.inletPressureInWg),
    cppNumber(fan.outletPressureInWg),
    cppNumber(fan.compressibilityFactor),
    enumArgument(
      LOAD_ESTIMATION_METHOD_VALUES,
      fan.loadEstimationMethod,
      "fan.loadEstimationMethod"
    ),
    cppNumber(fan.velocityPressureInWg),
    cppNumber(fan.proposedFanEfficiency),
    cppNumber(fan.annualOperatingHours),
    cppNumber(fan.utilityCostPerKwh),
    cppNumber(coolingTower.ratedFanPowerHp),
    cppNumber(coolingTower.waterLeavingTemperatureF),
    cppNumber(coolingTower.waterEnteringTemperatureF),
    cppNumber(coolingTower.operatingWetBulbTemperatureF),
    cppNumber(coolingTower.annualOperatingHours),
    enumArgument(
      FAN_CONTROL_SPEED_TYPE_VALUES,
      coolingTower.existingFanControlSpeedType,
      "coolingTower.existingFanControlSpeedType"
    ),
    enumArgument(
      FAN_CONTROL_SPEED_TYPE_VALUES,
      coolingTower.proposedFanControlSpeedType,
      "coolingTower.proposedFanControlSpeedType"
    )
  ];
}

function assertNumericOutput(actual, expected, path) {
  if (
    !Number.isFinite(actual) ||
    Math.abs(actual - expected) >
      Math.max(1e-9, Math.abs(expected) * 1e-10)
  ) {
    throw new Error(
      `NATIVE_GOLDEN_MISMATCH: ${path} expected ${expected}, received ${actual}`
    );
  }
}

function assertEquipmentGoldenOutput(output) {
  const expected = {
    motor: {
      existingEfficiency: 0.8867837736,
      proposedEfficiency: 0.9226247725
    },
    psat: {
      existingInputKw: 150,
      proposedInputKw: 149.6401247588,
      existingPumpEfficiency: 0.381094253534,
      proposedPumpEfficiency: 0.382,
      existingAnnualEnergyMwh: 1314,
      proposedAnnualEnergyMwh: 1310.8474928874
    },
    fan: {
      existingInputKw: 460,
      proposedInputKw: 460.0001440224,
      existingFanEfficiency: 0.595398315,
      proposedFanEfficiency: 0.595398315,
      existingAnnualEnergyMwh: 4029.6,
      proposedAnnualEnergyMwh: 4029.6012616363
    },
    coolingTower: {
      existingFanPowerHp: 55.14996187617361,
      existingFanEnergyKwh: 41.141871559625514,
      proposedFanPowerHp: 44.78961473708352,
      proposedFanEnergyKwh: 33.41305259386431,
      avoidedFanEnergyKwh: 7.7288189657612065
    }
  };
  for (const [moduleName, fields] of Object.entries(expected)) {
    for (const [field, expectedValue] of Object.entries(fields)) {
      assertNumericOutput(
        output?.[moduleName]?.[field],
        expectedValue,
        `${moduleName}.${field}`
      );
    }
  }
}

export async function runDoeMeasurEquipmentGolden({
  repositoryPath,
  compiler = process.env.MEASUR_CXX || "/usr/bin/clang++",
  input = DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE
}) {
  assertNetworkDisabled();
  const normalizedInput = validateEquipmentInput(input);
  const inspection =
    await inspectDoeMeasurEquipmentRepository(repositoryPath);
  const nativeExecution =
    await compileAndRunNativeJsonHarness({
      repositoryPath,
      compiler,
      harnessSource: EQUIPMENT_HARNESS_SOURCE,
      sourceFiles: DOE_MEASUR_EQUIPMENT_SOURCE_FILES,
      executionArgs:
        buildEquipmentHarnessArguments(normalizedInput),
      workspacePrefix: "retrofi-measur-equipment-proof-",
      compileFailureLabel:
        "MEASUR_EQUIPMENT_NATIVE_COMPILE_FAILED",
      executionFailureLabel:
        "MEASUR_EQUIPMENT_NATIVE_EXECUTION_FAILED"
    });
  if (
    JSON.stringify(normalizedInput) ===
    JSON.stringify(DOE_MEASUR_EQUIPMENT_GOLDEN_FIXTURE)
  ) {
    assertEquipmentGoldenOutput(
      nativeExecution.nativeOutput
    );
  }
  const result = {
    sourceCommit: DOE_MEASUR_COMMIT,
    calculators: [
      "MotorEfficiency",
      "PSATResult",
      "FanResult",
      "CoolingTower::FanEnergyConsumption"
    ],
    compilerVersion: nativeExecution.compilerVersion,
    executableSha256:
      nativeExecution.executableSha256,
    networkMode: nativeExecution.networkMode,
    nativeInput: normalizedInput,
    nativeOutput: nativeExecution.nativeOutput,
    sourceSchemaFingerprintSha256:
      inspection.schemaFingerprintSha256,
    adapterPath: ADAPTER_PATH
  };
  const deterministicResult = {
    sourceCommit: result.sourceCommit,
    calculators: result.calculators,
    nativeInput: result.nativeInput,
    nativeOutput: result.nativeOutput,
    sourceSchemaFingerprintSha256:
      result.sourceSchemaFingerprintSha256,
    adapterPath: result.adapterPath
  };
  return {
    inspection,
    result,
    resultFingerprintSha256:
      sha256Json(deterministicResult)
  };
}

const ARTIFACT_IDS = Object.freeze({
  motorHeader:
    "artifact:doe-measur-motor-efficiency-header-bdc33b83",
  motorSource:
    "artifact:doe-measur-motor-efficiency-source-bdc33b83",
  motorBinding:
    "artifact:doe-measur-motor-wasm-binding-bdc33b83",
  motorGoldenTest:
    "artifact:doe-measur-motor-efficiency-golden-bdc33b83",
  inputDataHeader:
    "artifact:doe-measur-equipment-input-header-bdc33b83",
  resultsHeader:
    "artifact:doe-measur-equipment-results-header-bdc33b83",
  resultsSource:
    "artifact:doe-measur-equipment-results-source-bdc33b83",
  psatBinding:
    "artifact:doe-measur-psat-wasm-binding-bdc33b83",
  fanBinding:
    "artifact:doe-measur-fan-wasm-binding-bdc33b83",
  coolingTowerHeader:
    "artifact:doe-measur-cooling-tower-header-bdc33b83",
  coolingTowerBinding:
    "artifact:doe-measur-cooling-tower-wasm-binding-bdc33b83",
  coolingTowerGoldenTest:
    "artifact:doe-measur-cooling-tower-golden-bdc33b83",
  resultsGoldenTest:
    "artifact:doe-measur-equipment-results-golden-bdc33b83"
});

function sourceUrlFor(key) {
  return `${DOE_MEASUR_REPOSITORY_URL}/blob/${DOE_MEASUR_COMMIT}/${DOE_MEASUR_EQUIPMENT_PINNED_FILES[key].relativePath}`;
}

function equipmentSourceProof(
  execution,
  status,
  recordsRead = 0,
  recordsWritten = 0
) {
  const artifact =
    execution.inspection.artifacts.resultsGoldenTest;
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-DOE-MEASUR",
      organization:
        "Oak Ridge National Laboratory Advanced Manufacturing Office",
      name: "AMO Tools Suite",
      primaryUrl: DOE_MEASUR_REPOSITORY_URL,
      license: "BSD-3-Clause",
      attribution:
        "Oak Ridge National Laboratory AMO Tools Suite",
      accessMode: "PUBLIC_GIT_CLONE"
    },
    schema: {
      id: DOE_MEASUR_SOURCE_SCHEMA_ID,
      fingerprintSha256:
        DOE_MEASUR_SOURCE_SCHEMA_FINGERPRINT_SHA256,
      kind: DOE_MEASUR_SOURCE_SCHEMA.format,
      observed: DOE_MEASUR_SOURCE_SCHEMA,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: RELEASE_ID,
      version: `Git commit ${DOE_MEASUR_COMMIT}`,
      publishedAt: null,
      acquiredAt: ACQUIRED_AT,
      status
    },
    artifact: {
      id: ARTIFACT_IDS.resultsGoldenTest,
      sourceUrl: sourceUrlFor("resultsGoldenTest"),
      localName: basename(
        DOE_MEASUR_EQUIPMENT_PINNED_FILES
          .resultsGoldenTest.relativePath
      ),
      mediaType: "text/x-c++src",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: ADAPTER_VERSION,
      startedAt: ACQUIRED_AT,
      finishedAt:
        status === "PUBLISHED" ? ACQUIRED_AT : null,
      status:
        status === "PUBLISHED" ? "SUCCEEDED" : "RUNNING",
      recordsRead,
      recordsWritten,
      warningCount: status === "PUBLISHED" ? 4 : 0
    }
  };
}

function upsertEquipmentArtifacts(database, execution) {
  const insertArtifact = database.prepare(`
    INSERT INTO source_artifacts (
      id, release_id, source_url, local_name, media_type,
      byte_size, sha256, acquired_at, official
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT(id) DO UPDATE SET
      byte_size = excluded.byte_size,
      sha256 = excluded.sha256
  `);
  const insertChecksum = database.prepare(`
    INSERT INTO source_checksums (
      artifact_id, algorithm, digest, observed_at
    ) VALUES (?, 'sha256', ?, ?)
    ON CONFLICT(artifact_id, algorithm) DO UPDATE SET
      digest = excluded.digest,
      observed_at = excluded.observed_at
  `);
  for (const [key, artifact] of Object.entries(
    execution.inspection.artifacts
  )) {
    const expected =
      DOE_MEASUR_EQUIPMENT_PINNED_FILES[key];
    insertArtifact.run(
      ARTIFACT_IDS[key],
      RELEASE_ID,
      sourceUrlFor(key),
      basename(expected.relativePath),
      key.endsWith("Header")
        ? "text/x-c++hdr"
        : "text/x-c++src",
      artifact.byteSize,
      artifact.sha256,
      ACQUIRED_AT
    );
    insertChecksum.run(
      ARTIFACT_IDS[key],
      artifact.sha256,
      ACQUIRED_AT
    );
  }
}

function buildModuleProvenance({
  execution,
  artifactKey,
  sourceFields,
  filters,
  transformation
}) {
  return buildProvenance({
    standardId: "STD-DOE-MEASUR",
    artifact: execution.inspection.artifacts[artifactKey],
    sourceVersion: `Git commit ${DOE_MEASUR_COMMIT}`,
    sourceFields,
    filters: {
      ...filters,
      sourceCommit: DOE_MEASUR_COMMIT
    },
    transformation,
    adapterPath: ADAPTER_PATH
  });
}

export function mapDoeMeasurMotorToItc38(execution) {
  assertNetworkDisabled();
  const { motor } = execution.result.nativeOutput;
  if (
    !Number.isFinite(motor.existingEfficiency) ||
    !Number.isFinite(motor.proposedEfficiency) ||
    motor.existingEfficiency <= 0 ||
    motor.existingEfficiency > 1 ||
    motor.proposedEfficiency <= 0 ||
    motor.proposedEfficiency > 1
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: MEASUR motor efficiency output mapping"
    );
  }
  const nativeInput = execution.result.nativeInput.motor;
  return {
    standardId: "STD-DOE-MEASUR",
    categoryId: "ITC-38",
    processKey: "doe_measur",
    formulaBindings: [
      {
        outputName: "Existing motor efficiency",
        formulaTerm: "η_existing",
        value: motor.existingEfficiency,
        unit: "fraction",
        scope: "PER_EQUIPMENT_UNIT"
      },
      {
        outputName: "Proposed motor efficiency",
        formulaTerm: "η_proposed",
        value: motor.proposedEfficiency,
        unit: "fraction",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    selectionRule:
      "EXACT_REVIEWED_MOTOR_CLASSES_AND_PINNED_NATIVE_MODEL",
    provenance: buildModuleProvenance({
      execution,
      artifactKey: "motorGoldenTest",
      sourceFields: [
        "MotorEfficiency.lineFrequency",
        "MotorEfficiency.motorRpm",
        "MotorEfficiency.efficiencyClass",
        "MotorEfficiency.motorRatedPower",
        "MotorEfficiency.calculate.loadFactor",
        "MotorEfficiency.calculate.specifiedEfficiency"
      ],
      filters: nativeInput,
      transformation:
        "Compile and execute the pinned native MotorEfficiency calculator for the exact existing and proposed motor classes at the same rated power, speed, and load fraction. Map its two fractional efficiencies directly to η_existing and η_proposed."
    })
  };
}

export function mapDoeMeasurCoolingTowerToItc36(
  execution
) {
  assertNetworkDisabled();
  const { coolingTower } = execution.result.nativeOutput;
  if (
    !Number.isFinite(coolingTower.avoidedFanEnergyKwh)
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: MEASUR cooling tower output mapping"
    );
  }
  const nativeInput =
    execution.result.nativeInput.coolingTower;
  return {
    standardId: "STD-DOE-MEASUR",
    categoryId: "ITC-36",
    processKey: "doe_measur",
    formulaBindings: [
      {
        outputName:
          "Annual avoided cooling-tower fan electricity",
        formulaTerm: "avoided_fan_kWh",
        value: coolingTower.avoidedFanEnergyKwh,
        unit: "kWh/year",
        scope: "PROJECT_TOTAL"
      }
    ],
    selectionRule:
      "EXACT_REVIEWED_COOLING_TOWER_CONTROL_PROFILES_AND_PINNED_NATIVE_MODEL",
    provenance: buildModuleProvenance({
      execution,
      artifactKey: "coolingTowerGoldenTest",
      sourceFields: [
        "CoolingTower.FanEnergyConsumption.ratedFanPower",
        "CoolingTower.FanEnergyConsumption.waterLeavingTemp",
        "CoolingTower.FanEnergyConsumption.waterEnteringTemp",
        "CoolingTower.FanEnergyConsumption.operatingTempWetBulb",
        "CoolingTower.FanEnergyConsumption.operatingHours",
        "CoolingTower.FanEnergyConsumption.baselineSpeedType",
        "CoolingTower.FanEnergyConsumption.modSpeedType",
        "CoolingTower.PowerEnergyConsumptionOutput.savingsEnergy"
      ],
      filters: nativeInput,
      transformation:
        "Compile and execute the pinned native CoolingTower::FanEnergyConsumption calculator for exact existing and proposed fan-control profiles. Map its native savingsEnergy output directly to avoided_fan_kWh."
    })
  };
}

export function mapDoeMeasurPsatToItc40(execution) {
  assertNetworkDisabled();
  const { psat } = execution.result.nativeOutput;
  if (
    !Number.isFinite(psat.existingInputKw) ||
    !Number.isFinite(psat.proposedInputKw) ||
    psat.existingInputKw <= 0 ||
    psat.proposedInputKw <= 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: MEASUR PSAT output mapping"
    );
  }
  const nativeInput = execution.result.nativeInput.psat;
  return {
    standardId: "STD-DOE-MEASUR",
    categoryId: "ITC-40",
    processKey: "doe_measur",
    formulaBindings: [
      {
        outputName: "Existing pump input power",
        formulaTerm: "existing_input_kW",
        value: psat.existingInputKw,
        unit: "kW",
        scope: "PER_EQUIPMENT_UNIT"
      },
      {
        outputName: "Proposed pump input power",
        formulaTerm: "proposed_input_kW",
        value: psat.proposedInputKw,
        unit: "kW",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    selectionRule:
      "EXACT_REVIEWED_PUMP_DUTY_AND_PINNED_PSAT_MODEL",
    provenance: buildModuleProvenance({
      execution,
      artifactKey: "resultsGoldenTest",
      sourceFields: [
        "Pump::Input",
        "Motor",
        "Pump::FieldData",
        "PSATResult.calculateExisting.motorPower",
        "PSATResult.calculateModified.motorPower"
      ],
      filters: nativeInput,
      transformation:
        "Compile and execute the pinned native PSATResult baseline and modified cases using the same exact flow and head duty. Map the native existing and modified motorPower outputs directly to existing_input_kW and proposed_input_kW."
    })
  };
}

export function mapDoeMeasurFanToItc41(execution) {
  assertNetworkDisabled();
  const { fan } = execution.result.nativeOutput;
  if (
    !Number.isFinite(fan.existingInputKw) ||
    !Number.isFinite(fan.proposedInputKw) ||
    fan.existingInputKw <= 0 ||
    fan.proposedInputKw <= 0
  ) {
    throw new Error(
      "INCOMPATIBLE_UNIT_OR_VALUE: MEASUR fan output mapping"
    );
  }
  const nativeInput = execution.result.nativeInput.fan;
  return {
    standardId: "STD-DOE-MEASUR",
    categoryId: "ITC-41",
    processKey: "doe_measur",
    formulaBindings: [
      {
        outputName: "Existing fan input power",
        formulaTerm: "existing_input_kW",
        value: fan.existingInputKw,
        unit: "kW",
        scope: "PER_EQUIPMENT_UNIT"
      },
      {
        outputName: "Proposed fan input power",
        formulaTerm: "proposed_input_kW",
        value: fan.proposedInputKw,
        unit: "kW",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    selectionRule:
      "EXACT_REVIEWED_FAN_DUTY_AND_PINNED_FSAT_MODEL",
    provenance: buildModuleProvenance({
      execution,
      artifactKey: "resultsGoldenTest",
      sourceFields: [
        "Fan::Input",
        "Motor",
        "Fan::FieldDataBaseline",
        "Fan::FieldDataModified",
        "FanResult.calculateExisting.motorPower",
        "FanResult.calculateModified.motorPower"
      ],
      filters: nativeInput,
      transformation:
        "Compile and execute the pinned native FanResult baseline and modified cases using the same exact airflow and pressure duty. Map the native existing and modified motorPower outputs directly to existing_input_kW and proposed_input_kW."
    })
  };
}

function insertModelInputSchema(
  database,
  id,
  moduleName,
  schema
) {
  database.prepare(`
    INSERT INTO model_input_schemas (
      id, model_version_id, module_name,
      fingerprint_sha256, schema_json
    ) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      fingerprint_sha256 = excluded.fingerprint_sha256,
      schema_json = excluded.schema_json
  `).run(
    id,
    MODEL_VERSION_ID,
    moduleName,
    sha256Json(schema),
    JSON.stringify(schema)
  );
}

function insertMappedCalculation(
  database,
  execution,
  mapping,
  moduleInput,
  moduleOutput,
  artifactId
) {
  const calculationId =
    `calculation:doe-measur:${DOE_MEASUR_COMMIT}:${mapping.categoryId.toLowerCase()}:${sha256Json(
      moduleInput
    ).slice(0, 16)}`;
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id,
      model_version_id, adapter_version, input_sha256,
      output_sha256, network_disabled, status, created_at
    ) VALUES (
      ?, 'STD-DOE-MEASUR', ?, ?, ?, ?, ?, ?,
      1, 'SUCCEEDED', ?
    )
    ON CONFLICT(id) DO UPDATE SET
      output_sha256 = excluded.output_sha256,
      status = excluded.status
  `).run(
    calculationId,
    mapping.processKey,
    RELEASE_ID,
    MODEL_VERSION_ID,
    ADAPTER_VERSION,
    sha256Json(moduleInput),
    sha256Json(moduleOutput),
    ACQUIRED_AT
  );
  const insertSelectedValue = database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value,
      value_json, unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit,
      scope = excluded.scope,
      selection_rule = excluded.selection_rule
  `);
  const insertProvenance = database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id,
      source_fields_json, filters_json, transformation,
      adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `);
  const selectedValueIds = [];
  for (const binding of mapping.formulaBindings) {
    const selectedValueId =
      `${calculationId}:${binding.formulaTerm}`;
    insertSelectedValue.run(
      selectedValueId,
      calculationId,
      binding.formulaTerm,
      binding.value,
      binding.unit,
      binding.scope,
      mapping.selectionRule
    );
    insertProvenance.run(
      selectedValueId,
      artifactId,
      JSON.stringify(mapping.provenance.sourceFields),
      JSON.stringify(mapping.provenance.filters),
      mapping.provenance.transformation,
      mapping.provenance.adapterPath
    );
    selectedValueIds.push(selectedValueId);
  }
  database.prepare(`
    INSERT INTO calculation_warnings (
      id, calculation_run_id, code, message, severity
    ) VALUES (?, ?, 'EXACT_MODULE_BOUNDARY', ?, 'INFO')
    ON CONFLICT(id) DO UPDATE SET
      message = excluded.message,
      severity = excluded.severity
  `).run(
    `${calculationId}:warning:exact-module-boundary`,
    calculationId,
    "This proof covers exact reviewed source-native module inputs. Other equipment configurations require the same field, unit, scope, and compatibility validation before execution."
  );
  return {
    calculationId,
    selectedValueIds
  };
}

export function publishDoeMeasurEquipmentProof(
  database,
  execution,
  mappings = [
    mapDoeMeasurCoolingTowerToItc36(execution),
    mapDoeMeasurMotorToItc38(execution),
    mapDoeMeasurPsatToItc40(execution),
    mapDoeMeasurFanToItc41(execution)
  ]
) {
  assertNetworkDisabled();
  upsertSourceProof(
    database,
    equipmentSourceProof(execution, "INSPECTED")
  );
  upsertEquipmentArtifacts(database, execution);
  const mappingsByCategory = new Map(
    mappings.map((mapping) => [
      mapping.categoryId,
      mapping
    ])
  );
  for (const categoryId of [
    "ITC-36",
    "ITC-38",
    "ITC-40",
    "ITC-41"
  ]) {
    if (!mappingsByCategory.has(categoryId)) {
      throw new Error(
        `MISSING_REQUIRED_INPUT: mapping for ${categoryId}`
      );
    }
  }

  database.exec("BEGIN IMMEDIATE");
  let publications;
  try {
    database.prepare(`
      INSERT INTO model_versions (
        id, standard_id, package_name, version,
        commit_sha, executable_sha256
      ) VALUES (
        ?, 'STD-DOE-MEASUR', 'AMO-Tools-Suite-equipment-harness',
        ?, ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        executable_sha256 = excluded.executable_sha256
    `).run(
      MODEL_VERSION_ID,
      `git-${DOE_MEASUR_COMMIT}-equipment-v1`,
      DOE_MEASUR_COMMIT,
      execution.result.executableSha256
    );
    insertModelInputSchema(
      database,
      `schema-input:doe-measur:${DOE_MEASUR_COMMIT}:cooling-tower-fan-v1`,
      "CoolingTower::FanEnergyConsumption",
      {
        nativeInterface:
          execution.inspection.nativeInterfaces.modules
            .coolingTowerFan,
        supportedBoundary:
          "Exact rated fan power, water temperatures, wet-bulb temperature, annual operating hours, and existing and proposed fan-control speed types"
      }
    );
    insertModelInputSchema(
      database,
      `schema-input:doe-measur:${DOE_MEASUR_COMMIT}:motor-efficiency-v1`,
      "MotorEfficiency",
      {
        nativeInterface:
          execution.inspection.nativeInterfaces.modules
            .motorEfficiency,
        supportedBoundary:
          "Exact existing and proposed motor class, rated power, rated speed, load fraction, line frequency, and specified efficiency when applicable"
      }
    );
    insertModelInputSchema(
      database,
      `schema-input:doe-measur:${DOE_MEASUR_COMMIT}:psat-v1`,
      "PSATResult",
      {
        nativeInterface:
          execution.inspection.nativeInterfaces.modules.psat,
        supportedBoundary:
          "Exact pump hydraulic duty, pump and motor specifications, measured motor state, drive, and operating hours"
      }
    );
    insertModelInputSchema(
      database,
      `schema-input:doe-measur:${DOE_MEASUR_COMMIT}:fan-result-v1`,
      "FanResult",
      {
        nativeInterface:
          execution.inspection.nativeInterfaces.modules
            .fanSystemAssessment,
        supportedBoundary:
          "Exact fan airflow and pressure duty, fan and motor specifications, measured motor state, drive, and operating hours"
      }
    );

    const inputs = execution.result.nativeInput;
    const outputs = execution.result.nativeOutput;
    publications = [
      insertMappedCalculation(
        database,
        execution,
        mappingsByCategory.get("ITC-36"),
        inputs.coolingTower,
        outputs.coolingTower,
        ARTIFACT_IDS.coolingTowerGoldenTest
      ),
      insertMappedCalculation(
        database,
        execution,
        mappingsByCategory.get("ITC-38"),
        inputs.motor,
        outputs.motor,
        ARTIFACT_IDS.motorGoldenTest
      ),
      insertMappedCalculation(
        database,
        execution,
        mappingsByCategory.get("ITC-40"),
        inputs.psat,
        outputs.psat,
        ARTIFACT_IDS.resultsGoldenTest
      ),
      insertMappedCalculation(
        database,
        execution,
        mappingsByCategory.get("ITC-41"),
        inputs.fan,
        outputs.fan,
        ARTIFACT_IDS.resultsGoldenTest
      )
    ];
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  upsertSourceProof(
    database,
    equipmentSourceProof(execution, "PUBLISHED", 13, 16)
  );
  upsertEquipmentArtifacts(database, execution);
  return {
    modelVersionId: MODEL_VERSION_ID,
    calculations: publications,
    mappings,
    selectedValueIds: publications.flatMap(
      (publication) => publication.selectedValueIds
    ),
    normalizedTargets: [
      "model_versions",
      "model_input_schemas",
      "calculation_runs",
      "selected_values",
      "selected_value_provenance",
      "calculation_warnings"
    ]
  };
}
