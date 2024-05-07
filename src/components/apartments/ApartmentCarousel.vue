<script>
export default {
    name: "Carousel",
    data: () => ({
        carouselImages: [],
        currentIndex: 0
    }),
    props: {
        apartment: Object,
    },
    methods: {
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

    },
    created() {
        this.loadCarouselImages();
    }
}

</script>

<template>
    <!-- prev button -->
    <i v-if="carouselImages.length > 1" class="fas fa-chevron-left" @click="goToPrev"></i>

    <img v-for="(image, i) in carouselImages" v-show="currentIndex === i" class="img-fluid" :src="image"
        :alt="apartment.title">

    <!-- next button -->
    <i v-if="carouselImages.length > 1" class="fas fa-chevron-right" @click="goToNext"></i>
</template>

<style scoped lang="scss">
img {

    height: 240px;
    width: 100%;
    border-radius: 5px 5px 0px 0px;
}

.fa-chevron-left,
.fa-chevron-right {
    position: absolute;
    font-size: 1.8rem;
    color: white;
    text-shadow: 1px 2px 5px #000000;
    cursor: pointer;
}

.fa-chevron-left {
    left: 20px;
    top: 50%;
    transform: translate(-50%, -50%);
}

.fa-chevron-right {
    right: 4px;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>