<template>
  <div>
    <app-page
      title="Рабочий стол"
      subTitle="основные действия программы на одном экране"
      icon="dashboard"
    >
      <div class="row" v-if="showWidgets">
        <div
          class="col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-md"
          n
          v-for="(widget, i) in widgets"
          :key="i"
        >
          <component :is="widget"></component>
        </div>
      </div>
      <empty-view></empty-view>
    </app-page>
  </div>
</template>

<script>
import periodRepository from "@/composition/periods/periodRepository";
import kidsRepository from "@/composition/kids/kidsRepository";
import { computed } from "vue";

import OperationsWidgetVue from "./operations/OperationsWidget.vue";
import PaymentsWidgetVue from "./payments/PaymentsWidget.vue";
import PeriodsWidgetVue from "./periods/PeriodsWidget.vue";
import PlansWidgetVue from "./plans/PlansWidget.vue";
import EmptyViewVue from "./EmptyView.vue";
export default {
  name: "dashboard-view",
  setup() {
    const widgets = [
      PlansWidgetVue,
      OperationsWidgetVue,
      PaymentsWidgetVue,
      PeriodsWidgetVue,
    ];

    const { periods } = periodRepository();
    const { kidsCount } = kidsRepository();

    const showWidgets = computed(() => {
      return periods.value.length > 0 && kidsCount.value > 0;
    });

    return {
      widgets,
      showWidgets,
    };
  },
  components: {
    "empty-view": EmptyViewVue,
  },
};
</script>

<style lang="scss" scoped></style>
