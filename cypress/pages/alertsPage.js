const alertButton = "#alertButton";
const timerAlertButton = "#timerAlertButton";
const confirmButton = "#confirmButton";
const confirmResult = "#confirmResult";
const promptButton = "#promtButton";
const promptResult = "#promptResult";

export function navigate() {
  cy.visit("/alerts");
}

export function clickAlertButton() {
  cy.get(alertButton).click();
}

export function clickTimerAlertButton() {
  cy.get(timerAlertButton).click();
}

export function clickConfirmButton() {
  cy.get(confirmButton).click();
}

export function clickPromptButton() {
  cy.get(promptButton).click();
}

export function assertConfirmResult(expected) {
  cy.get(confirmResult).should("have.text", expected);
}

export function assertPromptResult(expected) {
  cy.get(promptResult).should("have.text", `You entered ${expected}`);
}
