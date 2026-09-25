// docs: https://react-select.com/styles#using-classnames
const SELECT_VALUE_INPUT = "#withOptGroup";
const SELECT_ONE_INPUT = "#selectOne";
const OLD_STYLE_SELECT = "#oldSelectMenu";

const MULTI_SELECT_HEADING = "Multiselect drop down";

const CARS_SELECT = "#cars";
const REACT_SELECT_OPTION = '[role="option"]';

function openReactSelect(inputId) {
  cy.get(inputId).closest('[class*="container"]').find('[class*="control"]').click();
}

function assertReactSelectValue(inputId, expected) {
  cy.get(inputId).closest('[class*="container"]').should("contain.text", expected);
}

function multiSelectSection() {
  return cy.contains(MULTI_SELECT_HEADING).closest('[class*="col"]');
}

export function navigate() {
  cy.visit("/select-menu");
}

export function selectValue(option) {
  openReactSelect(SELECT_VALUE_INPUT);
  cy.get(REACT_SELECT_OPTION).contains(option).click();
}

export function assertSelectValue(expected) {
  assertReactSelectValue(SELECT_VALUE_INPUT, expected);
}

export function selectOne(option) {
  openReactSelect(SELECT_ONE_INPUT);
  cy.get(REACT_SELECT_OPTION).contains(option).click();
}

export function assertSelectOne(expected) {
  assertReactSelectValue(SELECT_ONE_INPUT, expected);
}

export function selectOldStyle(value) {
  cy.get(OLD_STYLE_SELECT).select(value);
}

export function assertOldStyleValue(expected) {
  cy.get(OLD_STYLE_SELECT).should("have.value", expected);
}

export function addMultiValues(values) {
  values.forEach((value) => {
    multiSelectSection().find('[class*="control"]').click();
    multiSelectSection().find("input").type(value);
    cy.get(REACT_SELECT_OPTION).contains(value).click();
  });
}

export function removeMultiValue(valueText) {
  cy.reactMultiRemove(valueText);
}

export function assertMultiValues(values) {
  values.forEach((value) => {
    cy.get(`[aria-label="Remove ${value}"]`).should("exist");
  });
}

export function assertMultiValueAbsent(value) {
  cy.get(`[aria-label="Remove ${value}"]`).should("not.exist");
}

export function selectCars(values) {
  cy.get(CARS_SELECT).select(values);
}

export function assertCarsSelected(values) {
  values.forEach((value) => {
    cy.get(CARS_SELECT).find(`option[value="${value}"]`).should("be.selected");
  });
}
