import * as dynamicPropertiesPage from "../../pages/dynamicPropertiesPage";

describe("Dynamic Properties", () => {
  beforeEach(() => {
    dynamicPropertiesPage.navigate();
  });

  it("enables the button after a delay without using a fixed wait", () => {
    dynamicPropertiesPage.enableAfterButton().should("be.disabled");

    dynamicPropertiesPage.enableAfterButton().should("not.be.disabled", {
      timeout: 10000,
    });
  });

  it("makes the button visible after a delay without using a fixed wait", () => {
    dynamicPropertiesPage.visibleAfterButton().should("not.exist");

    dynamicPropertiesPage.visibleAfterButton().should("be.visible", {
      timeout: 10000,
    });
  });
});
