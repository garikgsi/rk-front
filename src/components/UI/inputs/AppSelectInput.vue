<template>
  <div>
    <q-select
      v-model="value"
      filled
      use-input
      :clearable="clearable"
      :options="selectOptions"
      :label="label"
      :multiple="multiple"
      :loading="loading"
      :rules="fieldRules"
      :option-label="optionLabel"
      :option-value="optionValue"
      :hint="hint"
      @filter="filterFn"
    />
  </div>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
import { ref, toRefs } from "vue";
export default {
  name: "app-select-input",
  mixins: [inputMixin],
  props: {
    modelValue: {
      require: true,
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
    optionLabel: {
      require: false,
      type: String,
      default: "title",
    },
    optionValue: {
      require: false,
      type: String,
      default: "id",
    },
  },
  setup(props) {
    const { options, optionLabel } = toRefs(props);
    let selectOptions = ref(options.value);

    const filterFn = (val, update) => {
      update(() => {
        const needle = val.toLowerCase();
        selectOptions.value = options.value.filter(
          (v) => v[optionLabel.value].toLowerCase().indexOf(needle) > -1
        );
      });
    };

    return {
      selectOptions,
      filterFn,
    };
  },
  computed: {
    fieldRules() {
      if (this.rules) {
        return this.rules;
      } else {
        if (this.required) {
          return [
            (val) => {
              return val
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
