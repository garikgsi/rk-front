<template>
  <app-dashboard-widget
    title="Ученики и родители"
    :color="color"
    :buttons="buttons"
    icon="family_restroom"
  >
    <div class="text-subtitle1">
      Всего учащихся: <span>{{ kidsCount }}</span>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";
import kidsRepository from "@/composition/kids/kidsRepository";
import currentOrganization from "@/composition/organizations/currentOrganization";
import currentPeriod from "@/composition/periods/currentPeriod";
import { onMounted, computed, ref } from "vue";

export default {
  name: "kids-widget",
  setup() {
    // get kids data
    const { kidsCount, fetchKidsData } = kidsRepository();
    // check admin permissions
    const { isAdmin } = currentOrganization();
    // current period
    const { period } = currentPeriod();
    // widget color
    const color = ref("orange");

    // mounted hook
    onMounted(() => {
      fetchKidsData();
    });
    // widget buttons
    const buttons = computed(() => {
      let buttons = [
        { title: "Список", to: { name: "kids" }, color: "primary" },
      ];
      if (isAdmin.value)
        buttons.push({
          title: "Добавить",
          to: {
            name: "kids-form",
            params: { periodId: period.value.id },
          },
          color: "positive",
        });
      return buttons;
    });

    return {
      kidsCount,
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
