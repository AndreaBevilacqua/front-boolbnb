<script>
export default {
    name: 'ApartmentCard',
    props: { apartment: Object }
}
</script>

<template>
    <div class="card">
        <img :src="apartment.image" class="card-img-top" alt="...">
        <div class="card-body">
            <h5>{{ apartment.title }}</h5>
            <p class="mb-0">{{ apartment.address }}</p>
            <p class="mb-0">€{{ apartment.price_per_night }}</p>
            <p class="mb-0">{{ apartment.square_meters }} m<sup>2</sup></p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 350px;
    height: 350px;
    border: none;
    margin-top: 50px;

    .card-body {
        padding-left: 5px;
        padding-right: 50px;
    }

    p {
        color: gray;
    }

    img {
        height: 250px;
        border-radius: 10px;
    }

    h5 {
        text-transform: uppercase;
    }
}
</style>