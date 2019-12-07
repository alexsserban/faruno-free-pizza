<template>
    <div>
        <el-row>
            <el-col :span="8" :offset="8">
                <div class="grid-content">
                    <el-form label-position="left" :model="user" :rules="rules" ref="user">
                        <el-form-item label="Nume" prop="name">
                            <el-input placeholder="Alexandru Alexandrescu" v-model="user.name" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="Email" prop="email">
                            <el-input placeholder="nume@gmail.com" v-model="user.email" clearable></el-input>
                        </el-form-item>

                        <el-form-item label="Telefon" prop="phone">
                            <el-input
                                placeholder="0722 333 444"
                                v-model="user.phone"
                                v-mask="'0### ### ###'"
                                type="tel"
                                clearable
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="Pizza" prop="pizza">
                            <el-select style="width: 100%;" v-model="user.pizza" placeholder="Select">
                                <el-option
                                    v-for="(pizza, index) in pizzas"
                                    :key="index"
                                    :label="pizza"
                                    :value="pizza"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item
                            style="margin-bottom: 0px"
                            label="Bucurate de o pizza gratuita la ora aleasa de tine!"
                            required
                        ></el-form-item>

                        <el-col :span="11">
                            <el-form-item prop="day">
                                <el-date-picker
                                    type="date"
                                    style="width: 100%;"
                                    v-model="user.day"
                                    placeholder="Data"
                                    format="dd/MM/yyyy"
                                    :picker-options="datePickerOptions"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11" :offset="2">
                            <el-form-item prop="hour">
                                <el-time-select
                                    style="width: 100%;"
                                    v-model="user.hour"
                                    :picker-options="timePickerOptions"
                                    placeholder="Ora"
                                ></el-time-select>
                            </el-form-item>
                        </el-col>

                        <el-row style="margin-top: 20px;">
                            <el-col :span="11"></el-col>

                            <el-col :span="11" :offset="2">
                                <el-button style="float:right" type="success" @click="submit('user')">Send</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {db, increment} from '../main';
import {mask} from 'vue-the-mask';
import * as securePin from 'secure-pin';

const isDuplicate = async (field, value) => {
    const data = await db
        .collection('orders')
        .where(field, '==', value)
        .get();

    return data.docs.length ? true : false;
};

export default {
    directives: {mask},

    data() {
        const validatePhone = async (rule, value, callback) => {
            if (value.length < 12) callback(new Error('Introduceti un numar de telefon valid!'));
            if (await isDuplicate(rule.field, value))
                callback(new Error('Acest numar de telefon a fost deja folosit pentru realizarea unei comenzi!'));
            callback();
        };

        const validateEmail = async (rule, value, callback) => {
            if (await isDuplicate(rule.field, value))
                callback(new Error('Acesta adresa de email a fost deja folosita pentru realizarea unei comenzi!'));
            callback();
        };

        const validateHour = async (rule, value, callback) => {
            await this.validateHourMethod(rule, value, callback);
        };

        const startDate = new Date(2019, 10, 27);
        const endDate = new Date(2019, 11, 6);

        return {
            user: {
                name: '',
                email: '',
                phone: '',
                pizza: '',
                day: '',
                hour: ''
            },

            pizzas: ['Pizza 01', 'Pizza 02', 'Pizza 03', 'Pizza 04', 'Pizza 05'],

            rules: {
                name: [{required: true, message: 'Introduceti numele!', trigger: 'blur'}],

                email: [
                    {required: true, message: 'Introduceti emailul!', trigger: 'blur'},
                    {
                        type: 'email',
                        message: 'Introduceti o adresa de email valida!',
                        trigger: 'blur'
                    },
                    {validator: validateEmail, trigger: 'blur'}
                ],

                phone: [
                    {
                        required: true,
                        message: 'Introduceti numarul de telefon!',
                        trigger: 'blur'
                    },
                    {validator: validatePhone, trigger: 'blur'}
                ],

                pizza: [
                    {
                        required: true,
                        message: 'Selecteaza Pizza favorita!',
                        trigger: 'blur'
                    }
                ],

                hour: [{validator: validateHour, trigger: 'blur'}],

                day: [
                    {
                        type: 'date',
                        required: true,
                        message: 'Selecteaza ziua in care doresti sa te bucuri de pizza!',
                        trigger: 'blur'
                    }
                ]
            },

            datePickerOptions: {
                firstDayOfWeek: 1,
                disabledDate(time) {
                    return time.getTime() < startDate.getTime()
                        ? true
                        : time.getTime() > endDate.getTime()
                        ? true
                        : false;
                }
            },

            timePickerOptions: {
                start: '10:30',
                end: '19:00',
                step: '00:15'
            }
        };
    },

    methods: {
        submit(formName) {
            this.$refs[formName].validate(async valid => {
                if (!valid) return false;

                const hourAndMinutes = this.user.hour.split(':');
                this.user.day.setHours(hourAndMinutes[0], hourAndMinutes[1]);

                await db.collection('orders').add({
                    name: this.user.name,
                    email: this.user.email,
                    phone: this.user.phone,
                    pizza: this.user.pizza,
                    date: this.user.day,
                    status: 'pending',
                    pin: securePin.generatePinSync(4)
                });

                await db
                    .collection('admin')
                    .doc('iWkLWuYXqHvwd9tmpZrZ')
                    .update({
                        [`${this.user.day.getDate()}.${this.user.hour}`]: increment
                    });

                this.$message({
                    message: 'Comanda a fost inregistrata cu succes!',
                    type: 'success'
                });

                this.user = {
                    name: '',
                    email: '',
                    phone: '',
                    day: '',
                    hour: ''
                };
            });
        },

        async validateHourMethod(field, value, callback) {
            if (!this.user.day) callback(new Error('Selecteaza mai intai ziua comenzii!'));
            else if (!this.user.hour) callback(new Error('Selecteaza ora la care doresti sa ridici pizza!'));
            else {
                const doc = await db
                    .collection('admin')
                    .doc('iWkLWuYXqHvwd9tmpZrZ')
                    .get();

                const dayNr = this.user.day.getDate();
                const hour = doc.data()[dayNr][this.user.hour];

                if (!hour) callback();
                else if (hour >= 10) callback(new Error('Interval orar plin!'));
                else callback();
            }
        }
    }
};
</script>

<style scoped>
.bg-purple-dark {
    background: #99a9bf;
}
</style>
