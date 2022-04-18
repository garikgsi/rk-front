export default {
  props: {
    modelValue: {
      require: true,
      type: String,
      default: "",
    },
    label: {
      require: false,
      type: String || null,
      default: null,
    },
    hint: {
      require: false,
      type: String || null,
      default: null,
    },
    required: {
      require: false,
      type: Boolean,
      default: false,
    },
    rules: {
      require: false,
      type: Array || undefined,
      default() {
        return undefined;
      },
    },
  },
  emits: ["update:modelValue"],
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
            (v) =>
              (!!v && v.length > 0) ||
              `Поле ${this.label} должно быть заполнено`,
          ];
        } else {
          return [true];
        }
      }
    },
  },
};
