<template>
  <q-form class="q-gutter-md" :ref="name">
    <component
      :is="field.component"
      v-for="field in fields"
      :key="field.name"
      v-bind="{ type: field.type, label: field.label }"
    ></component>

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
export default {
  // TODO
  // make basic form
  name: "app-form",
  props: {
    name: {
      require: true,
      type: String,
    },
    fields: {
      require: true,
      type: Array,
    },
    buttons: {
      require: false,
      type: Array,
      default() {
        return [
          { label: "Submit", type: "submit", color: "primary" },
          { label: "reset", type: "reset", color: "primary" },
        ];
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
