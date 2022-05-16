<template>
  <q-btn icon="content_copy" flat :to="to" @click.stop="click"></q-btn>
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
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped></style>
