import {beforeEach} from "mocha";

describe('Test the member administration workflow', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/members/new')
  });

  it('the h1 contains the correct text', () => {
    cy.getByData("site-title")
        .should("exist")
        .contains('Mitglied hinzufügen')
  })

  context('Check the form error messages', () => {
    it('Add a member with empty fields, should display error messages', () => {
      cy.getByData('submit-btn').click();
      cy.getByData('error-message-firstname')
          .should('exist')
          .contains('Vorname ist erforderlich');
      cy.getByData('error-message-lastname')
          .should('exist')
          .contains('Nachname ist erforderlich');
      cy.getByData('error-message-email')
          .should('exist')
          .contains('Ungültige Email');
      cy.getByData('error-message-telephone')
          .should('exist')
          .contains('Telefonnummer muss 10-13 Ziffern enthalten');
      cy.getByData('error-message-entry-date')
          .should('exist')
          .contains('Eintrittsdatum ist erforderlich');
    });

    it('Add a member with invalid email, should display error message', () => {
      cy.getByData('input-firstname').type('Max');
      cy.getByData('input-lastname').type('Mustermann');
      cy.getByData('input-email').type('max.mustermann');
      cy.getByData('input-telephone').type('0123456789');
      cy.getByData('input-entry-date').type('2020-01-01');
      cy.getByData('submit-btn').click();
      cy.getByData('error-message-email')
          .should('exist')
          .contains('Ungültige Email');
    });
    it('Add a member with a too short telephone number, should display error message', () => {
      cy.getByData('input-firstname').type('Max');
      cy.getByData('input-lastname').type('Mustermann');
      cy.getByData('input-email').type('max.mustermann@example.com');
      cy.getByData('input-telephone').type('123456789');
      cy.getByData('input-entry-date').type('2020-01-01');
      cy.getByData('submit-btn').click();
      cy.getByData('error-message-telephone')
          .should('exist')
          .contains('Telefonnummer muss 10-13 Ziffern enthalten');
    });
    it('Add a member with a too long telephone number, should display error message', () => {
      cy.getByData('input-firstname').type('Max');
      cy.getByData('input-lastname').type('Mustermann');
      cy.getByData('input-email').type('max.mustermann@example.com');
      cy.getByData('input-telephone').type('12345678912345');
      cy.getByData('input-entry-date').type('2020-01-01');
      cy.getByData('submit-btn').click();
      cy.getByData('error-message-telephone')
          .should('exist')
          .contains('Telefonnummer muss 10-13 Ziffern enthalten');
    });
  });
  context('Check the selectbox for Roles', () => {
    it('should have 5 options in the select field', () => {
      const roles = ['Ehrenmitglied', 'Mitglied', 'Passivmitglied', 'Präsident', 'Vorstand']
      cy.getByData('select-role').then(($select) => {
        cy.wrap($select)
            .find('[data-test="option-role"]')
            .should('have.length', roles.length)
            .each(($option, index) => {
              cy.wrap($option)
                  .invoke('text')
                  .then((text) => {
                    expect(text).to.equal(roles[index]);
                  });
            });
      });
    });
  });
  context('Add a valid member', () => {
    it('should add a new member', () => {
      cy.getByData('input-firstname').type('Max');
      cy.getByData('input-lastname').type('Mustermann');
      cy.getByData('input-email').type('max.mustermann@example.com');
      cy.getByData('input-telephone').type('0123456789');
      cy.getByData('input-entry-date').type('2020-01-01');
      cy.getByData('submit-btn').click();
      cy.location("pathname").should("eq", "/members");
      cy.get('tbody').then(($tbody) => {
        cy.wrap($tbody)
            .find('td[data-cell="nachname"]')
            .contains('Mustermann')
            .should('exist');
      });
      cy.get('.v-toast')
          .should('exist')
          .contains('Mitglied erfolgreich hinzugefügt');
    });
  });
  context('Add member with existing email', () => {
    it('should display a notification, email already exist', () => {
      cy.getByData('input-firstname').type('Max');
      cy.getByData('input-lastname').type('Mustermann');
      cy.getByData('input-email').type('max.mustermann@example.com');
      cy.getByData('input-telephone').type('0123456789');
      cy.getByData('input-entry-date').type('2020-01-01');
      cy.getByData('submit-btn').click();
      cy.get('.v-toast')
          .should('exist')
          .contains('Email oder Telefonnummer existiert bereits');
    });
  });
  context('Add member with existing telephone number', () => {
    it('should display a notification, telephone already exist', () => {
      cy.getByData('input-firstname').type('Max');
      cy.getByData('input-lastname').type('Mustermann');
      cy.getByData('input-email').type('max.mustermann@example.ch');
      cy.getByData('input-telephone').type('0123456789');
      cy.getByData('input-entry-date').type('2020-01-01');
      cy.getByData('submit-btn').click();
      cy.get('.v-toast')
          .should('exist')
          .contains('Email oder Telefonnummer existiert bereits');
    });
  });
  context('Delete a member and cancel the confirm dialog', () => {
    it('Delete a member and cancel the confirm dialog should not delete the member', () => {
      cy.visit('http://127.0.0.1:8080/members')
      cy.getByData('delete-btn').click();
      cy.getByData('cancel-btn').click();
      cy.get('tbody').then(($tbody) => {
        cy.wrap($tbody)
            .find('td[data-cell="nachname"]')
            .contains('Mustermann')
            .should('exist');
      });
    });
  });
  context('Delete a member and confirm the confirm dialog', () => {
    it('Delete a member and confirm the confirm dialog should delete the member', () => {
      cy.visit('http://127.0.0.1:8080/members')
      cy.getByData('delete-btn').click();
      cy.getByData('confirm-btn').click();
      cy.get('tbody').then(($tbody) => {
        cy.wrap($tbody)
            .find('[data-test="no-data-text"]')
            .should('exist')
            .contains('Mitgliederdaten werden geladen...');
        cy.get('.v-toast')
            .should('exist')
            .contains('Mitglied erfolgreich gelöscht');
      });
    });
  });

});