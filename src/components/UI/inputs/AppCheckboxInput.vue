<template>
  <q-toggle
    v-if="toggler"
    v-model="value"
    :label="label"
    :left-label="leftLabel"
    :color="color"
  />
  <q-checkbox
    v-else
    v-model="value"
    :label="label"
    :left-label="leftLabel"
    :color="color"
  />
</template>
<script>
export default {
  name: "app-checkbox-input",
  props: {
    modelValue: {
      require: true,
      type: Boolean,
    },
    label: {
      require: true,
      type: String,
    },
    color: {
      require: false,
      type: String,
      default: "primary",
    },
    toggler: {
      require: false,
      type: Boolean,
      default: false,
    },
    leftLabel: {
      require: false,
      type: Boolean,
      default: false,
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
  },
};
</script>

<style lang="scss" scoped></style>
