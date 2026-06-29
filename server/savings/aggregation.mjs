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

export function aggregatePossibleGrantMoney(entries = []) {
  return sum(entries.filter((entry) => entry.kind === "possible_grant").map((entry) => entry.amountCents));
}

export function aggregateUpfrontCostAfterSavings(entries = []) {
  return aggregateUpfrontCost(entries) - aggregateUpfrontSavings(entries);
}

function recurringAmountForPeriod(entry, targetPeriod) {
  if (targetPeriod === "monthly") {
    if (entry.period === "monthly") return Number(entry.amountCents || 0);
    if (entry.period === "annual" && entry.allowMonthlyProration) return annualToMonthlyCents(entry.amountCents);
    return 0;
  }

  if (entry.period === "annual") return Number(entry.amountCents || 0);
  if (entry.period === "monthly" && entry.allowAnnualization) return monthlyToAnnualCents(entry.amountCents);
  return 0;
}

export function isRecurringExpenseEntry(entry) {
  return entry?.kind === "recurring_expense" || Number(entry?.amountCents || 0) < 0;
}

export function isRecurringSavingsEntry(entry) {
  return !isRecurringExpenseEntry(entry);
}

export function aggregateMonthlyRecurringSavings(entries = []) {
  return sum(
    entries.filter(isRecurringSavingsEntry).map((entry) => Math.max(0, recurringAmountForPeriod(entry, "monthly")))
  );
}

export function aggregateAnnualRecurringSavings(entries = []) {
  return sum(
    entries.filter(isRecurringSavingsEntry).map((entry) => Math.max(0, recurringAmountForPeriod(entry, "annual")))
  );
}

export function aggregateMonthlyRecurringExpenses(entries = []) {
  return sum(
    entries.filter(isRecurringExpenseEntry).map((entry) => Math.abs(recurringAmountForPeriod(entry, "monthly")))
  );
}

export function aggregateAnnualRecurringExpenses(entries = []) {
  return sum(
    entries.filter(isRecurringExpenseEntry).map((entry) => Math.abs(recurringAmountForPeriod(entry, "annual")))
  );
}

export function aggregateMonthlyNetRecurringSavings(entries = []) {
  return aggregateMonthlyRecurringSavings(entries) - aggregateMonthlyRecurringExpenses(entries);
}

export function aggregateAnnualNetRecurringSavings(entries = []) {
  return aggregateAnnualRecurringSavings(entries) - aggregateAnnualRecurringExpenses(entries);
}

export function aggregateMonthlySavings(entries = []) {
  return aggregateMonthlyNetRecurringSavings(entries);
}

export function aggregateAnnualSavings(entries = []) {
  return aggregateAnnualNetRecurringSavings(entries);
}

export function firstYearRecurringSavings(entries = []) {
  return aggregateAnnualNetRecurringSavings(entries);
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
