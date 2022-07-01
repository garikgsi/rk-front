<template>
  <app-dashboard-widget
    title="Планируемые затраты"
    :color="color"
    :buttons="buttons"
    icon="show_chart"
  >
    <div class="text-subtitle1">
      <div>
        Всего на период:
        <span class="text-primary">{{ sumPlans }} руб.</span>
      </div>
      <div>
        На 1 обучающегося:
        <span class="text-accent">{{ planByKid }} руб.</span>
      </div>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";
import planRepository from "@/composition/plans/planRepository";
import kidsRepository from "@/composition/kids/kidsRepository";
import { onMounted, computed, ref } from "vue";
import currentOrganization from "@/composition/organizations/currentOrganization";
import currentPeriod from "@/composition/periods/currentPeriod";

export default {
  name: "plans-widget",
  setup() {
    const { fetchPlansData, sumPlans } = planRepository();
    const { kidsCount, fetchKidsData } = kidsRepository();
    // admin permissions
    const { isAdmin } = currentOrganization();
    // widget color
    const color = ref("primary");
    // current period
    const { period } = currentPeriod();
    // plans by 1 kid
    const planByKid = computed(() => {
      if (kidsCount.value > 0) {
        return Math.round(sumPlans.value / kidsCount.value);
      }
      return 0;
    });

    const buttons = computed(() => {
      let buttons = [
        { title: "Список", to: { name: "plans" }, color: "primary" },
      ];
      if (isAdmin.value)
        buttons.push({
          title: "Добавить",
          to: {
            name: "plan-form",
            params: { periodId: period.value.id },
          },
          color: "positive",
        });
      return buttons;
    });

    onMounted(() => {
      fetchKidsData();
      fetchPlansData();
    });

    return {
      sumPlans,
      planByKid,
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
