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
                                        id="AccountName">
                                </div>
                                <div class="mb-3">
                                    <label for="accountBalance" class="form-label">Betrag</label>
                                    <input data-test="input-accountBalance" type="number" class="form-control"
                                        id="accountBalance">
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
                    <h4>Konten und Kassen Liste</h4>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li>
                            Konto Test + Betrag

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

    },

    methods: {
        handleSubmit() {
            console.log('submit');
        },
        addAccount() {
            console.log('add account');
        }


    }


}
</script>

<style lang="scss" scoped></style>