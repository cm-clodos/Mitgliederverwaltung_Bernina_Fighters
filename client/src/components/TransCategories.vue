<template>
  <main>
    <h1 class="view-title" data-test="site-title">Transaktionen Kategorien hinzufügen</h1>
    <div class="container">
      <form ref="form" @submit.prevent="handleSubmit">
        <div class="card">
          <div class="card-header">
            <h4>Kategorie hinzufügen</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="categoryName" class="form-label">Kategoriename</label>
                  <input data-test="input-categoryname" type="text" class="form-control" id="categoryName"
                    v-model="model.category.name">
                  <span v-if="v$.model.category.name.$error" data-test="error-message-categoryname"
                    :class="`${v$.model.category.name.$error ? 'error-message' : ''}`">
                    {{ v$.model.category.name.required.$message }}
                  </span>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <button data-test="submit-btn" type="submit" class="btn btn-primary">Kategorie hinzufügen</button>
            </div>
          </div>
        </div>
      </form>
      <!-- List of categories -->
      <div class="card mt-3">
        <div class="card-header">
          <h4>Kategorienliste</h4>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li v-for="category in categories" :key="category.id"
              class="list-group-item d-flex justify-content-between align-items-center">
              {{ category.name }}
              <button @click="deleteTransCategory(category.id)" class="btn btn-danger btn-sm">Löschen</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>


</template>

<script>
import { useToast } from 'vue-toast-notification';
import axios from "/src/api/axios.mjs";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  name: 'TransCategories',

  components: {

  },
  data() {
    return {
      toast: useToast(),
      model: {
        category: {
          name: ''
        }
      },
      categories: []

    };

  },
  mounted() {
    this.getAllTransCategories();
  },
  validations() {
    return {
      model: {
        category: {
          name: { required: helpers.withMessage('Finanzkategorie ist erforderlich', required) },
        }
      }
    }
  },
  methods: {
    async getAllTransCategories() {
      axios.get('/finance/categories')
        .then(res => {
          console.log(res.data);
          this.categories = res.data;
        })
        .catch(error => {
          console.log(error)
          if ([500].includes(error.response.status)) {
            this.toast.error(error.response.data.message);
          } else {
            console.log("Unexpected error: " + error.response.status);
          }
        });

    },
    async deleteTransCategory(id) {
      axios.delete(`/finance/categories/${id}`)
        .then(res => {
          if (res.status === 202) {
            this.toast.success(res.data.message);
            this.getAllTransCategories();
          }
        })
        .catch(error => {
          console.log(error);
          if ([404, 500].includes(error.response.status)) {
            this.toast.error(error.response.data.message);
          } else {
            console.log("Unexpected error: " + error.response.status);
          }
        });
    },
    async addTransCategory() {
      axios.post('/finance/categories', this.model.category)
        .then(res => {
          if (res.status === 201) {
            this.toast.success(res.data.message);
            this.model.category.name = ''; // Reset the category name
            this.v$.model.category.name.$reset(); // Reset the validation state
            this.getAllTransCategories();

          }
        })
        .catch(error => {
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
          } else {
            console.log("Unexpected error: " + error.response.status);
          }
        });
    },

    async handleSubmit() {
      const valid = await this.v$.$validate();
      if (valid) {
        try {
          await this.addTransCategory();
        } catch (err) {
          this.toast.error("Fehler beim übermitteln des Formulars!")
          console.log(err)
        }
      } else {
        this.toast.error("Bitte fülle die Felder korrekt aus!")

      }
    }
  },
}



</script>

<style lang="scss" scoped></style>