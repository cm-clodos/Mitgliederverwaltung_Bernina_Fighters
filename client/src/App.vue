<template>
  <div id="app">
    <Header/>
    <div class="app-content">
      <router-view :key="$route.fullPath"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  name: 'App',
  components: {
    ConfirmModal,
    Header
  }
}

</script>

<style lang="scss">
@import "@/assets/styles/app.scss";
</style>
