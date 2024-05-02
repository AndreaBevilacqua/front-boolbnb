<script>
import axios from 'axios';
import ApartmentsList from '../components/apartments/ApartmentsList.vue';
const endpoint = 'http://localhost:8000/api/apartments/';
const endpointAddressSearch = 'http://localhost:8000/api/apartments/search';
const endpointServices = 'http://localhost:8000/api/apartments/services';


export default {
    name: 'FilteredApartmentPage',
    components: { ApartmentsList },
    data: () => ({
        apartments: [],
        services: [],
        isChecked: [],
        searchAddress: '',
        isLoading: false,
        priceInput: 0,
        bedsInput: 0,
        roomsInput: 0,
        kmInput: 20
    }),
    props: {
        address: String,
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
        },

        // Funzione per ottenere i servizi
        fetchServices() {
            axios.get(endpointServices).then(res => {
                this.services = res.data
            })
        },

        // Funzione per applicare i filtri
        applyFilters() {
            // Costruisci l'oggetto dei parametri di filtro
            const filters = {
                price: this.priceInput,
                beds: this.bedsInput,
                rooms: this.roomsInput,
                km: this.kmInput,
                services: this.isChecked
            };

            // Effettua una richiesta GET al tuo endpoint di filtro con i parametri
            axios.get(endpointAddressSearch, {
                params: filters
            })
                .then(res => {
                    // Aggiorna la lista degli appartamenti con i risultati filtrati
                    this.apartments = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },

        // Funzione per resettare i filtri
        resetFilters() {
            this.priceInput = 0;
            this.bedsInput = 0;
            this.roomsInput = 0;
            this.kmInput = 20;
            this.isChecked = [];
        }
    },
    created() {
        this.searchApartmentsWithAddress(this.address);
        this.fetchServices();
    }
}
</script>

<template>
    <!-- Ricerca di un appartamento -->
    <div class="d-flex justify-content-center gap-3">
        <div class="searchbar rounded-pill p-2 shadow-sm container m-0">
            <form @submit.prevent class="d-flex justify-content-between align-items-center">
                <input @keyup.enter="searchApartmentsWithAddress(searchAddress)" type="search" id="place"
                    class="ms-3 radius" placeholder="Inserisci un indirizzo" v-model="searchAddress">
                <button @click="searchApartmentsWithAddress(searchAddress)" type="button"
                    class="btn btn-primary rounded-pill p-2">Cerca</button>
            </form>
        </div>

        <!-- Bottone per Filtrare -->
        <button id="filters-button" type="button" class="rounded-pill p-3 shadow-sm d-flex align-items-center gap-2"
            data-bs-toggle="modal" data-bs-target="#exampleModal2">
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
                                Distanza / km
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
                                    min="10" max="9999.99" v-model="priceInput">
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
                                    <option value="3">4</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <!-- Numero posti letto -->
                            <div class="col-6">
                                <label for="beds" class="form-label">Numero di letti</label>
                                <select name="beds" id="beds" class="form-select" v-model="bedsInput">
                                    <option selected value="0">Scegli...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">4</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>

                        <!-- Servizi -->
                        <div class="mt-3 mb-2 fs-4">
                            <strong>Servizi</strong>
                        </div>
                        <div class="row row-cols-1">
                            <div class="form-check p-0">
                                <div class="mb-1" v-for="service in services">
                                    <input class="form-check-input ms-2" type="checkbox" id="service"
                                        v-model="isChecked">
                                    <label class="form-check-label ms-2" for="service">
                                        {{ service.label }}
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="resetFilters()">Rimuovi filtri</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="applyFilters()">Applica Filtri</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AppLoader v-if="isLoading" />
    <ApartmentsList :apartments="apartments" />
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