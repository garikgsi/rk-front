<template>
  <q-input
    filled
    v-model="value"
    mask="+7(###)###-##-##"
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
  name: "app-number-input",
  mixins: [inputMixin],
  props: {
    modelValue: {
      require: true,
      type: String,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },

    fieldRules() {
      if (this.rules) {
        return this.rules;
      } else {
        if (this.required) {
          return [
            (v) => {
              return (
                (!!v && v.match(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/)) ||
                "Введите телефон в формате +7(XXX)XXX-XX-XX"
              );
            },
          ];
        } else {
          return [true];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
