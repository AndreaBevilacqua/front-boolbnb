<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { store } from './assets/Data/store';


export default {
  name: 'Boolbnb',
  components: { AppHeader, AppFooter },
  data: () => ({
    store
  })
}
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
    <AppLoader v-if="store.isLoading" />
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
