// ab Version 9 firebase/compat/app
import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);

// services export
const auth = firebase.auth();

export { auth };
