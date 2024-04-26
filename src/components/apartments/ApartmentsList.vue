<script>
import ApartmentCard from './ApartmentCard.vue';
export default {
    name: 'ApartmentsList',
    components: { ApartmentCard },
    props: { apartments: Array }
}
</script>

<template>
    <div class="row d-flex flex-wrap">
        <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />
    </div>
</template>

<style></style>