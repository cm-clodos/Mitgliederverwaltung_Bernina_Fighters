<template>
    <main>
        <h1 class="view-title" data-test="site-title">Vermögens Erfassung</h1>
        <div class="container">
            <form ref="form" @submit.prevent="handleSubmit">
                <div class="card">
                    <div class="card-header">
                        <h4>Konto/Kasse hinzufügen</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">

                                <div class="mb-3">
                                    <label for="accountName" class="form-label">Name</label>
                                    <input data-test="input-accountname" type="text" class="form-control"
                                        id="AccountName" v-model="model.account.name">
                                    <span v-if="v$.model.account.name.$error" data-test="error-message-accountname"
                                        :class="`${v$.model.account.name.$error ? 'error-message' : ''}`">
                                        {{ v$.model.account.name.required.$message }}
                                    </span>
                                </div>
                                <div class="mb-3">
                                    <label for="accountBalance" class="form-label">Betrag</label>
                                    <input data-test="input-accountBalance" type="text" class="form-control"
                                        id="accountBalance" v-model="model.account.balance">
                                    <span v-if="v$.model.account.balance.$error"
                                        data-test="error-message-accountbalance"
                                        :class="`${v$.model.account.balance.$error ? 'error-message' : ''}`">
                                        {{ v$.model.account.balance.required.$message }}
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div class="mb-3">
                            <button data-test="submit-btn" type="submit" class="btn btn-primary">Konto/Kasse
                                hinzufügen</button>
                        </div>
                    </div>
                </div>
            </form>
            <!-- List of Accounts -->
            <div class="card mt-3">
                <div class="card-header">
                    <h4>Konten und Kassen</h4>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li v-for="account in accounts" :key="account.id"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="account-details">
                                <span class="account-name">{{ account.account_name }}</span>
                                <span :class="getBalanceClass(account.balance)" class="account-balance">{{
                account.balance }}.- </span>
                            </div>
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
    name: 'FinanceAccount',

    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            toast: useToast(),
            accounts: [],
            model: {
                account: {
                    name: '',
                    balance: ''
                }
            },

        };
    },
    mounted() {

        this.getAllAccounts();
    },
    validations() {
        return {
            model: {
                account: {
                    name: { required: helpers.withMessage('Kontoname erforderlich!', required) },
                    balance: {
                        required: helpers.withMessage('Kontostand erforderlich!', required),
                    },
                }
            }
        }
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

        async addAccount() {
            axios.post('/finance/accounts', this.model.account)
                .then(res => {
                    if (res.status === 201) {
                        this.toast.success(res.data.message);
                        this.model.account.name = '';
                        this.model.account.balance = '';
                        this.v$.model.account.name.$reset();
                        this.v$.model.account.balance.$reset();
                        this.getAllAccounts();

                    }
                })
                .catch(error => {
                    console.log(error);
                    if ([400, 422, 500].includes(error.response.status)) {
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
            console.log('submit');
            const valid = await this.v$.$validate();
            if (valid) {
                try {
                    await this.addAccount();
                } catch (err) {
                    this.toast.error("Fehler beim übermitteln des Formulars!")
                    console.log(err)
                }
            } else {
                this.toast.error("Bitte fülle die Felder korrekt aus!")

            }
        },
        getBalanceClass(balance) {
            return balance >= 0 ? 'positive-balance' : 'negative-balance';
        }


    }


}
</script>

<style lang="scss" scoped></style>