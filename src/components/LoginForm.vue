<template>
  <h2>Login</h2>
  <q-form
    @submit.stop="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
    id="loginForm"
  >
    <q-input
      filled
      v-model="login"
      type="email"
      label="Your Login"
      hint="Use email for login"
      lazy-rules
    />

    <q-input
      filled
      type="password"
      v-model="password"
      label="Your password"
      lazy-rules
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

    let saveLogged = ref(false);
    let login = ref("");
    let password = ref("");

    const onSubmit = () => {
      logIn({
        email: login.value,
        password: password.value,
        saveLogged: saveLogged.value,
      }).then(() => router.push("/"));
    };

    return {
      onSubmit,
      login,
      saveLogged,
      password,
    };
  },
  methods: {
    onReset() {
      this.saveLogged = false;
      this.login = "";
      this.password = "";
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
