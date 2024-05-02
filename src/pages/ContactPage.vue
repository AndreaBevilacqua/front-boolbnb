<script>
import axios from 'axios';
const defaultEndpoint = 'http://localhost:8000/api/contact-message/';
export default {
    name: 'contant-page',
    data: () => ({
        form: {
            sender: '',
            subject: '',
            content: ''
        }
    }),
    methods: {
        sendForm() {
            axios.post(defaultEndpoint, this.form)
                .then()
                .catch(err => {
                    console.error(err);
                })
                .then()
        }
    }
}
</script>

<template>
    <h2>Contattaci</h2>
    <form class="row g-3 needs-validation" @submit.prevent="sendForm" novalidate>
        <div class="col-12">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="form.sender" required>
            <div class="valid-feedback">
                Looks good!
            </div>
        </div>
        <div class="col-12">
            <label for="subject" class="form-label">Oggetto</label>
            <input type="text" class="form-control" id="subject" v-model="form.subject" required>
            <div class="valid-feedback">
                Looks good!
            </div>
        </div>
        <div class="col-12">
            <label for="content" class="form-label">Contenuto</label>
            <div class="input-group has-validation">
                <textarea class="form-control" id="content" v-model="form.content" required rows="5"></textarea>
                <div class="invalid-feedback">
                    Please choose a username.
                </div>
            </div>
        </div>

        <div class="col-12">
            <button class="btn btn-primary" type="submit">Invia</button>
        </div>
    </form>
</template>
