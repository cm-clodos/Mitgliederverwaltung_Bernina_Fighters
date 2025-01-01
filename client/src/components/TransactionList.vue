<template>
    <div>
        <h1 class="view-title" data-test="site-title">Transaktionen Anzeigen</h1>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h4>Transaktionen
                    </h4>
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <label for="account" class="form-label">Konto auswählen</label>
                            <select v-model="selectedAccountId" @change="loadTransactions" class="form-select"
                                id="account">
                                <option disabled value="">Bitte Konto auswählen</option>
                                <option v-for="(account, index) in accounts" :key="index" :value="account.account_id">
                                    {{ account.account_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Konto</th>
                                <th>Datum</th>
                                <th>Typ</th>
                                <th>Kategorie</th>
                                <th>Beschreibung</th>
                                <th>Betrag</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.allTransactions.length > 0">
                            <tr v-for="(transaction, index) in displayedTransactions" :key="index">
                                <td data-cell="konto"> {{ transaction.account_name }}</td>
                                <td data-cell="datum"> {{ this.formatDate(transaction.transaction_date) }}</td>
                                <td data-cell="typ">{{ transaction.transaction_type }}</td>
                                <td data-cell="kategorie"> {{ transaction.category_name }}</td>
                                <td data-cell="beschreibung"> {{ transaction.transaction_description }}</td>
                                <td data-cell="betrag"> {{ transaction.transaction_amount }} Fr.-</td>
                                <div class="actions-container">
                                    <RouterLink :to="{ path: '/finance/transactions/new' }"
                                        class="btn btn-success action-btn">
                                        <font-awesome-icon class="action-icon" icon="pencil" />
                                    </RouterLink>
                                    <button data-test="delete-btn" type="button" @click=""
                                        class="btn btn-danger action-btn"><font-awesome-icon class="action-icon"
                                            icon="trash-can" /></button>
                                </div>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td data-test="no-data-text" colspan="4" class="text-center">Keine Transaktionsdaten
                                    verfügbar...</td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination :totalPages="totalPages" :currentPage="currentPage" :changePage="changePage">
                    </Pagination>
                    <ConfirmModal :show="modalVisible" @confirm="handleConfirm" @cancel="closeModal"
                        title="Transaktion löschen" message="Die Transaktion wirklich löschen?"></ConfirmModal>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import axios from "/src/api/axios.mjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
    name: 'TransactionList',

    components: {
        FontAwesomeIcon,

    },
    data() {
        return {
            selectedAccountId: '',
            accounts: [],
            allTransactions: [

            ],
            currentPage: 1,
            totalPages: 1,
            modalVisible: false,

        };
    },
    mounted() {
        this.getAllAccounts();
    },
    computed: {
        displayedTransactions() {
            // Hier könntest du die Logik für Paginierung oder Filterung hinzufügen
            return this.allTransactions;
        }
    },
    methods: {
        async getAllAccounts() {
            axios.get('/finance/accounts')
                .then(res => {
                    this.accounts = res.data;
                    console.log(this.accounts)
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

        async getAllTransactionsFromAccount(selectedAccountId) {
            axios.get(`/finance/accounts/${selectedAccountId}/transactions`)
                .then(res => {
                    console.log(res.data)
                    this.allTransactions = res.data
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

        loadTransactions() {
            // Finde den vollständigen Account basierend auf der ausgewählten ID
            const selectedAccount = this.accounts.find(
                (account) => account.account_id === this.selectedAccountId
            );
            console.log(this.selectedAccountId)

            if (this.selectedAccountId) {
                this.getAllTransactionsFromAccount(this.selectedAccountId)
            }
        },
        searchTransaction() {
            // Füge Suchlogik hinzu, wenn gewünscht
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        formatTransCategory() {
            //formatiere die transcategory ID um in den namen der Category
        },
        formatAccountId() {
            // formatiere die account id um in den namen des accounts
        },

        changePage(page) {
            this.currentPage = page;
        },
        handleConfirm() {
            // Bestätigungshandling
        },
        closeModal() {
            this.modalVisible = false;
        }

    }

}
</script>

<style lang="sass" scoped>

</style>