<template>
  <div class="export">
    <h3 class="export-title">Export Mailliste</h3>
    <form ref="downloadForm" action="" method="POST">
      <input type="hidden" name="_method" value="POST" />
      <!-- Verstecktes Eingabefeld für den Authorization Header
      <input type="hidden" name="Authorization" :value="this.getReqHeaderToken" />
     -->


      <div class="form-check">
        <input class="form-check-input" type="radio" value="all" v-model="selectedOption" />
        <label class="form-check-label">Alle</label>
      </div>
      <div class="form-check">
        <label for="payPeriod">Wähle Bezahlperiode:</label>
        <select class="form-control" id="period" v-model="selectedPeriod" :disabled="selectedOption === 'all'">
          <option value="" :disabled="selectedOption === 'paid' || 'unpaid'">Bitte wählen</option>
          <option v-for="year in periodsInYears" :value="year">{{ year }}</option>
        </select>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" value="paid" v-model="selectedOption" />
        <label class="form-check-label">Bezahlt</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" value="unpaid" v-model="selectedOption" />
        <label class="form-check-label">Nicht bezahlt</label>
      </div>
      <button class="btn btn-primary" @click.prevent="handleMailExport">Export Mailliste</button>
    </form>
  </div>
  <ConfirmModal :show="modalVisible" @confirm="handleConfirm" @cancel="closeModal" title="Bezahlperiode auswählen!"
    message="Bitte wählen zuerst eine Bezahlperiode aus!"></ConfirmModal>
</template>
<script>
import axios from "../api/axios.mjs"
import ConfirmModal from "./ConfirmModal.vue"

export default {
  name: "MailExport",
  components: { ConfirmModal },
  data() {
    return {
      selectedOption: "all",
      selectedPeriod: "",
      periods: [],
      periodsInYears: [],
      modalVisible: false,
      server_hostname: process.env.VUE_APP_SERVER_HOSTNAME,
      server_port: process.env.VUE_APP_SERVER_PORT
    }
  },
  mounted() {
    this.getAllPaymentPeriods();
  },
  methods: {
    handleMailExport() {
      if (!this.checkSelectPeriod()) {
        event.preventDefault();
        this.modalVisible = true;
      } else {
        const baseUrl = "http://" + this.server_hostname + ":" + this.server_port + "/members/mail/export/download";
        const queryParam = `filter=${this.selectedOption}`;
        const queryParam2 = `&period=${this.selectedPeriod}`;

        axios.post(`${baseUrl}?${queryParam}${queryParam2}`, {
          responseType: 'blob'
        })
          .then(response => {
            const blob = new Blob([response.data], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${this.selectedOption}_${this.selectedPeriod}_maillist.csv`;
            link.click();
          })
          .catch(error => {
            console.error("There was a problem with the Axios request:", error);
          });
      }

    },
    getAllPaymentPeriods() {
      axios.get("/members/payments/period").then(res => {
        this.periods = res.data
        this.periodsInYears = this.renderPeriodsToYears(this.periods);
      })
    },
    renderPeriodsToYears(periods) {
      const years = periods.map(item => new Date(item.created_at).getFullYear());
      return years.filter((year, index) => years.indexOf(year) === index);
    },
    checkSelectPeriod() {
      return !((this.selectedOption === 'paid' || this.selectedOption === 'unpaid') && !this.selectedPeriod);
    },
    handleConfirm() {
      this.modalVisible = false;
    },
    closeModal() {
      this.modalVisible = false;
    },
  }
}
</script>

<style scoped></style>