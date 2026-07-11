import crypto from "node:crypto";

export function traceForCalculation({ items, capResult }) {
  const order = items.map((item) => item.portfolioItemId);
  return {
    generatedAt: new Date().toISOString(),
    version: 1,
    order,
    steps: items.map((item) => ({
      portfolioItemId: item.portfolioItemId,
      status: item.status,
      independentFinancialValueMinorUnits:
        item.independentFinancialValueMinorUnits,
      requestedBenefitMinorUnits:
        item.financialSelection?.requestedBenefitMinorUnits || 0,
      marginalAwardMinorUnits: item.scenarioMarginalValueMinorUnits || 0,
    })),
    grossPotentialMinorUnits: capResult.grossPotentialMinorUnits,
    remainingMarginalMinorUnits: capResult.remainingMarginalMinorUnits,
    remainingBudgetMinorUnits: capResult.remainingBudgetMinorUnits,
    reasonCodes: capResult.remainingMarginalReasonCodes,
    exhaustedOpportunities: capResult.exhaustedOpportunities,
  };
}

export function canonicalizeLedgerEntries(entries = []) {
  return entries
    .map((entry, index) => ({
      sequence: Number(entry.sequence || index + 1),
      action: String(entry.action || "").toUpperCase(),
      amountMinorUnits: Number(entry.amountMinorUnits || 0),
      portfolioItemId: String(entry.portfolioItemId || ""),
      ruleFamilyId: String(entry.ruleFamilyId || ""),
      ruleVersion: String(entry.ruleVersion || ""),
    }))
    .sort(
      (a, b) =>
        a.sequence - b.sequence ||
        a.portfolioItemId.localeCompare(b.portfolioItemId) ||
        a.action.localeCompare(b.action),
    );
}

export function ledgerSignature(entries = []) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(canonicalizeLedgerEntries(entries)))
    .digest("hex");
}
