<template>
  <q-dialog v-model="confirm">
    <q-card>
      <q-card-section class="row items-center bg-primary">
        <span class="q-ml-sm text-h5 text-white">{{ title }}</span>
      </q-card-section>
      <q-card-section class="q-pt-none q-mt-lg" v-if="lines">
        <p v-for="(line, i) in lines" :key="i">{{ line }}</p>
      </q-card-section>
      <q-separator spacer="md"></q-separator>
      <q-card-actions align="right">
        <q-btn
          :flat="button.flat"
          v-for="button in alertButtons"
          :key="`${button.action}`"
          :label="button.title"
          :color="button.color"
          @click="clickOk"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <slot></slot>
</template>

<script>
export default {
  name: "app-alert",
  props: {
    modelValue: {
      require: true,
      type: Boolean,
    },
    title: {
      require: true,
      type: String,
    },
    lines: {
      require: false,
      type: Array,
      default: undefined,
    },
    buttonTitle: {
      require: false,
      type: String,
      default: "OK",
    },
    buttons: {
      require: false,
      type: Array,
    },
  },
  emits: ["change:modelValue", "ok"],
  computed: {
    confirm: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("change:modelValue", val);
      },
    },
    defaultButtons() {
      return [{ title: this.buttonTitle, color: "primary", flat: true }];
    },
    alertButtons() {
      return this.buttons ? this.buttons : this.defaultButtons;
    },
  },
  methods: {
    clickOk() {
      this.$emit("ok");
    },
    test() {
      console.log("ok");
    },
  },
};
</script>

<style lang="scss" scoped></style>
