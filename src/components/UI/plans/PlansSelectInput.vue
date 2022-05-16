<template>
  <app-select-input
    :modelValue="value"
    :options="options"
    :multiple="multiple"
    :required="required"
    :label="label"
    :hint="hint"
    option-label="title"
    option-value="id"
    @update:modelValue="changeSelect"
  ></app-select-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";

import AppSelectInputVue from "../inputs/AppSelectInput.vue";
import planRepository from "@/composition/plans/planRepository";
import planSearch from "@/composition/plans/planSearch";
import { computed, toRefs } from "vue";

export default {
  // name: "plans-select-input",
  mixins: [inputMixin],
  props: {
    modelValue: {
      require: true,
      type: [Number, null],
      default: null,
    },
    multiple: {
      require: false,
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // plan items from db
    let { planItems } = planRepository();

    // props
    const { modelValue } = toRefs(props);

    // search plan function
    const { getPlanById } = planSearch();

    // select value
    const value = computed(() => {
      if (modelValue.value) {
        return getPlanById(modelValue.value);
      }
      return null;
    });

    // change select option
    const changeSelect = (newValue) => {
      emit("update:modelValue", newValue?.id);
    };

    // select options
    const options = computed(() => {
      if (planItems.value) {
        return [...planItems.value]
          .map((item) => {
            return { id: item.id, title: item.title };
          })
          .sort((a, b) => a.title.localeCompare(b.title));
      } else {
        return [];
      }
    });

    return {
      options,
      value,
      changeSelect,
    };
  },
  emits: ["update:modelValue"],
  components: {
    "app-select-input": AppSelectInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
