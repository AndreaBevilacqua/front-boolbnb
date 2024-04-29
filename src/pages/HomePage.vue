<script>
import axios from 'axios';
import ApartmentsList from '../components/apartments/ApartmentsList.vue';
const endpoint = 'http://localhost:8000/api/apartments/';
const endpointAddressSearch = 'http://localhost:8000/api/apartments/search/'
export default {
    name: 'HomePage',
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

            // Se non è stato cercato nessun indirizzo, esegue fetchApartments
            if (!this.searchAddress) {
                this.fetchApartments()

            } else {
                axios.get(endpointAddressSearch, {
                    params: {
                        address: this.searchAddress
                    }
                }).then(res => {
                    this.apartments = res.data;
                })
            }
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
                    <p class="">Alloggi e stanze per ogni tipo di esigenza</p>
                    <form @submit.prevent>
                        <label for="search-address">Dove</label>
                        <input @keyup.enter="searchApartmentsWithAddress" id="search-address" type="address"
                            v-model="searchAddress">
                        <button type="button" @click="searchApartmentsWithAddress">Cerca</button>
                    </form>
                </div>
            </div>
            <img src="../assets/homephoto.jpg" alt="homephoto">
        </section>

        <ApartmentsList :apartments="apartments" />
    </div>

</template>

<style scoped lang="scss">
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
    }



    .card {
        border: none;
        width: 500px;
        height: 300px;
        border-radius: 25px;
        box-shadow: 5px 5px 30px gray;

        position: absolute;
        top: 50%;
        left: 10%;
        transform: translate(-50%, -50%);

        p {
            color: rgba(128, 128, 128, 0.5);
        }

        button {
            display: block;
            width: 100%;
            height: 3rem;
            margin-top: 10px;

            border: none;
            background: linear-gradient(to right, #0E485B, #4BC9E4);
            border-radius: 5px;

            color: white;
            font-weight: 600;
            font-size: 1.3rem;


        }

        form {
            label {
                font-size: 1.1rem;
            }

            input {
                display: block;
                width: 100%;
                height: 2.5rem;
                padding-left: 10px;
                margin-bottom: 1rem;
                border-radius: 5px;
                border: 1px solid rgba(128, 128, 128, 0.3);
            }
        }
    }
}
</style>