<template>
  <app-select-input
    label="Период"
    :options="periodOptions"
    :modelValue="periodValue"
    :clearable="false"
    @update:modelValue="updateValue($event)"
  ></app-select-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
import AppSelectInputVue from "../inputs/AppSelectInput.vue";
import periodRepository from "@/composition/periods/periodRepository";
import { computed, onMounted } from "vue";

export default {
  name: "period-select-input",
  mixins: [inputMixin],
  setup() {
    const { periods, currentPeriod, changePeriod /*fetchPeriods*/ } =
      periodRepository();
    // created hook
    // load all periods to state
    onMounted(() => {
      // fetchPeriods();
    });

    const updateValue = (val) => {
      if (val?.id != currentPeriod?.id) changePeriod(val.id);
    };

    return {
      periodOptions: computed(() => {
        return [...periods.value].map((period) => {
          return { id: period.id, title: period.name };
        });
      }),
      periodValue: computed(() => {
        if (currentPeriod.value) {
          return {
            id: currentPeriod.value.id,
            title: currentPeriod.value.name,
          };
        } else {
          return null;
        }
      }),
      currentPeriod,
      updateValue,
    };
  },
  components: {
    "app-select-input": AppSelectInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
