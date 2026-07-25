import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import {
  DOE_MEASUR_COMMIT,
  verifyDoeMeasurCommit
} from "./inspect-schema.mjs";

export const DOE_MEASUR_EQUIPMENT_PINNED_FILES =
  Object.freeze({
    motorHeader: Object.freeze({
      relativePath:
        "include/calculator/motor/MotorEfficiency.h",
      byteSize: 4980,
      sha256:
        "b8358ae3de587612b9201b0a76a404713ab674b929c03b48c05f0b5d3cd0ae44"
    }),
    motorSource: Object.freeze({
      relativePath:
        "src/calculator/motor/MotorEfficiency.cpp",
      byteSize: 18191,
      sha256:
        "7ed153335acf34bc60d254794c0f6fb1d31b76375332b416dabdefec714d7ca4"
    }),
    motorBinding: Object.freeze({
      relativePath: "bindings-wasm/motor/motor.cpp",
      byteSize: 3833,
      sha256:
        "462052610fa35c44fef637f39860c1f08507d62e12073e076f6731502c2a96a7"
    }),
    motorGoldenTest: Object.freeze({
      relativePath: "tests/cpp/MotorEfficiency.unit.cpp",
      byteSize: 9398,
      sha256:
        "138755fe18e80171a4d55bf395c66dc90c08a9b9a507b9a70d9da47e9e9c61de"
    }),
    inputDataHeader: Object.freeze({
      relativePath: "include/results/InputData.h",
      byteSize: 7237,
      sha256:
        "65cebff9a506cafdaf315ab54329aa3f154eec89d98bd27534e6970faa4201f4"
    }),
    resultsHeader: Object.freeze({
      relativePath: "include/results/Results.h",
      byteSize: 10533,
      sha256:
        "9ef8f23670b0992397870794d3dc81cd591ef040f1e9edb981849782ecdf5707"
    }),
    resultsSource: Object.freeze({
      relativePath: "src/results/Results.cpp",
      byteSize: 11627,
      sha256:
        "1e03e970a91cb8e8a614c687723f4e2171d6eb8a1c1695da6bed225ef870ab66"
    }),
    psatBinding: Object.freeze({
      relativePath: "bindings-wasm/psat/psat.cpp",
      byteSize: 12915,
      sha256:
        "3238cdfb3cbe5c6f11127a0a55423ad28d3d171b17fbc337187e39ec1f4409d3"
    }),
    fanBinding: Object.freeze({
      relativePath: "bindings-wasm/fan/fan.cpp",
      byteSize: 8624,
      sha256:
        "042939184ae2150f3abc6332dbee4129e1061d782a311221fdb08cec7ad12735"
    }),
    coolingTowerHeader: Object.freeze({
      relativePath: "include/chillers/CoolingTower.h",
      byteSize: 26423,
      sha256:
        "706a4cc50d735d800a166763ec385c0af58b077861ee792eefee84d023d4741a"
    }),
    coolingTowerBinding: Object.freeze({
      relativePath: "bindings-wasm/chillers.cpp",
      byteSize: 4905,
      sha256:
        "62fb82f924b545eefa5782cae3d0e44b2b71ab3134bec792e4babddcd2650505"
    }),
    coolingTowerGoldenTest: Object.freeze({
      relativePath: "tests/cpp/CoolingTower.unit.cpp",
      byteSize: 10999,
      sha256:
        "7d12e9af8c96b841ab11ed9b41826fbe49e1285584f6ea1f5a7624f10df3e69e"
    }),
    resultsGoldenTest: Object.freeze({
      relativePath: "tests/cpp/Results.unit.cpp",
      byteSize: 33662,
      sha256:
        "8fab9f550d9f326e2bca8f427c9a5e6359aa9252f08cddaf7464313ff6d75721"
    })
  });

export const DOE_MEASUR_EQUIPMENT_SOURCE_FILES =
  Object.freeze([
    "src/results/Results.cpp",
    "src/calculator/motor/EstimateFLA.cpp",
    "src/calculator/motor/MotorCurrent.cpp",
    "src/calculator/motor/MotorEfficiency.cpp",
    "src/calculator/motor/MotorPower.cpp",
    "src/calculator/motor/MotorPowerFactor.cpp",
    "src/calculator/motor/MotorShaftPower.cpp",
    "src/calculator/motor/OptimalMotorPower.cpp",
    "src/calculator/motor/OptimalMotorShaftPower.cpp",
    "src/calculator/motor/OptimalMotorSize.cpp",
    "src/calculator/motor/Poles.cpp",
    "src/calculator/pump/MoverEfficiency.cpp",
    "src/calculator/pump/OptimalDeviationFactor.cpp",
    "src/calculator/pump/OptimalPrePumpEff.cpp",
    "src/calculator/pump/OptimalPumpEfficiency.cpp",
    "src/calculator/pump/OptimalPumpShaftPower.cpp",
    "src/calculator/pump/OptimalSpecificSpeed.cpp",
    "src/calculator/pump/OptimalSpecificSpeedCorrection.cpp",
    "src/calculator/pump/PumpShaftPower.cpp",
    "src/calculator/util/AnnualCost.cpp",
    "src/calculator/util/AnnualEnergy.cpp",
    "src/calculator/util/CurveFitVal.cpp"
  ]);

function requireSourceToken(source, token, label) {
  if (!source.includes(token)) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${label} lacks ${token}`
    );
  }
}

function runGit(repositoryPath, args, label) {
  const result = spawnSync(
    "git",
    ["-C", repositoryPath, ...args],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_CONFIG_NOSYSTEM: "1",
        GIT_TERMINAL_PROMPT: "0"
      }
    }
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `${label}: ${
        result.stderr.trim() ||
        result.stdout.trim() ||
        `exit ${result.status}`
      }`
    );
  }
  return result.stdout;
}

function inspectPinnedSourceTree(repositoryPath) {
  const status = runGit(
    repositoryPath,
    ["status", "--porcelain=v1", "--untracked-files=all"],
    "SOURCE_REPOSITORY_STATUS_FAILED"
  ).trim();
  if (status) {
    throw new Error(
      `SOURCE_REPOSITORY_DIRTY: ${status.split(/\r?\n/, 1)[0]}`
    );
  }
  const treeOutput = runGit(
    repositoryPath,
    [
      "ls-tree",
      "-r",
      DOE_MEASUR_COMMIT,
      "--",
      ...DOE_MEASUR_EQUIPMENT_SOURCE_FILES
    ],
    "SOURCE_REPOSITORY_TREE_FAILED"
  ).trim();
  const entries = treeOutput
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const match = line.match(
        /^100644 blob ([a-f0-9]{40})\t(.+)$/
      );
      if (!match) {
        throw new Error(
          `SOURCE_REPOSITORY_TREE_INVALID: ${line}`
        );
      }
      return {
        blobSha1: match[1],
        relativePath: match[2]
      };
    });
  const expected = new Set(
    DOE_MEASUR_EQUIPMENT_SOURCE_FILES
  );
  for (const entry of entries) {
    expected.delete(entry.relativePath);
  }
  if (expected.size || entries.length !== DOE_MEASUR_EQUIPMENT_SOURCE_FILES.length) {
    throw new Error(
      `SOURCE_REPOSITORY_TREE_INCOMPLETE: ${[
        ...expected
      ].join(", ")}`
    );
  }
  return entries;
}

export function assertEquipmentNativeInterfaces({
  motorHeader,
  motorBinding,
  motorGoldenTest,
  inputDataHeader,
  resultsHeader,
  resultsSource,
  psatBinding,
  fanBinding,
  coolingTowerHeader,
  coolingTowerBinding,
  coolingTowerGoldenTest,
  resultsGoldenTest
}) {
  for (const token of [
    "MotorEfficiency(",
    "Motor::LineFrequency lineFrequency",
    "double motorRpm",
    "Motor::EfficiencyClass efficiencyClass",
    "double motorRatedPower",
    "double calculate(double loadFactor, double specifiedEfficiency = -1)"
  ]) {
    requireSourceToken(
      motorHeader,
      token,
      "MotorEfficiency.h"
    );
  }
  for (const token of [
    'class_<MotorEfficiency>("MotorEfficiency")',
    ".constructor<Motor::LineFrequency, double, Motor::EfficiencyClass, double>()",
    '.function("calculate", &MotorEfficiency::calculate)'
  ]) {
    requireSourceToken(
      motorBinding,
      token,
      "motor.cpp binding"
    );
  }
  for (const token of [
    "Motor::EfficiencyClass::STANDARD, 150).calculate(0.25) == Approx(0.8867837736)",
    "Motor::EfficiencyClass::SPECIFIED, 150).calculate(0.25, .95) == Approx(0.9226247725)"
  ]) {
    requireSourceToken(
      motorGoldenTest,
      token,
      "MotorEfficiency.unit.cpp"
    );
  }
  for (const token of [
    "enum class EfficiencyClass",
    "enum class LineFrequency",
    "enum class Drive",
    "enum class LoadEstimationMethod",
    "struct FieldData",
    "struct Input"
  ]) {
    requireSourceToken(
      inputDataHeader,
      token,
      "InputData.h"
    );
  }
  for (const token of [
    "class FanResult",
    "Output calculateExisting",
    "Output calculateModified",
    "class PSATResult",
    "double pumpEfficiency",
    "const double motorCurrent, motorPower, annualEnergy"
  ]) {
    requireSourceToken(
      resultsHeader,
      token,
      "Results.h"
    );
  }
  for (const token of [
    "FanResult::Output FanResult::calculateExisting",
    "FanResult::Output FanResult::calculateModified",
    "PSATResult::Output PSATResult::calculateExisting",
    "PSATResult::Output PSATResult::calculateModified"
  ]) {
    requireSourceToken(
      resultsSource,
      token,
      "Results.cpp"
    );
  }
  for (const token of [
    'class_<PSATResult>("PSAT")',
    '.function("calculateExisting", &PSATResult::calculateExisting)',
    '.function("calculateModified", &PSATResult::calculateModified)',
    '.property("motor_power", &PSATResult::Output::motorPower)'
  ]) {
    requireSourceToken(
      psatBinding,
      token,
      "psat.cpp binding"
    );
  }
  for (const token of [
    'class_<FanResult>("FanResult")',
    '.function("calculateExisting", &FanResult::calculateExisting)',
    '.function("calculateModified", &FanResult::calculateModified)',
    '.property("motorPower", &FanResult::Output::motorPower)'
  ]) {
    requireSourceToken(
      fanBinding,
      token,
      "fan.cpp binding"
    );
  }
  for (const token of [
    "enum FanControlSpeedType",
    "static PowerEnergyConsumptionOutput FanEnergyConsumption",
    "const FanControlSpeedType baselineSpeedType",
    "const FanControlSpeedType modSpeedType",
    "const double baselineEnergy = baselinePower * 0.746 * operatingHours",
    "const double modEnergy = modPower * 0.746 * operatingHours"
  ]) {
    requireSourceToken(
      coolingTowerHeader,
      token,
      "CoolingTower.h"
    );
  }
  for (const token of [
    'enum_<CoolingTower::FanControlSpeedType>("FanControlSpeedType")',
    '.property("savingsEnergy", &CoolingTower::PowerEnergyConsumptionOutput::savingsEnergy)',
    'function("FanEnergyConsumption", &CoolingTower::FanEnergyConsumption)'
  ]) {
    requireSourceToken(
      coolingTowerBinding,
      token,
      "chillers.cpp binding"
    );
  }
  for (const token of [
    'TEST_CASE("Cooling Tower Fan Energy Consumption Calculator"',
    "CoolingTower::FanControlSpeedType::One, CoolingTower::FanControlSpeedType::Variable",
    "CHECK(res.savingsEnergy == Approx(7.7288))"
  ]) {
    requireSourceToken(
      coolingTowerGoldenTest,
      token,
      "CoolingTower.unit.cpp"
    );
  }
  for (const token of [
    'TEST_CASE( "Fan Output existing"',
    "CHECK(Approx(output.motorPower) == 460.0)",
    'TEST_CASE( "Fan Output modified"',
    "CHECK(Approx(output.motorPower) == 460.0001440224)",
    'TEST_CASE( "PSATResults - existing and modified"',
    "CHECK(ex.motorPower == Approx(150.0))",
    "CHECK(mod.motorPower == Approx(149.6401247588))"
  ]) {
    requireSourceToken(
      resultsGoldenTest,
      token,
      "Results.unit.cpp"
    );
  }
  return {
    modules: {
      motorEfficiency: {
        inputFields: [
          "lineFrequency",
          "motorRatedPowerHp",
          "motorRatedSpeedRpm",
          "efficiencyClass",
          "loadFraction",
          "specifiedEfficiency"
        ],
        outputFields: [
          "existingEfficiency",
          "proposedEfficiency"
        ],
        units: {
          motorRatedPowerHp: "hp",
          motorRatedSpeedRpm: "rpm",
          loadFraction: "fraction",
          specifiedEfficiency: "fraction",
          existingEfficiency: "fraction",
          proposedEfficiency: "fraction"
        }
      },
      psat: {
        inputFields: [
          "pumpStyle",
          "pumpEfficiency",
          "pumpRatedSpeedRpm",
          "drive",
          "kinematicViscosityCentistokes",
          "specificGravity",
          "stageCount",
          "motorRatedPowerHp",
          "motorRatedSpeedRpm",
          "motorEfficiencyClass",
          "motorSpecifiedEfficiency",
          "motorRatedVoltage",
          "motorFullLoadAmps",
          "flowRateGpm",
          "headFeet",
          "measuredMotorPowerKw",
          "measuredMotorCurrentAmps",
          "measuredVoltage",
          "annualOperatingHours"
        ],
        outputFields: [
          "existingInputKw",
          "proposedInputKw",
          "existingPumpEfficiency",
          "proposedPumpEfficiency",
          "existingAnnualEnergyMwh",
          "proposedAnnualEnergyMwh"
        ]
      },
      fanSystemAssessment: {
        inputFields: [
          "fanSpeedRpm",
          "airDensityLbPerCubicFoot",
          "drive",
          "motorRatedPowerHp",
          "motorRatedSpeedRpm",
          "motorEfficiencyClass",
          "motorRatedVoltage",
          "motorFullLoadAmps",
          "flowRateCfm",
          "inletPressureInWg",
          "outletPressureInWg",
          "compressibilityFactor",
          "annualOperatingHours"
        ],
        outputFields: [
          "existingInputKw",
          "proposedInputKw",
          "existingFanEfficiency",
          "proposedFanEfficiency",
          "existingAnnualEnergyMwh",
          "proposedAnnualEnergyMwh"
        ]
      },
      coolingTowerFan: {
        inputFields: [
          "ratedFanPowerHp",
          "waterLeavingTemperatureF",
          "waterEnteringTemperatureF",
          "operatingWetBulbTemperatureF",
          "annualOperatingHours",
          "existingFanControlSpeedType",
          "proposedFanControlSpeedType"
        ],
        outputFields: [
          "existingFanPowerHp",
          "existingFanEnergyKwh",
          "proposedFanPowerHp",
          "proposedFanEnergyKwh",
          "avoidedFanEnergyKwh"
        ],
        units: {
          ratedFanPowerHp: "hp",
          waterLeavingTemperatureF: "degrees Fahrenheit",
          waterEnteringTemperatureF: "degrees Fahrenheit",
          operatingWetBulbTemperatureF: "degrees Fahrenheit",
          annualOperatingHours: "hours/year",
          existingFanPowerHp: "hp",
          existingFanEnergyKwh: "kWh/year",
          proposedFanPowerHp: "hp",
          proposedFanEnergyKwh: "kWh/year",
          avoidedFanEnergyKwh: "kWh/year"
        }
      }
    }
  };
}

export async function inspectDoeMeasurEquipmentRepository(
  repositoryPath
) {
  assertNetworkDisabled();
  const commit = verifyDoeMeasurCommit(repositoryPath);
  const pinnedSourceTree =
    inspectPinnedSourceTree(repositoryPath);
  const entries = await Promise.all(
    Object.entries(
      DOE_MEASUR_EQUIPMENT_PINNED_FILES
    ).map(async ([key, expected]) => [
      key,
      await verifyArtifact(
        join(repositoryPath, expected.relativePath),
        expected
      )
    ])
  );
  const artifacts = Object.fromEntries(entries);
  const sources = Object.fromEntries(
    await Promise.all(
      Object.entries(
        DOE_MEASUR_EQUIPMENT_PINNED_FILES
      ).map(async ([key, expected]) => [
        key,
        await readFile(
          join(repositoryPath, expected.relativePath),
          "utf8"
        )
      ])
    )
  );
  const nativeInterfaces =
    assertEquipmentNativeInterfaces(sources);
  const observedSchema = {
    format:
      "PINNED_CPP_HEADERS_SOURCES_WASM_BINDINGS_AND_GOLDEN_TESTS",
    commit,
    compiledSourceTree: pinnedSourceTree,
    nativeInterfaces
  };
  return {
    commit,
    artifacts,
    pinnedSourceTree,
    nativeInterfaces,
    observedSchema,
    schemaFingerprintSha256: sha256Json(observedSchema)
  };
}
