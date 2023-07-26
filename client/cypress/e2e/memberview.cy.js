import {beforeEach} from "mocha";

describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080')

  })

  it('the h1 contains the correct text', () => {
    cy.getByData("site-title")
        .should("exist")
        .contains('Übersicht Mitgliederverwaltung')
  })

})