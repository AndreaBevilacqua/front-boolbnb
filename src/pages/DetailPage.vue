<script>
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/apartments/';
export default {
    name: 'DetailPage',
    data: () => ({
        apartment: null
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
        <img :src="apartment.image" :alt="apartment.title">
        <span>Proprietario: {{ apartment.user.name }}</span>
        <ul>
            <li>Camere: {{ apartment.rooms }}</li>
            <li>Letti: {{ apartment.beds }}</li>
            <li>Bagni: {{ apartment.bathrooms }}</li>
        </ul>
        <p>{{ apartment.description }}</p>
        <ul>
            <li v-for="service in apartment.services">{{ service.label }}</li>
        </ul>

    </div>

</template>

<style scoped lang="scss"></style>