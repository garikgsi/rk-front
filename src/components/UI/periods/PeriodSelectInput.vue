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
import { computed, onMounted, toRefs } from "vue";

export default {
  name: "period-select-input",
  mixins: [inputMixin],
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Object,
      required: false,
    },
    updatePeriod: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props, { emit }) {
    // props
    const { updatePeriod, modelValue } = toRefs(props);
    // period repo
    const { periods, currentPeriod, changePeriod /*fetchPeriods*/ } =
      periodRepository();
    // created hook
    // load all periods to state
    onMounted(() => {
      // fetchPeriods();
    });

    const updateValue = (val) => {
      if (updatePeriod.value) {
        if (val?.id != currentPeriod?.id) changePeriod(val.id);
      } else {
        emit("update:modelValue", { id: val.id, name: val.title });
      }
    };

    return {
      periodOptions: computed(() => {
        return [...periods.value].map((period) => {
          return { id: period.id, title: period.name };
        });
      }),
      periodValue: computed(() => {
        if (updatePeriod.value) {
          if (currentPeriod.value) {
            return {
              id: currentPeriod.value.id,
              title: currentPeriod.value.name,
            };
          }
        } else {
          if (modelValue.value) {
            return {
              id: modelValue.value.id,
              title: modelValue.value.name,
            };
          }
        }
        return null;
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
