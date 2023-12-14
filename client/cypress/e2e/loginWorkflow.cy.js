import { beforeEach } from "mocha";
const authUser = require("../fixtures/auth-user.json");

describe("Login page", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/login");
  });
  it("the h1 contains the correct text", () => {
    cy.getByData("site-title").should("exist").contains("Login");
  });

  context("Check the form error messages", () => {
    it("Login with empty fields, should display error messages", () => {
      cy.getByData("submit-btn").click();
      cy.getByData("error-message-email").should("exist").contains("Ungültige Email");
      cy.getByData("error-message-password").should("exist").contains("Passwort ist erforderlich");
      cy.get(".v-toast").should("exist").contains("Bitte fülle die Felder korrekt aus");
    });
  });

  context("Login with a invalid User", () => {
    it("Login with a invalid user, should display a toast message", () => {
      cy.getByData("input-email").type("test@test.com");
      cy.getByData("input-password").type("test");
      cy.getByData("submit-btn").click();
      cy.get(".v-toast").should("exist").contains("Fehler beim übermitteln des Formulars");
    });
  });

  context("Login with a valid User", () => {
    it("Login with a valid user, should redirect to the members page", () => {
      const { email, password } = authUser;
      cy.getByData("input-email").type(email);
      cy.getByData("input-password").type(password);
      cy.getByData("submit-btn").click();
      cy.location("pathname").should("eq", "/");
      cy.getByData("site-title").should("exist").contains("Übersicht Mitgliederverwaltung");
      cy.get(".v-toast").should("exist").contains("Du bist eingeloggt!");
      cy.getByData("logout-btn").click();
      cy.location("pathname").should("eq", "/login");
    });
  });
});
