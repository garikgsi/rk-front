<template>
  <auth-page
    title="Восстановление пароля"
    sub-title="Для восстановления пароля Вам потребуется доступ к электронной почте, указанной при регистрации. Сначала отправьте на нее проверочный код."
  >
    <restore-form></restore-form>
  </auth-page>
</template>

<script>
import AuthPageVue from "@/views/auth/AuthPage.vue";
import RestoreFormVue from "@/components/auth/RestoreForm.vue";
export default {
  setup() {
    return {};
  },
  components: {
    "auth-page": AuthPageVue,
    "restore-form": RestoreFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
