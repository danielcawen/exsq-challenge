const enableAfterButtonSelector = "#enableAfter";
const visibleAfterButtonSelector = "#visibleAfter";

export function navigate() {
  cy.visit("/dynamic-properties");
}

export function enableAfterButton() {
  return cy.get(enableAfterButtonSelector);
}

export function visibleAfterButton() {
  return cy.get(visibleAfterButtonSelector);
}
