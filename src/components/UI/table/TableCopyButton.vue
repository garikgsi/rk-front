<template>
  <q-btn
    icon="content_copy"
    :color="color"
    :flat="flat"
    :round="round"
    :to="to"
    @click.stop="click"
  ></q-btn>
</template>

<script>
export default {
  name: "table-copy-button",
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
    flat: {
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
