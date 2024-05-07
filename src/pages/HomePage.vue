<script>
import axios from 'axios';
import TomTomAutocomplete from '../components/searchbar/TomTomAutocomplete.vue';
import ApartmentsList from '../components/apartments/ApartmentsList.vue';
import { RouterLink } from 'vue-router';
import { store } from '../assets/Data/store';
const endpoint = 'http://localhost:8000/api/apartments/';
export default {
    name: 'HomePage',
    components: { ApartmentsList, TomTomAutocomplete },
    data: () => ({
        apartments: [],
        sponsoredApartments: [],
        searchAddress: '',
        latitude: 0,
        longitude: 0,
        store,


    }),
    methods: {
        fetchApartments() {
            store.isLoading = true
            axios.get(endpoint).then(res => {
                this.apartments = res.data.all
                this.sponsoredApartments = res.data.sponsored
            }).catch(err => {
                console.error(err)
            }).then(() => {
                store.isLoading = false;
            })
        },
        setAddress(address, lat, lon) {
            this.searchAddress = address;
            this.latitude = lat;
            this.longitude = lon;
        }

    },
    created() {
        this.fetchApartments();
    }
}

</script>

<template>
    <div class="container-fluid">
        <section class="jumbotron container mb-5">
            <div class="card p-4">
                <div class="card-body">
                    <h3 class="card-title">Trova alloggi su Boolbnb</h3>
                    <p class="mb-4">Alloggi e stanze per ogni tipo di esigenza</p>
                    <form @submit.prevent>
                        <div style="">
                            <TomTomAutocomplete :hasBorder="true" :fullWidth="true" @selectAddress="setAddress" />
                        </div>
                        <RouterLink class="bnt button"
                            :to="{ name: 'filtered-apartments', query: { address: searchAddress, latitude, longitude, distance: 20, price: 0, rooms: 0, beds: 0, services: JSON.stringify([]) } }">
                            Cerca
                        </RouterLink>
                    </form>
                </div>
            </div>
            <img src="../assets/homephoto.jpg" alt="homephoto">
        </section>

        <section id="sponsor">
            <h1 class="my-3">Appartamenti in evidenza</h1>
            <ApartmentsList v-if="!store.isLoading && apartments" :apartments="sponsoredApartments"
                :isSponsored="true" />
        </section>

    </div>

</template>

<style scoped lang="scss">
.container-fluid {
    padding: 0px;
}

.container {
    padding: 0px;
}

#sponsor {
    margin-top: 150px;
}

.jumbotron {

    position: relative;
    display: flex;
    align-items: center;
    justify-content: end;

    img {
        border-radius: 10px;
        box-shadow: 10px 10px 10px gray;
        width: 90%;
        object-fit: cover;
        display: none;
    }



    .card {
        border: none;
        width: 500px;
        border-radius: 25px;
        box-shadow: 5px 5px 30px gray;

        // position: absolute;
        // top: 50%;
        // left: 10%;
        // transform: translate(-50%, -50%);
        .card-body {
            padding: 0;

        }

        p {
            color: rgba(128, 128, 128, 0.5);
        }

        .button {
            display: block;
            width: 100%;
            height: 3rem;
            margin-top: 10px;
            text-decoration: none;
            text-align: center;
            line-height: 3rem;

            border: none;
            background: linear-gradient(to right, #0E485B, #4BC9E4);
            border-radius: 5px;

            color: white;
            font-weight: 600;
            font-size: 1.3rem;


        }

        // form {
        //     label {
        //         font-size: 1.1rem;
        //     }

        //     //input {
        //     //    display: block;
        //     //    width: 100%;
        //     //    height: 2.5rem;
        //     //    padding-left: 10px;
        //     //    margin-bottom: 1rem;
        //     //    border-radius: 5px;
        //     //    border: 1px solid rgba(128, 128, 128, 0.3);
        //     //}
        // }
    }
}

@media screen and (min-width:768px) {
    .jumbotron {

        img {
            display: block;
        }

        .card {
            position: absolute;
            top: 50%;
            left: 35%;
            transform: translate(-50%, -50%);
        }
    }

}

@media screen and (min-width:992px) {
    .jumbotron {
        .card {
            left: 27%;
        }
    }
}

@media screen and (min-width:1200px) {
    .jumbotron {
        .card {
            left: 20%;
        }
    }
}
</style>