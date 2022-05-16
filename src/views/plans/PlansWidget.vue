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

import { onMounted, computed } from "vue";

export default {
  name: "plans-widget",
  setup() {
    const { fetchPlansData, sumPlans } = planRepository();
    const { kidsCount, fetchKidsData } = kidsRepository();
    // plans by 1 kid
    const planByKid = computed(() => {
      if (kidsCount.value > 0) {
        return Math.round(sumPlans.value / kidsCount.value);
      }
      return 0;
    });

    onMounted(() => {
      fetchKidsData();
      fetchPlansData();
    });

    return {
      sumPlans,
      planByKid,
    };
  },
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
          },
          color: "primary",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
