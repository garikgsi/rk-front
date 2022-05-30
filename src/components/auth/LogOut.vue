<template>
  <h2>Вы уже авторизованы</h2>
  <q-form @submit="logOut" class="q-gutter-md">
    <div>
      <q-btn label="Выйти" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { logOut } from "@/composition/auth/appAuth";

export default {
  name: "login-form",
  setup() {
    return {
      logOut: () => {
        logOut();
      },
    };
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
