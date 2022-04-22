<template>
  <app-page
    title="Планирование"
    icon="show_chart"
    sub-title="раздел для планирования бюджета на период"
  >
    <plan-list></plan-list>
  </app-page>
</template>

<script>
import PlanListVue from "@/components/plans/PlanList.vue";
export default {
  name: "plans-view",
  components: {
    "plan-list": PlanListVue,
  },
};
</script>

<style lang="scss" scoped></style>
