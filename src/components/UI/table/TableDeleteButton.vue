<template>
  <span>
    <app-dialog
      v-model="showDialog"
      @select="selected"
      :title="title"
      :sub-title="subTitle"
      :yes-title="yesTitle"
      :no-title="noTitle"
    >
      <q-btn
        v-bind="buttonProps"
        :color="color"
        :flat="flat"
        :round="round"
        @click.stop="btnClick"
      ></q-btn>
    </app-dialog>
  </span>
</template>

<script>
import AppDialogVue from "../AppDialog.vue";
import { ref, toRefs, computed } from "vue";
export default {
  name: "table-delete-button",
  components: {
    "app-dialog": AppDialogVue,
  },
  props: {
    title: {
      require: false,
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
      type: String,
      require: false,
      default: "negative",
    },
    round: {
      type: Boolean,
      require: false,
      default: false,
    },
    icon: {
      require: false,
      type: Boolean,
      default: true,
    },
    flat: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const showDialog = ref(false);

    const { icon, color } = toRefs(props);

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

    const buttonProps = computed(() => {
      let resProps = {
        label: icon.value !== false ? null : "Удалить",
        color: color.value || "negative",
      };
      if (icon.value !== false) resProps.icon = "delete";
      return resProps;
    });

    return {
      buttonProps,
      showDialog,
      btnClick,
      selected,
    };
  },
  emits: ["submitted"],
};
</script>

<style lang="scss" scoped></style>
