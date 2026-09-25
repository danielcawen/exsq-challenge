const menuList = ".menu-list";

export function navigate() {
  cy.visit("/elements");
}

export function clickMenuItem(label) {
  cy.get(menuList).contains(label).should("be.visible").click();
}

export function assertCurrentUrlIncludes(path) {
  cy.url().should("include", path);
}
