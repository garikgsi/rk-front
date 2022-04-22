<template>
  <app-page :title="pageTitle" icon="show_chart" :sub-title="pageSubTitle">
    <plan-form :id="id" :periodId="periodId"></plan-form>
  </app-page>
</template>

<script>
import PlanFormVue from "@/components/plans/PlanForm.vue";
import { toRefs, computed, onMounted, ref } from "vue";
import planRepository from "@/composition/plans/planRepository";

export default {
  name: "plan-editor-view",
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
    const { findPlan } = planRepository();

    let item = ref({
      title: "",
    });

    // get actual item from repository if id exists
    onMounted(() => {
      findPlan(id.value).then((planItem) => {
        item.value = { ...planItem };
      });
    });

    // page titles
    const pageTitle = computed(() =>
      id.value ? `Редактируем запись бюджета` : `Создание записи в бюджет`
    );
    const pageSubTitle = computed(() =>
      id.value
        ? `Изменяем данные для записи ${item.value.title}`
        : `Добавление новой записи в бюджет на текущий период`
    );

    return {
      pageTitle,
      pageSubTitle,
    };
  },
  components: {
    "plan-form": PlanFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
