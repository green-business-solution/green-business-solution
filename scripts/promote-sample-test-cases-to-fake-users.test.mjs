import { describe, expect, it } from "vitest";
import { buildPromotionRecords } from "./promote-sample-test-cases-to-fake-users.mjs";

describe("buildPromotionRecords", () => {
  it("builds fake user and intake records from patched sample profiles", () => {
    const records = buildPromotionRecords({
      now: "2026-07-01T00:00:00.000Z",
      selectedIds: ["sample-one"],
      sampleUsers: [
        {
          sampleUserId: "sample-one",
          fullName: "Sample User",
          email: "sample-one@example.com",
          phone: "555-0100",
          companyName: "Sample One",
          website: "https://example.com",
          organizationType: "Commercial Business",
          organizationSize: "1-10 employees",
          siteAddress: "1 Main St, Test, CA 90000",
          electricUtilityProvider: "Sample Utility",
          gasUtilityProvider: "Sample Gas",
          ownershipStatus: "Lease",
          buildingType: "Office",
          squareFootage: "10,000",
          primaryActivityText: "Office operations",
          naicsCodes: ["541611"],
          notes: "Synthetic sample.",
          uploadedUtilityFiles: [{ fileId: "file-one" }],
          utilityExtractedValues: [{ extractedValueId: "value-one", fileId: "file-one", fieldId: "annual_kwh", value: 1200 }],
          siteEnergyProfile: {
            annualElectricCost: 1200,
            annualGasCost: 600,
            annualWaterCost: 240
          },
          uploadedTaxFiles: [{ fileId: "tax-file-one", taxDocumentType: "property_tax_bill" }],
          taxExtractedValues: [{ extractedValueId: "tax-value-one", fileId: "tax-file-one", fieldId: "assessed_value_cents", value: 1000000 }],
          siteTaxProfile: {
            uploadedFileCount: 1,
            extractedValueCount: 1
          },
          taxProfileFacts: [{ inputKey: "property_tax_jurisdiction", value: "Test County, CA" }]
        }
      ],
      testCases: [
        {
          sampleUserId: "sample-one",
          retrofits: [{ displayName: "LED lighting retrofit" }, { displayName: "Heat pump HVAC retrofit" }],
          topOpportunities: [{ id: "one" }, { id: "two" }]
        }
      ]
    });

    expect(records).toHaveLength(1);
    expect(records[0].user).toMatchObject({
      role: "client",
      status: "active",
      fullName: "Sample One Sample User",
      email: "sample-one@example.com",
      companyName: "Sample One",
      isFakeUser: true,
      sampleUserId: "sample-one"
    });
    expect(records[0].intake).toMatchObject({
      isFakeUser: true,
      sampleUserId: "sample-one",
      contact: {
        fullName: "Sample One Sample User"
      },
      sustainability: {
        monthlyUtilitySpend: "170"
      }
    });
    expect(records[0].intake.sustainability.interestedImprovements).toEqual([
      "LED lighting retrofit",
      "Heat pump HVAC retrofit"
    ]);
    expect(records[0].intake.uploadedTaxFiles).toEqual([{ fileId: "tax-file-one", taxDocumentType: "property_tax_bill" }]);
    expect(records[0].intake.taxExtractedValues).toHaveLength(1);
    expect(records[0].intake.siteTaxProfile).toMatchObject({ uploadedFileCount: 1 });
    expect(records[0].intake.taxProfileFacts).toEqual([{ inputKey: "property_tax_jurisdiction", value: "Test County, CA" }]);
  });

  it("rejects selected profiles that do not have imported utility data", () => {
    expect(() =>
      buildPromotionRecords({
        now: "2026-07-01T00:00:00.000Z",
        selectedIds: ["sample-one"],
        sampleUsers: [{ sampleUserId: "sample-one" }],
        testCases: []
      })
    ).toThrow(/does not have imported utility files/);
  });
});
