# RetroFi Product TODOs

This document captures product, data-quality, and verification work that should guide future Codex sessions.

## Opportunity Data Confidence

- Continue GPT Pro-assisted opportunity-data repair until every user-visible opportunity has complete source-backed availability, utility, facility, applicant, geography, technology, requirements, blockers, and evidence data.
- Keep `match_confidence` separate from `source_confidence`. `match_confidence` is the deterministic matcher's confidence that the repaired, normalized data lets it reach a rules-backed outcome. For repaired opportunities, the goal is to push `match_confidence` to 100% by making every match-relevant field complete enough to resolve as math-backed `eligible`, `ineligible`, `needs_information`, or `no_match`.
- Treat `source_confidence` as research/provenance confidence in the opportunity data itself. Low `source_confidence` means the cited source evidence is incomplete, ambiguous, blocked, stale, or needs human judgment. It does not mean deterministic matching failed.
- TODO: Queue opportunities with low `source_confidence` for later deeper GPT Pro research or human/admin verification. Do not treat a 100% deterministic `match_confidence` as proof that the underlying source evidence is fully trusted.
- If GPT Pro cannot repair a source-inaccessible opportunity after targeted follow-up, archive or exclude it from product-visible data instead of keeping it as a long-running manual-research blocker. Future automation should treat repeated source-access failure as a terminal product decision unless a new accessible official source appears.
- Treat the historical GPT Pro repair `confidence` field as `source_confidence` unless and until it is explicitly migrated. It should not be mixed with deterministic `match_confidence`.
- Compare GPT Pro repairs against Codex-imported or Codex-inferred data. When GPT Pro finds errors, Codex should record why the deterministic parser failed and write updated extraction strategies so future repair can be automated.
- Preserve debugging detail about why data failed or why a record needed repair. This detail is mainly for admin/debugging and GPT Pro repair prompts, not for the first-pass user portal experience.

## Grant And Incentive Estimates

- Replace the `possible_grant` treatment with expected-value grant estimates. Every matched grant should have a rule or heuristic for estimating the amount the user is expected to receive.
- Use the v2 incentive calculation model in [Incentive Calculation Model V2](./incentive-calculation-model-v2.md) as the implementation direction for replacing simple one-rule opportunity incentives.
- Redesign incentive rules so an opportunity can hold rate tables, measure catalogs, multiple calculation components, caps, per-customer limits, eligibility conditions, and both one-time and recurring effects. Do not assume one opportunity maps to one simple formula.
- Preserve multiple incentive effects even before the full v2 schema lands: an opportunity-retrofit pair may have separate upfront, recurring savings, recurring expense, tax, and grant-estimate rules with the same `opportunityId`.
- Current simplifying assumption: retrofit estimates and opportunity matches are treated independently. If one opportunity applies to multiple retrofits, the estimator currently assumes the user has not already implemented related retrofits and does not recalculate value based on prior completed work.
- TODO: Add user state tracking for already-implemented retrofits and dependent opportunities. A user's current state should include completed retrofits, installed measures, prior incentive use, achieved energy reduction, remaining eligible basis, and other facts that can change the marginal value of a later retrofit. For opportunities with state-dependent thresholds, caps, tiers, or stacking rules, recalculate one-time savings, recurring savings, grant estimates, rebates, and tax credits from the user's current state instead of treating each retrofit as independent.
- Example dependency to model later: energy-savings tax credits or incentives where the first 50% energy reduction earns one fixed dollar amount per square foot, but savings beyond that threshold earn a different value. If completed retrofits already put the user past the 50% threshold, the next retrofit's one-time and recurring savings should be valued using the correct marginal tier rather than the base tier.
- Keep the future state/dependency logic case-specific and source-backed. Some opportunities may depend on cumulative energy reduction, some on prior rebate claims, some on caps across measures, and some on whether another retrofit has already used the same eligible cost basis.
- Fact-check existing simple-formula rules with GPT Pro help. Some opportunities currently modeled with simple formulas may actually require rate-card or measure-catalog extraction, and those rules should be repaired before they are trusted in user-facing estimates.
- Classify grant estimates into the correct calculation bucket:
  - deterministic upfront grants or rebates should reduce one-time cost;
  - recurring credits, tariffs, or bill effects should affect recurring savings or expenses;
  - uncertain grant ranges should use an explicit estimate heuristic instead of being displayed as merely possible money.
- Treat tax credits as first-class monetary effects, not as grants. They should be extracted, calculated conservatively when required assumptions are available, and shown separately as tax incentives instead of being ignored or routed through grant-estimate logic.
- Keep the heuristic source-backed where possible. If the source provides a maximum share, award range, scoring criteria, or historical award pattern, use that evidence to define conservative expected values.
- TODO: Add user-editable v2 incentive input fields to the user preview/intake flow. Runtime defaults such as `unit_count = 1`, derived eligible project cost, inferred charger/fixture counts, equipment tier placeholders, and test-case synthetic values must be visible as assumptions where applicable and overrideable by the user before they are treated as reliable customer-specific estimates.
- TODO: Create a structured input-question catalog and retrofit form assembly layer. Split questions into stable base retrofit questions, opportunity-specific incentive inputs, cross-cutting tax/profile questions, bill/quote-derived fields, and application-prep requirements. The form for a selected retrofit/scenario should merge and dedupe these sources instead of relying on hardcoded frontend question lists.
- Base retrofit questions should attach to the retrofit taxonomy or retrofit table by question ID, while opportunity-specific questions should stay with v2 incentive packages as required inputs. User/project answers should be stored separately on the user, project, or retrofit instance so question definitions are not mixed with submitted values.
- The form assembly layer should expose visible editable placeholders for conservative defaults, especially quantity defaults such as `unit_count = 1`, and mark whether each value is user-entered, bill-derived, quote-derived, source-derived, inferred, or synthetic test-case data.
- TODO: Research environmental impact fines and avoided-compliance-cost modeling for businesses. Determine how penalties work across common retrofit-relevant areas such as emissions, refrigerants, wastewater, stormwater, solid/hazardous waste, idling/fleet rules, building performance standards, benchmarking, and local permitting. If a retrofit plausibly reduces penalty exposure, model the value separately from incentives as `avoided_compliance_penalty` or a similar effect, with jurisdiction, rule, violation threshold, enforcement/inspection trigger, user-specific compliance state, and confidence clearly recorded. Do not count speculative avoided fines in user-facing savings totals unless the applicable rule and the user's risk/violation baseline are supportable; otherwise show it as a compliance-risk review item.
- Do not archive non-monetary opportunities merely because they do not produce direct cash savings. Expedited permitting, interconnection access, technical assistance, required pre-approval paths, and gateway programs should be retained when they attach to a normal or special retrofit workflow, with value modeled later as process, feasibility, or required-action effects.
- Do not treat currently unsupported retrofit/user paths as dead ends. If a real source-backed opportunity points to a missing retrofit type, sector workflow, tariff workflow, agricultural measure, utility-scale generation project, renewable-generation project, or no-install/action-only opportunity, create or queue the needed retrofit/workflow taxonomy instead of discarding the opportunity.
- TODO: Automate retrofit/workflow taxonomy expansion from repaired opportunity data. When new source-backed opportunity categories appear that are not in the retrofit database, create reviewable candidate retrofits or workflow types, including a catchall no-retrofit-needed/action-only type for opportunities such as tariffs, rates, enrollment programs, audits, preapproval, or other benefits that may require user action but not a physical retrofit.

## Scenario And Math Verification

- Use GPT Pro to verify whether Codex-selected scenarios, meaning subsets of opportunities that can be done together, are correct across all current test cases.
- Ask GPT Pro to check whether each best scenario is missing an additive compatible opportunity, includes two conflicting opportunities, or incorrectly excludes an opportunity that should stack.
- Ask GPT Pro to review whether the one-time and recurring math is correct for the selected scenarios, including incentive caps, grant shares, recurring credits, expenses, and stacking rules.
- Use GPT Pro feedback to identify gaps in Codex's scenario rules, opportunity compatibility data, and savings formulas.

## User-Selected Opportunity Planning

- Add a future user interface where users can deselect opportunities from the best scenario and choose the opportunities they actually want to pursue.
- Recalculate one-time cost, one-time savings, recurring savings, recurring expenses, payback, ROI, and grant estimates dynamically from the selected opportunity subset.
- Clearly show when a selected opportunity conflicts with another selected opportunity or when adding an opportunity changes the calculation basis.
- Add a future state editor where users can record retrofits they have already completed before using RetroFi. This state should feed the dependent-opportunity calculator so recommended next retrofits reflect already-used incentives, cumulative project history, and marginal savings tiers.

## User Portal

- Audit the current user portal behavior end to end, including sign-in, intake linkage, utility upload visibility, retrofit estimates, admin preview, loading states, errors, and production performance.
- Document the current user portal functionality before redesigning it.
- Improve the portal around the main user priorities first: recommended retrofits, relevant opportunities, expected money, required next steps, and useful document/upload prompts.
- Keep detailed repaired blockers, requirements, applicant rules, geography, utility territories, and evidence available for debugging/admin review, but do not make that the primary user-facing experience.

## Test Cases Page

- Add payback period information to the test cases page so each retrofit/test-case estimate can show the expected payback period alongside cost, savings, opportunity, and ROI details.

## Publish Gate And Automation

- Add a backend publish gate so opportunities cannot become user-accessible until they are fully repaired and can resolve to deterministic user-facing outcomes.
- Automate DSIRE opportunity collection, availability repair, opportunity-data repair, incentive-rule extraction, scenario verification, and fixture regeneration as later workflow work.
- The automated repair system should use GPT Pro or another review process to validate Codex extraction strategies until deterministic parsing is reliable enough for routine updates.
- Add an admin escalation path for failed automated repair. If source access, extraction, or confidence checks fail, the system should notify an admin, preserve the failed record and evidence, and support a GPT Pro/manual research response that Codex can import to repair, archive, or discard the opportunity.
- Plan for future opportunity collection beyond DSIRE. When approved by the team, add other databases and consider a dynamic source-link tree that follows aggregator records back to primary source pages so RetroFi can collect and verify opportunities from the sources themselves.
