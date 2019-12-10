import Vue from 'vue';
import App from './App.vue';
import router from './router';

import firebase from 'firebase/app';
import '@firebase/firestore';

import VueFilterDateFormat from 'vue-filter-date-format';
Vue.use(VueFilterDateFormat);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

// Mobile Tap
import Vue2TouchEvents from 'vue2-touch-events';
Vue.use(Vue2TouchEvents);

import './assets/tailwind.css';

// Firebase configuration
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

Vue.config.productionTip = false;
//firebase.analytics();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
