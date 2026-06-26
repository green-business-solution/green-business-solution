import fs from "node:fs";
import { describe, expect, it } from "vitest";
import {
  buildSiteEnergyProfile,
  evaluateOpportunityBillFieldReadiness,
  processUtilityDataUpload,
  validateExtractedValueFieldIds
} from "./parseEnergyData.mjs";

const billFieldDictionary = JSON.parse(
  fs.readFileSync(new URL("../../data/bill_field_dictionary.json", import.meta.url), "utf8")
);

function sampleUploadBase(overrides = {}) {
  return {
    clientIntakeId: "intake_user-123",
    fileId: "energy_file_123",
    originalFilename: "sample.xml",
    s3Key: "energy-data/user-123/energy_file_123/sample.xml",
    siteId: "intake_user-123:primary_site",
    uploadedAt: "2026-06-25T12:00:00.000Z",
    utilityProvider: "PG&E",
    ...overrides
  };
}

describe("processUtilityDataUpload", () => {
  it("parses Green Button XML into extracted intake bill fields without requiring cost data", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <feed>
        <title>PG&E Green Button Download</title>
        <entry>
          <content>
            <serviceAddress>
              <line1>123 Market St</line1>
              <city>San Francisco</city>
              <state>CA</state>
              <postalCode>94105</postalCode>
            </serviceAddress>
            <accountNumber>1234567890</accountNumber>
            <rateSchedule>B-10S</rateSchedule>
            <customerClass>Commercial</customerClass>
            <IntervalBlock>
              <IntervalReading>
                <value>1500</value>
                <timePeriod>
                  <start>1704067200</start>
                  <duration>3600</duration>
                </timePeriod>
              </IntervalReading>
              <IntervalReading>
                <value>500</value>
                <timePeriod>
                  <start>1704070800</start>
                  <duration>3600</duration>
                </timePeriod>
              </IntervalReading>
            </IntervalBlock>
          </content>
        </entry>
        <entry>
          <content>
            <ReadingType>
              <uom>72</uom>
              <powerOfTenMultiplier>0</powerOfTenMultiplier>
            </ReadingType>
          </content>
        </entry>
      </feed>`;

    const result = processUtilityDataUpload({
      ...sampleUploadBase(),
      sourceType: "green_button_xml",
      text: xml
    });

    expect(result.uploadedUtilityFile).toMatchObject({
      fileType: "green_button_xml",
      utilityProvider: "PG&E",
      processingStatus: "processed"
    });

    expect(result.utilityExtractedValues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fieldId: "utility_provider", value: "PG&E" }),
        expect.objectContaining({ fieldId: "service_address", value: "123 Market St, San Francisco, CA 94105" }),
        expect.objectContaining({ fieldId: "account_number_masked", value: "***7890" }),
        expect.objectContaining({ fieldId: "rate_schedule", value: "B-10S" }),
        expect.objectContaining({ fieldId: "customer_class", value: "Commercial" }),
        expect.objectContaining({ fieldId: "monthly_kwh", value: 2, unit: "kWh" }),
        expect.objectContaining({ fieldId: "annual_kwh", value: 2, unit: "kWh" })
      ])
    );

    expect(result.utilityExtractedValues.some((value) => value.fieldId === "total_electric_cost")).toBe(false);
    expect(result.utilityExtractedValues.some((value) => value.fieldId === "annual_electric_cost")).toBe(false);
    expect(validateExtractedValueFieldIds(result.utilityExtractedValues)).toEqual({ ok: true, unknownFieldIds: [] });
  });

  it("parses Green Button CSV and validates field IDs against the bill field dictionary", () => {
    const csv = `start time,end time,usage,cost,utility,service address,service account,rate,customer class
2026-01-01T00:00:00Z,2026-01-31T23:59:59Z,1200.5,180.25,PG&E,"500 Howard St, San Francisco, CA 94105",ACC-7788,B-19S,Commercial
2026-02-01T00:00:00Z,2026-02-28T23:59:59Z,900.25,140.75,PG&E,"500 Howard St, San Francisco, CA 94105",ACC-7788,B-19S,Commercial`;

    const result = processUtilityDataUpload({
      ...sampleUploadBase({
        fileId: "energy_file_456",
        originalFilename: "sample.csv",
        s3Key: "energy-data/user-123/energy_file_456/sample.csv"
      }),
      sourceType: "green_button_csv",
      text: csv
    });

    const dictionaryFieldIds = new Set(billFieldDictionary.map((field) => field.id));
    for (const value of result.utilityExtractedValues) {
      expect(dictionaryFieldIds.has(value.fieldId)).toBe(true);
    }

    expect(result.utilityExtractedValues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fieldId: "annual_kwh", value: 2100.75 }),
        expect.objectContaining({ fieldId: "annual_electric_cost", value: 321 }),
        expect.objectContaining({ fieldId: "average_cost_per_kwh", value: expect.any(Number) }),
        expect.objectContaining({ fieldId: "rate_schedule", value: "B-19S" })
      ])
    );
  });

  it("stores PDFs with a needs-review placeholder when extraction is not implemented", () => {
    const result = processUtilityDataUpload({
      ...sampleUploadBase({
        originalFilename: "bill.pdf",
        s3Key: "energy-data/user-123/energy_file_123/bill.pdf"
      }),
      sourceType: "utility_pdf",
      text: ""
    });

    expect(result.uploadedUtilityFile).toMatchObject({
      fileType: "utility_pdf",
      processingStatus: "needs_review",
      errorMessage: "PDF uploaded successfully; extraction not implemented yet."
    });
    expect(result.utilityExtractedValues).toEqual([]);
  });
});

describe("site energy readiness helpers", () => {
  it("builds a site profile and reports required bill-field readiness", () => {
    const csv = `start time,end time,usage,cost,utility
2026-01-01T00:00:00Z,2026-01-31T23:59:59Z,1000,200,PG&E`;

    const result = processUtilityDataUpload({
      ...sampleUploadBase({
        fileId: "energy_file_789",
        originalFilename: "single-month.csv",
        s3Key: "energy-data/user-123/energy_file_789/single-month.csv"
      }),
      sourceType: "green_button_csv",
      text: csv
    });

    const profile = buildSiteEnergyProfile({
      siteId: result.uploadedUtilityFile.siteId,
      uploadedUtilityFiles: [result.uploadedUtilityFile],
      utilityExtractedValues: result.utilityExtractedValues
    });
    const readiness = evaluateOpportunityBillFieldReadiness({
      availableFieldIds: profile.availableFieldIds,
      requiredBillFields: ["annual_kwh", "annual_electric_cost", "rate_schedule"]
    });

    expect(profile).toMatchObject({
      uploadedFileCount: 1,
      processedFileCount: 1,
      annualKwh: 1000,
      annualElectricCost: 200
    });
    expect(readiness).toEqual({
      availableRequiredFieldIds: ["annual_kwh", "annual_electric_cost"],
      missingFieldIds: ["rate_schedule"],
      isReadyForSavingsEstimation: false
    });
  });
});
