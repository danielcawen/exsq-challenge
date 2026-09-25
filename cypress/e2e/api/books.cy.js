import {
  getAllBooks,
  getBookByIsbn,
  createUser,
  generateAuthToken,
  deleteUserById,
  addBooksToCollection,
} from "../../utils/apiClient";
import { buildApiAccount } from "../../utils/dataFactory";
import * as loginPage from "../../pages/loginPage";

const GIT_POCKET_GUIDE_ISBN = "9781449325862";
const GIT_POCKET_GUIDE_TITLE = "Git Pocket Guide";
const NONEXISTENT_BOOK_ISBN = "0000000000000";

describe("BookStore API", () => {
  it("returns the full catalogue with correct shape and at least one entry", () => {
    getAllBooks().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.books).to.be.an("array").and.not.be.empty;
      const [firstBook] = response.body.books;
      expect(firstBook).to.include.keys("isbn", "title", "author", "publisher", "pages");
    });
  });

  it("returns a single book matching the requested ISBN", () => {
    getBookByIsbn(GIT_POCKET_GUIDE_ISBN).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.isbn).to.eq(GIT_POCKET_GUIDE_ISBN);
      expect(response.body.title).to.eq(GIT_POCKET_GUIDE_TITLE);
      expect(response.body).to.include.keys("author", "publisher", "pages", "description");
    });
  });

  it("returns 400 for an ISBN not in the catalogue", () => {
    getBookByIsbn(NONEXISTENT_BOOK_ISBN).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.be.a("string").and.have.length.greaterThan(0);
    });
  });

  describe("profile page shows a book seeded via API", () => {
    let testAccount;
    let createdUserId;
    let authToken;

    before(() => {
      testAccount = buildApiAccount();
      createUser(testAccount)
        .then((response) => {
          expect(response.status).to.eq(201);
          createdUserId = response.body.userID;
          return generateAuthToken(testAccount);
        })
        .then((response) => {
          authToken = response.body.token;
        });
    });

    after(() => {
      if (createdUserId && authToken) {
        deleteUserById(createdUserId, authToken).then((response) => {
          if (response.status !== 204) {
            Cypress.log({
              name: "cleanup",
              message: `failed to delete test user: ${response.status}`,
            });
          }
        });
      }
    });

    it("seeds a book via API then logs in via UI and verifies the book appears on the profile page", () => {
      addBooksToCollection(createdUserId, [GIT_POCKET_GUIDE_ISBN], authToken).then((response) => {
        expect(response.status).to.eq(201);
      });

      loginPage.login(testAccount);

      cy.url().should("include", "/profile");
      cy.contains(GIT_POCKET_GUIDE_TITLE).should("be.visible");
    });
  });
});
