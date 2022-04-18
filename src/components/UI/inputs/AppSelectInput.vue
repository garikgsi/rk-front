<template>
  <q-select
    v-model="value"
    :options="options"
    :label="label"
    :multiple="multiple"
    :rules="fieldRules"
  />
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
export default {
  name: "app-select-input",
  mixins: [inputMixin],
  props: {
    modelValue: {
      require: true,
      type: Array || String || Number,
      default: "",
    },
    options: {
      require: true,
      type: Array,
    },
    multiple: {
      require: false,
      type: Boolean,
      default: false,
    },
  },
  computed: {
    fieldRules() {
      if (this.rules) {
        return this.rules;
      } else {
        if (this.required) {
          return [
            (val) => {
              return !!val && val.length > 0
                ? true
                : this.multiple
                ? `Выберите одно или несколько значений поля ${this.label}`
                : `Выберите значение поля ${this.label}`;
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
