<template>
  <q-btn icon="edit" flat :to="to"></q-btn>
</template>

<script>
export default {
  name: "table-editt-button",
  props: {
    to: {
      required: true,
      type: [String, Object],
    },
  },
};
</script>

<style lang="scss" scoped></style>
