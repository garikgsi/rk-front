<template>
  <app-dialog
    v-model="showDialog"
    @select="selected"
    :title="title"
    :sub-title="subTitle"
    :yes-title="yesTitle"
    :no-title="noTitle"
  >
    <q-btn
      :icon="icon ? 'delete_outline' : null"
      :label="icon ? '' : 'Удалить'"
      flat
      :color="color"
      @click.stop="btnClick"
    ></q-btn>
  </app-dialog>
</template>

<script>
import AppDialogVue from "../AppDialog.vue";
import { ref } from "vue";
export default {
  name: "table-delete-button",
  components: {
    "app-dialog": AppDialogVue,
  },
  props: {
    title: {
      require: true,
      type: String,
      default: `Подтвердите удаление`,
    },
    subTitle: {
      require: false,
      type: String || null,
      default: `Действительно хотите удалить запись?`,
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
    color: {
      require: false,
      type: String,
      default: null,
    },
    icon: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const showDialog = ref(false);

    // button click action
    const btnClick = () => {
      showDialog.value = true;
    };
    // dialog selected action
    const selected = (method) => {
      switch (method) {
        case "yes":
          {
            emit("submitted");
            showDialog.value = false;
          }
          break;
        case "no": {
          showDialog.value = false;
        }
      }
    };

    return {
      showDialog,
      btnClick,
      selected,
    };
  },
  emits: ["submitted"],
};
</script>

<style lang="scss" scoped></style>
