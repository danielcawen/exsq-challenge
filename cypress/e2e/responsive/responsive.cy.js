import * as practiceFormPage from "../../pages/practiceFormPage";
import * as sidebarPage from "../../pages/sidebarPage";
import * as webTablesPage from "../../pages/webTablesPage";

const NARROW = { width: 375, height: 667 };
const MEDIUM = { width: 768, height: 1024 };

describe("Responsive layout", () => {
  it(`sidebar items are visible and navigable at ${NARROW.width}px`, () => {
    cy.viewport(NARROW.width, NARROW.height);
    sidebarPage.navigate();
    sidebarPage.clickMenuItem("Web Tables");
    sidebarPage.assertCurrentUrlIncludes("/webtables");
  });

  it(`sidebar items are visible and navigable at ${MEDIUM.width}px`, () => {
    cy.viewport(MEDIUM.width, MEDIUM.height);
    sidebarPage.navigate();
    sidebarPage.clickMenuItem("Web Tables");
    sidebarPage.assertCurrentUrlIncludes("/webtables");
  });

  it(`practice form submit button is visible at ${NARROW.width}px`, () => {
    cy.viewport(NARROW.width, NARROW.height);
    practiceFormPage.navigate();
    practiceFormPage.assertSubmitButtonVisible();
  });

  it(`page body does not overflow horizontally on web tables at ${NARROW.width}px`, () => {
    cy.viewport(NARROW.width, NARROW.height);
    webTablesPage.navigate();
    webTablesPage.assertNoHorizontalBodyOverflow();
  });
});
