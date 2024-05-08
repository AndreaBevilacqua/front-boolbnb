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
  //padding: 3rem;
}

::-webkit-scrollbar {
  width: 13px;
  height: 10px;
  background-color: white;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.5);
  border-radius: 20px;
}
</style>
