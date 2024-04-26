<script>
import axios from 'axios';
import ApartmentsList from '../components/apartments/ApartmentsList.vue';
const endpoint = 'http://localhost:8000/api/apartments/';
export default {
    name: 'HomePage',
    components: { ApartmentsList },
    data: () => ({
        apartments: []
    }),
    methods: {
        fetchApartments() {
            axios.get(endpoint).then(res => {
                this.apartments = res.data
            })
        }
    },
    created() {
        this.fetchApartments();
    }
}

</script>

<template>
    <div class="container">
        <ApartmentsList :apartments="apartments" />
    </div>

</template>

<style></style>