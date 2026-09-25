# Recommendations

Actionable next steps for scaling this suite beyond the current single-engineer, single-target setup.

---

## 1. CI/CD integration

- **PR gating** — run a `@smoke` subset as a required status check; reserve the full regression for a nightly schedule (`0 2 * * *`).
- **Artifact retention** — HTML report 30 days (always), screenshots + videos 14 days (failure only), nightly report 90 days.
- **Failure notifications** — post to team channel on nightly failures with the run URL and a link to the report artifact. Use `if: failure()` + a Slack webhook or `curl`.
- docs: https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows

---

## 2. Suite organisation

- **Tag tiers** with `@cypress/grep`: `@smoke` (happy path, every push), `@critical` (full critical path + edge cases, nightly), `@regression` (everything, nightly).
- **Parallelise** with `cypress run --parallel` or GitHub Actions matrix sharding once the suite grows past ~30 specs.
- **Responsive coverage** — tag layout-sensitive tests `@responsive` and run them over a small breakpoint set (375, 768, 1280) rather than every spec at every viewport.
- docs: https://github.com/cypress-io/cypress/tree/develop/npm/grep

---

## 3. Test data maintenance

- **API-level setup** — replace UI-driven `beforeEach` with `cy.request` to a seed endpoint; faster and more isolated. See BookStore specs for the existing pattern.
- **Run-scoped namespacing** — prefix generated identifiers with `$GITHUB_RUN_ID` (CI) or `Date.now()` (local) to avoid collisions across concurrent runs.
- **Cleanup order** — delete records in `afterEach`, not `beforeEach`; a failed cleanup in `afterEach` surfaces as a warning, not a silent state leak into the next test.
- docs: https://docs.cypress.io/app/core-concepts/best-practices#Using-after-or-afterEach-hooks

---

## 4. Selector stability

- **`data-testid` contract** — agree with the dev team that interactive elements (inputs, buttons, links, table rows) ship with `data-testid` attributes before a feature is marked done. Enforce via PR checklist.
- **Periodic audits** — run `eslint-plugin-cypress/no-force` in CI to surface forced interactions. Quarterly: grep for positional selectors (`:nth-child`, `:eq`) and replace them with stable alternatives.
- docs: https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements

---

## 5. Metrics to track

- **Pass rate** — target ≥ 98%; < 95% → immediate triage
- **Flake rate** (7-day rolling) — target < 2%; > 5% → dedicated flake sprint
- **Full regression duration** — target < 30 min; > 45 min → parallelisation review
- **p95 spec duration** — target < 90 s; outliers → API-level setup
- **Defect escape rate** — target trending down; each escape → post-mortem + new test
- **Mean time to diagnose** — target < 15 min; invest in richer failure context

Collect from Cypress Cloud or by parsing mochawesome JSON in CI and pushing to Datadog, Grafana, or a shared sheet. Review monthly; act on trends, not individual data points.
