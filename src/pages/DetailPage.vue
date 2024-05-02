<script>
import axios from 'axios';

const endpoint = 'http://localhost:8000/api/apartments/';
const messageEndpoint = 'http://localhost:8000/api/contact-message/';

export default {
    name: 'DetailPage',
    data() {
        return {
            apartment: null,
            carouselImages: [],
            currentIndex: 0,
            formData: {
                name: '',
                last_name: '',
                email: '',
                subject: '',
                text: ''
            }
        };
    },
    methods: {
        async getApartment() {
            try {
                const res = await axios.get(endpoint + this.$route.params.slug);
                this.apartment = res.data;
                this.loadCarouselImages();
            } catch (err) {
                console.error(err);
                this.$router.push({ name: 'not-found' });
            }
        },
        loadCarouselImages() {
            this.carouselImages.push(this.apartment.image);
            for (let image of this.apartment.images) {
                this.carouselImages.push(image.path);
            }
        },
        goToNext() {
            const lastElementIndex = this.carouselImages.length - 1;
            if (this.currentIndex === lastElementIndex) this.currentIndex = 0;
            else this.currentIndex++;
        },
        goToPrev() {
            const lastElementIndex = this.carouselImages.length - 1;
            if (this.currentIndex === 0) this.currentIndex = lastElementIndex;
            else this.currentIndex--;
        },
        sendMessage() {
            axios.post(`${messageEndpoint}${this.apartment.id}`, this.formData)
                .then(response => {
                    this.showAlert('Messaggio inviato con successo!', 'success');
                    setTimeout(() => {
                        this.closeAlert();
                    }, 5000);
                    this.formData = {};
                })
                .catch(error => {
                    this.showAlert('Errore durante l\'invio del messaggio. Si prega di riprovare.', 'danger');
                    setTimeout(() => {
                        this.closeAlert();
                    }, 5000);
                });
        },
        showAlert(message, type) {
            const alert = document.createElement('div');
            alert.classList.add('alert', `alert-${type}`, 'mt-3', 'd-flex', 'justify-content-between', 'align-items-center');
            alert.setAttribute('role', 'alert');
            alert.innerHTML = `
                <span>${message}</span>
                <button type="button" class="btn-close" @click="closeAlert"></button>`;

            const form = document.querySelector('form');
            form.parentNode.insertBefore(alert, form.nextSibling);
        },
        closeAlert() {
            const alert = document.querySelector('.alert');
            if (alert) {
                alert.remove();
            }
        }
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
        <!-- carosello  -->
        <div class="carousel">

            <!-- prev button -->
            <i class="fas fa-arrow-left" @click="goToPrev"></i>

            <div class="gallery">
                <!-- immagine principale-->
                <figure v-for="(image, i) in   carouselImages" v-show="currentIndex === i">
                    <img class="primary-img" :src="image" :alt="apartment.title">
                </figure>
            </div>

            <!-- next button -->
            <i class="fas fa-arrow-right" @click="goToNext"></i>

        </div>
        <!-- thumbnails -->
        <div id="thumbnails">
            <img @click="currentIndex = i" v-for="(image, i) in   carouselImages" :src="image" :alt="apartment.title"
                :class="{ active: i === currentIndex }">
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
                        <form @submit.prevent="sendMessage">
                            <label for="name">Nome</label>
                            <input v-model="formData.name" type="text" placeholder="Mario">

                            <label for="last_name">Cognome</label>
                            <input v-model="formData.last_name" type="text" placeholder="Rossi">

                            <label for="email">E-mail</label>
                            <input v-model="formData.email" type="email" placeholder="mariorossi@example.com">

                            <label for="subject">Oggetto</label>
                            <input v-model="formData.subject" class="object" type="text">

                            <label for="message">Messaggio</label>
                            <input v-model="formData.text" class="message" type="text">
                            <button type="submit">Invia</button>
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
    height: 700px;


    margin: 30px;
}

/* Carosello */
.active {
    animation-name: active;
    animation-duration: 0.5s;
    box-shadow: 5px 5px 30px #2b8599;


}

.carousel {
    display: flex;
    justify-content: center;
    align-items: center;

}

.fas {
    font-size: 2rem
}



.fa-arrow-left {
    cursor: pointer;

}

.fa-arrow-right {
    cursor: pointer;
}

#thumbnails {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    cursor: pointer;
    height: 200px;

}

img {
    border-radius: 10px;
    height: 130px;
}

/* info Appartamento  */

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

/** card messaggistica */

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

@keyframes active {
    0% {
        height: 130px;

    }

    50% {
        height: 131px;
    }

    100% {
        height: 130px;
    }
}
</style>