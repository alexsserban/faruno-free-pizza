import Vue from 'vue';
import VueRouter from 'vue-router';
import PageHome from '../pages/PageHome.vue';
import PageAdmin from '../pages/PageAdmin.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: PageHome
    },
    {
        path: '/admin',
        name: 'admin',
        component: PageAdmin
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
