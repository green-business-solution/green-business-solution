import { annualToMonthlyCents, monthlyToAnnualCents } from "./formulas.mjs";

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

export function aggregateUpfrontCost(entries = []) {
  return sum(entries.filter((entry) => entry.kind === "upfront_cost").map((entry) => entry.amountCents));
}

export function aggregateUpfrontSavings(entries = []) {
  return sum(entries.filter((entry) => entry.kind === "upfront_savings").map((entry) => entry.amountCents));
}

export function aggregateUpfrontCostAfterSavings(entries = []) {
  return aggregateUpfrontCost(entries) - aggregateUpfrontSavings(entries);
}

export function aggregateMonthlySavings(entries = []) {
  return sum(
    entries.map((entry) => {
      if (entry.period === "monthly") return entry.amountCents;
      if (entry.period === "annual" && entry.allowMonthlyProration) return annualToMonthlyCents(entry.amountCents);
      return 0;
    })
  );
}

export function aggregateAnnualSavings(entries = []) {
  return sum(
    entries.map((entry) => {
      if (entry.period === "annual") return entry.amountCents;
      if (entry.period === "monthly" && entry.allowAnnualization) return monthlyToAnnualCents(entry.amountCents);
      return 0;
    })
  );
}

export function firstYearRecurringSavings(entries = []) {
  return sum(entries.map((entry) => entry.annualizedAmountCents));
}

export function aggregateBillLineDeltas(deltas = []) {
  const grouped = new Map();

  for (const delta of deltas) {
    const key = [delta.domain, delta.canonicalField, delta.unit, delta.period].join("::");
    const current = grouped.get(key) || {
      ...delta,
      deltaValue: 0,
      savingsCents: 0
    };

    current.deltaValue += Number(delta.deltaValue || 0);
    current.savingsCents += Number(delta.savingsCents || 0);
    grouped.set(key, current);
  }

  return [...grouped.values()];
}
