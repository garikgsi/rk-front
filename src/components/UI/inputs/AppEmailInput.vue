<template>
  <q-input
    filled
    v-model="value"
    type="email"
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="fieldRules"
    clearable
  />
</template>

<script>
import inputMixin from "@/mixins/inputMixin";

export default {
  name: "app-text-input",
  mixins: [inputMixin],
  computed: {
    fieldRules() {
      let rules = [
        (val) =>
          val.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) ||
          `Поле ${this.label} должно содержать корректный адрес электронной почты`,
      ];
      if (this.rules) {
        return [...rules, ...this.rules];
      } else {
        if (this.required) {
          return [
            ...rules,
            ...[
              (v) =>
                (!!v && v.length > 0) ||
                `Поле ${this.label} должно быть заполнено`,
            ],
          ];
        } else {
          return rules;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
