<script>
import ApartmentCard from './ApartmentCard.vue';
export default {
    name: 'ApartmentsList',
    components: { ApartmentCard },
    props: { apartments: Array }
}
</script>

<template>
    <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />
</template>

<style></style>