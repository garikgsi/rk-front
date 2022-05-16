<template>
  <app-select-input
    :modelValue="value"
    :options="options"
    :multiple="multiple"
    :required="required"
    :label="label"
    :hint="hint"
    option-label="fio"
    option-value="id"
    @update:modelValue="changeSelect"
  ></app-select-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";

import AppSelectInputVue from "../inputs/AppSelectInput.vue";
import kidsRepository from "@/composition/kids/kidsRepository";
import kidSearch from "@/composition/kids/kidSearch";
import { computed, toRefs, onMounted } from "vue";

export default {
  // name: "kids-select-input",
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
    let { kidsItems, fetchKidsData } = kidsRepository();

    // props
    const { modelValue } = toRefs(props);

    // search plan function
    const { getKidById } = kidSearch();

    // select value
    const value = computed(() => {
      if (modelValue.value) {
        return getKidById(modelValue.value);
      }
      return null;
    });

    // change select option
    const changeSelect = (newValue) => {
      emit("update:modelValue", newValue?.id);
    };

    // select options
    const options = computed(() => {
      if (kidsItems.value) {
        return [...kidsItems.value].map((item) => {
          return { id: item.id, fio: item.fio };
        });
      } else {
        return [];
      }
    });

    // mounted hook - load kids data
    onMounted(() => {
      fetchKidsData();
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
