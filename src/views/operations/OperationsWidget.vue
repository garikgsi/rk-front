<template>
  <app-dashboard-widget
    title="Расходы за период"
    :color="color"
    :buttons="buttons"
    icon="point_of_sale"
  >
    <div class="text-subtitle1">
      Всего потрачено за период: <span>{{ sumOperations }} руб.</span>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";
import operationsRepository from "@/composition/operations/operationsRepository";
import { onMounted } from "vue";

export default {
  name: "operations-widget",
  setup() {
    const { sumOperations, fetchOperationsData } = operationsRepository();

    onMounted(() => {
      fetchOperationsData();
    });

    return {
      sumOperations,
    };
  },
  components: {
    "app-dashboard-widget": AppDashboardWidgetVue,
  },
  data() {
    return {
      color: "green",
      currentPeriod: {
        id: 1,
      },
    };
  },
  computed: {
    buttons() {
      return [
        { title: "Список", to: { name: "operations" }, color: "primary" },
        {
          title: "Добавить",
          to: {
            name: "operations-form",
            params: { periodId: this.currentPeriod.id },
          },
          color: "primary",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
