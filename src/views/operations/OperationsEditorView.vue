<template>
  <app-page
    :title="pageTitle"
    :sub-title="pageSubTitle"
    icon="point_of_sale"
    :show-period-selector="false"
  >
    <operation-view :id="id" v-if="mode == 'view'"></operation-view>
    <operations-form :id="id" :mode="mode" v-else></operations-form>
  </app-page>
</template>

<script>
import OperationsFormVue from "@/components/operations/OperationsForm.vue";
import OperationViewVue from "@/components/operations/OperationView.vue";

import { toRefs, computed, onMounted, ref } from "vue";
import operationSearch from "@/composition/operations/operationSearch";

export default {
  name: "operations-editor-view",
  props: {
    id: {
      require: false,
      type: String,
      default: undefined,
    },
    mode: {
      require: false,
      type: String,
      default: "add",
    },
  },
  setup(props) {
    const { id, mode } = toRefs(props);

    const { getOperationById } = operationSearch();

    let item = ref({
      title: "",
    });

    // get actual item from repository if id exists
    onMounted(() => {
      item.value = { ...getOperationById(id.value) };
    });

    // page titles
    const pageTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Редактируем расходную операцию`;
          }
          case "view": {
            return `Просмотр расходной операции`;
          }
          case "copy":
          default: {
            return `Копируем расходную операцию`;
          }
        }
      } else {
        return `Создание расходной операции`;
      }
    });
    const pageSubTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Изменяем расходную операцию ${item.value.comment}`;
          }
          case "view": {
            return `Просмотр ${item.value.comment}`;
          }
          case "copy":
          default: {
            return `Копируем расходную операцию ${item.value.comment}`;
          }
        }
      } else {
        return `Добавление новой расходной операции на текущий период`;
      }
    });

    return {
      pageTitle,
      pageSubTitle,
    };
  },
  components: {
    "operations-form": OperationsFormVue,
    "operation-view": OperationViewVue,
  },
};
</script>

<style lang="scss" scoped></style>
