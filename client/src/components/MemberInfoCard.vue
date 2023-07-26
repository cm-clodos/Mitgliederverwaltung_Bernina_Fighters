<template>
  <main class="member-info">
    <h1 class="view-title">Mitglied Informationen</h1>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ this.model.member.firstname }} {{ this.model.member.lastname }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ this.model.member.role }}</h6>
        <p class="card-text">{{ this.model.member.telephone }}</p>
        <p class="card-text"><a href="mailto:{{ this.model.member.email }}">{{ this.model.member.email  }}</a></p>
        <p class="card-text">{{ formatActiveValue(this.model.member.active)}}</p>
        <p class="card-text"><small class="text-muted">Eintrittsdatum: {{ formatDate(this.model.member.entry_date )}}</small></p>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "/src/api/axios.mjs";
import {formatInSwissTime, formatActiveValue} from "/src/services/formatterService.mjs";
import {useToast} from 'vue-toast-notification';
export default {
  name: "MemberInfoCard",
  data() {
    return {
      model: {
        member: {
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          telephone: "",
          active: "",
          role: "",
          entry_date: "",
        },
      },
      memberId: "",
      toast: useToast(),
    }
  },
  mounted() {
    this.memberId = this.$route.params.id;
    this.getMemberInfo(this.$route.params.id);
  },
  methods: {
    formatActiveValue,
    getMemberInfo(id) {
      axios.get(`/members/${id}/info`)
          .then((res) => {
            if (res.status === 200){
              this.model.member = res.data;
            }
          })
          .catch((error) => {
            console.log(error);
            if ([404, 500].includes(error.response.status)) {
              this.toast.error(error.response.data.message);
            } else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    },
    formatDate(date){
      return formatInSwissTime(date);
    },
  },
}
</script>

<style scoped>
.card {
margin: 10px;
}
</style>