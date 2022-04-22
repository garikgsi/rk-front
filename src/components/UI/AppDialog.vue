<template>
  <q-dialog v-model="confirm">
    <q-card>
      <q-card-section class="row items-center bg-primary">
        <span class="q-ml-sm text-h5 text-white">{{ title }}</span>
      </q-card-section>
      <q-card-section class="q-pt-none q-mt-lg" v-if="subTitle">
        {{ subTitle }}
      </q-card-section>
      <q-separator spacer="md"></q-separator>
      <q-card-actions align="right">
        <q-btn
          :flat="button.flat"
          v-for="button in dialogButtons"
          :key="`${button.action}`"
          :label="button.title"
          :color="button.color"
          @click="doAction(button.action)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <slot></slot>
</template>

<script>
export default {
  name: "app-dialog",
  props: {
    modelValue: {
      require: true,
      type: Boolean,
    },
    title: {
      require: true,
      type: String,
    },
    subTitle: {
      require: false,
      type: String || null,
      default: null,
    },
    yesTitle: {
      require: false,
      type: String,
      default: "Да",
    },
    noTitle: {
      require: false,
      type: String,
      default: "Нет",
    },
    buttons: {
      require: false,
      type: Array,
    },
  },
  emits: ["change:modelValue", "select"],
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
      return [
        { title: this.yesTitle, color: "red", action: "yes", flat: true },
        { title: this.noTitle, color: "positive", action: "no", flat: false },
      ];
    },
    dialogButtons() {
      return this.buttons ? this.buttons : this.defaultButtons;
    },
  },
  methods: {
    doAction(action) {
      this.$emit("select", action);
      // this.confirm = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
