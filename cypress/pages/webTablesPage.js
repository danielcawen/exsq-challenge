const addNewRecordButton = "#addNewRecordButton";
const searchBoxInput = "#searchBox";
const submitButton = "#submit";
const modalContent = ".modal-content";
const rowsPerPageSelect = "select";
const firstNameInput = "#firstName";
const lastNameInput = "#lastName";
const userEmailInput = "#userEmail";
const ageInput = "#age";
const salaryInput = "#salary";
const departmentInput = "#department";
const tableCell = "td";
const tableRowGroup = "tr";
const editRowButton = '[title="Edit"]';
const deleteRowButton = '[title="Delete"]';

function getRowByEmail(email) {
  return cy.contains(tableCell, email).closest(tableRowGroup);
}

export function navigate() {
  cy.visit("/webtables");
}

export function fillForm({ firstName, lastName, email, age, salary, department }) {
  cy.get(firstNameInput).clear();
  cy.get(firstNameInput).type(firstName);
  cy.get(lastNameInput).clear();
  cy.get(lastNameInput).type(lastName);
  cy.get(userEmailInput).clear();
  cy.get(userEmailInput).type(email);
  cy.get(ageInput).clear();
  cy.get(ageInput).type(String(age));
  cy.get(salaryInput).clear();
  cy.get(salaryInput).type(String(salary));
  cy.get(departmentInput).clear();
  cy.get(departmentInput).type(department);
}

export function fillDepartment(value) {
  cy.get(departmentInput).clear();
  cy.get(departmentInput).type(value);
}

export function submit() {
  cy.get(submitButton).click();
}

export function addRecord(employee) {
  cy.get(addNewRecordButton).click();
  assertModalVisible();
  fillForm(employee);
  submit();
  assertModalGone();
}

export function search(term) {
  cy.get(searchBoxInput).clear();
  cy.get(searchBoxInput).type(term);
}

export function editRowByEmail(email) {
  getRowByEmail(email).find(editRowButton).click();
}

export function deleteRowByEmail(email) {
  getRowByEmail(email).find(deleteRowButton).click();
}

export function assertModalVisible() {
  cy.get(modalContent).should("be.visible");
}

export function assertModalGone() {
  cy.get(modalContent).should("not.exist");
}

export function assertRowVisible(employee) {
  getRowByEmail(employee.email)
    .should("contain", employee.firstName)
    .and("contain", employee.lastName)
    .and("contain", String(employee.age))
    .and("contain", String(employee.salary))
    .and("contain", employee.department);
}

export function assertRowGone(email) {
  cy.contains(tableCell, email).should("not.exist");
}

export function assertRowExists(email) {
  getRowByEmail(email).should("exist");
}

export function assertRowContains(email, text) {
  getRowByEmail(email).should("contain", text);
}

export function assertAllRowsContain(text) {
  cy.get(deleteRowButton).each((deleteButton) => {
    cy.wrap(deleteButton).closest(tableRowGroup).should("contain", text);
  });
}

export function assertNoDataVisible() {
  cy.get(deleteRowButton).should("not.exist");
}

export function assertNoDeleteButtonsExist() {
  cy.get(deleteRowButton).should("not.exist");
}

export function assertNoHorizontalBodyOverflow() {
  cy.document().then((doc) => {
    cy.window().then((win) => {
      expect(doc.body.scrollWidth).to.be.lte(win.innerWidth);
    });
  });
}

export function assertRowCountAtMost(maximumCount) {
  cy.get(deleteRowButton).should("have.length.lte", maximumCount);
}

export function assertRowsPerPageValue(rowsPerPage) {
  cy.get(rowsPerPageSelect).should("have.value", String(rowsPerPage));
}

export function setRowsPerPage(count) {
  cy.get(rowsPerPageSelect).select(String(count));
}
