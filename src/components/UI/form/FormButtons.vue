<template>
  <div class="row">
    <div class="col">
      <q-btn
        :label="submitText"
        type="submit"
        :color="submitColor"
        v-if="saveable"
        @click="clickSubmit"
      />
      <q-btn
        :label="cancelText"
        type="reset"
        :color="cancelColor"
        flat
        class="q-ml-sm"
        v-if="cancelable"
        @click="clickCancel"
      />
    </div>
    <div class="col" align="right" v-if="closable">
      <q-btn
        @click="clickClose"
        :label="closeText"
        flat
        :color="closeColor"
        v-if="closable"
      ></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-buttons",
  props: {
    submitText: {
      require: false,
      type: String,
      default: "OK",
    },
    submitColor: {
      require: false,
      type: String,
      default: "primary",
    },
    cancelText: {
      require: false,
      type: String,
      default: "Отменить",
    },
    cancelColor: {
      require: false,
      type: String,
      default: "primary",
    },
    closeText: {
      require: false,
      type: String,
      default: "Закрыть",
    },
    closeColor: {
      require: false,
      type: String,
      default: "secondary",
    },
    closable: {
      require: false,
      type: Boolean,
      default: true,
    },
    cancelable: {
      require: false,
      type: Boolean,
      default: true,
    },
    saveable: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
  emits: ["close", "submit", "cancel"],
  setup(props, { emit }) {
    const clickSubmit = () => {
      emit("submit");
    };
    const clickCancel = () => {
      emit("cancel");
    };
    const clickClose = () => {
      emit("close");
    };

    return {
      clickClose,
      clickCancel,
      clickSubmit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
