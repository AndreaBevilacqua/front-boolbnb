<script>
export default {
    name: 'ApartmentCard',
    props: { apartment: Object }
}
</script>

<template>
    <div class="col">
        <div class="card">
            <img :src="apartment.image" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5>{{ apartment.title }}</h5>
                <p class="mb-1">{{ apartment.address }}</p>
                <p class="mb-1">€{{ apartment.price_per_night }}</p>
                <p class="mb-1">{{ apartment.square_meters }} m<sup>2</sup></p>
            </div>
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