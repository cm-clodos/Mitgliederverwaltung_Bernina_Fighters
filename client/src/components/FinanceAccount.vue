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
                                    <label for="trikotName" class="form-label">Name</label>
                                    <input data-test="input-trikotname" type="text" class="form-control"
                                        id="trikotName">
                                </div>
                                <div class="mb-3">
                                    <label for="trikotNumber" class="form-label">Betrag</label>
                                    <input data-test="input-number" type="number" class="form-control"
                                        id="trikotNumber ">
                                    <span data-test="error-message-number">
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
        </div>

    </main>


</template>

<script>

export default {
    name: 'FinanceAccount',

    components: {


    },
    data() {
        return {

        };
    },


}
</script>

<style lang="scss" scoped></style>