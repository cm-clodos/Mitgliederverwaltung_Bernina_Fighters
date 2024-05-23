<template>
    <main>
        <h1 class="view-title" data-test="site-title">Verwaltung</h1>
        <h1> Komponenten: Erstellung Transkategorien und Erstellung Bankkonten</h1>
        <TransCategories />
    </main>


</template>

<script>
import TransCategories from '@/components/TransCategories.vue';
export default {
    name: 'FinanceManagerAdminView',

    components: {
        TransCategories

    },
    data() {
        return {

        };
    },


}
</script>

<style lang="scss" scoped></style>