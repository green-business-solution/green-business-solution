# Portfolio State Core H6

Implementation commit: `67d8cba`.

## Files And Contracts

- `apps/api/server/portfolio/domain/events.mjs` adds immutable portfolio event envelopes, canonical hashing, and replay ordering.
- `apps/api/server/portfolio/domain/aggregate.mjs` adds the event reducer, stable aggregate fingerprinting, version tracking, and item lifecycle transitions.
- `apps/api/server/portfolio/domain/invariants.mjs` adds ownership, feature-flag, version, and completion validation.
- `apps/api/server/portfolio/calculation/` adds the deterministic shared-cap evaluation, scenario ordering, marginal value projection, and trace output.
- `apps/api/server/portfolio/persistence/portfolioStore.mjs` adds the DynamoDB event, snapshot, read-model, outbox, and idempotency row helpers.
- `apps/api/server/portfolio/http/portfolioHandlers.mjs` adds the additive read, recalculate, and complete handlers.
- `apps/api/server/portfolio/portfolioCore.test.mjs` covers the reducer, calculation, handler, idempotency, and conflict behavior.
- `apps/api/server/index.mjs` wires the additive portfolio routes into the API.
- `docs/data-model.md` and `docs/architecture-resource-map.md` document the new portfolio-backed runtime rows in `gbs-api-runtime-state`.

## Supported Behavior

- One portfolio can be seeded per migrated intake through the additive read path.
- Portfolio item identities are stable within the persisted item order.
- Item lifecycle state supports `HYPOTHETICAL`, `COMPLETED`, and `ABANDONED`.
- A correction event preserves the original completion event in the immutable ledger.
- Completion requires `expectedPortfolioVersion`, `commandId`, `idempotencyKey`, and `calculationBinding`.
- Duplicate command delivery is idempotent when the payload matches the stored receipt.
- Stale completion or recalculate requests fail conservatively with a version conflict.
- The supported shared-rule family is the fixed-unit cap with a single reset window.
- The read model exposes gross potential, remaining marginal value, shared effects, exhausted opportunities, reason codes, portfolio version, scenario, and calculation run.
- The backend write path stays off by default behind `RETROFI_PORTFOLIO_WRITE_ENABLED`.

## Unsupported Behavior

- Tiered caps, recurring caps, and partial completion remain out of scope.
- Application-driven reservation flows remain out of scope.
- Frontend `Done` UI changes remain out of scope.
- Complex portfolio effects that are not modeled here must still be handled explicitly by later slices.

## Tests

- `npm run check -w @gbs/api` passed.
- `npx vitest run apps/api/server/portfolio/portfolioCore.test.mjs apps/api/server/retrofitRecommendations.test.mjs` passed.
- The portfolio suite proved deterministic replay, pool conservation, no double counting across model history, order independence, duplicate delivery idempotency, changed-payload rejection, stale completion conflict, stale recalculate conflict, correction preservation, and feature-flag-off behavior.
- The existing independent retrofit recommendation tests stayed green.

## Follow-Up Contract

- The frontend `Done` flow should read `portfolioVersion`, `scenario.order`, `readModel.items[].marginalValueMinorUnits`, `sharedEffects.cap`, and `exhaustedOpportunities` before sending completion commands.
- The completion command should send `expectedPortfolioVersion`, `commandId`, `idempotencyKey`, `calculationBinding`, and `financialSelection.requestedBenefitMinorUnits`.
- The UI should treat stale completion responses as a refresh-and-retry condition.

## Unresolved Product Decision

- The canonical portfolio identity mapping for future multi-portfolio support is still unresolved.
- This slice currently keys ownership to the client user and a single portfolio per intake.
