export function navigate() {
  cy.visit("/frames");
}

export function getFrameBody(frameSelector) {
  return cy.get(frameSelector).its("0.contentDocument.body").then(cy.wrap);
}

export function assertFrameHeading(frameSelector, expected) {
  cy.get(frameSelector).should(($iframe) => {
    const text = $iframe[0].contentDocument.body.querySelector("h1")?.textContent;
    expect(text).to.equal(expected);
  });
}

export function assertSelectorAbsentInFrame(frameSelector, absentSelector) {
  getFrameBody(frameSelector).find(absentSelector).should("not.exist");
}
