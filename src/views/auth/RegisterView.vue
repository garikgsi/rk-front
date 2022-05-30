<template>
  <auth-page
    title="Регистрация"
    sub-title="Для использования всех возможностей приложения - необходимо зарегистрироваться"
  >
    <register-form></register-form>
  </auth-page>
</template>

<script>
import RegisterFormVue from "@/components/auth/RegisterForm.vue";
import AuthPageVue from "@/views/auth/AuthPage.vue";
export default {
  setup() {
    return {};
  },
  components: {
    "auth-page": AuthPageVue,
    "register-form": RegisterFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
