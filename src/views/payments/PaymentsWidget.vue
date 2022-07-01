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
import { onMounted, computed, ref } from "vue";
import currentOrganization from "@/composition/organizations/currentOrganization";
import currentPeriod from "@/composition/periods/currentPeriod";

// import currentPeriod from "@/composition/periods/currentPeriod";

export default {
  name: "operations-widget",
  setup() {
    const { fetchPaymentsData, sumPayments } = paymentsRepository();
    const { sumPlans } = planRepository();
    // admin permissions
    const { isAdmin } = currentOrganization();
    // widget color
    const color = ref("pink");
    // current period
    const { period } = currentPeriod();
    // mounted hook - load payments data
    onMounted(() => {
      fetchPaymentsData();
    });

    // sum debts by period
    const sumDebt = computed(() => {
      return sumPlans.value - sumPayments.value;
    });

    const buttons = computed(() => {
      let buttons = [
        { title: "Список", to: { name: "payments" }, color: "primary" },
      ];
      if (isAdmin.value) {
        buttons.push({
          title: "Внести",
          to: {
            name: "payments-form",
            params: { periodId: period.value.id },
          },
          color: "positive",
        });
        buttons.push({ title: "Долги", to: { name: "debt" }, color: "red" });
      }
      return buttons;
    });

    return {
      sumPayments,
      buttons,
      sumDebt,
      isAdmin,
      color,
    };
  },
  components: {
    "app-dashboard-widget": AppDashboardWidgetVue,
  },
};
</script>

<style lang="scss" scoped></style>
