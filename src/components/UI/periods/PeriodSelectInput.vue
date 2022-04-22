<template>
  <app-select-input
    label="Период"
    :options="periods"
    :modelValue="period"
    :clearable="false"
    @update:modelValue="updateValue($event)"
  ></app-select-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
import AppSelectInputVue from "../inputs/AppSelectInput.vue";
import periodRepository from "@/composition/periods/periodRepository";
import { ref, onMounted } from "vue";

export default {
  name: "period-select-input",
  mixins: [inputMixin],
  setup() {
    const { periods, currentPeriod, changePeriod, getPeriods } =
      periodRepository();

    let period = ref(currentPeriod);

    const updateValue = (val) => {
      changePeriod(val.id);
    };

    onMounted(() => {
      getPeriods();
    });

    return {
      periods,
      period,
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
