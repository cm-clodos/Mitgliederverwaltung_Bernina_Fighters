<template>
    <div>
        <TransactionList />

    </div>
</template>

<script>
import TransactionList from '@/components/TransactionList.vue';
export default {
    name: 'TransactionsListView',
    components: {
        TransactionList
    },
    data() {
        return {

        };
    },
}
</script>

<style lang="sass" scoped>

</style>