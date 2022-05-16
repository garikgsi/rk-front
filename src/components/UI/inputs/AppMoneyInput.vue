<template>
  <q-input
    filled
    v-model.number="value"
    type="number"
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
      type: Number || String,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        const parsedVal = parseFloat(val);
        const res = isNaN(parsedVal) ? 0 : parsedVal;
        this.$emit("update:modelValue", res);
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
                (!!v && !isNaN(v)) || `Поле ${this.label} должно быть заполнено`
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
