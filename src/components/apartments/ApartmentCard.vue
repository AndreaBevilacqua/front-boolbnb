<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'ApartmentCard',
    props: {
        apartment: Object,
        hasDistance: Boolean
    },
    methods: {
        formattedDistance() {
            if (this.apartment.distance < 1) {
                let distance = Math.floor(this.apartment.distance * 1000);
                return `${distance} m`
            } else {
                let distance = this.apartment.distance.toFixed(2);
                return `${distance} km`
            }
        }
    }
}
</script>

<template>
    <div class="col">
        <div class="card">
            <img :src="apartment.image" class="card-img-top img-fluid" alt="...">
            <RouterLink class="card-body text-decoration-none"
                :to="{ name: 'detail-page', params: { slug: apartment.slug } }">
                <h5>{{ apartment.title }}</h5>
                <p class="mb-1">{{ apartment.address }}</p>
                <p class="mb-1">{{ apartment.price_per_night }} €</p>
                <p class="mb-1">{{ apartment.square_meters }} m<sup>2</sup></p>
                <p v-if="hasDistance" class="mb-1">{{ formattedDistance() }}</p>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 100%;
    border: none;
    margin-top: 50px;

    .card-body {
        padding: 0;
        padding-top: 1rem;
    }

    p {
        color: gray;
    }

    img {
        height: 260px;
        object-fit: cover;
        border-radius: 5px;
    }
}
</style>