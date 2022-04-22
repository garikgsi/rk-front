<template>
  <q-file
    filled
    v-model="value"
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="fieldRules"
    clearable
  >
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";

export default {
  name: "app-file-input",
  mixins: [inputMixin],
};
</script>

<style lang="scss" scoped></style>
