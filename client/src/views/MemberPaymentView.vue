<template>
  <main class="memberPayment">
    <h1 class="view-title">Übersicht Bezahlperiode</h1>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>Bezahlperiode: <select id="period" v-model="selectedPeriod" @change="renderSelectedPaymentPeriod">
              <option value="">Jahr auswählen</option>
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
            <button type="button" @click="confirmation" class="btn btn-primary float-end">Bezahlperiode
              erstellen</button>
          </h4>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Vorname</th>
                <th>Nachname</th>
                <th @click="sortByPaid">Bezahlt <font-awesome-icon icon="sort" /></th>
                <th>Bezahldatum</th>
                <th @click="sortByDate">Periode <font-awesome-icon icon="sort" /></th>
              </tr>
            </thead>
            <tbody v-if="this.filteredPayments.length > 0">
              <tr v-for="(payment, index) in this.filteredPayments" :key="index">
                <td data-cell="vorname"> {{ payment.firstname }}</td>
                <td data-cell="nachname"> {{ payment.lastname }}</td>
                <td data-cell="bezahlt"><input type="checkbox" @change="updatePayment(payment.id, payment.paid)"
                    v-model="payment.paid" :checked="payment.paid === 1" :value="1"></td>
                <td data-cell="bezahldatum"> {{ payment.paid_date ? formatDate(payment.paid_date) : '' }}</td>
                <td data-cell="periode"> {{ formatDate(payment.created_at) }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="8" class="text-center">Daten werden geladen...</td>
              </tr>
            </tbody>
          </table>
          <ConfirmModal :show="modalVisible" @confirm="handleConfirm" @cancel="closeModal"
            title="Bezahlperiode erstellen"
            message="Sind Sie sicher, dass Sie eine neue Bezahlperiode erstellen möchten?"></ConfirmModal>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "/src/api/axios.mjs";
import { formatInSwissTime } from "/src/services/formatterService.mjs";
import { useToast } from 'vue-toast-notification';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  name: "MemberPaymentView",
  components: {
    ConfirmModal,
    FontAwesomeIcon
  },
  data() {
    return {
      payments: [],
      toast: useToast(),
      selectedPeriod: '',
      filteredPayments: [],
      formattedPayments: [],
      years: [],
      sortAscending: true,
      modalVisible: false,
      model: {
        payment: {
          firstname: "",
          lastname: "",
          paid: "",
          paid_date: "",
          created_at: "",
        },
      },
    };
  },
  mounted() {
    this.createYearRange();
    this.getPayments();
  },
  methods: {
    getPayments() {
      axios.get("/members/payments").then(res => {
        this.payments = res.data
        this.formattedPayments = this.payments.map(payment => ({
          ...payment,
          paid: payment.paid === 1,
        }))
        this.filteredPayments = this.formattedPayments
        this.renderSelectedPaymentPeriod();
      })
    },
    updatePayment(id, paidStatus) {
      axios.put(`/members/payments/${id}`, {
        paid: paidStatus
      }).then(res => {
        if (res.status === 200) {
          this.toast.success(res.data.message);
          this.getPayments();
        }
      }).catch(error => {
        console.log(error);
        if ([404, 500].includes(error.response.status)) {
          this.toast.error(error.response.data.message);
        } else {
          console.log("Unexpected error: " + error.response.status);
        }
      });
    },
    formatDate(date) {
      return formatInSwissTime(date);
    },
    renderSelectedPaymentPeriod() {
      if (this.selectedPeriod === '') {
        this.filteredPayments = this.formattedPayments
      } else {
        this.filterPaymentsByPeriod(this.selectedPeriod)
      }
    },
    filterPaymentsByPeriod(year) {
      const filteredPayments = this.formattedPayments.filter(payment => {
        const createdAt = new Date(payment.created_at);
        return createdAt.getFullYear() === year;
      });
      return this.filteredPayments = filteredPayments;
    },
    createYearRange() {
      for (let year = 2015; year <= 2099; year++) {
        this.years.push(year);
      }
    },
    createNewPaymentPeriod() {
      axios.post("/members/payments/period").then(res => {
        if (res.status === 201) {
          this.toast.success(res.data.message);
          this.getPayments();
        }
      }).catch(error => {
        console.log(error);
        if ([500].includes(error.response.status)) {
          this.toast.error(error.response.data.message);
        } else {
          console.log("Unexpected error: " + error.response.status);
        }
      });
    },
    sortByDate() {
      this.filteredPayments.sort((a, b) => {
        return this.sortAscending ? a.created_at.localeCompare(b.created_at) : b.created_at.localeCompare(a.created_at);
      });
      this.sortAscending = !this.sortAscending;
    },
    sortByPaid() {
      this.filteredPayments.sort((a, b) => {
        return this.sortAscending ? a.paid - b.paid : b.paid - a.paid;
      });
      this.sortAscending = !this.sortAscending;
    },
    handleConfirm(value) {
      this.modalVisible = false;
      if (value) {
        this.createNewPaymentPeriod();
      }
    },
    closeModal() {
      this.modalVisible = false;
    },
    confirmation() {
      this.modalVisible = true;
    },
  }
}
</script>

<style scoped></style>