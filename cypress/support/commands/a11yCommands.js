// docs: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#context-parameter
const A11Y_CONTEXT = {
  exclude: [["#fixedban"], ["footer"], ["iframe"]],
};

// docs: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter
const A11Y_OPTIONS = {
  runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
};

function logViolations(violations) {
  violations.forEach(({ id, impact, helpUrl, description, nodes }) => {
    const selectors = nodes.map((n) => n.target.join(", "));

    Cypress.log({
      name: "a11y",
      message: `[${impact}] ${id} (${nodes.length} node${nodes.length === 1 ? "" : "s"})`,
      consoleProps: () => ({ impact, id, helpUrl, selectors }),
    });

    cy.task("logA11yViolation", { impact, id, helpUrl, selectors });

    // docs: https://github.com/LironEr/cypress-mochawesome-reporter#addtestcontext
    cy.addTestContext({
      title: `[${impact.toUpperCase()}] ${id}`,
      value: {
        description,
        helpUrl,
        nodes: nodes.map((n) => ({
          target: n.target,
          html: n.html,
          failureSummary: n.failureSummary,
        })),
      },
    });
  });
}

// docs: https://github.com/component-driven/cypress-axe#cychecka11y
Cypress.Commands.add("checkPageA11y", () => {
  cy.checkA11y(
    A11Y_CONTEXT,
    { ...A11Y_OPTIONS, includedImpacts: ["critical", "serious"] },
    logViolations
  );

  cy.checkA11y(
    A11Y_CONTEXT,
    { ...A11Y_OPTIONS, includedImpacts: ["moderate", "minor"] },
    logViolations,
    true // skipFailures — docs: https://github.com/component-driven/cypress-axe#skipfailures
  );
});
