<template>
  <div class="my-6 rounded">
    <table class="w-full text-left">
      <thead>
        <tr>
          <th
            v-for="(header, index) in tableElements"
            :key="index"
            class="px-4 py-2 text-sm font-bold uppercase border-b text-th"
          >
            {{ header }}
          </th>

          <th
            v-if="isTableForToday"
            class="px-4 py-2 text-sm font-bold uppercase border-b text-th"
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(order, index) in sortedByStatusOrders"
          :class="{
            'border-l-4 border-pink-700': newOrders.includes(order.email),
            'opacity-25': filtered.includes(order.email),
            'bg-green-100': order.status == 'completed',
            'bg-red-100': order.status == 'cancelled'
          }"
          class="font-table hover:bg-gray-200"
          :key="index"
        >
          <td
            v-for="(elem, index) in tableElements"
            :key="index"
            class="px-4 py-4 text-sm border-b text-te"
          >
            {{ order[elem] }}
          </td>

          <td v-if="isTableForToday" class="border-b">
            <div v-if="isPendingOrder(order) || isEditOrder(order)">
              <button
                :disabled="order.status == 'completed'"
                :class="
                  order.status == 'completed'
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                "
                class="px-4 py-2 mt-2 mb-2 mr-4 text-sm font-bold bg-gray-200 rounded lg:mb-0 hover:bg-green-300 "
                @click="setOrderStatus(order, 'completed')"
              >
                Complete
              </button>

              <button
                :disabled="order.status == 'cancelled'"
                :class="
                  order.status == 'cancelled'
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                "
                @click="setOrderStatus(order, 'cancelled')"
                class="px-4 py-2 mt-2 mb-2 text-sm font-bold bg-gray-200 rounded lg:mb-0 hover:bg-red-300"
              >
                Cancel
              </button>
            </div>

            <div v-else>
              <button
                class="px-4 py-2 mt-2 mb-2 mr-4 text-sm font-bold bg-gray-200 rounded lg:mb-0 hover:bg-yellow-300 "
                @click="setOrderEdit(order)"
              >
                Edit
              </button>
            </div>
          </td>

          <td v-else class="border-b"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { sortByStatus } from "../helpers";
import { db } from "../main";

export default {
  props: {
    orders: {
      required: true,
      type: Array
    },

    filtered: {
      required: true,
      type: Array
    },

    newOrders: {
      required: true,
      type: Array
    }
  },

  data() {
    return {
      tableElements: ["time", "name", "email", "phone", "pizza", "pin"],
      editOrders: []
    };
  },

  computed: {
    sortedByStatusOrders() {
      return this.orders.slice().sort((a, b) => sortByStatus(a, b));
    },

    isTableForToday() {
      return this.orders[0].date.getDate() == new Date().getDate();
    },

    classObject: function() {
      return {
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "fatal"
      };
    }
  },

  methods: {
    async setOrderStatus(order, status) {
      await db
        .collection("orders")
        .where("email", "==", order.email)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            db.collection("orders")
              .doc(doc.id)
              .update({ status });
          });
        });

      const index = this.editOrders.indexOf(order.email);
      if (index > -1) {
        this.editOrders.splice(index, 1);
      }

      order.status = status;
    },

    setOrderEdit(order) {
      this.editOrders.push(order.email);
    },

    isPendingOrder(order) {
      return order.status == "pending";
    },

    isEditOrder(order) {
      return this.editOrders.includes(order.email);
    }
  }
};
</script>

<style lang="scss" scoped></style>
