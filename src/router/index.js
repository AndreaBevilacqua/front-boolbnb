import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import DetailPage from '../pages/DetailPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "home", component: HomePage },
        { path: '/not-found', component: NotFoundPage, name: 'not-found' },
        { path: '/detail-page/:slug', component: DetailPage, name: 'detail-page' },
        { path: "/:pathMatch(.*)*", redirect: "/not-found" }
    ]
});

export { router };