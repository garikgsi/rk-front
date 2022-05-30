<template>
  <q-form @submit.stop="onSubmit" class="q-gutter-md" ref="registerForm">
    <app-text-input
      v-model="name"
      label="Имя"
      :required="true"
      hint="Ваше имя"
    ></app-text-input>

    <app-email-input
      v-model="login"
      label="Логин"
      :required="true"
      hint="Используте адрес электронной почты в качестве лоина"
    ></app-email-input>

    <app-password-input
      v-model="password"
      :required="true"
      label="Пароль"
      :with-confirmation="true"
    ></app-password-input>

    <div class="row">
      <div class="col">
        <q-btn label="Зарегистрироваться" type="submit" color="primary"></q-btn>
      </div>
      <div class="col" align="right">
        <q-btn
          label="Уже есть логин?"
          type="reset"
          color="primary"
          flat
          :to="{ name: 'login' }"
        ></q-btn>
      </div>
    </div>
  </q-form>
</template>

<script>
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import AppEmailInputVue from "@/components/UI/inputs/AppEmailInput.vue";
import AppPasswordInputVue from "@/components/UI/inputs/AppPasswordInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import register from "@/composition/auth/register";

export default {
  setup() {
    const router = useRouter();

    let { login, password, name, makeRegister } = register();

    const registerForm = ref(null);

    // submit action
    const onSubmit = () => {
      registerForm.value.validate().then(() => {
        makeRegister().then((response) => {
          const { isError, data } = response;
          if (!isError && data.email) {
            router.push({ name: "verify", params: { email: data.email } });
          }
        });
      });
    };

    return {
      name,
      login,
      password,
      onSubmit,
      registerForm,
    };
  },
  components: {
    "app-email-input": AppEmailInputVue,
    "app-password-input": AppPasswordInputVue,
    "app-text-input": AppTextInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
