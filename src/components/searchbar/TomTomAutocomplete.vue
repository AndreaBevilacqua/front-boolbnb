<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '',
            results: []
        };
    },
    methods: {
        search() {
            if (this.searchQuery.length > 3) {
                axios.get('https://api.tomtom.com/search/2/search/' + this.searchQuery + '.json?key=JCA7jDznFGPlGy91V9K6LVAp8heuxKMU&limit=4&language=it-IT')
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
        selectResult(result) {
            // Fai qualcosa con il risultato selezionato, ad esempio puoi inserirlo nell'input o fare altre operazioni
            this.searchQuery = result.address.freeformAddress;
            this.$emit('selectAddress', this.searchQuery)
            this.results = []

        }
    },
    emits: ['selectAddress']

};
</script>

<template>
    <div>
        <label for="search-address">Dove</label>
        <input autocomplete="off" id="search-address" v-model="searchQuery" @input="search"
            placeholder="Cerca indirizzo">
        <ul class="list-group" v-if="results.length">
            <li class="list-group-item" v-for="(result, index) in results" :key="index" @click="selectResult(result)">
                <!-- @click="$emit('selectAddress', result.address.freeformAddress)"> -->
                {{ result.address.freeformAddress }}
            </li>
        </ul>
    </div>
</template>



<style scoped lang="scss">
input {
    display: block;
    width: 100%;
    height: 2.5rem;
    padding-left: 10px;
    margin-bottom: 1rem;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.3);
}

.list-group-item {
    cursor: pointer;
    transition: transform 0.5s;



}

.list-group-item:hover {
    transform: scale(1.1);
}
</style>