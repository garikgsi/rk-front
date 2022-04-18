<template>
  <div>
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm text-h5">{{ title }}</span>
        </q-card-section>
        <q-card-section class="q-pt-none" v-if="subTitle">
          {{ subTitle }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            v-for="button in buttons"
            :key="`${button.action}`"
            :label="button.title"
            :color="button.color"
            @click="doAction(button.action)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
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
    buttons: {
      require: false,
      type: Array,
      default() {
        return [
          { title: "Yes", color: "primary", action: "yes" },
          { title: "No", color: "secondary", action: "no" },
        ];
      },
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
