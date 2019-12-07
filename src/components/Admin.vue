<template>
    <div v-if="ready" class="container py-10 mx-auto">
        <AdminOrders
            :orders="todaysOrders"
            :title="'Today\'s Orders'"
            :dates="[todaysOrders[0].date]"
            :newOrders="newOrders"
            class="mb-20"
        />

        <AdminOrders
            :orders="orders"
            :title="'Upcoming Orders'"
            :dates="upcomingDays()"
            :newOrders="newOrders"
            class="mb-20"
        />

        <AdminOrders :orders="orders" :title="'Previous Orders'" :dates="previousDays()" :newOrders="newOrders" />
    </div>
</template>

<script>
import AdminOrders from '../components/AdminOrders';
import {getAvailableDays} from '../helpers';
import {db, notyf} from '../main';

export default {
    components: {
        AdminOrders
    },

    data() {
        return {
            orders: [],
            newOrders: [],
            ready: false
        };
    },

    computed: {
        todaysOrders() {
            return this.orders.filter(order => order.date.getDate() == new Date().getDate());
        }
    },

    methods: {
        upcomingDays() {
            return getAvailableDays(this.orders, true);
        },

        previousDays() {
            return getAvailableDays(this.orders, false);
        }
    },

    async created() {
        const notification = await new Audio(require('../assets/ios_notification.mp3'));
        setTimeout(() => (this.ready = true), 1000);

        await db.collection('orders').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const date = new Date(change.doc.data().date.seconds * 1000);
                    const time = date.getHours() + ':' + `0${date.getMinutes()}`.slice(-2);

                    this.orders.push({
                        ...change.doc.data(),
                        date,
                        time
                    });
                    this.orders.sort((a, b) => a.date.getTime() - b.date.getTime());

                    if (this.ready == true) {
                        notyf.success(`New order from ${change.doc.data().name}`);
                        notification.play();
                        this.newOrders.push(change.doc.data().email);
                    }
                }
            });
        });
    }
};
</script>

<style lang="scss" scoped></style>
