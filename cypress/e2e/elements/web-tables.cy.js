import * as webTablesPage from "../../pages/webTablesPage";
import { buildEmployee } from "../../utils/dataFactory";
import employees from "../../fixtures/employees.json";

const generateUniqueId = () => Date.now().toString(36).slice(-5);

describe("Web Tables", () => {
  beforeEach(() => {
    webTablesPage.navigate();
  });

  it("creates a new record and shows it in the table", () => {
    const employee = buildEmployee({ firstName: `New_${generateUniqueId()}` });

    webTablesPage.addRecord(employee);

    webTablesPage.assertRowVisible(employee);
  });

  it("edits an existing record and the change persists in the table", () => {
    const employee = buildEmployee({ firstName: `Edit_${generateUniqueId()}` });
    webTablesPage.addRecord(employee);

    const updatedDept = "Engineering";
    webTablesPage.editRowByEmail(employee.email);
    webTablesPage.assertModalVisible();
    webTablesPage.fillDepartment(updatedDept);
    webTablesPage.submit();
    webTablesPage.assertModalGone();

    webTablesPage.assertRowContains(employee.email, updatedDept);
  });

  it("deletes a record and it no longer appears in the table", () => {
    const employee = buildEmployee({ firstName: `Del_${generateUniqueId()}` });
    webTablesPage.addRecord(employee);

    webTablesPage.deleteRowByEmail(employee.email);

    webTablesPage.assertRowGone(employee.email);
  });

  it("filters rows to only those matching a partial search term", () => {
    const employee = buildEmployee({
      firstName: `Search_${generateUniqueId()}`,
      department: "Compliance",
    });
    webTablesPage.addRecord(employee);

    webTablesPage.search("Compliance");

    webTablesPage.assertRowExists(employee.email);
    webTablesPage.assertAllRowsContain("Compliance");
  });

  it("shows the empty-state message when the search term matches nothing", () => {
    webTablesPage.search("zzznomatch_xyz_99999");

    webTablesPage.assertNoDataVisible();
    webTablesPage.assertNoDeleteButtonsExist();
  });

  it("limits visible data rows to 10 after changing rows-per-page to 10", () => {
    // Add 8 records on top of the 3 pre-seeded ones → 11 total, which exceeds 10.
    Array.from({ length: 8 }).forEach(() => {
      webTablesPage.addRecord(buildEmployee({ firstName: `Page_${generateUniqueId()}` }));
    });

    webTablesPage.setRowsPerPage(10);

    // Only real data rows carry action buttons; placeholder rows do not.
    webTablesPage.assertRowCountAtMost(10);
    webTablesPage.assertRowsPerPageValue(10);
  });

  employees.edgeCases.forEach(({ firstName, lastName, age, email, salary, department, note }) => {
    it(`accepts edge-case employee record — ${note} (${firstName} ${lastName})`, () => {
      const emp = { firstName, lastName, age, email, salary, department };

      webTablesPage.addRecord(emp);

      webTablesPage.assertRowVisible(emp);
    });
  });
});
