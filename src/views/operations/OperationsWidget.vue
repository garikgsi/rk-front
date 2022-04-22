<template>
  <app-dashboard-widget
    title="Расходы за период"
    :color="color"
    :buttons="buttons"
    icon="point_of_sale"
  >
    <div class="text-subtitle1">
      Всего потрачено за период: <span>32255 руб.</span>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";

export default {
  name: "operations-widget",
  components: {
    "app-dashboard-widget": AppDashboardWidgetVue,
  },
  data() {
    return {
      color: "pink",
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
