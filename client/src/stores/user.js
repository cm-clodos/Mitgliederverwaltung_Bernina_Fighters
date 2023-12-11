import { defineStore } from "pinia";
import { auth } from "@/auth/firebase";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async authenticate(userCredentials) {
      const userCred = await auth.signInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      );
      console.log(userCred);
      this.userLoggedIn = true;
    },
    async signOut() {
      // entfernt den Token aus dem LocalStorage
      await auth.signOut();

      this.userLoggedIn = false;
    },
  },
});
