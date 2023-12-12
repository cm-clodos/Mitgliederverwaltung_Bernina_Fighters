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
      <button class="btn btn-primary" @click.prevent="handleMemberExport">Export Mitgliederliste</button>
    </form>
  </div>
</template>
<script>
import axios from "../api/axios.mjs"

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

      axios.post(`${baseUrl}?${queryParam}`, {
        responseType: 'blob'
      })
        .then(response => {
          const blob = new Blob([response.data], { type: 'text/csv' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${this.selectedOption}_memberlist.csv`;
          link.click();
        })
        .catch(error => {
          console.error("There was a problem with the Axios request:", error);
        });

    },
  }
}
</script>

<style scoped></style>