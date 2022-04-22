<template>
  <app-page :title="pageTitle" :sub-title="pageSubTitle" icon="point_of_sale">
    <operations-form :id="id" :period-id="periodId"></operations-form>
  </app-page>
</template>

<script>
import { toRefs, computed, onMounted, ref } from "vue";
import OperationsFormVue from "@/components/operations/OperationsForm.vue";

export default {
  name: "operations-editor-view",
  props: {
    id: {
      require: false,
      type: String,
      default: undefined,
    },
    periodId: {
      require: true,
      type: String,
    },
  },
  setup(props) {
    const { id } = toRefs(props);
    // const { findPlan } = planRepository();

    let item = ref({
      title: "",
    });

    // get actual item from repository if id exists
    onMounted(() => {
      // findPlan(id.value).then((planItem) => {
      //   item.value = { ...planItem };
      // });
    });

    // page titles
    const pageTitle = computed(() =>
      id.value
        ? `Редактируем расходную операцию`
        : `Создание расходной операции`
    );
    const pageSubTitle = computed(() =>
      id.value
        ? `Изменяем расход на ${item.value.title}`
        : `Добавление новой расходной операции`
    );

    return {
      pageTitle,
      pageSubTitle,
    };
  },
  components: {
    "operations-form": OperationsFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
