import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    authenticate(userCredentials) {
      console.log("userCredentials", userCredentials);
      this.userLoggedIn = true;
    },
    signOut() {
      this.userLoggedIn = false;
    },
  },
});
