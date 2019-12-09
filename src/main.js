import Vue from 'vue';
import App from './App.vue';

import firebase from 'firebase/app';
import '@firebase/firestore';
import router from './router';

import VueFilterDateFormat from 'vue-filter-date-format';
import './assets/tailwind.css';

Vue.use(VueFilterDateFormat);

Vue.config.productionTip = false;

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import Vue2TouchEvents from 'vue2-touch-events';
Vue.use(Vue2TouchEvents);

Vue.directive('$model', {
    bind: function(el, binding, vnode) {
        el.oninput = () => (vnode.context[binding.expression] = el.value);
    }
});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyCPLccrrr-80_nUZ71Uw-QO5wxrB74Ljmo',
    authDomain: 'faruno-bde66.firebaseapp.com',
    databaseURL: 'https://faruno-bde66.firebaseio.com',
    projectId: 'faruno-bde66',
    storageBucket: 'faruno-bde66.appspot.com',
    messagingSenderId: '604373015988',
    appId: '1:604373015988:web:f154a9b1e89e8f6e4da6e1',
    measurementId: 'G-HPCZY64ZFT'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const increment = firebase.firestore.FieldValue.increment(1);

import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';
export const notyf = new Notyf({
    duration: 5000
});

//firebase.analytics();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
