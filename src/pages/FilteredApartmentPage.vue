<script>
import axios from 'axios';
import ApartmentsList from '../components/apartments/ApartmentsList.vue';
const endpoint = 'http://localhost:8000/api/apartments/';
const endpointAddressSearch = 'http://localhost:8000/api/apartments/search';

export default {
    name: 'FilteredApartmentPage',
    components: { ApartmentsList },
    data: () => ({
        apartments: [],
        searchAddress: ''
    }),
    methods: {
        fetchApartments() {
            axios.get(endpoint).then(res => {
                this.apartments = res.data
            })
        },
        searchApartmentsWithAddress() {
            // Se non è stato inserito alcun indirizzo, esegue fetchApartments
            if (!this.searchAddress) {
                this.fetchApartments();
            } else {
                const endpointAddressSearch = `${endpoint}?address=${this.searchAddress}`;
                axios.get(endpointAddressSearch).then(res => {
                    this.apartments = res.data;
                });
            }
        }
    },
    created() {
        this.fetchApartments();
    }
}
</script>

<template>
    <!-- Ricerca di un appartamento -->
    <div class="searchbar rounded-pill p-2 shadow-sm container">
        <form @submit.prevent="fetchApartments()" class="d-flex justify-content-between align-items-center">
            <input type="search" id="place" class="ms-3 radius" placeholder="Inserisci un indirizzo"
                v-model="this.searchAddress">
            <button type="submit" class="btn btn-primary rounded-pill">Cerca</button>
        </form>
    </div>

    <ApartmentsList :apartments="apartments" />
</template>

<style>
.searchbar {
    border: 0.5px solid gray;

    #place {
        border-style: hidden;
    }
}
</style>