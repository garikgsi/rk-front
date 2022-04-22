<template>
  <app-dashboard-widget
    title="Полученные взносы"
    :color="color"
    :buttons="buttons"
    icon="account_balance_wallet"
  >
    <div class="text-subtitle1">
      <div>Всего собрано за период: <span>45255 руб.</span></div>
      <div>На 1 ребенка: <span>3255 руб.</span></div>
      <div>Сумма задолженности: <span>15205 руб.</span></div>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";

export default {
  name: "payments-widget",
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
        { title: "Список", to: { name: "payments" }, color: "primary" },
        {
          title: "Внести",
          to: {
            name: "payment-form",
            params: { periodId: this.currentPeriod.id },
          },
          color: "primary",
        },
        { title: "Долги", to: { name: "debt" }, color: "red" },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
