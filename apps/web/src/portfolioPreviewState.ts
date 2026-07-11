export type PortfolioSnapshotIdentity = {
  calculationRunId: string | null;
  portfolioId: string | null;
  portfolioVersion: number | null;
  scenarioId: string | null;
};

export type PortfolioExhaustedOpportunity = {
  portfolioItemId?: string | null;
  reasonCodes?: string[] | null;
  remainingMarginalValueMinorUnits?: number | null;
};

export type PortfolioSnapshotLike = {
  calculationRunId?: string | null;
  exhaustedOpportunities?: PortfolioExhaustedOpportunity[] | null;
  grossPotentialMinorUnits?: number | null;
  items?: Array<Record<string, unknown>> | null;
  portfolioId?: string | null;
  portfolioVersion?: number | null;
  remainingMarginalValueMinorUnits?: number | null;
  scenarioId?: string | null;
  sharedEffects?: {
    cap?: {
      capMinorUnits?: number | null;
      capUtilizationMinorUnits?: number | null;
      remainingMinorUnits?: number | null;
      sharedMinorUnits?: number | null;
    } | null;
    reasonCodes?: string[] | null;
  } | null;
};

export type CoordinatedSnapshotStatus =
  | "initial-loading"
  | "recalculating"
  | "ready"
  | "conflict"
  | "failure"
  | "disabled";

export type CoordinatedSnapshotState<TPayload> = {
  activePayload: TPayload | null;
  activeSnapshotKey: string | null;
  pendingPayload: TPayload | null;
  pendingSnapshotKey: string | null;
  status: CoordinatedSnapshotStatus;
};

export function extractPortfolioSnapshotIdentity(
  payload: PortfolioSnapshotLike | null | undefined,
): PortfolioSnapshotIdentity | null {
  if (!payload) return null;
  const portfolioId = cleanString(payload.portfolioId);
  const scenarioId = cleanString(payload.scenarioId);
  const calculationRunId = cleanString(payload.calculationRunId);
  const portfolioVersion =
    typeof payload.portfolioVersion === "number" &&
    Number.isFinite(payload.portfolioVersion)
      ? payload.portfolioVersion
      : null;

  if (
    !portfolioId &&
    !scenarioId &&
    !calculationRunId &&
    portfolioVersion == null
  ) {
    return null;
  }

  return {
    calculationRunId,
    portfolioId,
    portfolioVersion,
    scenarioId,
  };
}

export function portfolioSnapshotKey(
  identity: PortfolioSnapshotIdentity | null | undefined,
) {
  if (!identity) return null;
  const parts = [
    identity.portfolioId,
    identity.portfolioVersion == null
      ? null
      : String(identity.portfolioVersion),
    identity.scenarioId,
    identity.calculationRunId,
  ].filter((value): value is string => Boolean(value));

  return parts.length ? parts.join("|") : null;
}

export function isSamePortfolioSnapshot(
  left: PortfolioSnapshotIdentity | null | undefined,
  right: PortfolioSnapshotIdentity | null | undefined,
) {
  const leftKey = portfolioSnapshotKey(left);
  const rightKey = portfolioSnapshotKey(right);
  if (!leftKey || !rightKey) return false;
  return leftKey === rightKey;
}

export function createCoordinatedSnapshotState<TPayload>(
  payload: TPayload | null,
  snapshot: PortfolioSnapshotLike | null | undefined,
): CoordinatedSnapshotState<TPayload> {
  const snapshotIdentity = extractPortfolioSnapshotIdentity(snapshot);
  const snapshotKey = portfolioSnapshotKey(snapshotIdentity);

  return {
    activePayload: payload,
    activeSnapshotKey: snapshotKey,
    pendingPayload: null,
    pendingSnapshotKey: null,
    status: payload ? "ready" : "initial-loading",
  };
}

export function stageCoordinatedSnapshotPayload<TPayload>(
  state: CoordinatedSnapshotState<TPayload>,
  payload: TPayload | null,
  snapshot: PortfolioSnapshotLike | null | undefined,
): CoordinatedSnapshotState<TPayload> {
  const snapshotIdentity = extractPortfolioSnapshotIdentity(snapshot);
  const snapshotKey = portfolioSnapshotKey(snapshotIdentity);

  if (!snapshotKey || !state.activeSnapshotKey) {
    return {
      ...state,
      activePayload: payload,
      activeSnapshotKey: snapshotKey,
      pendingPayload: null,
      pendingSnapshotKey: null,
      status: payload ? "ready" : "initial-loading",
    };
  }

  if (snapshotKey === state.activeSnapshotKey) {
    return {
      ...state,
      activePayload: payload,
      pendingPayload: null,
      pendingSnapshotKey: null,
      status: "ready",
    };
  }

  return {
    ...state,
    pendingPayload: payload,
    pendingSnapshotKey: snapshotKey,
    status: "recalculating",
  };
}

export function commitCoordinatedSnapshotPayload<TPayload>(
  state: CoordinatedSnapshotState<TPayload>,
): CoordinatedSnapshotState<TPayload> {
  if (!state.pendingPayload) return state;

  return {
    ...state,
    activePayload: state.pendingPayload,
    activeSnapshotKey: state.pendingSnapshotKey,
    pendingPayload: null,
    pendingSnapshotKey: null,
    status: "ready",
  };
}

export function rejectStaleCoordinatedSnapshotPayload<TPayload>(
  state: CoordinatedSnapshotState<TPayload>,
  payload: TPayload | null,
  snapshot: PortfolioSnapshotLike | null | undefined,
): CoordinatedSnapshotState<TPayload> {
  const snapshotKey = portfolioSnapshotKey(
    extractPortfolioSnapshotIdentity(snapshot),
  );
  if (!snapshotKey || snapshotKey === state.activeSnapshotKey) {
    return stageCoordinatedSnapshotPayload(state, payload, snapshot);
  }

  return {
    ...state,
    status: state.activePayload ? "recalculating" : "conflict",
  };
}

export function markCoordinatedSnapshotFailure<TPayload>(
  state: CoordinatedSnapshotState<TPayload>,
  hasRenderablePayload: boolean,
): CoordinatedSnapshotState<TPayload> {
  return {
    ...state,
    pendingPayload: null,
    pendingSnapshotKey: null,
    status: hasRenderablePayload ? "ready" : "failure",
  };
}

function cleanString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
