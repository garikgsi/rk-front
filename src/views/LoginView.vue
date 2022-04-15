<template>
  <div class="login">
    <div class="login__form">
      <login-form v-if="!isAuth"></login-form>
      <log-out v-else></log-out>
    </div>
  </div>
</template>

<script>
import LoginFormVue from "@/components/LoginForm.vue";

import { mapGetters } from "vuex";
import LogOutVue from "../components/LogOut.vue";
export default {
  name: "login-view",
  components: {
    "login-form": LoginFormVue,
    "log-out": LogOutVue,
  },
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
    }),
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  .login__form {
    border: 2px solid $primary;
    width: 50%;
    padding: 20px;
    margin: 20px;
  }
}
</style>
