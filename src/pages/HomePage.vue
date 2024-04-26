<script>
import axios from 'axios';
import ApartmentsList from '../components/apartments/ApartmentsList.vue';
const endpoint = 'http://localhost:8000/api/apartments/';
export default {
    name: 'HomePage',
    components: { ApartmentsList },
    data: () => ({
        apartments: []
    }),
    methods: {
        fetchApartments() {
            axios.get(endpoint).then(res => {
                this.apartments = res.data
            })
        }
    },
    created() {
        this.fetchApartments();
    }
}

</script>

<template>
    <div class="container">
        <section class="jumbotron">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Trova alloggi su Boolbnb</h5>
                    <p>Alloggi e stanze per ogni tipo di esigenza</p>
                    <form submit.prevent>
                        <label for="search-address">Dove</label>
                        <input id="search-address" type="address">
                        <button>Cerca</button>
                    </form>
                </div>
            </div>
            <img src="../assets/homephoto.png" alt="homephoto">
        </section>

        <ApartmentsList :apartments="apartments" />
    </div>

</template>

<style scoped lang="scss">
.jumbotron {
    margin-top: 40px;
    max-width: 1200px;

    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        border-radius: 10px;
        box-shadow: 10px 10px 10px gray;
    }



    .card {
        z-index: 2;
        border: none;
        width: 333px;
        border-radius: 10px;
        box-shadow: 5px 5px 30px gray;

        p {
            color: rgba(128, 128, 128, 0.5);
        }

        button {
            display: block;
            width: 300px;
            height: 35px;
            margin-top: 10px;

            border: none;
            background: linear-gradient(to right, #0E485B, #4BC9E4);
            border-radius: 5px;

            color: white;
            font-weight: 600;


        }

        form {
            label {
                font-size: 0.9rem;
            }

            input {
                display: block;
                width: 300px;
                border-radius: 5px;
                border: 1px solid rgba(128, 128, 128, 0.3);
            }
        }
    }
}
</style>