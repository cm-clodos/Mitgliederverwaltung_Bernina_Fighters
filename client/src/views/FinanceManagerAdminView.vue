<template>
    <main>
        <h1 class="view-title" data-test="site-title">Verwaltung</h1>
        <TransCategories />
        <FinanceAccount />
    </main>


</template>

<script>
import TransCategories from '@/components/TransCategories.vue';
import FinanceAccount from '@/components/FinanceAccount.vue';
export default {
    name: 'FinanceManagerAdminView',

    components: {
        TransCategories,
        FinanceAccount

    },
    data() {
        return {

        };
    },


}
</script>

<style lang="scss" scoped></style>