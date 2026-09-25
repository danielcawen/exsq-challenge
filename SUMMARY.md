# Submission Summary

## Approach and scope

Covered the five pages specified in the brief — Text Box, Web Tables, Practice Form, Alerts & Frames, Select Menu — plus Dynamic Properties, iframes, and the BookStore REST API as bonus scope. Accessibility (axe-core, WCAG 2.0 A/AA) and responsive breakpoints run as separate opt-in suites.

## Key design decisions

**POM with selector getters + action methods, assertions in specs.** Page objects return chainable `cy.get()` calls; no `should` calls inside page objects — specs own all assertions.

**Selector hierarchy:** `data-testid` → ARIA role/label → stable `#id` → text content. Positional selectors are banned.

**Faker seeding.** Each run prints a seed; `CYPRESS_FAKER_SEED=<n>` reproduces the exact data set. Builders accept an `overrides` object for pinning specific fields.

**Retry policy.** `retries: { runMode: N, openMode: 0 }`. Headless retry count is env-controlled; default is `0`.

## Trade-offs — what I'd do with more time

- **API-level setup for Web Tables** — rows are currently created via UI in `beforeEach`; a `cy.request` fixture would remove the 3–4 s DOM-write cost per test.
- **Custom axe reporter** — structured JSON export + diff against a known-good baseline to distinguish regressions from pre-existing demoqa violations.
- **Intercept-based isolation for Practice Form** — a `cy.intercept` stub would let the spec assert the intended contract independently of ISSUE-001.
- **Visual regression** — one Percy or Applitools run would catch contrast failures (ISSUE-009) without a full axe scan.

## Results

- **Functional** — 7 specs, 42 tests, 42 passing, 0 failing, 1m 31s
- **Accessibility** — 1 spec, 8 tests, 0 passing, 8 failing, ~9s
- **API** — 2 specs, 8 tests, 8 passing, 0 failing
- **Responsive** — 1 spec, 4 tests, 4 passing, 0 failing

Accessibility failures are intentional — each maps to a filed issue (ISSUE-004 through ISSUE-009) documenting real demoqa violations.

**Bugs filed:** 3 functional (ISSUE-001–003), 6 accessibility (ISSUE-004–009). Evidence in `issues/evidence/`.

## Notable challenges

DemoQA's floating banner and footer intercept every click — the CSS injection + `scrollBehavior: "center"` combination was the non-obvious fix. Blocking ad hosts via `blockHosts` eliminated an entire class of DOM-detachment failures. The narrowly scoped `"Script error."` suppression keeps ad noise from failing tests without opening a blanket exception handler. See `DECISIONS.md` for details.
