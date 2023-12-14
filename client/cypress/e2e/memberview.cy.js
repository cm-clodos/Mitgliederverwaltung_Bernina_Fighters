import { beforeEach } from "mocha";
const authUser = require("../fixtures/auth-user.json");

describe("home page", () => {
  beforeEach(() => {
    const { email, password } = authUser;
    cy.visit("http://127.0.0.1:8080/");
    cy.login(email, password);
    cy.visit("http://127.0.0.1:8080/members");
  });

  it("the h1 contains the correct text", () => {
    cy.reload();
    cy.getByData("site-title").should("exist").contains("Übersicht Mitgliederverwaltung");
  });

  afterEach(() => {
    cy.logout();
    cy.reload;
  });
});
