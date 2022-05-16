<template>
  <q-input v-model="value" :label="label" :clearable="true" :dense="dense">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: "table-search",
  props: {
    modelValue: {
      require: true,
      type: String,
    },
    label: {
      require: false,
      type: String,
      default: "Поиск по таблице",
    },
    dense: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
