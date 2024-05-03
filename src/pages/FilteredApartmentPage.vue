<script>
import axios from 'axios';
import ApartmentsList from '../components/apartments/ApartmentsList.vue';
import { store } from '../assets/Data/store';
const endpoint = 'http://localhost:8000/api/apartments/';
const endpointAddressSearch = 'http://localhost:8000/api/apartments/search';
const endpointServices = 'http://localhost:8000/api/apartments/services/';


export default {
    name: 'FilteredApartmentPage',
    components: { ApartmentsList },
    data: () => ({
        apartments: [],
        services: [],
        checkedServices: [],
        searchAddress: '',
        priceInput: 0,
        bedsInput: 0,
        roomsInput: 0,
        kmInput: 20,
        store
    }),
    props: {
        address: String,
    },
    methods: {
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

            // Se non è stato inserito alcun indirizzo, esegue fetchApartments
            if (!address) {
                this.fetchApartments();
            } else {
                try {
                    const res = await axios.get(endpointAddressSearch, {
                        params: {
                            address,
                            distance: this.kmInput
                        }
                    })
                    this.apartments = res.data;
                } catch (err) {
                    console.error(err);
                } finally {
                    store.isLoading = false
                }

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
    computed: {
        filteredApartments() {
            let newApartments = this.apartments.filter((apartment) => {
                if (this.roomsInput === 0)
                    return true;
                else if (this.roomsInput === 8) {
                    return apartment.rooms >= this.roomsInput;
                } else {
                    return apartment.rooms == this.roomsInput;
                }
            });
            newApartments = newApartments.filter((apartment) => {
                if (this.priceInput === 0)
                    return true;
                else
                    return apartment.price_per_night <= this.priceInput;
            });
            newApartments = newApartments.filter((apartment) => {
                if (this.bedsInput === 0)
                    return true;
                else if (this.bedsInput === 8) {
                    return apartment.beds >= this.bedsInput;
                } else {
                    return apartment.beds == this.bedsInput
                }
            });
            newApartments = newApartments.filter((apartment) => {
                if (this.checkedServices.length === 0)
                    return true;
                else {
                    const serviceIdsInApartment = apartment.services.map(service => service.id)
                    const allServicesIncluded = this.checkedServices.every(serviceId => serviceIdsInApartment.includes(serviceId))
                    return allServicesIncluded
                }
            });
            return newApartments;
        },
        // created() {                                                      ANDREAAAAAAAAAAAAA GUARDA DOVE STAVA IL CREATED
        // this.searchApartmentsWithAddress(this.$route.query.address);
        // this.fetchServices();
        // this.searchAddress = this.$route.query.address;
    },
    created() {
        this.searchApartmentsWithAddress(this.$route.query.address);
        this.fetchServices();
        this.searchAddress = this.$route.query.address;
    },
    watch: {
        '$route'(to, from) {
            if (to.query.address !== from.query.address) {
                this.searchApartmentsWithAddress(to.query.address);
                this.$route.query.address = to.query.address
            }
        }
    }
}
</script>

<template>
    <!-- Ricerca di un appartamento -->
    <div class="d-flex justify-content-center gap-3">
        <div class="searchbar rounded-pill p-2 shadow-sm container m-0">
            <form @submit.prevent class="d-flex justify-content-between align-items-center">
                <input type="search" id="place" class="ms-3 radius" placeholder="Inserisci un indirizzo"
                    v-model="searchAddress">
                <!-- <button @click="searchApartmentsWithAddress(searchAddress)" type="button"
                    class="btn btn-primary rounded-pill p-2">Cerca</button> -->
                <RouterLink class="btn btn-primary rounded-pill p-2"
                    :to="{ name: 'filtered-apartments', query: { address: searchAddress } }">Cerca
                </RouterLink>
            </form>
        </div>

        <!-- Bottone per Filtrare -->
        <button id="filters-button" type="button" class="rounded-pill p-3 shadow-sm d-flex align-items-center gap-2"
            data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="fetchServices">
            <font-awesome-icon icon="fa-solid fa-sort" />Filtri avanzati
        </button>

        <!-- Modale per i filtri -->
        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-xl">
                <div class="modal-content rounded">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Filtri avanzati
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <!-- Range per km -->
                        <div class="mb-3">
                            <label for="km" class="form-label">
                                Distanza / km {{ kmInput }}
                            </label>
                            <div class="range-wrap">
                                <input type="range" class="form-range" id="km" min="1" max="20" step="1"
                                    v-model="kmInput">
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    1 km
                                </div>
                                <div>
                                    20 km
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

                        <!-- Servizi -->
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
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="searchApartmentsWithAddress(searchAddress)">Applica Filtri</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h1 class="mt-5 mb-3">Appartamenti BoolBnb</h1>
    <ApartmentsList v-if="!store.isLoading && apartments" :apartments="filteredApartments" :hasDistance="true" />
</template>

<style scoped lang="scss">
.searchbar {
    border: 0.5px solid gray;

    input {
        width: 95%;
        border: none;
        outline: none;
    }

    button {
        width: 7%;
        font-weight: bold;
    }
}

#filters-button {
    background: white;
    border: 0.5px solid gray;
}
</style>