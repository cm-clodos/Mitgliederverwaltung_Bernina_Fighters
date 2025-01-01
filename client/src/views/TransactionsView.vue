<template>
    <main>
        <h1 class="view-title" data-test="site-title">Transaktionen</h1>
        <transaction-list></transaction-list>
    </main>


</template>

<script>
import TransactionList from '@/components/TransactionList.vue';
export default {
    name: 'TransactionsView',

    components: {
        TransactionList

    },
    data() {
        return {

        };
    },


}
</script>

<style lang="scss" scoped></style>