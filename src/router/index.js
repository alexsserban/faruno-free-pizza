import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AdminPage from '../views/AdminPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminPage
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
