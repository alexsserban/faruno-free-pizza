<template>
  <div v-if="ready" class="container py-10 mx-auto">
    <AdminOrdersGroup
      :orders="todaysOrders"
      :title="'Today\'s Orders'"
      :dates="[todaysOrders[0].date]"
      :newOrders="newOrders"
      class="mb-20"
    />

    <AdminOrdersGroup
      :orders="orders"
      :title="'Upcoming Orders'"
      :dates="upcomingDays()"
      :newOrders="newOrders"
      class="mb-20"
    />

    <AdminOrdersGroup
      :orders="orders"
      :title="'Previous Orders'"
      :dates="previousDays()"
      :newOrders="newOrders"
    />
  </div>
</template>

<script>
import AdminOrdersGroup from "../components/AdminOrdersGroup";
import { getAvailableDays } from "../helpers";
import { db } from "../main";

// New order notification
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({
  duration: 5000
});

export default {
  components: {
    AdminOrdersGroup
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
      return this.orders.filter(
        order => order.date.getDate() == new Date().getDate()
      );
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
    const notification = await new Audio(
      require("../assets/ios_notification.mp3")
    );

    setTimeout(() => (this.ready = true), 1000);

    await db.collection("orders").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          const date = new Date(change.doc.data().date.seconds * 1000);
          const time =
            date.getHours() + ":" + `0${date.getMinutes()}`.slice(-2);

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
