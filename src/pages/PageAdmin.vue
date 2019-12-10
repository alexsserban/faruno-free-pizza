<template>
  <div>
    <AdminLogIn
      v-if="!isLogged"
      @successfullAdminLogin="successfullAdminLogin()"
    />
    <AdminOrders v-else-if="isLogged" />
  </div>
</template>

<script>
import AdminLogIn from "../components/AdminLogIn";
import AdminOrders from "../components/AdminOrders";

export default {
  components: {
    AdminLogIn,
    AdminOrders
  },

  data() {
    return {
      isLogged: false
    };
  },

  methods: {
    successfullAdminLogin() {
      this.isLogged = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>