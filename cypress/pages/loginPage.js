const userNameInput = "#userName";
const passwordInput = "#password";
const loginButton = "#login";

export function navigate() {
  cy.visit("/login");
}

export function fillUserName(value) {
  cy.get(userNameInput).type(value);
}

export function fillPassword(value) {
  cy.get(passwordInput).type(value);
}

export function submit() {
  cy.get(loginButton).click();
}

export function login({ userName, password }) {
  navigate();
  fillUserName(userName);
  fillPassword(password);
  submit();
}
