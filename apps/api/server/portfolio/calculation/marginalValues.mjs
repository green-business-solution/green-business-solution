import { evaluateFixedUnitCap, DEFAULT_CAP_RULE } from "./capEvaluation.mjs";
import { traceForCalculation } from "./trace.mjs";

export function calculatePortfolioReadModel({
  aggregate,
  scenarioId = "default",
  scenarioOrder = [],
  calculationBinding = "calc-v1",
  capRule = DEFAULT_CAP_RULE,
  calculationRunId,
}) {
  const orderedItemIds =
    scenarioOrder.length > 0
      ? scenarioOrder
      : Array.isArray(aggregate.itemOrder) && aggregate.itemOrder.length > 0
        ? aggregate.itemOrder
        : Object.keys(aggregate.items || {}).sort((a, b) =>
            String(a).localeCompare(String(b)),
          );

  const orderedItems = orderedItemIds
    .map((itemId) => aggregate.items[itemId])
    .filter(Boolean)
    .map((item) => ({
      ...item,
      independentFinancialValueMinorUnits: Number(
        item.independentFinancialValueMinorUnits || 0,
      ),
      financialSelection: {
        ...item.financialSelection,
        requestedBenefitMinorUnits: Number(
          item.financialSelection?.requestedBenefitMinorUnits || 0,
        ),
      },
    }));

  const capResult = evaluateFixedUnitCap({
    orderedItems,
    capRule,
    priorLedger: [],
  });

  const readModel = {
    schemaVersion: "portfolio-read-model-v1",
    portfolioId: aggregate.portfolioId,
    userId: aggregate.userId,
    scenarioId,
    calculationRunId,
    portfolioVersion: aggregate.aggregateVersion,
    calculationBinding,
    capRule,
    grossPotentialMinorUnits: capResult.grossPotentialMinorUnits,
    remainingMarginalValueMinorUnits: capResult.remainingMarginalMinorUnits,
    sharedEffects: {
      cap: capResult.sharedEffects,
      reasonCodes: capResult.remainingMarginalReasonCodes,
    },
    exhaustedOpportunities: capResult.exhaustedOpportunities,
    orderedPrefixChecks: {
      totalAllocatedMinorUnits: capResult.orderedPrefixReconciledMinorUnits,
    },
    items: capResult.readModelItems.map((readItem) => ({
      ...aggregate.items[readItem.portfolioItemId],
      marginalValueMinorUnits: readItem.scenarioMarginalValueMinorUnits,
      consumedFromSharedCapMinorUnits: readItem.financialAwardedMinorUnits,
      remainingBudgetMinorUnits: readItem.remainingBudgetAfterItemMinorUnits,
    })),
    ledger: {
      entries: capResult.ledgerEntries,
      signature: capResult.ledgerSignature,
    },
    trace: traceForCalculation({ items: orderedItems, capResult }),
  };

  return readModel;
}
