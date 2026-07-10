import { canonicalizeLedgerEntries, ledgerSignature } from "./trace.mjs";

export const DEFAULT_CAP_RULE = {
  ruleFamilyId: "fixed-unit-cap-v1",
  ruleVersion: "cap-v1",
  resetWindow: "calendar_year_2026",
  unit: "usd_minor_unit",
  capMinorUnits: 100000
};

export function evaluateFixedUnitCap({ orderedItems = [], capRule = DEFAULT_CAP_RULE, priorLedger = [] }) {
  const capMinorUnits = Math.max(0, Number(capRule.capMinorUnits || 0));
  const baselineConsumed = canonicalizeLedgerEntries(priorLedger)
    .filter((entry) => entry.action === "CONSUME")
    .reduce((sum, entry) => sum + toMinor(entry.amountMinorUnits), 0);

  let remainingBudgetMinorUnits = Math.max(0, capMinorUnits - baselineConsumed);
  const readModelItems = [];
  const ledgerEntries = [];

  const grossPotentialMinorUnits = orderedItems.reduce(
    (sum, item) => sum + toMinor(item.independentFinancialValueMinorUnits),
    0
  );

  for (const item of orderedItems) {
    const requestedMinorUnits = toMinor(item.financialSelection?.requestedBenefitMinorUnits);
    const portfolioItemId = item.portfolioItemId;

    ledgerEntries.push({
      action: "RESERVE",
      amountMinorUnits: requestedMinorUnits,
      portfolioItemId,
      ruleFamilyId: capRule.ruleFamilyId,
      ruleVersion: capRule.ruleVersion,
      sequence: ledgerEntries.length + 1
    });

    const consumedMinorUnits = item.status === "COMPLETED" && remainingBudgetMinorUnits > 0
      ? Math.min(requestedMinorUnits, remainingBudgetMinorUnits)
      : 0;
    ledgerEntries.push({
      action: "CONSUME",
      amountMinorUnits: consumedMinorUnits,
      portfolioItemId,
      ruleFamilyId: capRule.ruleFamilyId,
      ruleVersion: capRule.ruleVersion,
      sequence: ledgerEntries.length + 1
    });

    remainingBudgetMinorUnits -= consumedMinorUnits;

    if (item.status === "COMPLETED" && requestedMinorUnits > consumedMinorUnits) {
      const released = requestedMinorUnits - consumedMinorUnits;
      ledgerEntries.push({
        action: "RELEASE",
        amountMinorUnits: released,
        portfolioItemId,
        ruleFamilyId: capRule.ruleFamilyId,
        ruleVersion: capRule.ruleVersion,
        sequence: ledgerEntries.length + 1
      });
    }

    readModelItems.push({
      portfolioItemId,
      independentFinancialValueMinorUnits: toMinor(item.independentFinancialValueMinorUnits),
      financialAwardedMinorUnits: consumedMinorUnits,
      scenarioMarginalValueMinorUnits: consumedMinorUnits,
      remainingBudgetAfterItemMinorUnits: remainingBudgetMinorUnits,
      ruleFamilyId: capRule.ruleFamilyId,
      unit: capRule.unit,
      isConsumedBySharedCap: consumedMinorUnits > 0,
      isCapBlocked: item.status === "COMPLETED" && consumedMinorUnits < requestedMinorUnits
    });
  }

  const consumedTotal = readModelItems.reduce((sum, item) => sum + toMinor(item.scenarioMarginalValueMinorUnits), 0);
  const remainingMarginalMinorUnits = Math.max(0, remainingBudgetMinorUnits);
  const reasonCodes = remainingBudgetMinorUnits <= 0 ? ["CAP_EXHAUSTED"] : [];

  const canonicalLedger = canonicalizeLedgerEntries(ledgerEntries);

  return {
    grossPotentialMinorUnits,
    remainingMarginalMinorUnits,
    remainingBudgetMinorUnits: Math.max(0, remainingBudgetMinorUnits),
    remainingMarginalReasonCodes: reasonCodes,
    exhaustedOpportunities: readModelItems
      .filter((item) => item.isCapBlocked)
      .map((item) => item.portfolioItemId),
    readModelItems,
    sharedEffects: {
      capRule,
      capUtilizationMinorUnits: Math.max(0, capMinorUnits - remainingBudgetMinorUnits)
    },
    ledgerEntries: canonicalLedger,
    ledgerSignature: ledgerSignature(canonicalLedger),
    orderedPrefixReconciledMinorUnits: consumedTotal
  };
}

function toMinor(value) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : 0;
}
