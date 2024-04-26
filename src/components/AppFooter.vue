<script>
export default {
    name: 'AppFooter',
}
</script>

<template>
    <footer>
        <div class="container-fluid">
            <label class="mb-0 ms-5 text-secondary">
                &copy; 2024 BoolBnB
            </label>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    height: 60px;
    line-height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: 0.5s;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px -2px 2px -2px rgba(0, 0, 0, 0.5);
}
</style>