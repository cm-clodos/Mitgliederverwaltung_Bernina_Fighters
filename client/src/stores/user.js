import { defineStore } from "pinia";
import { auth } from "@/auth/firebase";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
    token: "",
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },

    async authenticate(userCredentials) {
      let token;
      const userCred = await auth.signInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      );
      console.log(userCred);
      token = await userCred.user.getIdToken();
      this.setToken(token);

      this.userLoggedIn = true;
    },
    async signOut() {
      // entfernt den Token aus dem LocalStorage
      await auth.signOut();
      this.setToken("");

      this.userLoggedIn = false;
    },
  },
});
