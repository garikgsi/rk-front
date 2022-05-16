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
      v-model="name"
      v-focus
    ></app-text-input>
    <form-buttons
      @close="closeForm"
      :cancelable="false"
      :closable="closable"
    ></form-buttons>
  </q-form>
</template>

<script>
import AppTextInputVue from "../UI/inputs/AppTextInput.vue";
import periodRepository from "@/composition/periods/periodRepository";
import periodSearch from "@/composition/periods/periodSearch";
import { addInfo } from "@/composition/addMessage";
import { toRefs, ref } from "vue";
import FormButtonsVue from "../UI/form/FormButtons.vue";

export default {
  props: {
    id: {
      require: false,
      type: [String, Number],
      default: undefined,
    },
    closable: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
  emits: ["submitted", "closed"],
  setup(props, { emit }) {
    const { addPeriod, editPeriod, currentPeriod } = periodRepository();

    const { getPeriodById } = periodSearch();
    // period filds values
    const name = ref("");
    const { id } = toRefs(props);

    if (id.value) name.value = getPeriodById(id.value).name;

    // submit form action
    const formSubmit = () => {
      const data = new FormData();
      data.append("name", name.value);
      if (id.value) {
        // edit
        editPeriod({ id: id.value, data }).then((response) => {
          emit("submitted", response);
        });
      } else {
        // insert
        addPeriod({ data }).then((response) => {
          if (currentPeriod.value.id != response.data.id)
            addInfo(
              `Период ${response.data.name} добавлен, но текущий период остался прежним. Вы можете изменить его в любой момент.`
            );
          emit("submitted", response);
        });
      }
    };
    // reset form action
    const formReset = () => {
      name.value = "";
    };
    // close form action
    const closeForm = () => {
      emit("closed");
    };

    return {
      name,
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
