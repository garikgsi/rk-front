<template>
  <auth-page
    title="Авторизация"
    sub-title="Войдите, чтобы использовать все возможности сервиса"
  >
    <login-form v-if="!isAuth"></login-form>
    <log-out v-else></log-out>
  </auth-page>
</template>

<script>
import LoginFormVue from "@/components/auth/LoginForm.vue";

import { mapGetters } from "vuex";
import LogOutVue from "@/components/auth/LogOut.vue";
import AuthPageVue from "@/views/auth/AuthPage.vue";
export default {
  name: "login-view",
  components: {
    "login-form": LoginFormVue,
    "log-out": LogOutVue,
    "auth-page": AuthPageVue,
  },
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
