<script>
import axios, { isCancel } from 'axios';
const endpoint = 'http://localhost:8000/api/apartments/';
export default {
    name: 'DetailPage',
    data: () => ({
        apartment: null,
        carouselImages: [],
        currentIndex: 0,
    }),
    methods: {
        async getApartment() {
            try {
                const res = await axios.get(endpoint + this.$route.params.slug)
                this.apartment = res.data
            } catch (err) {
                console.error(err)
                this.$router.push({ name: 'not-fount' })
            }

            this.carouselImages.push(this.apartment.image)
            for (let image of this.apartment.images) {
                this.carouselImages.push(image.path)
            }

        },

    },
    created() {
        this.getApartment();
    }
}
</script>

<template>
    <div class="container" v-if="apartment">
        <h4>{{ apartment.title }}</h4>
        <span>{{ apartment.address }}.</span>
        <!-- galleria -->
        <div class="gallery">

            <!-- prev button -->
            <i class="fas fa-arrow-left" @click="currentIndex--"></i>

            <!-- immagine principale-->
            <figure v-for="(image, i) in   carouselImages  " v-show="currentIndex === i">
                <img class="primary-img" :src="image" :alt="apartment.title">
            </figure>

            <!-- next button -->
            <i class="fas fa-arrow-right" @click="currentIndex++"></i>

        </div>
        <!-- thumbnails -->
        <div id="thumbnails">
            <img v-for="(  image, i  ) in   carouselImages  " :src="image" :alt="apartment.title">
        </div>
        <div class="row">
            <div class="col-8">

                <span class="name-user">Proprietario: {{ apartment.user.name }}</span>
                <ul class="apartment-info">
                    <li>Camere: {{ apartment.rooms }}</li>
                    <li>Letti: {{ apartment.beds }}</li>
                    <li>Bagni: {{ apartment.bathrooms }}</li>
                </ul>
                <div class="divider"></div>
                <div class="description">
                    <h5>Descrizione</h5>
                    <p>{{ apartment.description }}</p>
                </div>
                <div class="divider"></div>
                <div class="services">

                    <ul class="apartment-services">
                        <h5>Servizi</h5>
                        <li v-for="  service   in   apartment.services  ">
                            <img :src="service.icon" :alt="service.label">
                            {{ service.label }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-4">
                <div class="card p-4">
                    <div class="card-body">
                        <h3 class="card-title">Contatta il Proprietario</h3>
                        <p class="">Invia una mail senza doverti iscrivere!</p>
                        <form @submit.prevent>
                            <label for="text">Nome</label>
                            <input type="text" placeholder="Mario">

                            <label for="text">Cognome</label>
                            <input type="text" placeholder="Rossi">

                            <label for="email">E-mail</label>
                            <input type="email" placeholder="mariorossi@example.com">

                            <label for="text">Ogetto</label>
                            <input class="object" type="text">

                            <label for="text">Messaggio</label>
                            <input class="message" type="text">
                            <button type="button">Invia</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
h4 {
    font-size: 2.5rem;
    font-weight: bold;

}

.primary-img {
    border-radius: 10px;
    width: 1200px;

    margin-bottom: 20px;
}

/* Carosello */
.active {}

.gallery {
    display: flex;
    align-items: center;

}

.fas {
    font-size: 2rem
}

.fa-arrow-left {
    padding-right: 20px;
    cursor: pointer;

}

.fa-arrow-right {
    padding-left: 20px;
    cursor: pointer;
}

#thumbnails {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    img {
        border-radius: 10px;
        height: 130px;
    }
}

.row {
    margin-top: 20px;
}

.name-user {
    font-size: 1.5rem;
    font-weight: bold;
}

.apartment-info {
    display: flex;
    gap: 10px;
    padding: 0;
    margin-bottom: 20px;

    li {
        list-style-type: none;

    }
}

.apartment-services {
    padding: 0;

    li {
        list-style-type: none;
        margin-bottom: 5px;
    }

    img {
        height: 25px;
        width: 30px;
    }
}

.description {
    margin-bottom: 20px;
}

.card {
    border: none;
    width: 500px;

    border-radius: 25px;
    box-shadow: 5px 5px 30px gray;


    p {
        color: rgba(128, 128, 128, 0.5);
    }

    button {
        display: block;
        width: 100%;
        height: 2.5rem;
        margin-top: 10px;

        border: none;
        background: linear-gradient(to right, #0E485B, #4BC9E4);
        border-radius: 5px;

        color: white;
        font-weight: 600;


    }

    form {
        label {
            font-size: 1.1rem;
        }

        input {
            display: block;
            width: 100%;
            height: 2rem;
            padding-left: 10px;
            margin-bottom: 1rem;
            border-radius: 5px;
            border: 1px solid rgba(128, 128, 128, 0.3);
        }

        .object {
            height: 60px;
        }

        .message {
            height: 100px;
        }
    }
}

.divider {
    height: 2px;
    background-color: rgb(109, 109, 109, 0.2);
    margin-bottom: 20px;
    max-width: 400px;
}
</style>