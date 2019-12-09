<template>
    <div>
        <form @submit.prevent class="w-full">
            <div class="flex flex-wrap mb-6 -mx-3">
                <div class="w-full px-3">
                    <label class="mb-20 text-xs font-bold text-gray-700 uppercase nlock ">
                        Nume
                    </label>
                    <input
                        :class="$v.user.name.$error ? 'border-red-500' : 'border-gray-200'"
                        class="w-full px-4 py-3 mt-2 mb-4 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none text focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Ion Popescu"
                        v-model="user.name"
                        @blur="$v.user.name.$touch()"
                    />
                    <template v-if="$v.user.name.$error">
                        <p v-if="!$v.user.name.required" class="text-xs italic text-red-500">
                            Pentru a-ti pregati pizza avem nevoie de numele tau
                        </p>
                    </template>
                </div>
            </div>

            <div class="flex flex-wrap mb-6 -mx-3">
                <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label class="text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-first-name">
                        Telefon
                    </label>
                    <input
                        :class="$v.user.phone.$error ? 'border-red-500' : 'border-gray-200'"
                        class="w-full px-4 py-3 mt-2 mb-4 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        type="tel"
                        v-mask="'0### ### ###'"
                        placeholder="0722 333 444"
                        v-on:input="user.phone = $event.target.value"
                        @blur="$v.user.phone.$touch()"
                    />
                    <template v-if="$v.user.phone.$error">
                        <p v-if="!$v.user.phone.required" class="text-xs italic text-red-500">
                            Completeaza numarul tau de telefon! Vei primi un cod unic cu care iti vei ridica comanda.
                        </p>
                        <p v-if="!$v.user.phone.minLength" class="text-xs italic text-red-500">
                            Introduceti un numar de telefon valid!
                        </p>
                        <p v-if="!$v.user.phone.unique" class="text-xs italic text-red-500">
                            Acest numar de telefon a fost deja folosit pentru realizarea unei comenzi!
                        </p>
                    </template>
                </div>

                <div class="w-full px-3 md:w-1/2">
                    <label class="text-xs font-bold tracking-wide text-gray-700 uppercase" for="grid-last-name">
                        Email
                    </label>
                    <input
                        :class="$v.user.email.$error ? 'border-red-500' : 'border-gray-200'"
                        class="w-full px-4 py-3 mt-2 mb-4 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        placeholder="ion@gmail.com"
                        v-model.lazy="user.email"
                        @blur="$v.user.email.$touch()"
                    />
                    <template v-if="$v.user.email.$error">
                        <p v-if="!$v.user.email.required" class="text-xs italic text-red-500">
                            Introduceti emailul!
                        </p>
                        <p v-if="!$v.user.email.email" class="text-xs italic text-red-500">
                            Introduceti o adresa de email valida!
                        </p>
                        <p v-if="!$v.user.email.unique" class="text-xs italic text-red-500">
                            Acesta adresa de email a fost deja folosita pentru realizarea unei comenzi!
                        </p>
                    </template>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3s">
                <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0 ">
                    <label class="text-xs font-bold tracking-wide text-gray-700 uppercase">
                        Data
                    </label>

                    <VueCtkDateTimePicker
                        minute-interval="15"
                        format="YYYY-MM-DD HH:mm"
                        formatted="DD.MM.YYYY [la ora] HH:mm"
                        locale="ro"
                        :disabled-hours="disabledHours"
                        :min-date="getCurrentDay()"
                        :max-date="getCurrentDay(1)"
                        :no-button-now="true"
                        color="#918085"
                        button-color="#5B5750"
                        @input="$v.user.date.$touch()"
                        v-model="user.date"
                        :behaviour="{
                            time: {
                                nearestIfDisabled: false
                            }
                        }"
                    >
                        <input
                            :class="$v.user.date.$error ? 'border-red-500' : 'border-gray-200'"
                            class="w-full px-4 py-3 mt-2 mb-4 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="10.12.2019 la ora 14:15"
                        />
                    </VueCtkDateTimePicker>

                    <template v-if="$v.user.date.$error">
                        <p v-if="!$v.user.date.required" class="text-xs italic text-center text-red-500">
                            Selecteaza Data si Ora la care vrei sa ridici comanda!
                        </p>
                        <p v-if="!$v.user.date.enoughTimeToPrepare" class="text-xs italic text-center text-red-500">
                            Pentru a-ti oferi cea mai buna pizza, avem nevoie de mai mult timp pentru preparare.
                        </p>
                        <p v-if="!$v.user.date.availableSlot" class="text-xs italic text-center text-red-500">
                            Ora selectata nu mai este disponibila!
                        </p>
                    </template>
                </div>

                <div class="w-full px-3 mb-8 md:w-1/2 md:mb-0">
                    <label class="text-xs font-bold tracking-wide text-gray-700 uppercase">
                        Pizza
                    </label>

                    <div class="relative mt-2 mb-4">
                        <select
                            :class="$v.user.pizza.$error ? 'border-red-500' : 'border-gray-200'"
                            v-model="user.pizza"
                            @blur="$v.user.pizza.$touch()"
                            class="w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                            <option value="" selected disabled hidden>Alege pizza preferata</option>
                            <option v-for="(pizza, index) in pizzas" :key="index">{{ pizza }}</option>
                        </select>

                        <div
                            class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
                        >
                            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>

                    <template v-if="$v.user.pizza.$error">
                        <p v-if="!$v.user.pizza.required" class="text-xs italic text-red-500">
                            Alege pizza preferata
                        </p>
                    </template>
                </div>
            </div>

            <div class="flex justify-end mt-4 -mx-3s">
                <button
                    v-touch:tap="() => send()"
                    class="self-end px-4 py-2 font-bold text-white rounded bg-main hover:bg-secondary"
                >
                    Trimite
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import {db, increment} from '../main';
import {mask} from 'vue-the-mask';

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

import {required, email, minLength} from 'vuelidate/lib/validators';
import {uniquePhone, uniqueEmail, dateAvailableSlot, dateEnoughTimeToPrepare} from '../helpers/validators';
import {createDateObject} from '../helpers';

import * as securePin from 'secure-pin';
import swal from 'sweetalert';

export default {
    directives: {mask},

    components: {VueCtkDateTimePicker},

    data() {
        return {
            pizzas: [
                'Margherita',
                'Margherita con Bufala',
                'Diavola',
                'Prosciutto e Funghi',
                'Capricciosa',
                'Vegetariana',
                'Tonno e Cipolla'
            ],
            date: '',

            disabledHours: [
                '00',
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23'
            ],
            user: {
                name: '',
                email: '',
                phone: '',
                pizza: '',
                date: ''
            }
        };
    },

    validations: {
        user: {
            name: {
                required
            },

            phone: {
                required,
                minLength: minLength(12),
                unique: uniquePhone
            },

            email: {
                required,
                email,
                unique: uniqueEmail
            },

            pizza: {required},

            date: {
                required,
                enoughTimeToPrepare: dateEnoughTimeToPrepare,
                availableSlot: dateAvailableSlot
            }
        }
    },

    methods: {
        getCurrentDay(nrSkipDays = 0) {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = (date.getDate() + nrSkipDays).toString().padStart(2, 0);
            return `${year}-${month}-${day}`;
        },

        async send() {
            // Verify form for errors
            this.$v.user.$touch();
            if (this.$v.user.$invalid) return;

            // Crate Date Object
            const {fullDate, date, time} = createDateObject(this.user.date);

            const pin = securePin.generatePinSync(4);

            // Make new order in DB
            db.collection('orders').add({
                name: this.user.name,
                email: this.user.email,
                phone: this.user.phone,
                pizza: this.user.pizza,
                date: fullDate,
                status: 'pending',
                pin
            });

            //Increase Nr of orders for that time slot
            db.collection('admin')
                .doc('iWkLWuYXqHvwd9tmpZrZ')
                .update({
                    [`${date}.${time}`]: increment
                });

            // User Successfull message
            swal('Comanda ta a fost inregistrata!', `Te asteptam pe data de ${this.user.date} !`, 'success');

            // SMS Message
            const api = require('../../node_modules/clicksend/api.js');

            const smsMessage = new api.SmsMessage();

            smsMessage.from = 'Faruno Pizza';
            smsMessage.to = this.user.phone;

            if (fullDate.getDate() == new Date().getDate())
                smsMessage.body = `Salut ${this.user.name},\n Iti multumim pentru comanda! Te asteptam astazi, ${date}, la ora ${time}, pentru a te bucura de pizza ${this.user.pizza}! \nAtunci cand ajungi la locatie, te rugam sa folosesti codul ${pin}, pentru a ridica comanda!`;
            else
                smsMessage.body = `Salut ${this.user.name},\n Iti multumim pentru comanda! Te asteptam in date de ${date}, la ora ${time}, pentru a te bucura de pizza ${this.user.pizza}! \nAtunci cand ajungi la locatie, te rugam sa folosesti codul ${pin}, pentru a ridica comanda!`;

            var smsApi = new api.SMSApi('alex@venkon.ro', 'B6B46C04-8EAE-D901-E3BD-E17A1D2271CB');

            var smsCollection = new api.SmsMessageCollection();

            smsCollection.messages = [smsMessage];

            await smsApi.smsSendPost(smsCollection);

            // Reset Form fields & no form errors
            this.user = {
                name: '',
                email: '',
                phone: '',
                date: ''
            };

            this.$v.user.$reset();
        }
    }
};
</script>

<style>
input.input {
    background-color: #edf2f7 !important;
    border: none;
    min-height: 100%;
}
</style>
