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
import { mapWritableState } from "pinia";
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
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
}


</script>

<style lang="scss">
@import "@/assets/styles/app.scss";
</style>
