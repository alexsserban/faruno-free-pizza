<template>
    <div v-if="ready">
        <el-row class="myRow">
            <el-col :span="18" :offset="3">
                <div style="display: flex;   justify-content: space-between;">
                    <h1 style="text-align:left">Today's Orders</h1>

                    <el-input
                        style="align-self: center; width: 25%"
                        v-model="notBlurredSearch"
                        @blur="
                            search = notBlurredSearch;
                            notBlurredSearch = '';
                        "
                        @keypress.enter.native="
                            search = notBlurredSearch;
                            notBlurredSearch = '';
                        "
                        size="mini"
                        placeholder="Search by Name, Email or Phone"
                    />
                </div>

                <div v-if="todaysOrders.length">
                    <h3 style="text-align:left">
                        {{ todaysOrders[0].date | dateFormat('DD.MM.YYYY') }}
                    </h3>

                    <el-table :data="todaysOrders" stripe style="width: 100%" :row-class-name="tableRowClassName">
                        > <el-table-column prop="time" label="Time"></el-table-column>
                        <el-table-column prop="name" label="Name"></el-table-column>
                        <el-table-column prop="email" label="Email"></el-table-column>
                        <el-table-column prop="phone" label="Phone"></el-table-column>
                        <el-table-column prop="pizza" label="Pizza"></el-table-column>
                        <el-table-column prop="pin" label="Pin"></el-table-column>
                        <!-- <el-table-column label="Operations">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="makeOrderFinished(scope.row, scope.$index)"
                  :disabled="scope.row.status == 'completed' ? true : false"
                >Finish</el-button>
              </template>
            </el-table-column>-->
                    </el-table>
                </div>
                <p v-else style="text-align: left">No orders.</p>
            </el-col>
        </el-row>

        <el-row class="myRow">
            <el-col :span="18" :offset="3">
                <h1 style="text-align:left">Upcoming Orders</h1>

                <div v-for="(date, index) in upcomingDays()" :key="index">
                    <h3 style="text-align:left">{{ date | dateFormat('DD.MM.YYYY') }}</h3>

                    <el-table :data="dateOrders(date)" stripe style="width: 100%">
                        <el-table-column prop="time" label="Time"></el-table-column>
                        <el-table-column prop="name" label="Name"></el-table-column>
                        <el-table-column prop="email" label="Email"></el-table-column>
                        <el-table-column prop="phone" label="Phone"></el-table-column>
                        <el-table-column prop="pizza" label="Pizza"></el-table-column>
                        <el-table-column prop="pin" label="Pin"></el-table-column>
                    </el-table>
                    <br />
                </div>
            </el-col>
        </el-row>

        <el-row class="myRow">
            <el-col :span="18" :offset="3">
                <h1 style="text-align:left">Previous Orders</h1>
                <div v-for="(date, index) in previousDays()" :key="index">
                    <h3 style="text-align:left">{{ date | dateFormat('DD.MM.YYYY') }}</h3>

                    <el-table :data="dateOrders(date)" stripe style="width: 100%">
                        <el-table-column prop="time" label="Time"></el-table-column>
                        <el-table-column prop="name" label="Name"></el-table-column>
                        <el-table-column prop="email" label="Email"></el-table-column>
                        <el-table-column prop="phone" label="Phone"></el-table-column>
                        <el-table-column prop="pizza" label="Pizza"></el-table-column>
                        <el-table-column prop="pin" label="Pin"></el-table-column>
                    </el-table>
                    <br />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import { db } from "../main";
import {getAvailableDays} from '../helpers';

export default {
    data() {
        return {
            orders: [],
            notBlurredSearch: '',
            search: '',
            ready: false
        };
    },

    computed: {
        todaysOrders() {
            return this.orders.filter(order => {
                return (
                    order.date.getDate() == new Date().getDate() &&
                    (this.search
                        ? order.name.toLowerCase().includes(this.search) ||
                          order.email.toLowerCase().includes(this.search) ||
                          order.phone.includes(this.search)
                        : true)
                );
            });
        }
    },

    methods: {
        dateOrders(date) {
            return this.orders.filter(order => order.date.getDate() == date.getDate());
        },

        upcomingDays() {
            return getAvailableDays(this.orders, true);
        },

        previousDays() {
            return getAvailableDays(this.orders, false);
        },

        makeOrderFinished(row) {
            row.status = 'completed';
        }
    },

    async created() {
        // const querySnapshot = await db.collection("orders").get();
        // querySnapshot.forEach(doc => {
        //   const date = new Date(doc.data().date.seconds * 1000);
        //   const time = date.getHours() + ":" + `0${date.getMinutes()}`.slice(-2);
        //   this.orders.push({
        //     ...doc.data(),
        //     date,
        //     time
        //   });
        //   this.ready = true;
        // });
        // this.orders.sort((a, b) => a.date.getTime() - b.date.getTime());
    }
};
</script>

<style>
.myRow {
    margin-bottom: 100px;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>
