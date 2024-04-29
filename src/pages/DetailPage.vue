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
    <div v-if="apartment">
        <h4>{{ apartment.title }}</h4>
    </div>

</template>

<style scoped lang="scss"></style>