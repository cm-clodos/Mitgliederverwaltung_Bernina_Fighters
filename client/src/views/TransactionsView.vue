<template>
    <main>
        <h1 class="view-title" data-test="site-title">Transaktionen</h1>
        <transaction-new></transaction-new>
    </main>


</template>

<script>
import TransactionNew from '@/components/TransactionNew.vue';
export default {
    name: 'TransactionsView',

    components: {
        TransactionNew

    },
    data() {
        return {

        };
    },


}
</script>

<style lang="scss" scoped></style>