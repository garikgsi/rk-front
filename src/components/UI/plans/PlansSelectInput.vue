<template>
  <app-select-input
    v-model="value"
    :options="options"
    :multiple="multiple"
    :required="required"
    :label="label"
    :hint="hint"
    option-label="title"
    option-value="id"
  ></app-select-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";

import AppSelectInputVue from "../inputs/AppSelectInput.vue";
import planRepository from "@/composition/plans/planRepository";
import { computed } from "vue";
// import { onMounted, computed } from "vue";
export default {
  name: "plans-select-input",
  mixins: [inputMixin],
  props: {
    modelValue: {
      require: true,
      type: Object,
    },
    multiple: {
      require: false,
      type: Boolean,
      default: false,
    },
  },
  setup() {
    let { items } = planRepository();
    // let { items, fetchSelectData } = planRepository();

    // load data on mouted
    // onMounted(() => {
    //   fetchSelectData().then((planItems) => (items.value = planItems));
    // });

    return {
      options: computed(() => {
        if (items.value) {
          return [...items.value].map((item) => {
            return { id: item.id, title: item.title };
          });
        } else {
          return [];
        }
      }),
    };
  },
  components: {
    "app-select-input": AppSelectInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
