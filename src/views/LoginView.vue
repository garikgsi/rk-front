<template>
  <div class="row justify-center">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-sm">
      <div class="q-ma-lg q-pa-lg">
        <h2 class="q-my-xs">Login</h2>
        <div class="subtitle1 text-primary">
          Login for take an access to all app features
        </div>
      </div>
      <div class="q-mt-lg">
        <login-form v-if="!isAuth"></login-form>
        <log-out v-else></log-out>
      </div>
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

<style lang="scss" scoped></style>
