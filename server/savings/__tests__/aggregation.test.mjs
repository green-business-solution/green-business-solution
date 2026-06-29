import { describe, expect, it } from "vitest";
import {
  aggregateAnnualRecurringExpenses,
  aggregateAnnualRecurringSavings,
  aggregateAnnualSavings,
  aggregateBillLineDeltas,
  aggregateMonthlyRecurringExpenses,
  aggregateMonthlyRecurringSavings,
  aggregateMonthlySavings,
  aggregatePossibleGrantMoney,
  aggregateUpfrontCost,
  aggregateUpfrontCostAfterSavings,
  aggregateUpfrontSavings
} from "../aggregation.mjs";

describe("savings aggregation", () => {
  it("aggregates upfront costs, savings, and after-savings cost", () => {
    const entries = [
      { kind: "upfront_cost", category: "equipment_cost", amountCents: 102000 },
      { kind: "upfront_cost", category: "installation_labor", amountCents: 49500 },
      { kind: "upfront_cost", category: "sales_tax", amountCents: 8925 },
      { kind: "upfront_savings", category: "rebate", amountCents: 24000 },
      { kind: "upfront_savings", category: "tax_credit", amountCents: 13643 }
    ];

    expect(aggregateUpfrontCost(entries)).toBe(160425);
    expect(aggregateUpfrontSavings(entries)).toBe(37643);
    expect(aggregateUpfrontCostAfterSavings(entries)).toBe(122782);
  });

  it("keeps possible grant money separate from deterministic upfront savings", () => {
    const entries = [
      { kind: "upfront_cost", category: "equipment_cost", amountCents: 100000 },
      { kind: "upfront_savings", category: "rebate", amountCents: 20000 },
      { kind: "possible_grant", category: "possible_grant", amountCents: 50000 }
    ];

    expect(aggregateUpfrontSavings(entries)).toBe(20000);
    expect(aggregatePossibleGrantMoney(entries)).toBe(50000);
    expect(aggregateUpfrontCostAfterSavings(entries)).toBe(80000);
  });

  it("aggregates monthly and annual recurring savings without double-counting display cadences", () => {
    const entries = [
      {
        period: "annual",
        amountCents: 22464,
        allowMonthlyProration: true,
        allowAnnualization: true,
        annualizedAmountCents: 22464
      },
      {
        period: "annual",
        amountCents: 50000,
        allowMonthlyProration: false,
        allowAnnualization: true,
        annualizedAmountCents: 50000
      },
      {
        period: "monthly",
        amountCents: 3000,
        allowMonthlyProration: false,
        allowAnnualization: true,
        annualizedAmountCents: 36000
      }
    ];

    expect(aggregateMonthlySavings(entries)).toBe(4872);
    expect(aggregateAnnualSavings(entries)).toBe(108464);
  });

  it("separates recurring expenses and returns legacy recurring totals as net savings", () => {
    const entries = [
      {
        kind: "recurring_savings",
        period: "monthly",
        amountCents: 10000,
        allowAnnualization: true
      },
      {
        kind: "recurring_expense",
        period: "monthly",
        amountCents: 3000,
        allowAnnualization: true
      },
      {
        period: "annual",
        amountCents: -12000,
        allowMonthlyProration: true,
        allowAnnualization: true
      }
    ];

    expect(aggregateMonthlyRecurringSavings(entries)).toBe(10000);
    expect(aggregateMonthlyRecurringExpenses(entries)).toBe(4000);
    expect(aggregateMonthlySavings(entries)).toBe(6000);
    expect(aggregateAnnualRecurringSavings(entries)).toBe(120000);
    expect(aggregateAnnualRecurringExpenses(entries)).toBe(48000);
    expect(aggregateAnnualSavings(entries)).toBe(72000);
  });

  it("aggregates matching bill-line deltas", () => {
    const [delta] = aggregateBillLineDeltas([
      { domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: -1000, unit: "kWh/year", period: "annual" },
      { domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: 200, unit: "kWh/year", period: "annual" }
    ]);

    expect(delta.deltaValue).toBe(-800);
  });
});
