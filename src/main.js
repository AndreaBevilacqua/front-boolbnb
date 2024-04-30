import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import AppLoader from './components/AppLoader.vue'
import { router } from './router/index.js'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSort } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faSort)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('AppLoader', AppLoader)
    .use(router)
    .mount('#app')
