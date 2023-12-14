// ab Version 9 firebase/compat/app
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  // config der Environment Variablen im Cypress.env.json
  apiKey: Cypress.env("FIREBASE_API_KEY"),
  authDomain: Cypress.env("FIREBASE_AUTH_DOMAIN"),
  projectId: Cypress.env("FIREBASE_PROJECT_ID"),
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);

// services export
const auth = firebase.auth();

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add("login", (email, password) => {
  cy.session(
    ["TestUser1"],
    () => {
      return auth.signInWithEmailAndPassword(email, password);
    }
    /*
  Für die Verwendung von mehreren Tests mit dem gleichen User
  {
  cacheAcrossSpecs: true,
  }
  */
  );
});

Cypress.Commands.add("logout", () => {
  return auth.signOut();
});
