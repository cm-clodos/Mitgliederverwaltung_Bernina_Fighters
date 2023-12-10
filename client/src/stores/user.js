import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    authenticate() {
      this.userLoggedIn = true;
    },
    signOut() {
      this.userLoggedIn = false;
    },
  },
});
