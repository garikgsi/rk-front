<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="periodForm"
  >
    <app-text-input
      label="Обозначение периода"
      hint="Например, 2022-2023 уч.год"
      required
      v-model="name"
      v-focus
    ></app-text-input>
    <app-date-range-input
      label="Период"
      hint="Заполните временной интервал периода"
      required
      v-model="rangeDates"
      v-focus
    ></app-date-range-input>
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
// import organizationRepository from "@/composition/organizations/organizationRepository";
import currentOrganization from "@/composition/organizations/currentOrganization";
import { addInfo } from "@/composition/addMessage";
import { toRefs, ref } from "vue";
import FormButtonsVue from "../UI/form/FormButtons.vue";
import AppDateRangeInputVue from "../UI/inputs/AppDateRangeInput.vue";

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
    const rangeDates = ref([]);
    const { id } = toRefs(props);
    // get current organizatio id
    const { organizationId } = currentOrganization();

    if (id.value) {
      const period = getPeriodById(id.value);
      name.value = period.name;
      rangeDates.value = [period.start_date, period.end_date];
    }

    // submit form action
    const formSubmit = () => {
      const data = new FormData();
      data.append("name", name.value);
      data.append("start_date", rangeDates.value[0]);
      data.append("end_date", rangeDates.value[1]);
      data.append("organization_id", organizationId.value);

      if (id.value) {
        // edit
        editPeriod({ id: id.value, data }).then((response) => {
          if (!response?.isError) emit("submitted", response);
        });
      } else {
        // insert
        addPeriod({ data }).then((response) => {
          if (currentPeriod.value.id != response.data.id)
            addInfo(
              `Период ${response.data.name} добавлен, но текущий период остался прежним. Вы можете изменить его в любой момент.`
            );
          if (!response?.isError) emit("submitted", response);
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
      rangeDates,
      formSubmit,
      formReset,
      closeForm,
    };
  },
  name: "periods-form",
  components: {
    "app-text-input": AppTextInputVue,
    "app-date-range-input": AppDateRangeInputVue,
    "form-buttons": FormButtonsVue,
  },
};
</script>

<style lang="scss" scoped></style>
