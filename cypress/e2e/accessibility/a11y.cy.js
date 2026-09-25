import * as alertsPage from "../../pages/alertsPage";
import * as dynamicPropertiesPage from "../../pages/dynamicPropertiesPage";
import * as practiceFormPage from "../../pages/practiceFormPage";
import * as selectMenuPage from "../../pages/selectMenuPage";
import * as textBoxPage from "../../pages/textBoxPage";
import * as webTablesPage from "../../pages/webTablesPage";

describe("Accessibility — WCAG 2.0 A/AA", () => {
  it("Text Box page has no critical or serious violations on load", () => {
    textBoxPage.navigate();
    cy.injectAxe();
    cy.checkPageA11y();
  });

  it("Practice Form page has no critical or serious violations on load", () => {
    practiceFormPage.navigate();
    cy.injectAxe();
    cy.checkPageA11y();
  });

  it("Practice Form page has no critical or serious violations after submission with required fields only", () => {
    practiceFormPage.navigate();
    cy.injectAxe();

    practiceFormPage.fillFirstName("Jane");
    practiceFormPage.fillLastName("Doe");
    practiceFormPage.selectGender("Female");
    practiceFormPage.fillMobile("0400000000");
    practiceFormPage.submit();

    cy.checkPageA11y();
  });

  // docs: https://www.w3.org/WAI/tutorials/tables/
  it("Web Tables page has no critical or serious violations on load", () => {
    webTablesPage.navigate();
    cy.injectAxe();
    cy.checkPageA11y();
  });

  // docs: https://www.w3.org/WAI/WCAG21/Understanding/reflow.html
  it("Web Tables page has no critical or serious violations at 375 px (reflow)", () => {
    cy.viewport(375, 667);
    webTablesPage.navigate();
    cy.injectAxe();
    cy.checkPageA11y();
  });

  // docs: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
  it("Select Menu page has no critical or serious violations on load", () => {
    selectMenuPage.navigate();
    cy.injectAxe();
    cy.checkPageA11y();
  });

  // docs: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
  it("Alerts page has no critical or serious violations on load", () => {
    alertsPage.navigate();
    cy.injectAxe();
    cy.checkPageA11y();
  });

  // docs: https://www.w3.org/TR/wai-aria-1.2/#aria-disabled
  it("Dynamic Properties page has no critical or serious violations on load", () => {
    dynamicPropertiesPage.navigate();
    cy.injectAxe();
    cy.checkPageA11y();
  });
});
