<template>
  <div>
    <app-page
      title="Рабочий стол"
      subTitle="основные действия программы на одном экране"
      icon="dashboard"
    >
      <div class="row" v-if="!dataLoaded">
        <div class="col">
          <q-spinner color="primary" size="3em"></q-spinner>
        </div>
      </div>
      <div v-else>
        <div class="row" v-if="showWidgets">
          <div
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-md"
            n
            v-for="(widget, i) in widgets"
            :key="i"
          >
            <component :is="widget"></component>
          </div>
        </div>
        <div class="col" v-else>
          <empty-view></empty-view>
        </div>
      </div>
    </app-page>
  </div>
</template>

<script>
import periodRepository from "@/composition/periods/periodRepository";
import kidsRepository from "@/composition/kids/kidsRepository";
import { computed, onMounted } from "vue";

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

    onMounted(() => {
      fetchKidsData();
      fetchPeriods();
    });

    const periodsData = periodRepository();
    const periodsCount = periodsData.periodsCount;
    const fetchPeriods = periodsData.fetchPeriods;
    const periodsLoaded = periodsData.dataLoaded;

    const { kidsCount, kidsLoaded, fetchKidsData } = kidsRepository();

    const showWidgets = computed(() => {
      return periodsCount.value > 0 && kidsCount.value > 0;
    });

    const dataLoaded = computed(() => {
      return kidsLoaded.value && periodsLoaded.value;
    });

    return {
      widgets,
      showWidgets,
      dataLoaded,
      kidsCount,
      periodsCount,
    };
  },
  components: {
    "empty-view": EmptyViewVue,
  },
};
</script>

<style lang="scss" scoped></style>
