import { describe, expect, it } from "vitest";
import { buildAdminTestCaseSavingsPreview } from "../adminTestCaseSavings.mjs";

describe("admin test-case savings previews", () => {
  it("calculates the LED admin test fixture preview", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_led",
      calculationDate: "2026-06-27",
      normalizedProfile: {
        site: {
          geo: {
            stateCode: "CA",
            countyFips: "06075"
          }
        }
      },
      retrofitGroup: {
        retrofitTypeId: "led_lighting_retrofit",
        displayName: "LED lighting retrofit",
        opportunityCount: 12
      }
    });

    expect(preview).toMatchObject({
      status: "calculated",
      estimateKind: "test_fixture",
      modelCoverage: "retrofit_only",
      upfrontCostCents: 160425,
      upfrontSavingsCents: 0,
      upfrontCostAfterSavingsCents: 160425,
      monthlySavingsCents: 1872,
      annualSavingsCents: 22464
    });
    expect(preview.costBreakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ category: "equipment_cost", amountCents: 102000 }),
        expect.objectContaining({ category: "installation_labor", amountCents: 49500 }),
        expect.objectContaining({ category: "sales_tax", amountCents: 8925 })
      ])
    );
  });

  it("calculates modeled HVAC admin test fixture previews", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_hvac",
      calculationDate: "2026-06-27",
      normalizedProfile: {},
      retrofitGroup: {
        retrofitTypeId: "high_efficiency_hvac_replacement",
        displayName: "High-efficiency HVAC replacement",
        opportunityCount: 3
      }
    });

    expect(preview).toMatchObject({
      status: "calculated",
      estimateKind: "test_fixture",
      modelCoverage: "retrofit_only",
      upfrontCostCents: 798000,
      upfrontSavingsCents: 0,
      upfrontCostAfterSavingsCents: 798000,
      monthlySavingsCents: 6000,
      annualSavingsCents: 72000
    });
    expect(preview.billLineDeltas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: -4000 })
      ])
    );
  });

  it("keeps multiple incentive effects for one matched opportunity-retrofit pair", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_led_combo",
      calculationDate: "2026-06-27",
      normalizedProfile: {},
      retrofitGroup: {
        retrofitTypeId: "led_lighting_retrofit",
        displayName: "LED lighting retrofit",
        opportunityCount: 1,
        opportunities: [{ opportunityId: "opp_combo_led" }]
      },
      opportunityIncentiveRules: [
        {
          id: "oir_combo_led_rebate_v1",
          version: 1,
          opportunityId: "opp_combo_led",
          name: "Combo LED Rebate",
          incentiveType: "fixed_per_unit_rebate",
          timing: "upfront",
          amountRule: { kind: "fixed_amount", amountCents: 10000 },
          basisPolicy: { basis: "gross_project_cost", applicationOrder: 10 },
          confidence: "high",
          active: true
        },
        {
          id: "oir_combo_led_bill_credit_v1",
          version: 1,
          opportunityId: "opp_combo_led",
          name: "Combo LED Bill Credit",
          incentiveType: "recurring_bill_credit",
          timing: "annual",
          amountRule: { kind: "fixed_amount", amountCents: 12000 },
          basisPolicy: { basis: "gross_project_cost", applicationOrder: 20 },
          confidence: "high",
          active: true
        }
      ]
    });

    expect(preview.oneTimeSavingsCents).toBe(10000);
    expect(preview.annualRecurringSavingsCents).toBe(34464);
    expect(preview.netAnnualRecurringSavingsCents).toBe(34464);
    expect(preview.selectedIncentiveScenario).toMatchObject({
      opportunityIds: ["opp_combo_led"],
      incentiveRuleIds: ["oir_combo_led_rebate_v1", "oir_combo_led_bill_credit_v1"],
      totalUpfrontSavingsCents: 10000,
      firstYearRecurringSavingsCents: 12000
    });
    expect(preview.selectedIncentiveScenario.upfrontSavingsEntries).toHaveLength(1);
    expect(preview.selectedIncentiveScenario.recurringSavingsEntries).toHaveLength(1);
  });

  it("keeps service-only matched items unsupported until modeled savings are available", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_audit",
      calculationDate: "2026-06-27",
      normalizedProfile: {},
      retrofitGroup: {
        retrofitTypeId: "energy_audit",
        displayName: "Energy audit",
        opportunityCount: 2
      }
    });

    expect(preview).toMatchObject({
      status: "unsupported",
      estimateKind: "not_modeled_v1",
      modelCoverage: "none",
      upfrontCostCents: null,
      annualSavingsCents: null
    });
  });
});
