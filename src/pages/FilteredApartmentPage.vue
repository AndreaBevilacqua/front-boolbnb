<script>
import axios from 'axios';
import ApartmentsList from '../components/apartments/ApartmentsList.vue';
import TomTomAutocomplete from '../components/searchbar/TomTomAutocomplete.vue';
import { store } from '../assets/Data/store';
const endpoint = 'http://localhost:8000/api/apartments/';
const endpointAddressSearch = 'http://localhost:8000/api/apartments/search';
const endpointServices = 'http://localhost:8000/api/apartments/services/';


export default {
    name: 'FilteredApartmentPage',
    components: { ApartmentsList, TomTomAutocomplete },
    data: () => ({
        apartments: [],
        services: [],
        checkedServices: [],
        searchAddress: '',
        latitude: 0,
        longitude: 0,
        priceInput: 0,
        bedsInput: 0,
        roomsInput: 0,
        kmInput: 20,
        store,
        showModal: false
    }),
    methods: {
        deleteAddress() {
            this.searchAddress = '';
            this.latitude = null;
            this.longitude = null;
        },
        setAddress(address, lat, lon) {
            this.searchAddress = address;
            this.latitude = lat;
            this.longitude = lon;
        },
        setPriceInput() {
            if (!this.priceInput) this.priceInput = 0;
        },
        fetchApartments() {
            store.isLoading = true
            axios.get(endpoint).then(res => {
                this.apartments = res.data
                this.isLoading = false
            }).catch(err => {
                console.error(err)
            }).then(() => {
                store.isLoading = false;
            })
        },
        async searchApartmentsWithAddress(address = null) {
            store.isLoading = true
            // Se non è stato inserito alcun indirizzo
            if (!address) {
                this.$route.query.distance = '';
            }
            try {
                const res = await axios.get(endpointAddressSearch, {
                    params: {
                        address,
                        latitude: this.$route.query.latitude,
                        longitude: this.$route.query.longitude,
                        distance: this.kmInput,
                        price: this.priceInput,
                        rooms: this.roomsInput,
                        beds: this.bedsInput,
                        services: JSON.stringify(this.checkedServices)
                    }
                })
                this.apartments = res.data;
                console.log(this.apartments)
            } catch (err) {
                console.error(err);
            } finally {
                store.isLoading = false
            }


        },
        // Funzione per ottenere i servizi
        fetchServices() {
            axios.get(endpointServices).then(res => {
                this.services = res.data
            }).catch(err => {
                console.error(err)
            })
        },
        // Funzione per resettare i filtri
        resetFilters() {
            this.priceInput = 0;
            this.bedsInput = 0;
            this.roomsInput = 0;
            this.kmInput = 20;
            this.checkedServices = [];
        }
    },
    created() {
        this.kmInput = this.$route.query.distance;      ///////      
        this.searchAddress = this.$route.query.address;     ///////
        this.latitude = this.$route.query.latitude;     ///////
        this.longitude = this.$route.query.longitude;       ///////     Inizializzo i data con quello che mi arriva in query string
        this.priceInput = this.$route.query.price;      ///////
        this.roomsInput = this.$route.query.rooms;      ///////
        this.bedsInput = this.$route.query.beds;      ///////
        this.checkedServices = JSON.parse(this.$route.query.services);  // Arriva come stringa e lo riconverto in array con JSON.parse()
        this.searchApartmentsWithAddress(this.$route.query.address);
        this.fetchServices();
    },
    watch: {        // Al cambiamento di uno dei parametri in query string rifaccio la ricerca degli appartamenti
        '$route'(to, from) {
            if (to.query.address !== from.query.address || to.query.distance !== from.query.distance || to.query.services !== from.query.services || to.query.price !== from.query.price || to.query.rooms !== from.query.rooms || to.query.beds !== from.query.beds) {
                this.searchApartmentsWithAddress(to.query.address);
                this.$route.query.address = to.query.address;
                this.$route.query.distance = to.query.distance;
                this.$route.query.price = to.query.price;
                this.$route.query.rooms = to.query.rooms;
                this.$route.query.beds = to.query.beds;
                this.$route.query.services = to.query.services;

            }
        }
    }
}
</script>

<template>
    <!-- Ricerca di un appartamento -->
    <div class="d-flex justify-content-center gap-3">
        <div id="address-searchbar" class="searchbar rounded-pill shadow-sm container m-0 px-0">
            <form @submit.prevent class="d-flex justify-content-between align-items-center w-100 h-100">
                <TomTomAutocomplete :rounded="true" :showLabel="false" id="place" @selectAddress="setAddress"
                    @deleteAddress="deleteAddress" />
                <RouterLink class="btn btn-primary rounded-end-pill h-100 d-flex align-items-center  px-4"
                    :to="{ name: 'filtered-apartments', query: { address: searchAddress, latitude, longitude, distance: kmInput, price: priceInput, rooms: roomsInput, beds: bedsInput, services: JSON.stringify(checkedServices) } }">
                    Cerca
                </RouterLink>
            </form>
        </div>

        <!-- Bottone per Filtrare -->
        <button id="filters-button" type="button" class="rounded-pill p-3 shadow-sm d-flex align-items-center gap-2"
            @click="showModal = true">
            <font-awesome-icon icon="fa-solid fa-sort" />Filtri avanzati
        </button>

        <!-- Modale per i filtri -->
        <div class="modal fade show" v-if="showModal" id="filters-modal">
            <div class="modal-dialog modal-dialog-scrollable modal-xl">
                <div class="modal-content rounded">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Filtri avanzati
                        </h1>
                        <!-- Bottone per chiudere la modale -->
                        <button type="button" class="btn-close" @click="showModal = false"></button>
                    </div>
                    <div class="modal-body p-4">
                        <!-- Range per km -->
                        <div class="mb-3">
                            <label for="km" class="form-label">
                                Distanza / km {{ kmInput }}
                            </label>
                            <div class="range-wrap">
                                <input type="range" class="form-range" id="km" min="1" max="100" step="1"
                                    v-model="kmInput">
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    1 km
                                </div>
                                <div>
                                    100 km
                                </div>
                            </div>
                        </div>
                        <!-- Mappa -->

                        <!-- Prezzo -->
                        <div class="mb-3">
                            <label for="price" class="form-label">Pezzo per notte</label>
                            <div class="input-group">
                                <span class="input-group-text">&euro;</span>
                                <input type="number" class="form-control" id="price" aria-label="0.00" step="10"
                                    min="10" max="9999.99" v-model="priceInput" @blur="setPriceInput">
                            </div>
                        </div>
                        <div class="row">
                            <!-- Numero di stanze -->
                            <div class="col-6">
                                <label for="rooms" class="form-label">Numero di stanze</label>
                                <select name="rooms" id="rooms" class="form-select" v-model="roomsInput">
                                    <option selected value="0">Scegli...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8+</option>
                                </select>
                            </div>
                            <!-- Numero posti letto -->
                            <div class="col-6">
                                <label for="beds" class="form-label">Numero di letti</label>
                                <select name="beds" id="beds" class="form-select" v-model="bedsInput">
                                    <option selected value="0">Scegli...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8+</option>

                                </select>
                            </div>
                        </div>

                        <!-- Filtro Servizi -->
                        <div class="mt-3 mb-2 fs-4">
                            <strong>Servizi</strong>
                        </div>
                        <div class="row row-cols-1">
                            <div class="form-check p-0">
                                <div class="mb-1" v-for="service in services" :key="service.id">
                                    <input class="form-check-input ms-2" type="checkbox" :id="`service-${service.id}`"
                                        v-model="checkedServices" :value="service.id">
                                    <label class="form-check-label ms-2" :for="`service-${service.id}`">
                                        {{ service.label }}
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="resetFilters()">Rimuovi filtri</button>

                        <!-- Bottono Applica filtri -->
                        <RouterLink @click="showModal = false" class="btn btn-primary"
                            :to="{ name: 'filtered-apartments', query: { address: searchAddress, latitude, longitude, distance: kmInput, price: priceInput, rooms: roomsInput, beds: bedsInput, services: JSON.stringify(checkedServices) } }">
                            Applica filtri
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- ---------------------- CHIUSURA MODALE ---------------------- -->
    </div>
    <h1 class="mt-5 mb-3">Appartamenti BoolBnb</h1>
    <ApartmentsList v-if="!store.isLoading && apartments" :apartments="apartments" />
</template>

<style scoped lang="scss">
.searchbar {
    border: 0.5px solid gray;

    input {
        width: 95%;
        border: none;
        outline: none;
    }
}

#filters-modal {
    display: block;
    background-color: rgba($color: #000000, $alpha: .5);
}

#filters-button {
    background: white;
    border: 0.5px solid gray;
}

.my-color {
    background-color: #4BC9E4;
    color: white;
    font-weight: bold;
}
</style>