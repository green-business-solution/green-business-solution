import fs from "node:fs";
import { describe, expect, it } from "vitest";
import {
  buildSiteEnergyProfile,
  evaluateOpportunityBillFieldReadiness,
  processUtilityDataUpload,
  validateExtractedValueFieldIds
} from "./parseEnergyData.mjs";

const billFieldDictionary = JSON.parse(
  fs.readFileSync(new URL("../../../../data/bill_field_dictionary.json", import.meta.url), "utf8")
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
      utilityCategory: "electric",
      text: xml
    });

    expect(result.uploadedUtilityFile).toMatchObject({
      fileType: "green_button_xml",
      utilityCategory: "electric",
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
      utilityCategory: "auto_detect",
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

  it("parses gas CSV uploads into gas field IDs", () => {
    const csv = `start time,end time,usage,cost,utility,service address,service account,rate,unit
2026-01-01T00:00:00Z,2026-01-31T23:59:59Z,100,120.5,PG&E Gas,"500 Howard St, San Francisco, CA 94105",ACC-7788,G-10,therms
2026-02-01T00:00:00Z,2026-02-28T23:59:59Z,80,96.25,PG&E Gas,"500 Howard St, San Francisco, CA 94105",ACC-7788,G-10,therms`;

    const result = processUtilityDataUpload({
      ...sampleUploadBase({
        fileId: "energy_file_gas",
        originalFilename: "sample-gas.csv",
        s3Key: "energy-data/user-123/energy_file_gas/sample-gas.csv"
      }),
      sourceType: "green_button_csv",
      utilityCategory: "gas",
      text: csv
    });

    expect(result.uploadedUtilityFile).toMatchObject({
      utilityCategory: "gas",
      processingStatus: "processed"
    });
    expect(result.utilityExtractedValues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fieldId: "gas_utility_provider" }),
        expect.objectContaining({ fieldId: "monthly_therms", value: 100, unit: "therms" }),
        expect.objectContaining({ fieldId: "annual_therms", value: 180, unit: "therms" }),
        expect.objectContaining({ fieldId: "annual_gas_cost", value: 216.75 }),
        expect.objectContaining({ fieldId: "average_cost_per_therm", value: expect.any(Number) }),
        expect.objectContaining({ fieldId: "gas_rate_schedule", value: "G-10" })
      ])
    );
  });

  it("parses water CSV uploads into water and sewer field IDs", () => {
    const csv = `start time,end time,usage,cost,utility,service address,service account,unit,sewer charges,annual sewer cost,stormwater,meter size,irrigation meter
2026-01-01T00:00:00Z,2026-01-31T23:59:59Z,12,48.5,Oakland Water,"200 Broadway, Oakland, CA 94607",ACC-9001,CCF,15,180,5,1.5,yes
2026-02-01T00:00:00Z,2026-02-28T23:59:59Z,10,42.25,Oakland Water,"200 Broadway, Oakland, CA 94607",ACC-9001,CCF,14,180,5,1.5,yes`;

    const result = processUtilityDataUpload({
      ...sampleUploadBase({
        fileId: "energy_file_water",
        originalFilename: "sample-water.csv",
        s3Key: "energy-data/user-123/energy_file_water/sample-water.csv"
      }),
      sourceType: "green_button_csv",
      utilityCategory: "water_sewer",
      utilityProvider: "EBMUD",
      text: csv
    });

    expect(result.uploadedUtilityFile).toMatchObject({
      utilityCategory: "water_sewer",
      processingStatus: "processed"
    });
    expect(result.utilityExtractedValues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fieldId: "water_provider" }),
        expect.objectContaining({ fieldId: "monthly_water_use", value: 12, unit: "CCF" }),
        expect.objectContaining({ fieldId: "annual_water_use", value: 22, unit: "CCF" }),
        expect.objectContaining({ fieldId: "annual_water_cost", value: 90.75 }),
        expect.objectContaining({ fieldId: "water_unit", value: "CCF" }),
        expect.objectContaining({ fieldId: "annual_sewer_cost", value: 180 }),
        expect.objectContaining({ fieldId: "stormwater_fee", value: 5 }),
        expect.objectContaining({ fieldId: "meter_size", value: "1.5" }),
        expect.objectContaining({ fieldId: "irrigation_meter_present", value: true })
      ])
    );
  });

  it("parses waste CSV uploads into waste field IDs", () => {
    const csv = `waste hauler,landfill,recycling,organics,pickup frequency,bin size,contamination,overage,total waste cost,service address,account number,billing period start,billing period end
Waste Management,250,80,40,3x weekly,6 yd,15,10,395,"101 Main St, Oakland, CA 94612",ACCT-9191,2026-01-01,2026-01-31`;

    const result = processUtilityDataUpload({
      ...sampleUploadBase({
        fileId: "energy_file_waste",
        originalFilename: "sample-waste.csv",
        s3Key: "energy-data/user-123/energy_file_waste/sample-waste.csv"
      }),
      sourceType: "green_button_csv",
      utilityCategory: "waste",
      text: csv
    });

    expect(result.uploadedUtilityFile).toMatchObject({
      utilityCategory: "waste",
      processingStatus: "processed"
    });
    expect(result.utilityExtractedValues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fieldId: "waste_hauler", value: "Waste Management" }),
        expect.objectContaining({ fieldId: "landfill_service_cost", value: 250 }),
        expect.objectContaining({ fieldId: "recycling_service_cost", value: 80 }),
        expect.objectContaining({ fieldId: "organics_service_cost", value: 40 }),
        expect.objectContaining({ fieldId: "pickup_frequency", value: "3x weekly" }),
        expect.objectContaining({ fieldId: "bin_size", value: "6 yd" }),
        expect.objectContaining({ fieldId: "contamination_fees", value: 15 }),
        expect.objectContaining({ fieldId: "overage_fees", value: 10 }),
        expect.objectContaining({ fieldId: "total_waste_cost", value: 395 })
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
      utilityCategory: "water_sewer",
      text: ""
    });

    expect(result.uploadedUtilityFile).toMatchObject({
      fileType: "utility_pdf",
      utilityCategory: "water_sewer",
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
      utilityCategory: "electric",
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
    expect(profile.utilitySummaries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          utilityCategory: "electric",
          annualUsage: 1000,
          annualCost: 200
        })
      ])
    );
    expect(readiness).toEqual({
      availableRequiredFieldIds: ["annual_kwh", "annual_electric_cost"],
      missingFieldIds: ["rate_schedule"],
      isReadyForSavingsEstimation: false
    });
  });
});
