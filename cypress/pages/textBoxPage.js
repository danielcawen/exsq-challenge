const userNameInput = "#userName";
const userEmailInput = "#userEmail";
const currentAddressTextarea = "#currentAddress";
const permanentAddressTextarea = "#permanentAddress";
const submitButton = "#submit";
const outputPanel = "#output";
const nameOutputText = "#output #name";
const emailOutputText = "#output #email";
const currentAddressOutputText = "#output #currentAddress";
const permanentAddressOutputText = "#output #permanentAddress";

export function navigate() {
  cy.visit("/text-box");
}

export function fillFullName(value) {
  cy.get(userNameInput).clear();
  cy.get(userNameInput).type(value);
}

export function fillEmail(value) {
  cy.get(userEmailInput).clear();
  cy.get(userEmailInput).type(value);
}

export function fillCurrentAddress(value) {
  cy.get(currentAddressTextarea).clear();
  cy.get(currentAddressTextarea).type(value);
}

export function fillPermanentAddress(value) {
  cy.get(permanentAddressTextarea).clear();
  cy.get(permanentAddressTextarea).type(value);
}

export function submit() {
  cy.get(submitButton).click();
}

export function emailField() {
  return cy.get(userEmailInput);
}

export function outputSection() {
  return cy.get(outputPanel);
}

export function nameOutput() {
  return cy.get(nameOutputText);
}

export function emailOutput() {
  return cy.get(emailOutputText);
}

export function currentAddressOutput() {
  return cy.get(currentAddressOutputText);
}

export function permanentAddressOutput() {
  return cy.get(permanentAddressOutputText);
}
