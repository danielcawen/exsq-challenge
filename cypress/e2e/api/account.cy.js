import { createUser, generateAuthToken, getUserById, deleteUserById } from "../../utils/apiClient";
import { buildApiAccount } from "../../utils/dataFactory";

const UUID_FORMAT_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe("Account API", () => {
  let testAccount;
  let createdUserId;
  let authToken;

  before(() => {
    testAccount = buildApiAccount();
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

  it("creates a user with valid credentials and returns 201 with a UUID userID", () => {
    createUser(testAccount).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.userID).to.match(UUID_FORMAT_REGEX);
      expect(response.body.username).to.eq(testAccount.userName);
      createdUserId = response.body.userID;
    });
  });

  it("rejects a weak password with code 1300 and the policy error message", () => {
    createUser(buildApiAccount({ password: "weakpass" })).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.code).to.eq("1300");
      expect(response.body.message).to.include("Passwords must have");
    });
  });

  it("generates a token and reports Success for valid credentials", () => {
    generateAuthToken(testAccount).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.be.a("string").and.have.length.greaterThan(0);
      expect(response.body.status).to.eq("Success");
      authToken = response.body.token;
    });
  });

  it("returns 401 when fetching a protected resource without a token", () => {
    getUserById(createdUserId).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
