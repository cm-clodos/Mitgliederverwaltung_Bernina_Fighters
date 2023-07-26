<template>
  <div class="statistics">
    <h1 class="view-title">Mitglieder Statistik und Exporte</h1>
    <div class="container">
      <MemberExport />
      <TrikotExport />
      <MailExport />
    </div>
  </div>
</template>

<script>
import MemberExport from "@/components/MemberExport.vue";
import TrikotExport from "@/components/TrikotExport.vue";
import MailExport from "@/components/MailExport.vue";

export default {
  name: "ExportView",
  components: {MailExport, TrikotExport, MemberExport},
}
</script>

<style scoped>
.container {
    display: flex;
}
@media (max-width: 768px) {
    .container {
        display: flex;
        flex-direction: column;
    }
}
</style>