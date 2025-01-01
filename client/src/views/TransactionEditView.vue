<template>
    <main>
        <h1 class="view-title" data-test="site-title">Transaktion bearbeiten</h1>
        <transaction-edit></transaction-edit>
    </main>
</template>

<script>
import TransactionEdit from '@/components/TransactionEdit.vue';


export default {
    name: 'TransactionEditView',

    components: {
        TransactionEdit,

    },
    data() {
        return {

        };
    },


}
</script>

<style lang="scss" scoped></style>