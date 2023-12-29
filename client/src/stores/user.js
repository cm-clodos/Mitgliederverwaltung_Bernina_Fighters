import { defineStore } from "pinia";
import { auth } from "@/auth/firebase";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
    token: null,
  }),
  getters: {
    getReqHeaders: (state) => {
      return {
        Authorization: `Bearer ${state.token}`,
      };
    },
    getReqHeaderToken: (state) => {
      return `Bearer ${state.token}`;
    },
  },
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
      await auth.signOut();
      this.setToken(null);

      this.userLoggedIn = false;
    },
  },
});
