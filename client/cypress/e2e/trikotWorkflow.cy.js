import {beforeEach} from "mocha";

describe('Test the trikot administration workflow', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/trikots/new')
  });

  it('the h1 contains the correct text', () => {
    cy.getByData("site-title")
        .should("exist")
        .contains('Trikot hinzufügen')
  })

  context('Check the form error messages for trikot number', () => {
    it('Add a trikot with emtpy number field should display an error message', () => {
      cy.getByData('submit-btn').click();
      cy.getByData('error-message-number')
          .should('exist')
          .contains('Trikotnummer ist erforderlich');
      cy.get('.v-toast')
          .should('exist')
          .contains('Bitte fülle die Felder korrekt aus');
    });
  });
  context('Add a new trikot', () => {
    it('Add a valid trikot', () => {
      cy.getByData('input-number').type('1');
      cy.getByData('input-trikotname').type('Max');
      cy.getByData('submit-btn').click();

      cy.location("pathname").should("eq", "/trikots");
      cy.get('tbody').then(($tbody) => {
        cy.wrap($tbody)
            .find('td[data-cell="nummer"]')
            .should('exist')
            .contains('1');
        cy.get('.v-toast')
            .should('exist')
            .contains('Trikot erfolgreich hinzugefügt');
      });
    });
  });
  context('Add a trikot with an existing number', () => {
    it('Add a trikot with an already existing number', () => {
      cy.getByData('input-number').type('1');
      cy.getByData('input-trikotname').type('Max');
      cy.getByData('submit-btn').click();

      cy.get('.v-toast')
          .should('exist')
          .contains('Trikotnummer existiert bereits oder Mitglied besitzt bereits ein Trikot');
    });
  });
  context('make the trikot not available and save', () => {
    it('change the trikot to not available should uncheck the checkbox', () => {
      cy.visit('http://127.0.0.1:8080/trikots')
      cy.getByData('checkbox-available').uncheck();
      cy.getByData('save-btn').click();
      cy.get('.v-toast')
          .should('exist')
          .contains('Trikot erfolgreich aktualisiert');
      cy.get('tbody').then(($tbody) => {
        cy.wrap($tbody)
            .find('[data-test="checkbox-available"]').eq(0)
            .should('not.be.checked')

      });
    });
  });

    context('Delete a trikot and cancel the confirm dialog', () => {
      it('Delete a trikot and cancel the confirm dialog should not delete the trikot', () => {
        cy.visit('http://127.0.0.1:8080/trikots')
        cy.getByData('delete-btn').click();
        cy.getByData('cancel-btn').click();
        cy.get('tbody').then(($tbody) => {
          cy.wrap($tbody)
              .find('td[data-cell="nummer"]')
              .should('exist')
              .contains('1');
        });
      });
    });
    context('Delete a trikot and confirm the confirm dialog', () => {
      it('Delete a trikot and confirm the confirm dialog should delete the trikot', () => {
        cy.visit('http://127.0.0.1:8080/trikots')
        cy.getByData('delete-btn').click();
        cy.getByData('confirm-btn').click();
        cy.get('tbody').then(($tbody) => {
          cy.wrap($tbody)
              .find('[data-test="no-data-text"]')
              .should('exist')
              .contains('Daten werden geladen...');
          cy.get('.v-toast')
              .should('exist')
              .contains('Trikot erfolgreich gelöscht');
        });
      });
    });
});