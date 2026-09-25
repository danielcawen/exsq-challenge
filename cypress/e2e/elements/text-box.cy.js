import * as textBoxPage from "../../pages/textBoxPage";
import { buildTextBoxData } from "../../utils/dataFactory";
import boundaryValues from "../../fixtures/boundaryValues.json";
import invalidEmails from "../../fixtures/invalidEmails.json";

describe("Text Box", () => {
  beforeEach(() => {
    textBoxPage.navigate();
  });

  it("displays all submitted values in the output panel", () => {
    const data = buildTextBoxData();

    textBoxPage.fillFullName(data.fullName);
    textBoxPage.fillEmail(data.email);
    textBoxPage.fillCurrentAddress(data.currentAddress);
    textBoxPage.fillPermanentAddress(data.permanentAddress);
    textBoxPage.submit();

    textBoxPage.nameOutput().should("contain.text", data.fullName);
    textBoxPage.emailOutput().should("contain.text", data.email);
    textBoxPage.currentAddressOutput().should("contain.text", data.currentAddress);
    textBoxPage.permanentAddressOutput().should("contain.text", data.permanentAddress);
  });

  invalidEmails.cases.forEach(({ value, reason }) => {
    it(`marks the email field invalid and suppresses output when the email is: ${reason.toLowerCase()}`, () => {
      const data = buildTextBoxData();

      textBoxPage.fillFullName(data.fullName);
      textBoxPage.fillEmail(value || "{selectall}{del}");
      textBoxPage.fillCurrentAddress(data.currentAddress);
      textBoxPage.fillPermanentAddress(data.permanentAddress);
      textBoxPage.submit();

      textBoxPage.emailField().should("have.class", "field-error");
      textBoxPage.outputSection().should("not.be.visible");
    });
  });

  it("produces no output when submitted with all fields empty", () => {
    textBoxPage.submit();

    textBoxPage.outputSection().should("not.be.visible");
  });

  it("renders a blank name value when the full name field contains only whitespace", () => {
    const data = buildTextBoxData();

    textBoxPage.fillFullName(boundaryValues.firstName.whitespaceOnly);
    textBoxPage.fillEmail(data.email);
    textBoxPage.fillCurrentAddress(data.currentAddress);
    textBoxPage.fillPermanentAddress(data.permanentAddress);
    textBoxPage.submit();

    textBoxPage
      .nameOutput()
      .invoke("text")
      .then((text) => text.replace("Name:", "").trim())
      .should("be.empty");
  });

  it("displays a very long name in the output panel without truncation", () => {
    const longName = `${boundaryValues.firstName.veryLong} ${boundaryValues.lastName.veryLong}`;
    const data = buildTextBoxData();

    textBoxPage.fillFullName(longName);
    textBoxPage.fillEmail(data.email);
    textBoxPage.fillCurrentAddress(data.currentAddress);
    textBoxPage.fillPermanentAddress(data.permanentAddress);
    textBoxPage.submit();

    textBoxPage.nameOutput().should("contain.text", longName);
  });
});
