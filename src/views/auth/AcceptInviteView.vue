<template>
  <auth-page
    title="Подтверждение регистрации"
    sub-title="Спасибо, что приняли приглашение"
  >
    <restore-form :email="email" :code="code"></restore-form>
  </auth-page>
</template>

<script>
import AuthPageVue from "@/views/auth/AuthPage.vue";
import RestoreFormVue from "@/components/auth/RestoreForm.vue";
export default {
  props: {
    email: {
      require: true,
      type: String,
    },
    code: {
      require: true,
      type: String,
    },
  },
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
