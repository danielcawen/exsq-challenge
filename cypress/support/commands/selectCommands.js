Cypress.Commands.add("reactMultiSelect", (controlSelector, values) => {
  values.forEach((value) => {
    cy.get(controlSelector).click();
    cy.get(controlSelector).find("input").type(value);
    cy.get('[role="option"]').contains(value).click();
  });
});

// docs: https://react-select.com/accessibility
Cypress.Commands.add("reactMultiRemove", (valueText) => {
  cy.get(`[aria-label="Remove ${valueText}"]`).click();
});
