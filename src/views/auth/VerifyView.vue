<template>
  <auth-page
    title="Подтверждение регистрации"
    sub-title="Для окончания процесса регистрации необходимо подтвердить адрес электронной почты с помощью кода подтверждения. Если у Вас его нет - нажмите на кнопку Отправить код"
  >
    <verify-form :email="email"></verify-form>
  </auth-page>
</template>

<script>
import VerifyFormVue from "@/components/auth/VerifyForm.vue";
import AuthPageVue from "@/views/auth/AuthPage.vue";
export default {
  props: {
    email: {
      type: String,
      require: true,
    },
  },
  setup() {
    return {};
  },
  components: {
    "verify-form": VerifyFormVue,
    "auth-page": AuthPageVue,
  },
};
</script>

<style lang="scss" scoped></style>
