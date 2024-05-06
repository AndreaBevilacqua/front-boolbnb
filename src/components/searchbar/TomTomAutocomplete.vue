<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '',
            results: [],
            lat: 0,
            lon: 0,
            result: {},
        };
    },
    props: {
        hasBorder: Boolean,
        rounded: Boolean,
        fullWidth: Boolean
    },
    computed: {
        showTips() {
            return this.results.length > 0
        }
    },
    methods: {
        search() {
            if (this.searchQuery.length > 3) {
                axios.get('https://api.tomtom.com/search/2/search/' + this.searchQuery + '.json?key=JCA7jDznFGPlGy91V9K6LVAp8heuxKMU&limit=4&language=it-IT&countrySet=IT')
                    .then(response => {
                        this.results = response.data.results;
                    })
                    .catch(error => {
                        console.error('Error fetching TomTom results:', error);
                    });
            } else {
                this.results = [];
            }
        },
        searchCoordinates() {
            axios.get('https://api.tomtom.com/search/2/search/' + this.searchQuery + '.json?key=JCA7jDznFGPlGy91V9K6LVAp8heuxKMU&limit=4&language=it-IT&countrySet=IT')
                .then(response => {
                    this.lat = response.data.results[0].position.lat;
                    this.lon = response.data.results[0].position.lon;
                    this.$emit('selectAddress', this.searchQuery, this.lat, this.lon)
                })
                .catch(error => {
                    console.error('Error fetching TomTom results:', error);
                });
        },
        selectResult(result) {
            // Fai qualcosa con il risultato selezionato, ad esempio puoi inserirlo nell'input o fare altre operazioni
            this.searchQuery = result.address.freeformAddress;
            this.searchCoordinates();
            this.$emit('selectAddress', this.searchQuery, this.lat, this.lon)
            this.results = []
        },
        deleteAddress() {
            this.searchQuery = '';
            this.results = [];
            this.lat = null
            this.lon = null
            this.$emit('deleteAddress');
        }
    },
    emits: ['selectAddress', 'deleteAddress']

};
</script>

<template>
    <div style="position: relative;" class="h-100 flex-grow-1 ">
        <small id="tips" v-if="showTips" class="d-block">Seleziona uno dei suggerimenti <span
                class="text-danger">*</span></small>
        <input autocomplete="off" id="search-address" v-model.trim="searchQuery" @input="search"
            @click.left="deleteAddress" placeholder="Scrivi indirizzo" class="w-100 h-100 "
            :class="{ 'border-0': !hasBorder, 'rounded-start-pill': rounded }">
        <ul id="advertisement-list" class="list-group" v-if="results.length">
            <li class="list-group-item" v-for="(result, index) in results" :key="index" @click="selectResult(result)">
                <!-- @click="$emit('selectAddress', result.address.freeformAddress)"> -->
                {{ result.address.freeformAddress }}
            </li>
        </ul>
    </div>
</template>



<style scoped lang="scss">
#tips {
    position: absolute;
    bottom: 100%;
    left: 0;
}


input {
    display: block;
    width: 100%;
    // height: 2.5rem;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.3);
    background-color: transparent;
}

#advertisement-list {
    position: absolute;
    top: 100%;
    left: 0;
}

.list-group-item {
    cursor: pointer;
    transition: transform 0.5s;



}

.list-group-item:hover {
    transform: scale(1.1);
}
</style>