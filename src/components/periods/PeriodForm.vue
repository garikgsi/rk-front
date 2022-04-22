<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="planForm"
  >
    <app-text-input
      label="Обозначение периода"
      required
      v-model="title"
      v-focus
    ></app-text-input>
    <form-buttons @close="closeForm" :cancelable="false"></form-buttons>
  </q-form>
</template>

<script>
import AppTextInputVue from "../UI/inputs/AppTextInput.vue";
import periodRepository from "@/composition/periods/periodRepository";
import { addInfo } from "@/composition/addMessage";
import { toRefs } from "vue";
import FormButtonsVue from "../UI/form/FormButtons.vue";

export default {
  props: {
    id: {
      require: false,
      type: [String, Number],
      default: undefined,
    },
  },
  emits: ["submitted", "closed"],
  setup(props, { emit }) {
    const { id } = toRefs(props);

    const { addPeriod, editPeriod, title } = periodRepository();

    // submit form action
    const formSubmit = () => {
      const data = new FormData();
      data.append("title", title.value);
      if (id.value) {
        // edit
        editPeriod({ id: id.value, data }).then((response) => {
          emit("submitted", response);
        });
      } else {
        // insert
        addPeriod({ data }).then((response) => {
          addInfo(
            `Период ${response.data.title} добавлен, но текущий период остался прежним. Вы можете изменить его в любой момент.`
          );
          emit("submitted", response);
        });
      }
    };
    // reset form action
    const formReset = () => {
      title.value = "";
    };
    // close form action
    const closeForm = () => {
      emit("closed");
    };

    return {
      title,
      formSubmit,
      formReset,
      closeForm,
    };
  },
  name: "periods-form",
  components: {
    "app-text-input": AppTextInputVue,
    "form-buttons": FormButtonsVue,
  },
};
</script>

<style lang="scss" scoped></style>
