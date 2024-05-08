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
        sponsoredApartments: [],
        unsponsoredApartments: [],
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
        showModal: false,
        distanceError: false,
        priceError: false,
        roomsError: false,
        bedsError: false,
        serviceError: false

    }),
    methods: {
        validateDistance() {
            // Verifica se il valore della distanza è compreso tra 1 e 100
            if (this.kmInput < 1 || this.kmInput > 35 || !/^[a-zA-Z0-9\s]*$/.test(this.bedsInput)) {
                this.distanceError = true; // Flag per mostrare il messaggio di errore
            } else {
                // Se il valore è valido, nascondi il messaggio di errore o esegui un'altra azione necessaria
                this.distanceError = false;
            }
        },
        validatePrice() {
            // Controllo se il campo è vuoto o contiene solo spazi o simboli, se è minore di
            if (this.priceInput === null || /^\s*$/.test(this.priceInput) || !/^[a-zA-Z0-9\s]*$/.test(this.priceInput) || isNaN(this.priceInput) || this.priceInput < 0 || this.priceInput > 9999.99) {
                this.priceError = true;
            } else {
                this.priceError = false;
            }
        },
        validateRooms() {
            console.log(this.roomsInput)
            if (this.roomsInput < 0 || !this.roomsInput || /^\s*$/.test(this.roomsInput) || !/^[a-zA-Z0-9\s]*$/.test(this.roomsInput) || isNaN(this.roomsInput) || this.roomsInput > 50) {
                this.roomsError = true;
            } else {
                this.roomsError = false;
            }
        },

        validateBeds() {
            if (this.bedsInput < 0 || !this.bedsInput || /^\s*$/.test(this.bedsInput) || !/^[a-zA-Z0-9\s]*$/.test(this.bedsInput) || isNaN(this.bedsInput) || this.bedsInput > 50) {
                this.bedsError = true;
            } else {
                this.bedsError = false;
            }
        },
        validateServices() {
            // Verifica che tutti i servizi selezionati siano presenti nell'array `services`
            this.serviceError = this.checkedServices.some(serviceId => !this.services.find(service => service.id === serviceId));
        },
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
                this.sponsoredApartments = res.data.sponsored;
                this.unsponsoredApartments = res.data.unsponsored;
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
    <div class="container-fluid p-4">

        <!-- Ricerca di un appartamento -->


        <form @submit.prevent class=" container-fluid m-0 px-0 row row-gap-3 mb-3">
            <TomTomAutocomplete :isCol="true" :hasPadding="true" :fullWidth="true" :rounded="true" id="place"
                :hasBorder="true" @selectAddress="setAddress" @deleteAddress="deleteAddress" />
            <RouterLink
                class=" py-4 col-12 col-md-6 btn btn-primary d-flex align-items-center justify-content-center px-4 "
                :to="{ name: 'filtered-apartments', query: { address: searchAddress, latitude, longitude, distance: kmInput, price: priceInput, rooms: roomsInput, beds: bedsInput, services: JSON.stringify(checkedServices) } }">
                {{ searchAddress ? 'Cerca: ' + searchAddress : 'Cerca su tutto il territorio' }}
            </RouterLink>
        </form>

        <!-- Bottone per Filtrare -->
        <button id="filters-button" type="button" class="rounded-pill p-3 shadow-sm d-flex align-items-center gap-2"
            @click="showModal = true">
            <font-awesome-icon icon="fa-solid fa-sort" />Filtri avanzati
        </button>
        <div class="d-flex justify-content-center gap-3">

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
                                    <input type="range" class="form-range" id="km" min="1" max="35" step="1"
                                        v-model="kmInput" @input="validateDistance">
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        1 km
                                    </div>
                                    <div>
                                        35 km
                                    </div>
                                </div>
                                <p v-if="distanceError" class="text-danger">La distanza deve essere un numero, compreso
                                    tra
                                    1 e 35 km.
                                </p>
                            </div>

                            <!-- Prezzo -->
                            <div class="mb-3">
                                <label for="price" class="form-label">Prezzo per notte</label>
                                <div class="input-group">
                                    <span class="input-group-text">&euro;</span>
                                    <input type="number" class="form-control" id="price" aria-label="0.00" step="10"
                                        min="10" max="9999.99" v-model="priceInput" @blur="validatePrice">
                                </div>
                                <!-- Messaggio di errore per il prezzo -->
                                <p v-if="priceError || (parseFloat(priceInput) >= 1 && parseFloat(priceInput) <= 9 || !this.priceInput)"
                                    class="text-danger">
                                    Il prezzo deve essere un numero valido, compreso tra 10 e 9999.99.
                                </p>
                            </div>

                            <div class="row">
                                <!-- Numero di stanze -->
                                <div class="col-6">
                                    <label for="rooms" class="form-label">Numero di stanze</label>
                                    <select name="rooms" id="rooms" class="form-select" v-model="roomsInput"
                                        @change="validateRooms">
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
                                    <p v-if="roomsError" class="text-danger">Le stanze devono essere un numero valido,
                                        compreso tra 1 e 50</p>
                                </div>
                                <!-- Numero posti letto -->
                                <div class="col-6">
                                    <label for="beds" class="form-label">Numero di letti</label>
                                    <select name="beds" id="beds" class="form-select" v-model="bedsInput"
                                        @change="validateBeds">
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
                                    <p v-if="bedsError" class="text-danger">Il numero di letti deve essere un numero
                                        valido,
                                        compreso tra 1 e 50</p>
                                </div>


                            </div>
                            <div class="mt-3 mb-2 fs-4">
                                <strong>Servizi</strong>
                            </div>
                            <div class="row row-cols-1">
                                <div class="form-check p-0">
                                    <div class="mb-1" v-for="service in services" :key="service.id">
                                        <input class="form-check-input ms-2" type="checkbox"
                                            :id="`service-${service.id}`" v-model="checkedServices" :value="service.id"
                                            @change="validateServices">
                                        <label class="form-check-label ms-2" :for="`service-${service.id}`">
                                            {{ service.label }}
                                        </label>
                                    </div>
                                </div>
                                <!-- Messaggio di errore -->
                                <p v-if="serviceError" class="text-danger">Il servizio selezionato non esiste o non è
                                    presente
                                    nel nostro sistema
                                </p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="resetFilters()">Rimuovi
                                filtri</button>

                            <!-- Bottono Applica filtri -->
                            <div v-if="!distanceError && !priceError && !roomsError && !bedsError && !serviceError">
                                <RouterLink @click="showModal = false" class="btn btn-primary"
                                    :to="{ name: 'filtered-apartments', query: { address: searchAddress, latitude, longitude, distance: kmInput, price: priceInput, rooms: roomsInput, beds: bedsInput, services: JSON.stringify(checkedServices) } }">
                                    Applica filtri
                                </RouterLink>
                            </div>
                            <div v-else>
                                <button class="btn btn-primary" disabled>Applica filtri</button>
                            </div>



                        </div>
                    </div>
                </div>


            </div>
        </div>

        <!-- ---------------------- CHIUSURA MODALE ---------------------- -->
        <section v-if="sponsoredApartments.length">
            <h1 class="mt-5 mb-3">Appartamenti in evidenza</h1>
            <ApartmentsList v-if="!store.isLoading && sponsoredApartments" :apartments="sponsoredApartments"
                :isSponsored="true" />
        </section>
        <h1 class="mt-5 mb-3">Appartamenti BoolBnb </h1>
        <ApartmentsList v-if="!store.isLoading && unsponsoredApartments" :apartments="unsponsoredApartments"
            :isSponsored="false" />
    </div>
</template>

<style scoped lang="scss">
.searchbar {
    border: 0.5px solid gray;

    input {
        width: 100%;
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