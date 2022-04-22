<template>
  <app-dashboard-widget
    title="Планируемые затраты"
    :color="color"
    :buttons="buttons"
    icon="show_chart"
  >
    <div class="text-subtitle1">
      Всего запланировано потратить за период: <span>45255 руб.</span>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";

export default {
  name: "plans-widget",
  components: {
    "app-dashboard-widget": AppDashboardWidgetVue,
  },
  data() {
    return {
      color: "primary",
      currentPeriod: {
        id: 1,
      },
    };
  },
  computed: {
    buttons() {
      return [
        { title: "Список", to: { name: "plans" }, color: "primary" },
        {
          title: "Добавить",
          to: {
            name: "plan-form",
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
