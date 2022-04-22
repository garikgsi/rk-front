<template>
  <h2>Login</h2>
  <q-form
    @submit.stop="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
    ref="loginForm"
  >
    <app-email-input
      v-model="login"
      label="Your Login"
      :required="true"
      hint="Use email for login"
    ></app-email-input>

    <app-password-input
      v-model="password"
      :required="true"
      label="Your password"
    ></app-password-input>

    <app-checkbox-input
      v-model="saveLogged"
      label="Remember me"
      toggler
    ></app-checkbox-input>

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logIn } from "@/composition/appAuth";
import AppEmailInputVue from "./UI/inputs/AppEmailInput.vue";
import AppPasswordInputVue from "./UI/inputs/AppPasswordInput.vue";
import AppCheckboxInputVue from "./UI/inputs/AppCheckboxInput.vue";

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
          }).then(() => router.push("/dashboard"));
        }
      });
    };
    // reset action
    const onReset = () => {
      this.saveLogged = false;
      this.login = "";
      this.password = "";
    };

    return {
      onSubmit,
      onReset,
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
