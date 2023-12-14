<template>
  <div id="app">
    <Header />
    <div class="app-content">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { mapWritableState, mapActions } from "pinia";
import useUserStore from "@/stores/user";
import { auth } from "@/auth/firebase";

export default {
  name: 'App',
  components: {
    ConfirmModal,
    Header
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },
  // setzt den user login state inital beim laden der app auf true, wenn der user bereits eingeloggt ist
  // ebenfalls wird der Token falls vorhanden gesetzt im Store
  async created() {
    if (auth.currentUser) {
      let token = await auth.currentUser.getIdToken()
      this.setToken(token);
      this.userLoggedIn = true;
    }
  },
  methods: {
    ...mapActions(useUserStore, ['setToken']),
  }
};


</script>

<style lang="scss">
@import "@/assets/styles/app.scss";
</style>
