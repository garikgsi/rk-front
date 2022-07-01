<template>
  <q-btn
    icon="edit"
    :to="to"
    :color="color"
    :flat="!round"
    :round="round"
    @click.stop="click"
  ></q-btn>
</template>

<script>
export default {
  name: "table-edit-button",
  props: {
    to: {
      required: false,
      type: [String, Object, null],
      default: null,
    },
    color: {
      type: String,
      require: false,
      default: "primary",
    },
    round: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped></style>
