<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'Boolbnb',
  components: { AppHeader, AppFooter },
}
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped lang="scss">
main {
  height: calc(100vh - 130px);
  overflow: auto;
  padding: 3rem;
}
</style>
