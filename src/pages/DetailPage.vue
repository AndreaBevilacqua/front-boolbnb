<script>
import axios from 'axios';
import AppLoader from '../components/AppLoader.vue';
import Carousel from '../components/apartments/ApartmentCarousel.vue';

const endpoint = 'http://localhost:8000/api/apartments/';
const messageEndpoint = 'http://localhost:8000/api/contact-message/';

// Endpoint per le visualizzazioni
const viewsEndpoint = 'http://localhost:8000/api/apartments/views/';

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
            },
            formErrors: {},
            isLoading: false,
            showModal: false
        };
    },
    components: { Carousel },
    methods: {
        async getApartment() {
            try {
                const res = await axios.get(endpoint + this.$route.params.slug);
                this.apartment = res.data;
                this.loadCarouselImages();
                this.sendView();
            } catch (err) {
                console.error(err);
                this.$router.push({ name: 'not-found' });
            }
        },

        async initializeMap() {
            // Inizializza la mappa con le coordinate dell'appartamento
            var map = tt.map({
                key: 'AWAhF6IT1ChO0k28GMmsIysmnTgt0Gpp',
                container: 'map-container', // Utilizza l'ID del container della mappa
                center: [this.apartment.longitude, this.apartment.latitude], // Utilizza le coordinate dell'appartamento
                zoom: 15 // Livello di zoom della mappa
            });

            // Aggiungi un marker per le coordinate dell'appartamento
            var marker = new tt.Marker()
                .setLngLat([this.apartment.longitude, this.apartment.latitude])
                .addTo(map);
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
            if (this.validateForm()) {
                // Imposta isLoading su true solo prima di inviare effettivamente il messaggio
                this.isLoading = true;

                axios.post(`${messageEndpoint}${this.apartment.id}`, this.formData)
                    .then(response => {
                        // Gestisci la risposta del server
                        this.showAlert('Messaggio inviato con successo!', 'success');
                        setTimeout(() => {
                            this.closeAlert();
                        }, 5000);
                        this.formData = {};
                    })
                    .catch(error => {
                        // Gestisci gli errori di invio del messaggio
                        this.showAlert('Errore durante l\'invio del messaggio. Si prega di riprovare.', 'danger');
                        setTimeout(() => {
                            this.closeAlert();
                        }, 5000);


                    }).then(() => {
                        this.isLoading = false;
                    });
            }
        },
        validateForm() {
            this.formErrors = {};

            const namePattern = /^[A-Za-z\s]+$/; // Regex per accettare solo lettere e spazi
            if (!this.formData.name.trim()) {
                this.formErrors.name = 'Il nome è obbligatorio.';
            } else if (!namePattern.test(this.formData.name)) {
                this.formErrors.name = 'Il nome non può contenere simboli.';
            }

            if (!this.formData.last_name.trim()) {
                this.formErrors.last_name = 'Il cognome è obbligatorio.';
            } else if (!namePattern.test(this.formData.last_name)) {
                this.formErrors.last_name = 'Il cognome non può contenere simboli.';
            }

            if (!this.formData.email.trim()) {
                this.formErrors.email = 'L\'email è obbligatoria.';
            } else if (!this.isValidEmail(this.formData.email)) {
                this.formErrors.email = 'Inserire un\'email valida.';
            }

            if (!this.formData.subject.trim()) {
                this.formErrors.subject = 'L\'oggetto è obbligatorio.';
            }

            if (!this.formData.text.trim()) {
                this.formErrors.text = 'Il messaggio è obbligatorio.';
            }

            return Object.keys(this.formErrors).length === 0;
        },
        isValidEmail(email) {
            // Esempio semplice per la validazione dell'email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
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
        },
        async sendView() {
            try {
                const res = await axios.post(viewsEndpoint, {
                    apartment_id: this.apartment.id
                });
            } catch (error) {
                console.error('Errore durante il recupero dell\'indirizzo IP:', error);
            }
        }
    },
    mounted() {
        this.getApartment().then(() => {
            if (this.apartment) {
                this.$nextTick(() => {
                    this.initializeMap();
                });
            }
        });
    }
}
</script>

<template>
    <div class="container-fluid py-2" v-if="apartment">
        <h1 class="mb-3">{{ apartment.title }}</h1>
        <span> <i class="fa-solid fa-location-dot me-2"></i>{{ apartment.address }}.</span>
        <!--Carousel-->
        <div class="image">
            <div class="row align-items-center">
                <!-- prev button -->
                <div class="col-auto">
                    <i class="fas fa-chevron-left fa-xl" @click="goToPrev" style="color: #0E485B;"></i>
                </div>
                <div class="col">

                    <div class="row">
                        <div class="col-12">
                            <figure v-for="(image, i) in carouselImages" v-show="currentIndex === i">
                                <img class="primary-img" :src="image" :alt="apartment.title">
                            </figure>
                        </div>

                    </div>
                </div>
                <!-- next button -->
                <div class="col-auto">
                    <i class="fas fa-chevron-right fa-xl" @click="goToNext" style="color: #0E485B;"></i>
                </div>
                <!-- thumbnails -->
                <div class="d-none" id="thumbnails">
                    <img @click="currentIndex = i" v-for="(image, i) in carouselImages" :src="image"
                        :alt="apartment.title" :class="{ active: i === currentIndex }">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-8">

                <h1 class="mb-0">Host: {{ apartment.user.name }}</h1>
                <button @click="showModal = true" class="btn btn-sm btn-dark my-3">
                    <i class="fa-solid fa-envelope"></i> Contatta</button>
                <ul class="apartment-info">
                    <li>Camere: {{ apartment.rooms }} -</li>
                    <li>Letti: {{ apartment.beds }} -</li>
                    <li>Bagni: {{ apartment.bathrooms }} </li>
                </ul>
                <div class="divider"></div>
                <div class="d-flex">
                    <div>
                        <i class="fa-solid fa-suitcase fa-xl"></i>
                    </div>
                    <div class="px-3">
                        <h5>Servizio di custodia bagagli</h5>
                        <p>
                            Opzione per gli ospiti di depositare i bagagli in modo sicuro prima del check-in o dopo
                            il
                            check-out, per massimizzare la comodità durante il viaggio.
                        </p>
                    </div>
                </div>
                <div class="d-flex">
                    <div>
                        <i class="fa-solid fa-shield fa-xl"></i>
                    </div>
                    <div class="px-3">
                        <h5>Alloggio e sicurezza</h5>
                        <p>
                            Telecamere di sorveglianza esterne presenti nella proprietà -
                            Allarme antincendio installato -
                            Rilevatore di monossido di carbonio installato
                        </p>
                    </div>
                </div>
                <div class="d-flex">
                    <div>
                        <i class="fa-solid fa-clock fa-xl"></i>
                    </div>
                    <div class="px-3">
                        <h5>Ottima esperienza di check-in</h5>
                        <p>
                            Check-in dopo le ore 15:00 - Check-out entro le ore 10:00
                        </p>
                    </div>
                </div>

                <div class="divider mt-4"></div>

                <div class="description">
                    <h4>Descrizione</h4>
                    <p>{{ apartment.description }}</p>
                </div>
                <div class="divider"></div>
                <h4>Info Utili</h4>
                <p>
                    Se sei tra le persone selezionate e deciderai di prenotare, avrai 24 ore di tempo per farlo. Le
                    spese di
                    viaggio non sono incluse. Consulta le Regole ufficiali, che includono i requisiti relativi a età
                    e
                    provenienza geografica, le modalità di utilizzo dei dati, le probabilità di superare la
                    selezione e
                    altri termini.
                </p>
                <div class="divider"></div>
                <div class="services">
                    <ul class="apartment-services">
                        <h4 class="mb-4">Servizi disponibili</h4>
                        <li v-for="service in apartment.services" class="mb-3">
                            <span class="services-icon"> <i :class="service.icon"></i></span>
                            <span> {{ service.label }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Modale per i messaggi -->
            <div class="modal fade show" v-if="showModal" id="messages-modal">
                <div class="row modal-dialog">
                    <div class="col-12 col-md-6 col-lg-4 modal-content rounded">

                        <!-- Header Modale -->
                        <div class="modal-header">
                            <h4 class="modal-title text-center">Vuoi saperne di piú?</h4>

                            <!-- Bottone per chiudere la modale -->
                            <button type="button" class="btn-close" @click="showModal = false"></button>
                        </div>

                        <!-- Body modale -->
                        <div class="modal-body">

                            <form @submit.prevent="sendMessage">
                                <!-- Nome -->
                                <label for="name" class="mb-2">Nome</label>
                                <input v-model="formData.name" type="text" placeholder="Mario" class="mb-3" required>
                                <div v-if="formErrors.name" class="error"><small>{{ formErrors.name }}</small></div>

                                <!-- Cognome -->
                                <label for="last_name" class="mb-2">Cognome</label>
                                <input v-model="formData.last_name" type="text" placeholder="Rossi" class="mb-3"
                                    required>
                                <div v-if="formErrors.last_name" class="error"><small>{{ formErrors.last_name
                                        }}</small>
                                </div>

                                <!-- Email -->
                                <label for="email" class="mb-2">E-mail</label>
                                <input v-model="formData.email" type="email" placeholder="mariorossi@example.com"
                                    class="mb-3" required>
                                <div v-if="formErrors.email" class="error"><small>{{ formErrors.email }}</small>
                                </div>

                                <!-- Oggetto -->
                                <label for="subject" class="mb-2">Oggetto</label>
                                <input v-model="formData.subject" class="object mb-3" type="text" required>
                                <div v-if="formErrors.subject" class="error"><small>{{ formErrors.subject }}</small>
                                </div>

                                <!-- Testo messaggio -->
                                <label for="message" class="mb-2">Messaggio</label>
                                <textarea v-model="formData.text" class="message mb-3" cols="30" rows="10"
                                    required></textarea>
                                <!-- <input v-model="formData.text" class="message mb-3" type="text" required> -->
                                <div v-if="formErrors.text" class="error"><small>{{ formErrors.text }}</small></div>

                                <!-- Bottone invio -->
                                <div class="modal-footer">
                                    <button id="message-btn" type="submit" class="btn btn-sm btn-dark">Contatta
                                        l'Host</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Uso un Loader in locale altrimenti si posiziona sotto la modale dei messaggi -->
                <AppLoader v-if="isLoading" />
            </div>
            <!-- Fine modale -->

        </div>
        <div class="divider my-5"></div>
        <h3 class="mb-4">Dove sarai</h3>
        <div id="map-container" class="map-container rounded-4">
            <div id="map" class="map"></div>
        </div>

    </div>

</template>

<style scoped lang="scss">
i {
    color: #4BC9E4;
    cursor: pointer;
}

.services-icon {
    padding-right: 1rem;
    font-size: 1.5rem;
}

.error {
    color: red;
}

.primary-img {
    border-radius: 10px;
    height: 150px;
    width: 100%;
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


#thumbnails {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    cursor: pointer;
    height: 200px;

    img {
        height: 30px;
    }

}

/* info Appartamento  */

.row {
    margin-top: 20px;
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
        width: 30px;
    }
}

.description {
    margin-bottom: 20px;
}

/** card messaggistica */

.modal {


    .modal-title {
        color: #4BC9E4;
    }


    p {
        color: rgba(128, 128, 128, 0.5);
    }

    button#message-btn {
        display: block;
        width: 100%;
        height: 2.5rem;
        margin-top: 10px;

        border: none;
        background: linear-gradient(to right, #0E485B, #4BC9E4);
        border-radius: 5px;

        color: white;
        font-weight: 600;

        & {
            transition: transform 0.5s ease;
        }

        &:hover {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
    }

    form {
        label {
            font-size: 1.1rem;
        }

        input,
        textarea {
            display: block;
            width: 100%;
            height: 2rem;
            padding-left: 10px;
            /* margin-bottom: 1rem; */
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
    max-width: 100%;
}

.map {
    height: 500px;
    width: 100%;
    background-color: beige;
    margin-bottom: 15px;
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

// Modale Messaggi
#messages-modal {
    display: block;
    background-color: rgba($color: #000000, $alpha: .5);
}
</style>