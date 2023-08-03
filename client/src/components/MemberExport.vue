<template>
  <div class="export">
    <h3 class="export-title">Export Mitgliederliste</h3>
    <form ref="downloadForm" action="" method="POST">
      <input type="hidden" name="_method" value="POST" />
      <div class="form-check">
        <input class="form-check-input" type="radio" value="all" v-model="selectedOption" />
        <label class="form-check-label">Alle</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" value="active" v-model="selectedOption" />
        <label class="form-check-label">Aktive</label>
      </div>
      <button class="btn btn-primary" @click="handleMemberExport">Export Mitgliederliste</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "MemberExport",
  components: {},
  data() {
    return {
      selectedOption: "all",
      server_hostname: process.env.VUE_APP_SERVER_HOSTNAME,
      server_port: process.env.VUE_APP_SERVER_PORT
    }
  },
  methods: {
    handleMemberExport() {
      const baseUrl = "http://" + this.server_hostname + ":" + this.server_port + "/members/export/download";
      const queryParam = `filter=${this.selectedOption}`;
      this.$refs.downloadForm.action = `${baseUrl}?${queryParam}`;
      this.$refs.downloadForm.submit();
    },
  }
}
</script>

<style scoped>

</style>