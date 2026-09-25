import * as selectMenuPage from "../../pages/selectMenuPage";

describe("Select Menu", () => {
  beforeEach(() => {
    selectMenuPage.navigate();
  });

  it("selects a grouped option and displays it in the Select Value control", () => {
    selectMenuPage.selectValue("A root option");

    selectMenuPage.assertSelectValue("A root option");
  });

  it("selects a title and displays it in the Select One control", () => {
    selectMenuPage.selectOne("Dr.");

    selectMenuPage.assertSelectOne("Dr.");
  });

  it("selects a value in the old-style native select and reflects it in the element value", () => {
    selectMenuPage.selectOldStyle("1");

    selectMenuPage.assertOldStyleValue("1");
  });

  it("adds multiple values, removes one, and asserts the remaining set", () => {
    selectMenuPage.addMultiValues(["Green", "Blue", "Black"]);

    selectMenuPage.removeMultiValue("Blue");

    selectMenuPage.assertMultiValues(["Green", "Black"]);
    selectMenuPage.assertMultiValueAbsent("Blue");
  });

  it("selects multiple car options and each is marked selected", () => {
    selectMenuPage.selectCars(["volvo", "saab"]);

    selectMenuPage.assertCarsSelected(["volvo", "saab"]);
  });
});
