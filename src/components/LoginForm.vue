<template>
  <h2>Login</h2>
  <q-form
    @submit.stop="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
    ref="loginForm"
  >
    <q-input
      filled
      v-model="login"
      required
      type="email"
      label="Your Login"
      hint="Use email for login"
      lazy-rules
      :rules="emailRules"
    />

    <q-input
      filled
      type="password"
      v-model="password"
      label="Your password"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Password required']"
    />

    <q-toggle v-model="saveLogged" label="Remember me" />

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

export default {
  name: "login-form",
  setup() {
    const router = useRouter();
    const loginForm = ref(null);
    let saveLogged = ref(false);
    let login = ref("");
    let password = ref("");

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

    return {
      onSubmit,
      login,
      saveLogged,
      password,
      loginForm,
    };
  },
  methods: {
    onReset() {
      this.saveLogged = false;
      this.login = "";
      this.password = "";
    },
  },
  computed: {
    fields() {
      return [
        {
          component: "q-input",
          type: "email",
          label: "Your Login",
          hint: "Use email for login",
          value: "email",
        },
        {
          component: "q-input",
          type: "password",
          label: "Your password",
          value: "password",
        },
        {
          component: "q-toggle",
          label: "Remember me",
          value: "saveLogged",
        },
      ];
    },
    emailRules() {
      return [
        (val) => (val && val.length > 3) || "Login required",
        (val) =>
          val.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) || "Use email as login",
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
