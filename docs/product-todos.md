# RetroFi Product TODOs

This document captures product, data-quality, and verification work that should guide future Codex sessions.

## Opportunity Data Confidence

- Continue GPT Pro-assisted opportunity-data repair until every user-visible opportunity has complete source-backed availability, utility, facility, applicant, geography, technology, requirements, blockers, and evidence data.
- Treat `opportunityDataConfidence` as confidence that the required data is complete enough for deterministic matching. Once the missing/bad data is repaired, deterministic matching should be able to produce 100% confidence for repaired records.
- Compare GPT Pro repairs against Codex-imported or Codex-inferred data. When GPT Pro finds errors, Codex should record why the deterministic parser failed and write updated extraction strategies so future repair can be automated.
- Preserve debugging detail about why data failed or why a record needed repair. This detail is mainly for admin/debugging and GPT Pro repair prompts, not for the first-pass user portal experience.

## Grant And Incentive Estimates

- Replace the `possible_grant` treatment with expected-value grant estimates. Every matched grant should have a rule or heuristic for estimating the amount the user is expected to receive.
- Classify grant estimates into the correct calculation bucket:
  - deterministic upfront grants or rebates should reduce one-time cost;
  - recurring credits, tariffs, or bill effects should affect recurring savings or expenses;
  - uncertain grant ranges should use an explicit estimate heuristic instead of being displayed as merely possible money.
- Keep the heuristic source-backed where possible. If the source provides a maximum share, award range, scoring criteria, or historical award pattern, use that evidence to define conservative expected values.

## Scenario And Math Verification

- Use GPT Pro to verify whether Codex-selected scenarios, meaning subsets of opportunities that can be done together, are correct across all current test cases.
- Ask GPT Pro to check whether each best scenario is missing an additive compatible opportunity, includes two conflicting opportunities, or incorrectly excludes an opportunity that should stack.
- Ask GPT Pro to review whether the one-time and recurring math is correct for the selected scenarios, including incentive caps, grant shares, recurring credits, expenses, and stacking rules.
- Use GPT Pro feedback to identify gaps in Codex's scenario rules, opportunity compatibility data, and savings formulas.

## User-Selected Opportunity Planning

- Add a future user interface where users can deselect opportunities from the best scenario and choose the opportunities they actually want to pursue.
- Recalculate one-time cost, one-time savings, recurring savings, recurring expenses, payback, ROI, and grant estimates dynamically from the selected opportunity subset.
- Clearly show when a selected opportunity conflicts with another selected opportunity or when adding an opportunity changes the calculation basis.

## User Portal

- Audit the current user portal behavior end to end, including sign-in, intake linkage, utility upload visibility, retrofit estimates, admin preview, loading states, errors, and production performance.
- Document the current user portal functionality before redesigning it.
- Improve the portal around the main user priorities first: recommended retrofits, relevant opportunities, expected money, required next steps, and useful document/upload prompts.
- Keep detailed repaired blockers, requirements, applicant rules, geography, utility territories, and evidence available for debugging/admin review, but do not make that the primary user-facing experience.

## Publish Gate And Automation

- Add a backend publish gate so opportunities cannot become user-accessible until they are fully repaired and can resolve to deterministic user-facing outcomes.
- Automate DSIRE opportunity collection, availability repair, opportunity-data repair, incentive-rule extraction, scenario verification, and fixture regeneration as later workflow work.
- The automated repair system should use GPT Pro or another review process to validate Codex extraction strategies until deterministic parsing is reliable enough for routine updates.
