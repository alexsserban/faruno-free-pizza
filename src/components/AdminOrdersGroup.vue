<template>
  <div>
    <div class="flex justify-between mb-5">
      <h1 class="text-4xl font-semibold text-left">{{ title }}</h1>

      <div class="md:w-1/3">
        <input
          class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none"
          type="text"
          placeholder="Search by Name, Email or Phone"
          v-model="search"
          @blur="filterOrders"
          @keypress.enter="filterOrders"
        />
      </div>
    </div>

    <div v-if="dates.length">
      <div v-for="(date, index) in dates" :key="index" class="mb-12">
        <h3 class="text-base font-medium text-left">
          {{ date | dateFormat("DD.MM.YYYY") }}
        </h3>

        <Table
          v-if="searchedOrdersByDate(date).length"
          :orders="searchedOrdersByDate(date)"
          :filtered="filtered"
          :newOrders="newOrders"
        />
      </div>
    </div>

    <h3 v-else class="text-base font-medium text-left">No orders.</h3>
  </div>
</template>

<script>
import Table from "./Table";

export default {
  props: {
    orders: {
      required: true,
      type: Array
    },

    title: {
      required: true,
      type: String
    },

    dates: {
      required: true,
      type: Array
    },

    newOrders: {
      required: true,
      type: Array
    }
  },

  components: { Table },

  data() {
    return {
      search: "",
      filtered: []
    };
  },

  computed: {},

  methods: {
    searchedOrdersByDate(date) {
      return this.orders.filter(
        order => order.date.getDate() == date.getDate()
      );
    },

    filterOrders() {
      this.filtered = [];
      if (this.search == "@new")
        this.orders.forEach(order =>
          !this.newOrders.includes(order.email)
            ? this.filtered.push(order.email)
            : null
        );
      else
        this.orders.forEach(order =>
          order.name.toLowerCase().includes(this.search) ||
          order.email.toLowerCase().includes(this.search) ||
          order.phone.includes(this.search)
            ? ""
            : this.filtered.push(order.email)
        );
    }
  }
};
</script>

<style lang="scss" scoped></style>
