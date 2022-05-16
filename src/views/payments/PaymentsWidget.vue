<template>
  <app-dashboard-widget
    title="Полученные взносы"
    :color="color"
    :buttons="buttons"
    icon="account_balance_wallet"
  >
    <div class="text-subtitle1">
      <div>
        Всего собрано за период:
        <span class="text-positive">{{ sumPayments }} руб.</span>
      </div>
      <div>
        Сумма задолженности:
        <span :class="sumDebt > 0 ? 'text-negative' : 'text-positive'"
          >{{ sumDebt }} руб.</span
        >
      </div>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";
import paymentsRepository from "@/composition/payments/paymentsRepository";
import planRepository from "@/composition/plans/planRepository";
import { onMounted, computed } from "vue";
// import currentPeriod from "@/composition/periods/currentPeriod";

export default {
  name: "operations-widget",
  setup() {
    const { fetchPaymentsData, sumPayments } = paymentsRepository();
    const { sumPlans } = planRepository();
    // const { periodId } = currentPeriod();

    // mounted hook - load payments data
    onMounted(() => {
      fetchPaymentsData();
    });

    // sum debts by period
    const sumDebt = computed(() => {
      return sumPlans.value - sumPayments.value;
    });

    const buttons = computed(() => {
      return [
        { title: "Список", to: { name: "payments" }, color: "primary" },
        {
          title: "Внести",
          to: {
            name: "payments-form",
          },
          color: "primary",
        },
        { title: "Долги", to: { name: "debt" }, color: "red" },
      ];
    });

    return {
      sumPayments,
      buttons,
      sumDebt,
    };
  },
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
};
</script>

<style lang="scss" scoped></style>
