<template>
  <div class="export">
    <h3 class="export-title">Export Trikotliste</h3>
    <form ref="downloadForm" action="" method="POST">
      <input type="hidden" name="_method" value="POST" />
      <div class="form-check">
        <input class="form-check-input" type="radio" value="all" v-model="selectedOption" />
        <label class="form-check-label">Alle</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" value="available" v-model="selectedOption" />
        <label class="form-check-label">Verfügbare</label>
      </div>
      <button class="btn btn-primary" @click.prevent="handleTrikotExport">Export Trikotliste</button>
    </form>
  </div>
</template>
<script>
import axios from "../api/axios.mjs"
export default {
  name: "TrikotExport",
  components: {},
  data() {
    return {
      selectedOption: "all",
      server_hostname: process.env.VUE_APP_SERVER_HOSTNAME,
      server_port: process.env.VUE_APP_SERVER_PORT
    }
  },
  methods: {
    handleTrikotExport() {
      const baseUrl = "http://" + this.server_hostname + ":" + this.server_port + "/trikots/export/download";
      const queryParam = `filter=${this.selectedOption}`;

      axios.post(`${baseUrl}?${queryParam}`, {
        responseType: 'blob'
      })
        .then(response => {
          const blob = new Blob([response.data], { type: 'text/csv' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${this.selectedOption}_trikotlist.csv`;
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