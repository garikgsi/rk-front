<template>
  <q-form @submit.stop="onSubmit" class="q-gutter-md" ref="loginForm">
    <app-email-input
      v-model="login"
      label="Логин"
      :required="true"
      hint="Используте адрес электронной почты в качестве логина"
    ></app-email-input>

    <app-password-input
      v-model="password"
      :required="true"
      label="Пароль"
    ></app-password-input>

    <app-checkbox-input
      v-model="saveLogged"
      label="Запомнить меня"
      toggler
    ></app-checkbox-input>

    <div class="row">
      <div class="q-mt-sm col-sx-12 col-sm-12 col-md-6">
        <q-btn
          class="q-mr-sm"
          label="Войти"
          type="submit"
          color="primary"
        ></q-btn>
        <q-btn
          label="Регистрация"
          color="secondary"
          :to="{ name: 'register' }"
        ></q-btn>
      </div>
      <div class="q-mt-sm col-xs-12 col-sm-12 col-md-6" align="right">
        <q-btn
          label="Забыли пароль?"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          :to="{ name: 'restore_password' }"
        ></q-btn>
      </div>
    </div>
  </q-form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logIn } from "@/composition/auth/appAuth";
// import { addError } from "@/composition/addMessage";
import AppEmailInputVue from "../UI/inputs/AppEmailInput.vue";
import AppPasswordInputVue from "../UI/inputs/AppPasswordInput.vue";
import AppCheckboxInputVue from "../UI/inputs/AppCheckboxInput.vue";

export default {
  name: "login-form",
  setup() {
    const router = useRouter();
    const loginForm = ref(null);
    let saveLogged = ref(false);
    let login = ref("");
    let password = ref("");

    // submit action
    const onSubmit = () => {
      loginForm.value.validate().then((success) => {
        if (success) {
          logIn({
            email: login.value,
            password: password.value,
            saveLogged: saveLogged.value,
          }).then((response) => {
            const { isError, code } = response;
            if (isError) {
              if (code == 403) {
                router.push({
                  name: "verify",
                  params: { email: login.value },
                });
              }
            } else {
              router.push({ name: "dashboard" });
            }
          });
        }
      });
    };

    return {
      onSubmit,
      login,
      saveLogged,
      password,
      loginForm,
    };
  },
  components: {
    "app-email-input": AppEmailInputVue,
    "app-password-input": AppPasswordInputVue,
    "app-checkbox-input": AppCheckboxInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
