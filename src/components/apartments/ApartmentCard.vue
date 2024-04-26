<script>
export default {
    name: 'ApartmentCard',
    props: { apartment: Object }
}
</script>

<template>
    <div class="card">
        <img src="../../assets/homephoto.png" class="card-img-top" alt="...">
        <div class="card-body">
            <h5>{{ apartment.title }}</h5>
            <p class="mb-0">{{ apartment.address }}</p>
            <p class="mb-0">€{{ apartment.price_per_night }}</p>
            <p class="mb-0">{{ apartment.square_meters }} m<sup>2</sup></p>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>