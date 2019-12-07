<template>
  <div>
    <Login v-if="!isLogged" @validate="validate()" />
    <Admin v-else-if="isLogged" />
  </div>
</template>

<script>
import Admin from "../components/Admin";
import Login from "../components/logIn";

export default {
  components: {
    Admin,
    Login
  },

  data() {
    return {
      password: "",
      real: process.env.VUE_APP_ADMIN_PASSWORD,
      isLogged: false
    };
  },

  methods: {
    validate() {
      this.isLogged = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
