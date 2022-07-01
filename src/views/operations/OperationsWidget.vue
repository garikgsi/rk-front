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
import currentOrganization from "@/composition/organizations/currentOrganization";
import currentPeriod from "@/composition/periods/currentPeriod";
import { onMounted, computed, ref } from "vue";

export default {
  name: "operations-widget",
  setup() {
    // get operations data
    const { sumOperations, fetchOperationsData } = operationsRepository();
    // check admin permissions
    const { isAdmin } = currentOrganization();
    // widget color
    const color = ref("green");
    // current period
    const { period } = currentPeriod();

    // mounted hook
    onMounted(() => {
      fetchOperationsData();
    });
    // widget buttons
    const buttons = computed(() => {
      let buttons = [
        { title: "Список", to: { name: "operations" }, color: "primary" },
      ];
      if (isAdmin.value)
        buttons.push({
          title: "Добавить",
          to: {
            name: "operations-form",
            params: { periodId: period.value.id },
          },
          color: "positive",
        });
      return buttons;
    });

    return {
      sumOperations,
      currentPeriod,
      isAdmin,
      buttons,
      color,
    };
  },
  components: {
    "app-dashboard-widget": AppDashboardWidgetVue,
  },
};
</script>

<style lang="scss" scoped></style>
