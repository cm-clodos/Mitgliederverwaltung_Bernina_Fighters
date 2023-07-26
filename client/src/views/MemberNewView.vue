<template>
  <main class="memberNew">
    <h1 class="view-title" data-test="site-title" >Mitglied hinzufügen</h1>
    <div class="container">
      <form ref="form" @submit.prevent="handleSubmit">
        <div class="card">
          <div class="card-header">
            <h4>Mitglied hinzufügen</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="firstname" class="form-label">Vorname</label>
                  <input data-test="input-firstname" type="text" class="form-control" id="firstname"
                         v-model="model.member.firstname">
                  <span v-if="v$.model.member.firstname.$error" data-test="error-message-firstname" :class="`${v$.model.member.firstname.$error ? 'error-message' : ''}`">
              {{ v$.model.member.firstname.required.$message }}
            </span>
                </div>
                <div class="mb-3">
                  <label for="lastname" class="form-label">Nachname</label>
                  <input data-test="input-lastname" type="text" class="form-control" id="firstname"
                         v-model="model.member.lastname">
                  <span v-if="v$.model.member.lastname.$error" data-test="error-message-lastname" :class="`${v$.model.member.lastname.$error ? 'error-message' : ''}`">
              {{ v$.model.member.lastname.required.$message }}
            </span>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input data-test="input-email" type="text" class="form-control" id="email" v-model="model.member.email">
                  <span v-if="v$.model.member.email.$error" data-test="error-message-email" :class="`${v$.model.member.email.$error ? 'error-message' : ''}`">
              {{ v$.model.member.email.email.$message }}
            </span>
                </div>
                <div class="mb-3">
                  <label for="active" class="form-label">Aktiv</label>
                  <input data-test="input-active" v-model="model.member.active" class="form-check-input" type="checkbox"
                         id="active" checked>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="telephone" class="form-label">Telefon</label>
                  <input data-test="input-telephone" type="tel" class="form-control" id="telephone"
                         v-model="model.member.telephone">
                  <span v-if="v$.model.member.telephone.$error" data-test="error-message-telephone" :class="`${v$.model.member.telephone.$error ? 'error-message' : ''}`">
              {{ v$.model.member.telephone.phone.$message }}
            </span>
                </div>
                <div class="mb-3">
                  <label for="role" class="form-label">Vereinsrolle</label>
                  <select data-test="select-role" id="role" name="role" class="form-select" v-model="model.member.role_id">
                    <option data-test="option-role" v-for="(role, index) in this.memberRoles" :key="index" :value="role.id">
                      {{ role.role }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="entry_date" class="form-label">Eintrittsdatum</label>
                  <input data-test="input-entry-date" type="date" class="form-control" id="entry_date"
                         v-model="model.member.entry_date">
                  <span v-if="v$.model.member.entry_date.$error" data-test="error-message-entry-date" :class="`${v$.model.member.entry_date.$error ? 'error-message' : ''}`">
              {{ v$.model.member.entry_date.required.$message }}
            </span>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <button data-test="submit-btn" type="submit" class="btn btn-primary">Mitglied hinzufügen</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "/src/api/axios.mjs";
import {useToast} from 'vue-toast-notification';
import {useVuelidate} from "@vuelidate/core";
import {required, email, helpers} from "@vuelidate/validators";

const phone = (value) => value.match(/^\d{10,13}$/)

export default {
  setup() {
    return {v$: useVuelidate()}
  },
  name: "MemberNewView",
  data() {
    return {
      memberRoles: [],
      model: {
        member: {
          firstname: "",
          lastname: "",
          email: "",
          telephone: "",
          active: true,
          role_id: 4,
          entry_date: "",
        },
      },
      toast: useToast(),
    };
  },
  validations(){
    return {
      model: {
        member: {
          firstname: {required: helpers.withMessage('Vorname ist erforderlich', required)},
          lastname: {required: helpers.withMessage('Nachname ist erforderlich', required)},
          email: {required, email: helpers.withMessage('Ungültige Email', email)},
          telephone: {phone: helpers.withMessage('Telefonnummer muss 10-13 Ziffern enthalten', phone)},
          entry_date: {required: helpers.withMessage('Eintrittsdatum ist erforderlich', required)},
        },
      },
    };
  },
  mounted() {
    this.getMemberRoles();
  },
  methods: {
    getMemberRoles() {
      axios.get("/members/roles")
        .then((res) => {
          this.memberRoles = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addMember() {
      axios.post("/members", this.model.member)
        .then((res) => {
          if (res.status === 201) {
            this.toast.success(res.data.message);
            this.$router.push("/members");
          }
        })
        .catch((error) => {
          console.log(error);
          if ([400, 500].includes(error.response.status)) {
            if (error.response.data.message) {
              this.toast.error(error.response.data.message);
            } else if (error.response.data.length > 0) {
              error.response.data.forEach((errorObj) => {
                Object.values(errorObj).forEach((errorMessage) => {
                  this.toast.error(String(errorMessage));
                });
              });
            }
            console.log(error.response.data);
          } else {
            console.log("Unexpected error: " + error.response.status);
          }
        });
    },
    async handleSubmit() {
      const valid = await this.v$.$validate();
      if (valid) {
        try {
          this.addMember();
        } catch (err) {
          this.toast.error("Fehler beim übermitteln des Formulars!")
          console.log(err)
        }
      } else {
        this.toast.error("Bitte fülle die Felder korrekt aus!")
      }
    },
  },
}
</script>

<style scoped>

</style>