import { faker } from "@faker-js/faker";
import "cypress-axe";
import "cypress-mochawesome-reporter/register";
import "./commands";

Cypress.on("uncaught:exception", (err) => {
  if (err.message === "Script error.") return false;
});

beforeEach(() => {
  cy.on("window:load", (win) => {
    const style = win.document.createElement("style");
    style.textContent = "#fixedban, footer { display: none !important; }";
    win.document.head.appendChild(style);
  });
});

// docs: https://fakerjs.dev/guide/
const seed = (Cypress.config("env") || {}).FAKER_SEED ?? Math.floor(Math.random() * 2 ** 31);
faker.seed(seed);

console.log(
  `[faker] seed: ${seed}  →  set CYPRESS_FAKER_SEED=${seed} in your env file to reproduce`
);
