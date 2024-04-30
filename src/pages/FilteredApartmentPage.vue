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
        searchAddress: '',
        isLoading: false
    }),
    props: {
        address: String
    },
    methods: {
        fetchApartments() {
            axios.get(endpoint).then(res => {
                this.apartments = res.data
                this.isLoading = false
            })
        },
        async searchApartmentsWithAddress(address = null) {
            this.isLoading = true

            // Se non è stato inserito alcun indirizzo, esegue fetchApartments
            if (!address) {
                this.fetchApartments();
            } else {
                try {
                    const res = await axios.get(endpointAddressSearch, {
                        params: {
                            address
                        }
                    })
                    this.apartments = res.data;
                } catch (err) {
                    console.error(err);
                } finally {
                    this.isLoading = false
                }

            }
        }
    },
    created() {
        this.searchApartmentsWithAddress(this.address);
    }
}
</script>

<template>
    <!-- Ricerca di un appartamento -->
    <div class="searchbar rounded-pill p-2 shadow-sm container">
        <form @submit.prevent class="d-flex justify-content-between align-items-center">
            <input @keyup.enter="searchApartmentsWithAddress(searchAddress)" type="search" id="place"
                class="ms-3 radius" placeholder="Inserisci un indirizzo" v-model="searchAddress">
            <button @click="searchApartmentsWithAddress(searchAddress)" type="button"
                class="btn btn-primary rounded-pill">Cerca</button>
        </form>
    </div>

    <AppLoader v-if="isLoading" />
    <ApartmentsList :apartments="apartments" />
</template>

<style>
.searchbar {
    border: 0.5px solid gray;

    input {
        width: 95%;
        border: none;
        outline: none;
    }
}
</style>