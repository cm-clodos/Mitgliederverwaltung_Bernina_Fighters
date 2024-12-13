<template>
    <main>
        <h1 class="view-title" data-test="site-title">Transaktionen</h1>
        <transaction-new></transaction-new>
        <transaction-list></transaction-list>
    </main>


</template>

<script>
import TransactionNew from '@/components/TransactionNew.vue';
import TransactionList from '@/components/TransactionList.vue';
export default {
    name: 'TransactionsView',

    components: {
        TransactionNew,
        TransactionList

    },
    data() {
        return {

        };
    },


}
</script>

<style lang="scss" scoped></style>