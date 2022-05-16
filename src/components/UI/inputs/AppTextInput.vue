<template>
  <q-input
    filled
    v-model="value"
    type="text"
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="fieldRules"
    clearable
    @focus="focusedSelection"
  />
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
export default {
  name: "app-text-input",
  mixins: [inputMixin],
};
</script>

<style lang="scss" scoped></style>
