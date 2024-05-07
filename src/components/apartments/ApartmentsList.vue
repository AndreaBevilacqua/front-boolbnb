<script>
import ApartmentCard from './ApartmentCard.vue';
export default {
    name: 'ApartmentsList',
    components: { ApartmentCard },
    props: {
        apartments: Array,
        hasDistance: Boolean,
        isSponsored: Boolean
    }
}
</script>

<template>
    <div class="row">
        <div v-for="apartment in apartments" v-if="apartments.length" class="col-12 col-sm-6 col-lg-4 col-xxl-3">
            <ApartmentCard :key="apartment.id" :apartment="apartment" :hasDistance="hasDistance"
                :isSponsored="isSponsored" />
        </div>
        <h2 v-else class="text-center mt-5 ">Nessun appartamento è stato trovato</h2>
    </div>
</template>

<style></style>