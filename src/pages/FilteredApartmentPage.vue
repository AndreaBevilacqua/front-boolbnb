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
        async searchApartmentsWithAddress(address = null) {
            // Se non è stato inserito alcun indirizzo, esegue fetchApartments
            if (!this.searchAddress) {
                this.fetchApartments();
            } else {
                try {

                    // const endpointAddressSearch = `${endpoint}?address=${this.searchAddress}`;
                    const res = await axios.get(endpointAddressSearch, {
                        params: {
                            address
                        }
                    })
                    this.apartments = res.data;
                } catch (err) {
                    console.error(err);
                }

            }
        }
    },
    created() {
        this.fetchApartments(this.$route.params.address);
    }
}
</script>

<template>
    <!-- Ricerca di un appartamento -->
    <div class="searchbar rounded-pill p-2 shadow-sm container">
        <form @submit.prevent class="d-flex justify-content-between align-items-center">
            <input @keyup.enter="searchApartmentsWithAddress" type="search" id="place" class="ms-3 radius"
                placeholder="Inserisci un indirizzo" v-model="searchAddress">
            <button @click="searchApartmentsWithAddress(searchAddress)" type="button"
                class="btn btn-primary rounded-pill">Cerca</button>
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