<template>
  <h2>You've been already logged in</h2>
  <q-form @submit="logOut" class="q-gutter-md">
    <div>
      <q-btn label="Log out" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { logOut } from "@/composition/appAuth";

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
