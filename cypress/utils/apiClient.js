export const getAllBooks = () => cy.request({ method: "GET", url: "/BookStore/v1/Books" });

export const getBookByIsbn = (isbn) =>
  cy.request({
    method: "GET",
    url: "/BookStore/v1/Book",
    qs: { ISBN: isbn },
    failOnStatusCode: false,
  });

export const createUser = (credentials) =>
  cy.request({
    method: "POST",
    url: "/Account/v1/User",
    body: credentials,
    failOnStatusCode: false,
  });

export const generateAuthToken = (credentials) =>
  cy.request({ method: "POST", url: "/Account/v1/GenerateToken", body: credentials });

export const getUserById = (userId, authToken) =>
  cy.request({
    method: "GET",
    url: `/Account/v1/User/${userId}`,
    ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
    failOnStatusCode: false,
  });

export const deleteUserById = (userId, authToken) =>
  cy.request({
    method: "DELETE",
    url: `/Account/v1/User/${userId}`,
    headers: { Authorization: `Bearer ${authToken}` },
    failOnStatusCode: false,
  });

export const addBooksToCollection = (userId, isbnList, authToken) =>
  cy.request({
    method: "POST",
    url: "/BookStore/v1/Books",
    body: { userId, collectionOfIsbns: isbnList.map((isbn) => ({ isbn })) },
    headers: { Authorization: `Bearer ${authToken}` },
    failOnStatusCode: false,
  });
