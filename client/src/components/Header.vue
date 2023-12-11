<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <router-link :to="{ name: 'Mitgliederverwaltung' }">
            <img src="../assets/logo/Logo-ohneHintergrund.png" alt="logo">
          </router-link>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="this.userStore.userLoggedIn" class="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a data-test="dropdown-membermenu" class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="nav-icons"><font-awesome-icon icon="people-group" /></span>
                <span class="nav-title">Mitgliederverwaltung</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><router-link data-test="link-mitgliedsübersicht" class="dropdown-item"
                    :to="{ name: 'Mitgliederverwaltung' }">
                    <span>Mitgliederübersicht</span>
                  </router-link></li>
                <li><router-link data-test="link-mitglied-hinzufügen" class="dropdown-item"
                    :to="{ name: 'Mitglieder hinzufügen' }">
                    <span>Mitglied hinzufügen</span>
                  </router-link></li>
                <li><router-link data-test="link-bezahlübersicht" class="dropdown-item" :to="{ name: 'Bezahlübersicht' }">
                    <span>Bezahlübersicht</span>
                  </router-link></li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a data-test="dropdown-trikotmenu" class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="nav-icons"><font-awesome-icon icon="shirt" /></span>
                <span class="nav-title">Trikotverwaltung</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li> <router-link data-test="link-trikotübersicht" class="dropdown-item"
                    :to="{ name: 'Trikotverwaltung' }">
                    <span>Übersicht</span>
                  </router-link></li>
                <li><router-link data-test="link-trikot-hinzufügen" class="dropdown-item"
                    :to="{ name: 'Trikot hinzufügen' }">
                    <span>Trikot hinzufügen</span>
                  </router-link></li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#"> <router-link data-test="link-csv-export" :to="{ name: 'Mitglieder Exporte' }">
                  <span class="nav-icons"><font-awesome-icon icon="file-csv" /></span>
                </router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="logout">
                <span class="nav-icons btn-logout">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useUserStore from '@/stores/user';

export default {
  name: "Header",
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    logout() {
      this.userStore.signOut();
      this.$router.push({ name: 'Home' });
    },
  },
}
</script>

<style lang="scss" scoped></style>