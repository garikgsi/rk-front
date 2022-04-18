<template>
  <q-input
    filled
    v-model="value"
    type="password"
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="fieldRules"
  />
</template>

<script>
import inputMixin from "@/mixins/inputMixin";

export default {
  name: "app-password-input",
  mixins: [inputMixin],
};
</script>

<style lang="scss" scoped></style>
