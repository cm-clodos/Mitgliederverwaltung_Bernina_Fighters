<template>
    <main class="transactionNew">
        <h1 class="view-title" data-test="site-title">Transaktion bearbeiten</h1>
        <div class="container">
            <form ref="form" @submit.prevent="handleSubmit">
                <div class="card">
                    <div class="card-header">
                        <h4>Transaktion bearbeiten</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <!-- Konto Dropdown -->
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="account" class="form-label">Konto</label>
                                    <select data-test="select-account" id="account" name="account" class="form-select"
                                        v-model="model.transaction.account_id">
                                        <option v-for="(account, index) in accounts" :key="index"
                                            :value="account.account_id">
                                            {{ account.account_name }}
                                        </option>
                                    </select>
                                    <span v-if="v$.model.transaction.account_id.$error"
                                        data-test="error-message-account"
                                        :class="`${v$.model.transaction.account_id.$error ? 'error-message' : ''}`">
                                        {{ v$.model.transaction.account_id.required.$message }}
                                    </span>
                                </div>
                            </div>

                            <!-- Typ Dropdown (Einnahmen oder Ausgaben) -->
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="type" class="form-label">Typ</label>
                                    <select data-test="select-type" id="type" name="type" class="form-select"
                                        v-model="model.transaction.type">
                                        <option value="Einnahme">Einnahme</option>
                                        <option value="Ausgabe">Ausgabe</option>
                                    </select>
                                    <span v-if="v$.model.transaction.type.$error" data-test="error-message-type"
                                        :class="`${v$.model.transaction.type.$error ? 'error-message' : ''}`">
                                        {{ v$.model.transaction.type.required.$message }}
                                    </span>
                                </div>
                            </div>

                            <!-- Kategorie Dropdown -->
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="category" class="form-label">Kategorie</label>
                                    <select data-test="select-category" id="category" name="category"
                                        class="form-select" v-model="model.transaction.transCategory_id">
                                        <option v-for="(category, index) in categories" :key="index"
                                            :value="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                    <span v-if="v$.model.transaction.transCategory_id.$error"
                                        data-test="error-message-category"
                                        :class="`${v$.model.transaction.transCategory_id.$error ? 'error-message' : ''}`">
                                        {{ v$.model.transaction.transCategory_id.required.$message }}
                                    </span>
                                </div>
                            </div>

                            <!-- Datumsauswahl -->
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="date" class="form-label">Datum</label>
                                    <input data-test="input-date" type="date" class="form-control" id="date" value=""
                                        v-model="model.transaction.trans_date">
                                    <span v-if="v$.model.transaction.trans_date.$error" data-test="error-message-date"
                                        :class="`${v$.model.transaction.trans_date.$error ? 'error-message' : ''}`">
                                        {{ v$.model.transaction.trans_date.required.$message }}
                                    </span>
                                </div>
                            </div>

                            <!-- Betragseingabe -->
                            <div class="col-md-6 offset-md-6">
                                <div class="mb-3">
                                    <label for="amount" class="form-label">Betrag</label>
                                    <input data-test="input-amount" type="text" class="form-control" id="amount"
                                        value="" v-model="model.transaction.amount">
                                    <span v-if="v$.model.transaction.amount.$error" data-test="error-message-amount"
                                        :class="`${v$.model.transaction.amount.$error ? 'error-message' : ''}`">
                                        {{ v$.model.transaction.amount.required.$message }}
                                    </span>
                                </div>
                            </div>

                            <!-- Beschreibungseingabe -->
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="description" class="form-label">Beschreibung</label>
                                    <input data-test="input-description" type="text" class="form-control"
                                        id="description" value="" v-model="model.transaction.description">
                                </div>
                            </div>
                        </div>

                        <!-- Bestätigungsbutton -->
                        <div class="mb-3">
                            <button data-test="submit-btn" type="submit" class="btn btn-primary">Bestätigen</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import { useToast } from 'vue-toast-notification';
import axios from "/src/api/axios.mjs";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { formatInSwissTime } from "/src/services/formatterService.mjs";



export default {
    name: 'TransactionEdit',

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            transactionId: "",
            toast: useToast(),
            accounts: [],
            categories: [],
            model: {
                transaction: {
                    account_id: null,
                    transCategory_id: null,
                    trans_date: '',
                    type: '',
                    amount: null,
                    description: ''
                }
            },

        };
    },
    mounted() {
        this.transactionId = this.$route.params.id;
        this.getTransactionById(this.$route.params.id);
        this.getAllAccounts();
        this.getAllTransCategories();
    },
    validations() {
        return {
            model: {
                transaction: {
                    account_id: { required: helpers.withMessage("Konto muss ausgewählt werden!", required) },
                    transCategory_id: { required: helpers.withMessage("Kategorie muss ausgewählt werden!", required) },
                    trans_date: { required: helpers.withMessage("Datum muss ausgewählt werden!", required) },
                    type: { required: helpers.withMessage("Transaktionstyp muss ausgewählt werden!", required) },
                    amount: { required: helpers.withMessage("Betrag eingeben!", required) },
                }
            },
        };
    },

    methods: {
        async getAllAccounts() {
            axios.get('/finance/accounts')
                .then(res => {
                    this.accounts = res.data;
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
        async getAllTransCategories() {
            axios.get('/finance/categories')
                .then(res => {
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
        resetForm() {
            this.model.transaction.account_id = null;
            this.model.transaction.transCategory_id = null;
            this.model.transaction.trans_date = '';
            this.model.transaction.type = '';
            this.model.transaction.amount = null;
            this.model.transaction.description = '';
        },
        getTransactionById(id) {
            axios.get(`/finance/transaction/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data)
                        this.model.transaction = res.data[0];
                        this.model.transaction.trans_date = this.formatDate(this.model.transaction.trans_date);
                        console.log(this.model.transaction)
                    }

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

        updateTransaction() {
            axios.put(`/finance/transaction/${this.transactionId}`, this.model.transaction)
                .then(res => {
                    if (res.status === 200) {
                        this.toast.success(res.data.message);
                        this.$router.push("/finance/transactions");
                    }
                })
                .catch(error => {
                    console.log(error);
                    if ([400, 404, 500].includes(error.response.status)) {
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
        formatDate(entry_date) {
            const swissTimeString = formatInSwissTime(entry_date);
            let parts = swissTimeString.split(".");
            return `${parts[2]}-${parts[1]}-${parts[0]}`
        },

        /*
        async addTransaction() {
            axios.post('/finance/transaction', this.model.transaction)
                .then(res => {
                    if (res.status === 201) {
                        this.toast.success(res.data.message);
                        this.resetForm();
                        this.v$.model.transaction.account_id.$reset();
                        this.v$.model.transaction.transCategory_id.$reset();
                        this.v$.model.transaction.trans_date.$reset();
                        this.v$.model.transaction.amount.$reset();
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
                        console.log(error.response.data);
                    } else {
                        console.log("Unexpected error: " + error.response.status);
                    }
                });
        },
        */
        async handleSubmit() {
            const valid = await this.v$.$validate();
            if (valid) {

                try {
                    this.updateTransaction();
                } catch (err) {
                    this.toast.error("Fehler beim übermitteln des Formulars!")
                    console.log(err)
                }
            } else {
                this.toast.error("Bitte fülle die Felder korrekt aus!")

            }

        }
    }
}
</script>

<style lang="sass" scoped>

</style>