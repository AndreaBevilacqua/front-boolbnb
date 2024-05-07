<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'ApartmentCard',
    data: () => ({
        showDistance: false
    }),
    props: {
        apartment: Object,
    },
    methods: {
        formattedDistance() {
            if (0 < this.apartment.distance && this.apartment.distance < 1) {
                let distance = Math.floor(this.apartment.distance * 1000);
                this.showDistance = true;
                return `${distance} m`
            } else if (this.apartment.distance >= 1) {
                let distance = this.apartment.distance.toFixed(2);
                this.showDistance = true;
                return `${distance} km`
            } else {
                this.showDistance = false;
            }
        }
    },
    created() {
        this.formattedDistance()
    }
}
</script>

<template>
    <div class="col">
        <div class="card position-relative">
            <img :src="apartment.image" class="card-img-top img-fluid" alt="...">
            <i class="fa-solid fa-medal fa-beat-fade rounded-circle my-icon position-absolute"></i>
            <RouterLink class="card-body text-decoration-none"
                :to="{ name: 'detail-page', params: { slug: apartment.slug } }">
                <h5>{{ apartment.title }}</h5>
                <p class="mb-1">{{ apartment.address }}</p>
                <div class="d-flex column-gap-3">
                    <p class="mb-1">{{ apartment.price_per_night }} €</p>
                    <p class="mb-1">{{ apartment.square_meters }} m<sup>2</sup></p>
                    <p v-if="showDistance" class="mb-1">{{ formattedDistance() }}</p>
                </div>
                <i class="fas fa-arrow-right"></i>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 100%;
    border: none;
    margin-top: 50px;
    box-shadow: 3px 3px 15px rgb(189, 187, 187);

    .my-icon {
        top: 10px;
        right: 10px;
        font-size: 1.5rem;
        color: goldenrod;
        padding: 10px;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.815);
    }


    .card-body {
        display: block;
        position: relative;
        min-height: 180px;
        background-color: #f2f8f9;
        text-decoration: none;
        z-index: 0;
        overflow: hidden;

        .fa-arrow-right {
            position: absolute;
            top: 3px;
            right: 3px;
            color: white;
        }

        &:before {
            content: "";
            position: absolute;
            z-index: -1;
            top: -10px;
            right: -10px;
            background: #0E485B;
            height: 32px;
            width: 32px;
            border-radius: 15px;
            transform: scale(1);
            transform-origin: 50% 50%;
            transition: transform 0.25s ease-out;
        }

        &:hover:before {
            transform: scale(50);
            background: linear-gradient(to right, #0E485B, #4BC9E4);
        }
    }

    .card-body:hover {
        p {
            transition: all 0.3s ease-out;
            color: rgba(255, 255, 255, 0.8);
        }

        h5 {
            transition: all 0.3s ease-out;
            color: #ffffff;
        }
    }

    p {
        color: gray;
    }

    img {
        height: 260px;
        object-fit: cover;
        border-radius: 5px 5px 0px 0px;
    }
}
</style>