<template>
  <div>
    <input
      class="w-1/5 px-4 py-3 mt-2 mb-4 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none text focus:outline-none focus:bg-white focus:border-gray-500"
      type="password"
      placeholder="Password"
      v-model="password"
      @keypress.enter="signIn()"
    />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: null,
      email: "admin@faruno.ro",
      password: ""
    };
  },

  methods: {
    async signIn() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password);

      this.$emit("successfullAdminLogin");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>