<template>
  <div>
    <app-page
      title="Рабочий стол"
      subTitle="основные действия программы на одном экране"
      icon="dashboard"
    >
      <div class="row">
        <div
          class="col col-4 q-mr-sm q-mb-sm"
          n
          v-for="(widget, i) in widgets"
          :key="i"
        >
          <component :is="widget"></component>
        </div>
      </div>
    </app-page>
  </div>
</template>

<script>
import OperationsWidgetVue from "./operations/OperationsWidget.vue";
import PaymentsWidgetVue from "./payments/PaymentsWidget.vue";
import PeriodsWidgetVue from "./periods/PeriodsWidget.vue";
import PlansWidgetVue from "./plans/PlansWidget.vue";
export default {
  name: "dashboard-view",
  // components: {
  //   "plans-widget": PlansWidgetVue,
  //   "operations-widget": OperationsWidgetVue,
  //   "payments-widget": PaymentsWidgetVue,
  //   "period-widget": PeriodsWidgetVue,
  // },
  computed: {
    widgets() {
      return [
        PlansWidgetVue,
        OperationsWidgetVue,
        PaymentsWidgetVue,
        PeriodsWidgetVue,
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
