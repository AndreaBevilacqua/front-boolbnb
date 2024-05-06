<script>
import ApartmentCard from './ApartmentCard.vue';
export default {
    name: 'ApartmentsList',
    components: { ApartmentCard },
    props: {
        apartments: Array,
        hasDistance: Boolean
    }
}
</script>

<template>
    <div v-if="apartments.length" class="row row-cols-5">
        <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment"
            :hasDistance="hasDistance" />
    </div>
    <h2 v-else class="text-center mt-5 ">Nessun appartamento è stato trovato</h2>
</template>

<style></style>