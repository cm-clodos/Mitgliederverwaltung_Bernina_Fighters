<template>
    <main class="login">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-6 col-xl-6 mt-5 mx-auto col-12">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h3 class="card-title text-center" data-test="site-title">Login</h3>
                        </div>
                        <div class="card-body">
                            <form ref="form" @submit.prevent="handleLogin">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input data-test="input-email" type="text" class="form-control" id="email" name="email"
                                        v-model="model.userCredentials.email">
                                    <span v-if="v$.model.userCredentials.email.$error" data-test="error-message-email"
                                        :class="`${v$.model.userCredentials.email.$error ? 'error-message' : ''}`">
                                        {{ v$.model.userCredentials.email.email.$message }}
                                    </span>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Passwort <button type="button"
                                            class="btn-password" @click="togglePasswordVisibility">
                                            <font-awesome-icon v-if="!showPassword" class="password-icon"
                                                data-test="password-eye-close" icon="eye-slash" />
                                            <font-awesome-icon data-test="password-eye-open" v-else class="password-icon"
                                                icon="eye" />
                                        </button></label>
                                    <input data-test="input-password" type="password" class="form-control" id="password"
                                        name="password" v-model="model.userCredentials.password">
                                    <span v-if="v$.model.userCredentials.password.$error" data-test="error-message-password"
                                        :class="`${v$.model.userCredentials.password.$error ? 'error-message' : ''}`">
                                        {{ v$.model.userCredentials.password.required.$message }}
                                    </span>
                                </div>
                                <div class="d-grid">
                                    <button data-test="submit-btn" type="submit" class="btn btn-primary">Anmelden</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { useToast } from 'vue-toast-notification';
import { mapActions } from 'pinia';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import useUserStore from '@/stores/user';

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    name: "LoginForm",
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            showPassword: false,
            model: {
                userCredentials: {
                    email: "",
                    password: "",
                },
            },
            toast: useToast(),
        };
    },
    validations() {
        return {
            model: {
                userCredentials: {
                    email: { required, email: helpers.withMessage('Ungültige Email', email) },
                    password: { required: helpers.withMessage('Passwort ist erforderlich', required) },
                },
            },
        };
    },
    methods: {
        ...mapActions(useUserStore, ['authenticate']),
        async handleLogin() {
            const valid = await this.v$.$validate();
            if (valid) {
                try {
                    await this.authenticate(this.model.userCredentials)
                    console.log("Your Logged in")
                    this.toast.success("Du bist eingeloggt!");
                    this.$router.push({ name: 'Home' });

                } catch (err) {
                    this.toast.error("Fehler beim übermitteln des Formulars!")
                    console.log(err)
                }
            } else {
                this.toast.error("Bitte fülle die Felder korrekt aus!")
            }
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;

            const passwordInput = document.getElementById("password");
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";

        },
    },

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/loginForm.scss";
</style>