import * as alertsPage from "../../pages/alertsPage";

describe("Alerts", () => {
  beforeEach(() => {
    alertsPage.navigate();
  });

  it("shows the correct message text in the simple alert", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    alertsPage.clickAlertButton();

    cy.wrap(alertStub).should("have.been.calledOnceWith", "You clicked a button");
  });

  it("displays the accepted result when the confirm dialog is confirmed", () => {
    cy.on("window:confirm", () => true);

    alertsPage.clickConfirmButton();

    alertsPage.assertConfirmResult("You selected Ok");
  });

  it("displays the dismissed result when the confirm dialog is cancelled", () => {
    cy.on("window:confirm", () => false);

    alertsPage.clickConfirmButton();

    alertsPage.assertConfirmResult("You selected Cancel");
  });

  it("echoes the typed value in the prompt result", () => {
    const typedText = "hello cypress";

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(typedText);
      alertsPage.clickPromptButton();
    });

    alertsPage.assertPromptResult(typedText);
  });

  it("handles the delayed alert without a fixed wait", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    alertsPage.clickTimerAlertButton();

    cy.wrap(alertStub, { timeout: 10000 }).should(
      "have.been.calledOnceWith",
      "This alert appeared after 5 seconds"
    );
  });
});
