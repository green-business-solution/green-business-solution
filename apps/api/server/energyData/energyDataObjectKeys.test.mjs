import { describe, expect, it } from "vitest";
import {
  buildEnergyDataS3Key,
  cleanEnergyDataFileName,
  isEnergyDataUploadId,
  validateEnergyDataRegistrationKey
} from "./energyDataObjectKeys.mjs";

const validEnergyDataId = "energy_550e8400-e29b-41d4-a716-446655440000";

describe("energy data object keys", () => {
  it("builds canonical upload keys from sanitized file names", () => {
    expect(cleanEnergyDataFileName("../utility bill (june).csv")).toBe(".._utility_bill_june_.csv");
    expect(
      buildEnergyDataS3Key({
        userId: "account_abc123",
        energyDataId: validEnergyDataId,
        fileName: "../utility bill (june).csv"
      })
    ).toBe("energy-data/account_abc123/energy_550e8400-e29b-41d4-a716-446655440000/.._utility_bill_june_.csv");
  });

  it("accepts upload-url descriptors for the same user, upload id, and file name", () => {
    const s3Key = buildEnergyDataS3Key({
      userId: "account_abc123",
      energyDataId: validEnergyDataId,
      fileName: "utility.csv"
    });

    expect(isEnergyDataUploadId(validEnergyDataId)).toBe(true);
    expect(
      validateEnergyDataRegistrationKey({
        userId: "account_abc123",
        energyDataId: validEnergyDataId,
        fileName: "utility.csv",
        s3Key
      })
    ).toEqual({
      ok: true,
      expectedS3Key: s3Key,
      reason: null
    });
  });

  it("rejects registration for another user or bucket prefix", () => {
    expect(
      validateEnergyDataRegistrationKey({
        userId: "account_abc123",
        energyDataId: validEnergyDataId,
        fileName: "utility.csv",
        s3Key: "energy-data/account_other/energy_550e8400-e29b-41d4-a716-446655440000/utility.csv"
      })
    ).toMatchObject({
      ok: false,
      reason: "s3_key_mismatch"
    });

    expect(
      validateEnergyDataRegistrationKey({
        userId: "account_abc123",
        energyDataId: validEnergyDataId,
        fileName: "utility.csv",
        s3Key: "runtime-cache/retrofit-recommendations/account_abc123/private.json"
      })
    ).toMatchObject({
      ok: false,
      reason: "s3_key_mismatch"
    });
  });

  it("rejects caller-chosen upload identifiers", () => {
    expect(isEnergyDataUploadId("energy_file_123")).toBe(false);
    expect(
      validateEnergyDataRegistrationKey({
        userId: "account_abc123",
        energyDataId: "energy_file_123",
        fileName: "utility.csv",
        s3Key: "energy-data/account_abc123/energy_file_123/utility.csv"
      })
    ).toMatchObject({
      ok: false,
      reason: "invalid_energy_data_id"
    });
  });
});
