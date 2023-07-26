import {beforeEach} from "mocha";

describe('Test the navigation menü', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080')
  })

  it('should display home page', () => {
    cy.location("pathname").should("eq", "/");
  })

  context('Navigation test to all member administrations pages', () => {
    it("Navigate to the memberview page", () => {
      cy.getByData('dropdown-membermenu').click();
      cy.getByData("link-mitgliedsübersicht").click();
      cy.location("pathname").should("eq", "/members");
    });

    it("Navigate to the member new page", () => {
      cy.getByData('dropdown-membermenu').click();
      cy.getByData("link-mitglied-hinzufügen").click();
      cy.location("pathname").should("eq", "/members/new");
    });


    it("Navigate to the members payment page", () => {
      cy.getByData('dropdown-membermenu').click();
      cy.getByData("link-bezahlübersicht").click();
      cy.location("pathname").should("eq", "/members/payment");
    });
  });

  context('Navigation test to all trikot administration pages', () => {
    it("Navigate to the trikotview page", () => {
      cy.getByData('dropdown-trikotmenu').click();
      cy.getByData("link-trikotübersicht").click();
      cy.location("pathname").should("eq", "/trikots");
    });

    it("Navigate to the member new page", () => {
      cy.getByData('dropdown-trikotmenu').click();
      cy.getByData("link-trikot-hinzufügen").click();
      cy.location("pathname").should("eq", "/trikots/new");
    });

  });
  context('Navigation test to the CSV export pages', () => {
    it("Navigate to the CSV page", () => {
      cy.getByData('link-csv-export').click();
      cy.location("pathname").should("eq", "/members/export");
    });
  });
})