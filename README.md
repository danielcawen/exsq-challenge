# exsq-challenge

[![E2E](https://github.com/danielcawen/exsq-challenge/actions/workflows/e2e.yml/badge.svg)](https://github.com/danielcawen/exsq-challenge/actions/workflows/e2e.yml)
[![Accessibility](https://github.com/danielcawen/exsq-challenge/actions/workflows/a11y.yml/badge.svg)](https://github.com/danielcawen/exsq-challenge/actions/workflows/a11y.yml)

Cypress end-to-end test suite for [DemoQA](https://demoqa.com). It covers the functional UI (Elements, Forms, Widgets, Alerts & Frames), REST API, accessibility (axe-core), and responsive breakpoints. The suite is wired to GitHub Actions: every push and pull request runs lint, format checks, and the functional suite; accessibility runs on demand via `workflow_dispatch`.

## Prerequisites

- **Node.js** — 24.15.0 (see `.nvmrc`)
- **npm** — 11.x

If you use nvm: `nvm use` picks up the version from `.nvmrc` automatically.

## Install

```sh
git clone <repo-url>
cd exsq-challenge
npm ci
```

## Configure

Copy `.env.example` to `.env.local` and set `BASE_URL` to the target application:

```sh
cp .env.example .env.local
```

`.env.local` is loaded automatically at config time. It is git-ignored; never commit it.

## Run

### Functional suite (headless)

```sh
npm test
```

### Interactive / headed

```sh
npm run cy:open
```

### Single spec

```sh
npx cypress run --spec cypress/e2e/elements/web-tables.cy.js
```

### Accessibility suite

```sh
npm run test:a11y
```

### Responsive suite

```sh
npm run test:responsive
```

### Lint

```sh
npm run lint
```

Auto-fix:

```sh
npm run lint:fix
```

### Format

Check only:

```sh
npm run format:check
```

Apply:

```sh
npm run format
```

## Results

- **HTML report** — `reports/index.html`
- **Screenshots (failures)** — `cypress/screenshots/`
- **Videos** — `cypress/videos/`

Open the HTML report:

```sh
open reports/index.html          # macOS
xdg-open reports/index.html      # Linux
start reports/index.html         # Windows
```

Screenshots and videos are embedded in the report when run headlessly (`inlineAssets: true`).

## Project structure

```
.
├── cypress/
│   ├── e2e/
│   │   ├── accessibility/      # axe-core scans (excluded from default run)
│   │   ├── alerts-frames/      # alert dialogs, iframes
│   │   ├── api/                # REST API specs (excluded from default run)
│   │   ├── elements/           # Text Box, Web Tables, Dynamic Properties
│   │   ├── forms/              # Practice Form
│   │   ├── responsive/         # viewport / breakpoint specs (excluded from default run)
│   │   └── widgets/            # Select Menu
│   ├── fixtures/
│   │   ├── boundaryValues.json # edge-case inputs
│   │   ├── employees.json      # static employee rows for Web Tables
│   │   ├── invalidEmails.json  # invalid email formats for parameterised tests
│   │   └── files/              # files used in upload tests
│   ├── pages/                  # Page Object Model — one file per page/component
│   ├── support/
│   │   ├── commands/           # custom Cypress commands, split by domain
│   │   ├── commands.js         # barrel that imports all commands from commands/
│   │   └── e2e.js              # global hooks, faker seed, axe + reporter registration
│   └── utils/
│       ├── apiClient.js        # thin wrapper around cy.request for the BookStore API
│       ├── dataFactory.js      # faker-backed builders (buildUser, buildEmployee, …)
│       └── helpers.js          # pure utility functions
├── issues/                     # bug reports with screenshots and videos as evidence
├── reports/                    # generated HTML reports (git-ignored)
├── .env.example                # safe defaults; copy to .env.local to run locally
├── cypress.config.js           # Cypress configuration
├── eslint.config.js            # ESLint flat config
├── .prettierrc                 # Prettier options
└── .nvmrc                      # Node version pin
```

> `tree -L 3 -I 'node_modules|videos|screenshots|.git|issues' --dirsfirst`

## Environment variables

All variables are read from the env file specified by `ENV_FILE` (default `.env.local`) via dotenv, then optionally overridden by any `CYPRESS_*`-prefixed variable present in `process.env`.

- `BASE_URL` _(required)_ — `baseUrl`, the demoqa root URL
- `DEFAULT_COMMAND_TIMEOUT` — milliseconds before a command times out (default `4000`)
- `PAGE_LOAD_TIMEOUT` — milliseconds to wait for a page load (default `60000`)
- `RETRIES` — retry count in headless mode (`runMode`); always `0` in interactive mode (default `0`)
- `VIDEO` — record video during `cypress run` (default `false`)
- `VIEWPORT_WIDTH` — browser viewport width in pixels (default `1280`)
- `VIEWPORT_HEIGHT` — browser viewport height in pixels (default `720`)
- `SCREENSHOT_ON_RUN_FAILURE` — capture a screenshot when a test fails (default `true`)
- `MANAGE_BROWSER_MEMORY` — enable Cypress browser memory management (default `true`)
- `CYPRESS_FAKER_SEED` — pin the faker seed to reproduce a specific data set (default: random)
- `ENV_FILE` — path to the env file loaded by dotenv (default `.env.local`)

`CYPRESS_*`-prefixed variables (e.g. `CYPRESS_BASE_URL`) are consumed directly by Cypress and override the corresponding dotenv value. This is how CI injects secrets without touching any files.

## Known limitations and demoqa quirks

- **Ad blocking** — DemoQA ad scripts are blocked via `blockHosts` to avoid network noise and DOM-mutation flakiness.
- **Banner/footer overlay** — A global `beforeEach` hides `#fixedban` and `footer` via CSS injection; `scrollBehavior: "center"` prevents the banner from intercepting clicks.
- **Cross-origin ad errors** — The `uncaught:exception` handler suppresses the literal string `"Script error."` so ad noise does not fail tests; all other exceptions still surface.

## CI pipeline

- **`e2e.yml`** (push + pull_request) — Lint & Format → Functional suite. Failure artifacts uploaded as `cypress-failure-media`; report always uploaded as `cypress-report`.
- **`a11y.yml`** (`workflow_dispatch`) — Accessibility suite; accepts optional `viewport_width` / `viewport_height` inputs.
