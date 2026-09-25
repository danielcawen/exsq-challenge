# Design decisions

Non-obvious choices made during setup and why they exist. These are the things that look wrong at a glance but are intentional.

## Tools

- **[Cypress](https://docs.cypress.io)** — test runner
- **[cypress-axe](https://github.com/component-driven/cypress-axe)** — injects and runs axe in the Cypress browser context
- **[axe-core](https://github.com/dequelabs/axe-core/blob/master/doc/API.md)** — accessibility rules engine underlying cypress-axe
- **[@faker-js/faker](https://fakerjs.dev)** — reproducible fake test data
- **[cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)** — HTML test reports
- **[dotenv](https://github.com/motdotla/dotenv)** — loads `.env.local` into `process.env` at config time
- **[ESLint](https://eslint.org/docs/latest)** — static analysis
- **[eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress)** — Cypress-specific lint rules
- **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)** — disables ESLint rules that conflict with Prettier
- **[Prettier](https://prettier.io/docs)** — code formatting

### Banner and footer suppression (`cypress/support/e2e.js`)

DemoQA's fixed top banner and footer float over the viewport and intercept clicks. A global `beforeEach` hides both via CSS injection on every `window:load` event:

```js
style.textContent = "#fixedban, footer { display: none !important; }";
```

### `scrollBehavior: "center"` (`cypress.config.js`)

By default Cypress scrolls a target element to the top of the viewport. The fixed banner occludes that position, causing clicks to land on the banner. `scrollBehavior: "center"` moves the target to the vertical midpoint, away from both overlays.

- docs: https://docs.cypress.io/app/references/configuration#scrollBehavior

## Suppressing cross-origin ad errors

DemoQA serves third-party ad scripts without CORS headers. When those scripts throw, the browser redacts the details and reports only `"Script error."` — a cross-origin opaque error that cannot be fixed. The suite suppresses exactly that signature so ad noise does not fail tests while all other uncaught errors still surface normally.

- Cypress recommendation: https://docs.cypress.io/app/references/configuration#blockHosts

## `blockHosts` (`cypress.config.js`)

DemoQA loads Google Ads, Tag Manager, and DoubleClick scripts on every page. Blocking them eliminates network latency and a class of DOM-mutation flakiness caused by asynchronous node injection.

- docs: https://docs.cypress.io/app/references/configuration#blockHosts
- Cypress best practice on third-party scripts: https://docs.cypress.io/app/core-concepts/best-practices#Visiting-external-sites

## `"type": "module"` (`package.json`)

Declares the project as ESM so `cypress.config.js` can use `import`/`export`. Cypress 10+ resolves the config natively as ESM when the package is typed as a module.

- docs: https://docs.cypress.io/app/references/configuration#ESM-support

## `overrides` — `cypress-axe` peer dependency (`package.json`)

`cypress-axe@1.x` declares a peer on `cypress` up to v13, which excludes Cypress 16. The override pins `cypress-axe`'s internal resolution to the root `cypress` version and prevents a duplicate install.

```json
"overrides": {
  "cypress-axe": {
    "cypress": "$cypress"
  }
}
```

- docs: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides

## Accessibility scan scoping (`cypress/support/commands/a11yCommands.js`)

### WCAG conformance level — why A/AA and not AAA

The suite targets `wcag2a` and `wcag2aa` only. Level AAA is excluded because the W3C itself does not recommend it as a general policy — it is not achievable for all content types and would produce noise from third-party widgets outside our control.

The `best-practice` axe tag is also excluded; it fires on React Select components that demoqa owns and we cannot change.

- axe-core tag reference: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#axe-core-tags
- WCAG 2 levels explained: https://www.w3.org/WAI/WCAG21/Understanding/conformance#levels

### Context exclusions

`#fixedban` and `footer` are hidden via CSS injection before every test — scanning hidden elements produces misleading violations. `iframe` is excluded because axe cannot cross cross-origin boundaries; DemoQA embeds third-party ad iframes on every page.

- axe context docs: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#context-parameter

## `excludeSpecPattern` (`cypress.config.js`)

Accessibility, responsive, and API specs are excluded from the default run. Each has a dedicated npm script (`test:a11y`, `test:responsive`) and separate CI job.

- docs: https://docs.cypress.io/app/references/configuration#excludeSpecPattern

## Faker seed (`cypress/support/e2e.js`)

Each run prints a random seed. Re-running with `CYPRESS_FAKER_SEED=<value>` reproduces the exact same data set.

- docs: https://fakerjs.dev/guide/

## `retries: { runMode: N, openMode: 0 }` (`cypress.config.js`)

Failures surface immediately in headed mode. Headless retry count is env-controlled via `RETRIES` (default `0`).

- docs: https://docs.cypress.io/app/references/configuration#retries

## CI / GitHub Actions

Two workflows in `.github/workflows/`:

- **`e2e.yml`** — push + pull_request: Lint → Format check → Functional suite
- **`a11y.yml`** — `workflow_dispatch` only: Accessibility suite

`ENV_FILE: .env.example` provides safe defaults; `CYPRESS_*`-prefixed vars in the workflow `env:` block override those values without touching files.
